---
phase: 02-asset-inventory
plan: 01
subsystem: assets
tags: [asset-inventory, web-public, static-scan, ASSET-01]

requires:
  - phase: 01-track-web-app
    provides: Tracked web/public tree and Next app sources to scan against
provides:
  - Dual keep/delete inventory for every web/public file (MD + JSON)
  - Phase 5 delete list with path, bytes, evidence
affects: [03-dead-css, 05-prune-assets]

tech-stack:
  added: []
  patterns:
    - "Static path extraction from web/src + web/public/mockups.css only"
    - "keep-on-ambiguity for comment-only / unresolved dynamic refs"
    - "CONCERNS.md as post-scan cross-check, not authority"

key-files:
  created:
    - .planning/phases/02-asset-inventory/02-INVENTORY.md
    - .planning/phases/02-asset-inventory/02-INVENTORY.json
    - .planning/phases/02-asset-inventory/02-01-SUMMARY.md
  modified: []

key-decisions:
  - "Fresh rescan of web/public vs web/src + mockups.css; CONCERNS used only for delta notes"
  - "Comment-only / unresolved dynamic → keep; .DS_Store → delete candidate (not removed from disk)"
  - "Zero web/public files deleted this phase"

patterns-established:
  - "Inventory schema: path, bytes, class keep|delete, evidence — Phase 5 consumer contract"
  - "Canonical artifacts: 02-INVENTORY.md + 02-INVENTORY.json"

requirements-completed: [ASSET-01]

duration: 15min
completed: 2026-09-05
---

# Phase 2 Plan 01: Asset Inventory Summary

**Static scan of `web/src` + `web/public/mockups.css` classified all 137 `web/public` files: 82 keep / 55 delete (~32.6 MB delete candidates), with dual MD+JSON inventories and no disk deletes.**

## Performance

- **Duration:** ~15 min
- **Started:** 2026-09-04T20:28:06Z
- **Completed:** 2026-09-04T20:43:00Z
- **Tasks:** 3/3
- **Files modified:** 3 planning artifacts (plus optional untracked working extracts)

## Accomplishments

- Extracted 82 unique normalized `web/public/...` references from scan sources only (no `mockups/` / `docs/` keep proof).
- Classified every on-disk `web/public` file 1:1 with path, bytes, class, evidence.
- Published `02-INVENTORY.md` + `02-INVENTORY.json` for human review and Phase 5 automation; ASSET-01 satisfied.

## Task Commits

1. **Task 1: Extract static asset references** — working `.refs-extracted.txt` (left untracked; not junk-committed)
2. **Task 2: Diff on-disk vs refs and classify** — working `.classification.jsonl` (left untracked)
3. **Task 3: Dual inventories + SUMMARY** — `6fc8219` (docs)

_Working extracts intentionally omitted from git per plan cleanup guidance; canonical deliverables are the two inventory files + this SUMMARY._

## Files Created/Modified

- `.planning/phases/02-asset-inventory/02-INVENTORY.md` — human keep/delete tables with sizes and evidence
- `.planning/phases/02-asset-inventory/02-INVENTORY.json` — machine schema for Phase 5 (`path`, `bytes`, `class`, `evidence`)
- `.planning/phases/02-asset-inventory/02-01-SUMMARY.md` — execution record + CONCERNS cross-check

## Inventory totals (ASSET-01)

| Metric | Value |
|--------|------:|
| Total `web/public` files | 137 |
| Keep | 82 |
| Delete candidates | 55 |
| Delete bytes | 34,209,521 (~32.63 MB) |

### Known live keep anchors (all present + keep)

- `web/public/assets/hero/Hero-background.png` — `CinematicHero.tsx`
- `web/public/assets/logo/logo-horizontal-reverse.svg` — `CinematicHero.tsx`
- `web/public/assets/logo/logo-isotype-app.png` — `layout.tsx`
- `web/public/mockups.css` — `layout.tsx`
- Body media from `home-html.ts` + `url(.../assets/...)` in `mockups.css`
- Platform badges `mt5-official.png`, `ctrader-official.png` (and `platforms-mist-water-hero.jpg`) from `home-html.ts` / `mockups-main.js`

### Largest delete candidates

| Path | Size |
|------|------|
| `web/public/assets/hero/hero.mp4` | ~15.7 MB |
| `web/public/assets/blogs/mist-bg.png` | ~2.2 MB |
| `web/public/assets/awards/mist-bg.jpg` | ~2.2 MB |
| `web/public/assets/markets-reach/mist-bg.jpg` | ~2.2 MB |
| `web/public/assets/mrkt/mist-bg.jpg` | ~2.2 MB |
| `web/public/assets/mt5-sim/mist-bg.jpg` | ~2.2 MB |
| `web/public/assets/mrkt/product-collage.png` | ~1.8 MB |
| `web/public/assets/hero/hero-media.png` | ~1.7 MB |

**Disk confirmation:** `hero.mp4` and all other public files remain on disk — **zero** `web/public` deletes this phase.

## CONCERNS.md cross-check

CONCERNS (2026-09-05) estimated **~53 unreferenced / ~32.6 MB** under `web/public/assets`. Fresh scan is authoritative.

| Comparison | Result |
|------------|--------|
| CONCERNS concrete candidates resolved on disk | 49 |
| Overlap with fresh **delete** | **49** (100% of that concrete set) |
| In CONCERNS candidate set but fresh **keep** | **0** |
| Fresh **delete** not listed in CONCERNS set | **6** |

**Fresh-only delete finds (not in CONCERNS candidate set):**

1. `web/public/.DS_Store` — OS junk
2. `web/public/assets/.DS_Store` — OS junk
3. `web/public/assets/payments/icons/crypto-pair.png` — no match in scan sources (CONCERNS treated `payments/icons/` as live subset; these four icons are unused)
4. `web/public/assets/payments/icons/googlepay.png`
5. `web/public/assets/payments/icons/mastercard-circles.png`
6. `web/public/assets/payments/icons/upi.png`

**Notes:** Fresh delete count is **55** vs CONCERNS **~53** — explained by the two `.DS_Store` files plus four unused `payments/icons/*` variants beyond the live subset CONCERNS called out. Byte totals align (~32.6 MB). No reclassification was done to match CONCERNS; fresh scan wins.

## Commands used

```bash
# Enumerate disk
find web/public -type f

# Extract refs from web/src + web/public/mockups.css → .refs-extracted.txt
# Classify vs disk → .classification.jsonl → 02-INVENTORY.{md,json}
python3  # (local extract/classify/write script during execution)
```

## Decisions Made

- Followed D-01/D-02/D-03: dual artifacts at canonical paths; every entry has path, bytes, class, evidence.
- Scan sources strictly `web/src` + `web/public/mockups.css`.
- Ambiguity → keep; `.DS_Store` → delete candidate with `OS junk` evidence (file not removed).

## Deviations from Plan

None - plan executed exactly as written (working extracts left untracked instead of committed).

## Issues Encountered

None. Escaped `\"` tokens in `home-html.ts` initially produced trailing-backslash path noise; cleaned during Task 1 before classification.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness

- Phase 5 can consume `02-INVENTORY.json` `files` where `class == "delete"` (with sizes) without re-scanning.
- Phase 3 root orphan / dead CSS work is out of scope here; root `Hero-background.png` not inventoried under `web/public`.
- Do not delete public assets until Phase 5 (and human review of this inventory).

## Self-Check: PASSED

- `02-INVENTORY.md` FOUND
- `02-INVENTORY.json` FOUND (137 files == `find web/public -type f`)
- `02-01-SUMMARY.md` FOUND
- Hero-background.png class keep FOUND
- `web/public/assets/hero/hero.mp4` still on disk FOUND
- No STATE.md / ROADMAP.md modifications (per executor instructions for this run)

---
*Phase: 02-asset-inventory*
*Completed: 2026-09-05*
