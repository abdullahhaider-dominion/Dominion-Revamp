# Roadmap: Dominion Markets — Production Cleanup

## Overview

Brownfield cleanup of the Next.js marketing app under `web/`: get the production tree into git, inventory and safely delete only statically proven-unused weight, unlock large deletes with minimal React/caller changes when required, verify homepage parity, then archive and remove the legacy `mockups/` design tree so the repo is lean and push-ready for deploy — without deleting anything still referenced by live source or served CSS.

## Phases

**Phase Numbering:**
- Integer phases (1, 2, 3): Planned milestone work
- Decimal phases (2.1, 2.2): Urgent insertions (marked with INSERTED)

Decimal phases appear between their surrounding integers in numeric order.

- [x] **Phase 1: Track Web App** - Commit `web/` source into git with safe ignores
- [x] **Phase 2: Asset Inventory** - Produce a reference-proven keep/delete list for `web/public`
- [x] **Phase 3: Safe Orphan Deletes** - Remove dead CSS mirror and root hero PNG duplicate
- [ ] **Phase 4: Minimal React Unlock** - Change callers only if needed to free large unused assets
- [ ] **Phase 5: Prune Public Assets** - Delete inventory-proven unused files under `web/public`
- [ ] **Phase 6: Parity Verification** - Confirm remaining homepage look/behavior matches pre-cleanup
- [ ] **Phase 7: Archive Mockups** - Preserve `mockups/` history in a separate repo or long-lived branch
- [ ] **Phase 8: Retarget Design Docs** - Point skills/READMEs at the archive instead of in-repo SoT
- [ ] **Phase 9: Remove Mockups Tree** - Delete `mockups/` from this production repo after archive + docs
- [ ] **Phase 10: Lean Production Check** - Confirm repo is slim and push-ready for `web/` deploy

## Phase Details

### Phase 1: Track Web App
**Goal**: The production Next.js app under `web/` is safely tracked in git (no `node_modules` / `.next`)
**Depends on**: Nothing (first phase)
**Requirements**: PROD-02
**Success Criteria** (what must be TRUE):
  1. Root (or equivalent) ignore rules exclude `node_modules`, `.next`, `.env*`, and OS junk before any `web/` commit
  2. `web/src`, `web/public`, and app config are present in git status as tracked (or staged/committed) paths — not left as untracked `?? web/`
  3. A fresh clone/checkout path can obtain app source without relying solely on the legacy `mockups/` tree
**Plans**: 1 plan

Plans:
- [x] 01-01-PLAN.md — Verify ignores, commit full `web/` (src + public + config), prove PROD-02

### Phase 2: Asset Inventory
**Goal**: Operators have a complete, static-scan-backed keep vs delete inventory for `web/public`
**Depends on**: Phase 1
**Requirements**: ASSET-01
**Success Criteria** (what must be TRUE):
  1. Every file under `web/public` (especially `assets/`) is classified keep or delete based on references in `web/src` and served `web/public/mockups.css` only
  2. The inventory lists sizes and paths for delete candidates (including known large orphans such as `hero.mp4`) so later phases delete by list, not guesswork
  3. Referenced assets (hero PNG, live logo paths, body media in `home-html.ts` / CSS) are explicitly marked keep and excluded from delete lists
**Plans**: 1 plan

Plans:
- [x] 02-01-PLAN.md — Extract refs, classify all `web/public` files, write dual inventories + CONCERNS cross-check

### Phase 3: Safe Orphan Deletes
**Goal**: Confirmed non-runtime duplicates are gone without touching served CSS or live hero art
**Depends on**: Phase 2
**Requirements**: ASSET-03, ASSET-04
**Success Criteria** (what must be TRUE):
  1. `web/src/styles/mockups.css` is removed after confirmation that no `web/src` module imports it
  2. Served stylesheet remains `web/public/mockups.css` linked from the app layout — live styles still load
  3. Repo-root `Hero-background.png` is removed while `web/public/assets/hero/Hero-background.png` remains and still serves the cinematic hero
**Plans**: 1 plan

Plans:
- [x] 03-01-PLAN.md — Confirm unused, delete CSS + root PNG orphans, prove build

### Phase 4: Minimal React Unlock
**Goal**: Any large unused asset still blocked by a live caller is unblocked with the smallest React/HTML change — or documented as not needed
**Depends on**: Phase 3
**Requirements**: REACT-01
**Success Criteria** (what must be TRUE):
  1. Inventory delete candidates that are still referenced by callers are either (a) caller-updated so the asset is unused, or (b) explicitly kept with a written reason — no silent skips
  2. React/HTML changes are limited to what unlocks safe deletes (no full section rewrite of `home-html.ts`)
  3. After any caller change, the homepage still renders the affected section without broken media or console-breaking references
**Plans**: TBD
**UI hint**: yes

### Phase 5: Prune Public Assets
**Goal**: All inventory-proven unused `web/public` assets are deleted; referenced assets remain
**Depends on**: Phase 4
**Requirements**: ASSET-02
**Success Criteria** (what must be TRUE):
  1. Every path on the Phase 2 delete list (post Phase 4 unlocks) is removed from `web/public`
  2. No file still referenced in `web/src` or served `web/public/mockups.css` was deleted
  3. Disk weight under `web/public/assets/` drops by roughly the unused set (~tens of MB of confirmed orphans) while keep-list files remain on disk
**Plans**: TBD

### Phase 6: Parity Verification
**Goal**: Remaining live homepage sections match pre-cleanup look and behavior
**Depends on**: Phase 5
**Requirements**: PROD-01
**Success Criteria** (what must be TRUE):
  1. Critical above-the-fold and body sections (hero/nav, proof through final CTA still shipped) render without missing images or broken layout relative to pre-cleanup expectation
  2. Key interactions still work (nav anchors, widgets driven by remaining `mockups-main.js` init)
  3. `npm run build` (or equivalent) succeeds for `web/` after the prune
**Plans**: TBD
**UI hint**: yes

### Phase 7: Archive Mockups
**Goal**: Full `mockups/` history is preserved outside the production working tree path used for deploy
**Depends on**: Phase 6
**Requirements**: MOCK-01
**Success Criteria** (what must be TRUE):
  1. `mockups/` content exists in a separate git repo or long-lived archive branch with history intact
  2. Archive location is recorded (URL or branch name) so later phases and humans can find it
  3. Production repo still contains `mockups/` until docs are retargeted (no premature delete in this phase)
**Plans**: TBD

### Phase 8: Retarget Design Docs
**Goal**: Docs and agent skills no longer treat in-repo `mockups/` as the working SoT
**Depends on**: Phase 7
**Requirements**: MOCK-02
**Success Criteria** (what must be TRUE):
  1. `.cursor/skills/dominion-section-redesign/SKILL.md` points design work at the archive (and/or `web/` for production) instead of requiring local `mockups/` as SoT
  2. Root `readme.md`, `web/README.md`, and any other docs that declare `mockups/` as SoT are updated to the archive location
  3. A reader following docs/skills would not assume `mockups/` must remain in this production repo
**Plans**: TBD

### Phase 9: Remove Mockups Tree
**Goal**: Legacy `mockups/` is gone from this production repo after archive + doc updates
**Depends on**: Phase 8
**Requirements**: MOCK-03
**Success Criteria** (what must be TRUE):
  1. `mockups/` directory is absent from the production repo working tree
  2. Archive from Phase 7 remains reachable; docs from Phase 8 still resolve to it
  3. `web/` app still builds and runs without any runtime dependency on `../mockups`
**Plans**: TBD

### Phase 10: Lean Production Check
**Goal**: Repo is lean and push-ready for production deploy of `web/`
**Depends on**: Phase 9
**Requirements**: PROD-03
**Success Criteria** (what must be TRUE):
  1. Production tree has no orphan design binaries that were targeted this milestone (root hero duplicate, pruned public orphans, in-repo `mockups/`)
  2. Tracked app paths are sufficient to deploy `web/` (source + public + config; ignores still exclude install/build artifacts)
  3. Final status check shows a pushable, coherent production-focused tree (docs/wireframes may remain per project constraints)
**Plans**: TBD

## Progress

**Execution Order:**
Phases execute in numeric order: 1 → 2 → 3 → 4 → 5 → 6 → 7 → 8 → 9 → 10

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Track Web App | 1/1 | Complete | 2026-09-05 |
| 2. Asset Inventory | 1/1 | Complete | 2026-09-05 |
| 3. Safe Orphan Deletes | 1/1 | Complete | 2026-09-05 |
| 4. Minimal React Unlock | 0/TBD | Not started | - |
| 5. Prune Public Assets | 0/TBD | Not started | - |
| 6. Parity Verification | 0/TBD | Not started | - |
| 7. Archive Mockups | 0/TBD | Not started | - |
| 8. Retarget Design Docs | 0/TBD | Not started | - |
| 9. Remove Mockups Tree | 0/TBD | Not started | - |
| 10. Lean Production Check | 0/TBD | Not started | - |

## Coverage Validation

| Requirement | Phase |
|-------------|-------|
| PROD-02 | 1 |
| ASSET-01 | 2 |
| ASSET-03 | 3 |
| ASSET-04 | 3 |
| REACT-01 | 4 |
| ASSET-02 | 5 |
| PROD-01 | 6 |
| MOCK-01 | 7 |
| MOCK-02 | 8 |
| MOCK-03 | 9 |
| PROD-03 | 10 |

**Coverage:** 11/11 v1 requirements mapped ✓ — no orphans, no duplicates
