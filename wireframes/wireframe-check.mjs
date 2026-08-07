import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const htmlPath = path.join(__dirname, "index.html");
const html = fs.readFileSync(htmlPath, "utf8");

assert.match(html, /<main id="main">/, "main#main required");
assert.match(html, /href="\.\/styles\.css"/, "styles.css link required");

console.log("wireframe-check: scaffold OK");
