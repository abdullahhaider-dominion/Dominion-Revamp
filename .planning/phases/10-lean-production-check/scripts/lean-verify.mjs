#!/usr/bin/env node
/**
 * Phase 10 lean-verify (PROD-03 / Nyquist lean + push-ready gate)
 *
 * Asserts orphans absent, keep set present (82), ignores exclude
 * install/build junk, status logged (ahead OK), and npm run build
 * unless --skip-build.
 *
 * Usage (repo root):
 *   node .planning/phases/10-lean-production-check/scripts/lean-verify.mjs --skip-build
 *   node .planning/phases/10-lean-production-check/scripts/lean-verify.mjs
 *
 * Security (T-10-01): reject '..' in controlled paths; resolve under
 * REPO_ROOT; execFile/spawnSync argv arrays only (no shell concat).
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { execFileSync, spawnSync } from "node:child_process";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.resolve(__dirname, "../../../..");

const INVENTORY_REL =
  ".planning/phases/02-asset-inventory/02-INVENTORY.json";
const DELETE_LIST_REL =
  ".planning/phases/05-prune-public-assets/05-DELETE-LIST.txt";

const EXPECTED_KEEP = 82;

const KEEP_PORTS = [
  "web/public/mockups.css",
  "web/src/lib/mockups-main.js",
  "web/public/assets/hero/Hero-background.png",
];

const IGNORE_PROBE = ["node_modules", ".next", ".env", ".env.local"];

function fail(msg) {
  console.error(`FAIL: ${msg}`);
  process.exit(1);
}

/** Reject any path segment that could escape via '..' (T-10-01). */
function assertNoTraversal(p) {
  const normalized = String(p).replace(/\\/g, "/");
  if (normalized.split("/").includes("..") || normalized.includes("/../")) {
    fail(`rejected path with '..': ${p}`);
  }
  return p;
}

/** Resolve rel under REPO_ROOT; fail if resolved path escapes root. */
function resolveUnderRoot(rel) {
  assertNoTraversal(rel);
  const abs = path.resolve(REPO_ROOT, rel);
  const rootWithSep = REPO_ROOT.endsWith(path.sep)
    ? REPO_ROOT
    : REPO_ROOT + path.sep;
  if (abs !== REPO_ROOT && !abs.startsWith(rootWithSep)) {
    fail(`path escapes REPO_ROOT: ${rel} -> ${abs}`);
  }
  return abs;
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

function assertAbsent(rel, label = rel) {
  const abs = resolveUnderRoot(rel);
  if (fs.existsSync(abs)) {
    fail(`expected absent: ${label} (found at ${abs})`);
  }
}

function assertExists(rel, label = rel) {
  const abs = resolveUnderRoot(rel);
  if (!fs.existsSync(abs)) {
    fail(`expected present: ${label}`);
  }
}

function readNonEmptyLines(rel) {
  const abs = resolveUnderRoot(rel);
  if (!fs.existsSync(abs)) fail(`missing SoT file: ${rel}`);
  return fs
    .readFileSync(abs, "utf8")
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter((l) => l.length > 0 && !l.startsWith("#"));
}

function countPublicFiles(publicRel) {
  const root = resolveUnderRoot(publicRel);
  if (!fs.existsSync(root) || !fs.statSync(root).isDirectory()) {
    fail(`missing directory: ${publicRel}`);
  }
  let count = 0;
  function walk(dir) {
    for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, ent.name);
      if (ent.isDirectory()) {
        walk(full);
      } else if (ent.isFile() && ent.name !== ".DS_Store") {
        count += 1;
      }
    }
  }
  walk(root);
  return count;
}

function findNextConfig() {
  const exact = "web/next.config.ts";
  if (fs.existsSync(resolveUnderRoot(exact))) return exact;
  const webDir = resolveUnderRoot("web");
  const matches = fs
    .readdirSync(webDir)
    .filter((n) => /^next\.config\./.test(n));
  if (matches.length === 0) fail("missing web/next.config.ts or next.config.*");
  return path.posix.join("web", matches[0]);
}

function main() {
  assertNoTraversal(REPO_ROOT);
  if (!fs.existsSync(REPO_ROOT)) fail(`REPO_ROOT missing: ${REPO_ROOT}`);

  const skipBuild = process.argv.includes("--skip-build");

  // --- ALLOW: docs/ + wireframes/ may exist (D-03) — never assertAbsent ---
  for (const allow of ["docs", "wireframes"]) {
    const abs = resolveUnderRoot(allow);
    if (fs.existsSync(abs)) {
      console.log(`ALLOW: ${allow}/ present (D-03 — not a failure)`);
    } else {
      console.log(`ALLOW: ${allow}/ absent (also OK)`);
    }
  }

  // --- 1. ABSENT ---
  assertAbsent("mockups", "mockups/");
  const mockupsLs = git(["ls-files", "mockups"]).trim();
  if (mockupsLs.length > 0) {
    fail(`git ls-files mockups not empty:\n${mockupsLs}`);
  }
  console.log("PASS mockups/ absent (disk + ls-files)");

  assertAbsent("Hero-background.png", "root Hero-background.png");
  console.log("PASS root Hero-background.png absent");

  const deleteList = readNonEmptyLines(DELETE_LIST_REL);
  for (const p of deleteList) {
    assertNoTraversal(p);
    assertAbsent(p);
  }
  console.log(
    `PASS delete-list absent: ${deleteList.length}/${deleteList.length}`
  );

  // --- 2. PRESENT ---
  assertExists("web/src", "web/src/");
  assertExists("web/package.json");
  const nextConfig = findNextConfig();
  assertExists(nextConfig);
  console.log(`PASS deployable web/: src, package.json, ${nextConfig}`);

  for (const port of KEEP_PORTS) {
    assertExists(port);
  }
  console.log(`PASS KEEP ports: ${KEEP_PORTS.join(", ")}`);

  const inventoryAbs = resolveUnderRoot(INVENTORY_REL);
  if (!fs.existsSync(inventoryAbs)) fail(`missing ${INVENTORY_REL}`);
  const inventory = JSON.parse(fs.readFileSync(inventoryAbs, "utf8"));
  const files = Array.isArray(inventory.files) ? inventory.files : [];
  const keeps = files.filter((f) => f && f.class === "keep");
  if (keeps.length !== EXPECTED_KEEP) {
    fail(
      `inventory keep count ${keeps.length} !== expected ${EXPECTED_KEEP}`
    );
  }
  for (const item of keeps) {
    if (!item.path || typeof item.path !== "string") {
      fail("inventory keep entry missing path");
    }
    assertNoTraversal(item.path);
    assertExists(item.path, `keep:${item.path}`);
  }
  console.log(`PASS keep set present: ${keeps.length}/${EXPECTED_KEEP}`);

  const publicCount = countPublicFiles("web/public");
  if (publicCount !== keeps.length) {
    fail(
      `web/public file count ${publicCount} !== keep count ${keeps.length} (ignoring .DS_Store)`
    );
  }
  console.log(
    `PASS web/public file count === keep count: ${publicCount}`
  );

  // --- 3. IGNORES ---
  const webAbs = resolveUnderRoot("web");
  let checkIgnoreOut;
  try {
    checkIgnoreOut = execFileSync(
      "git",
      ["check-ignore", "-v", ...IGNORE_PROBE],
      {
        cwd: webAbs,
        encoding: "utf8",
        maxBuffer: 1024 * 1024,
      }
    ).trimEnd();
  } catch (err) {
    fail(
      `git check-ignore failed under web/: ${err?.message || err}`
    );
  }
  for (const probe of IGNORE_PROBE) {
    if (!checkIgnoreOut.includes(probe)) {
      fail(`git check-ignore did not cover ${probe} under web/`);
    }
  }
  console.log("PASS git check-ignore: node_modules .next .env .env.local");

  const trackedJunk = git([
    "ls-files",
    "web/node_modules",
    "web/.next",
    "web/.env",
    "web/.env.local",
  ]).trim();
  // Also glob-style for any .env* under web if git supports pathspec
  let envGlob = "";
  try {
    envGlob = git(["ls-files", "--", "web/.env*"]).trim();
  } catch {
    envGlob = "";
  }
  if (trackedJunk.length > 0 || envGlob.length > 0) {
    fail(
      `tracked install/build junk under web/:\n${trackedJunk}\n${envGlob}`
    );
  }
  console.log("PASS git ls-files empty for web/node_modules .next .env*");

  // --- 4. STATUS (informational; ahead is OK — D-01.5) ---
  let aheadBehind = "unknown";
  try {
    aheadBehind = git([
      "rev-list",
      "--left-right",
      "--count",
      "origin/main...HEAD",
    ]);
  } catch {
    try {
      aheadBehind = git(["status", "-sb"]);
    } catch {
      aheadBehind = "unavailable";
    }
  }
  console.log(
    `STATUS origin/main...HEAD left-right (behind\\tahead): ${aheadBehind}`
  );
  console.log(
    "STATUS note: push-ready ≠ pushed; ahead of origin is OK (D-01.5)"
  );

  // --- 5. BUILD ---
  let buildStatus = "skipped";
  if (skipBuild) {
    console.log("BUILD skipped (--skip-build)");
  } else {
    console.log("BUILD: npm run build (cwd=web/)");
    const result = spawnSync("npm", ["run", "build"], {
      cwd: webAbs,
      encoding: "utf8",
      maxBuffer: 32 * 1024 * 1024,
      stdio: ["ignore", "pipe", "pipe"],
    });
    if (result.status !== 0) {
      if (result.stdout) process.stdout.write(result.stdout);
      if (result.stderr) process.stderr.write(result.stderr);
      fail(`npm run build exited ${result.status}`);
    }
    buildStatus = "ok";
    console.log("PASS npm run build exit 0");
  }

  console.log(
    `OK: lean-verify PASS (PROD-03) keep=${keeps.length} delete-absent=${deleteList.length} status=${aheadBehind.replace(/\s+/g, " ")} build=${buildStatus}`
  );
  process.exit(0);
}

main();
