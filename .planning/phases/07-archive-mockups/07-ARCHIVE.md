# Phase 7 — Mockups Archive Record (MOCK-01)

**Status:** MOCK-01 archive complete (local only)  
**Recorded:** 2026-09-05T08:26:34Z  
**Primary SoT (D-04):** local branch `archive/mockups` + sibling working-tree repo below — **not** `origin/hifi-ui-mockup`.

---

## 1. Status

Local archive for `mockups/` is complete: history-preserving `git subtree split`, sibling clone materialized, Nyquist gate `archive-verify.mjs` exits 0. Production `mockups/` remains on `main` (Phase 9 deletes).

---

## 2. Source of truth

| Role | Location |
|------|----------|
| Primary SoT | `refs/heads/archive/mockups` in the production repo |
| Human browse / working tree | Sibling path below (D-02) |
| This file | Coordinates + restore / push-later commands for Phase 8+ |

---

## 3. Coordinates

| Field | Value |
|-------|-------|
| Production repo | `/Users/usama/Desktop/Dominion Markets/Vanilla to nextjs` |
| Production branch (working) | `main` |
| Archive branch | `archive/mockups` |
| **Full tip SHA** | `3e9401bd85c6848cbbf073d526e5d48ad2450834` |
| Split method | `git subtree split --prefix=mockups -b archive/mockups` (fresh execute-time split) |
| Split date (UTC) | `2026-09-05T08:25:53Z` (branch created) |
| Commit count | `66` (`git rev-list --count archive/mockups`) |
| File count | `139` (matches `git ls-files mockups` with `mockups/` stripped) |

Verify tip locally:

```bash
git rev-parse archive/mockups
# expect: 3e9401bd85c6848cbbf073d526e5d48ad2450834
```

---

## 4. Sibling

| Field | Value |
|-------|-------|
| Absolute path | `/Users/usama/Desktop/Dominion Markets/Dominion-Markets-mockups-archive` |
| HEAD SHA | `3e9401bd85c6848cbbf073d526e5d48ad2450834` (equals archive tip) |
| Branch renamed to `main` | yes (`git branch -m main` after clone) |
| Clone flags | `git clone --no-hardlinks --single-branch --branch archive/mockups` |
| Remote policy | Keep clone `origin` pointing at the production local path (provenance). **No GitHub remote added.** |

Optional working-tree note: `README-ARCHIVE-PROVENANCE.md` may exist untracked in the sibling so HEAD stays equal to the archive tip for the Nyquist gate.

---

## 5. Verification

From production repo root:

```bash
node .planning/phases/07-archive-mockups/scripts/archive-verify.mjs
```

Must exit **0**. Mid-plan progressive flags (Task 2 only): `--allow-missing-sibling --allow-missing-archive-md`.

---

## 6. Prior art (not SoT — D-04)

Historical design refs only; **do not** treat as Phase 7 SoT:

- `origin/hifi-ui-mockup` @ `184968a`
- tag `mockup-v0.1` @ `0bdf12c`

---

## 7. Hard stops observed

- `mockups/` still tracked on production `main`: **139** paths (`git ls-files mockups`)
- No `web/` app changes for this phase
- **No** `git push` to `origin` (including no `git subtree push` / no `origin/archive/mockups` remote-tracking from a push)
- Untracked `mockups/.DS_Store` was never staged

---

## 8. Restore

Checkout archive branch in production repo (read-only browse of history):

```bash
cd "/Users/usama/Desktop/Dominion Markets/Vanilla to nextjs"
git log --oneline archive/mockups | head
git checkout archive/mockups -- .   # do not use as long-lived working branch for Phase 7+
```

Prefer browsing the sibling working tree:

```bash
cd "/Users/usama/Desktop/Dominion Markets/Dominion-Markets-mockups-archive"
git log --oneline -5
git rev-parse HEAD   # must match tip above
```

Re-clone sibling from production local branch if needed:

```bash
REPO="/Users/usama/Desktop/Dominion Markets/Vanilla to nextjs"
SIBLING="/Users/usama/Desktop/Dominion Markets/Dominion-Markets-mockups-archive"
git clone --no-hardlinks --single-branch --branch archive/mockups "$REPO" "$SIBLING"
git -C "$SIBLING" branch -m main
```

---

## 9. Push later (do not run now — D-03)

When explicitly approved, push the archive branch to production `origin`:

```bash
cd "/Users/usama/Desktop/Dominion Markets/Vanilla to nextjs"
git push -u origin archive/mockups
```

Optional future dedicated archive remote (example only — do not add unless requested):

```bash
# git remote add mockups-archive <future-github-url>
# git push -u mockups-archive archive/mockups:main
```

---

## 10. Next

- **Phase 8** — retarget skills/READMEs to this file as SoT
- **Phase 9** — delete `mockups/` from production tree (only after Phase 8)
- Push to `origin` — only when the user explicitly asks
