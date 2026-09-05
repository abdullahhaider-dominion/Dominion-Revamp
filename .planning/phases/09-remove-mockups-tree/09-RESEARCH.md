# Phase 9: Remove Mockups Tree - Research

**Researched:** 2026-09-05
**Domain:** Git tree deletion + docs tense cleanup + build/archive proof (MOCK-03)
**Confidence:** HIGH

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions
- **D-01:** Before any delete, assert all of:
  1. `git rev-parse archive/mockups` succeeds
  2. Sibling path `/Users/usama/Desktop/Dominion Markets/Dominion-Markets-mockups-archive` exists and HEAD matches archive tip (or tip recorded in `07-ARCHIVE.md`)
  3. `07-ARCHIVE.md` exists and Phase 8 targets still cite it (`readme.md`, `web/README.md`, skill, CLAUDE.md, PROJECT.md)
- **D-02:** Remove the entire tracked `mockups/` tree from `main` with `git rm -r mockups` (one coherent commit). Clean any leftover untracked `.DS_Store` under `mockups/` with `rm` if needed so the directory is gone from the working tree.
- **D-03:** Update Phase 8 “temporary until Phase 9” wording in the retargeted files so they no longer imply `mockups/` is still present — point only at archive + `web/`. Do **not** reintroduce in-repo `mockups/` as SoT.
- **D-04:** After delete: `test ! -e mockups` (or equivalent), `git ls-files mockups` empty, archive branch + sibling still OK, `cd web && npm run build` exit 0.
- **D-05:** Never delete/modify `archive/mockups` branch or the sibling archive repo. Never `git push`. Never edit `web/src` except if a true runtime `../mockups` dependency is found (unexpected — abort and report).

### Claude's Discretion
- Exact verify script name under phase `scripts/` (recommended: `remove-verify.mjs`).
- Whether SUMMARY lists byte savings estimate from `du` (nice-to-have).

### Deferred Ideas (OUT OF SCOPE)
- Lean production / push readiness — Phase 10
- Push archive branch to GitHub — only if user asks
</user_constraints>

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| MOCK-03 | Remove `mockups/` from this production repo only after archive + doc updates | D-01 preflight (archive + sibling + ARCHIVE citations); D-02 `git rm -r mockups`; D-03 tense cleanup on Phase 8 targets; D-04 FS/git/build proof; D-05 hard stops; KEEP `web/public/mockups.css` + `web/src/lib/mockups-main.js` |
</phase_requirements>

## Summary

Phase 9 is a **hard-gated delete** of the in-repo `mockups/` design tree (~64MB, 139 tracked files) from production `main`, after Phase 7 archive and Phase 8 doc retarget. Live checks confirm archive tip `3e9401bd85c6848cbbf073d526e5d48ad2450834`, sibling HEAD matches, Phase 7 `archive-verify.mjs` still exits 0, and `web/src` has **no** runtime `../mockups` imports — only historical comment provenance and production ports under `web/`.

Critical distinction: **`web/public/mockups.css`** (served at `/mockups.css` via `layout.tsx`) and **`web/src/lib/mockups-main.js`** are production ports — names contain “mockups” but are **not** the `mockups/` tree. Deleting or “cleaning” them breaks the live site.

**Primary recommendation:** One plan (`09-01-PLAN.md`) with **3 tasks** — (1) Wave 0 `remove-verify.mjs` + D-01 preflight gate, (2) `git rm -r mockups` + `.DS_Store` cleanup + D-03 tense edits + one coherent commit, (3) full `remove-verify` + `npm run build` + SUMMARY. Never push; never touch archive branch/sibling; never edit `web/src`.

## Architectural Responsibility Map

| Capability | Primary Tier | Secondary Tier | Rationale |
|------------|-------------|----------------|-----------|
| Preflight archive integrity | Database / Storage (git refs + sibling FS) | — | Must prove SoT reachable before delete |
| Delete tracked `mockups/` from `main` | Database / Storage (git index + working tree) | — | `git rm -r` removes from production path |
| Doc tense cleanup (no “until Phase 9”) | — (process / docs) | — | Operational SoT files only; not historical plans |
| Production CSS/JS ports | Frontend Server / CDN Static (`web/public`, `web/src/lib`) | Browser | **Keep** — not part of delete target |
| Build proof | Frontend Server (`web/` Next build) | — | Proves no runtime dependency on `../mockups` |
| Archive branch + sibling preservation | Database / Storage | — | D-05 hard stop — read-only this phase |

## Project Constraints (from .cursor/rules/)

No `.cursor/rules/` directory present. Actionable constraints from project skill + prior phases:

| Source | Directive for Phase 9 |
|--------|------------------------|
| `.cursor/skills/dominion-section-redesign/SKILL.md` | Already cites `07-ARCHIVE.md`; remove “until Phase 9” temporary language (D-03) |
| User git rules | No `git push` unless asked; no force-push; no destructive resets on archive |
| `.planning/PROJECT.md` | Remove in-repo `mockups/` now that archive + docs retarget done |
| Prior Nyquist pattern | Phase Node verify script — **do not** add Vitest/Playwright |

## Standard Stack

### Core

| Tool | Version | Purpose | Why Standard |
|------|---------|---------|--------------|
| Git | 2.50.1 (Apple Git-155) `[VERIFIED: shell]` | `git rm -r mockups`, rev-parse, ls-files | Locked delete mechanism (D-02) |
| Node.js | v24.13.1 `[VERIFIED: shell]` | `remove-verify.mjs` Nyquist gate | Same pattern as Phase 7 `archive-verify.mjs` |
| npm | 11.12.1 `[VERIFIED: shell]` | `cd web && npm run build` | D-04 build proof |
| Next.js | 16.3.4 in `web/package.json`; registry also 16.3.4 `[VERIFIED: npm view + package.json]` | Production build | App under `web/` |

### Supporting

| Tool / Artifact | Version / Path | Purpose | When to Use |
|-----------------|----------------|---------|-------------|
| `rg` (ripgrep) | 15.1.0 `[VERIFIED: shell]` | Tense deny-list + ARCHIVE allow-list | Doc gates + optional script checks |
| Phase 7 `archive-verify.mjs` | `.planning/phases/07-archive-mockups/scripts/` | **Preflight only** (expects 139 on main) | Run **before** delete; do **not** use as post-delete gate |
| `07-ARCHIVE.md` | tip `3e9401bd…` + sibling path `[VERIFIED: file + git]` | Canonical archive coordinates | D-01 / D-04 |
| Sibling repo | `/Users/usama/Desktop/Dominion Markets/Dominion-Markets-mockups-archive` | Human browse SoT | HEAD must match tip; never modify |

### Alternatives Considered

| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| `git rm -r mockups` (D-02 locked) | `rm -rf mockups` then `git add -u` | Riskier; can miss index state; **do not** — locked to `git rm` |
| New `remove-verify.mjs` | Reuse `archive-verify.mjs` post-delete | Phase 7 script **asserts main still has 139 files** — will fail after delete by design; new script required `[VERIFIED: archive-verify.mjs lines 137–152]` |
| Inline shell-only gates | Script (discretion: `remove-verify.mjs`) | Script preferred for Nyquist reuse + hard-stop path checks like Phase 7 |
| `du` byte savings in SUMMARY | Skip | Discretion: **include** one-line `du -sh` before delete (~64M) as nice-to-have `[ASSUMED: YOLO include]` |

**Installation:** none — no new npm packages.

**Version verification:** Git/Node/npm/Next/rg verified this session. Re-check archive tip at execute (CONTEXT: re-check tip).

## Architecture Patterns

### System Architecture Diagram

```text
[D-01 PREFLIGHT — hard gate]
  git rev-parse archive/mockups ──► tip SHA
  sibling HEAD == tip (or 07-ARCHIVE tip)
  07-ARCHIVE.md exists
  Phase 8 targets cite 07-ARCHIVE.md
  (optional) archive-verify.mjs exit 0
  abort if web/src has runtime ../mockups import
        │
        ▼
[D-02 DELETE]
  git rm -r mockups
  rm leftover mockups/.DS_Store (untracked)
  test ! -e mockups
        │
        ▼
[D-03 TENSE CLEANUP — same or adjacent commit wave]
  readme.md, web/README.md, PROJECT.md, skill, CLAUDE.md
  remove “until Phase 9 / may still exist” presence language
  keep ARCHIVE + web/ pointers; never reintroduce in-repo SoT
        │
        ▼
[D-04 PROOF]
  git ls-files mockups → empty
  archive tip + sibling unchanged (D-05)
  web/public/mockups.css EXISTS (KEEP)
  web/src/lib/mockups-main.js EXISTS (KEEP)
  remove-verify.mjs exit 0
  cd web && npm run build → 0
```

### Recommended Project Structure

```text
.planning/phases/09-remove-mockups-tree/
├── 09-CONTEXT.md
├── 09-RESEARCH.md          # this file
├── 09-VALIDATION.md
├── 09-01-PLAN.md           # planner
├── scripts/
│   └── remove-verify.mjs   # Wave 0 — post-delete Nyquist gate
└── 09-01-SUMMARY.md        # execute Task 3
```

### Pattern 1: Preflight before destructive git
**What:** Assert archive + sibling + docs before `git rm`.
**When to use:** Always for MOCK-03 (D-01 hard gate).
**Example:**
```bash
# Source: D-01 / 07-ARCHIVE.md coordinates [VERIFIED: shell this session]
git rev-parse archive/mockups
# expect: 3e9401bd85c6848cbbf073d526e5d48ad2450834 (re-check at execute)
test -d "/Users/usama/Desktop/Dominion Markets/Dominion-Markets-mockups-archive"
(cd "/Users/usama/Desktop/Dominion Markets/Dominion-Markets-mockups-archive" && git rev-parse HEAD)
# must equal archive tip
test -f .planning/phases/07-archive-mockups/07-ARCHIVE.md
for f in readme.md web/README.md .planning/PROJECT.md \
  .cursor/skills/dominion-section-redesign/SKILL.md CLAUDE.md; do
  rg -q '07-ARCHIVE\.md' "$f" || exit 1
done
```

### Pattern 2: Coherent `git rm` + untracked cleanup
**What:** Remove tracked tree with git; then clear leftover untracked `.DS_Store` so `mockups/` is gone from disk.
**When to use:** D-02.
**Example:**
```bash
# Source: CONTEXT D-02 [CITED: 09-CONTEXT.md]
du -sh mockups   # optional SUMMARY note (~64M verified)
git rm -r mockups
rm -f mockups/.DS_Store mockups/assets/.DS_Store 2>/dev/null || true
# if empty dirs remain:
rm -rf mockups
test ! -e mockups
```

### Pattern 3: Name collision awareness (KEEP production ports)
**What:** Paths containing the substring `mockups` under `web/` are **not** delete targets.
**When to use:** Every delete/verify step.
**Example:**
```text
DELETE:  mockups/**                          (repo-root tree)
KEEP:    web/public/mockups.css              → <link href="/mockups.css">
KEEP:    web/src/lib/mockups-main.js         → dynamic import in DominionHome
GONE OK: web/src/styles/mockups.css          (already deleted ASSET-03)
```

### Anti-Patterns to Avoid
- **`rm -rf mockups` without `git rm`:** Leaves index dirty / incomplete; violates D-02.
- **Broad `find . -name '*mockups*' -delete`:** Will destroy `web/public/mockups.css` and `mockups-main.js`.
- **Running post-delete `archive-verify.mjs` as success gate:** That script requires 139 files on main — expected FAIL after delete.
- **Editing sibling or `git branch -D archive/mockups`:** Violates D-05.
- **`git push`:** Violates D-05 / deferred Phase 10 / user rules.
- **Rewriting historical `docs/superpowers/**` or Phase 7/8 planning narratives:** Out of scope; D-03 targets operational Phase 8 retarget files only.

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Tracked tree removal | Manual file-by-file unlink | `git rm -r mockups` | Atomic index + one commit (D-02) |
| Post-delete integrity | Ad-hoc shell memory | `remove-verify.mjs` | Same Nyquist pattern as Phase 7; fixed sibling path; rejects `..` |
| Prove no app dependency | Manual browser click-through only | `cd web && npm run build` | Compile/link failure surfaces missing assets; D-04 locked |
| Archive reachability | Re-split subtree | `git rev-parse` + sibling HEAD vs tip | Already archived Phase 7 |

**Key insight:** The danger is not “how to delete a folder” — it is **false positives on the name `mockups`** and **destroying the archive SoT while cleaning production**.

## Common Pitfalls

### Pitfall 1: Accidentally deleting `web/public/mockups.css`
**What goes wrong:** Homepage loses Floating Sanctuary CSS; layout still links `/mockups.css`.
**Why it happens:** Grep/scripts treat any path containing `mockups` as the legacy tree.
**How to avoid:** Verify script **must assert** `web/public/mockups.css` and `web/src/lib/mockups-main.js` exist after delete. Never `git rm` paths under `web/`.
**Warning signs:** Build OK but styles broken; or staged `web/public/mockups.css` deletion.

### Pitfall 2: Mutating `archive/mockups` or sibling
**What goes wrong:** MOCK-01 SoT damaged; Phase 8 ARCHIVE links become wrong; restore path lost.
**Why it happens:** “Cleanup” impulse; wrong `cwd` when running git; `git filter` experiments.
**How to avoid:** D-05 — only `rev-parse` / read sibling. Never `checkout archive/mockups` to delete files. Never `rm -rf` sibling.
**Warning signs:** Tip SHA changes; sibling HEAD diverges from `07-ARCHIVE.md`.

### Pitfall 3: Leaving empty `mockups/` via untracked `.DS_Store`
**What goes wrong:** `git ls-files mockups` empty but `test -e mockups` still true — fails D-04 / ROADMAP SC1.
**Why it happens:** Untracked `mockups/.DS_Store` and `mockups/assets/.DS_Store` exist now `[VERIFIED: git status]`.
**How to avoid:** After `git rm -r`, `rm` those files / `rm -rf mockups` if directory remains.
**Warning signs:** Finder still shows `mockups/`; verify `test ! -e mockups` fails.

### Pitfall 4: Treating Phase 7 `archive-verify.mjs` as post-delete gate
**What goes wrong:** False failure / executor “fixes” by restoring `mockups/` on main.
**Why it happens:** Script asserts production still has 139 tracked mockups paths.
**How to avoid:** Use `archive-verify` **only in preflight**; post-delete use `remove-verify.mjs`.
**Warning signs:** Confusion in SUMMARY about “verify failed.”

### Pitfall 5: Doc tense still implies tree present
**What goes wrong:** Agents keep looking for in-repo `mockups/` after delete.
**Why it happens:** Phase 8 intentionally allowed “temporary until Phase 9” language.
**How to avoid:** D-03 deny-list on the five operational targets; replace with ARCHIVE + `web/` only.
**Warning signs:** `rg 'until Phase 9'` still hits skill/READMEs/PROJECT/CLAUDE.

### Pitfall 6: Unexpected runtime `../mockups` dependency
**What goes wrong:** Build or runtime breaks after delete.
**Why it happens:** Hypothetical import from outside `web/` (not found at research time).
**How to avoid:** Preflight `rg` for `../mockups` under `web/src`; if found → **abort and report** (D-05), do not invent ports.
**Warning signs:** Preflight finds non-comment imports; build fails resolving files outside `web/`.

## Code Examples

### Doc tense — before → after (recommended)

```markdown
<!-- BEFORE (Phase 8 temporary — remove) -->
In-repo `mockups/` may still exist temporarily until Phase 9 — it is **not** the required design SoT.

<!-- AFTER (D-03) -->
Hi-fi design archive: see `.planning/phases/07-archive-mockups/07-ARCHIVE.md`
(`archive/mockups` / sibling repo). Production site: `web/`.
```

### `remove-verify.mjs` asserts (design contract)

```javascript
// Source: Phase 7 archive-verify.mjs pattern + D-04/D-05
// Path: .planning/phases/09-remove-mockups-tree/scripts/remove-verify.mjs
// REPO_ROOT = resolve(__dirname, "../../../..")
// Fixed SIBLING_PATH constant — reject argv/paths with '..'

// PASS when:
// 1. refs/heads/archive/mockups resolves; tip matches 07-ARCHIVE.md SHA (or equals recorded tip)
// 2. sibling exists, is git repo, HEAD === tip
// 3. test ! fs.existsSync(path.join(REPO_ROOT, "mockups"))
// 4. git ls-files mockups → empty
// 5. fs.existsSync("web/public/mockups.css") && fs.existsSync("web/src/lib/mockups-main.js")
// 6. 07-ARCHIVE.md still contains tip + sibling path
// 7. Phase 8 targets each contain "07-ARCHIVE.md"
// 8. Deny-list: no "until Phase 9" / "may still exist temporarily" / "may remain until Phase 9"
//    in: readme.md, web/README.md, PROJECT.md, skill, CLAUDE.md
// 9. current branch !== archive/mockups
// FAIL LOUD on any missing KEEP path or non-empty git ls-files mockups
```

### Build proof

```bash
# Source: web/package.json scripts + Next.js build [CITED: next.js docs / package.json]
cd web && npm run build
# expect exit 0
```

### Preflight: no runtime dependency on tree

```bash
# Comment provenance OK; abort on real imports of ../mockups
rg -n '\.\./mockups' web/src --glob '!**/node_modules/**'
# Current state: only comments in mockups-main.js / home-html.ts headers [VERIFIED: rg]
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| In-repo `mockups/` as working design SoT | Archive branch + sibling + `web/` production | Phases 7–8 (2026-09-05) | Phase 9 may delete tree |
| Phase 8 “temporary until Phase 9” wording | Present-tense ARCHIVE + `web/` only | Phase 9 D-03 | Docs match disk reality |
| `archive-verify` retains 139 on main | `remove-verify` requires 0 on main | Phase 9 | Separate Nyquist script |

**Deprecated/outdated:**
- Any instruction to `npx serve mockups` from **this** production working tree as primary design entry (use sibling / archive checkout).
- Treating Phase 7 verify script as the Phase 9 success gate.

## Assumptions Log

| # | Claim | Section | Risk if Wrong |
|---|-------|---------|---------------|
| A1 | Include `du -sh mockups` byte savings (~64M) in SUMMARY | Discretion | Low — cosmetic only |
| A2 | Three-task `09-01` plan is optimal vs 2-task collapse | Plan shape | Low — planner may merge Task 2+3 |
| A3 | No CI job outside this machine depends on in-repo `mockups/` path | Pitfalls | Medium if remote CI clones expect tree — Phase 10 lean check can confirm |

**If empty of blocking assumptions:** A1–A2 are YOLO discretion; A3 is out of local verify scope.

## Open Questions

1. **Should PROJECT.md milestone checkbox / “still present until Phase 9” tracker lines update in the same commit?**
   - What we know: D-03 names retargeted SoT wording; PROJECT.md Context line is explicitly in Phase 8 target set.
   - What's unclear: Whether REQUIREMENTS.md MOCK-03 checkbox flips in execute vs verify-work.
   - Recommendation: Update PROJECT.md Context + completed-item tense in Task 2; flip REQUIREMENTS/ROADMAP checkboxes in SUMMARY/verify-work per milestone norms (planner: include PROJECT in tense cleanup; trackers OK in Task 3).

2. **Exact deny-list phrases**
   - Recommendation: Deny `until Phase 9`, `temporary until Phase 9`, `may still exist temporarily`, `may remain until Phase 9`, `may exist until Phase 9` in the five operational files. Allow historical `.planning/phases/0[7-8]-*/**` mentions.

## Environment Availability

| Dependency | Required By | Available | Version | Fallback |
|------------|------------|-----------|---------|----------|
| Git | `git rm`, rev-parse | ✓ | 2.50.1 | — |
| Node.js | `remove-verify.mjs` | ✓ | v24.13.1 | — |
| npm + `web/node_modules` | `npm run build` | ✓ | npm 11.12.1; next installed | `npm ci` in `web/` if build fails missing deps |
| `rg` | Doc gates | ✓ | 15.1.0 | node `fs.readFileSync` checks inside script |
| Branch `archive/mockups` | D-01 | ✓ | tip `3e9401bd…` | **Blocking** if missing — abort |
| Sibling archive repo | D-01 | ✓ | HEAD = tip | **Blocking** if missing — abort |
| Disk free | Delete is free space | ✓ | ~47 GiB free | — |

**Missing dependencies with no fallback:**
- None at research time — archive + sibling + Next install present.

**Missing dependencies with fallback:**
- `rg` absent → embed string checks in `remove-verify.mjs` (prefer keep `rg` for human quick gates).

## Validation Architecture

> `workflow.nyquist_validation` is `true` in `.planning/config.json`.

### Test Framework

| Property | Value |
|----------|-------|
| Framework | none — Node `remove-verify.mjs` + `npm run build` |
| Config file | none — Wave 0 adds script |
| Quick run command | `node .planning/phases/09-remove-mockups-tree/scripts/remove-verify.mjs` |
| Full suite command | same + `cd web && npm run build` |

### Phase Requirements → Test Map

| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| MOCK-03 | Preflight archive/sibling/ARCHIVE citations | smoke | preflight shell / partial script flags | ❌ Wave 0 script |
| MOCK-03 | `mockups/` absent; `git ls-files` empty | smoke | `remove-verify.mjs` | ❌ Wave 0 |
| MOCK-03 | KEEP `web/public/mockups.css` + `mockups-main.js` | smoke | `remove-verify.mjs` | ❌ Wave 0 |
| MOCK-03 | Doc tense cleaned; ARCHIVE still cited | docs/grep | deny/allow in script | ❌ Wave 0 |
| MOCK-03 | `web/` builds without `../mockups` | build | `cd web && npm run build` | ✅ `web/package.json` |

### Sampling Rate
- **Per task commit:** Task 1: `node --check` script; Task 2: `test ! -e mockups` + `git ls-files mockups` empty; Task 3: full remove-verify + build
- **Per wave merge:** Full suite
- **Phase gate:** Full suite green before `/gsd-verify-work`

### Wave 0 Gaps
- [ ] `.planning/phases/09-remove-mockups-tree/scripts/remove-verify.mjs` — covers MOCK-03 post-delete asserts
- [ ] Framework install: **none** — do not add Vitest/Playwright

## Security Domain

### Applicable ASVS Categories

| ASVS Category | Applies | Standard Control |
|---------------|---------|-----------------|
| V2 Authentication | no | — |
| V3 Session Management | no | — |
| V4 Access Control | no | — |
| V5 Input Validation | yes (script) | Fixed sibling path; reject `..` in argv/cwd like Phase 7 T-07-01 |
| V6 Cryptography | no | — |

### Known Threat Patterns for this phase

| Pattern | STRIDE | Standard Mitigation |
|---------|--------|---------------------|
| Path traversal via script args into sibling/delete | Tampering | Fixed constants; reject `..` |
| Accidental delete of production CSS/JS ports | Denial / Tampering | KEEP asserts in verify; never `git rm` under `web/` |
| Destroying archive branch/sibling | Denial | D-05 hard stop; verify tip unchanged |
| Accidental `git push` of slimmed tree before lean check | Information / process | D-05; SUMMARY attestation; no push commands in plan |

## Planner must_haves

Phase gate truths the planner must encode into `09-01-PLAN.md` `<must_haves>` / success criteria:

1. **Preflight (D-01) before any delete:** `archive/mockups` resolves; sibling exists and HEAD == tip (or `07-ARCHIVE.md` tip); `07-ARCHIVE.md` exists; `readme.md`, `web/README.md`, skill, `CLAUDE.md`, `PROJECT.md` cite `07-ARCHIVE.md`.
2. **Delete (D-02):** `git rm -r mockups` in one coherent commit; working tree has **no** `mockups/` directory (`test ! -e mockups`); `git ls-files mockups` empty; leftover `.DS_Store` cleaned.
3. **KEEP (name collision):** `web/public/mockups.css` and `web/src/lib/mockups-main.js` still present and tracked; no `web/src` edits unless abort-on-dependency.
4. **Tense (D-03):** Operational targets no longer say in-repo `mockups/` “may exist / temporary until Phase 9”; still point at ARCHIVE + `web/`; do not reintroduce in-repo SoT.
5. **Archive untouched (D-05):** `archive/mockups` tip unchanged; sibling HEAD unchanged; no edits inside sibling; no `git push`.
6. **Proof (D-04):** `remove-verify.mjs` exit 0; `cd web && npm run build` exit 0.
7. **Wave 0:** `scripts/remove-verify.mjs` exists before claiming post-delete green.

## Recommended plan shape (`09-01` — 3 tasks)

| Task | Wave | Intent | Key verify |
|------|------|--------|------------|
| **09-01-01** | 0 | Author `scripts/remove-verify.mjs` (`node --check`); run D-01 preflight (+ optional `archive-verify.mjs`); abort if runtime `../mockups` under `web/src` | Script syntax + preflight exit 0 |
| **09-01-02** | 1 | `du` note → `git rm -r mockups` → clean `.DS_Store` → D-03 tense edits on five targets (+ PROJECT tracker tense) → **one coherent commit** (or delete commit + docs commit if planner splits — prefer one) | `test ! -e mockups`; `git ls-files mockups` empty; KEEP paths exist |
| **09-01-03** | 1 | Full `remove-verify.mjs`; `cd web && npm run build`; write `09-01-SUMMARY.md` (optional byte savings); attest no push / no archive mutation | Full suite exit 0 |

**2-task collapse (if planner prefers):** Merge 02+03 only after Wave 0 script exists — still keep preflight as Task 1 hard gate.

## Sources

### Primary (HIGH confidence)
- `09-CONTEXT.md` D-01…D-05 — locked decisions
- Live shell: `git rev-parse`, sibling HEAD, `git ls-files`, `du`, `archive-verify.mjs` exit 0 (2026-09-05)
- `.planning/phases/07-archive-mockups/07-ARCHIVE.md` + `scripts/archive-verify.mjs`
- `web/src/app/layout.tsx` — `/mockups.css` link; `DominionHome.tsx` — `mockups-main.js` import
- `web/package.json` — `next` 16.3.4, `build` script
- `.planning/REQUIREMENTS.md` MOCK-03; `.planning/ROADMAP.md` Phase 9 SC

### Secondary (MEDIUM confidence)
- Phase 8 RESEARCH/VALIDATION — temporary wording inventory and target file set
- Context7 `/vercel/next.js` — production build via `next build` / npm script (standard)

### Tertiary (LOW confidence)
- A3 remote CI dependency on in-repo `mockups/` — not probed this session

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH — verified local toolchain + locked git delete
- Architecture: HIGH — clear preflight → delete → tense → proof; KEEP vs DELETE mapped
- Pitfalls: HIGH — name collision + archive hard stops confirmed against live tree

**Research date:** 2026-09-05
**Valid until:** 2026-10-05 (stable git ops; re-verify tip SHA at execute)
