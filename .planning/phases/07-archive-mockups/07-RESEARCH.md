# Phase 7: Archive Mockups - Research

**Researched:** 2026-09-05
**Domain:** Git history-preserving subdirectory archive (`mockups/` → long-lived branch + sibling local repo)
**Confidence:** HIGH

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions
- **D-01 (recommended):** Create a **dedicated long-lived git branch** `archive/mockups` in this repo using `git subtree split -P mockups` (or equivalent history-preserving split) so commit history for `mockups/` is intact on that branch.
- **D-02:** Also materialize a **sibling local git repo** at `/Users/usama/Desktop/Dominion Markets/Dominion-Markets-mockups-archive` by cloning/pushing the split branch into it — satisfies “separate git repo” without requiring a new GitHub remote or `git push` to `origin` (user has not approved remote push).
- **D-03:** Do **not** push `archive/mockups` to `origin` in this phase unless the user explicitly asks. Record exact local branch tip SHA + sibling repo path in `07-ARCHIVE.md`, plus one-liner commands to push later.
- **D-04:** Prefer the new `archive/mockups` SoT over reusing `origin/hifi-ui-mockup` (that branch still exists historically and may be noted as prior art, but MOCK-01 deliverable is the new archive branch + sibling repo + record file).

### Hard stops
- **Never delete** `mockups/` from `main` / working tree in Phase 7.
- Do not modify `web/` app code for archive.
- Do not retarget `.cursor/skills` / READMEs here (Phase 8).

### Claude's Discretion
- Exact split tool (`git subtree split` vs `git filter-repo`) if one fails on this tree.
- Whether sibling repo is bare or working-tree clone (working tree preferred for human browsing).
- README inside sibling archive briefly explaining provenance.

### Deferred Ideas (OUT OF SCOPE)
- Doc/skill retarget — Phase 8
- Remove `mockups/` from production repo — Phase 9
- Push archive branch to GitHub — only when user asks
- Lean production check — Phase 10
</user_constraints>

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| MOCK-01 | Archive `mockups/` to a separate git repo or long-lived branch (history preserved) | D-01 `git subtree split --prefix=mockups -b archive/mockups` (verified dry-run on this repo); D-02 sibling working-tree clone at locked path; D-03 record-only remote push commands; D-04 new SoT + prior-art note for `origin/hifi-ui-mockup`; never delete `mockups/` from main |
</phase_requirements>

## Summary

Phase 7 is a **git operations + documentation** phase. MOCK-01 requires full `mockups/` history preserved *outside* the production deploy path, recorded for Phase 8, without deleting `mockups/` from this repo yet.

Live research on this machine confirmed **`git subtree split --prefix=mockups` works end-to-end** (~92s over 132 commits). A dry-run (no `-b`) produced tip `3e9401bd85c6848cbbf073d526e5d48ad2450834` with **66 commits**, **139 files at repo root** (prefix stripped), and a **byte-identical path set** vs `git ls-files mockups` with `mockups/` stripped (`diff` empty). No Git LFS. Largest blob `hero.mp4` ≈ 16.5 MB (under GitHub’s 100 MB hard limit). `git-filter-repo` is **not installed** — keep as fallback only on a fresh clone if subtree ever fails. Branch `archive/mockups` does **not** exist yet; sibling path does **not** exist yet.

**Primary recommendation:** One plan (`07-01-PLAN`) — preflight → `git subtree split --prefix=mockups -b archive/mockups` → verify history/file set → materialize **working-tree** sibling via local `git clone --no-hardlinks --branch archive/mockups` → provenance README in sibling → write `07-ARCHIVE.md` → run phase verify script. **Never** `git push origin`, **never** delete `mockups/`, **never** touch `web/`.

## Architectural Responsibility Map

| Capability | Primary Tier | Secondary Tier | Rationale |
|------------|-------------|----------------|-----------|
| History-preserving split of `mockups/` | Database / Storage (git object DB + refs) | — | Subtree rewrite creates new commit graph; not app runtime |
| Long-lived branch `archive/mockups` | Database / Storage (local refs) | — | Local branch ref only until user authorizes remote push |
| Sibling local archive repo | Database / Storage (filesystem git repo) | — | Separate `.git` + working tree for browsing/restore |
| Archive provenance record (`07-ARCHIVE.md`) | — (process artifact) | — | SoT pointer for Phase 8 docs/skills |
| Production app / deploy path | Frontend Server (`web/`) | CDN / Static | Explicitly untouched this phase |
| Design SoT retarget | — (docs/skills) | — | Deferred Phase 8 |
| Removal of `mockups/` from main | Database / Storage | — | Deferred Phase 9 |

## Project Constraints (from .cursor/rules/)

No `.cursor/rules/*.mdc` directory present. Actionable constraints from project skill + milestone:

| Source | Directive for Phase 7 |
|--------|------------------------|
| `.cursor/skills/dominion-section-redesign/SKILL.md` | Still names in-repo `mockups/` as working hi-fi SoT — **do not retarget** here (Phase 8) |
| User git rules | No `git push` unless explicitly requested; no force-push; no destructive resets |
| `.planning/PROJECT.md` | Archive *before* remove; keep `mockups/` until after archive + doc updates |
| Prior phase testing pattern | Script/check based validation — **do not** introduce Vitest/Playwright for this phase |

## Standard Stack

### Core

| Library / Tool | Version | Purpose | Why Standard |
|----------------|---------|---------|--------------|
| Git | 2.50.1 (Apple Git-155) `[VERIFIED: local]` | Subtree split, branch, clone | Built-in; already used by project |
| `git subtree` | contrib script at `$(git --exec-path)/git-subtree` `[VERIFIED: local]` | Non-destructive subdirectory history extract | Leaves `main` intact; matches D-01; dry-run succeeded |
| Local filesystem | Parent dir has ~47 GiB free `[VERIFIED: df]` | Sibling repo (~64 MB tree + objects) | Enough space |

### Supporting

| Tool | Version | Purpose | When to Use |
|------|---------|---------|-------------|
| Node.js | v24.13.1 `[VERIFIED: local]` | Phase verify script (`archive-verify.mjs`) | Nyquist automated gate |
| `git-filter-repo` | **not installed** `[VERIFIED: command -v / pip3]` | Fallback history extract | Only if subtree fails; **must** run on a fresh clone, never on this working tree |
| Tag `mockup-v0.1` | `0bdf12c` `[VERIFIED: git]` | Prior-art note in `07-ARCHIVE.md` | Documentation only |
| `origin/hifi-ui-mockup` | `184968a` `[VERIFIED: git]` | Prior-art design branch (D-04) | Note only — not Phase 7 SoT |

### Alternatives Considered

| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| `git subtree split -b archive/mockups` | `git filter-repo --subdirectory-filter mockups` on a mirror clone | filter-repo is faster/cleaner for complex renames, but **rewrites** repo; not installed; path never renamed here — subtree is safer and locked by D-01 |
| Working-tree sibling clone | Bare repo only | Bare is smaller but harder to browse; CONTEXT prefers working tree `[ASSUMED]` human browse UX |
| Push to new GitHub remote now | Local sibling only (D-02/D-03) | Locked — no origin push this phase |
| Reuse `origin/hifi-ui-mockup` as SoT | New `archive/mockups` (D-04) | Locked — prior art note only |

**Installation:** None required for primary path. Fallback only:

```bash
brew install git-filter-repo
# or: pip3 install git-filter-repo
```

**Version verification:** Git/subtree/Node verified locally this session. Dry-run split tip SHA above is **informative** — executor must re-run with `-b` and record the **actual** tip (should match if tree unchanged; re-verify if `main` advances).

## Architecture Patterns

### System Architecture Diagram

```text
[main working tree]
   mockups/ (139 tracked files, KEEP)
        │
        │  git subtree split --prefix=mockups -b archive/mockups
        │  (non-destructive; ~90–120s)
        ▼
[refs/heads/archive/mockups]  ←── tip SHA recorded
   files at repo ROOT (README.md, assets/, …)
   ~66 commits (mockups-only history)
        │
        │  git clone --no-hardlinks --branch archive/mockups \
        │     "<this-repo>" \
        │     ".../Dominion-Markets-mockups-archive"
        ▼
[sibling local repo]  ←── browsing + independent .git
   + ARCHIVE README (provenance)
        │
        ▼
[07-ARCHIVE.md]  branch, SHA, paths, verify results, push-later cmds
        │
        ✗ NO git push origin (unless user explicitly asks)
```

### Recommended Project Structure (phase artifacts)

```
.planning/phases/07-archive-mockups/
├── 07-CONTEXT.md          # locked decisions (exists)
├── 07-RESEARCH.md         # this file
├── 07-VALIDATION.md       # nyquist contract
├── 07-01-PLAN.md          # planner output
├── 07-ARCHIVE.md          # executor deliverable — SoT record
└── scripts/
    └── archive-verify.mjs # Wave 0 automated gate
```

Sibling (outside production repo):

```
/Users/usama/Desktop/Dominion Markets/Dominion-Markets-mockups-archive/
├── .git/
├── README.md              # provenance (Claude discretion)
├── VERSION
├── index.html
├── styles.css
├── main.js
└── assets/
```

### Pattern 1: Subtree Split → Local Branch (primary)

**What:** Extract subdirectory history onto a new branch; prefix becomes repository root.
**When to use:** Always for Phase 7 (D-01); path has lived as `mockups/` since first add; no merges touching path.
**Example:**

```bash
# Source: git subtree --help (Apple Git 2.50.1); verified dry-run 2026-09-05
# Preflight: branch must not exist
git show-ref --verify --quiet refs/heads/archive/mockups && {
  echo "FATAL: archive/mockups already exists"; exit 1
}

# Create long-lived branch (expect ~90–120s)
git subtree split --prefix=mockups -b archive/mockups
TIP=$(git rev-parse archive/mockups)
echo "archive/mockups tip=$TIP"
```

### Pattern 2: Sibling Working-Tree Clone (no remote push)

**What:** Materialize a separate local repo from the split branch for browsing/restore without GitHub.
**When to use:** Always (D-02). Prefer `--no-hardlinks` so sibling object DB is independent.

```bash
# Paths with spaces MUST be quoted
SRC="/Users/usama/Desktop/Dominion Markets/Vanilla to nextjs"
DST="/Users/usama/Desktop/Dominion Markets/Dominion-Markets-mockups-archive"

test ! -e "$DST" || { echo "FATAL: sibling path exists"; exit 1; }

git clone --no-hardlinks --single-branch --branch archive/mockups \
  "$SRC" "$DST"

# Optional: rename branch to main inside sibling for conventional browsing
git -C "$DST" branch -m main
```

### Pattern 3: Record-Only Remote Push (later)

**What:** Document commands; do not execute against `origin`.
**When to use:** Always write into `07-ARCHIVE.md` (D-03).

```bash
# DO NOT RUN in Phase 7 unless user explicitly asks:
git push -u origin archive/mockups
# Optional future GitHub archive remote:
# git push -u <new-archive-remote> archive/mockups:main
```

### Anti-Patterns to Avoid

- **`git filter-repo` on this working tree:** Rewrites refs by default; can destroy local branches — only on a disposable mirror clone.
- **`git subtree push` / `git push origin` in this phase:** Violates D-03 and user push rules.
- **Deleting or `git rm -r mockups/`:** Phase 9 only.
- **Using `origin/hifi-ui-mockup` as the MOCK-01 SoT:** Violates D-04.
- **Committing untracked `.DS_Store` under `mockups/` into the archive:** Split only includes **tracked** files today (good); do not `git add` them before split.
- **Assuming split tip paths still start with `mockups/`:** They do not — root is the old `mockups/` contents.
- **Hardlink clone without documenting shared objects:** Prefer `--no-hardlinks` for a self-contained sibling.

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Extract subdir history | Manual `git log` + copy files / new orphan branch with one commit | `git subtree split` | Loses blame/log; MOCK-01 requires history intact |
| History rewrite | Custom `filter-branch` shell | `git subtree` (primary) or `git-filter-repo` (fallback on clone) | filter-branch deprecated; easy to corrupt refs `[CITED: stackoverflow.com/questions/61127751]` |
| Prove archive integrity | Ad-hoc chat notes only | Committed `archive-verify.mjs` + `07-ARCHIVE.md` | Verifier/nyquist need reproducible exit codes |
| Separate repo | Zip of `mockups/` folder | Git clone of split branch | Zip has no commit graph |

**Key insight:** The hard part is not copying files — it is producing a **git-native** history where `mockups/` is the root while leaving production `main` untouched. Subtree split is purpose-built for that.

## Common Pitfalls

### Pitfall 1: Branch Already Exists
**What goes wrong:** `git subtree split -b archive/mockups` fails if the branch ref exists.
**Why it happens:** Partial prior run, research dry-run with `-b`, or name collision.
**How to avoid:** Prefer **re-split for freshness** at execute time: if `refs/heads/archive/mockups` exists, `git branch -D archive/mockups` (local only) then split again. Never push; never delete `mockups/` from main. If sibling path exists from a partial run, remove only the locked sibling path and re-clone.
**Warning signs:** `fatal: … already exists`

### Pitfall 2: Paths With Spaces
**What goes wrong:** Clone/push commands break on `Dominion Markets`.
**Why it happens:** Unquoted shell paths.
**How to avoid:** Always quote `$SRC` / `$DST`; prefer variables in the plan script block.
**Warning signs:** `No such file or directory` mid-clone

### Pitfall 3: Untracked `.DS_Store`
**What goes wrong:** Noise in working tree; risk of accidental add.
**Why it happens:** macOS Finder; not gitignored at repo root today `[VERIFIED: .gitignore]`.
**How to avoid:** Do not `git add mockups/.DS_Store`; split ignores untracked files. Optional: leave them untracked.
**Warning signs:** `git status` shows `?? mockups/.DS_Store`

### Pitfall 4: Expecting Commit Count == `git log -- mockups` on main
**What goes wrong:** Main path log showed **64** commits; split tip has **66** — mismatch alarms falsely.
**Why it happens:** Subtree rebuilds a synthetic commit graph (and can include additional reconstructed commits).
**How to avoid:** Gate on **file-set equality (139)**, sample `git log`/`git blame` working, and commit count **> 1** (not exact equality to 64).
**Warning signs:** Verifier asserts `count == 64` and fails

### Pitfall 5: Treating Split as Deleting From Main
**What goes wrong:** Someone runs `git rm -r mockups` “to finish the archive.”
**Why it happens:** Confusion with filter-repo workflows that rewrite the only clone.
**How to avoid:** Explicit hard stop in plan must_haves; verify script asserts `mockups/` still tracked on current branch.
**Warning signs:** `git ls-files mockups | wc -l` → 0

### Pitfall 6: LFS / Huge Binaries
**What goes wrong:** Push to GitHub later fails or clone is painful.
**Why it happens:** Large media in history.
**How to avoid:** This repo has **no LFS** `[VERIFIED]`; max file ≈ 16.5 MB. Document for future push; no action needed now.
**Warning signs:** Files ≥ 100 MB (none found)

### Pitfall 7: filter-repo Fallback Misuse
**What goes wrong:** Running filter-repo in-place rewrites `main` and remotes metadata.
**Why it happens:** Default filter-repo behavior is whole-repo rewrite.
**How to avoid:** Only: `git clone --mirror … /tmp/…` then filter, then fetch split into archive branch / sibling — never rewrite the production clone.
**Warning signs:** Missing remotes, rewritten SHAs on `main`

### Pitfall 8: Dirty Unrelated Files
**What goes wrong:** Confusion about whether to commit `readme.md` modifications before split.
**Why it happens:** Working tree currently has `M readme.md` and assorted `.DS_Store` `[VERIFIED: git status]`.
**How to avoid:** Subtree split uses **committed** trees for `mockups/` — dirty non-mockups files do not block split. Do not stash-delete `mockups/`. Do not commit Phase 8 doc retargets.
**Warning signs:** Executor starts editing `readme.md` “for archive”

## Code Examples

### Recommended Full Command Sequence (executor)

```bash
# Source: verified dry-run on this repo 2026-09-05 + git subtree usage
set -euo pipefail
REPO="/Users/usama/Desktop/Dominion Markets/Vanilla to nextjs"
SIBLING="/Users/usama/Desktop/Dominion Markets/Dominion-Markets-mockups-archive"
cd "$REPO"

# 0) Preflight
git rev-parse --abbrev-ref HEAD   # expect main (or document if not)
test -d mockups
MAIN_COUNT=$(git ls-files mockups | wc -l | tr -d ' ')
test "$MAIN_COUNT" = "139"
git show-ref --verify --quiet refs/heads/archive/mockups && exit 1
test ! -e "$SIBLING"

# 1) Split (creates branch)
git subtree split --prefix=mockups -b archive/mockups
TIP=$(git rev-parse archive/mockups)
SPLIT_COMMITS=$(git rev-list --count archive/mockups)
SPLIT_FILES=$(git ls-tree -r --name-only archive/mockups | wc -l | tr -d ' ')

# 2) History / content checks
test "$SPLIT_FILES" = "139"
test "$SPLIT_COMMITS" -ge 2
git log -1 --oneline "$TIP"
git blame -L 1,3 archive/mockups -- README.md >/dev/null
# File-set equality
diff -q \
  <(git ls-files mockups | sed 's|^mockups/||' | sort) \
  <(git ls-tree -r --name-only archive/mockups | sort)

# 3) Sibling working tree
git clone --no-hardlinks --single-branch --branch archive/mockups \
  "$REPO" "$SIBLING"
git -C "$SIBLING" branch -m main
SIBLING_TIP=$(git -C "$SIBLING" rev-parse HEAD)
test "$SIBLING_TIP" = "$TIP"

# 4) Provenance README in sibling (discretion) — then commit only inside sibling
# 5) Write 07-ARCHIVE.md in production repo (planning artifact)
# 6) Run: node .planning/phases/07-archive-mockups/scripts/archive-verify.mjs

# NEVER:
# git push origin archive/mockups
# git rm -r mockups
```

### filter-repo Fallback (only if subtree fails)

```bash
# Source: github.com/newren/git-filter-repo Documentation [CITED]
# REQUIRES: brew/pip install git-filter-repo; disposable clone
cd "/tmp"
git clone --mirror "$REPO" dominion-mockups-filter.git
cd dominion-mockups-filter.git
git filter-repo --subdirectory-filter mockups
# Then: create sibling from this mirror; fetch tip into archive/mockups on original
# via git fetch /tmp/... HEAD:archive/mockups — do NOT replace original main
```

### What to Put in `07-ARCHIVE.md`

Required sections for Phase 8 consumers:

1. **Status** — MOCK-01 archive complete (local)
2. **Source of truth** — branch `archive/mockups` + sibling path (D-04 primary)
3. **Coordinates**
   - Production repo path
   - Branch name
   - Tip SHA (full)
   - Split method + date
   - Split commit count + file count
4. **Sibling repo** — absolute path; HEAD SHA; whether branch renamed to `main`
5. **Verification evidence** — commands + pass/fail (or point to verify script output)
6. **Prior art (not SoT)** — `origin/hifi-ui-mockup` @ `184968a`; tag `mockup-v0.1` @ `0bdf12c`
7. **Hard stops observed** — `mockups/` still on main; no `web/` changes; no origin push
8. **Restore** — how to check out / clone from branch or sibling
9. **Push later (do not run now)** — exact one-liners for `origin` and optional new remote
10. **Next phases** — Phase 8 retarget docs to this file; Phase 9 delete `mockups/`

## Suggested Plan Breakdown (single `07-01-PLAN`)

| Task | Wave | Action | Output |
|------|------|--------|--------|
| 07-01-01 | 0 | Add `scripts/archive-verify.mjs` (asserts below) | Wave 0 script |
| 07-01-02 | 1 | Preflight + `git subtree split -b archive/mockups` | Local branch |
| 07-01-03 | 1 | Verify history/file-set; clone sibling `--no-hardlinks`; optional sibling README commit | Sibling repo |
| 07-01-04 | 1 | Write `07-ARCHIVE.md`; run verify script exit 0; commit planning artifacts only | Record + green gate |

Fine granularity: **one plan file** is enough (fine profile ok); do not split across multiple plans — ordering is strictly serial and git-stateful.

### Suggested `must_haves` (for planner)

- [ ] Local branch `refs/heads/archive/mockups` exists
- [ ] Tip SHA recorded in `07-ARCHIVE.md` matches `git rev-parse archive/mockups`
- [ ] Split tree file count = 139 and matches main `mockups/` relative paths
- [ ] `git rev-list --count archive/mockups` ≥ 2; sample `git log` / `git blame` succeed
- [ ] Sibling exists at exact locked path with HEAD = archive tip
- [ ] `mockups/` still tracked on current production branch (count 139)
- [ ] No commits that delete `mockups/` on main
- [ ] No `web/` file modifications in phase commits
- [ ] No `git push` to `origin` executed
- [ ] `07-ARCHIVE.md` includes push-later commands + prior-art note for `hifi-ui-mockup`
- [ ] `archive-verify.mjs` exits 0

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| `git filter-branch --subdirectory-filter` | `git filter-repo` or `git subtree split` | filter-branch deprecated; subtree since ~1.7.11 | Prefer subtree for non-destructive branch extract |
| Copy folder / zip archive | History-preserving git split | — | Required for MOCK-01 |
| Reuse design feature branch as archive | Dedicated `archive/mockups` SoT | Phase 7 D-04 | Clear Phase 8 pointer |

**Deprecated/outdated:**
- `git filter-branch` for this job — slow, footguns; use subtree or filter-repo `[CITED: SO 61127751 / newren docs]`

## Assumptions Log

| # | Claim | Section | Risk if Wrong |
|---|-------|---------|---------------|
| A1 | Working-tree sibling is preferred over bare for human browsing | Standard Stack / Pattern 2 | Low — CONTEXT already prefers working tree; bare still satisfies “separate git repo” |
| A2 | Dry-run tip SHA will match `-b` run if `mockups/` commits unchanged | Summary | Low — executor re-records actual tip |
| A3 | ~47 GiB free remains enough through clone | Environment | Low — sibling needs ≪ 1 GiB |

**If empty after confirmations:** A1–A3 are low-risk operational assumptions only.

## Open Questions

1. **Should sibling `origin` remote remain pointing at the production local path?**
   - **RESOLVED (2026-09-05 / 07-01-PLAN):** Keep clone `origin` pointing at the production local path (documents provenance). Optionally rename to `production-local` — either OK if documented in sibling README + `07-ARCHIVE.md`. Do not add a GitHub remote unless the user asks.

2. **Re-run split if `main` gains mockups commits before execute?**
   - **RESOLVED (2026-09-05 / 07-01-PLAN):** Always re-split at execute time for freshness. If `archive/mockups` already exists (research dry-run with `-b` or partial execute), `git branch -D archive/mockups` then re-split; if sibling path exists from a partial run, remove only that locked path and re-clone. Never hardcode the research dry-run tip SHA as final without re-verify.

## Environment Availability

| Dependency | Required By | Available | Version | Fallback |
|------------|------------|-----------|---------|----------|
| Git + `git subtree` | D-01 split | ✓ | 2.50.1 / Xcode contrib | — |
| Disk space (sibling) | D-02 | ✓ | ~47 GiB free | — |
| Node.js | verify script | ✓ | v24.13.1 | bash/python assert script |
| `git-filter-repo` | Fallback only | ✗ | — | Install via brew/pip **or** stay on subtree (preferred) |
| GitHub push credentials | Remote archive | N/A | — | Out of scope (D-03) |
| Git LFS | Large binaries | ✗ (not used) | — | Not needed |

**Missing dependencies with no fallback:** None for primary path.

**Missing dependencies with fallback:** `git-filter-repo` — install only if subtree fails.

Step 2.6: External tools audited (git/node/disk); no databases/services required.

## Validation Architecture

> `workflow.nyquist_validation: true` in `.planning/config.json` — include.

### Test Framework

| Property | Value |
|----------|-------|
| Framework | none — phase Node script (no Vitest) |
| Config file | none — Wave 0 adds `scripts/archive-verify.mjs` |
| Quick run command | `node .planning/phases/07-archive-mockups/scripts/archive-verify.mjs` |
| Full suite command | same script (optionally `--strict` sibling path check) |
| Estimated runtime | < 5 seconds after archive exists; fails fast if branch missing |

### Phase Requirements → Test Map

| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| MOCK-01 | `archive/mockups` exists with history | smoke/script | `archive-verify.mjs` (branch + commit count ≥ 2) | ❌ Wave 0 |
| MOCK-01 | File set preserved (139, path-relative match) | smoke/script | same (diff main vs split tree) | ❌ Wave 0 |
| MOCK-01 | Sibling repo present at locked path, HEAD = tip | smoke/script | same (optional skip with env if path policy) | ❌ Wave 0 |
| MOCK-01 | `mockups/` still on production branch | smoke/script | same (`git ls-files mockups` count 139) | ❌ Wave 0 |
| MOCK-01 | `07-ARCHIVE.md` records tip SHA matching branch | docs/script | same (read file, compare SHA) | ❌ after Task 4 |
| MOCK-01 | No origin push required | manual/process | Plan must_haves + SUMMARY attestation | — |

### Sampling Rate

- **Per task commit:** After branch exists, run `archive-verify.mjs` (may use `--allow-missing-sibling` until sibling task completes — or single task wave so full asserts run once at end)
- **Per wave merge:** Full script exit 0
- **Phase gate:** Full script green + `07-ARCHIVE.md` present before `/gsd-verify-work`

### Wave 0 Gaps

- [ ] `.planning/phases/07-archive-mockups/scripts/archive-verify.mjs` — covers MOCK-01 automated asserts
- [ ] Framework install: **none** — do not add Vitest/Playwright
- [ ] `07-ARCHIVE.md` — created during execution (not Wave 0); script should fail clearly if missing until final task

### Verify Script Assert Sketch

```text
PASS if all true:
1. refs/heads/archive/mockups resolves
2. rev-list --count archive/mockups >= 2
3. ls-tree -r archive/mockups | wc -l == 139
4. sorted relative paths == sorted (ls-files mockups | strip prefix)
5. git ls-files mockups | wc -l == 139 on current branch (not archive)
6. sibling path is a git repo; HEAD == archive tip
7. 07-ARCHIVE.md contains full tip SHA and sibling absolute path
8. 07-ARCHIVE.md contains a push-later command mentioning origin archive/mockups
FAIL if current branch is archive/mockups during verify on production checks (expect main)
```

## Security Domain

> `security_enforcement` enabled (ASVS level 1).

### Applicable ASVS Categories

| ASVS Category | Applies | Standard Control |
|---------------|---------|-----------------|
| V2 Authentication | no | No auth features in phase |
| V3 Session Management | no | — |
| V4 Access Control | no | Local git only |
| V5 Input Validation | yes | Verify script: fixed absolute paths; reject path traversal; quote spaces |
| V6 Cryptography | no | No new crypto; rely on git object IDs |

### Known Threat Patterns for git archive ops

| Pattern | STRIDE | Standard Mitigation |
|---------|--------|---------------------|
| Accidental push of archive to wrong remote | Elevation / Info | D-03: no push; record commands only |
| Path injection in verify script (`../`) | Tampering | Resolve paths under known roots; no user argv paths beyond constants |
| Committing secrets from mockups | Info disclosure | Spot-check: mockups are design HTML/CSS/assets — no `.env` found in tracked set `[VERIFIED: extension census]`; still do not add untracked junk |
| Destructive history rewrite of production clone | Tampering | Prefer subtree; filter-repo only on disposable clone |

## Sources

### Primary (HIGH confidence)

- Local git dry-run: `git subtree split --prefix=mockups` → tip `3e9401b…`, 66 commits, 139 files, `diff` empty vs main relative paths (2026-09-05)
- `git subtree` usage / `--prefix` / `-b` from Apple Git 2.50.1 contrib script at `$(git --exec-path)/git-subtree`
- Repo inventory: 139 tracked files, ~64 MB tree, 106 binary, no LFS, no merges on `mockups/`, max blob 16.5 MB
- `.planning/config.json` — `nyquist_validation: true`, `security_enforcement: true`, `commit_docs: true`
- `07-CONTEXT.md` locked decisions D-01–D-04

### Secondary (MEDIUM confidence)

- Close.com engineering: subtree vs filter-repo tradeoffs for subfolder extract — https://making.close.com/posts/splitting-sub-folders-out-into-new-git-repository/
- Stack Overflow / git history: subtree preferred over filter-branch for this shape — https://stackoverflow.com/questions/61127751/difference-between-git-filter-branch-subdirectory-filter-git-subtree-split-p
- git-filter-repo docs: `--subdirectory-filter`; run on clone — https://github.com/newren/git-filter-repo

### Tertiary (LOW confidence)

- Community blogs recommending `--no-hardlinks` for independent local clones — treat as operational preference (A1)

## Metadata

**Confidence breakdown:**
- Standard stack: **HIGH** — subtree dry-run succeeded on this exact repo
- Architecture: **HIGH** — locked decisions + verified command sequence
- Pitfalls: **HIGH** — observed `.DS_Store`, spaces in path, commit-count mismatch, no LFS, branch absent, filter-repo missing

**Research date:** 2026-09-05
**Valid until:** 2026-10-05 (30 days; re-dry-run if `mockups/` history changes materially)
