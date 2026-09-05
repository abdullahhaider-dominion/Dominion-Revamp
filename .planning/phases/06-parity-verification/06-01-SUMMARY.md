---
phase: 06-parity-verification
plan: 01
subsystem: testing
tags: [parity, prod-01, asset-integrity, nextjs, checklist]

requires:
  - phase: 05-prune-public-assets
    provides: 55 deleted public paths + green keep set
  - phase: 02-asset-inventory
    provides: 02-INVENTORY.json keep/delete SoT
provides:
  - Path-aware parity-ref-check.mjs (Asserts A/B/C)
  - 06-PARITY-CHECKLIST.md hybrid UAT evidence
  - PROD-01 automated integrity proof (build + refs)
affects: [07-mockups-archive, verification, UAT]

tech-stack:
  added: []
  patterns: [path-aware static ref extraction, hybrid auto/human parity checklist]

key-files:
  created:
    - .planning/phases/06-parity-verification/scripts/parity-ref-check.mjs
    - .planning/phases/06-parity-verification/06-PARITY-CHECKLIST.md
    - .planning/phases/06-parity-verification/06-01-SUMMARY.md
  modified: []

key-decisions:
  - "D-04: none — Asserts A/B/C already green; no web/ code changes"
  - "D-02: ran Playwright DOM smoke against next start :3000; marked hero/marquee/markets/dashboard rows PASS"
  - "Script lives under phase scripts/ (not web/) per plan"

patterns-established:
  - "Pattern 1: ASSET_RE + normalize (?/#/trailing \\) → web/public + disk exists"
  - "Assert B path-aware only — never basename matching against DELETE-LIST"

requirements-completed: [PROD-01]

duration: 4min
completed: 2026-09-05
---

# Phase 6 Plan 01: Parity Verification Summary

**PROD-01 proven via path-aware ref integrity (82 refs, 0 missing, 0 ∩ delete, 55 absent, 82 keeps), green `npm run build`, hybrid checklist, and optional Playwright smoke on `next start`.**

## Performance

- **Duration:** ~4 min
- **Started:** 2026-09-05T07:52:32Z
- **Completed:** 2026-09-05T07:57:00Z
- **Tasks:** 3/3
- **Files modified:** 3 created (0 web/ code)

## Accomplishments

- Committed reproducible `parity-ref-check.mjs` (Asserts A/B/C) under phase `scripts/`
- Production build exit 0; checklist documents hero/nav + body through final-cta/footer + widgets
- D-02 smoke confirmed hero assets load and markets/dashboard tabs switch; D-04 not needed

## Task Commits

1. **Task 1: Author parity-ref-check + Asserts A/B/C** - `e4bc4ba` (feat)
2. **Task 2: Production build + 06-PARITY-CHECKLIST.md** - `b6420ea` (docs)
3. **Task 3: D-02 smoke + SUMMARY** - `bf3abb9` (docs)

**Plan metadata:** *(final docs commit)*

## Files Created/Modified

- `.planning/phases/06-parity-verification/scripts/parity-ref-check.mjs` — path-aware Assert A/B/C gate
- `.planning/phases/06-parity-verification/06-PARITY-CHECKLIST.md` — hybrid auto + human_needed / smoke PASS rows
- `.planning/phases/06-parity-verification/06-01-SUMMARY.md` — this file

## Decisions Made

- **D-04:** none — asserts green; no `web/` caller/path edits; did not restore Phase 5 deletes or use `mockups/` (D-03)
- **D-02:** ran (Playwright MCP); cursor-ide-browser unavailable; screenshot timed out — DOM evidence used
- Checklist visual section rows remain `human_needed` for full UAT beyond smoke spot-checks

## PROD-01 Evidence

| Check | Result |
|-------|--------|
| Script exit | **0** — unique refs **82**; Assert A 0 missing; Assert B 0 ∩ + **55** deletes absent; Assert C **82** keeps |
| Build | `cd web && npm run build` exit **0** |
| Checklist | `.planning/phases/06-parity-verification/06-PARITY-CHECKLIST.md` |
| D-04 code changes | **none — asserts green** |
| D-02 smoke | **ran** (hero BG/logo load; 3 marquees; markets cTrader tab; dashboard Trading Sessions tab) |
| Baseline | Live `web/` only — `mockups/` not used as visual SoT (D-03) |

### Remaining `human_needed` rows

**26** checklist rows still `human_needed` (per-section visuals, quotes/ecosystem tabs, CSS visual, awards/footer visuals, etc.) for verifier/UAT. Smoke-filled rows: hero visual, marquees, markets tabs, dashboard tabs.

## Deviations from Plan

None - plan executed as written (D-02 exercised when Playwright available).

## Auth Gates

None.

## Known Stubs

None.

## Threat Flags

None beyond plan threat model (T-06-01 path rejection implemented in script).

## Self-Check: PASSED

- FOUND: `.planning/phases/06-parity-verification/scripts/parity-ref-check.mjs`
- FOUND: `.planning/phases/06-parity-verification/06-PARITY-CHECKLIST.md`
- FOUND: `.planning/phases/06-parity-verification/06-01-SUMMARY.md`
- FOUND: commit `e4bc4ba` (Task 1)
- FOUND: commit `b6420ea` (Task 2)
- Script re-run exit 0; build re-run exit 0
- Note: STATE/ROADMAP phase checkbox left incomplete for orchestrator (plan progress 1/1 only)
