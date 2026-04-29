# Task Tracker

**Last updated: 28 April 2026**

> This file tracks active development state and completed feature history.
> Claude should update this file at the start and end of every feature session.
> Claude should update all completed features in an organised list.
> Keep entries concise — one clear next action, one line summaries in history.
> Backlog is managed separately in `docs/backlog.md`.

---

## Active Feature

None — ready for next feature.

> Pick next feature from `docs/backlog.md`, create branch, update this file.

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
