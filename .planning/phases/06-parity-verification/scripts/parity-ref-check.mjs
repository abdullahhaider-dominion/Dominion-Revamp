#!/usr/bin/env node
/**
 * Phase 6 parity ref-check (PROD-01 / D-01 Asserts A/B/C)
 *
 * Extract path-aware public refs from web/src + web/public/mockups.css.
 * Never scans mockups/ or docs/ as keep proof (D-03).
 *
 * Usage (repo root):
 *   node .planning/phases/06-parity-verification/scripts/parity-ref-check.mjs
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.resolve(__dirname, "../../../..");

const ASSET_RE = /\/(?:assets\/[A-Za-z0-9_./\-]+|mockups\.css)/g;

const DELETE_LIST = path.join(
  REPO_ROOT,
  ".planning/phases/05-prune-public-assets/05-DELETE-LIST.txt"
);
const INVENTORY = path.join(
  REPO_ROOT,
  ".planning/phases/02-asset-inventory/02-INVENTORY.json"
);
const SRC_ROOT = path.join(REPO_ROOT, "web/src");
const MOCKUPS_CSS = path.join(REPO_ROOT, "web/public/mockups.css");

function fail(msg) {
  console.error(`FAIL: ${msg}`);
  process.exit(1);
}

/** Resolve candidate under repo root; reject path traversal (T-06-01). */
function resolveUnderRepo(relPosix) {
  const normalized = relPosix.replace(/\\/g, "/");
  if (normalized.includes("..")) {
    fail(`rejected path with '..': ${relPosix}`);
  }
  const abs = path.resolve(REPO_ROOT, normalized);
  const rootWithSep = REPO_ROOT.endsWith(path.sep)
    ? REPO_ROOT
    : REPO_ROOT + path.sep;
  if (abs !== REPO_ROOT && !abs.startsWith(rootWithSep)) {
    fail(`path escaped repo root: ${relPosix}`);
  }
  return abs;
}

function normalize(raw) {
  let t = raw.split("?")[0].split("#")[0];
  while (t.endsWith("\\")) t = t.slice(0, -1);
  if (!(t.startsWith("/assets/") || t === "/mockups.css")) return null;
  if (t.includes("..")) return null;
  return "web/public" + t;
}

function walkFiles(dir, out = []) {
  if (!fs.existsSync(dir)) return out;
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, ent.name);
    if (ent.isDirectory()) walkFiles(full, out);
    else if (ent.isFile()) out.push(full);
  }
  return out;
}

function extractRefsFromText(text, sourceLabel, refMap) {
  ASSET_RE.lastIndex = 0;
  let m;
  while ((m = ASSET_RE.exec(text)) !== null) {
    const diskRel = normalize(m[0]);
    if (!diskRel) continue;
    if (!refMap.has(diskRel)) refMap.set(diskRel, new Set());
    refMap.get(diskRel).add(sourceLabel);
  }
}

function main() {
  if (!fs.existsSync(SRC_ROOT)) fail(`missing ${SRC_ROOT}`);
  if (!fs.existsSync(MOCKUPS_CSS)) fail(`missing ${MOCKUPS_CSS}`);
  if (!fs.existsSync(DELETE_LIST)) fail(`missing ${DELETE_LIST}`);
  if (!fs.existsSync(INVENTORY)) fail(`missing ${INVENTORY}`);

  const refMap = new Map(); // diskRel -> Set<source>

  for (const file of walkFiles(SRC_ROOT)) {
    const rel = path.relative(REPO_ROOT, file).split(path.sep).join("/");
    const text = fs.readFileSync(file, "utf8");
    extractRefsFromText(text, rel, refMap);
  }

  {
    const text = fs.readFileSync(MOCKUPS_CSS, "utf8");
    extractRefsFromText(text, "web/public/mockups.css", refMap);
  }

  const refs = [...refMap.keys()].sort();
  console.log(`Unique normalized refs: ${refs.length}`);

  // --- Assert A: every ref exists on disk ---
  const missing = [];
  for (const rel of refs) {
    const abs = resolveUnderRepo(rel);
    if (!fs.existsSync(abs)) missing.push(rel);
  }
  if (missing.length) {
    console.error("Assert A FAIL — missing refs:");
    for (const p of missing) {
      console.error(`  ${p}  (from: ${[...refMap.get(p)].join(", ")})`);
    }
    process.exit(1);
  }
  console.log(`Assert A PASS — 0 missing refs (unique=${refs.length})`);

  // --- Assert B: refs ∩ delete-list = ∅; all delete paths absent ---
  const deleteLines = fs
    .readFileSync(DELETE_LIST, "utf8")
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter((l) => l && !l.startsWith("#"));

  if (deleteLines.length !== 55) {
    console.warn(
      `WARN: expected 55 delete-list lines, got ${deleteLines.length}`
    );
  }

  const deleteSet = new Set(deleteLines.map((l) => l.replace(/\\/g, "/")));
  const intersection = refs.filter((r) => deleteSet.has(r));
  if (intersection.length) {
    console.error("Assert B FAIL — refs ∩ 05-DELETE-LIST:");
    for (const p of intersection) console.error(`  ${p}`);
    process.exit(1);
  }

  const stillPresent = [];
  for (const rel of deleteLines) {
    const abs = resolveUnderRepo(rel.replace(/\\/g, "/"));
    if (fs.existsSync(abs)) stillPresent.push(rel);
  }
  if (stillPresent.length) {
    console.error("Assert B FAIL — delete-list paths still on disk:");
    for (const p of stillPresent) console.error(`  ${p}`);
    process.exit(1);
  }
  console.log(
    `Assert B PASS — 0 ∩ delete-list; ${deleteLines.length} deletes absent`
  );

  // --- Assert C: inventory class=keep all exist ---
  const inventory = JSON.parse(fs.readFileSync(INVENTORY, "utf8"));
  const keeps = (inventory.files || []).filter((f) => f.class === "keep");
  if (keeps.length !== 82) {
    console.warn(
      `WARN: expected 82 keep entries, got ${keeps.length} (summary.keep=${inventory.summary?.keep})`
    );
  }

  const missingKeeps = [];
  for (const entry of keeps) {
    const rel = String(entry.path).replace(/\\/g, "/");
    const abs = resolveUnderRepo(rel);
    if (!fs.existsSync(abs)) missingKeeps.push(rel);
  }
  if (missingKeeps.length) {
    console.error("Assert C FAIL — missing keep paths:");
    for (const p of missingKeeps) console.error(`  ${p}`);
    process.exit(1);
  }
  console.log(`Assert C PASS — ${keeps.length} inventory keeps present`);

  console.log("ALL ASSERTS PASS (A/B/C)");
  process.exit(0);
}

main();
