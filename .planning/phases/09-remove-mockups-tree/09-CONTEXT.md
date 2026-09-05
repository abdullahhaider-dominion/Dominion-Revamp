# Phase 9: Remove Mockups Tree - Context

**Gathered:** 2026-09-05
**Status:** Ready for planning

[auto] YOLO continue — discuss skipped; recommended defaults locked below.

<domain>
## Phase Boundary

Satisfy **MOCK-03**: remove in-repo `mockups/` from the production working tree **only after** Phase 7 archive + Phase 8 doc retarget. Prove archive still reachable and `web/` still builds with no runtime dependency on `../mockups`.

Out of scope: lean push-ready audit (Phase 10), pushing `archive/mockups` to origin, deleting the sibling archive repo, rewriting historical `docs/superpowers` plans.

</domain>

<decisions>
## Implementation Decisions

### Preconditions (hard gate before delete)
- **D-01:** Before any delete, assert all of:
  1. `git rev-parse archive/mockups` succeeds
  2. Sibling path `/Users/usama/Desktop/Dominion Markets/Dominion-Markets-mockups-archive` exists and HEAD matches archive tip (or tip recorded in `07-ARCHIVE.md`)
  3. `07-ARCHIVE.md` exists and Phase 8 targets still cite it (`readme.md`, `web/README.md`, skill, CLAUDE.md, PROJECT.md)

### Delete
- **D-02:** Remove the entire tracked `mockups/` tree from `main` with `git rm -r mockups` (one coherent commit). Clean any leftover untracked `.DS_Store` under `mockups/` with `rm` if needed so the directory is gone from the working tree.

### Doc tense cleanup
- **D-03:** Update Phase 8 “temporary until Phase 9” wording in the retargeted files so they no longer imply `mockups/` is still present — point only at archive + `web/`. Do **not** reintroduce in-repo `mockups/` as SoT.

### Proof
- **D-04:** After delete: `test ! -e mockups` (or equivalent), `git ls-files mockups` empty, archive branch + sibling still OK, `cd web && npm run build` exit 0.

### Hard stops
- **D-05:** Never delete/modify `archive/mockups` branch or the sibling archive repo. Never `git push`. Never edit `web/src` except if a true runtime `../mockups` dependency is found (unexpected — abort and report).

### Claude's Discretion
- Exact verify script name under phase `scripts/` (recommended: `remove-verify.mjs`).
- Whether SUMMARY lists byte savings estimate from `du` (nice-to-have).

</decisions>

<canonical_refs>
## Canonical References

- `.planning/ROADMAP.md` — Phase 9 / MOCK-03
- `.planning/REQUIREMENTS.md` — **MOCK-03**
- `.planning/phases/07-archive-mockups/07-ARCHIVE.md` — must remain valid
- `.planning/phases/08-retarget-design-docs/08-01-SUMMARY.md` — retarget already done
- `mockups/` — deletion target (~64MB, 139 tracked files)

</canonical_refs>

<code_context>
## Existing Insights

- Archive tip known: `3e9401bd85c6848cbbf073d526e5d48ad2450834` (re-check at execute)
- Sibling present; no `web/src` imports of `../mockups` spotted at Phase 9 start
- `web/public/mockups.css` and `web/src/lib/mockups-main.js` are **production ports** — keep them (names contain “mockups” but are not the `mockups/` tree)

</code_context>

<deferred>
## Deferred Ideas

- Lean production / push readiness — Phase 10
- Push archive branch to GitHub — only if user asks

</deferred>

---

*Phase: 9-Remove Mockups Tree*
*Context gathered: 2026-09-05 (auto)*
