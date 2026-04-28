# Git Process

**Last updated: 28 April 2026**

This file documents the Git process used in this project.

The purpose of this document is to make the working process clear, repeatable, and easy for both me and Claude to follow.

This document is only about Git process.
It is not the task tracker, feature spec, or automation system.

---

## Goal

The Git workflow should be:

- simple
- repeatable
- safe
- easy to understand
- easy to automate later

The main idea is:

1. Start from `main`
2. Create a feature branch
3. Do the work
4. Review changes
5. Commit clearly
6. Push branch to remote
7. Validate with build
8. Merge back to `main`
9. Push `main` to remote
10. Delete local and remote branch after merge

---

## Core Rules

- Never work directly on `main`
- Every piece of work happens in a feature branch
- Review changes before committing
- Use clear commit messages
- Push the feature branch to remote regularly — do not let local work go unbacked
- Run build before merging
- Merge only after successful validation
- Delete the local branch after merge
- Delete the remote branch after merge

---

## Standard Process

### Overview

```bash
git checkout main
git pull origin main
git checkout -b feature/<name>
# do the work
git status
git diff
git add .
git commit -m "feat: description"
git push origin feature/<name>
pnpm build
git checkout main
git merge feature/<name>
git push origin main
git branch -d feature/<name>
git push origin --delete feature/<name>
```

---

### 1. Start from main

Before starting new work, move to `main` and pull latest changes from remote.

```bash
git checkout main
git pull origin main
```

---

### 2. Create feature branch

```bash
git checkout -b feature/<name>
```

---

### 3. Check status

Before and during work — understand what has changed.

```bash
git status
```

---

### 4. Review changes

Before staging — read the diff to confirm what you are committing.

```bash
git diff
```

---

### 5. Stage changes

```bash
git add .
```

---

### 6. Commit changes

```bash
git commit -m "feat: description"
```

**Commit message prefixes:**

| Prefix      | Use for                              |
| ----------- | ------------------------------------ |
| `feat:`     | New feature or component             |
| `fix:`      | Bug fix                              |
| `chore:`    | Config, deps, tooling                |
| `refactor:` | Code change with no behaviour change |
| `style:`    | Tailwind / CSS only changes          |
| `docs:`     | Documentation updates                |

---

### 7. Push feature branch to remote

Push regularly during development — not just at the end. This backs up your work and allows Claude Code to reference the remote state.

```bash
git push origin feature/<name>
```

If this is the first push of a new branch:

```bash
git push -u origin feature/<name>
```

The `-u` flag sets the upstream so future pushes can use `git push` without arguments.

---

### 8. Validate build

Run build before merging. Fix all errors before proceeding.

```bash
pnpm build
```

---

### 9. Switch to main and merge

```bash
git checkout main
git merge feature/<name>
```

---

### 10. Push main to remote

After merging locally, push `main` so the remote stays current.

```bash
git push origin main
```

---

### 11. Delete local branch

```bash
git branch -d feature/<name>
```

---

### 12. Delete remote branch

```bash
git push origin --delete feature/<name>
```

---

## HTTP Buffer

If you encounter HTTP 400 errors on push, this setting is applied globally and resolves pack size issues:

```bash
git config --global http.postBuffer 157286400
```

This has already been applied to this machine.

---

## Useful Commands

Check what branches exist locally and remotely:

```bash
git branch -a
```

Check current branch:

```bash
git branch --show-current
```

Check what has been pushed vs what is local only:

```bash
git log origin/main..HEAD --oneline
```

Undo last commit but keep the changes staged:

```bash
git reset --soft HEAD~1
```

Check remote URL:

```bash
git remote -v
```
