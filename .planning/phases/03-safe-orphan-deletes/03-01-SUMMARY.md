---
phase: 03-safe-orphan-deletes
plan: 01
subsystem: assets
tags: [orphan-delete, css, png, asset-cleanup]

requires:
  - phase: 02-asset-inventory
    provides: Confirmed ASSET-03/ASSET-04 orphans vs keep paths
provides:
  - Dead web/src/styles/mockups.css removed (ASSET-03)
  - Untracked repo-root Hero-background.png removed (ASSET-04)
  - Served public CSS and live hero PNG preserved
affects: [04-minimal-react-unlock, 05-public-asset-prune]

tech-stack:
  added: []
  patterns: [allowlist-only orphan deletes, fail-closed npm run build proof]

key-files:
  created:
    - .planning/phases/03-safe-orphan-deletes/03-01-SUMMARY.md
  modified:
    - web/src/styles/mockups.css (deleted)

key-decisions:
  - "D-01: One coherent commit for orphan removals"
  - "D-02: Kept web/src/styles/ because cinematic-hero.css remains"
  - "D-03: Verified with file/git checks and npm run build"

patterns-established:
  - "Phase 3 deletes only allowlisted non-runtime orphans; public inventory candidates deferred to Phase 5"

requirements-completed: [ASSET-03, ASSET-04]

duration: 5min
completed: 2026-09-05
---

# Phase 3 Plan 01: Safe Orphan Deletes Summary

**Removed unused `web/src/styles/mockups.css` (ASSET-03) and untracked repo-root `Hero-background.png` (ASSET-04) in one commit, preserving served public CSS and live hero PNG.**

## Performance

- **Duration:** ~5 min
- **Started:** 2026-09-04T20:48:22Z
- **Completed:** 2026-09-04T20:49:00Z
- **Tasks:** 3/3
- **Files modified:** 1 tracked deletion (+ 1 untracked disk removal)

## Accomplishments

- **ASSET-03:** Deleted dead `web/src/styles/mockups.css` after zero `web/src` import matches for `styles/mockups` / `src/styles/mockups.css` / `@/styles/mockups`
- **ASSET-04:** Removed untracked repo-root `Hero-background.png` from disk (~2.1MB); live `web/public/assets/hero/Hero-background.png` kept
- Kept `web/src/styles/` (non-empty: `cinematic-hero.css` remains per D-02)
- `npm run build` in `web/` exited 0

## Task Commits

1. **Task 1: Pre-delete import scan and keep-path proof** — scan only (artifact `.predelete-scan.txt`, untracked; no code commit)
2. **Task 2: Delete orphans, D-02 empty-dir rule, single commit** — `00481ed` (chore)
3. **Task 3: Post-delete checks and web build** — SUMMARY + verification (this file)

**Orphan cleanup commit:** `00481ed` (`00481edc07af358b3be254c1dbc649a5ea751047`)

## Files Created/Modified

### Deleted (allowlist only)

| Path | Requirement | Notes |
|------|-------------|-------|
| `web/src/styles/mockups.css` | ASSET-03 | Tracked; removed in `00481ed` |
| `Hero-background.png` (repo root) | ASSET-04 | **Untracked** (`??`); removed from working tree only — not in commit tree |

### Kept (verified present after delete)

| Path | Why |
|------|-----|
| `web/public/mockups.css` | Served stylesheet; `layout.tsx` links `href="/mockups.css"` |
| `web/public/assets/hero/Hero-background.png` | Live hero; `CinematicHero.tsx` uses `/assets/hero/Hero-background.png` |
| `web/src/styles/cinematic-hero.css` | Still imported via `@/styles/cinematic-hero.css` |
| `web/src/styles/` directory | Retained (D-02: not empty) |

### Explicit non-deletes

- **No `web/public/` inventory delete candidates** from Phase 2 (`02-INVENTORY.json` delete class) were deleted or staged
- `git show --name-status HEAD` lists only `D web/src/styles/mockups.css`

## Decisions Made

- Followed D-01/D-02/D-03 exactly: one chore commit for tracked CSS; styles dir kept; build proof
- Root PNG was untracked — disk removal only; commit message still documents ASSET-04

## Deviations from Plan

None - plan executed exactly as written.

## Verification Evidence (D-03)

```text
test ! -e web/src/styles/mockups.css          → pass
test ! -e Hero-background.png                 → pass
test -f web/public/mockups.css                → pass
test -f web/public/assets/hero/Hero-background.png → pass
layout.tsx: href="/mockups.css"               → match line 48
CinematicHero: /assets/hero/Hero-background.png → match lines 497, 587
CinematicHero: @/styles/cinematic-hero.css    → match line 19
rg dead CSS import paths in web/src           → no matches

cd web && npm run build                       → exit 0
  Next.js 16.3.4 (Turbopack) — Compiled successfully
```

## Requirements

- **ASSET-03:** Satisfied — dead `web/src/styles/mockups.css` removed after import scan
- **ASSET-04:** Satisfied — root `Hero-background.png` removed; public hero PNG kept

## Self-Check: PASSED

- `web/src/styles/mockups.css` absent from disk and `git ls-files`
- Root `Hero-background.png` absent from disk
- Keep paths present; wiring unchanged
- Commit `00481ed` exists; no `web/public/` deletions in that commit
- `npm run build` exit 0
- This SUMMARY records ASSET-03 and ASSET-04
