# Probell — Design System

**Last updated: 29 April 2026**

---

## Purpose

This document defines the visual and layout rules for the Probell frontend.

All UI implementation must follow these constraints to ensure consistency, scalability, and clean architecture.

This is a **strict contract**, not a guideline.

---

## 0. Brand Visuals — Foundation

> These decisions are locked. Confirmed through client reference and development. Do not deviate without explicit approval.

### Aesthetic direction

Dark, gritty, gym-floor energy. Bold typography. Real product photography. Minimal UI chrome. The product is always the hero.

### Locked decisions

| Element               | Decision                             |
| --------------------- | ------------------------------------ |
| Background            | Black base — `#000000`               |
| Background texture    | Dark gym photo, `opacity-35` overlay |
| Display font          | Barlow Condensed, 900, uppercase     |
| Body font             | DM Sans, 300–500                     |
| Default accent        | Gold — `#C9A84C`                     |
| Accent (Strawberry)   | `#C0392B`                            |
| Accent (Blueberry)    | `#2D3A9E`                            |
| Accent (Vanilla/CPB)  | `#C9A84C`                            |
| Accent (Wild Berries) | `#7C1FC8`                            |
| Accent (Cola)         | `#7B4A16`                            |
| Accent (Ice Tea)      | `#1B8C7D`                            |

---

## 1. Color System — STRICT RULES

### How colors are defined

All colors are defined as tokens in `src/app/globals.css` in two places:

**`@theme` block** — generates Tailwind utility classes:

```
bg-bg-dark          → --color-bg-dark: #181818
bg-bg-dark-secondary → --color-bg-dark-secondary: #121212
bg-bg-light         → --color-bg-light: #f5f5f5
bg-surface          → --color-surface: #1f1f1f
border-border       → --color-border: #2a2a2a
bg-accent           → --color-accent: #c9a24a
text-text-primary   → --color-text-primary: #ffffff
text-text-secondary → --color-text-secondary: #a0a0a0
text-text-dark      → --color-text-dark: #181818
text-text-dark-secondary → --color-text-dark-secondary: #4a4a4a
bg-strawberry       → --color-strawberry: #c0392b
bg-blueberry        → --color-blueberry: #2d3a9e
bg-vanilla          → --color-vanilla: #f3e5ab
```

**`:root` block** — runtime values used directly in CSS (not Tailwind utilities):

```
--accent            flavor-reactive accent color (swapped by Hero component)
--accent-rgb        RGB version for use in rgba() values
```

---

### ALLOWED — use these always

```
✓ bg-bg-dark
✓ bg-bg-dark-secondary
✓ bg-bg-light
✓ bg-surface
✓ border-border
✓ bg-accent / text-accent
✓ text-text-primary
✓ text-text-secondary
✓ text-text-dark
✓ text-text-dark-secondary
✓ bg-strawberry / bg-blueberry / bg-vanilla
```

For runtime flavor-reactive values where Tailwind cannot compute the result:

```
✓ style={{ background: 'var(--accent)' }}
✓ style={{ color: 'rgba(var(--accent-rgb), 0.75)' }}
```

---

### FORBIDDEN — never use these

```
✗ text-gray-*
✗ text-zinc-*
✗ text-slate-*
✗ text-neutral-*
✗ text-white        ← use text-text-primary
✗ text-black        ← use text-text-dark
✗ bg-gray-*
✗ bg-zinc-*
✗ bg-black          ← use bg-bg-dark
✗ bg-white          ← use bg-bg-light
✗ bg-[#anyvalue]    ← arbitrary color values
✗ text-[#anyvalue]  ← arbitrary color values
✗ Any raw Tailwind palette color
```

If a color is needed that does not exist in the token list:
→ Raise it with the developer. Add it to `@theme` in `globals.css`.
→ Do NOT improvise with a raw value or Tailwind palette color.

---

## 2. Typography Rules

### Fonts

- Display / H1: `font-condensed` — Barlow Condensed 900, uppercase, tracking tight
- Body: `font-dm-sans` — DM Sans 300–500
- Fallback: `font-sans` — Inter

### Hierarchy

- `h1` → page hero only (one per page)
- `h2` → section titles
- `h3` → sub-sections / cards

### Behaviour

- Headings: bold and visually dominant
- Body text: `text-text-secondary` unless overriding for emphasis
- Avoid long text blocks
- Responsive sizing via `clamp()` — e.g. `clamp(3.5rem, 8vw, 4.5rem)`

Note: `globals.css` does NOT apply font sizes or weights to heading elements globally.
All typography styling is applied via Tailwind classes in components.

---

## 3. Spacing System

### Rules

- Sections: `py-16`, `py-20`, `py-24`
- Internal gaps: `gap-4`, `gap-6`, `gap-8`
- Always wrap content in `.container`

### Forbidden

- Arbitrary spacing e.g. `mt-[37px]`
- Mixing too many spacing values in one section
- Resolve Tailwind canonical class warnings when encountered

---

## 4. Layout Rules

- All content inside `.container`
- Max width controlled globally via `--container-max-width`
- Sections clearly separated, each with a clear purpose
- Prefer left-aligned layouts for readability

---

## 5. Component Rules

### Buttons

Use base class `.btn` from `globals.css` for structure.
Apply color via tokens in the component:

```jsx
// Primary
<button className="btn bg-accent text-text-dark">...</button>

// Secondary
<button className="btn border border-border text-text-primary">...</button>
```

- One primary CTA per section maximum
- Button background uses `var(--accent)` for flavor-reactive states
- `transition-colors duration-300` on all color transitions
- Do not create custom button styles without approval

### Flavor chips / swatches

- Named chips preferred over anonymous dots
- Active state: `border-[var(--accent)]` + tinted background
- Inactive: muted text, no border highlight
- Selecting a chip updates `--accent` and `--accent-rgb` globally

---

## 6. globals.css — What Lives There

| Section           | Purpose                                                               |
| ----------------- | --------------------------------------------------------------------- |
| `@theme`          | Token definitions for Tailwind utility generation                     |
| `:root`           | Runtime CSS variables not handled by Tailwind                         |
| CSS Reset         | Structure and behaviour resets — no color                             |
| Layout primitives | `.container`, `.section-spacing`, `.card` — structure only            |
| Button primitives | `.btn` — structure and transition only, no color                      |
| Runtime utilities | Classes that require runtime CSS variables e.g. `.goals-card-overlay` |
| Keyframes         | Animation definitions                                                 |

**globals.css does not apply color to any HTML element directly.**
All color comes from Tailwind token classes applied in components.

---

## 7. Animation & Interaction Rules

- Scroll-driven animations: linear, via `requestAnimationFrame` or CSS `animation-timeline: scroll()`
- Color transitions: `transition-colors duration-300`
- No decorative animation — every motion must serve a purpose
- Glow effect: `radial-gradient` centered behind product, transitions with flavor swap

---

## 8. Implementation Rule

Before implementing any UI:

1. Confirm understanding of this document and `brand.md`
2. Confirm which color tokens will be used — no raw values
3. Explain how the component follows these rules
4. Then implement

Do NOT jump straight to code.

---

## Document Map

| File                  | Purpose                                            |
| --------------------- | -------------------------------------------------- |
| `brand.md`            | Brand principles, visual identity, experience flow |
| `design.md`           | CSS rules, tokens, component contracts             |
| `coding-standards.md` | TypeScript, React, Next.js, file structure         |
| `git-process.md`      | Branch and commit workflow                         |
| `ai-interaction.md`   | AI working process                                 |
| `feature-kickoff.md`  | Feature start to finish process                    |
| `docs/features/*.md`  | Per-feature specs                                  |
