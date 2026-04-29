# Probell — Collagen Feature Section Spec

**Version 1 · 29 April 2026**
**Status: Ready for development**

---

## Overview

A full-viewport parallax section that sits between the Goals section and the
Products Grid section.

Its purpose is to spotlight the Probell Collagen product as a dedicated feature
moment — a product discovery section with a premium card layout against a
parallax background.

The visual approach adapts the AutoHaus card reference: blurred parallax
background, sharp centred card, product PNG breaking out of the card bottom.

---

## Position in Page

```
Hero (dark, scroll-driven)
↓
Goals Section (white, three columns)
↓
Collagen Feature Section (dark, parallax + card)    ← this feature
↓
Products Grid (white/light)
```

---

## Background Layer

**Image:** `public/images/mission/mission_main.jpg`

- Full viewport coverage: `absolute inset-0 w-full h-full object-cover`
- Heavily blurred: `blur-2xl`
- Darkened: `brightness-[0.25]`
- z-index: behind card layer

**Parallax:**

```css
background-image: url("/images/mission/mission_main.jpg");
background-attachment: fixed;
background-position: center;
background-size: cover;
```

**Mobile fallback — iOS Safari does not support fixed attachment:**

```css
@media (max-width: 768px) {
  background-attachment: scroll;
}
```

---

## Section Container

- Height: `h-screen`
- Display: `flex items-center justify-center`
- Position: `relative overflow-visible`
- z-index: above background

---

## Centre Card

- Max width: `max-w-md` — tight, premium feel
- Background: `bg-bg-dark`
- Border radius: `rounded-2xl`
- Border: `border border-border`
- Padding: `px-10 pt-10 pb-0` — no bottom padding, product PNG sits flush
- Box shadow: `shadow-[0_32px_80px_rgba(0,0,0,0.85)]`
- `overflow: visible` — required for product PNG breakout
- Position: `relative`

### Card interior image

Same image as background but sharp — no blur, no brightness reduction.

```
public/images/mission/mission_main.jpg
```

- Sits in the bottom half of the card
- `object-cover`, fills card width
- Height: approximately half the card height
- Fades into the dark card top via gradient overlay:

```css
background: linear-gradient(
  to bottom,
  var(--color-bg-dark) 0%,
  transparent 100%
);
```

Applied as an absolute overlay on the image — dark at top, transparent at
bottom so image bleeds through naturally.

---

## Card Content — Top Half

### Eyebrow label

```
NEW — COLLAGEN SERIES
```

- Font: `font-dm-sans` 500
- Size: `text-xs`
- Colour: `text-accent` (gold)
- Letter spacing: `tracking-widest`
- Uppercase
- Margin bottom: `mb-4`

### Headline

```
RECOVER STRONGER.
LOOK THE PART.
```

- Font: `font-condensed` 900
- Size: `clamp(1.75rem, 3.5vw, 2.5rem)`
- Colour: `text-text-primary`
- Uppercase
- Letter spacing: `tracking-tight`
- Line height: `leading-none`

### Supporting line

```
Collagen protein for performance and recovery.
Built for athletes who train hard and recover harder.
```

- Font: `font-dm-sans` 300
- Size: `text-sm`
- Colour: `text-text-secondary`
- Margin top: `mt-3`

### CTA button

```
Shop Collagen →
```

- Style: pill button
- Background: `bg-accent`
- Text: `text-text-dark` (black)
- Font: `font-dm-sans` 500, `text-sm`
- Padding: `px-6 py-3`
- Border radius: `rounded-full`
- Margin top: `mt-6`
- Hover: `opacity-90`

---

## Product PNG — Card Breakout

**Placeholder image:** `public/images/whey_vanilla.png`

Note: replace with collagen product PNG when client supplies asset.

**Positioning:**

- Centred horizontally within card
- `absolute bottom-[-100px]` — body extends below card edge
- Card must have `overflow: visible`
- Product sits in front of card: z-index above card

**Size:** `w-40` — prominent but not overwhelming

**Drop shadow:**

```css
filter: drop-shadow(0 20px 40px rgba(0, 0, 0, 0.75));
```

**Note:** bottom offset value (`-100px`) should be adjusted in browser
during the edit loop to achieve the right visual breakout depth.

---

## Section Bottom Padding

Add enough bottom padding to the section so the product PNG does not
overlap the next section:

- Section: add `pb-28` or `pb-32` to account for product breakout

---

## Mobile Behaviour

- Card scales to `w-[90%]` max
- Headline scales via `clamp`
- Product breakout reduced: `bottom-[-70px]`, `w-32`
- Parallax disabled — `background-attachment: scroll`
- Card interior image maintained
- CTA pill maintained

---

## Image Assets

| File                                     | Usage                                        | Status     |
| ---------------------------------------- | -------------------------------------------- | ---------- |
| `public/images/mission/mission_main.jpg` | Background (blurred) + card interior (sharp) | ✓ In place |
| `public/images/whey_vanilla.png`         | Product PNG placeholder                      | ✓ In place |

---

## Component Location

- Playground first: `src/app/(pages)/playground/page.tsx`
- Production: `src/components/collagen/index.tsx`
- Page import: `src/app/page.tsx` — below Goals, above Products Grid
- Export: add to `src/components/server.ts` barrel file

---

## What Is Not In This Section

- No flavor switcher
- No stats row
- No scroll-driven text animations

---

## What Is Not Yet Built

- Component not yet created
- Card interior image gradient overlay needs browser testing
- Product PNG breakout depth needs browser adjustment
- iOS Safari parallax fallback not yet tested
- Final collagen product PNG not yet supplied by client
