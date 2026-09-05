# Phase 2: Asset Inventory - Context

**Gathered:** 2026-09-05
**Status:** Ready for planning

<domain>
## Phase Boundary

Produce a complete, static-scan-backed **keep vs delete** inventory for every file under `web/public` (especially `web/public/assets/`), based only on references in `web/src` and served `web/public/mockups.css` (ASSET-01). This phase writes inventory artifacts only — **no deletes**.

</domain>

<decisions>
## Implementation Decisions

### Inventory artifact
- **D-01:** Deliver **both** human-readable Markdown and machine-readable JSON inventories so Phase 5 can delete by list and humans can review in PRs.
- **D-02:** Canonical paths:
  - `.planning/phases/02-asset-inventory/02-INVENTORY.md`
  - `.planning/phases/02-asset-inventory/02-INVENTORY.json`
- **D-03:** Both artifacts must list path, size (bytes or human), classification (`keep` | `delete`), and evidence (reference location or “no match in scan sources”).

### Claude's Discretion
- **Scan sources:** Treat all of `web/src` (including `home-html.ts` string content and `mockups-main.js`) plus `web/public/mockups.css` (including `url(...)` / path strings). Do **not** use `mockups/` or `docs/` as keep evidence for production public files.
- **Method:** Fresh rescan of on-disk `web/public` vs extracted references; use `.planning/codebase/CONCERNS.md` only as a sanity cross-check, not as the sole authority.
- **Ambiguous hits:** Comment/docstring-only mentions → classify **keep** (safer). Dynamic/constructed paths that cannot be resolved statically → **keep** with note.
- **Scope:** Inventory `web/public` only (not root orphans — Phase 3; not `mockups/` — Phases 7–9).

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Phase scope
- `.planning/ROADMAP.md` — Phase 2: Asset Inventory (success criteria, ASSET-01)
- `.planning/REQUIREMENTS.md` — **ASSET-01**
- `.planning/PROJECT.md` — Safety bar: static scan of `web/src` + served CSS only
- `.planning/phases/01-track-web-app/01-CONTEXT.md` — D-01 full public tracked; do not prune here

### Codebase / candidates
- `.planning/codebase/CONCERNS.md` — Prior unused-candidate list (~53 files / ~32.6MB) for cross-check
- `.planning/codebase/STRUCTURE.md` — `web/public` layout
- `web/public/mockups.css` — Served stylesheet (scan source)
- `web/src/content/home-html.ts` — Body HTML asset references
- `web/src/components/CinematicHero.tsx` — Live hero PNG keep evidence
- `web/src/app/layout.tsx` — Favicon / CSS link keep evidence

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- Tracked `web/public` tree from Phase 1 (`49e6ced`) — inventory against this tree
- CONCERNS.md candidate table — optional cross-check after fresh scan

### Established Patterns
- Safety: never delete without static proof (project decision 3A)
- Phase 5 will consume this inventory — JSON should be stable schema (`path`, `bytes`, `class`, `evidence`)

### Integration Points
- Phase 3 deletes dead CSS + root hero (out of inventory scope for `web/public` orphans only if they appear under public)
- Phase 4/5 consume delete list after optional React unlock

</code_context>

<specifics>
## Specific Ideas

- User wants dual artifacts: Markdown for review + JSON for Phase 5 automation, named `02-INVENTORY.md` / `02-INVENTORY.json`.

</specifics>

<deferred>
## Deferred Ideas

- Actual file deletion — Phase 5 (and Phase 3 for non-public orphans)
- Mockups tree — Phases 7–9
- Scan-depth / seed-vs-rescan / ambiguous-hit policy left to Claude discretion as above

None — discussion stayed within phase scope for selected gray area

</deferred>

---

*Phase: 2-Asset Inventory*
*Context gathered: 2026-09-05*
