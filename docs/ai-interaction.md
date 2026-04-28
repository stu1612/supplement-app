# AI Interaction Guidelines

**Last updated: 28 April 2026**

---

## Communication

- Be concise and direct
- Explain non-obvious decisions briefly
- Ask before large refactors or architectural changes
- Don't add features not in the current feature spec
- Never delete files without clarification

---

## Workflow

This is the standard process for every feature or fix.

### 1. Document

Create a feature spec file at `docs/features/[feature-name].md`.

Use the hero spec (`docs/features/hero.md`) as the template. Every feature spec must include:

- Current build state (what is confirmed working)
- Design tokens relevant to the feature
- Animation or interaction logic (if applicable)
- Next iteration tasks with priority labels
- What is not yet built

### 2. Branch

```bash
git checkout main
git pull origin main
git checkout -b feature/[name]
```

### 3. Implement

Build the feature in the **features playground first** — `src/app/features/page.tsx`
using the features component at `src/components/feature/index.ts`.

Verify it works correctly in the playground before touching any production component.
Only move to the production component location once the feature is confirmed working.

Before writing any code, confirm:

- How the component follows `design.md`
- How it aligns with `brand.md` principles
- What Tailwind tokens and CSS custom properties will be used

### 4. Test

Verify in the browser. Run build and fix all errors before proceeding.

```bash
pnpm build
```

### 5. Iterate

Make changes based on review. Keep changes minimal and scoped to the feature.

### 6. Commit

Only after build passes and everything works. Ask before committing.

```bash
git commit -m "feat: [description]"
```

### 7. Merge

```bash
git checkout main
git merge feature/[name]
```

### 8. Delete branch

```bash
git branch -d feature/[name]
```

### 9. Update spec

Mark tasks as complete in `docs/features/[feature-name].md`. Add completion date.

---

## Feature Spec Template

When creating a new feature doc, use this structure:

```markdown
# Probell — [Feature Name] Spec

**Version · Date**
**Status: [In progress / Complete]**

## Current Build — Confirmed Working ✓

## Design Tokens

## Animation / Interaction Logic (if applicable)

## Next Iteration Tasks

## What Is Not Yet Built
```

---

## Branching

- Every feature or fix gets its own branch
- Naming: `feature/[name]` or `fix/[name]`
- Ask to delete branch after merge

---

## Commits

- Ask before committing — do not auto-commit
- Conventional commit messages: `feat:` · `fix:` · `chore:` · `refactor:`
- One feature or fix per commit
- Never include "Generated with Claude" in commit messages

---

## When Stuck

- Stop after 2–3 failed attempts
- Explain the issue clearly
- Ask for clarification before trying again
- Do not apply random fixes

---

## Code Change Rules

- Minimal changes to accomplish the task
- Do not refactor unrelated code unless asked
- Do not add unrequested features
- Preserve existing patterns in the codebase
- Resolve Tailwind canonical class warnings when encountered

---

## Code Review

Review AI-generated code periodically, especially for:

- Security — auth checks, input validation
- Performance — unnecessary re-renders, N+1 queries
- Logic — edge cases and error states
- Patterns — consistency with existing codebase

---

## Project Document Map

| File                       | Read when                              |
| -------------------------- | -------------------------------------- |
| `docs/brand.md`            | Starting any new section or feature    |
| `docs/design.md`           | Before writing any UI code             |
| `docs/coding-standards.md` | Before writing any component or logic  |
| `docs/git-process.md`      | Before branching or committing         |
| `docs/features/[name].md`  | Before implementing a specific feature |
