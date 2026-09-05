# Phase 10: Lean Production Check - Context

**Gathered:** 2026-09-05
**Status:** Ready for planning

[auto] YOLO continue — discuss skipped; recommended defaults locked below.

<domain>
## Phase Boundary

Satisfy **PROD-03**: confirm the production repo is lean and **push-ready** for deploying `web/` — orphans from this milestone are gone, tracked app paths suffice, ignores exclude install/build junk, final status is coherent.

Out of scope: actually `git push` (unless user asks), deleting `docs/` or `wireframes/` (project keeps them), re-running asset inventory, redesign.

</domain>

<decisions>
## Implementation Decisions

### Checklist proof (primary deliverable)
- **D-01:** Write `10-LEAN-CHECK.md` proving:
  1. Absent: in-repo `mockups/`, root `Hero-background.png`, Phase 5 delete-list paths under `web/public`
  2. Present: deployable `web/` (`src/`, `public/` keep set, package.json, config); `web/public/mockups.css` + ports kept
  3. Ignores: `node_modules` / `.next` / `.env*` excluded from git
  4. Optional: untracked OS junk (`.DS_Store`) noted — clean if trivial, do not block on historical tracked `.DS_Store` under `.planning` unless easy
  5. Branch status: ahead of origin is OK; “push-ready” ≠ “pushed”

### Automated gate
- **D-02:** Phase script `scripts/lean-verify.mjs` (or equiv) exit 0 covering D-01 asserts + `cd web && npm run build` exit 0.

### Hard stops
- **D-03:** Do not delete `docs/` or `wireframes/`. Do not push. Do not restore `mockups/`. Do not prune further public assets beyond Phase 5 list.

### Claude's Discretion
- Whether to `rm` untracked root/docs `.DS_Store` as hygiene.
- SUMMARY + optional milestone wrap note in PROJECT.md Current State.

</decisions>

<canonical_refs>
## Canonical References

- `.planning/ROADMAP.md` — Phase 10 / PROD-03
- `.planning/REQUIREMENTS.md` — **PROD-03**
- `.planning/phases/05-prune-public-assets/05-DELETE-LIST.txt` — must stay absent
- `.planning/phases/02-asset-inventory/02-INVENTORY.json` — keep set (~82)
- `.planning/phases/07-archive-mockups/07-ARCHIVE.md` — archive still reachable
- `web/.gitignore` — install/build ignores

</canonical_refs>

<code_context>
## Snapshot at Phase 10 start

- `mockups/` absent; root hero absent; `web/public` ≈ 82 files
- Branch `main` ahead of `origin/main` (local commits not pushed)
- `docs/`, `wireframes/` remain (allowed)
- Archive branch + sibling still exist from Phase 7

</code_context>

<deferred>
## Deferred Ideas

- Push to GitHub — user must request
- Full React homepage rewrite — v2
- Delete docs/wireframes — out of milestone scope

</deferred>

---

*Phase: 10-Lean Production Check*
*Context gathered: 2026-09-05 (auto)*
