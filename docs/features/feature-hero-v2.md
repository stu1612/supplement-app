# Probell — Hero Component Spec
**Version 2 · Updated 27 April 2026**
**Status: Base build complete · Next iteration defined**

---

## Current Build — Confirmed Working ✓

These features are implemented and verified from live screenshots.

### State 1 — Page Load
- Full-viewport gym background photo, heavily darkened overlay
- H1: "THE ONLY SUPPLEMENT YOU CAN LIFT" — large condensed font, white with "LIFT" in red accent
- Subheadline: "Functional fitness. Pure protein." — muted white, centered
- "SCROLL" label with animated down chevron, centered lower third
- Probell product kettlebell handle visible, peeking up from the bottom edge of the viewport
- Background image persists through all scroll states as the base layer

### State 2 — Scroll Reveal (fully working)
- Headline fades out on scroll
- Product kettlebell rises into full center frame
- Real product PNG used (not SVG) — crisp, transparent background
- Stats appear on the right: `25g / PROTEIN`, `2lb / WEIGHT`, `0g / GLUTEN`
- Color swatches appear on the left — three circular dots (red, blue, gold)
- Clicking a swatch swaps the product image
- Background glow shifts to match the active flavor (red radial glow confirmed on strawberry)
- "Add to Cart" button — gold/tan color, centered bottom, pill shape

### Flavor Switcher — Confirmed Working
| Swatch | Flavor | Label color |
|---|---|---|
| Red dot | Strawberry | Red |
| Blue dot | Blueberry | Blue/indigo |
| Gold dot | (Patriot / Choc Peanut Butter) | Gold/dark |

---

## Design Tokens — As Built

### Colors
| Token | Value | Notes |
|---|---|---|
| Background base | Dark gym photo | Full bleed, persists all states |
| Background overlay | `rgba(0,0,0,0.65)` approx | Darkens photo for text legibility |
| Background glow | Radial, flavor-matched | Positioned behind product |
| H1 primary | `#FFFFFF` | |
| H1 accent word "LIFT" | `#C0392B` | Red |
| Subheadline | `rgba(255,255,255,0.45)` approx | |
| Stats values | `#FFFFFF` | Right-aligned |
| Stats labels | `rgba(255,255,255,0.30)` | Spaced uppercase |
| CTA button | Gold/tan — `#C9A84C` approx | Pill shape |
| Swatch active border | White ring | Confirms selection |

### Typography — As Built
| Role | Style | Notes |
|---|---|---|
| H1 | Large condensed, heavy, uppercase | Barlow Condensed or equivalent |
| Subheadline | Light, centered, spaced | Smaller, muted |
| Stats value | Large condensed bold | Right-aligned, tight tracking |
| Stats label | Small caps, wide letter-spacing | Uppercase utility style |
| Scroll hint | Small caps, wide letter-spacing | Centered, fades on scroll |

---

## Next Iteration — 5 Proposed Changes

These are the agreed next development tasks. Implement in order of priority.

---

### 1 · Headline Copy Update `[COPY]`

**Current:** "THE ONLY SUPPLEMENT YOU CAN LIFT"

**Proposed:** Two-line hierarchy — bold provocation, softer payoff

```
THIS IS NOT A KETTLEBELL.
It's protein.
```

Or retain the existing line with the client line as a secondary below it:

```
THE ONLY SUPPLEMENT YOU CAN LIFT.
This is not a kettlebell. It's protein.
```

**Implementation:** No layout change required — swap text content only. The second line uses the subheadline style (lighter weight, smaller, muted white).

---

### 2 · Flavor Swatches → Named Flavor Chips `[UI]`

**Current:** Three anonymous color dots on the left edge.

**Proposed:** Keep the dot, add the flavor name inline. Left-aligned vertical list.

```
● Strawberry
● Blueberry
● Chocolate Peanut Butter
```

- Dot size: unchanged
- Flavor name: DM Sans 500, 12px, `rgba(255,255,255,0.60)`
- Active state: name goes to `#FFFFFF`, dot gets white ring
- Inactive: name stays muted, no ring
- No additional padding or background needed — stays minimal

---

### 3 · Background Glow — Flavor Reactive `[VISUAL]`

**Current:** Red radial glow confirmed on Strawberry. Needs extending to all flavors.

**Proposed glow colors per flavor:**

| Flavor | Glow color | CSS value |
|---|---|---|
| Strawberry | Deep red | `rgba(192, 57, 43, 0.45)` |
| Blueberry | Indigo/blue | `rgba(45, 58, 158, 0.45)` |
| Chocolate Peanut Butter | Warm gold | `rgba(180, 130, 40, 0.35)` |
| Cola (Creatine) | Amber brown | `rgba(123, 74, 22, 0.40)` |
| Wild Berries (Creatine) | Purple | `rgba(124, 31, 200, 0.40)` |
| Ice Tea (Creatine) | Teal | `rgba(27, 140, 125, 0.40)` |

**Implementation:** Radial gradient centered behind product image. Transition with `transition: background 0.4s ease` on flavor swap.

```css
.hero-glow {
  position: absolute;
  width: 600px;
  height: 600px;
  border-radius: 50%;
  background: radial-gradient(circle, var(--glow-color) 0%, transparent 70%);
  top: 50%; left: 50%;
  transform: translate(-50%, -50%);
  pointer-events: none;
  transition: background 0.4s ease;
}
```

---

### 4 · Urgency Line Above CTA `[COPY / UI]`

**Current:** "Add to Cart" button sits alone at the bottom.

**Proposed:** Add one small line directly above the button.

```
Limited First Drop · First 1,000 Units Only
```

- Font: DM Sans 400, 11px, letter-spacing 2px, uppercase
- Color: `#C9A84C` (gold — matches button)
- Centered above button
- No box, no badge — plain text only. Keeps the minimal aesthetic.

**Optional:** If a pre-order state is needed, the button label swaps:
- Pre-order: `Pre-Order Now — $42.99`
- Live: `Add to Cart — $44.99`

---

### 5 · CTA Button — Flavor Reactive Color `[UI]`

**Current:** Fixed gold/tan on all flavors.

**Proposed:** Button background color updates with active flavor.

| Flavor | Button color |
|---|---|
| Strawberry | `#C0392B` red |
| Blueberry | `#2D3A9E` indigo |
| Chocolate Peanut Butter | `#C9A84C` gold (keep current) |
| Creatine variants | `#C9A84C` gold (default) |

**Implementation:** Use `--accent` CSS custom property already driving the glow. Apply same variable to button background.

```css
.cta-button {
  background: var(--accent);
  transition: background 0.3s ease;
}
```

Gold remains the default / fallback — consistent with client's patriot brand direction.

---

## Conversation Reference — Key Design Decisions

Captured from development conversation 27 April 2026.

| Decision | Rationale |
|---|---|
| 200vh sticky scroll mechanic | Product earns its reveal — user "lifts" it into view, mirrors the tagline |
| Real product PNG over SVG | Photography is stronger than illustration at this stage |
| Black / dark gym photo base | Client reference confirmed dark, gritty aesthetic |
| Gold as default accent | Client's patriot/Chocolate Peanut Butter variant uses gold — anchors the brand |
| Minimal chip/swatch UI | Keep layout clean — product is the hero, UI is secondary |
| Glow behind product | Client reference shows dramatic radial light — implementation is subtler but same principle |
| "This is not a kettlebell" copy | Stronger provocation than original — client confirmed this direction |
| Bold + simple merge | Client wants impact without clutter — large type, real photography, minimal chrome |

---

## File References

| File | Purpose |
|---|---|
| `probell_strawberry.png` | Primary product image — Strawberry variant |
| `probell_reference.jpeg` | Client inspiration — Chocolate Peanut Butter / patriot design direction |
| `probell_snapshots.png` | Screenshots of current live build — States 1, 2, 3 |
| `probell_design_spec.html` | Visual snapshot file — phone frame mockups for dev reference |

---

## What Is Not Yet Built

| Feature | Priority |
|---|---|
| Creatine flavor variants (Cola, Wild Berries, Ice Tea) | Medium |
| Pre-order vs live price state | Medium |
| Named flavor chips (replacing dots) | High — next task |
| Glow color per flavor (blueberry + gold) | High — next task |
| Urgency line above CTA | Low |
| Button color reactive to flavor | Medium |
| Mobile layout (wrap, smaller type) | High before launch |
| Scroll progress indicator | Low |
