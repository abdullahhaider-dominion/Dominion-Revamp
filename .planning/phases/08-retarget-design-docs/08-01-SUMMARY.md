---
phase: 08-retarget-design-docs
plan: 01
subsystem: docs
tags: [mockups, archive, SoT, MOCK-02, skills, README]

requires:
  - phase: 07-archive-mockups
    provides: 07-ARCHIVE.md coordinates (archive/mockups + sibling)
provides:
  - Operational docs/skills no longer require in-repo mockups/ as design SoT
  - Grep-proven DENY/ALLOW/RETAIN gates for MOCK-02
affects: [09-remove-mockups-tree]

tech-stack:
  added: []
  patterns:
    - "SoT pointer Pattern 1: link 07-ARCHIVE.md only (no tip SHA copy)"
    - "Deny-list phrase gates + allow-list 07-ARCHIVE.md"

key-files:
  created:
    - .planning/phases/08-retarget-design-docs/08-01-SUMMARY.md
  modified:
    - .cursor/skills/dominion-section-redesign/SKILL.md
    - readme.md
    - web/README.md
    - .planning/PROJECT.md
    - CLAUDE.md

key-decisions:
  - "D-01: Skill cites 07-ARCHIVE.md; implement via archive and/or web/"
  - "D-02: readme.md + web/README.md link ARCHIVE; not in-repo mockups SoT"
  - "D-03: PROJECT.md Context uses archive + web/ one-liner"
  - "D-04: No docs/superpowers historical rewrites"
  - "D-05: No mockups/ delete, no git push, no web/src edits"
  - "YOLO: CLAUDE.md SoT sentences included in MOCK-02 retarget"

patterns-established:
  - "Pattern 1: Cite archive via 07-ARCHIVE.md path only"
  - "Provenance OK (ported from mockups/); required-SoT phrases denied"

requirements-completed: [MOCK-02]

duration: 3min
completed: 2026-09-05
---

# Phase 8 Plan 01: Retarget Design Docs Summary

**MOCK-02 satisfied: skill + READMEs + PROJECT + CLAUDE point hi-fi at `07-ARCHIVE.md` and production at `web/`, with deny/allow/retain gates green and `mockups/` still 139 tracked files.**

## Performance

- **Duration:** ~3 min
- **Started:** 2026-09-05T08:43:27Z
- **Completed:** 2026-09-05T08:45:58Z
- **Tasks:** 3/3
- **Files modified:** 5 (+ SUMMARY)

## Accomplishments

- Retargeted `.cursor/skills/dominion-section-redesign/SKILL.md` so working hi-fi / implement paths cite the Phase 7 archive and/or `web/`, not in-repo `mockups/` as required SoT
- Updated `readme.md`, `web/README.md`, `.planning/PROJECT.md`, and `CLAUDE.md` SoT declarations to ARCHIVE + `web/`
- Full Nyquist suite green: DENY / ALLOW / RETAIN

## Task Commits

1. **Task 1: Retarget dominion-section-redesign skill (D-01)** — `312ca4b` (docs)
2. **Task 2: Retarget READMEs, PROJECT.md, CLAUDE.md (D-02, D-03)** — `c40c291` (docs)
3. **Task 3: Full Nyquist gate + SUMMARY (MOCK-02 proof)** — (this docs commit)

## Files Created/Modified

- `.cursor/skills/dominion-section-redesign/SKILL.md` — Archive + `web/` SoT; implement paths retargeted
- `readme.md` — Production `web/` + ARCHIVE link; temporary mockups note
- `web/README.md` — Notes bullet links `../.planning/phases/07-archive-mockups/07-ARCHIVE.md`
- `.planning/PROJECT.md` — Context SoT line → archive + `web/`
- `CLAUDE.md` — Platform/Pattern/Entry/skill-table SoT softened to ARCHIVE + `web/`
- `.planning/phases/08-retarget-design-docs/08-01-SUMMARY.md` — this file

## Nyquist / Grep Gate Results

```text
DENY: OK
ALLOW: OK
RETAIN: OK
MOCKUPS_COUNT=139
```

Deny-list phrases absent from: `readme.md`, `web/README.md`, `.planning/PROJECT.md`, skill, `CLAUDE.md`.

Allow-list: `07-ARCHIVE.md` present in skill, `readme.md`, `web/README.md`, `.planning/PROJECT.md`.

## D-05 / Safety Attestations

| Attestation | Result |
|-------------|--------|
| No `git push` | Affirmed — no push this plan |
| No `mockups/` delete | Affirmed — `git ls-files mockups` = **139** |
| No `web/src` in commit set | Affirmed — commits touch skill, readmes, PROJECT, CLAUDE, planning only |
| No `docs/superpowers` rewrites (D-04) | Affirmed — historical specs/plans untouched |

## Decisions Honored

- **D-01…D-05** — skill, READMEs, PROJECT, CLAUDE retargeted; history leave-alone; no delete/push/`web/src`
- **MOCK-02** — docs/skills no longer declare in-repo `mockups/` as required design SoT

## Deviations from Plan

None — plan executed exactly as written.

## Known Stubs

None.

## Threat Flags

None beyond plan threat model (T-08-01…T-08-05 mitigated via gates + attestations).

## Self-Check: PASSED

- FOUND: `.cursor/skills/dominion-section-redesign/SKILL.md`
- FOUND: `readme.md`, `web/README.md`, `.planning/PROJECT.md`, `CLAUDE.md`
- FOUND: `08-01-SUMMARY.md` (this file) with MOCK-02
- FOUND: commits `312ca4b`, `c40c291`
- FOUND: DENY/ALLOW/RETAIN OK; mockups tracked count 139
