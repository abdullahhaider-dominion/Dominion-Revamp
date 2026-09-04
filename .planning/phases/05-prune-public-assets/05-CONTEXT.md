# Phase 5: Prune Public Assets - Context

**Gathered:** 2026-09-05
**Status:** Ready for planning

<domain>
## Phase Boundary

Delete all **55** paths cleared by Phase 4 (`still_unreferenced` / VERIFY_ONLY_CLEAR). Satisfy ASSET-02: remove unused `web/public` weight (~32.6 MB) while keeping every inventory `keep` file and never deleting anything still referenced in `web/src` or `web/public/mockups.css`. No mockups archive (Phases 7–9). No React rewrites.

</domain>

<decisions>
## Implementation Decisions

### Post-prune proof
- **D-01:** After deletes, prove with file/git checks **and** `npm run build` in `web/`.

### Claude's Discretion
- **Delete source of truth:** Exact paths from `.planning/phases/04-minimal-react-unlock/04-RESCAN.json` where `status == still_unreferenced` (must be 55 and match Phase 2 delete class). Cross-check against `02-INVENTORY.json` delete set — abort if mismatch.
- **Commit shape:** One coherent commit removing all 55 paths (including tracked assets + any untracked `.DS_Store` under public if listed).
- **Hard stop:** Never delete a path with inventory `class: keep` or any path not on the cleared delete list (especially `Hero-background.png` under public, `mockups.css`, logos).
- Empty directories left after deletes may be removed if empty; do not remove directories that still contain keep files.

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

- `.planning/ROADMAP.md` — Phase 5 / ASSET-02
- `.planning/REQUIREMENTS.md` — **ASSET-02**
- `.planning/phases/04-minimal-react-unlock/04-UNLOCK.md` — Phase 5 clearance
- `.planning/phases/04-minimal-react-unlock/04-RESCAN.json` — exact delete paths
- `.planning/phases/02-asset-inventory/02-INVENTORY.json` — keep vs delete classes
- `.planning/phases/02-asset-inventory/02-INVENTORY.md` — human review

</canonical_refs>

<code_context>
## Existing Code Insights

- Phase 4: 55/55 still_unreferenced, 0 keep_exceptions
- Public keep set includes hero PNG, mockups.css, logos, body media

</code_context>

<specifics>
## Specific Ideas

- User required build proof after prune.

</specifics>

<deferred>
## Deferred Ideas

- Parity visual check — Phase 6
- Mockups retirement — Phases 7–9

</deferred>

---

*Phase: 5-Prune Public Assets*
*Context gathered: 2026-09-05*
