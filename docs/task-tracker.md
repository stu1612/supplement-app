# Task Tracker

**Last updated: 28 April 2026**

> This file tracks active development state and completed feature history.
> Claude should update this file at the start and end of every feature session.
> Claude should update all completed features in an organised list.
> Keep entries concise — one clear next action, one line summaries in history.
> Backlog is managed separately in `docs/backlog.md`.

---

## Active Feature

**Feature:** Mission Parallax Section
**Branch:** `feature/mission`
**Status:** In Progress
**Spec:** `docs/features/mission.md`

### What is to be done

- Add `.mission-parallax-bg` and `.mission-overlay` CSS classes to `globals.css`
- Build full-viewport parallax section in `src/app/(pages)/playground/page.tsx`
- `background-attachment: fixed` parallax on desktop, `scroll` fallback on mobile
- Dark overlay gradient (rgba 0,0,0 at 0.35/0.55/0.35 top/mid/bottom)
- Two-line copy block centred horizontally and vertically, `max-w-[760px]`
- Font: Barlow Condensed 900, uppercase, `clamp(1.75rem,4vw,3.5rem)`, `tracking-tight leading-tight`
- Line 1: "We didn't build a supplement that looks like a kettlebell." — `text-text-primary`
- Line 2: "We built a kettlebell that works like a supplement." — "kettlebell" in `text-accent`
- Placeholder image sourced and saved to `public/images/mission/mission_bg.jpg`
- No CTA, no stats, no scroll animations beyond parallax

---

## Completed Features

### Hero Section

**Completed:** 28 April 2026
**Branch:** `feature/hero` — merged and closed
**Spec:** `docs/features/hero.md`

Scroll-driven 200vh sticky hero implemented. Headline fades on scroll, product PNG rises into frame, stat callouts, named flavor chips, glow per flavor, urgency line, flavor-reactive CTA. Strawberry, Blueberry, Vanilla/CPB product images in place.

### Goals Section

**Completed:** 28 April 2026
**Branch:** `feature/goals` — merged and closed
**Spec:** `docs/features/goals-section.md`

Feature card:
Swap hover behaviour: title fades out, description + CTA fade in (not stacked).

- Overlay variants: dark gradient (A) and red/amber tint (B) — A commented, B active
- All text updated to white with text-shadow for legibility
- CTA restyled as pill with border-white, hover:bg-white/text-black
- Mobile: CTA always visible, gap-6 spacing, overlay always on at 0.85 opacity
