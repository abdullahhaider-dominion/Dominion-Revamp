# Phase 6: Parity Verification - Context

**Gathered:** 2026-09-05
**Status:** Ready for planning

[auto] YOLO continue — discuss-phase skipped; recommended defaults locked below.

<domain>
## Phase Boundary

Prove **PROD-01**: after Phase 5 prune, remaining live homepage sections still match pre-cleanup look/behavior for content that is still shipped. No mockups archive (Phases 7–9). No full React rewrite. No new marketing design.

Scope is **verification + minimal fix only if prune caused a break**. Pre-existing quirks that were never part of the keep inventory are document-only, not redesign work.

</domain>

<decisions>
## Implementation Decisions

### Verification method (hybrid)
- **D-01 (recommended):** Two-layer proof:
  1. **Automated:** `npm run build` in `web/` exit 0; extract asset URL refs from `web/src` (esp. `home-html.ts`, `CinematicHero`, styles) + `web/public/mockups.css`; assert every referenced `web/public` path exists; assert none of the Phase 5 deleted paths are still referenced.
  2. **Structured UAT checklist:** Write `06-PARITY-CHECKLIST.md` covering hero/nav, each shipped body section (proof → final-cta), and key `mockups-main.js` interactions (marquees, tabs, anchors). Executor marks automated items; human items go to VERIFICATION `human_needed` / UAT if visual judgment required.
- **D-02:** Optional browser smoke (dev server or `next start`) is **Claude's discretion** if browser tools are available — screenshots help but are not a hard blocker if automated layer + checklist exist.

### Baseline
- **D-03:** Baseline = **remaining live content** must render without missing keep media or broken layout caused by deletes. Do **not** expect deleted Phase 5 assets to appear. `mockups/` is design history only — not a runtime SoT for this phase.

### Fix policy
- **D-04:** If automated checks find a **prune-caused** missing ref → minimal caller/path fix in the same phase (smallest change). If issue is pre-existing / out of inventory scope → record in checklist notes; do not redesign.

### Claude's Discretion
- Exact script shape for ref extraction (Python/Node one-shot in plan is fine).
- Whether to run `next start` + browser snapshot.
- Checklist section list derived from `home-html.ts` `<section id=...>` plus React hero/nav.

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

- `.planning/ROADMAP.md` — Phase 6 / PROD-01 success criteria
- `.planning/REQUIREMENTS.md` — **PROD-01**
- `.planning/phases/02-asset-inventory/02-INVENTORY.json` — keep set (must remain)
- `.planning/phases/05-prune-public-assets/05-DELETE-LIST.txt` — must remain absent & unreferenced
- `.planning/phases/05-prune-public-assets/05-VERIFICATION.md` — prune already verified
- `web/src/components/DominionHome.tsx` — hero + body composition
- `web/src/components/CinematicHero.tsx` — React hero/nav
- `web/src/content/home-html.ts` — body sections HTML
- `web/public/mockups.css` — served styles
- `web/src/lib/mockups-main.js` — client init for widgets

</canonical_refs>

<code_context>
## Existing Code Insights

- Homepage: `CinematicHero` + `dangerouslySetInnerHTML` of `homeHtml` + dynamic `initDominionMockups()`.
- Body sections include: proof, awards, sessions, markets, quotes, funding, trader-community, mrkt, mt5-simulator, how-it-works, accounts-focus, accounts, platforms, why-dominion, dashboard, trade-better, blogs, ecosystem, copy-trading, trust, final-cta.
- Spot-check at context time: **0 missing** of 69 `/assets/...` paths referenced in `home-html.ts` under `web/public`.

</code_context>

<specifics>
## Specific Ideas

- User said "continue" after Phase 5 — proceed to plan/execute parity without interactive discuss.
- Prefer proof artifacts over vibes: checklist + build + ref integrity.

</specifics>

<deferred>
## Deferred Ideas

- Mockups archive / doc retarget / remove — Phases 7–9
- Lean production push readiness — Phase 10
- Full React section rewrite — out of milestone scope

</deferred>

---

*Phase: 6-Parity Verification*
*Context gathered: 2026-09-05 (auto)*
