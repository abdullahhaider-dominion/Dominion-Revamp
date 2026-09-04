# Phase 3: Safe Orphan Deletes - Context

**Gathered:** 2026-09-05
**Status:** Ready for planning

<domain>
## Phase Boundary

Remove two confirmed non-runtime duplicates: unused `web/src/styles/mockups.css` (ASSET-03) and repo-root `Hero-background.png` (ASSET-04). Do **not** delete served `web/public/mockups.css`, live `web/public/assets/hero/Hero-background.png`, or any Phase 2 inventory `delete` candidates under `web/public` (those are Phase 5).

</domain>

<decisions>
## Implementation Decisions

### Commit shape
- **D-01:** Use **one coherent commit** that removes both orphans (and empty `web/src/styles/` if applicable).

### Empty directory
- **D-02:** After deleting `web/src/styles/mockups.css`, **remove `web/src/styles/`** if it becomes empty.

### Post-delete proof
- **D-03:** Verify with file/git checks **and** `npm run build` in `web/` so missing imports or layout/CSS breakage fail closed.

### Claude's Discretion
- Before delete: reconfirm no `web/src` import/reference to `styles/mockups` or `src/styles/mockups.css`.
- After delete: confirm `web/src/app/layout.tsx` still links `/mockups.css`; public hero PNG still exists and is referenced by `CinematicHero.tsx`.
- Do not stage or delete paths from `02-INVENTORY.json` delete class in this phase.

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Phase scope
- `.planning/ROADMAP.md` — Phase 3 success criteria (ASSET-03, ASSET-04)
- `.planning/REQUIREMENTS.md` — **ASSET-03**, **ASSET-04**
- `.planning/PROJECT.md` — Safety / parity constraints
- `.planning/phases/02-asset-inventory/02-CONTEXT.md` — Public prune deferred to Phase 5

### Targets & keep paths
- `web/src/styles/mockups.css` — DELETE (dead copy)
- `web/public/mockups.css` — KEEP (served)
- `Hero-background.png` (repo root) — DELETE
- `web/public/assets/hero/Hero-background.png` — KEEP
- `web/src/app/layout.tsx` — Must still link `/mockups.css`
- `web/src/components/CinematicHero.tsx` — Must still use public hero PNG
- `.planning/codebase/CONCERNS.md` — Documents these orphans

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- Phase 2 inventories — do not use as delete list for this phase
- `web/.gitignore` — root PNG is untracked; CSS may be tracked under `web/src/styles/`

### Established Patterns
- Phase 1: commit only under `web/` when possible; root orphan delete is an exception that touches repo root only for ASSET-04

### Integration Points
- Build must pass after CSS removal; live styles from `public/mockups.css`

</code_context>

<specifics>
## Specific Ideas

- Single commit; remove empty `styles/` dir; prove with `npm run build` in `web/`.

</specifics>

<deferred>
## Deferred Ideas

- Pruning `web/public` inventory deletes — Phase 5
- Minimal React unlock — Phase 4
- Mockups archive/removal — Phases 7–9

None — discussion stayed within phase scope

</deferred>

---

*Phase: 3-Safe Orphan Deletes*
*Context gathered: 2026-09-05*
