import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const html = fs.readFileSync(path.join(__dirname, "index.html"), "utf8");

const requiredIds = [
  "nav",
  "hero",
  "proof",
  "markets",
  "how-it-works",
  "accounts",
  "platforms",
  "dashboard",
  "ecosystem",
  "copy-trading",
  "trust",
  "final-cta",
  "footer",
];

for (const id of requiredIds) {
  assert.match(html, new RegExp(`id="${id}"`), `missing #${id}`);
}

assert.match(html, /Your Trading Sanctuary/);
assert.match(html, /Trade smarter\. Trade with confidence\./i);
assert.match(html, /Open Account/);
assert.match(html, /Try Demo/);
assert.match(html, /media-slot--chart/);
assert.match(html, /media-slot--video/);
assert.match(html, /T2023340/);
assert.match(html, /20200000425/);
assert.match(html, /past performance is not indicative of future results/i);
assert.match(
  html,
  /Trading CFDs and leveraged financial instruments involves a high level of risk/i
);
assert.doesNotMatch(html, /get rich quick/i);
assert.doesNotMatch(html, /guaranteed profits/i);
assert.doesNotMatch(html, /risk-free trading/i);

// Hero must not contain proof metrics inside #hero
const heroMatch = html.match(/id="hero"[\s\S]*?(?=<section id="proof"|<section id="markets")/);
assert.ok(heroMatch, "hero block not found");
assert.doesNotMatch(heroMatch[0], /50,000\+/);

console.log("wireframe-check: all homepage requirements OK");
