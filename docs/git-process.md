# Git Process

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

1. start from `main`
2. create a feature branch
3. do the work
4. review changes
5. commit clearly
6. validate with build
7. merge back to `main`
8. delete local branch after merge

---

## Core Rules

- Never work directly on `main`
- Every piece of work should happen in a feature branch
- Review changes before committing
- Use clear commit messages
- Run build before merging
- Merge only after successful validation
- Delete the feature branch after merge

---

## Standard Process

### Overview

git checkout main
git pull origin main
git checkout -b feature/hero
git diff
git add .
git commit -m "feat: add hero section layout"
pnpm build
git checkout main
git merge feature/hero
git branch -d feature/hero

### 1. Start from main

Before starting new work, move to `main` and pull latest changes.

```bash
git checkout main
git pull origin main
```

### 2. New Branch

```bash
git switch -b feature/<name>
```

### 3. Status

```bash
git status
```

### 4. Review Changes

```bash
git diff
```

### 5. Stage Changes

```bash
git add .
```

### 6. Commit Changes

```bash
git commit -m "feat: message"
```

### 7. Validate code

```bash
pnpm build
```

### 8. After build passes, switch to main

```bash
git switch main
```

### 9. Merge feature branch

```bash
git merge feature/<name>
```

### 10. Delete local branch

```bash
git branch -d feature/<name>
```
