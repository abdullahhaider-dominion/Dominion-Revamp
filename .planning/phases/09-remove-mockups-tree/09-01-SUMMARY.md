---
phase: 09-remove-mockups-tree
plan: 01
subsystem: mockups-retirement
tags: [mockups, git-rm, MOCK-03, archive, nyquist]

requires:
  - phase: 07-archive-mockups
    provides: archive/mockups tip + sibling + 07-ARCHIVE.md
  - phase: 08-retarget-design-docs
    provides: operational docs citing 07-ARCHIVE.md
provides:
  - In-repo mockups/ removed from production working tree (MOCK-03)
  - remove-verify.mjs post-delete Nyquist gate
  - Operational docs without until-Phase-9 presence language
affects: [10-lean-check, verify-work]

tech-stack:
  added: []
  patterns: [git-rm coherent delete, KEEP production ports, D-01 preflight before delete]

key-files:
  created:
    - .planning/phases/09-remove-mockups-tree/scripts/remove-verify.mjs
    - .planning/phases/09-remove-mockups-tree/09-01-SUMMARY.md
  modified:
    - readme.md
    - web/README.md
    - .planning/PROJECT.md
    - .cursor/skills/dominion-section-redesign/SKILL.md
    - CLAUDE.md
  deleted:
    - mockups/ (139 tracked files via git rm -r)

key-decisions:
  - "D-02: coherent git rm -r mockups commit (not bare rm -rf as primary)"
  - "KEEP web/public/mockups.css + web/src/lib/mockups-main.js (name collision ≠ tree)"
  - "REQUIREMENTS MOCK-03 / ROADMAP phase-complete left for verify-work"

patterns-established:
  - "Post-delete verify must NOT reuse Phase 7 archive-verify (expects 139 on main)"
  - "Deny-list tense cleanup on five operational targets only"

requirements-completed: [MOCK-03]

duration: 4min
completed: 2026-09-05
---

# Phase 9 Plan 01: Remove Mockups Tree Summary

**MOCK-03 satisfied: in-repo `mockups/` removed (~64M) after D-01 archive preflight; KEEP ports and `archive/mockups` tip unchanged; `remove-verify` + `web` build both exit 0.**

## Performance

- **Duration:** ~4 min
- **Started:** 2026-09-05T09:00:19Z
- **Completed:** 2026-09-05T09:04:18Z
- **Tasks:** 3/3
- **Files modified:** 144 in delete commit + script + SUMMARY (docs tense + tree)

## Accomplishments

- D-01 preflight passed before any delete (tip/sibling/ARCHIVE/cites)
- `git rm -r mockups` coherent delete (~64M working-tree savings; 139 tracked files)
- KEEP ports present: `web/public/mockups.css`, `web/src/lib/mockups-main.js`
- D-03 tense cleanup on five operational docs (deny-list clean; still cite `07-ARCHIVE.md`)
- Nyquist gate `remove-verify.mjs` exit 0; `cd web && npm run build` exit 0

## Task Commits

1. **Task 1: Author remove-verify.mjs + D-01 preflight** - `f36415d` (chore)
2. **Task 2: git rm mockups + D-03 tense cleanup** - `4ac6d9f` (chore)
3. **Task 3: Full remove-verify + build + SUMMARY** - (this docs commit)

## Files Created/Modified

- `.planning/phases/09-remove-mockups-tree/scripts/remove-verify.mjs` — post-delete MOCK-03 asserts (T-09-01)
- `mockups/` — removed from FS + git index
- `readme.md`, `web/README.md`, `.planning/PROJECT.md`, `.cursor/skills/dominion-section-redesign/SKILL.md`, `CLAUDE.md` — ARCHIVE + `web/` SoT; no until-Phase-9 presence language

## MOCK-03 Evidence

| Check | Result |
|-------|--------|
| `test ! -e mockups` | pass |
| `git ls-files mockups` empty | pass |
| `web/public/mockups.css` exists | pass |
| `web/src/lib/mockups-main.js` exists | pass |
| `node …/remove-verify.mjs` | exit **0** |
| `cd web && npm run build` | exit **0** |
| Byte savings (pre-delete `du -sh mockups`) | **64M** |

## D-05 Attestations

| Item | Value |
|------|-------|
| Archive tip (`git rev-parse archive/mockups`) | `3e9401bd85c6848cbbf073d526e5d48ad2450834` |
| Sibling HEAD | `3e9401bd85c6848cbbf073d526e5d48ad2450834` (unchanged vs pre-delete) |
| `git push` | **not run** |
| `archive/mockups` / sibling mutation | **none** |
| `web/src` edits | **none** (no runtime `../mockups` import found) |

## Phase-close ownership

REQUIREMENTS.md MOCK-03 checkbox and ROADMAP Phase 9 complete mark are **intentionally not** flipped here — orchestrator / verify-work owns phase close. SUMMARY records MOCK-03 evidence only.

## Decisions Made

- Prefer `git rm -r mockups` as the delete mechanism (D-02)
- Script-first Wave 0 commit, then coherent delete+docs commit
- Skip Phase 7 `archive-verify.mjs` as post-delete success gate

## Deviations from Plan

None - plan executed exactly as written.

## Threat Flags

None — no new network endpoints, auth paths, or trust-boundary schema changes beyond planned tree delete + verify script.

## Known Stubs

None.

## Self-Check: PASSED

- FOUND: `.planning/phases/09-remove-mockups-tree/scripts/remove-verify.mjs`
- FOUND: `.planning/phases/09-remove-mockups-tree/09-01-SUMMARY.md`
- FOUND: `web/public/mockups.css`
- FOUND: `web/src/lib/mockups-main.js`
- FOUND: commits `f36415d`, `4ac6d9f`
- ABSENT: `mockups/` working tree
- VERIFY_EXIT: 0
- BUILD_EXIT: 0
