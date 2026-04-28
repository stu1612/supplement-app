# Probell — Design System

**Last updated: 28 April 2026**

---

## Purpose

This document defines the visual and layout rules for the Probell frontend.

All UI implementation must follow these constraints to ensure consistency, scalability, and clean architecture.

This is a **strict contract**, not a guideline.

---

## 0. Brand Visuals — Foundation

> These decisions are locked. They were confirmed through client reference and development. Do not deviate without explicit approval.

### Aesthetic direction

Dark, gritty, gym-floor energy. Bold typography. Real product photography. Minimal UI chrome. The product is always the hero.

### Key locked decisions

| Element               | Decision                             |
| --------------------- | ------------------------------------ |
| Background            | Black base — `#000000`               |
| Background texture    | Dark gym photo, `opacity-35` overlay |
| Display font          | Barlow Condensed, 900, uppercase     |
| Body font             | DM Sans, 300–500                     |
| Default accent        | Gold — `#C9A84C`                     |
| Accent (Strawberry)   | `#C0392B`                            |
| Accent (Blueberry)    | `#2D3A9E`                            |
| Accent (Choc PB)      | `#C9A84C`                            |
| Accent (Wild Berries) | `#7C1FC8`                            |
| Accent (Cola)         | `#7B4A16`                            |
| Accent (Ice Tea)      | `#1B8C7D`                            |

### CSS custom property pattern

All flavor-reactive color must be driven by `--accent` and `--glow-color` custom properties. Never hardcode flavor colors into component styles.

```css
:root {
  --accent: #c9a84c;
  --glow-color: rgba(201, 168, 76, 0.35);
}
```

---

## 1. Color System (NON-NEGOTIABLE)

### Source of truth

All colors MUST come from Tailwind theme tokens defined in `globals.css` via `@theme`.

### Allowed usage

- Backgrounds: `bg-bg-dark` · `bg-bg-dark-secondary` · `bg-bg-light` · `bg-surface`
- Text: `text-text-primary` · `text-text-secondary` · `text-text-dark`
- Borders: `border-border`
- Accent: `bg-accent` · `text-accent`

### Forbidden usage

DO NOT use:

- `text-gray-*` · `bg-zinc-*` · `bg-slate-*`
- Arbitrary color values e.g. `bg-[#fff]`
- Inline styles for color

If a color is missing → add it to `@theme`. Do not improvise. Any additions require permission first.

---

## 2. Typography Rules

### Fonts

- Display / H1: `font-condensed` — Barlow Condensed 900, uppercase, tracking tight
- Body: `font-sans` — DM Sans via Next.js

### Hierarchy

- `h1` → page hero only (one per page)
- `h2` → section titles
- `h3` → sub-sections / cards

### Behaviour

- Headings must be bold and visually dominant
- Body text uses `text-text-secondary`
- Avoid long text blocks
- Responsive sizing via `clamp()` — e.g. `clamp(3.5rem, 8vw, 4.5rem)`

---

## 3. Spacing System (CRITICAL)

### Rules

- Sections: consistent vertical spacing — `py-16`, `py-20`, `py-24`
- Internal gaps: `gap-4`, `gap-6`, `gap-8`
- Always wrap content in `.container`

### Forbidden

- Arbitrary spacing e.g. `mt-[37px]`
- Mixing too many spacing values in one section
- Uneven padding/margin combinations

Note: Tailwind warnings for non-canonical classes (e.g. `w-[700px]` → `w-175`) should be resolved. Use canonical Tailwind classes wherever possible.

---

## 4. Layout Rules

- All content inside `.container`
- Max width controlled globally
- Sections clearly separated, each with a clear purpose
- Prefer left-aligned layouts for readability
- Avoid unnecessary centering of large text blocks

---

## 5. Component Rules

### Buttons

Use only: `.btn` · `.btn-primary` · `.btn-secondary`

- One primary CTA per section maximum
- Button background uses `var(--accent)` — flavor-reactive
- `transition-colors duration-300` on all color transitions
- Do not create custom button styles without approval

### Flavor chips / swatches

- Named chips preferred over anonymous dots
- Active state: `border-[var(--accent)]` + tinted background
- Inactive: muted text, no border highlight
- Selecting a chip updates `--accent` and `--glow-color` globally for that component

---

## 6. Visual Hierarchy

Each section must have:

1. One dominant element
2. Supporting content
3. Clear CTA (if needed)

Avoid multiple competing elements at equal visual weight.

---

## 7. Animation & Interaction Rules

- Scroll-driven animations use linear easing via `requestAnimationFrame` or CSS `animation-timeline: scroll()`
- Color transitions: `transition: background 0.3s ease` / `duration-300`
- No decorative animation — every motion must serve a purpose
- Glow effect: `radial-gradient` centered behind product, transitions with flavor swap

---

## 8. Implementation Rule (IMPORTANT)

Before implementing any UI:

1. Confirm understanding of this document and `brand.md`
2. Explain how the component follows these rules
3. Then implement

Do NOT jump straight to code.

---

## Summary

| File                  | Purpose                                            |
| --------------------- | -------------------------------------------------- |
| `brand.md`            | Brand principles, visual identity, experience flow |
| `design.md`           | CSS rules, tokens, component contracts             |
| `coding-standards.md` | TypeScript, React, Next.js, file structure         |
| `git-process.md`      | Branch and commit workflow                         |
| `ai-interaction.md`   | AI working process and feature workflow            |
| `docs/features/*.md`  | Per-feature specs                                  |
