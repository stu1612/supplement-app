# Probell — Parallax Mission Section Spec

**Version 1 · 29 April 2026**
**Status: Ready for development**

---

## Overview

A full-viewport parallax section that sits immediately below the Goals section.

Its purpose is a brand conviction moment — bold imagery, bold statement, no conversion intent.
The hero gained attention. The goals section built connection. This section delivers the brand's core belief.

No products. No CTAs. No stats. Just the statement.

---

## Position in Page

```
Hero (dark, scroll-driven)
↓
Goals Section (white, three columns)
↓
Parallax Mission Section (dark, full viewport)   ← this feature
↓
Next section (TBD)
```

---

## Layout

- Full viewport height: `h-screen`
- Full viewport width
- Background: full-bleed image with parallax effect
- Overlay: subtle dark gradient — enough to ensure text legibility, not so heavy it kills the image
- Content: centred both horizontally and vertically
- No container width constraint on this section — full bleed

---

## Parallax Behaviour

- Image scrolls at **50% of scroll speed** relative to the viewport
- Text remains fixed in place as the section scrolls
- Effect is subtle — cinematic, not dramatic
- Implementation: CSS `background-attachment: fixed` for simplicity, or JS-driven `translateY` for more control

**Recommended implementation:**

```css
.parallax-bg {
  background-image: url("/images/mission/mission_bg.jpg");
  background-attachment: fixed;
  background-position: center;
  background-size: cover;
}
```

Note: `background-attachment: fixed` does not work on iOS Safari.
For mobile, disable parallax — use standard `background-attachment: scroll`.

```css
@media (max-width: 768px) {
  .parallax-bg {
    background-attachment: scroll;
  }
}
```

---

## Overlay

Subtle dark overlay to ensure text legibility without killing the image:

```css
background: linear-gradient(
  to bottom,
  rgba(0, 0, 0, 0.35) 0%,
  rgba(0, 0, 0, 0.55) 50%,
  rgba(0, 0, 0, 0.35) 100%
);
```

Heavier in the centre where text sits, lighter at edges where image breathes.

---

## Copy

### Line 1 — large, bold

```
We didn't build a supplement that looks like a kettlebell.
```

### Line 2 — same size, accent colour on key word

```
We built a kettlebell that works like a supplement.
```

**Typography:**

- Font: Barlow Condensed 900
- Size: `clamp(1.75rem, 4vw, 3.5rem)`
- Colour: `text-text-primary` (`#ffffff`)
- Text transform: uppercase
- Text align: centre
- Max width: `760px` — centred, prevents lines running too wide
- Letter spacing: tight — `tracking-tight`
- Line height: `leading-tight`

**Accent treatment:**
The word "kettlebell" on line 2 renders in the brand accent gold — `text-accent` (`#c9a24a`).
This is the one moment of colour in the section. Subtle but intentional.

---

## Image

**Placeholder for development:**
Source from Unsplash — search: `athlete gym dark dramatic` or `crossfit kettlebell dark`

Requirements:

- Dark, moody, high contrast
- Single strong subject — person training
- Works at full viewport width — landscape orientation preferred
- Enough natural dark area for text legibility without heavy overlay
- Minimum resolution: `1920px` wide

Store at: `public/images/mission/mission_bg.jpg`

**Note for client handoff:**
This image should be replaced by a client-supplied asset showing the Probell kettlebell product in use. Final asset must be minimum 1920px wide, PNG or JPG format.

---

## Motion

- Parallax is the only motion in this section
- No scroll-triggered animations
- No fade-ins
- No counters or reveal effects
- The image moving is enough — let it breathe

---

## Spacing

- Section: `h-screen` — full viewport height, no padding override
- Text block: centred vertically and horizontally using flexbox
  - `flex items-center justify-center`
- Gap between line 1 and line 2: `gap-2` or `gap-3` — lines should feel like one statement, not two separate elements

---

## Mobile Behaviour

- Parallax disabled — `background-attachment: scroll`
- Image still full bleed and full height
- Text scales down via `clamp` — readable on small screens
- Max width on text block: `90%` on mobile to prevent edge-to-edge text
- Overlay opacity unchanged

---

## Component Location

- Playground first: `src/app/(pages)/playground/page.tsx`
- Production: `src/components/mission/index.tsx`
- Page import: `src/app/page.tsx` — below Goals component

---

## What Is Not In This Section

- No product names
- No pricing
- No CTA
- No flavor switcher
- No stats or benefit callouts
- No scroll-driven animations beyond the parallax itself

---

## What Is Not Yet Built

- Placeholder image not yet sourced
- Component not yet created
- iOS Safari parallax fallback not yet tested

Read docs/features/mission-parallax.md for full context.

The following edits are required. Do not change anything outside
the mission/parallax component.

---

SECTION HEIGHT AND STICKY CONTAINER

Change section from h-screen to h-[150vh] to give scroll
animation enough room.

Add a sticky inner container:

- position: sticky, top: 0, height: 100vh
- centres content vertically and horizontally
- parallax image sits behind sticky container as before

---

IMAGE VIGNETTE

Add inset box shadow to the section container:
box-shadow: inset 0 0 200px rgba(0,0,0,0.7)

Darkens the edges, draws eye to centre where text sits.
Do not change the overlay gradient.

---

TEXT SHADOW

Apply to both headline lines:
text-shadow: 0 4px 24px rgba(0,0,0,0.9)

---

ACCENT WORDS

Both SUPPLEMENT and KETTLEBELL render in text-accent gold
across both lines. Four gold words total:

Line 1: "WE DIDN'T BUILD A [SUPPLEMENT] THAT LOOKS LIKE
A [KETTLEBELL]."
Line 2: "WE BUILT A [KETTLEBELL] THAT WORKS LIKE
A [SUPPLEMENT]."

Use <span className="text-accent"> for each word.

---

SCROLL-DRIVEN TWO ACT OPACITY

Both lines start at opacity: 0.

Use scrollY relative to section offset — same rAF pattern
as the hero component. Map scroll progress 0–1 across the
150vh section height.

Act 1 — Line 1:

- 0.0 → 0.25: Line 1 fades in (opacity 0 → 1)
- 0.25 → 0.35: Line 1 holds
- 0.35 → 0.50: Line 1 fades out (opacity 1 → 0)
- Line 2 remains opacity: 0 throughout Act 1

Act 2 — Line 2:

- 0.50 → 0.65: Line 2 fades in (opacity 0 → 1)
- 0.65 → 1.00: Line 2 holds until section scrolls out

All opacity transitions: transition duration 300ms ease.

Position both lines in the same fixed centre position —
they occupy the same space, never both visible at once.

---

Build and test in the features playground first.
Do not touch the production component until confirmed working.
