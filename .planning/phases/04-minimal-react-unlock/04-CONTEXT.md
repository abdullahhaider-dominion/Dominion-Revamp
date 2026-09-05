# Phase 4: Minimal React Unlock - Context

**Gathered:** 2026-09-05
**Status:** Ready for planning

<domain>
## Phase Boundary

Satisfy REACT-01: for inventory `delete` candidates, either unlock with the smallest caller change, or document keep/N/A. **Expected path:** verify-only — Phase 2 already marks all 55 deletes as unmatched in `web/src` + `mockups.css`. No full `home-html.ts` rewrite. Actual file deletes remain Phase 5.

</domain>

<decisions>
## Implementation Decisions

### Expected outcome
- **D-01:** **Verify-only** — re-confirm each Phase 2 `delete` path is still unreferenced in `web/src` + `web/public/mockups.css`. If all clear, **no React/HTML code changes**.

### Conflict policy
- **D-02:** If a delete-listed file is found referenced, **keep it** and write an explicit reason in the unlock artifact (do not force a caller edit in this phase unless later agreed). Safer than risky unlocks.

### Unlock artifact
- **D-03:** Write `.planning/phases/04-minimal-react-unlock/04-UNLOCK.md` recording: re-scan method, count still-unreferenced, any keep-exceptions with reasons, and clear statement whether Phase 5 may delete the full remaining delete list.

### Claude's Discretion
- Re-use `02-INVENTORY.json` as the candidate set; do not invent new deletes.
- Optional light cross-check of largest files (`hero.mp4`, mist-bgs) with ripgrep.
- UI hint on roadmap does not require visual redesign — only verify no unlock edits break the page if any edit occurs (none expected).

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

- `.planning/ROADMAP.md` — Phase 4 / REACT-01
- `.planning/REQUIREMENTS.md` — **REACT-01**
- `.planning/phases/02-asset-inventory/02-INVENTORY.json` — delete candidate set
- `.planning/phases/02-asset-inventory/02-INVENTORY.md` — human review
- `.planning/phases/02-asset-inventory/02-CONTEXT.md` — scan rules
- `web/src/content/home-html.ts`, `web/src/components/CinematicHero.tsx`, `web/public/mockups.css` — re-scan sources

</canonical_refs>

<code_context>
## Existing Code Insights

- Phase 2: 55 deletes / 82 keeps; evidence already “no match”
- Phase 5 consumes unlocked delete list from inventory + this unlock report

</code_context>

<specifics>
## Specific Ideas

- User chose verify-only + keep-on-conflict + dedicated `04-UNLOCK.md`.

</specifics>

<deferred>
## Deferred Ideas

- Actual public asset deletion — Phase 5
- Full React section rewrite — v2 / out of scope

</deferred>

---

*Phase: 4-Minimal React Unlock*
*Context gathered: 2026-09-05*
