# Phase 10: Lean Production Check - Research

**Researched:** 2026-09-05
**Domain:** Production-repo lean / push-ready gate (orphan absence + keep set + ignores + build proof)
**Confidence:** HIGH

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions
- **D-01:** Write `10-LEAN-CHECK.md` proving:
  1. Absent: in-repo `mockups/`, root `Hero-background.png`, Phase 5 delete-list paths under `web/public`
  2. Present: deployable `web/` (`src/`, `public/` keep set, package.json, config); `web/public/mockups.css` + ports kept
  3. Ignores: `node_modules` / `.next` / `.env*` excluded from git
  4. Optional: untracked OS junk (`.DS_Store`) noted — clean if trivial, do not block on historical tracked `.DS_Store` under `.planning` unless easy
  5. Branch status: ahead of origin is OK; “push-ready” ≠ “pushed”

- **D-02:** Phase script `scripts/lean-verify.mjs` (or equiv) exit 0 covering D-01 asserts + `cd web && npm run build` exit 0.

- **D-03:** Do not delete `docs/` or `wireframes/`. Do not push. Do not restore `mockups/`. Do not prune further public assets beyond Phase 5 list.

### Claude's Discretion
- Whether to `rm` untracked root/docs `.DS_Store` as hygiene.
- SUMMARY + optional milestone wrap note in PROJECT.md Current State.

### Deferred Ideas (OUT OF SCOPE)
- Push to GitHub — user must request
- Full React homepage rewrite — v2
- Delete docs/wireframes — out of milestone scope
</user_constraints>

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| PROD-03 | Repo is lean and push-ready for production deploy of `web/` | D-01 checklist artifact + absence/presence/ignore/status asserts; D-02 `lean-verify.mjs` + `npm run build`; D-03 hard stops (`docs/`/`wireframes/` kept, no push, no mockups restore, no further public prune); keep set = inventory `class=keep` (~82) exact |
</phase_requirements>

## Summary

Phase 10 is a **verification + documentation gate**, not a cleanup redesign. Milestone orphans targeted by Phases 3/5/9 are already gone on disk; the keep set under `web/public` already equals inventory **82/82** with **0** Phase 5 delete-list paths present; `main` is **ahead 79** of `origin/main` (local commits not pushed). PROD-03 therefore means: prove that state with a durable checklist (`10-LEAN-CHECK.md`) and a reusable Nyquist script (`lean-verify.mjs`) that also runs `cd web && npm run build`, without pushing and without deleting allowed trees (`docs/`, `wireframes/`).

Critical semantic: **push-ready ≠ pushed**. Being ahead of origin is success evidence that local work is coherent and deployable from this tree — not a failure. The phase must not run `git push`.

**Primary recommendation:** One plan (`10-01-PLAN.md`) with **2–3 tasks** — Wave 0 `lean-verify.mjs`, write `10-LEAN-CHECK.md` (+ optional untracked `.DS_Store` hygiene), then full suite (script + build) + SUMMARY (+ optional PROJECT.md wrap). No Vitest/Playwright; no further public asset deletes.

## Architectural Responsibility Map

| Capability | Primary Tier | Secondary Tier | Rationale |
|------------|-------------|----------------|-----------|
| Orphan absence asserts (`mockups/`, root hero, delete-list) | Database / Storage (git + FS) | — | Disk + index proof of milestone deletes |
| Keep-set presence (~82) + ports | CDN / Static (`web/public`) + Frontend Server (`web/src`) | — | Deployable production tree must retain inventory keeps + CSS/JS ports |
| Ignore rules (`node_modules`, `.next`, `.env*`) | Database / Storage (git ignore) | Frontend Server | Secrets/build junk must stay untracked |
| Build proof | Frontend Server (`web/` Next build) | CDN / Static | Confirms app still packs without orphans |
| Checklist artifact `10-LEAN-CHECK.md` | — (process) | — | Human-readable PROD-03 proof (D-01) |
| Push-ready status (ahead OK) | Database / Storage (git remotes) | — | Status coherence without requiring push |
| Preserve `docs/` / `wireframes/` | — (hard stop) | — | D-03 — allowed non-app trees |

## Project Constraints (from .cursor/rules/)

No `.cursor/rules/` directory present. Actionable constraints from project skill + prior phases:

| Source | Directive for Phase 10 |
|--------|------------------------|
| `.planning/codebase/TESTING.md` | No Jest/Vitest/Playwright — use phase Node script + `npm run build` only |
| Prior Nyquist pattern (Phases 6–9) | Script under `.planning/phases/10-lean-production-check/scripts/`; reject `..`; fail loud |
| User git rules | No `git push` unless user asks; no force-push |
| `.cursor/skills/dominion-section-redesign/SKILL.md` | Do **not** redesign sections; cite archive/`web/` only — Phase 10 is lean check, not UI work |
| D-03 | Never delete `docs/` or `wireframes/`; never restore `mockups/`; never prune beyond Phase 5 list |

## Standard Stack

### Core

| Tool | Version | Purpose | Why Standard |
|------|---------|---------|--------------|
| Node.js | v24.13.1 `[VERIFIED: shell]` | `lean-verify.mjs` Nyquist gate | Same pattern as Phases 6–9 verify scripts |
| Git | 2.50.1 (Apple Git-155) `[VERIFIED: shell]` | `ls-files`, `check-ignore`, status ahead/behind | Prove ignores + push-ready status |
| npm | 11.12.1 `[VERIFIED: shell]` | `cd web && npm run build` | D-02 build proof |
| Next.js | 16.3.4 in `web/package.json`; registry 16.3.4 `[VERIFIED: npm view + package.json]` | Production build | App under `web/` `[CITED: Context7 /vercel/next.js — next build]` |

### Supporting

| Tool / Artifact | Version / Path | Purpose | When to Use |
|-----------------|----------------|---------|-------------|
| `02-INVENTORY.json` | keep=82 `[VERIFIED: node parse]` | Keep-set SoT | Assert every `class=keep` path exists |
| `05-DELETE-LIST.txt` | 55 paths `[VERIFIED: wc -l]` | Must stay absent | Assert `!exists` for each line |
| `web/.gitignore` | create-next-app defaults `[VERIFIED: file]` | `/node_modules`, `/.next/`, `.env*` | `git check-ignore` + empty `git ls-files` |
| `rg` | 15.1.0 `[VERIFIED: shell]` | Optional human quick gates | Not required if script embeds checks |
| Phase 9 `remove-verify.mjs` | reference only | Pattern for fail/exit + path hygiene | Copy structure; do not reuse as Phase 10 gate |

### Alternatives Considered

| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| Phase-local `scripts/lean-verify.mjs` (recommended equiv) | Repo-root `scripts/lean-verify.mjs` | CONTEXT says `scripts/lean-verify.mjs`; prior phases keep scripts under phase dir — **prefer phase-local** as “or equiv”; root `scripts/` does not exist `[VERIFIED: ls]` |
| Exact public file count == 82 | Soft “≈82” only | Live tree is **exact** 82 with 0 extras — script should assert exact equality vs inventory for reproducibility `[VERIFIED: find + inventory]` |
| Require clean working tree / pushed | Allow ahead + optional untracked `.DS_Store` | Locked D-01.5 — push-ready ≠ pushed; do not block on historical `.planning` `.DS_Store` |
| Add Vitest | Phase script only | Violates TESTING.md / prior Nyquist pattern |

**Installation:** none — no new npm packages.

**Version verification:**
```bash
node --version          # v24.13.1
npm view next version   # 16.3.4
# keep/delete live:
# keep=82 missing=0; delete_list=55 still_present=0; public_files=82 extras=0
```

## Architecture Patterns

### System Architecture Diagram

```text
[ENTRY: Phase 10 lean gate]
        │
        ▼
┌───────────────────────────────────────┐
│ lean-verify.mjs (D-01 asserts)        │
│  ABSENT: mockups/, root Hero PNG,     │
│          all 05-DELETE-LIST paths     │
│  PRESENT: web/src, package.json,      │
│           configs, keep×82,           │
│           mockups.css + mockups-main  │
│  IGNORES: node_modules/.next/.env*    │
│           not tracked; check-ignore   │
│  STATUS: record ahead/behind;         │
│           do NOT require pushed       │
│  ALLOW: docs/, wireframes/ may exist  │
└───────────────────┬───────────────────┘
                    │ exit 0
                    ▼
┌───────────────────────────────────────┐
│ cd web && npm run build               │
└───────────────────┬───────────────────┘
                    │ exit 0
                    ▼
┌───────────────────────────────────────┐
│ 10-LEAN-CHECK.md (human proof)        │
│ + 10-01-SUMMARY.md                    │
│ Hard stops: no push; no docs/wf delete│
└───────────────────────────────────────┘
```

### Recommended Project Structure

```text
.planning/phases/10-lean-production-check/
├── 10-CONTEXT.md
├── 10-RESEARCH.md              # this file
├── 10-VALIDATION.md
├── 10-01-PLAN.md               # planner
├── scripts/
│   └── lean-verify.mjs         # Wave 0 — D-01 asserts (build may be invoked by script or plan step)
├── 10-LEAN-CHECK.md            # D-01 deliverable (execute)
└── 10-01-SUMMARY.md            # execute final task
```

### Pattern 1: Absence / presence / ignore triad
**What:** One script fails if any orphan returns, any keep is missing, or junk is tracked.
**When to use:** Always for PROD-03 (D-01 + D-02).
**Example:**
```javascript
// Source: Phase 6/9 verify pattern + 10-CONTEXT D-01 [ASSUMED design; patterns VERIFIED in remove-verify.mjs]
// Path: .planning/phases/10-lean-production-check/scripts/lean-verify.mjs
// REPO_ROOT = resolve(__dirname, "../../../..")
// Reject any path segment '..'

// ABSENT
assertAbsent("mockups");
assertAbsent("Hero-background.png");
for (const p of readLines("05-DELETE-LIST.txt")) assertAbsent(p);

// PRESENT (~82 keep set + deployable web)
assertExists("web/src");
assertExists("web/package.json");
assertExists("web/next.config.ts"); // or next.config.*
assertExists("web/public/mockups.css");
assertExists("web/src/lib/mockups-main.js");
for (const keep of inventory.files.filter(f => f.class === "keep")) assertExists(keep.path);
// optional exactness: public file count == keep count (ignore .DS_Store)

// IGNORES
assertGitLsFilesEmpty("web/node_modules");
assertGitLsFilesEmpty("web/.next");
assertCheckIgnore(["node_modules", ".next", ".env"], { cwd: "web" });

// ALLOW (must NOT fail)
// docs/ and wireframes/ may exist — never assertAbsent them

// STATUS (informational)
log(`ahead/behind vs origin: ${git(["rev-list","--left-right","--count","origin/main...HEAD"])}`);
// do not fail solely because ahead > 0
```

### Pattern 2: Push-ready ≠ pushed
**What:** Treat local ahead-of-origin as OK; never push in this phase.
**When to use:** Status section of checklist + SUMMARY attestation.
**Example:**
```bash
# Source: 10-CONTEXT D-01.5 / D-03 [CITED: 10-CONTEXT.md]
git status -sb
# expect: ## main...origin/main [ahead N]  — PASS for push-ready
# FAIL only if tree incoherent (missing keeps, orphans present, tracked junk)
# NEVER: git push
```

### Pattern 3: Checklist mirrors script
**What:** `10-LEAN-CHECK.md` rows match script asserts so verifier can re-run either layer.
**When to use:** D-01 primary deliverable.
**Example structure:**
```markdown
# 10-LEAN-CHECK
## Absent | Present | Ignores | Status | Hard stops
(with commands + PASS/FAIL + observed counts: keep=82, delete absent=55)
```

### Anti-Patterns to Avoid
- **Failing because `docs/` or `wireframes/` exist:** Violates D-03 / ROADMAP SC3.
- **Requiring `git push` or clean parity with origin:** Violates push-ready ≠ pushed.
- **Deleting more under `web/public`:** Phase 5 list is closed; further prune is out of scope (D-03).
- **Restoring `mockups/` “for completeness”:** Violates D-03 and MOCK-03.
- **Blocking on tracked `.planning/**/.DS_Store`:** D-01.4 — note only unless trivial; do not expand scope into planning-tree hygiene rewrites.
- **Broad `find … -name '*mockups*' -delete`:** Would destroy `web/public/mockups.css` / `mockups-main.js`.
- **Introducing Vitest/Playwright solely for this phase:** Violates TESTING.md.

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Keep-set membership | Manual eyeball of `web/public` | Parse `02-INVENTORY.json` `class=keep` | Exact 82 SoT from Phase 2 |
| Delete absence | Ad-hoc spot checks | Loop `05-DELETE-LIST.txt` | All 55 must stay gone |
| Ignore proof | Assume `.gitignore` text | `git check-ignore` + empty `git ls-files` | Proves index reality |
| Build proof | Dev-server smoke only | `cd web && npm run build` | Locked D-02; Next production pack |
| Nyquist gate | Chat-only verification | `lean-verify.mjs` | Reproducible for `/gsd-verify-work` |

**Key insight:** Phase 10’s job is **evidence packaging**, not more deletion. The dangerous failure mode is over-cleaning (`docs/`, ports named “mockups”, or pushing without user request).

## Common Pitfalls

### Pitfall 1: Treating “ahead of origin” as not push-ready
**What goes wrong:** Executor pushes or blocks the phase waiting for remote sync.
**Why it happens:** Colloquial “ready” often implies “already on remote.”
**How to avoid:** Encode D-01.5 explicitly in checklist + SUMMARY: ahead is OK; no push.
**Warning signs:** Plan steps containing `git push`; verify failing on `ahead > 0`.

### Pitfall 2: Counting soft “~82” without exact equality
**What goes wrong:** Drift (extra file or missing keep) slips through.
**Why it happens:** CONTEXT says “~82”; live tree is exact.
**How to avoid:** Script asserts inventory keep count, each path exists, and `web/public` file count equals keep count (excluding `.DS_Store`).
**Warning signs:** `extras_vs_keep > 0` or `missing > 0`.

### Pitfall 3: Deleting `docs/` or `wireframes/` for “lean”
**What goes wrong:** Violates D-03 and project constraints; loses design/process history.
**Why it happens:** Misreading “lean production tree” as “app-only repo.”
**How to avoid:** Hard-stop in plan; script must allow those dirs; checklist notes they remain.
**Warning signs:** Staged deletions under `docs/` or `wireframes/`.

### Pitfall 4: Name-collision cleanup of production ports
**What goes wrong:** Removes `web/public/mockups.css` or `mockups-main.js`.
**Why it happens:** Substring “mockups” after Phase 9.
**How to avoid:** KEEP asserts identical to Phase 9; never delete under `web/` in this phase.
**Warning signs:** Staged changes under `web/public` or `web/src` (except unrelated accidental edits — reject them).

### Pitfall 5: Script path / REPO_ROOT wrong
**What goes wrong:** False fails or escapes repo.
**Why it happens:** Depth differs if placed at repo-root `scripts/` vs phase `scripts/`.
**How to avoid:** Prefer `.planning/phases/10-lean-production-check/scripts/lean-verify.mjs` with `resolve(__dirname, "../../../..")` like Phases 6–9; reject `..` in controlled paths.
**Warning signs:** Script resolves wrong cwd; `mockups` check hits unrelated path.

### Pitfall 6: Re-pruning public assets
**What goes wrong:** Deletes keep media still referenced by homepage.
**Why it happens:** Confusing lean-check with another inventory pass.
**How to avoid:** D-03 — Phase 5 list is closed; no new deletes.
**Warning signs:** Plan tasks that `rm` under `web/public/assets`.

## Code Examples

### Keep-set + delete-list live proof (research session)

```bash
# Source: verified 2026-09-05 on this machine [VERIFIED: shell]
cd "/Users/usama/Desktop/Dominion Markets/Vanilla to nextjs"
test ! -e mockups
test ! -e Hero-background.png
# delete-list: 55 lines, 0 present
# inventory keep: 82, missing: 0; public files: 82; extras: 0
```

### Ignore proof

```bash
# Source: web/.gitignore + git [VERIFIED: shell]
(cd web && git check-ignore -v node_modules .next .env .env.local)
# expect matches from web/.gitignore lines for /node_modules, /.next/, .env*
git ls-files 'web/node_modules' 'web/.next' 'web/.env*'   # expect empty
```

### Build proof

```bash
# Source: web/package.json + Next.js docs [CITED: Context7 /vercel/next.js]
cd web && npm run build
# expect exit 0
```

### `lean-verify.mjs` design contract (D-02)

```javascript
// Path: .planning/phases/10-lean-production-check/scripts/lean-verify.mjs
// Usage (repo root):
//   node .planning/phases/10-lean-production-check/scripts/lean-verify.mjs
// Optional: --skip-build for quick FS/git-only; full gate includes build.
//
// MUST exit 0 only when ALL hold:
// 1. !exists(mockups/) && git ls-files mockups empty
// 2. !exists(Hero-background.png) at repo root
// 3. every path in 05-DELETE-LIST.txt absent
// 4. every 02-INVENTORY.json class=keep path exists; keep count === 82 (or === inventory summary)
// 5. web/public file count === keep count (ignore .DS_Store)
// 6. exists web/src, web/package.json, web/next.config.*|js|mjs|ts, web/public/mockups.css,
//    web/src/lib/mockups-main.js, web/public/assets/hero/Hero-background.png
// 7. git ls-files empty for web/node_modules, web/.next; check-ignore covers node_modules/.next/.env*
// 8. docs/ and wireframes/ NOT required absent (explicit no-op / log ALLOW)
// 9. log branch ahead/behind; do not fail on ahead>0
// 10. unless --skip-build: spawn `npm run build` in web/ with exit 0
// Security: fixed paths under REPO_ROOT; reject '..' (T-10-01)
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| Ad-hoc “looks lean” judgment | Scripted absence + keep equality + ignore + build | Phase 10 | Reproducible PROD-03 |
| Push as readiness proof | Local push-ready attestation; push deferred | 10-CONTEXT D-01/D-03 | Ahead-of-origin OK |
| In-repo `mockups/` design tree | Absent; archive + sibling only | Phase 9 | Orphan absence is a Phase 10 assert |
| Soft keep “~82” | Exact inventory keep set on disk | Phase 5–6 verified | Script can assert exact |

**Deprecated/outdated:**
- Treating presence of `docs/`/`wireframes/` as production fat to remove in this milestone.
- Using Phase 9 `remove-verify.mjs` alone as PROD-03 (missing keep-set / ignore / lean checklist).

## Assumptions Log

| # | Claim | Section | Risk if Wrong |
|---|-------|---------|---------------|
| A1 | Place script at `.planning/phases/10-lean-production-check/scripts/lean-verify.mjs` as CONTEXT “or equiv” | Standard Stack | Low — root `scripts/` also fine if planner prefers literal path |
| A2 | Exact keep count 82 (not soft ≈) is the gate | Pitfalls / script | Low — matches live SoT; if inventory regenerated later, read count from JSON not hardcode only |
| A3 | Optional `rm` of untracked root/docs `.DS_Store` is worth doing | Discretion | Low — hygiene only; do not touch tracked `.planning` `.DS_Store` unless easy |
| A4 | `lean-verify` may shell out to `npm run build` (vs plan-only build step) | D-02 | Low — either OK if full suite always runs both |

**If this table is empty:** N/A — A1–A4 are YOLO discretion, non-blocking.

## Open Questions

1. **Should `lean-verify.mjs` invoke build internally or only FS/git asserts?**
   - What we know: D-02 requires script exit 0 covering D-01 asserts **+** build exit 0.
   - What's unclear: One process vs two commands in the plan.
   - Recommendation: Script supports full gate (build by default) and `--skip-build` for fast iteration; plan’s full suite always includes build.

2. **PROJECT.md milestone wrap depth**
   - What we know: Discretion allows SUMMARY + optional Current State note.
   - Recommendation: One short Current State line that PROD-03 lean check is done / push awaits user — do not mark remote-deployed.

## Environment Availability

| Dependency | Required By | Available | Version | Fallback |
|------------|------------|-----------|---------|----------|
| Node.js | `lean-verify.mjs` | ✓ | v24.13.1 | — |
| Git | ignore/status asserts | ✓ | 2.50.1 | — |
| npm + `web/node_modules` | `npm run build` | ✓ | npm 11.12.1 | `npm ci` in `web/` |
| `02-INVENTORY.json` | keep set | ✓ | keep=82 | **Blocking** if missing |
| `05-DELETE-LIST.txt` | orphan absence | ✓ | 55 paths | **Blocking** if missing |
| `rg` | optional human gates | ✓ | 15.1.0 | embed checks in script |
| Network for push | — | N/A | — | **Do not push** (D-03) |

**Missing dependencies with no fallback:**
- None at research time.

**Missing dependencies with fallback:**
- `rg` → Node string/fs checks inside `lean-verify.mjs`.

Step 2.6: External deps identified and probed above.

## Validation Architecture

> `workflow.nyquist_validation` is `true` in `.planning/config.json`.

### Test Framework

| Property | Value |
|----------|-------|
| Framework | none — Node `lean-verify.mjs` + Next `npm run build` |
| Config file | none — Wave 0 adds script |
| Quick run command | `node .planning/phases/10-lean-production-check/scripts/lean-verify.mjs --skip-build` |
| Full suite command | `lean-verify.mjs` (with build) **or** script `--skip-build` + `cd web && npm run build` |

### Phase Requirements → Test Map

| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| PROD-03 | Orphans absent (`mockups/`, root hero, delete-list) | smoke | `lean-verify.mjs --skip-build` | ❌ Wave 0 |
| PROD-03 | Keep set ~82 present + ports + deployable `web/` | smoke | `lean-verify.mjs --skip-build` | ❌ Wave 0 |
| PROD-03 | Ignores exclude node_modules/.next/.env* | smoke | `lean-verify.mjs --skip-build` | ❌ Wave 0 |
| PROD-03 | Build green | build | `cd web && npm run build` (or script full) | ✅ `web/package.json` |
| PROD-03 | Checklist artifact | docs | `test -f 10-LEAN-CHECK.md` | ❌ execute |
| PROD-03 | No push / docs+wireframes preserved | manual + attestation | SUMMARY + `test -d docs wireframes` | manual |

### Sampling Rate
- **Per task commit:** Task 1: `node --check` script; Task 2: skip-build verify + checklist exists; Task 3: full suite
- **Per wave merge:** Full suite
- **Phase gate:** Full suite green + `10-LEAN-CHECK.md` before `/gsd-verify-work`

### Wave 0 Gaps
- [ ] `.planning/phases/10-lean-production-check/scripts/lean-verify.mjs` — covers D-01 asserts (+ build)
- [ ] Framework install: **none** — do not add Vitest/Playwright
- [ ] `10-LEAN-CHECK.md` — created during execute (not research)

## Security Domain

### Applicable ASVS Categories

| ASVS Category | Applies | Standard Control |
|---------------|---------|-----------------|
| V2 Authentication | no | — |
| V3 Session Management | no | — |
| V4 Access Control | no | — |
| V5 Input Validation | yes (script) | Fixed REPO_ROOT; reject `..` in paths (T-10-01) |
| V6 Cryptography | no | — |

### Known Threat Patterns for lean production check

| Pattern | STRIDE | Standard Mitigation |
|---------|--------|---------------------|
| Path traversal in verify script | Tampering | Reject `..`; resolve under REPO_ROOT |
| Accidental commit of `.env*` / secrets | Information Disclosure | Assert ignore + empty `git ls-files` for env patterns |
| Accidental delete of production ports / docs | Denial / Tampering | D-03 hard stops; KEEP asserts; no delete tasks |
| Unauthorized `git push` | Elevation / process | D-03; no push in plan; SUMMARY attestation |

## Planner must_haves

Phase gate truths the planner must encode into `10-01-PLAN.md` `<must_haves>` / success criteria:

1. **`10-LEAN-CHECK.md` exists** and documents D-01 sections: Absent / Present / Ignores / Status (push-ready ≠ pushed) / Hard stops.
2. **Orphans absent:** no `mockups/`; no root `Hero-background.png`; all `05-DELETE-LIST.txt` paths absent (55).
3. **Keep set present:** inventory `class=keep` paths all exist (**82**); `web/public` file count matches keep set; `web/public/mockups.css` + `web/src/lib/mockups-main.js` + public hero PNG present; deployable `web/` (`src/`, package.json, Next config).
4. **Ignores:** `node_modules`, `.next`, `.env*` excluded (check-ignore + not tracked).
5. **`lean-verify.mjs` exit 0** covering those asserts; **`cd web && npm run build` exit 0** (D-02).
6. **Hard stops honored (D-03):** `docs/` and `wireframes/` still present (not deleted); no `git push`; no `mockups/` restore; no further public prune beyond Phase 5 list.
7. **Status:** branch may be ahead of origin — recorded as OK; not treated as failure.
8. **Wave 0:** script exists (`node --check` clean) before claiming full green.

## Recommended plan shape (`10-01` — 2–3 tasks)

| Task | Wave | Intent | Key verify |
|------|------|--------|------------|
| **10-01-01** | 0 | Author `scripts/lean-verify.mjs` (`node --check`); optional dry-run `--skip-build` against current tree | Script syntax + skip-build exit 0 |
| **10-01-02** | 1 | Write `10-LEAN-CHECK.md` from live asserts; optional `rm` untracked root/docs `.DS_Store`; do **not** delete docs/wireframes or prune public | Checklist file present; dirs `docs/` + `wireframes/` still exist |
| **10-01-03** | 1 | Full `lean-verify` (with build) + `10-01-SUMMARY.md` + optional PROJECT.md Current State wrap; attest no push | Full suite exit 0 |

**2-task collapse:** Merge 02+03 after Wave 0 script exists — still produce both `10-LEAN-CHECK.md` and SUMMARY; full suite before verify-work.

## Sources

### Primary (HIGH confidence)
- `10-CONTEXT.md` D-01…D-03 — locked decisions
- Live shell 2026-09-05: orphan absence, keep=82 exact, delete-list 0 present, ignore proofs, `main` ahead 79, docs/wireframes present
- `.planning/phases/02-asset-inventory/02-INVENTORY.json` — keep SoT
- `.planning/phases/05-prune-public-assets/05-DELETE-LIST.txt` — absence SoT
- `web/.gitignore` — node_modules / .next / .env*
- `.planning/REQUIREMENTS.md` PROD-03; `.planning/ROADMAP.md` Phase 10 SC
- Phase 9 `remove-verify.mjs` — Nyquist script pattern `[VERIFIED: file]`
- Context7 `/vercel/next.js` — production `next build` / npm script
- `.planning/codebase/TESTING.md` — no unit/e2e harness

### Secondary (MEDIUM confidence)
- Phases 6–9 RESEARCH/VALIDATION — checklist + phase-script conventions
- Discretion recommendations for `.DS_Store` hygiene and PROJECT.md wrap `[ASSUMED: YOLO]`

### Tertiary (LOW confidence)
- None material

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH — toolchain + SoT artifacts verified live
- Architecture: HIGH — verify/checklist/build gate maps cleanly to D-01…D-03
- Pitfalls: HIGH — push semantics + docs/wireframes + name collision confirmed against prior phases

**Research date:** 2026-09-05
**Valid until:** 2026-10-05 (re-verify keep/delete counts if public tree changes)
