---
phase: 8
slug: retarget-design-docs
status: draft
nyquist_compliant: true
wave_0_complete: true
created: 2026-09-05
---

# Phase 8 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.
> Automated layer = docs/`rg` (ripgrep) + git retain checks. **No Vitest / Playwright.**

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | none — shell `rg` + `git` |
| **Config file** | none |
| **Quick run command** | deny-list `rg` on target files (expect no matches / exit 1) |
| **Full suite command** | deny-list + allow-list `rg` + `mockups/` retain count |
| **Estimated runtime** | < 5 seconds |

### Target files (operational SoT)

```
readme.md
web/README.md
.planning/PROJECT.md
.cursor/skills/dominion-section-redesign/SKILL.md
CLAUDE.md
```

### Deny-list phrases (must not appear in target files after retarget)

- `Source of truth for design still lives in \`../mockups/\``
- `Design SoT today: \`mockups/\``
- `Working hi-fi: \`mockups/\``
- `Design source of truth remains \`mockups/\``
- `Vanilla hi-fi mockup lives in \`mockups/\``

### Allow-list (must appear)

- `07-ARCHIVE.md` in: skill, `readme.md`, `web/README.md`, `.planning/PROJECT.md` (CLAUDE.md recommended)

---

## Sampling Rate

- **After every task commit:** deny-list `rg` on files that task changed
- **After every plan wave:** full suite (deny + allow + retain)
- **Before `/gsd-verify-work`:** full suite green + SUMMARY present
- **Max feedback latency:** ~5 seconds

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Threat Ref | Secure Behavior | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|------------|-----------------|-----------|-------------------|-------------|--------|
| 08-01-01 | 01 | 1 | MOCK-02 | T-08-01 | Skill cites ARCHIVE; no Working hi-fi mockups SoT | docs/grep | deny on skill + `rg -n '07-ARCHIVE' .cursor/skills/.../SKILL.md` | ✅ paths | ⬜ pending |
| 08-01-02 | 01 | 1 | MOCK-02 | T-08-01 | READMEs/PROJECT/CLAUDE denylist clean; ARCHIVE linked | docs/grep | deny on all targets + allow on READMEs/PROJECT | ✅ paths | ⬜ pending |
| 08-01-03 | 01 | 1 | MOCK-02 | T-08-02 | Full gate; mockups retained; no web/src; SUMMARY | docs/grep + git | full suite below | ❌ SUMMARY W0 | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

*Task IDs assume 3-task `08-01-PLAN` from RESEARCH; planner may collapse 02+03 — keep full suite before verify-work.*

---

## Quick / Full Commands

### Quick (deny-list)

```bash
cd "/Users/usama/Desktop/Dominion Markets/Vanilla to nextjs"
rg -n \
  -e 'Source of truth for design still lives in `\.\./mockups/`' \
  -e 'Design SoT today: `mockups/`' \
  -e 'Working hi-fi: `mockups/`' \
  -e 'Design source of truth remains `mockups/`' \
  -e 'Vanilla hi-fi mockup lives in `mockups/`' \
  readme.md web/README.md .planning/PROJECT.md \
  .cursor/skills/dominion-section-redesign/SKILL.md CLAUDE.md
# PASS = no matches (rg exit code 1). FAIL = any match (exit 0).
```

### Allow-list

```bash
for f in \
  readme.md \
  web/README.md \
  .planning/PROJECT.md \
  .cursor/skills/dominion-section-redesign/SKILL.md
do
  rg -q '07-ARCHIVE\.md' "$f" || { echo "MISSING ARCHIVE link: $f"; exit 1; }
done
echo "ALLOW: OK"
```

### Retain + no runtime edits (D-05)

```bash
test "$(git ls-files mockups | wc -l | tr -d ' ')" = "139" || { echo "FAIL: mockups count"; exit 1; }
# Phase commits must not modify web/src — check diff vs pre-phase base or ensure no staged web/src
git diff --name-only HEAD~3..HEAD -- web/src 2>/dev/null | grep . && { echo "FAIL: web/src touched"; exit 1; } || true
# Prefer: executor attests in SUMMARY that no web/src files were in the commit set
echo "RETAIN: OK"
```

### Full suite one-liner sequence

```bash
# 1) deny must be empty
! rg -n \
  -e 'Source of truth for design still lives in `\.\./mockups/`' \
  -e 'Design SoT today: `mockups/`' \
  -e 'Working hi-fi: `mockups/`' \
  -e 'Design source of truth remains `mockups/`' \
  -e 'Vanilla hi-fi mockup lives in `mockups/`' \
  readme.md web/README.md .planning/PROJECT.md \
  .cursor/skills/dominion-section-redesign/SKILL.md CLAUDE.md \
  && echo "DENY: OK"
# 2) allow
for f in readme.md web/README.md .planning/PROJECT.md .cursor/skills/dominion-section-redesign/SKILL.md; do
  rg -q '07-ARCHIVE\.md' "$f" || exit 1
done && echo "ALLOW: OK"
# 3) retain
test "$(git ls-files mockups | wc -l | tr -d ' ')" = "139" && echo "RETAIN: OK"
```

---

## Wave 0 Requirements

- [x] Framework install: **none** — do not add Vitest/Playwright
- [x] No new verify script required (YOLO from RESEARCH) — gates are shell `rg` + `git`
- [ ] `08-01-SUMMARY.md` — created at execute Task 3 (expected MISSING until execute)

### Out of gate scope (do not fail on)

- `docs/superpowers/**` historical mentions of “hi-fi mockups”
- `.planning/codebase/**` dated map SoT language
- `mockups/README.md` (artifact tree)
- Bare path `mockups/` in provenance sentences (“ported from…”)

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| Skill implement section readable for archive vs `web/` | MOCK-02 / D-01 | Judgment of clarity | Skim skill: agent would not assume must edit in-repo `mockups/` |
| No `git push` performed | D-05 | Negative evidence | SUMMARY attestation; no new `origin/archive/mockups` |

---

## must_haves (phase gate)

1. Skill cites `07-ARCHIVE.md`; no `Working hi-fi: \`mockups/\``
2. `readme.md` + `web/README.md` cite ARCHIVE; no “lives in mockups” / “SoT still in ../mockups” phrases
3. `PROJECT.md` Context no longer `Design SoT today: \`mockups/\``
4. `CLAUDE.md` no longer `Design source of truth remains \`mockups/\``
5. Deny-list clean; allow-list green on skill + READMEs + PROJECT
6. `git ls-files mockups` still **139**; no `web/src` changes; no push

---

## Validation Sign-Off

- [x] All tasks have `<automated>` verify or Wave 0 dependencies
- [x] Sampling continuity: no 3 consecutive tasks without automated verify
- [x] Wave 0: no MISSING framework — grep gates documented
- [x] No watch-mode flags
- [x] Feedback latency < 90s
- [x] `nyquist_compliant: true` set in frontmatter
- [x] `wave_0_complete: true` (no script bootstrap needed)

**Approval:** draft from research 2026-09-05 — planner may refine task IDs
