---
phase: 9
slug: remove-mockups-tree
status: draft
nyquist_compliant: true
wave_0_complete: false
created: 2026-09-05
---

# Phase 9 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.
> Automated layer = Node `remove-verify.mjs` + Next `npm run build`. **No Vitest / Playwright.**

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | none — phase Node script + git CLI + Next build |
| **Config file** | none — Wave 0 adds `scripts/remove-verify.mjs` |
| **Quick run command** | `node .planning/phases/09-remove-mockups-tree/scripts/remove-verify.mjs` |
| **Full suite command** | `remove-verify.mjs` + `cd web && npm run build` |
| **Estimated runtime** | verify < 5s; build ~30–120s depending on machine |

### KEEP vs DELETE (hard)

| Path | After Phase 9 | Why |
|------|---------------|------|
| `mockups/` (repo root) | **ABSENT** | MOCK-03 delete target |
| `web/public/mockups.css` | **PRESENT** | Production CSS (`/mockups.css`) |
| `web/src/lib/mockups-main.js` | **PRESENT** | Production interactions port |
| `refs/heads/archive/mockups` | **UNCHANGED** | D-05 |
| Sibling archive repo | **UNCHANGED** | D-05 |

### Operational doc targets (D-03)

```
readme.md
web/README.md
.planning/PROJECT.md
.cursor/skills/dominion-section-redesign/SKILL.md
CLAUDE.md
```

### Deny-list phrases (must not appear in operational targets after tense cleanup)

- `until Phase 9`
- `temporary until Phase 9`
- `may still exist temporarily`
- `may remain until Phase 9`
- `may exist until Phase 9`
- `still present on main until Phase 9`

### Allow-list (must appear)

- `07-ARCHIVE.md` in each operational target
- Archive tip / sibling still documented in `07-ARCHIVE.md`

### Out of gate scope (do not fail on)

- Historical `.planning/phases/07-*` / `08-*` docs mentioning future Phase 9
- Comment provenance in `web/src` (“Auto-wrapped from mockups/…”)
- `docs/superpowers/**` historical plans

---

## Sampling Rate

- **After every task commit:** Task-appropriate gate (below)
- **After every plan wave:** Full suite (verify + build)
- **Before `/gsd-verify-work`:** Full suite green + SUMMARY present
- **Max feedback latency:** verify ~5s; build separately ≤ ~2 min

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Threat Ref | Secure Behavior | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|------------|-----------------|-----------|-------------------|-------------|--------|
| 09-01-01 | 01 | 0 | MOCK-03 | T-09-01 | Script rejects `..`; preflight archive/sibling/ARCHIVE; no runtime `../mockups` | smoke/script | `node --check` + D-01 preflight (+ optional archive-verify) | ❌ W0 | ⬜ pending |
| 09-01-02 | 01 | 1 | MOCK-03 | T-09-02 | `git rm -r mockups`; KEEP web ports; tense deny-list clean | smoke/git/docs | `test ! -e mockups`; `git ls-files mockups` empty; KEEP files exist | ❌ W0 post-delete | ⬜ pending |
| 09-01-03 | 01 | 1 | MOCK-03 | T-09-03 | Full remove-verify; build 0; archive tip unchanged; no push | smoke + build | full suite below | ❌ SUMMARY W0 | ⬜ pending |

*Status: ⬜ pending · ✅ green · ✅ green · ❌ red · ⚠️ flaky*

*Task IDs assume 3-task `09-01-PLAN` from RESEARCH; planner may collapse 02+03 — keep full suite before verify-work.*

---

## Quick / Full Commands

### Preflight (D-01) — before delete only

```bash
cd "/Users/usama/Desktop/Dominion Markets/Vanilla to nextjs"
TIP=$(git rev-parse archive/mockups)
echo "TIP=$TIP"
SIB="/Users/usama/Desktop/Dominion Markets/Dominion-Markets-mockups-archive"
test -d "$SIB" || exit 1
test "$(cd "$SIB" && git rev-parse HEAD)" = "$TIP" || exit 1
test -f .planning/phases/07-archive-mockups/07-ARCHIVE.md || exit 1
for f in readme.md web/README.md .planning/PROJECT.md \
  .cursor/skills/dominion-section-redesign/SKILL.md CLAUDE.md; do
  rg -q '07-ARCHIVE\.md' "$f" || { echo "MISSING ARCHIVE: $f"; exit 1; }
done
# optional: node .planning/phases/07-archive-mockups/scripts/archive-verify.mjs
# abort if real runtime dependency (comments OK):
rg -n '\.\./mockups' web/src --glob '!**/node_modules/**' || true
echo "PREFLIGHT: OK"
```

### Post-delete quick checks

```bash
test ! -e mockups || { echo "FAIL: mockups still exists"; exit 1; }
test -z "$(git ls-files mockups)" || { echo "FAIL: tracked mockups remain"; exit 1; }
test -f web/public/mockups.css || { echo "FAIL: deleted public mockups.css"; exit 1; }
test -f web/src/lib/mockups-main.js || { echo "FAIL: deleted mockups-main.js"; exit 1; }
echo "DELETE+KEEP: OK"
```

### Tense deny-list (operational targets)

```bash
rg -n \
  -e 'until Phase 9' \
  -e 'temporary until Phase 9' \
  -e 'may still exist temporarily' \
  -e 'may remain until Phase 9' \
  -e 'may exist until Phase 9' \
  -e 'still present on main until Phase 9' \
  readme.md web/README.md .planning/PROJECT.md \
  .cursor/skills/dominion-section-redesign/SKILL.md CLAUDE.md
# PASS = no matches (rg exit 1). FAIL = any match (exit 0).
```

### Full suite

```bash
node .planning/phases/09-remove-mockups-tree/scripts/remove-verify.mjs
(cd web && npm run build)
```

---

## Wave 0 Requirements

- [ ] `.planning/phases/09-remove-mockups-tree/scripts/remove-verify.mjs` — MOCK-03 post-delete asserts (see RESEARCH design contract)
- [x] Framework install: **none** — do not add Vitest/Playwright
- [ ] `09-01-SUMMARY.md` — created at execute Task 3

### Script must assert (post-delete)

1. `refs/heads/archive/mockups` resolves; tip matches SHA in `07-ARCHIVE.md`
2. Sibling path exists; `HEAD` === archive tip
3. `mockups/` path does **not** exist at repo root
4. `git ls-files mockups` is empty
5. `web/public/mockups.css` and `web/src/lib/mockups-main.js` exist
6. Current branch is not `archive/mockups`
7. Operational targets contain `07-ARCHIVE.md` and pass tense deny-list
8. No path-traversal (`..`) accepted in script-controlled paths

**Do not** require Phase 7 `archive-verify.mjs` exit 0 after delete (it expects 139 files on main).

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|----------------|-------------------|
| No `git push` performed | D-05 | Negative evidence | SUMMARY attestation; no new remote-tracking updates for this phase |
| Sibling repo contents untouched | D-05 | Would need full tree diff | Confirm tip SHA unchanged; do not open sibling for edits |
| Optional `du` byte savings noted | Discretion | Nice-to-have | SUMMARY mentions ~64M if recorded pre-delete |

---

## must_haves (phase gate)

1. D-01 preflight passed **before** delete (archive tip, sibling HEAD match, ARCHIVE + Phase 8 citations).
2. `mockups/` absent from working tree; `git ls-files mockups` empty after `git rm -r mockups`.
3. `web/public/mockups.css` and `web/src/lib/mockups-main.js` still present (not deleted with the tree).
4. Operational docs cleaned of “until Phase 9 / may still exist” presence language; still cite `07-ARCHIVE.md` + `web/`.
5. `archive/mockups` tip and sibling HEAD unchanged; no `git push`; no `web/src` edits (unless abort path).
6. `remove-verify.mjs` exit 0 and `cd web && npm run build` exit 0.

---

## Validation Sign-Off

- [x] All tasks have `<automated>` verify or Wave 0 dependencies
- [x] Sampling continuity: no 3 consecutive tasks without automated verify
- [x] Wave 0 covers MISSING `remove-verify.mjs`
- [x] No watch-mode flags
- [x] Feedback latency: verify < 90s; build allowed separately
- [x] `nyquist_compliant: true` set in frontmatter
- [ ] `wave_0_complete: true` — flip when script lands in Task 1

**Approval:** draft from research 2026-09-05 — planner may refine task IDs
