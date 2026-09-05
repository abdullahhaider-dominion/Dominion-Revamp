#!/usr/bin/env node
/**
 * Phase 7 archive verify (MOCK-01 / Nyquist gate)
 *
 * Asserts local archive/mockups branch, 139-file set match, sibling repo,
 * production mockups/ intact, and 07-ARCHIVE.md coordinates.
 *
 * Usage (repo root):
 *   node .planning/phases/07-archive-mockups/scripts/archive-verify.mjs
 * Mid-plan (after Task 2 only):
 *   node .planning/phases/07-archive-mockups/scripts/archive-verify.mjs \
 *     --allow-missing-sibling --allow-missing-archive-md
 *
 * Security (T-07-01): fixed sibling constant; reject '..'; execFile argv only.
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { execFileSync } from "node:child_process";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.resolve(__dirname, "../../../..");

const BRANCH = "archive/mockups";
const EXPECTED_FILES = 139;
const SIBLING_PATH =
  "/Users/usama/Desktop/Dominion Markets/Dominion-Markets-mockups-archive";
const ARCHIVE_MD_REL =
  ".planning/phases/07-archive-mockups/07-ARCHIVE.md";

const flags = new Set(process.argv.slice(2));
const allowMissingSibling = flags.has("--allow-missing-sibling");
const allowMissingArchiveMd = flags.has("--allow-missing-archive-md");

function fail(msg) {
  console.error(`FAIL: ${msg}`);
  process.exit(1);
}

/** Reject any path segment that could escape via '..' (T-07-01). */
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
      // Allow only git pathspecs that are relative under mockups without ..
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

function sortedLines(text) {
  return text
    .split("\n")
    .map((l) => l.trimEnd())
    .filter((l) => l.length > 0)
    .sort();
}

function main() {
  assertNoTraversal(REPO_ROOT);
  assertNoTraversal(SIBLING_PATH);
  assertNoTraversal(ARCHIVE_MD_REL);

  if (!fs.existsSync(REPO_ROOT)) fail(`REPO_ROOT missing: ${REPO_ROOT}`);

  // --- 1. Branch resolves; print full tip SHA ---
  let tip;
  try {
    tip = git(["rev-parse", `refs/heads/${BRANCH}`]);
  } catch {
    fail(`refs/heads/${BRANCH} does not resolve`);
  }
  if (!/^[0-9a-f]{40}$/i.test(tip)) {
    fail(`unexpected tip SHA format: ${tip}`);
  }
  console.log(`TIP ${BRANCH}: ${tip}`);

  // --- 2. History ≥ 2 commits ---
  const revCount = Number(git(["rev-list", "--count", BRANCH]));
  if (!Number.isFinite(revCount) || revCount < 2) {
    fail(`rev-list --count ${BRANCH} = ${revCount} (need ≥ 2)`);
  }
  console.log(`PASS history: ${revCount} commits (≥ 2)`);

  // --- 3. Archive tree file count === 139 ---
  const archivePaths = sortedLines(
    git(["ls-tree", "-r", "--name-only", BRANCH])
  );
  if (archivePaths.length !== EXPECTED_FILES) {
    fail(
      `archive tree file count ${archivePaths.length} !== ${EXPECTED_FILES}`
    );
  }
  console.log(`PASS archive file count: ${archivePaths.length}`);

  // --- 4. Sorted relative paths match stripped main mockups/ ---
  const mainMockupsRaw = git(["ls-files", "mockups"]);
  const mainRelatives = sortedLines(mainMockupsRaw).map((p) => {
    if (!p.startsWith("mockups/")) {
      fail(`unexpected mockups path (no mockups/ prefix): ${p}`);
    }
    return p.slice("mockups/".length);
  });
  if (mainRelatives.length !== EXPECTED_FILES) {
    fail(
      `main mockups/ relative count ${mainRelatives.length} !== ${EXPECTED_FILES}`
    );
  }
  if (archivePaths.length !== mainRelatives.length) {
    fail("archive vs main relative path count mismatch");
  }
  for (let i = 0; i < archivePaths.length; i++) {
    if (archivePaths[i] !== mainRelatives[i]) {
      fail(
        `path set mismatch at index ${i}: archive=${archivePaths[i]} main=${mainRelatives[i]}`
      );
    }
  }
  console.log("PASS path set: archive tip === stripped main mockups/");

  // --- 5. Current branch must not be archive/mockups; mockups count 139 ---
  const currentBranch = git(["rev-parse", "--abbrev-ref", "HEAD"]);
  if (currentBranch === BRANCH) {
    fail(
      `current branch is ${BRANCH}; production checks require a non-archive working branch`
    );
  }
  const mainMockupsCount = sortedLines(mainMockupsRaw).length;
  if (mainMockupsCount !== EXPECTED_FILES) {
    fail(
      `current branch mockups/ count ${mainMockupsCount} !== ${EXPECTED_FILES}`
    );
  }
  console.log(
    `PASS production branch '${currentBranch}': mockups/ count ${mainMockupsCount}`
  );

  // --- 6. Sibling (unless allowed missing) ---
  if (!allowMissingSibling) {
    if (!fs.existsSync(SIBLING_PATH)) {
      fail(`sibling path missing: ${SIBLING_PATH}`);
    }
    const siblingGit = path.join(SIBLING_PATH, ".git");
    if (!fs.existsSync(siblingGit)) {
      fail(`sibling is not a git repo: ${SIBLING_PATH}`);
    }
    let siblingHead;
    try {
      siblingHead = git(["rev-parse", "HEAD"], SIBLING_PATH);
    } catch {
      fail(`could not rev-parse HEAD in sibling: ${SIBLING_PATH}`);
    }
    if (siblingHead !== tip) {
      fail(
        `sibling HEAD ${siblingHead} !== archive tip ${tip}`
      );
    }
    console.log(`PASS sibling HEAD matches tip: ${siblingHead}`);
    console.log(`SIBLING: ${SIBLING_PATH}`);
  } else {
    console.log("SKIP sibling asserts (--allow-missing-sibling)");
  }

  // --- 7. 07-ARCHIVE.md (unless allowed missing) ---
  const archiveMdAbs = path.join(REPO_ROOT, ARCHIVE_MD_REL);
  assertNoTraversal(archiveMdAbs);
  if (!allowMissingArchiveMd) {
    if (!fs.existsSync(archiveMdAbs)) {
      fail(`missing ${ARCHIVE_MD_REL}`);
    }
    const body = fs.readFileSync(archiveMdAbs, "utf8");
    if (!body.includes(tip)) {
      fail(`07-ARCHIVE.md does not contain tip SHA ${tip}`);
    }
    if (!body.includes(SIBLING_PATH)) {
      fail(`07-ARCHIVE.md does not contain sibling path`);
    }
    const pushLaterOk =
      body.includes("origin") && body.includes("archive/mockups");
    if (!pushLaterOk) {
      fail(
        "07-ARCHIVE.md missing push-later one-liner mentioning origin and archive/mockups"
      );
    }
    console.log("PASS 07-ARCHIVE.md: tip SHA, sibling path, push-later");
  } else {
    console.log("SKIP 07-ARCHIVE.md asserts (--allow-missing-archive-md)");
  }

  console.log("OK: archive-verify all applicable asserts passed");
  process.exit(0);
}

main();
