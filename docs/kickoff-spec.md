# Feature Kickoff Process

**Last updated: 28 April 2026**

> This document defines the standard process for starting and delivering every new feature.
> Both the developer and Claude must follow this process without deviation.
> No feature work begins until Steps 1 and 2 are complete.

---

## Overview

Every feature follows this sequence:

1. Define scope in Claude Chat (claude.ai) — not in Claude Code
2. Read docs and confirm understanding in Claude Code
3. Start git process — branch created before any code
4. Build in features playground first
5. Developer reviews before moving to production
6. Commit, merge, close

---

## Step 1 — Define the Feature in Claude Chat

**Where:** claude.ai chat (not Claude Code)
**Who:** Developer + Claude Chat

Before opening Claude Code, define the feature here in the chat.

Describe what you want to build. Claude Chat will:

- Clarify scope and ask questions if needed
- Produce a feature spec: `docs/features/[name].md`
- Produce a plain English opening prompt to paste into Claude Code

Do not start Claude Code until the spec is written and you have confirmed it is correct.

---

## Step 2 — Claude Code Session Start

**Where:** Claude Code terminal
**First message every session — paste this before any instructions:**

```
Read the following docs before we start:
- docs/brand.md
- docs/design-system.md
- docs/coding-standards.md
- docs/ai-interaction.md
- docs/task-tracker.md
- docs/backlog.md
- docs/features/[name].md

Confirm you have read them. Summarise the current feature and what you understand
the goal to be before doing anything else.
```

**Do not proceed until Claude Code's summary is correct.**

If the summary is wrong or incomplete, correct it before any code is written.

---

## Step 3 — Git Process

Once the summary is confirmed, instruct Claude Code:

```
Follow the git process in docs/git-process.md.
Start from main, pull latest, and create the branch feature/[name].
Tell me when the branch is created before doing anything else.
```

Wait for confirmation that the branch exists before proceeding.

---

## Step 4 — Build in Features Playground

Remind Claude Code at the start of every implementation:

```
Build this in the features playground first.
- Playground page: src/app/features/page.tsx
- Playground component: src/components/feature/index.ts

Do not touch any production component until I confirm the playground version works.
```

Claude Code implements the feature in the playground only.

---

## Step 5 — Developer Review

**Who:** Developer only

Check the playground in the browser. Verify against the feature spec.

If changes are needed — iterate in the playground. Do not move forward until satisfied.

When ready, instruct Claude Code:

```
The playground version is confirmed.
Move the component to its production location as defined in the feature spec.
Do not change any other files.
```

---

## Step 6 — Validate Build

```
Run pnpm build.
Fix any errors before proceeding.
Do not commit until the build passes cleanly.
```

---

## Step 7 — Commit and Close

Once build passes and production component is confirmed working:

```
Follow the git process in docs/git-process.md.
- Commit with an appropriate message
- Push the feature branch
- Merge to main
- Push main to remote
- Delete local and remote branch

Then update docs/task-tracker.md:
- Mark this feature as complete with today's date
- Add a one line summary to the completed features section
- Set Active Feature to none
```

---

## Control Points

These are the moments where the developer reviews and approves before Claude proceeds.

| Step                    | Gate                                                        |
| ----------------------- | ----------------------------------------------------------- |
| Feature spec            | Developer confirms spec is correct before Claude Code opens |
| Session start summary   | Developer confirms Claude's understanding before any code   |
| Branch creation         | Developer confirms branch exists before implementation      |
| Playground → production | Developer reviews in browser and explicitly approves        |
| Commit                  | Developer approves after build passes                       |
| Merge                   | Developer approves after final review                       |

**Claude Code does not pass a control point without explicit developer instruction.**

---

## Rules

- Never define feature scope inside Claude Code — always define it here in Claude Chat first
- Never skip the Step 2 doc read and summary — it takes 30 seconds and prevents misaligned work
- Never move from playground to production without a browser review
- Never commit without a passing build
- Never auto-commit — always ask for approval first
- One feature per branch — no mixing of unrelated changes
