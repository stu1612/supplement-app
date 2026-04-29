# Feature Kickoff Process

**Last updated: 29 April 2026**

> This document defines the standard process for starting and delivering every new feature.
> Both the developer and Claude Code must follow this process without deviation.
> No feature work begins until Steps 1 and 2 are complete.
> The developer handles all git operations, playground cleanup, and production placement.

---

## Responsibilities

| Responsibility                  | Owner                               |
| ------------------------------- | ----------------------------------- |
| Feature scope and spec          | Developer + Claude Chat (claude.ai) |
| Doc read, implementation, edits | Claude Code                         |
| Git operations                  | Developer                           |
| Playground cleanup              | Developer                           |
| Moving component to production  | Developer                           |
| Task tracker updates            | Claude Code                         |

---

## Step 1 — Define the Feature in Claude Chat

**Where:** claude.ai (not Claude Code)
**Who:** Developer + Claude Chat

Before opening Claude Code, define the feature in Claude Chat.

Claude Chat will:

- Clarify scope and ask questions if needed
- Produce a feature spec saved as `docs/features/[name].md`
- Confirm the spec is correct before Claude Code opens

Do not open Claude Code until the spec is confirmed.

---

## Step 2 — Claude Code Session Start

**Where:** Claude Code — Plan mode
**First message every session:**

```
Read the following docs before we start:
- docs/brand.md
- docs/design.md
- docs/coding-standards.md
- docs/ai-interaction.md
- docs/git-process.md
- docs/task-tracker.md
- docs/features/[name].md

Once read:
1. Confirm you have read all documents
2. Summarise the feature goal in your own words
3. List the specific tasks you understand need to be implemented
4. State the next step you will take

Do not take any action until the developer confirms your summary is correct.
```

**Hard stop — do not proceed until developer replies: "confirmed, proceed"**

---

## Step 3 — Branch and Task Tracker

Once the developer confirms the summary, Claude Code must complete these two steps in order before any implementation:

**3a. Instruct the developer to create the branch:**

```
Please create the feature branch:
git checkout main
git pull origin main
git checkout -b feature/[name]
Confirm when the branch is created.
```

**3b. Update task tracker — once branch is confirmed:**

Update `docs/task-tracker.md`:

- Set Active Feature name and branch
- Set Status: In Progress
- List the feature goals from the spec under "What is to be done"

Confirm to the developer that the tracker has been updated before proceeding.

**Hard stop — do not begin implementation until both 3a and 3b are complete.**

---

## Step 4 — Build in Playground

All implementation happens in the playground page only.

**Playground location:**

```
src/app/(pages)/playground/page.tsx
```

Rules:

- Build the entire feature in the playground page
- Do not create additional files unless required by the feature spec
- Do not touch any production page or component
- Do not touch any existing component outside the playground

When implementation is complete, Claude Code must:

1. Summarise what was built
2. List anything that deviated from the spec and why
3. Ask: **"Are there any edits you would like to make before we close this feature?"**

---

## Step 5 — Edit Loop

After the initial build is complete, an edit loop begins.

The edit loop continues until the developer explicitly closes it.

**Claude Code behaviour during edit loop:**

- Make the requested edit in the playground
- Confirm what was changed
- Ask: **"Any further edits, or is the feature complete?"**

This repeats until the developer says the feature is complete.

**Do not exit the edit loop until the developer explicitly says the feature is complete.**

---

## Step 6 — Feature Complete

When the developer confirms the feature is complete, Claude Code must:

**6a. Update `docs/task-tracker.md`:**

- Move feature from Active to Completed
- Add completion date
- Add a one line summary of what was built
- Set Active Feature to: None — ready for next feature

**6b. Generate a commit message:**

Provide a conventional commit message for the developer to use:

```
feat: [short description of what was built]

- [key change 1]
- [key change 2]
- [key change 3]
```

**Claude Code stops here.** The developer handles all remaining steps.

---

## Developer — Remaining Steps After Feature Complete

These steps are the developer's responsibility and are not performed by Claude Code:

```bash
# Review playground and clean up
# Move component/styles to production location if needed
# Import into relevant page

pnpm build
# Fix any errors

git add .
git commit -m "[use the generated commit message]"
git push -u origin feature/[name]
git checkout main
git merge feature/[name]
git push origin main
git branch -d feature/[name]
git push origin --delete feature/[name]
```

---

## Control Points

| Step                  | Gate                                                      | Owner       |
| --------------------- | --------------------------------------------------------- | ----------- |
| Feature spec          | Confirmed correct in Claude Chat before Claude Code opens | Developer   |
| Session start summary | Developer confirms understanding before any action        | Developer   |
| Branch creation       | Developer confirms branch exists before tracker update    | Developer   |
| Tracker updated       | Claude Code confirms update before implementation         | Claude Code |
| Edit loop             | Continues until developer says feature is complete        | Developer   |
| Commit message        | Generated by Claude Code, used by developer               | Claude Code |
| Git operations        | Developer only                                            | Developer   |
| Production placement  | Developer only                                            | Developer   |

---

## Rules

- Never define feature scope inside Claude Code — always in Claude Chat first
- Never skip the Step 2 doc read and summary
- Never implement before branch is created and tracker is updated
- Never build outside the playground page
- Never touch production pages or components during implementation
- Never auto-commit or run git merge/push — developer handles all git
- Never exit the edit loop without explicit developer confirmation
- One feature per branch — no mixing of unrelated changes
