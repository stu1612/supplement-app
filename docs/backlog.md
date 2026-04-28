# Backlog

**Last updated: 28 April 2026**

> Features confirmed but not yet started.
> When starting a feature: move it to Active in `docs/task-tracker.md`, create a spec in `docs/features/`, create a branch.
> Priority: High → Medium → Low

---

## High Priority

### Navigation

Minimal top nav bar — logo left, links to product sections, CTA right.
No spec yet — create `docs/features/navigation.md` when starting.

### Product Detail Section

Below the hero — benefits, lifestyle photography, nutrition facts.
Follows the client reference direction: "Built for the Grind" section with feature callouts.
No spec yet — create `docs/features/product-detail.md` when starting.

### Mobile Responsive Pass

Full site layout review on mobile — hero, flavor chips, CTA, stats.
Carry-over from hero feature — start with `hero/index.tsx`.

---

## Medium Priority

### Creatine Flavor Variants

Cola, Wild Berries, Ice Tea — product images not yet created.
Carry-over from hero feature — images needed before implementation.
Update `docs/features/hero.md` when starting.

### Pre-Order Price State

Toggle between pre-order (`$42.99`) and live (`$44.99`) pricing on CTA.
Needs a decision on how state is managed — hardcoded flag vs CMS field.

---

## Low Priority

### CMS Integration

Hygraph — product data, flavor config, pricing.
Deferred until core UI is stable.

### Contact / Legal Pages

Already scaffolded in `/app/legal` and `/app/contact`.
Content and layout needed.

### Tailwind Canonical Class Warnings

5 unresolved warnings in `hero/index.tsx` — non-blocking but should be cleaned up.
e.g. `w-[700px]` → `w-175`, `h-[700px]` → `h-175`
