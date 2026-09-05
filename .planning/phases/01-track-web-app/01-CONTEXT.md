# Phase 1: Track Web App - Context

**Gathered:** 2026-09-05
**Status:** Ready for planning

<domain>
## Phase Boundary

Get the production Next.js app under `web/` safely tracked in git: source, public assets, and app config committed; `node_modules`, `.next`, `.env*`, and OS junk excluded via existing `web/.gitignore`. Does **not** prune unused assets, delete root orphans, or archive `mockups/` — those are later phases.

</domain>

<decisions>
## Implementation Decisions

### First-commit contents
- **D-01:** Track **all** of `web/public` in the Phase 1 commit, including assets that Phase 5 may later delete. Inventory (Phase 2) and prune (Phase 5) come after an honest snapshot of the running app.
- **D-02:** Phase 1 commit includes **only paths under `web/`**. Do not add repo-root orphans (`Hero-background.png`, `.DS_Store`, etc.) in this phase — root hero duplicate is Phase 3.

### Claude's Discretion
- **Commit shape:** Prefer a single coherent commit (or small set) that adds `web/` app source + public + config — not a multi-PR split unless git tooling forces it.
- **Ignore layout:** Rely on existing `web/.gitignore` (already excludes `node_modules`, `.next`, `.env*`, `.DS_Store`). No root `.gitignore` required for Phase 1 success criteria.
- **Generated files:** Keep current `web/.gitignore` policy (`next-env.d.ts`, `*.tsbuildinfo` ignored) unless planning discovers a hard requirement to track `next-env.d.ts`.

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Phase scope
- `.planning/ROADMAP.md` — Phase 1: Track Web App (goal, success criteria, PROD-02)
- `.planning/REQUIREMENTS.md` — **PROD-02**: Ensure `web/` app source is tracked in git
- `.planning/PROJECT.md` — Core value and git readiness constraints

### Codebase / safety
- `.planning/codebase/CONCERNS.md` — Notes `web/` was largely untracked; public asset prune candidates (do **not** prune in Phase 1)
- `.planning/codebase/STRUCTURE.md` — `web/` vs `mockups/` / `docs/` layout
- `web/.gitignore` — Canonical ignore rules for the Next app
- `web/package.json` — App identity and scripts to verify after track

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `web/.gitignore` — Already correct for Next.js (dependencies, `.next`, env, `.DS_Store`)
- `web/package.json`, `web/package-lock.json`, `web/src/`, `web/public/` — What must become tracked

### Established Patterns
- App lives entirely under `web/`; repo root still holds design artifacts (`mockups/`, `docs/`, `wireframes/`) outside this phase’s commit

### Integration Points
- After Phase 1, later phases operate on a git-tracked `web/` tree (inventory, deletes, parity, mockups retirement)

</code_context>

<specifics>
## Specific Ideas

- User explicitly chose full `web/public` inclusion now over excluding known large orphans early — prune only after static inventory.

</specifics>

<deferred>
## Deferred Ideas

- Excluding large public orphans from the first commit — rejected for Phase 1; belongs to Phase 2 inventory + Phase 5 prune
- Root `Hero-background.png` cleanup — Phase 3
- Dead `web/src/styles/mockups.css` — Phase 3
- `mockups/` archive/removal — Phases 7–9

None — discussion stayed within phase scope for selected gray area

</deferred>

---

*Phase: 1-Track Web App*
*Context gathered: 2026-09-05*
