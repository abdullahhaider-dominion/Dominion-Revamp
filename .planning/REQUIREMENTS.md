# Requirements: Dominion Markets — Production Cleanup

**Defined:** 2026-09-05
**Core Value:** Ship a clean production Next.js site that keeps every asset and behavior the live site actually uses — never delete something still referenced.

## v1 Requirements

Requirements for this milestone. Each maps to roadmap phases.

### Asset Hygiene

- [x] **ASSET-01**: Inventory `web/public` files against references in `web/src` and served `web/public/mockups.css`
- [x] **ASSET-02**: Delete only assets proven unused by that inventory (no guess deletes)
- [x] **ASSET-03**: Remove dead unused CSS copy `web/src/styles/mockups.css` after confirming nothing imports it
- [x] **ASSET-04**: Remove orphan root `Hero-background.png` while keeping `web/public/assets/hero/Hero-background.png`

### Mockups Retirement

- [x] **MOCK-01**: Archive `mockups/` to a separate git repo or long-lived branch (history preserved)
- [x] **MOCK-02**: Update docs/skills/READMEs that treat `mockups/` as SoT to point at the archive
- [x] **MOCK-03**: Remove `mockups/` from this production repo only after archive + doc updates

### Minimal React

- [x] **REACT-01**: Change React/HTML callers only when required to unlock safe deletion of large unused assets

### Production Readiness

- [x] **PROD-01**: After cleanup, live homepage sections still match pre-cleanup look/behavior for remaining content
- [x] **PROD-02**: Ensure `web/` app source is tracked in git (not left untracked)
- [ ] **PROD-03**: Repo is lean and push-ready for production deploy of `web/`

## v2 Requirements

Deferred to future release. Tracked but not in current roadmap.

### Full React Cutover

- **REACT-02**: Replace all `home-html.ts` body sections with React components
- **REACT-03**: Retire `mockups-main.js` and monolithic served `mockups.css` after full cutover

### Design Artifact Slimming

- **DOCS-01**: Decide long-term home for `docs/` and `wireframes/` outside the production app path

## Out of Scope

Explicitly excluded. Documented to prevent scope creep.

| Feature | Reason |
|---------|--------|
| Full homepage React rewrite this milestone | Only minimal caller changes for safe deletes |
| Deleting assets still referenced in `web/src` or served CSS | Violates safety bar (static-scan proof only) |
| Visual redesign / new marketing features | Cleanup and readiness, not a relaunch |
| Auth, CMS, analytics backends | Not part of this milestone |
| Wholesale delete of `docs/` / `wireframes/` | Small on disk; not the main weight problem |

## Traceability

Which phases cover which requirements. Updated during roadmap creation.

| Requirement | Phase | Status |
|-------------|-------|--------|
| ASSET-01 | Phase 2 | Complete |
| ASSET-02 | Phase 5 | Complete |
| ASSET-03 | Phase 3 | Complete |
| ASSET-04 | Phase 3 | Complete |
| MOCK-01 | Phase 7 | Complete |
| MOCK-02 | Phase 8 | Complete |
| MOCK-03 | Phase 9 | Complete |
| REACT-01 | Phase 4 | Complete |
| PROD-01 | Phase 6 | Complete |
| PROD-02 | Phase 1 | Complete |
| PROD-03 | Phase 10 | Pending |

**Coverage:**
- v1 requirements: 11 total
- Mapped to phases: 11
- Unmapped: 0 ✓

---
*Requirements defined: 2026-09-05*
*Last updated: 2026-09-05 after roadmap creation*
