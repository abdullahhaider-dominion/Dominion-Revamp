# Dominion Markets — Production Cleanup

## What This Is

Dominion Markets’ marketing website, recently ported from vanilla HTML/CSS/JS into a Next.js App Router app under `web/`. The live experience is a hybrid: a React cinematic hero plus a large vanilla body still shipped as an HTML string, shared CSS, and ported scripts. This milestone makes that repo production-ready by removing unused weight safely and retiring the legacy mockup tree from the app repo after archive.

## Core Value

Ship a clean production Next.js site that keeps every asset and behavior the live site actually uses — never delete something still referenced.

## Requirements

### Validated

- ✓ Next.js 16 + React 19 marketing app runs from `web/` — existing
- ✓ Cinematic hero/nav implemented as React (`CinematicHero.tsx`) — existing
- ✓ Homepage body sections still served via ported HTML string + `mockups.css` + `mockups-main.js` — existing
- ✓ Brand/docs and hi-fi vanilla mockup exist as design artifacts (`docs/`, `mockups/`, `wireframes/`) — existing
- ✓ Codebase map documents unused-asset candidates (~33MB under `web/public/assets/`) — existing (`.planning/codebase/`)
- ✓ Inventory + prune of unused `web/public` assets (ASSET-01/02) — Validated in Phase 2 + Phase 5
- ✓ Dead CSS mirror + root hero PNG orphan removed (ASSET-03/04) — Validated in Phase 3
- ✓ Minimal React unlock not required; all 55 deletes cleared (REACT-01) — Validated in Phase 4
- ✓ Homepage parity after prune (PROD-01) — Validated in Phase 6 (automated + D-02 smoke; optional visual UAT remains)
- ✓ `mockups/` archived (MOCK-01) — Validated in Phase 7 (`archive/mockups` + sibling repo; still present on main until Phase 9)
- ✓ Docs/skills retargeted off in-repo `mockups/` SoT (MOCK-02) — Validated in Phase 8

### Active

- [ ] Remove `mockups/` from this production repo (Phase 9) now that archive + docs retarget are done
- [ ] Leave a lean, pushable repo: tracked app code, no orphan design binaries in the production tree

### Out of Scope

- Full React rewrite of all homepage sections this milestone — only convert what’s needed for safe deletes
- Deleting assets that still appear in `web/src` or served `mockups.css` — safety bar is static-scan proof only
- Redesigning brand, layout, or section content — cleanup and readiness, not a visual relaunch
- Adding auth, CMS, analytics backends, or new marketing features — not part of this milestone
- Deleting `docs/` / `wireframes/` wholesale — keep unless they block production; focus is assets + `mockups/` retirement after archive

## Context

- Brownfield repo at `/Users/usama/Desktop/Dominion Markets/Vanilla to nextjs` (Cursor workspace may still point at an empty sibling folder — work against this path).
- Production app: `web/` (Next.js). Hi-fi design archive: `.planning/phases/07-archive-mockups/07-ARCHIVE.md` (`archive/mockups` / sibling). In-repo `mockups/` may remain until Phase 9 — not required SoT.
- Map findings (`.planning/codebase/CONCERNS.md`): ~53 unreferenced files (~32.6MB) under `web/public/assets/` — **Phase 5 pruned all 55 inventory deletes**; `web/` is tracked; dead CSS/root hero orphans removed in Phase 3.
- User chose safer full-phase GSD path: map → project → phased roadmap → execute with approvals.
- **Current state:** Phase 8 complete — next is Phase 9 remove in-repo `mockups/`, then lean check (10).

## Constraints

- **Safety**: Delete only what static analysis proves unused against `web/src` + served CSS — no guess deletes
- **Parity**: Live site look/behavior must not regress for remaining sections
- **Stack**: Stay on Next.js App Router in `web/` (React 19, Tailwind v4, TypeScript) — no framework migration
- **Mockups retirement**: Archive out-of-repo (or dedicated branch) *before* deleting `mockups/` from this repo
- **React scope**: Minimal — only as needed to unlock deletions, not a full componentization program
- **Git**: Prefer committing planning docs; production tree should include the real `web/` app

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Milestone = cleanup + ship, with minimal React only if needed for deletes | User 1B + depth C — avoid full rewrite while still unblocking large asset removal | Validated — Phase 4 verify-only; Phase 5 pruned 55 |
| Delete bar = static scan of `web/src` + served `mockups.css` only | User 3A — safest proof before production | Validated — inventory + rescan + prune honor bar |
| Archive `mockups/` to separate repo/branch, then remove from this repo | User 2C + sequence C — preserve design history without bloating prod repo | Archive done (Phase 7); remove pending Phase 9 |
| Keep `docs/` / `wireframes/` unless they block prod | Small on disk; not runtime; not the main weight problem | — Pending |
| Full homepage React cutover deferred | Explicitly out of scope for this milestone | — Pending |

## Evolution

This document evolves at phase transitions and milestone boundaries.

**After each phase transition** (via `/gsd-transition`):
1. Requirements invalidated? → Move to Out of Scope with reason
2. Requirements validated? → Move to Validated with phase reference
3. New requirements emerged? → Add to Active
4. Decisions to log? → Add to Key Decisions
5. "What This Is" still accurate? → Update if drifted

**After each milestone** (via `/gsd-complete-milestone`):
1. Full review of all sections
2. Core Value check — still the right priority?
3. Audit Out of Scope — reasons still valid?
4. Update Context with current state

---
*Last updated: 2026-09-05 after Phase 8 — design docs retargeted to archive*
