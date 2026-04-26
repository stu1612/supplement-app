# Probell Design System (CSS & UI Rules)

## Purpose

This document defines the visual and layout rules for the Probell frontend.

All UI implementation must follow these constraints to ensure:

- consistency
- scalability
- clean architecture
- avoidance of generic or inconsistent styling

This is a **strict contract**, not a guideline.

---

## 1. Color System (NON-NEGOTIABLE)

### Source of truth

All colors MUST come from Tailwind theme tokens defined in `globals.css` via `@theme`.

### Allowed usage

Use only these classes:

- Backgrounds:
  - `bg-bg-dark`
  - `bg-bg-dark-secondary`
  - `bg-bg-light`
  - `bg-surface`

- Text:
  - `text-text-primary`
  - `text-text-secondary`
  - `text-text-dark`

- Borders:
  - `border-border`

- Accent:
  - `bg-accent`
  - `text-accent`

---

### Forbidden usage

DO NOT use:

- `text-gray-*`
- `bg-zinc-*`
- `bg-slate-*`
- arbitrary color values (e.g. `bg-[#fff]`)
- inline styles for color

If a color is missing:
→ it must be added to `@theme`, not improvised - any suggested changes must require permission first.

---

## 2. Typography Rules

### Font

- Use `font-sans` only (mapped to Inter via Next.js)

### Hierarchy

- Headings must follow semantic structure:
  - `h1` → page hero only
  - `h2` → section titles
  - `h3` → sub-sections / cards

### Behavior

- Headings must be bold and visually dominant
- Paragraphs must use `text-text-secondary`
- Avoid long text blocks

---

## 3. Spacing System (CRITICAL)

### Rule

Spacing must be **consistent and intentional**

### Allowed patterns

- Sections:
  - Use consistent vertical spacing (e.g. `py-16`, `py-20`, `py-24`)
  - Do not mix random spacing values

- Internal spacing:
  - Use consistent gaps: `gap-4`, `gap-6`, `gap-8`

- Containers:
  - Always wrap content in `.container`

---

### Forbidden

- Random spacing like `mt-[37px]`
- Mixing too many spacing values in one section
- Uneven padding/margin combinations

---

## 4. Layout Rules

### Container

- All content must be inside `.container`
- Max width is controlled globally

### Structure

- Sections must be clearly separated
- Each section must have a clear purpose

### Alignment

- Prefer left-aligned layouts for readability
- Avoid unnecessary centering of large text blocks

---

## 5. Component Rules

### Buttons

Use only:

- `.btn`
- `.btn-primary`
- `.btn-secondary`

Rules:

- Only ONE primary CTA per section
- Do not create custom button styles without approval

## 6. Visual Hierarchy

Each section must have:

1. One dominant element
2. Supporting content
3. Clear CTA (if needed)

Avoid:

- multiple competing elements
- equal visual weight everywhere

---

## 7. Design Philosophy

The UI must feel:

- clean
- structured
- confident
- product-focused

Avoid:

- SaaS/dashboard-style layouts
- overly boxy UI
- excessive borders
- visual clutter

---

## 8. Implementation Rule (IMPORTANT)

Before implementing any UI:

1. Confirm understanding of this document
2. Explain how the component will follow these rules
3. Then implement

Do NOT jump straight to code.

---

## Summary

This system ensures:

- consistent design language
- predictable UI
- scalable architecture

If something is unclear:
→ ask before implementing
