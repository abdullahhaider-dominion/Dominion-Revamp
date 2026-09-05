---
phase: 7
slug: archive-mockups
status: draft
nyquist_compliant: true
wave_0_complete: false
created: 2026-09-05
---

# Phase 7 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.
> Automated layer = git archive integrity script (no Vitest/Playwright).

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | none — phase Node script + git CLI |
| **Config file** | none — Wave 0 adds `scripts/archive-verify.mjs` |
| **Quick run command** | `node .planning/phases/07-archive-mockups/scripts/archive-verify.mjs` |
| **Full suite command** | same script (all asserts) |
| **Estimated runtime** | < 5 seconds once branch + sibling exist |

---

## Sampling Rate

- **After every task commit:** Run verify script once `archive/mockups` exists (Task 2+); full asserts after sibling + `07-ARCHIVE.md` (Task 4)
- **After every plan wave:** Full suite exit 0
- **Before `/gsd-verify-work`:** Full suite green + `07-ARCHIVE.md` present
- **Max feedback latency:** ~5 seconds (plus ~90–120s one-time subtree split during Task 2)

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Threat Ref | Secure Behavior | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|------------|-----------------|-----------|-------------------|-------------|--------|
| 07-01-01 | 01 | 0 | MOCK-01 | T-07-01 | Verify script rejects path traversal; only fixed roots | smoke/script | script exists + `node --check` | ❌ W0 | ⬜ pending |
| 07-01-02 | 01 | 1 | MOCK-01 | T-07-02 | Branch created; main `mockups/` untouched; no origin push | smoke/script | `archive-verify.mjs` (partial OK until sibling) | ❌ W0 | ⬜ pending |
| 07-01-03 | 01 | 1 | MOCK-01 | T-07-02 | Sibling HEAD == archive tip; file set 139 | smoke/script | full `archive-verify.mjs` | ❌ W0 | ⬜ pending |
| 07-01-04 | 01 | 1 | MOCK-01 | T-07-03 | `07-ARCHIVE.md` SHA + push-later cmds; no secrets | docs + script | full `archive-verify.mjs` | ❌ ARCHIVE | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

- [ ] `.planning/phases/07-archive-mockups/scripts/archive-verify.mjs` — MOCK-01 asserts (branch, history, file-set, sibling, main intact, ARCHIVE.md)
- [ ] Framework install: **none** — do not add Vitest/Playwright

### Script must assert

1. `refs/heads/archive/mockups` exists
2. `git rev-list --count archive/mockups` ≥ 2
3. Split tree file count == 139 and matches `git ls-files mockups` with prefix stripped
4. Current production branch still has 139 tracked `mockups/` paths
5. Sibling `/Users/usama/Desktop/Dominion Markets/Dominion-Markets-mockups-archive` is a git repo with `HEAD` == archive tip
6. `07-ARCHIVE.md` contains full tip SHA, sibling absolute path, and a push-later one-liner for `origin archive/mockups`

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| Confirm no `git push` to origin occurred | MOCK-01 / D-03 | Push is negative evidence | Check shell history / SUMMARY attestation; `git status -sb` still ahead of origin without new remote-tracking `archive/mockups` |
| Sibling README provenance readable | MOCK-01 (discretion) | Human skim | Open sibling `README.md` |

---

## Validation Sign-Off

- [x] All tasks have `<automated>` verify or Wave 0 dependencies
- [x] Sampling continuity: no 3 consecutive tasks without automated verify
- [x] Wave 0 covers MISSING script reference
- [x] No watch-mode flags
- [x] Feedback latency < 90s (script); subtree split is one-shot setup not per-sample
- [x] `nyquist_compliant: true` set in frontmatter

**Approval:** draft from research 2026-09-05 — planner may refine task IDs
