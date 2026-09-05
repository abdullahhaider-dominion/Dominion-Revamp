# Phase 1: Track Web App - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md — this log preserves the alternatives considered.

**Date:** 2026-09-05
**Phase:** 1-Track Web App
**Areas discussed:** First-commit contents

---

## First-commit contents

| Option | Description | Selected |
|--------|-------------|----------|
| A) Track all of `web/public` now | Honest snapshot; inventory then prune later | ✓ |
| B) Exclude known large orphans from first commit | Smaller commit; skips Phase 2 proof | |
| C) You decide | Lock roadmap-safe default (A) | |

**User's choice:** A — Track all of `web/public` now  
**Notes:** Aligns with roadmap order (inventory → prune). Larger first commit accepted.

| Option | Description | Selected |
|--------|-------------|----------|
| A) Only paths under `web/` | Use `web/.gitignore`; leave root orphans untracked | ✓ |
| B) Also add root `.gitignore` same commit | Ignore `.DS_Store` etc. but still don’t add root orphans | |
| C) You decide | | |

**User's choice:** A — Only paths under `web/`  
**Notes:** Root `Hero-background.png` / `.DS_Store` stay out of Phase 1.

---

## Claude's Discretion

- Commit shape (single coherent `web/` add)
- Rely on existing `web/.gitignore` only
- Keep current generated-file ignore policy (`next-env.d.ts`, `*.tsbuildinfo`)

## Deferred Ideas

- Early exclusion of public orphans → Phase 2/5
- Root hero PNG / dead CSS → Phase 3
- Mockups retirement → Phases 7–9
