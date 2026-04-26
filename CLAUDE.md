# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
pnpm dev        # Start dev server
pnpm build      # Production build
pnpm start      # Start production server
pnpm lint       # Run ESLint
```

## Architecture

Next.js 16 app using the App Router with React 19 and Tailwind CSS v4.

**Key conventions:**

- Path alias `@/*` maps to `src/*`
- Pages live under `src/app/(pages)/` in a route group — this keeps them out of the URL path
- Components are co-located under `src/app/components/` with one folder per component (e.g. `components/hero/index.tsx`)
- Server component re-exports are centralized in `src/app/components/servers.ts` — import shared components from there rather than directly
- React Compiler is enabled (`reactCompiler: true` in `next.config.ts`) — avoid manual `useMemo`/`useCallback` optimizations

**Styling:**

- Tailwind v4 — theme tokens are defined via `@theme` in `globals.css`, not a `tailwind.config` file
- Custom design tokens (colors, typography scale, spacing) are in `globals.css` under `@theme` and `:root`
- Reusable CSS primitives (`.container`, `.btn`, `.btn-primary`, `.btn-secondary`, `.surface-card`, `.section-spacing`) are defined in `globals.css` — use these before reaching for one-off Tailwind utilities
- Dark theme by default (`color-scheme: dark` on `html`)
