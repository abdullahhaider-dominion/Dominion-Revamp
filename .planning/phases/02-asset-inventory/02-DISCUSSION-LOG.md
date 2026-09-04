# Phase 2: Asset Inventory - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md — this log preserves the alternatives considered.

**Date:** 2026-09-05
**Phase:** 2-Asset Inventory
**Areas discussed:** Inventory artifact

---

## Inventory artifact

| Option | Description | Selected |
|--------|-------------|----------|
| A) Markdown in phase dir | Review-friendly tables | |
| B) JSON only | Machine-friendly | |
| C) Both | Markdown + JSON | ✓ |
| D) You decide | | |

**User's choice:** C — Both Markdown and JSON  
**Notes:** Phase 5 automation + human PR review.

| Option | Description | Selected |
|--------|-------------|----------|
| A) `02-INVENTORY.md` + `02-INVENTORY.json` | Phase-prefixed pairing | ✓ |
| B) `ASSET-INVENTORY.md` + `.json` | No phase prefix | |
| C) You decide | | |

**User's choice:** A — `02-INVENTORY.md` + `02-INVENTORY.json`

---

## Claude's Discretion

- Fresh rescan of `web/src` + `web/public/mockups.css` (incl. home-html / JS / CSS urls)
- CONCERNS.md as cross-check only
- Comment-only / unresolved dynamic refs → keep

## Deferred Ideas

- Deletes → Phase 3/5
- Mockups retirement → Phases 7–9
