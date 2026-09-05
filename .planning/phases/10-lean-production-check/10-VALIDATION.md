---
phase: 10
slug: lean-production-check
status: draft
nyquist_compliant: true
wave_0_complete: false
created: 2026-09-05
---

# Phase 10 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.
> Automated layer = Node `lean-verify.mjs` + Next `npm run build`. **No Vitest / Playwright.**

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | none — phase Node script + git CLI + Next build |
| **Config file** | none — Wave 0 adds `scripts/lean-verify.mjs` |
| **Quick run command** | `node .planning/phases/10-lean-production-check/scripts/lean-verify.mjs --skip-build` |
| **Full suite command** | `lean-verify.mjs` (with build) **or** `--skip-build` + `cd web && npm run build` |
| **Estimated runtime** | skip-build < 5s; build ~30–120s depending on machine |

### ABSENT vs PRESENT (hard)

| Path / Set | After Phase 10 | Why |
|------------|----------------|------|
| `mockups/` (repo root) | **ABSENT** | Phase 9 / PROD-03 orphan |
| `Hero-background.png` (repo root) | **ABSENT** | ASSET-04 orphan |
| All paths in `05-DELETE-LIST.txt` (55) | **ABSENT** | ASSET-02 prune |
| Inventory `class=keep` (82) under `web/public` | **PRESENT** | Keep set SoT |
| `web/public/mockups.css` | **PRESENT** | Production CSS port |
| `web/src/lib/mockups-main.js` | **PRESENT** | Production JS port |
| `web/public/assets/hero/Hero-background.png` | **PRESENT** | Served hero |
| `web/src`, `web/package.json`, Next config | **PRESENT** | Deployable app |
| `docs/`, `wireframes/` | **MAY EXIST** | D-03 — do not delete |

### Ignore rules (must prove)

| Pattern | Proof |
|---------|--------|
| `node_modules` | `git check-ignore` under `web/` + `git ls-files web/node_modules` empty |
| `.next` | same for `web/.next` |
| `.env*` | check-ignore + no tracked `web/.env*` |

### Status semantics

| Observation | Verdict |
|-------------|---------|
| `main` ahead of `origin/main` | **OK** — push-ready ≠ pushed |
| Untracked root/docs `.DS_Store` | Optional hygiene; do not block |
| Tracked `.planning/**/.DS_Store` | Note only; do not block unless trivial |

### Out of gate scope (do not fail on)

- Presence of `docs/` or `wireframes/`
- Branch ahead of origin
- Historical planning narratives mentioning orphans
- Archive branch / sibling (read-only; not required to re-verify unless easy)

---

## Sampling Rate

- **After every task commit:** Task-appropriate gate (below)
- **After every plan wave:** Full suite (verify + build)
- **Before `/gsd-verify-work`:** Full suite green + `10-LEAN-CHECK.md` + SUMMARY present
- **Max feedback latency:** skip-build ~5s; build separately ≤ ~2 min

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Threat Ref | Secure Behavior | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|------------|-----------------|-----------|-------------------|-------------|--------|
| 10-01-01 | 01 | 0 | PROD-03 | T-10-01 | Script rejects `..`; D-01 FS/git asserts | smoke/script | `node --check` + `--skip-build` | ❌ W0 | ⬜ pending |
| 10-01-02 | 01 | 1 | PROD-03 | T-10-02 | Checklist written; docs/wireframes preserved; no public prune | docs + FS | `test -f 10-LEAN-CHECK.md`; `test -d docs wireframes` | ❌ execute | ⬜ pending |
| 10-01-03 | 01 | 1 | PROD-03 | T-10-03 | Full lean-verify + build 0; no push | smoke + build | full suite below | ❌ SUMMARY W0 | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

*Task IDs assume 2–3-task `10-01-PLAN` from RESEARCH; planner may collapse 02+03 — keep full suite before verify-work.*

---

## Quick / Full Commands

### Orphan absence + keep quick checks

```bash
cd "/Users/usama/Desktop/Dominion Markets/Vanilla to nextjs"
test ! -e mockups || { echo "FAIL: mockups/"; exit 1; }
test ! -e Hero-background.png || { echo "FAIL: root hero"; exit 1; }
test -f web/public/mockups.css
test -f web/src/lib/mockups-main.js
test -d web/src && test -f web/package.json
# delete-list all absent; keep=82 — prefer lean-verify.mjs
echo "QUICK: OK"
```

### Ignore quick checks

```bash
(cd web && git check-ignore -v node_modules .next .env .env.local)
test -z "$(git ls-files 'web/node_modules' 'web/.next' 'web/.env*')" || exit 1
echo "IGNORES: OK"
```

### Full suite

```bash
node .planning/phases/10-lean-production-check/scripts/lean-verify.mjs
# if script supports --skip-build only for FS/git:
# node .../lean-verify.mjs --skip-build && (cd web && npm run build)
test -f .planning/phases/10-lean-production-check/10-LEAN-CHECK.md
test -d docs && test -d wireframes
```

---

## Wave 0 Requirements

- [ ] `.planning/phases/10-lean-production-check/scripts/lean-verify.mjs` — D-01 asserts + build (or build invoked by plan)
- [x] Framework install: **none** — do not add Vitest/Playwright
- [ ] `10-LEAN-CHECK.md` — created at execute Task 2
- [ ] `10-01-SUMMARY.md` — created at execute Task 3

### Script must assert

1. `mockups/` absent; `git ls-files mockups` empty
2. Root `Hero-background.png` absent
3. Every `05-DELETE-LIST.txt` path absent
4. Every inventory `class=keep` path present; keep count **82**; `web/public` file count matches (ignore `.DS_Store`)
5. Deployable `web/` present (`src/`, package.json, Next config); KEEP ports present
6. `node_modules` / `.next` / `.env*` ignored and untracked under `web/`
7. Do **not** fail if `docs/` or `wireframes/` exist
8. Log ahead/behind; do **not** fail solely because ahead of origin
9. Reject path traversal (`..`)
10. Full gate: `npm run build` in `web/` exit 0 (unless `--skip-build` for quick sampling)

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| No `git push` performed | D-03 | Negative evidence | SUMMARY attestation; no new remote updates for this phase |
| `docs/` / `wireframes/` not deleted | D-03 | Intentional allow | `test -d docs && test -d wireframes` after phase |
| No further public prune | D-03 | Would need delete audit | SUMMARY: no `web/public` deletions in phase commits |
| Push-ready ≠ pushed noted | D-01.5 | Semantic | Checklist Status section records ahead OK |

---

## must_haves (phase gate)

1. `10-LEAN-CHECK.md` proves Absent / Present / Ignores / Status / Hard stops (D-01).
2. Orphans absent: `mockups/`, root `Hero-background.png`, all 55 delete-list paths.
3. Keep set present: **82** inventory keeps on disk; public file count matches; ports + deployable `web/` present.
4. Ignores: `node_modules`, `.next`, `.env*` excluded from git under `web/`.
5. `lean-verify.mjs` exit 0 and `cd web && npm run build` exit 0 (D-02).
6. Hard stops: `docs/` + `wireframes/` remain; no push; no mockups restore; no extra public prune (D-03).
7. Status: ahead-of-origin is OK (push-ready ≠ pushed).

---

## Validation Sign-Off

- [x] All tasks have `<automated>` verify or Wave 0 dependencies
- [x] Sampling continuity: no 3 consecutive tasks without automated verify
- [x] Wave 0 covers MISSING `lean-verify.mjs`
- [x] No watch-mode flags
- [x] Feedback latency: skip-build < 90s; build allowed separately
- [x] `nyquist_compliant: true` set in frontmatter
- [ ] `wave_0_complete: true` — flip when script lands in Task 1

**Approval:** draft from research 2026-09-05 — planner may refine task IDs
