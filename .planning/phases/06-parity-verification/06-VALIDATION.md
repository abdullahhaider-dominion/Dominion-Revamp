---
phase: 6
slug: parity-verification
status: approved
nyquist_compliant: true
wave_0_complete: false
created: 2026-09-05
---

# Phase 6 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.
> Automated layer = phase one-shot ref-check + `npm run build` (no Vitest/Playwright).

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | none — phase script + Next build |
| **Config file** | none — Wave 0 adds `scripts/parity-ref-check.mjs` |
| **Quick run command** | `node .planning/phases/06-parity-verification/scripts/parity-ref-check.mjs` |
| **Full suite command** | same script + `cd web && npm run build` |
| **Estimated runtime** | ~5–90 seconds (script fast; build dominates) |

---

## Sampling Rate

- **After every task commit:** Run quick ref-check (after Task 1+); after Task 2+ also build
- **After every plan wave:** Full suite (script + build)
- **Before `/gsd-verify-work`:** Full suite green + checklist present
- **Max feedback latency:** ~90 seconds

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Threat Ref | Secure Behavior | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|------------|-----------------|-----------|-------------------|-------------|--------|
| 06-01-01 | 01 | 1 | PROD-01 | T-06-01 | Path-aware refs exist; ∅ ∩ delete list; keeps present; no path traversal | smoke/script | `node .planning/phases/06-parity-verification/scripts/parity-ref-check.mjs` | ❌ W0 | ⬜ pending |
| 06-01-02 | 01 | 1 | PROD-01 | T-06-02 | Build green; checklist has PASS meta + human_needed visual rows | build + file | see Task 2 `<automated>` in PLAN | ❌ W0 checklist | ⬜ pending |
| 06-01-03 | 01 | 1 | PROD-01 | — | SUMMARY cites PROD-01; script+build still green | docs + smoke | Task 3 `<automated>` | ❌ W0 SUMMARY | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

- [ ] `.planning/phases/06-parity-verification/scripts/parity-ref-check.mjs` — Asserts A/B/C
- [ ] `.planning/phases/06-parity-verification/06-PARITY-CHECKLIST.md` — section/widget UAT rows
- [ ] Framework install: **none** — do not add Vitest/Playwright

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| Visual layout of hero + body sections | PROD-01 | Judgment of “looks right” | Walk checklist visual rows; or D-02 browser smoke with screenshots |
| Widget interactions (tabs/marquees) | PROD-01 | Needs runtime DOM | Click tabs / observe marquee; leave `human_needed` if no smoke |

---

## Validation Sign-Off

- [x] All tasks have `<automated>` verify or Wave 0 dependencies
- [x] Sampling continuity: no 3 consecutive tasks without automated verify
- [x] Wave 0 covers all MISSING references (script + checklist)
- [x] No watch-mode flags
- [x] Feedback latency < 90s
- [x] `nyquist_compliant: true` set in frontmatter

**Approval:** approved 2026-09-05
