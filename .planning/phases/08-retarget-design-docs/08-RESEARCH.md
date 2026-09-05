# Phase 8: Retarget Design Docs - Research

**Researched:** 2026-09-05
**Domain:** Documentation / agent-skill SoT retarget (MOCK-02)
**Confidence:** HIGH

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions
- **D-01:** Update `.cursor/skills/dominion-section-redesign/SKILL.md` so working hi-fi / implement paths cite the archive (`07-ARCHIVE.md` coordinates: branch `archive/mockups` + sibling repo path), not “must edit local `mockups/` in this production repo.” Production polish may cite `web/`.
- **D-02:** Update root `readme.md` and `web/README.md` so they no longer declare `../mockups/` or in-repo `mockups/` as current design SoT; link to `.planning/phases/07-archive-mockups/07-ARCHIVE.md` (and note archive branch / sibling).
- **D-03:** Update `.planning/PROJECT.md` Context line that still says “Design SoT today: `mockups/`” to reflect archive + `web/` production.
- **D-04:** Do **not** rewrite historical `docs/superpowers/specs/*` or `docs/superpowers/plans/*` as if they were wrong — they are dated delivery history. Optional one-line “Archive note” only if a doc still instructs *current* work to use in-repo `mockups/` as SoT (skip if purely historical).
- **D-05:** Do **not** delete `mockups/` (Phase 9). Do **not** `git push`. Do **not** change app behavior under `web/src`.

### Wording policy (from CONTEXT.md)
- Prefer: “Hi-fi design archive: see `07-ARCHIVE.md` (`archive/mockups` / sibling repo). Production site: `web/`.”
- Allowed to mention that `mockups/` may still exist temporarily until Phase 9, but must not say it is required SoT.

### Claude's Discretion
- Exact skill section rewrites for clarity.
- Whether to add a tiny `RETARGET.md` inventory of files changed (optional; SUMMARY is enough if grep proof is solid).

### Deferred Ideas (OUT OF SCOPE)
- Remove `mockups/` tree — Phase 9
- Push `archive/mockups` to origin — only if user asks
- Lean production check — Phase 10
</user_constraints>

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| MOCK-02 | Update docs/skills/READMEs that treat `mockups/` as SoT to point at the archive | File inventory + wording patterns + grep gates; D-01…D-05; CLAUDE.md YOLO include |
</phase_requirements>

## Summary

Phase 8 is a **docs-and-skill retarget** after Phase 7 archived `mockups/` history onto `archive/mockups` + sibling repo. Production `mockups/` still exists on `main` until Phase 9; agents and humans must stop treating that in-repo tree as the **required working design SoT**.

Locked targets are the redesign skill, root/`web` READMEs, and `.planning/PROJECT.md`. Grep audit also found **CLAUDE.md** repeating “Design source of truth remains `mockups/`” — operational agent guidance, not dated delivery history. Historical `docs/superpowers/*`, in-tree `mockups/README.md`, and `.planning/codebase/*` map snapshots are classified leave-alone (with YOLO resolutions below).

**Primary recommendation:** One plan (`08-01-PLAN.md`) with **3 tasks** — (1) skill retarget, (2) READMEs + PROJECT + CLAUDE.md SoT lines, (3) SUMMARY + docs/grep Nyquist gate. No Vitest; no `web/src` edits; no `mockups/` delete.

## Architectural Responsibility Map

| Capability | Primary Tier | Secondary Tier | Rationale |
|------------|-------------|----------------|-----------|
| Working design SoT pointer | — (process / docs) | — | Points at `07-ARCHIVE.md` + branch/sibling; not a runtime tier |
| Production site authoring | Frontend Server (SSR) / Browser | CDN / Static | Live work is `web/` (Next App Router) |
| Hi-fi archive browse | — (git / sibling FS) | — | `archive/mockups` + sibling path in ARCHIVE |
| Agent redesign workflow | — (Cursor skill) | — | Skill must not require in-repo `mockups/` edits |
| Temporary in-repo `mockups/` | — (artifact until P9) | — | May exist; must not be declared required SoT |

## Standard Stack

### Core

| Tool | Version | Purpose | Why Standard |
|------|---------|---------|--------------|
| `rg` (ripgrep) | installed (`/usr/local/bin/rg`) | Deny/allow phrase gates | Fast docs proof; no test framework needed `[VERIFIED: shell]` |
| `git` | system | Confirm `mockups/` still tracked; no push | D-05 safety `[VERIFIED: shell]` |
| Node | v24.13.1 | Optional one-liner checks | Available; Vitest **not** present `[VERIFIED: web/package.json]` |

### Supporting

| Artifact | Purpose | When to Use |
|----------|---------|-------------|
| `.planning/phases/07-archive-mockups/07-ARCHIVE.md` | Canonical archive coordinates | Every SoT rewrite must link here `[VERIFIED: file exists]` |
| Branch `archive/mockups` tip `3e9401bd85c6848cbbf073d526e5d48ad2450834` | Primary archive SoT | Cite via ARCHIVE, not reinvent `[VERIFIED: git rev-parse]` |
| Sibling `/Users/usama/Desktop/Dominion Markets/Dominion-Markets-mockups-archive` | Human browse tree | Mention as “sibling repo” per ARCHIVE `[VERIFIED: dir exists]` |

### Alternatives Considered

| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| Inline `rg` gates in PLAN | Wave 0 `retarget-verify.mjs` | Script useful if many asserts; MOCK-02 is small — **prefer documented `rg` + optional tiny script only if planner wants reuse** `[ASSUMED: YOLO prefer rg-only]` |
| `RETARGET.md` | SUMMARY only | Discretion: SUMMARY + grep proof enough — **skip RETARGET.md** `[ASSUMED: YOLO]` |

**Installation:** none — docs-only phase.

**Version verification:** `rg` present; no npm packages to add. `[VERIFIED: shell]`

## SoT File Inventory

### Must retarget (locked D-01…D-03)

| File | Current SoT declaration (excerpt) | Required change |
|------|-----------------------------------|-----------------|
| `.cursor/skills/dominion-section-redesign/SKILL.md` | Frontmatter: “implementing glass UI in mockups/”; “Working hi-fi: `mockups/`”; implement steps under `mockups/index.html` etc. | D-01: archive + `web/` production polish; stop requiring local `mockups/` |
| `readme.md` | “Vanilla hi-fi mockup lives in `mockups/`.” | D-02: archive link + `web/` as production |
| `web/README.md` | “Source of truth for design still lives in `../mockups/`.” | D-02: archive link; historical port origin OK if not SoT |
| `.planning/PROJECT.md` | “Design SoT today: `mockups/` (~64MB)…” | D-03: archive + `web/` production |

### Should retarget (YOLO — RESOLVED)

| File | Why | Action |
|------|-----|--------|
| `CLAUDE.md` | Repeats “Design source of truth remains `mockups/`” (Platform Requirements, Pattern Overview); skill table says “implementing glass UI in mockups/”; Entry Points still push `npx serve mockups` as design entry | **Include in Task 2.** Rewrite SoT sentences to ARCHIVE + `web/`. Soften skill-table description. Keep factual “ported from mockups” history. Reword empty/anti-pattern heading “Editing Next styles as the design source of truth” so it no longer implies mockups-first is mandatory. |

**RESOLVED (YOLO):** CLAUDE.md is in MOCK-02 / ROADMAP “any other docs” scope even though not named in D-01…D-03, because agents load it as current instructions.

### Leave alone (do not rewrite)

| File / area | Classification | Rationale |
|-------------|----------------|-----------|
| `docs/superpowers/specs/2026-08-07-dominion-markets-floating-sanctuary-design.md` | Historical delivery | Mentions “hi-fi UI mockups” as pipeline stage — not “edit in-repo `mockups/` now” (D-04) |
| `docs/superpowers/plans/2026-08-07-dominion-markets-wireframes.md` | Historical plan | Follow-on hi-fi is dated narrative (D-04) |
| `docs/brand/Dominion_Markets_Brand_Guidelines.md` | Brand SoT (correct) | “Source of truth” = brand board, not mockups path |
| `mockups/README.md` | Artifact self-doc | Lives inside tree Phase 9 deletes; not a production working SoT pointer |
| `.planning/codebase/{ARCHITECTURE,CONCERNS,STACK,STRUCTURE}.md` | Dated map snapshot | Pre-archive analysis; do **not** remapping this phase. Stale “mockups SoT” language OK until next map. Agents follow skill + CLAUDE after Task 2. |
| `.planning/phases/0[1-7]-*/**`, `07-ARCHIVE.md`, ROADMAP/REQUIREMENTS trackers | Planning history / correct pending state | Do not rewrite Phase 7 narratives; REQUIREMENTS MOCK-02 checkbox flips at phase complete |
| `web/src/**` | Runtime | D-05 out of scope |

### Mentions that are OK after retarget

- Historical: “ported from `mockups/main.js`”, “copied from `mockups/assets/`”
- Temporary: “`mockups/` may still exist until Phase 9 — not required SoT”
- Archive coordinates: `archive/mockups`, sibling path, `07-ARCHIVE.md`

## Recommended wording patterns (link to 07-ARCHIVE.md)

Use these exact or near-exact patterns so grep allowlists stay simple:

### Canonical one-liner (CONTEXT prefer)

```text
Hi-fi design archive: see `.planning/phases/07-archive-mockups/07-ARCHIVE.md` (`archive/mockups` / sibling repo). Production site: `web/`.
```

### Skill — Source of truth block (recommended)

```markdown
## Source of truth

1. Brand: `docs/brand/Dominion_Markets_Brand_Guidelines.md`
2. Design spec: `docs/superpowers/specs/2026-08-07-dominion-markets-floating-sanctuary-design.md`
3. Hi-fi design archive: see `.planning/phases/07-archive-mockups/07-ARCHIVE.md` — branch `archive/mockups` + sibling repo (coordinates in that file). Do **not** treat in-repo `mockups/` as required SoT (tree may remain temporarily until Phase 9).
4. Production polish: `web/` (Next.js App Router)
```

### Skill — frontmatter `description` (recommended)

```yaml
description: Redesign Dominion Markets website sections in the Floating Sanctuary liquid-glass system. Use for old-site recreations, design options, mobile variants, archive hi-fi work (see 07-ARCHIVE.md), or production polish in web/.
```

### Skill — implement step (recommended shift)

- Prefer: implement/polish chosen concepts in the **archive working tree** (sibling / `archive/mockups` checkout) **or** production paths under `web/` when shipping.
- Avoid: “Add/update section in `mockups/index.html`” as the only path.
- Concepts folder: “Save under archive `concepts/` when useful” — not “must write to in-repo `mockups/concepts/`”.

### `readme.md` (recommended)

```markdown
# Dominion Revamp

Production Next.js site: **`web/`**.  
Hi-fi design archive: see [`.planning/phases/07-archive-mockups/07-ARCHIVE.md`](.planning/phases/07-archive-mockups/07-ARCHIVE.md) (`archive/mockups` / sibling repo). In-repo `mockups/` may still exist temporarily until Phase 9 — it is **not** the required design SoT.
```

### `web/README.md` Notes bullet (replace SoT line)

```markdown
- Hi-fi design archive: see [`.planning/phases/07-archive-mockups/07-ARCHIVE.md`](../.planning/phases/07-archive-mockups/07-ARCHIVE.md) (`archive/mockups` / sibling repo). Production site: this `web/` app. In-repo `../mockups/` is not required SoT (temporary until Phase 9).
```

Keep historical port bullets (“Interactions come from the ported…”) — they describe provenance, not SoT.

### `PROJECT.md` Context line (replace)

```markdown
- Production app: `web/` (Next.js). Hi-fi design archive: `.planning/phases/07-archive-mockups/07-ARCHIVE.md` (`archive/mockups` / sibling). In-repo `mockups/` may remain until Phase 9 — not required SoT.
```

Also update Active checklist item when Phase 8 completes (via SUMMARY/transition): mark docs/skills retarget done.

### `CLAUDE.md` SoT sentences (replace pattern)

Replace occurrences of:

```text
Design source of truth remains `mockups/`
```

with the canonical one-liner (or ARCHIVE + `web/` equivalent). Update Project Skills table description to match skill frontmatter.

## Architecture Patterns

### System Architecture Diagram

```text
[Agent / human]
    │
    ├─► dominion-section-redesign SKILL ──► brand + design spec
    │         │
    │         ├─► hi-fi work ──► 07-ARCHIVE.md ──► archive/mockups + sibling
    │         │
    │         └─► production polish ──► web/ (Next)
    │
    ├─► readme.md / web/README.md / PROJECT.md / CLAUDE.md
    │         └─► same ARCHIVE + web/ pointers
    │
    └─► (do not follow) in-repo mockups/ as required SoT
              │
              └─► still on disk until Phase 9 delete
```

### Recommended Project Structure (unchanged layout)

```
.cursor/skills/dominion-section-redesign/SKILL.md   # retarget
readme.md / web/README.md / .planning/PROJECT.md    # retarget
CLAUDE.md                                           # YOLO retarget SoT lines
.planning/phases/07-archive-mockups/07-ARCHIVE.md   # link target (read-only)
mockups/                                            # untouched (D-05)
web/src/                                            # untouched (D-05)
docs/superpowers/                                   # untouched (D-04)
```

### Pattern 1: Link, don’t duplicate archive coordinates
**What:** Point to `07-ARCHIVE.md` for tip SHA, sibling path, restore/push-later.
**When to use:** Every SoT rewrite.
**Anti-pattern:** Copying tip SHA into four READMEs (rots when Phase 7 record is canonical).

### Anti-Patterns to Avoid
- **Deleting `mockups/` in this phase:** Phase 9 only (D-05).
- **Rewriting superpowers plans/specs as “wrong”:** dated history (D-04).
- **Changing `web/src` “while we’re here”:** out of scope (D-05).
- **`git push` of archive:** deferred (D-05 / Phase 7 policy).
- **Saying in-repo `mockups/` is still required SoT** while “also” linking ARCHIVE — fails MOCK-02.

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Prove docs retargeted | Vitest / Playwright | `rg` deny + allow lists | Docs-only; no test runner in repo `[VERIFIED]` |
| Archive coordinates | Re-derive SHA/paths | `07-ARCHIVE.md` | Already verified Phase 7 |
| File change inventory | Optional RETARGET.md | `08-01-SUMMARY.md` + grep | Discretion default |

**Key insight:** MOCK-02 is a pointer problem, not a tooling problem.

## Runtime State Inventory

Docs-only retarget; no rename of runtime identifiers.

| Category | Items Found | Action Required |
|----------|-------------|-----------------|
| Stored data | None — verified no DB/key stores for SoT strings | none |
| Live service config | None — no n8n/Datadog SoT for mockups path | none |
| OS-registered state | None | none |
| Secrets/env vars | None tied to `mockups/` SoT wording | none |
| Build artifacts | In-repo `mockups/` tree still present (139 paths) — expected until Phase 9 | **do not delete** (D-05) |

## Common Pitfalls

### Pitfall 1: Historical mention ≠ SoT declaration
**What goes wrong:** Grep deletes every `mockups/` string, breaking port provenance docs.
**How to avoid:** Denylist **phrases** (`Source of truth for design still lives`, `Design SoT today: \`mockups/\``, `Working hi-fi: \`mockups/\``, `Design source of truth remains \`mockups/\``), not bare path `mockups/`.

### Pitfall 2: Skill still implements only in-repo mockups
**What goes wrong:** Frontmatter + SoT updated but §4 Implement still says edit `mockups/index.html` only.
**How to avoid:** Rewrite When-to-use, SoT, Implement, and Output checklist together.

### Pitfall 3: Premature delete
**What goes wrong:** Executor “cleans up” `mockups/` after docs.
**How to avoid:** D-05 hard stop; verify `git ls-files mockups | wc -l` still 139.

### Pitfall 4: Relative link from `web/README.md`
**What goes wrong:** Wrong relative path to ARCHIVE.
**How to avoid:** From `web/README.md` use `../.planning/phases/07-archive-mockups/07-ARCHIVE.md`.

## Code Examples

### Deny-list grep (must exit 1 / no matches in target files)

```bash
# From repo root — expect NO matches in these paths
rg -n \
  -e 'Source of truth for design still lives in `\.\./mockups/`' \
  -e 'Design SoT today: `mockups/`' \
  -e 'Working hi-fi: `mockups/`' \
  -e 'Design source of truth remains `mockups/`' \
  -e 'Vanilla hi-fi mockup lives in `mockups/`' \
  readme.md web/README.md .planning/PROJECT.md \
  .cursor/skills/dominion-section-redesign/SKILL.md CLAUDE.md
# success = exit code 1 (no matches)
```

### Allow-list grep (must find ARCHIVE link)

```bash
rg -n '07-ARCHIVE\.md' \
  readme.md web/README.md .planning/PROJECT.md \
  .cursor/skills/dominion-section-redesign/SKILL.md
# success = match in each must-file (CLAUDE optional but recommended)
```

### Safety (D-05)

```bash
test "$(git ls-files mockups | wc -l | tr -d ' ')" = "139"
test ! -n "$(git status --porcelain web/src 2>/dev/null | head -1)" || \
  git diff --name-only -- web/src | grep . && exit 1  # fail if web/src dirty from this phase
```

## Suggested must_haves (for planner)

```yaml
must_haves:
  - ".cursor/skills/dominion-section-redesign/SKILL.md cites 07-ARCHIVE.md and does not list Working hi-fi: mockups/ as SoT"
  - "readme.md and web/README.md link 07-ARCHIVE.md and do not declare in-repo mockups/ as current design SoT"
  - ".planning/PROJECT.md Context no longer says Design SoT today: mockups/"
  - "CLAUDE.md no longer says Design source of truth remains mockups/ (YOLO)"
  - "Deny-list rg clean on target files; allow-list rg finds 07-ARCHIVE.md"
  - "git ls-files mockups still 139; no web/src changes; no git push"
```

## Suggested 08-01-PLAN task shape (2–3 tasks)

**Plan file:** `08-01-PLAN.md` (single wave). **Requirement:** MOCK-02.

| Task ID | Focus | Files | Verify |
|---------|-------|-------|--------|
| **08-01-01** | D-01 skill retarget | `.cursor/skills/dominion-section-redesign/SKILL.md` | Skill contains `07-ARCHIVE.md`; no `Working hi-fi: \`mockups/\``; implement path not “in-repo mockups only” |
| **08-01-02** | D-02 + D-03 + YOLO CLAUDE | `readme.md`, `web/README.md`, `.planning/PROJECT.md`, `CLAUDE.md` | Deny-list clean; each README/PROJECT links ARCHIVE; no `web/src` |
| **08-01-03** | Proof + SUMMARY | `08-01-SUMMARY.md` | Full deny + allow `rg`; `git ls-files mockups` = 139; attest no push / no mockups delete |

**Wave 0:** none required (no Vitest; gates are shell `rg`). Optional: skip Task 3 and fold SUMMARY into Task 2 if planner prefers **2 tasks** — then Task 2 owns grep attestation.

**RESOLVED (YOLO):** Prefer **3 tasks** for clear D-01 vs docs split and explicit Nyquist proof task.

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| In-repo `mockups/` = working SoT | Archive branch + sibling = hi-fi SoT; `web/` = production | Phase 7 archive + Phase 8 docs | Agents stop editing production-repo mockups as mandatory |
| Skill implements in `mockups/` | Skill → ARCHIVE / `web/` | Phase 8 | Unblocks Phase 9 delete |

**Deprecated/outdated:**
- “Source of truth for design still lives in `../mockups/`” in `web/README.md`
- Skill “Working hi-fi: `mockups/`”
- PROJECT “Design SoT today: `mockups/`”
- CLAUDE “Design source of truth remains `mockups/`”

## Assumptions Log

| # | Claim | Section | Risk if Wrong |
|---|-------|---------|---------------|
| A1 | Include `CLAUDE.md` in retarget though not named in D-01…D-03 | Inventory / tasks | Slight scope creep; mitigated by MOCK-02 wording |
| A2 | Leave `.planning/codebase/*` stale until remapping | Leave alone | Agents reading maps only could still see old SoT — CLAUDE+skill override |
| A3 | Skip `RETARGET.md` | Discretion | Slightly less inventory artifact; SUMMARY sufficient |
| A4 | Prefer 3-task plan over 2 | Task shape | Planner may collapse 02+03 |

## Open Questions

1. **Include CLAUDE.md?**
   - **RESOLVED (YOLO):** Yes — operational SoT declarations.
2. **Rewrite `.planning/codebase/*`?**
   - **RESOLVED (YOLO):** No — dated maps; leave alone.
3. **Archive note on docs/superpowers?**
   - **RESOLVED (YOLO):** No — purely historical; D-04 skip.
4. **Add RETARGET.md?**
   - **RESOLVED (YOLO):** No — SUMMARY + grep.
5. **Wave 0 verify script?**
   - **RESOLVED (YOLO):** No — document `rg` gates in VALIDATION/PLAN only.

## Environment Availability

| Dependency | Required By | Available | Version | Fallback |
|------------|------------|-----------|---------|----------|
| `rg` | Grep gates | ✓ | `/usr/local/bin/rg` | `git grep -n` |
| `git` | D-05 retain check | ✓ | system | — |
| `node` | none required | ✓ | v24.13.1 | — |
| Vitest | — | ✗ | — | **Do not add** |
| `07-ARCHIVE.md` | Link target | ✓ | Phase 7 | — |
| `archive/mockups` | Cite via ARCHIVE | ✓ | tip `3e9401b…` | — |

**Missing dependencies with no fallback:** none

**Step 2.6:** External deps = CLI only; all available.

## Validation Architecture

> `workflow.nyquist_validation: true` — see also `08-VALIDATION.md`.

### Test Framework

| Property | Value |
|----------|-------|
| Framework | none — docs/`rg` gates |
| Config file | none |
| Quick run command | deny-list `rg` on target files |
| Full suite command | deny-list + allow-list `rg` + `git ls-files mockups` count |

### Phase Requirements → Test Map

| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| MOCK-02 | No forbidden SoT phrases in target files | docs/grep | deny-list `rg` (expect no matches) | ✅ commands in VALIDATION |
| MOCK-02 | ARCHIVE linked from skill + READMEs + PROJECT | docs/grep | allow-list `rg '07-ARCHIVE\.md'` | ✅ |
| MOCK-02 / D-05 | `mockups/` retained | git | `git ls-files mockups \| wc -l` → 139 | ✅ |
| MOCK-02 / D-05 | No `web/src` edits | git | `git diff --name-only` must not include `web/src` | ✅ |

### Sampling Rate

- **Per task commit:** deny-list on files touched that task
- **Per wave merge:** full deny + allow + retain count
- **Phase gate:** full suite green before `/gsd-verify-work`

### Wave 0 Gaps

- None — no Vitest/framework install; no new script required (YOLO)

## Security Domain

### Applicable ASVS Categories

| ASVS Category | Applies | Standard Control |
|---------------|---------|-----------------|
| V2 Authentication | no | — |
| V3 Session Management | no | — |
| V4 Access Control | no | — |
| V5 Input Validation | no (docs only) | — |
| V6 Cryptography | no | — |

### Known Threat Patterns for docs retarget

| Pattern | STRIDE | Standard Mitigation |
|---------|--------|---------------------|
| Accidental `git push` of archive | Information Disclosure / process | D-05 forbid push; SUMMARY attestation |
| Accidental `mockups/` delete | Tampering / Denial | Retain-count gate; Phase 9 only |
| Path traversal in scripts | Tampering | N/A if no new script; if added later, fixed roots only |

## Sources

### Primary (HIGH confidence)
- `.planning/phases/08-retarget-design-docs/08-CONTEXT.md` — D-01…D-05
- `.planning/REQUIREMENTS.md` — MOCK-02
- `.planning/ROADMAP.md` — Phase 8 success criteria
- `.planning/phases/07-archive-mockups/07-ARCHIVE.md` — archive coordinates
- Repo grep inventory — skill, READMEs, PROJECT, CLAUDE, codebase maps, docs/superpowers
- Shell probes — `rg`, `git rev-parse archive/mockups`, sibling path, no Vitest

### Secondary (MEDIUM confidence)
- Phase 7 VALIDATION pattern (script-based) adapted to docs/`rg` for Phase 8

### Tertiary (LOW confidence)
- None material

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH — docs/`rg` only; environment verified
- Architecture: HIGH — locked CONTEXT + ARCHIVE exist
- Pitfalls: HIGH — clear D-04/D-05 failure modes
- CLAUDE include: MEDIUM — YOLO beyond explicit D-01…D-03 list (logged as A1)

**Research date:** 2026-09-05
**Valid until:** 2026-10-05 (stable docs phase; re-check if ARCHIVE path moves)
