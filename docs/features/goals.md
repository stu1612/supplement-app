# Probell — Goals Section Spec

**Version 2 · 28 April 2026**
**Status: In progress — iteration 1 complete, iteration 2 in development**

---

## Overview

A full-width white section that sits immediately below the hero. Its purpose is to
shift tone — from dramatic product reveal to emotional brand connection. It sells
the feeling before it sells the product.

No products are named in this section. The user connects with a training goal first.
Product detail follows in a later section.

---

## Current Build — Confirmed Working ✓

- White background section renders correctly below hero
- Three column card grid — greyscale at rest, colour flood on hover
- Correct images in place: goals_strength.jpg, goals_energy.jpg, goals_recovery.jpg
- Title and supporting line rendering correctly
- Strength card colour overlay working on hover
- Cards stack to single column on mobile

---

## Layout

- Background: `#FFFFFF`
- Full viewport width
- Centre-aligned text block at top
- Three equal columns below — one per pillar
- Responsive: columns stack vertically on mobile

---

## Copy

### Title

```
Every rep. Every goal. One brand.
```

- Font: Barlow Condensed 900
- Size: `clamp(2.5rem, 6vw, 4rem)`
- Colour: `#000000`
- Uppercase
- Centre-aligned

### Supporting line

```
Whether you're building strength, chasing energy, or accelerating recovery
— Probell is built around how you train.
```

- Font: DM Sans 300
- Size: `clamp(1rem, 2vw, 1.25rem)`
- Colour: `rgba(0,0,0,0.5)`
- Centre-aligned
- Max width: `560px` — centred, prevents long line lengths

---

## Three Column Cards

### Structure

Each card is a tall rectangular image card. Equal width, equal height. Slight gap between columns. Card proportions: `4:5` portrait ratio.

### Card content

| Column | Heading  | Short description        | Body copy                                                                                              | Route                        |
| ------ | -------- | ------------------------ | ------------------------------------------------------------------------------------------------------ | ---------------------------- |
| 1      | Strength | Push harder. Build more. | Supporting the serious athlete with clean whey protein built for compound lifts and heavy sessions.    | `/supplements/whey-protein`  |
| 2      | Energy   | Ignite every session.    | Clean energy when it matters most. No crash. No jitters. Just fuel that performs as hard as you do.    | `/supplements/pre-workout`   |
| 3      | Recovery | Come back stronger.      | The fastest way back to peak performance. Creatine that works as hard as you do, every single session. | `/supplements/creatine-cola` |

### Card resting state

- Image rendered in **greyscale** — `filter: grayscale(100%)`
- Heading visible — white, bottom-left, bold
- No overlay
- Cursor: pointer

### Card hover state — interaction sequence

All transitions: `duration-500 ease-in-out`

1. **Colour floods in** — greyscale removes: `filter: grayscale(0%)`
2. **Accent overlay** — dark gradient + brand accent tint slides up from bottom:
   `background: linear-gradient(to top, rgba(var(--accent-rgb), 0.75) 0%, transparent 60%)`
3. **Image scales** — subtle zoom: `scale-105`
4. **Rounded corners** — `rounded-none → rounded-xl` transitions in with the hover state
5. **Text reveal** — full content block slides up from below:
   - Heading — `text-2xl` Barlow Condensed 700, white, always visible
   - Short description — `text-sm` DM Sans 400, `rgba(255,255,255,0.85)`
   - Body copy — `text-sm` DM Sans 300, `rgba(255,255,255,0.75)`, max 3 lines
   - CTA — "Recommendation →" DM Sans 500, white, underline on hover
   - All animate with `opacity-0 → opacity-100` and `translate-y-4 → translate-y-0`

### CTA behaviour

- Label: `Recommendation →`
- Routes to the relevant supplement page per card (see table above)
- Style: text link, white, no button treatment — keeps it editorial
- On click: standard Next.js `<Link>` navigation

### CSS custom properties needed

```css
--accent-rgb: 192, 57, 43; /* fixed brand red — not flavor reactive */
```

---

## Spacing — Updated

- Section padding: `py-24` top and bottom
- Title to supporting line gap: `gap-4`
- Text block to cards gap: `mt-24` ← increased from `mt-16`
- Card column gap: `gap-6`
- Card inner padding (for text): `p-6`

---

## Typography — Card Labels

| Element           | Font             | Size       | Weight | Colour                   |
| ----------------- | ---------------- | ---------- | ------ | ------------------------ |
| Card heading      | Barlow Condensed | `text-2xl` | 700    | `#FFFFFF`                |
| Short description | DM Sans          | `text-sm`  | 400    | `rgba(255,255,255,0.85)` |
| Body copy         | DM Sans          | `text-sm`  | 300    | `rgba(255,255,255,0.75)` |
| CTA link          | DM Sans          | `text-sm`  | 500    | `#FFFFFF`                |

---

## Mobile Behaviour — Updated

- Columns stack to single column
- Cards maintain `4:5` ratio, full width
- **Colour gradient overlay always visible on mobile** — no tap required
- **Full text content always visible on mobile** — heading, description, body copy, CTA
- Text positioned centrally on mobile cards
- Rounded corners always applied on mobile — `rounded-xl`
- Greyscale-to-colour interaction is **desktop only**
- Title font scales down via `clamp`

Implementation note: use Tailwind responsive prefixes to separate
desktop hover behaviour from mobile always-on state.

```
Mobile:  overlay always on · text always visible · centred · rounded-xl
Desktop: greyscale at rest · hover triggers everything
```

---

## Images

Stored in: `public/images/goals/`

| File                 | Card     | Status     |
| -------------------- | -------- | ---------- |
| `goals_strength.jpg` | Strength | ✓ In place |
| `goals_energy.jpg`   | Energy   | ✓ In place |
| `goals_recovery.jpg` | Recovery | ✓ In place |

---

## Component Location

- Playground first: `src/app/features/page.tsx`
- Production: `src/components/goals/index.tsx`
- Page import: `src/app/page.tsx` — below Hero component

---

## What Is Not In This Section

- No product names in copy — CTA routes to product but copy stays goal-focused
- No pricing
- No flavor switcher
- No dark background

---

## What Is Not Yet Built

- Increased spacing `mt-24` between text and cards
- Rounded corners on hover — `rounded-xl` transition
- Expanded hover text — body copy and CTA not yet added
- CTA routing to supplement pages
- Mobile always-on overlay and centred text
