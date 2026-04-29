# Probell — Mission Section Spec

**Version 2 · 29 April 2026**
**Status: Ready for development**

---

## Overview

A full-viewport brand statement section sitting between the Goals section and the
next product section.

The layout uses a blurred background with a sharp centred card — the Probell
kettlebell product PNG breaks out of the bottom of the card, sitting below the
card boundary as if resting on the ground beneath it.

No scroll animations. No CTA. One statement. Full stop.

---

## Position in Page

```
Hero (dark, scroll-driven)
↓
Goals Section (white, three columns)
↓
Mission Section (dark, full viewport)    ← this feature
↓
Next section (TBD)
```

---

## Layout — Full Structure

```
[Full viewport — blurred dark background]

             ┌──────────────────────────┐
             │                          │
             │   BUILT TO [LIFT].       │
             │   BUILT TO [FUEL].       │
             │                          │
             │   [dark card — bg-bg-dark│
             │    rounded-2xl]          │
             │                          │
             └──────────┐  ┌────────────┘
                        │  │
                   [Kettlebell PNG]
                   breaks card bottom
                   centred horizontally
                   extends below card edge
```

---

## Background Layer

- Same image as the card interior: `public/images/mission/mission_bg.jpg`
- Full viewport coverage: `w-full h-screen object-cover`
- Heavily blurred: `blur-xl` or `blur-2xl`
- Darkened: `brightness-[0.3]`
- Position: `absolute inset-0 z-0`

The background layer should have a parallax effect.

- Background image scrolls at 50% of scroll speed
- Implementation: background-attachment: fixed on the
  background layer
- Mobile fallback: background-attachment: scroll on
  max-width: 768px — iOS Safari does not support fixed
  attachment

The card and kettlebell do not move with the parallax —
they remain centred and static as the background moves
behind them.

---

## Centre Card

- Position: centred horizontally and vertically in the viewport
- Width: `max-w-lg` — tight enough to feel like a card, not a panel
- Background: `bg-bg-dark` — solid dark, no texture
- Border radius: `rounded-2xl`
- Border: `border border-border` — subtle edge definition against the blurred bg
- Padding: `px-10 pt-12 pb-0` — no bottom padding, kettlebell sits flush to bottom edge
- Box shadow: `shadow-[0_32px_80px_rgba(0,0,0,0.8)]` — deep shadow grounds the card
- `overflow: visible` — required so kettlebell PNG can break outside card boundary
- z-index: above background layer

---

## Headline — Inside Card

```
BUILT TO LIFT.
BUILT TO FUEL.
```

**Typography:**

- Font: `font-condensed` — Barlow Condensed 900
- Size: `clamp(2.5rem, 5vw, 3.75rem)`
- Colour: `text-text-primary`
- Transform: uppercase
- Align: centre
- Letter spacing: `tracking-tight`
- Line height: `leading-none`

**Accent words:**

- `LIFT` → `text-accent` (gold `#c9a24a`)
- `FUEL` → `text-accent` (gold `#c9a24a`)
- Wrap each in `<span className="text-accent">`

**Spacing below headline:** `mt-8` before kettlebell — gives visual breathing room
between text and product

---

## Kettlebell PNG — Card Breakout

**Image:** `public/images/whey_vanilla.png`

**Positioning:**

- Centred horizontally within card
- Positioned so the top ~30% of the kettlebell (the handle) sits inside the card
- The body extends below the card bottom edge
- Use `relative` on card, `absolute bottom-[-120px]` on image wrapper — adjust px
  value to achieve the right breakout depth
- `overflow: visible` must be set on the card container

**Size:** `w-48` to `w-56` — large enough to be the focal point, not so large
it overwhelms the card

**Drop shadow on PNG:**

```css
filter: drop-shadow(0 24px 48px rgba(0, 0, 0, 0.7));
```

Grounds the product against the dark card and blurred background.

**z-index:** above the card

---

## Spacing — Section Level

The kettlebell breaks 120px below the card. The section needs enough bottom
padding to prevent the kettlebell overlapping the next section:

- Section: `h-screen flex items-center justify-center`
- Add `pb-32` or `pb-40` to the section to give the kettlebell room at the bottom

---

## Mobile Behaviour

- Card scales to `max-w-sm` or `w-[90%]`
- Headline scales down via `clamp`
- Kettlebell breakout reduced — `bottom-[-80px]`, `w-36`
- Background blur maintained
- Card remains centred

---

## Image Asset

**Background + card interior:**
Source from Unsplash — search: `athlete gym dark dramatic`
Store at: `public/images/mission/mission_bg.jpg`

Requirements:

- Dark, moody, high contrast
- Works heavily blurred as a background
- Minimum 1920px wide

**Note for client:** This image should be replaced with a client-supplied
asset. Final asset minimum 1920px wide, PNG or JPG.

---

## What Is Not In This Section

- No CTA button
- No stats or benefit callouts
- No flavor switcher
- No product names in copy

---

## Component Location

- Playground first: `src/app/(pages)/playground/page.tsx`
- Production: `src/components/mission/index.tsx`
- Page import: `src/app/page.tsx` — below Goals component
- Export: add to `src/components/server.ts` barrel file

---

## What Is Not Yet Built

- Parallax background-attachment: fixed implemented and tested
- iOS Safari parallax fallback not yet tested
- Kettlebell breakout positioning needs browser testing to dial in exact values
- Mobile breakout depth not yet tested
