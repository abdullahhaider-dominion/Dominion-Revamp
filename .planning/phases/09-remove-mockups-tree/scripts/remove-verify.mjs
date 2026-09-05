#!/usr/bin/env node
/**
 * Phase 9 remove-verify (MOCK-03 / Nyquist post-delete gate)
 *
 * Asserts archive tip + sibling intact, repo-root mockups/ gone,
 * KEEP production ports present, operational docs cite ARCHIVE
 * without “until Phase 9” presence language.
 *
 * Usage (repo root):
 *   node .planning/phases/09-remove-mockups-tree/scripts/remove-verify.mjs
 *
 * Security (T-09-01): fixed sibling constant; reject '..'; execFile argv only.
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { execFileSync } from "node:child_process";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.resolve(__dirname, "../../../..");

const BRANCH = "archive/mockups";
const SIBLING_PATH =
  "/Users/usama/Desktop/Dominion Markets/Dominion-Markets-mockups-archive";
const ARCHIVE_MD_REL =
  ".planning/phases/07-archive-mockups/07-ARCHIVE.md";

const KEEP_CSS_REL = "web/public/mockups.css";
const KEEP_JS_REL = "web/src/lib/mockups-main.js";
const MOCKUPS_DIR_REL = "mockups";

const OPERATIONAL_TARGETS = [
  "readme.md",
  "web/README.md",
  ".planning/PROJECT.md",
  ".cursor/skills/dominion-section-redesign/SKILL.md",
  "CLAUDE.md",
];

const DENY_PHRASES = [
  "until Phase 9",
  "temporary until Phase 9",
  "may still exist temporarily",
  "may remain until Phase 9",
  "may exist until Phase 9",
  "still present on main until Phase 9",
];

function fail(msg) {
  console.error(`FAIL: ${msg}`);
  process.exit(1);
}

/** Reject any path segment that could escape via '..' (T-09-01). */
function assertNoTraversal(p) {
  const normalized = String(p).replace(/\\/g, "/");
  if (normalized.split("/").includes("..") || normalized.includes("/../")) {
    fail(`rejected path with '..': ${p}`);
  }
  return p;
}

function git(args, cwd = REPO_ROOT) {
  assertNoTraversal(cwd);
  for (const a of args) {
    if (typeof a === "string" && a.includes("..")) {
      if (a.includes("/../") || a === ".." || a.startsWith("../")) {
        fail(`rejected git argv with '..': ${a}`);
      }
    }
  }
  return execFileSync("git", args, {
    cwd,
    encoding: "utf8",
    maxBuffer: 16 * 1024 * 1024,
  }).trimEnd();
}

function parseTipFromArchiveMd(body) {
  // Prefer the explicit Full tip SHA row; fallback any 40-char hex in file.
  const row = body.match(/\*\*Full tip SHA\*\*\s*\|\s*`([0-9a-f]{40})`/i);
  if (row) return row[1].toLowerCase();
  const any = body.match(/\b([0-9a-f]{40})\b/i);
  if (any) return any[1].toLowerCase();
  fail("could not parse tip SHA from 07-ARCHIVE.md");
}

function main() {
  assertNoTraversal(REPO_ROOT);
  assertNoTraversal(SIBLING_PATH);
  assertNoTraversal(ARCHIVE_MD_REL);
  assertNoTraversal(KEEP_CSS_REL);
  assertNoTraversal(KEEP_JS_REL);
  assertNoTraversal(MOCKUPS_DIR_REL);
  for (const t of OPERATIONAL_TARGETS) assertNoTraversal(t);

  if (!fs.existsSync(REPO_ROOT)) fail(`REPO_ROOT missing: ${REPO_ROOT}`);

  // --- 1. refs/heads/archive/mockups resolves; tip matches 07-ARCHIVE.md ---
  let tip;
  try {
    tip = git(["rev-parse", `refs/heads/${BRANCH}`]).toLowerCase();
  } catch {
    fail(`refs/heads/${BRANCH} does not resolve`);
  }
  if (!/^[0-9a-f]{40}$/.test(tip)) {
    fail(`unexpected tip SHA format: ${tip}`);
  }
  console.log(`TIP ${BRANCH}: ${tip}`);

  const archiveMdAbs = path.join(REPO_ROOT, ARCHIVE_MD_REL);
  assertNoTraversal(archiveMdAbs);
  if (!fs.existsSync(archiveMdAbs)) {
    fail(`missing ${ARCHIVE_MD_REL}`);
  }
  const archiveBody = fs.readFileSync(archiveMdAbs, "utf8");
  const archivedTip = parseTipFromArchiveMd(archiveBody);
  if (archivedTip !== tip) {
    fail(
      `live tip ${tip} !== tip recorded in 07-ARCHIVE.md ${archivedTip}`
    );
  }
  console.log(`PASS tip matches 07-ARCHIVE.md: ${tip}`);

  // --- 2. Sibling exists, is git repo, HEAD === tip ---
  if (!fs.existsSync(SIBLING_PATH)) {
    fail(`sibling path missing: ${SIBLING_PATH}`);
  }
  const siblingGit = path.join(SIBLING_PATH, ".git");
  if (!fs.existsSync(siblingGit)) {
    fail(`sibling is not a git repo: ${SIBLING_PATH}`);
  }
  let siblingHead;
  try {
    siblingHead = git(["rev-parse", "HEAD"], SIBLING_PATH).toLowerCase();
  } catch {
    fail(`could not rev-parse HEAD in sibling: ${SIBLING_PATH}`);
  }
  if (siblingHead !== tip) {
    fail(`sibling HEAD ${siblingHead} !== archive tip ${tip}`);
  }
  console.log(`PASS sibling HEAD matches tip: ${siblingHead}`);
  console.log(`SIBLING: ${SIBLING_PATH}`);

  // --- 3. Repo-root mockups/ does not exist ---
  const mockupsAbs = path.join(REPO_ROOT, MOCKUPS_DIR_REL);
  assertNoTraversal(mockupsAbs);
  if (fs.existsSync(mockupsAbs)) {
    fail(`repo-root mockups/ still exists at ${mockupsAbs}`);
  }
  console.log("PASS mockups/ absent from working tree");

  // --- 4. git ls-files mockups empty ---
  const lsFiles = git(["ls-files", "mockups"]).trim();
  if (lsFiles.length > 0) {
    fail(`git ls-files mockups not empty:\n${lsFiles}`);
  }
  console.log("PASS git ls-files mockups empty");

  // --- 5. KEEP ports exist ---
  const keepCss = path.join(REPO_ROOT, KEEP_CSS_REL);
  const keepJs = path.join(REPO_ROOT, KEEP_JS_REL);
  assertNoTraversal(keepCss);
  assertNoTraversal(keepJs);
  if (!fs.existsSync(keepCss)) {
    fail(`KEEP missing: ${KEEP_CSS_REL}`);
  }
  if (!fs.existsSync(keepJs)) {
    fail(`KEEP missing: ${KEEP_JS_REL}`);
  }
  console.log(`PASS KEEP: ${KEEP_CSS_REL}`);
  console.log(`PASS KEEP: ${KEEP_JS_REL}`);

  // --- 6. Current branch is not archive/mockups ---
  const currentBranch = git(["rev-parse", "--abbrev-ref", "HEAD"]);
  if (currentBranch === BRANCH) {
    fail(
      `current branch is ${BRANCH}; remove-verify requires a non-archive working branch`
    );
  }
  console.log(`PASS current branch: ${currentBranch}`);

  // --- 7–8. Operational targets cite ARCHIVE; deny-list clean ---
  for (const rel of OPERATIONAL_TARGETS) {
    const abs = path.join(REPO_ROOT, rel);
    assertNoTraversal(abs);
    if (!fs.existsSync(abs)) fail(`missing operational target: ${rel}`);
    const body = fs.readFileSync(abs, "utf8");
    if (!body.includes("07-ARCHIVE.md")) {
      fail(`${rel} does not cite 07-ARCHIVE.md`);
    }
    for (const phrase of DENY_PHRASES) {
      if (body.includes(phrase)) {
        fail(`${rel} still contains deny-list phrase: "${phrase}"`);
      }
    }
    console.log(`PASS docs: ${rel}`);
  }

  console.log("OK: remove-verify all asserts passed (MOCK-03)");
  process.exit(0);
}

main();
