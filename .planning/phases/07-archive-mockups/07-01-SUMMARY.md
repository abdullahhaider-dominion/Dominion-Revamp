---
phase: 07-archive-mockups
plan: 01
subsystem: archive
tags: [git-subtree, mockups, MOCK-01, archive-verify]

requires:
  - phase: 06-parity-verification
    provides: Production tree stable; mockups/ still present for archive
provides:
  - Local branch archive/mockups with 66-commit mockups-only history
  - Sibling working-tree repo at locked D-02 path
  - 07-ARCHIVE.md SoT coordinates for Phase 8
  - archive-verify.mjs Nyquist gate (exit 0)
affects: [08-docs-retarget, 09-remove-mockups]

tech-stack:
  added: []
  patterns: [git subtree split → local archive branch + --no-hardlinks sibling clone]

key-files:
  created:
    - .planning/phases/07-archive-mockups/scripts/archive-verify.mjs
    - .planning/phases/07-archive-mockups/07-ARCHIVE.md
    - .planning/phases/07-archive-mockups/07-01-SUMMARY.md
  modified: []

key-decisions:
  - "Fresh execute-time subtree split (branch was absent; documented as fresh split)"
  - "Sibling origin kept pointing at production local path (provenance); no GitHub remote"
  - "Sibling provenance README left untracked so HEAD stays equal to archive tip for Nyquist gate"

patterns-established:
  - "Phase archive: subtree split + sibling clone + ARCHIVE.md + verify script; never push origin; never delete source tree in archive phase"

requirements-completed: [MOCK-01]

duration: 6min
completed: 2026-09-05
---

# Phase 7 Plan 01: Archive Mockups Summary

**MOCK-01 satisfied locally: `git subtree split` → `archive/mockups` tip `3e9401bd85c6848cbbf073d526e5d48ad2450834` (66 commits, 139 files), sibling repo at locked path with matching HEAD, `07-ARCHIVE.md` + `archive-verify.mjs` exit 0 — no origin push, `mockups/` retained on main.**

## Performance

- **Duration:** ~6 min
- **Started:** 2026-09-05T08:22:46Z
- **Completed:** 2026-09-05T08:28:00Z
- **Tasks:** 3/3
- **Files modified:** 3 planning artifacts (production repo)

## Accomplishments

- Authored Nyquist gate `archive-verify.mjs` (branch, history ≥2, 139-file set match, sibling, ARCHIVE.md; progressive allow flags; T-07-01 path safety)
- Fresh `git subtree split --prefix=mockups -b archive/mockups` (no prior branch; ~108s)
- Materialized sibling at `/Users/usama/Desktop/Dominion Markets/Dominion-Markets-mockups-archive` via `--no-hardlinks`; branch renamed to `main`; HEAD === tip
- Recorded SoT coordinates + push-later one-liners + hifi prior-art (not SoT) in `07-ARCHIVE.md`

## Task Commits

1. **Task 1: Wave 0 — author archive-verify.mjs** — `786cc7e` (chore)
2. **Task 2: Preflight + fresh subtree split** — branch-only (no production-tree file commit); tip `3e9401bd85c6848cbbf073d526e5d48ad2450834`
3. **Task 3: Sibling + 07-ARCHIVE.md + SUMMARY** — `af3f9df` (docs)

**Plan metadata:** _(docs complete commit after state updates)_

## MOCK-01 Evidence

| Check | Result |
|-------|--------|
| Archive tip (full SHA) | `3e9401bd85c6848cbbf073d526e5d48ad2450834` |
| `git rev-list --count archive/mockups` | 66 (≥ 2) |
| Archive tree files | 139 |
| Main `git ls-files mockups` | 139 (still present) |
| Path set match | empty `diff` (stripped main vs archive) |
| Sibling path | `/Users/usama/Desktop/Dominion Markets/Dominion-Markets-mockups-archive` |
| Sibling HEAD | `3e9401bd85c6848cbbf073d526e5d48ad2450834` |
| Mid-gate verify | exit 0 (`--allow-missing-sibling --allow-missing-archive-md`) |
| Full verify | exit 0 (no allow flags) |
| `origin/archive/mockups` remote-tracking | absent (no push) |

## Attestations

- **No `git push` to `origin`** was executed during this plan (no `git subtree push`, no remote update for `archive/mockups`).
- **`mockups/` was never deleted** from production `main`; count remains 139.
- **No `web/` app changes** for archive.
- **Fresh split:** `archive/mockups` did not exist at execute time; created via execute-time subtree split (not a stale reuse).

## Files Created/Modified

- `.planning/phases/07-archive-mockups/scripts/archive-verify.mjs` — Nyquist MOCK-01 automated gate
- `.planning/phases/07-archive-mockups/07-ARCHIVE.md` — Phase 8 SoT record
- `.planning/phases/07-archive-mockups/07-01-SUMMARY.md` — this file

## Decisions Made

- Sibling `origin` remains the production local path (RESEARCH OQ1); no GitHub remote.
- Provenance README in sibling left **untracked** so `rev-parse HEAD` stays equal to archive tip (verify assert 6). Documented in `07-ARCHIVE.md`.

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 2 - Correctness] Sibling provenance README vs HEAD===tip gate**
- **Found during:** Task 3
- **Issue:** Committing README in sibling advances HEAD past archive tip, failing assert 6.
- **Fix:** Left `README-ARCHIVE-PROVENANCE.md` untracked in sibling working tree; HEAD restored to tip; provenance covered in `07-ARCHIVE.md`.
- **Files modified:** sibling working tree only (outside production repo)
- **Verification:** `archive-verify.mjs` exit 0

## Auth Gates

None.

## Known Stubs

None — archive coordinates are real tip SHA / paths; no placeholder SoT.

## Threat Flags

None beyond plan register (T-07-01 mitigated in verify script; no new network/auth endpoints).

## Issues Encountered

None blocking.

## User Setup Required

None — push to origin deferred until explicit request (D-03).

## Next Phase Readiness

- Phase 8 can retarget docs/skills to `07-ARCHIVE.md`.
- Phase 9 may delete `mockups/` only after Phase 8.
- **Do not** mark ROADMAP Phase 7 complete here (orchestrator owns).

## Self-Check: PASSED

- FOUND: `.planning/phases/07-archive-mockups/scripts/archive-verify.mjs`
- FOUND: `.planning/phases/07-archive-mockups/07-ARCHIVE.md`
- FOUND: `.planning/phases/07-archive-mockups/07-01-SUMMARY.md`
- FOUND: commit `786cc7e` (Task 1)
- FOUND: commit `af3f9df` (Task 3)
- FOUND: archive tip `3e9401bd85c6848cbbf073d526e5d48ad2450834`
- FOUND: sibling path exists; HEAD matches tip
- `archive-verify.mjs` exit 0
- main still has 139 `mockups/` paths; no `origin/archive/mockups`
