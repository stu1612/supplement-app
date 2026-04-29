# Coding Standards

**Last updated: 29 April 2026**

---

## TypeScript

- Strict mode enabled
- No `any` types — use proper typing or `unknown`
- Define interfaces for all props, API responses, and data models
- Use type inference where obvious, explicit types where helpful

---

## React

- Functional components only (no class components)
- Use hooks for state and side effects
- Keep components focused — one job per component
- Extract reusable logic into custom hooks

---

## Next.js

- Server components by default
- Only use `'use client'` when needed (interactivity, hooks, browser APIs)
- Use Server Actions for form submissions and simple mutations
- Use API routes when you need:
  - Webhooks (Stripe, GitHub, etc.)
  - File uploads with progress tracking
  - Long-running operations
  - Specific HTTP status codes or headers
  - Endpoints for future mobile/CLI clients
  - Third-party integrations
- Otherwise, fetch data directly in server components
- Dynamic routes for item/collection pages

---

## Tailwind CSS v4

**CRITICAL**: We are using Tailwind CSS v4, which uses CSS-based configuration.

- **DO NOT** create `tailwind.config.ts` or `tailwind.config.js` — those are v3
- All theme configuration is in `src/app/globals.css` using the `@theme` directive
- No JavaScript-based config allowed
- Resolve canonical class warnings when encountered — e.g. `w-[700px]` → `w-175`

### Color usage — STRICT

Only use token-based Tailwind classes. See `docs/design.md` for the full allowed and forbidden list.

```
✓ text-text-primary      ✗ text-white
✓ text-text-secondary    ✗ text-gray-400
✓ bg-bg-dark             ✗ bg-black
✓ bg-bg-light            ✗ bg-white
✓ bg-accent              ✗ bg-[#c9a24a]
```

Never use raw Tailwind palette colors (`gray`, `zinc`, `slate`, `neutral`) or arbitrary color values.
If a color is missing from the token list — raise it with the developer. Add it to `@theme` in `globals.css`. Do not improvise.

### Inline styles — when allowed

Inline styles are only permitted for **runtime computed values** that Tailwind cannot express:

```jsx
✓ style={{ opacity: anim.headlineOpacity }}         // scroll-driven runtime value
✓ style={{ transform: `translateY(${anim.y}px)` }}  // runtime computed transform
✓ style={{ background: 'var(--accent)' }}           // runtime CSS variable
✓ style={{ color: `rgba(var(--accent-rgb), 0.75)` }} // runtime CSS variable
```

```jsx
✗ style={{ color: '#ffffff' }}       // use text-text-primary
✗ style={{ backgroundColor: '#000' }} // use bg-bg-dark
✗ style={{ fontSize: '16px' }}       // use Tailwind text-base
✗ style={{ padding: '1rem' }}        // use Tailwind p-4
```

---

## File Organisation

```
src/
  app/
    (pages)/
      playground/
        page.tsx          ← feature testing only
      [route]/
        page.tsx
  components/
    [feature]/
      ComponentName.tsx
    server.ts             ← barrel file for server components
    client.ts             ← barrel file for client components
  actions/
    [feature].ts
  types/
    [feature].ts
  lib/
    [utility].ts
```

---

## Playground

All new features are built and tested in the playground before moving to production.

**Playground location:**

```
src/app/(pages)/playground/page.tsx
```

Rules:

- This is the only designated test area in the application
- Do not create any other test pages
- Do not import playground code into production pages
- The developer moves confirmed features to production manually

Workflow:

1. Build feature in playground — confirm it works
2. Developer reviews in browser
3. Developer moves to production component location
4. Import into the relevant page

---

## Component Barrel Files

When adding a new component, always update the relevant barrel file in the same commit:

- `src/components/server.ts` — server components
- `src/components/client.ts` — client components

```ts
// src/components/server.ts
export { default as Hero } from "./hero";
export { default as Goals } from "./goals";
```

Organise imports into categories: components, internal libs (api, queries, utils, enums, types), react, npm.

Never leave a component unregistered in the barrel file.

---

## Naming

- Components: PascalCase — `ItemCard.tsx`
- Files: match component name or kebab-case
- Functions: camelCase
- Constants: SCREAMING_SNAKE_CASE
- Types / Interfaces: PascalCase (no prefix)

---

## Styling

- Tailwind CSS for all styling
- Use shadcn/ui components where applicable
- No inline styles except for runtime computed values (see above)
- Dark mode first, light mode as option

---

## Code Quality

- No commented-out code unless specified
- No unused imports or variables
- Keep functions under 50 lines when possible

---

## Database

- Hygraph CMS — implementation deferred until core UI is stable
