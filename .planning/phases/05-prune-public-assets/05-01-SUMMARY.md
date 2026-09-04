---
phase: 05-prune-public-assets
plan: 01
subsystem: assets
tags: [public-assets, prune, ASSET-02, nextjs, static]

requires:
  - phase: 04-minimal-react-unlock
    provides: 04-RESCAN.json still_unreferenced delete SoT + VERIFY_ONLY_CLEAR unlock
  - phase: 02-asset-inventory
    provides: class=delete vs class=keep partition and delete_bytes estimate
provides:
  - 55 unused web/public assets removed (ASSET-02)
  - Leaner public tree (~32.6 MB inventory-estimated savings)
affects: [06-parity-verification]

tech-stack:
  added: []
  patterns:
    - "Delete only 04-RESCAN still_unreferenced ∩ inventory class=delete; abort on set mismatch"
    - "Single coherent prune commit; denylist keeps never staged"

key-files:
  created:
    - .planning/phases/05-prune-public-assets/05-DELETE-LIST.txt
    - .planning/phases/05-prune-public-assets/05-01-SUMMARY.md
  modified:
    - web/public/assets/** (53 tracked deletes in prune commit)
    - web/public/.DS_Store (untracked removal)
    - web/public/assets/.DS_Store (untracked removal)

key-decisions:
  - "D-01: Post-prune proof via disk/git checks and npm run build in web/"
  - "Delete SoT = 04-RESCAN still_unreferenced (55) with set equality to inventory class=delete"
  - "One prune commit for tracked deletes; untracked .DS_Store removed from disk only"

patterns-established:
  - "Allowlist loop from 05-DELETE-LIST.txt only — never invent paths"
  - "Pre/post assert all 82 inventory keep paths still exist"

requirements-completed: [ASSET-02]

duration: 4min
completed: 2026-09-05
---

# Phase 5 Plan 01: Prune Public Assets Summary

**Removed all 55 Phase 4–cleared unused `web/public` assets (ASSET-02), cutting ~32.6 MB (34209521 bytes inventory estimate) while preserving every inventory keep — including hero PNG, mockups.css, and live logos.**

## Performance

- **Duration:** ~4 min
- **Started:** 2026-09-04T21:26:30Z
- **Completed:** 2026-09-04T21:28:25Z
- **Tasks:** 3/3
- **Files modified:** 55 paths deleted from disk (53 tracked in git + 2 untracked `.DS_Store`); 2 planning artifacts created

## Accomplishments

- Validated `still_unreferenced` (55) == inventory `class=delete` (55); symmetric difference empty; `04-UNLOCK.md` still `VERIFY_ONLY_CLEAR`
- Deleted exactly the 55 allowlisted paths; all 82 inventory keeps remain; denylist untouched
- D-01: `npm run build` in `web/` exited **0** after prune
- Documented **ASSET-02** complete with savings **34209521** bytes (**~32.6 MB**)

## Task Commits

Each task was committed atomically:

1. **Task 1: Load and validate the 55-path delete list** — `dbffc8e` (chore)
2. **Task 2: Delete allowlisted paths only and commit once** — `c643daf` (chore) — **the prune commit**
3. **Task 3: Build proof and write ASSET-02 SUMMARY** — `3095ce4` (docs)

## Files Created/Modified

- `.planning/phases/05-prune-public-assets/05-DELETE-LIST.txt` — validated 55-path allowlist (rescan order)
- `.planning/phases/05-prune-public-assets/05-01-SUMMARY.md` — execution proof
- 53 tracked assets under `web/public/assets/` — removed in `c643daf`
- `web/public/.DS_Store`, `web/public/assets/.DS_Store` — untracked; removed from disk (not in git history)

## Decisions Made

- Followed locked **D-01** and CONTEXT discretion: SoT from `04-RESCAN.json`, one coherent prune commit, hard stop on keeps
- Empty directories after deletes: none were fully empty (keeps remain in shared folders); no directory removals

## Proofs

| Check | Result |
|-------|--------|
| Delete-list paths absent from disk | **55/55** gone |
| Inventory keep paths present | **82/82** present |
| Denylist: `Hero-background.png`, `mockups.css`, four keep logos | All present; none in delete set |
| Prune commit | `c643daf` — `chore(05-01): prune 55 unused web/public assets (ASSET-02)` |
| Paths in prune commit ∩ keep set | Empty (53 tracked deletes only) |
| `web/src` touched in prune commit | No |
| `npm run build` (`web/`) | Exit **0** — Next.js 16.3.4 compiled; `/` and `/_not-found` static |
| Byte savings | **34209521** bytes (**~32.6 MB**) from `02-INVENTORY.json` `summary.delete_bytes` (inventory-estimated, not re-measured with `du`) |

**ASSET-02:** Only inventory-proven unused public assets deleted; live marketing assets preserved.

## Deviations from Plan

None - plan executed exactly as written.

Note: 2 of 55 paths were untracked `.DS_Store` files — removed with `rm` and documented here; the single prune commit contains the 53 previously tracked assets (per plan: untracked removal needs no git stage).

## Issues Encountered

None

## User Setup Required

None

## Next Phase Readiness

- Public tree pruned; build green
- **Deferred:** visual parity → Phase 6; mockups archive/retirement → Phases 7–9
- No React/HTML/CSS caller edits (correct for this phase)

## Self-Check: PASSED

- FOUND: `.planning/phases/05-prune-public-assets/05-DELETE-LIST.txt`
- FOUND: `.planning/phases/05-prune-public-assets/05-01-SUMMARY.md` (ASSET-02, 34209521 / 32.6)
- FOUND: `web/public/assets/hero/Hero-background.png`
- FOUND: `web/public/mockups.css`
- FOUND commits: `dbffc8e`, `c643daf`
- FOUND: all 55 delete-list paths absent; 82 keeps present
- FOUND: `npm run build` exit 0
