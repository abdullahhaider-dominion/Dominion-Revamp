# Dominion Markets Homepage HTML Wireframes Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a clickable, content-accurate HTML homepage wireframe for Dominion Markets Floating Sanctuary (13 sections, video/chart slots, profile copy) with no Figma dependency.

**Architecture:** Static HTML + CSS in `wireframes/`, served locally. Semantic section IDs match the approved spec IA. Wireframe styling uses labeled gray/glass blocks (structure-first, not hi-fi). A small Node assertion script verifies required sections and media slots exist. Hi-fi mockups and production site are **follow-on plans**, not this plan.

**Tech Stack:** HTML5, CSS3 (no framework), Node.js `assert` + built-in `fs` for structure checks, `npx serve` for local preview.

## Global Constraints

- Follow `docs/superpowers/specs/2026-08-07-dominion-markets-floating-sanctuary-design.md` exactly for section order and content.
- Brand colors for labels only in wireframes: Navy `#1D3347`, Green `#47BD68` — full liquid-glass visuals belong in the hi-fi plan.
- Hero first viewport: brand + headline + one support line + dual CTAs only — **no** stats chips in hero.
- Video/chart slots required in Markets, Platforms, Dashboard, Copy Trading.
- Voice: no “get rich,” “guaranteed profits,” or “risk-free” language.
- Copy-trading examples must include past-performance disclaimer.
- Licence numbers: FSC **T2023340**; CMA UAE affiliate **20200000425**.
- Wireframes path: `wireframes/` only for this plan. Do not scaffold production Next.js/React yet.

---

## File Structure

| File | Responsibility |
| --- | --- |
| `wireframes/index.html` | Full homepage wireframe markup (nav + 13 sections + footer content in sections 1–13) |
| `wireframes/styles.css` | Wireframe layout, labels, glass-slot placeholders, responsive stack |
| `wireframes/wireframe-check.mjs` | Asserts required section IDs, CTAs, media slots, disclaimer text |
| `wireframes/README.md` | How to preview and re-run checks |

---

### Task 1: Wireframe scaffold + structure checker

**Files:**
- Create: `wireframes/index.html`
- Create: `wireframes/styles.css`
- Create: `wireframes/wireframe-check.mjs`
- Create: `wireframes/README.md`

**Interfaces:**
- Consumes: none
- Produces: `#page` root; empty `<main>`; `wireframe-check.mjs` exporting nothing (CLI script) that reads `wireframes/index.html` and asserts IDs listed in Task 2 once sections exist — for this task, assert only that `index.html` contains `<main id="main">` and links `styles.css`

- [ ] **Step 1: Create minimal HTML shell**

Create `wireframes/index.html`:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Dominion Markets — Homepage Wireframe</title>
    <link rel="stylesheet" href="./styles.css" />
  </head>
  <body>
    <div id="page" class="wireframe-page">
      <header class="wf-banner" role="note">
        Wireframe — Floating Sanctuary · structure only · not final UI
      </header>
      <main id="main"></main>
    </div>
  </body>
</html>
```

- [ ] **Step 2: Create base wireframe CSS**

Create `wireframes/styles.css`:

```css
:root {
  --navy: #1d3347;
  --green: #47bd68;
  --ink: #111111;
  --muted: #555555;
  --line: #c5ced6;
  --slot: #d9e2ea;
  --bg: #f3f6f8;
  --white: #ffffff;
  --max: 1100px;
}

* {
  box-sizing: border-box;
}

body {
  margin: 0;
  font-family: system-ui, sans-serif;
  color: var(--ink);
  background: var(--bg);
  line-height: 1.45;
}

.wf-banner {
  background: var(--navy);
  color: var(--white);
  text-align: center;
  padding: 0.5rem 1rem;
  font-size: 0.85rem;
}

.wireframe-page {
  min-height: 100vh;
}

main {
  max-width: var(--max);
  margin: 0 auto;
  padding: 1rem;
}

.section {
  border: 2px dashed var(--line);
  background: var(--white);
  padding: 1.25rem;
  margin: 1rem 0;
}

.section__label {
  display: inline-block;
  font-size: 0.75rem;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--navy);
  border: 1px solid var(--line);
  padding: 0.15rem 0.45rem;
  margin-bottom: 0.75rem;
}

.section--hero {
  background: var(--navy);
  color: var(--white);
  border-style: solid;
}

.section--hero .section__label {
  color: var(--white);
  border-color: rgba(255, 255, 255, 0.35);
}

.media-slot {
  border: 2px solid var(--green);
  background: var(--slot);
  min-height: 180px;
  display: grid;
  place-items: center;
  text-align: center;
  padding: 1rem;
  color: var(--navy);
  font-weight: 600;
}

.media-slot--video::before {
  content: none;
}

.split {
  display: grid;
  gap: 1rem;
}

@media (min-width: 800px) {
  .split {
    grid-template-columns: 1fr 1fr;
    align-items: start;
  }
}

.modules {
  display: grid;
  gap: 0.75rem;
}

@media (min-width: 800px) {
  .modules {
    grid-template-columns: repeat(2, 1fr);
  }
}

.module {
  border: 1px solid var(--line);
  padding: 1rem;
  background: #fafcfd;
}

.btn {
  display: inline-block;
  padding: 0.65rem 1.1rem;
  margin: 0.25rem 0.35rem 0.25rem 0;
  border: 2px solid var(--green);
  text-decoration: none;
  color: inherit;
  font-weight: 600;
}

.btn--primary {
  background: var(--green);
  color: var(--white);
}

.btn--ghost {
  background: transparent;
}

.muted {
  color: var(--muted);
}

.disclaimer {
  font-size: 0.85rem;
  color: var(--muted);
  border-left: 3px solid var(--green);
  padding-left: 0.75rem;
}

.nav {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  align-items: center;
  justify-content: space-between;
  border: 2px dashed var(--line);
  background: rgba(255, 255, 255, 0.85);
  padding: 0.75rem 1rem;
  margin: 1rem 0;
}

.nav__links {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}

.nav a {
  color: var(--navy);
  text-decoration: none;
  font-weight: 600;
}

.steps {
  display: grid;
  gap: 0.75rem;
}

@media (min-width: 800px) {
  .steps {
    grid-template-columns: repeat(3, 1fr);
  }
}

.proof {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}

.proof span {
  border: 1px solid var(--line);
  padding: 0.4rem 0.65rem;
  background: #fafcfd;
  font-weight: 600;
}
```

- [ ] **Step 3: Create failing structure checker**

Create `wireframes/wireframe-check.mjs`:

```js
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
```

- [ ] **Step 4: Run checker — expect pass for scaffold**

Run: `node wireframes/wireframe-check.mjs`  
Expected: `wireframe-check: scaffold OK`

- [ ] **Step 5: Write README**

Create `wireframes/README.md`:

```markdown
# Dominion Markets — Homepage Wireframes

HTML wireframes for the Floating Sanctuary homepage redesign.

## Preview

```bash
npx --yes serve wireframes -p 4173
```

Open `http://localhost:4173`.

## Structure check

```bash
node wireframes/wireframe-check.mjs
```

Must exit 0 before considering the wireframe complete.
```

- [ ] **Step 6: Commit**

```bash
git add wireframes/index.html wireframes/styles.css wireframes/wireframe-check.mjs wireframes/README.md
git commit -m "chore: scaffold homepage HTML wireframe shell and checker"
```

---

### Task 2: Nav, hero, proof strip

**Files:**
- Modify: `wireframes/index.html`
- Modify: `wireframes/wireframe-check.mjs`

**Interfaces:**
- Consumes: `main#main` from Task 1
- Produces: `#nav`, `#hero`, `#proof` sections with exact copy below

- [ ] **Step 1: Expand checker for nav/hero/proof (failing first)**

Replace `wireframes/wireframe-check.mjs` with:

```js
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
```

- [ ] **Step 2: Run checker — expect FAIL (missing sections)**

Run: `node wireframes/wireframe-check.mjs`  
Expected: FAIL with `missing #nav` (or similar)

- [ ] **Step 3: Add nav, hero, proof markup inside `<main>`**

Replace the empty `<main id="main"></main>` with (keep remaining sections for later tasks as stubs OR only add these three now — for this task add all three fully; later tasks fill the rest). For this task, insert **only** nav, hero, proof, and leave temporary comment `<!-- remaining sections in later tasks -->` so the checker still fails on missing IDs until Task 3–4.

```html
<main id="main">
  <nav id="nav" class="nav" aria-label="Primary">
    <strong>Dominion Markets</strong>
    <div class="nav__links">
      <a href="#markets">Trade</a>
      <a href="#accounts">Accounts</a>
      <a href="#platforms">Platforms</a>
      <a href="#ecosystem">Tools</a>
      <a href="#trust">About</a>
      <a href="#final-cta">Log in</a>
      <a class="btn btn--primary" href="#final-cta">Open Account</a>
    </div>
  </nav>

  <section id="hero" class="section section--hero">
    <span class="section__label">2 · Hero (navy glass)</span>
    <p class="brand">Dominion Markets</p>
    <h1>Your Trading Sanctuary</h1>
    <p>Trade smarter. Trade with confidence.</p>
    <div>
      <a class="btn btn--primary" href="#final-cta">Open Account</a>
      <a class="btn btn--ghost" href="#platforms">Try Demo</a>
    </div>
    <p class="muted">Wireframe note: floating glass CTA panel — no stats in first viewport.</p>
  </section>

  <section id="proof" class="section">
    <span class="section__label">3 · Proof strip (below fold)</span>
    <div class="proof">
      <span>50,000+ clients</span>
      <span>200+ instruments</span>
      <span>~30 ms execution</span>
      <span>Up to 500:1 leverage</span>
      <span>FSC Mauritius</span>
    </div>
  </section>

  <!-- remaining sections: Task 3–4 -->
</main>
```

- [ ] **Step 4: Commit partial progress**

```bash
git add wireframes/index.html wireframes/wireframe-check.mjs
git commit -m "feat: add wireframe nav, hero, and proof strip"
```

---

### Task 3: Markets through platforms (incl. chart + video slots)

**Files:**
- Modify: `wireframes/index.html`

**Interfaces:**
- Consumes: `#proof` as previous sibling
- Produces: `#markets`, `#how-it-works`, `#accounts`, `#platforms` with `.media-slot--chart` and `.media-slot--video`

- [ ] **Step 1: Append markets, how-it-works, accounts, platforms after `#proof`**

```html
  <section id="markets" class="section">
    <span class="section__label">4 · Markets (mist split + chart)</span>
    <div class="split">
      <div>
        <h2>Access global markets</h2>
        <p>
          Trade Forex, Indices, Commodities, Stocks, and Cryptocurrencies with
          transparent conditions and convenient funding methods.
        </p>
        <ul>
          <li>Forex — majors, minors, exotics</li>
          <li>Indices — S&amp;P 500, NASDAQ, FTSE, and more</li>
          <li>Commodities — Gold, Silver, Oil, Natural Gas</li>
          <li>Stocks — leading international companies</li>
          <li>Cryptocurrencies — BTC, ETH, and other crypto CFDs</li>
        </ul>
      </div>
      <div class="media-slot media-slot--chart" role="img" aria-label="Chart placeholder">
        CHART SLOT<br />
        Instrument preview / live-feeling chart (illustrative or widget later)
      </div>
    </div>
  </section>

  <section id="how-it-works" class="section">
    <span class="section__label">5 · How it works</span>
    <h2>Start in three steps</h2>
    <div class="steps">
      <div class="module">
        <h3>1. Register</h3>
        <p>Open your Dominion Markets account in minutes.</p>
      </div>
      <div class="module">
        <h3>2. Fund</h3>
        <p>Deposit with secure, convenient funding methods.</p>
      </div>
      <div class="module">
        <h3>3. Trade</h3>
        <p>Access 200+ instruments on MT5 or cTrader.</p>
      </div>
    </div>
  </section>

  <section id="accounts" class="section">
    <span class="section__label">6 · Accounts (module row)</span>
    <h2>Choose your account</h2>
    <div class="modules">
      <div class="module">
        <h3>Standard STP</h3>
        <p>Best for beginner to intermediate traders.</p>
        <ul>
          <li>Competitive spreads, no commissions</li>
          <li>Full market access</li>
        </ul>
      </div>
      <div class="module">
        <h3>ECN</h3>
        <p>Best for active and experienced traders.</p>
        <ul>
          <li>Raw spreads + transparent commission</li>
          <li>Built for precise execution</li>
        </ul>
      </div>
      <div class="module">
        <h3>ECN Institutional</h3>
        <p>Best for professional and institutional traders.</p>
        <ul>
          <li>From $3.0 commission one way</li>
          <li>Minimum deposit $20,000 · MT5 only</li>
        </ul>
      </div>
      <div class="module">
        <h3>Islamic</h3>
        <p>Best for Sharia-compliant trading.</p>
        <ul>
          <li>100% swap-free</li>
          <li>All instruments, full platform features</li>
        </ul>
      </div>
    </div>
  </section>

  <section id="platforms" class="section">
    <span class="section__label">7 · Platforms (large glass + video)</span>
    <h2>Trade on platforms you trust</h2>
    <p>Professional-grade MetaTrader 5 and cTrader — desktop, web, and mobile.</p>
    <div class="media-slot media-slot--video" role="img" aria-label="Video placeholder">
      VIDEO SLOT<br />
      Platform walkthrough (MT5 / cTrader)
    </div>
    <ul>
      <li>Advanced charting with 70+ indicators</li>
      <li>~30 ms order routing</li>
      <li>Algo trading (cAlgo / EA support)</li>
      <li>Built-in risk management tools</li>
    </ul>
  </section>
```

- [ ] **Step 2: Commit**

```bash
git add wireframes/index.html
git commit -m "feat: wireframe markets, how-it-works, accounts, platforms"
```

---

### Task 4: Dashboard through footer + pass full checker

**Files:**
- Modify: `wireframes/index.html`

**Interfaces:**
- Consumes: sections through `#platforms`
- Produces: `#dashboard`, `#ecosystem`, `#copy-trading`, `#trust`, `#final-cta`, `#footer` completing all `requiredIds` in `wireframe-check.mjs`

- [ ] **Step 1: Append remaining sections before `</main>`**

```html
  <section id="dashboard" class="section">
    <span class="section__label">8 · Dashboard / Toolkit (mist split + video)</span>
    <div class="split">
      <div>
        <h2>Your trading command center</h2>
        <p>
          A fully integrated CRM for serious traders — journal, sessions,
          statistics, account control, risk rules, projections, and news calendar.
        </p>
        <ul>
          <li>Trading journal and session performance</li>
          <li>Win rate, profit factor, drawdown tracking</li>
          <li>Daily loss limits and risk protections</li>
        </ul>
      </div>
      <div class="media-slot media-slot--video" role="img" aria-label="Dashboard video placeholder">
        VIDEO / UI DEMO SLOT<br />
        Dashboard walkthrough + chart stats
      </div>
    </div>
  </section>

  <section id="ecosystem" class="section">
    <span class="section__label">9 · Ecosystem</span>
    <h2>Trade more. Unlock more.</h2>
    <p>Commission Incentives Program — tools, education, and bonuses tied to activity.</p>
    <div class="modules">
      <div class="module">
        <h3>Magic Keys</h3>
        <p>Chart-based order management, one-click execution, risk calculators.</p>
      </div>
      <div class="module">
        <h3>MT5 Simulator</h3>
        <p>Test strategies in a full MT5 simulated environment.</p>
      </div>
      <div class="module">
        <h3>Market Fluidity Education</h3>
        <p>Structured courses, live sessions, and market analysis.</p>
      </div>
      <div class="module">
        <h3>Deposit bonus</h3>
        <p>50% bonus on qualifying deposits (terms apply).</p>
      </div>
      <div class="module">
        <h3>Discord community</h3>
        <p>Trader communities, educational discussions, market insights.</p>
      </div>
    </div>
  </section>

  <section id="copy-trading" class="section">
    <span class="section__label">10 · Copy trading (mist split + chart)</span>
    <div class="split">
      <div>
        <h2>Copy expert traders in real time</h2>
        <ol>
          <li>Choose — browse master traders by performance history</li>
          <li>Set — decide investment amount and risk limits</li>
          <li>Copy — trades mirror automatically</li>
          <li>Monitor — track and adjust anytime</li>
        </ol>
        <p class="disclaimer">
          Example master-trader figures shown in company materials are illustrative
          only. Past performance is not indicative of future results.
        </p>
      </div>
      <div class="media-slot media-slot--chart" role="img" aria-label="Copy trading chart placeholder">
        CHART SLOT<br />
        Copy-trading performance preview (with disclaimer)
      </div>
    </div>
  </section>

  <section id="trust" class="section">
    <span class="section__label">11 · Trust / regulation</span>
    <h2>Regulated. Transparent. Client-first.</h2>
    <ul>
      <li>
        Dominion Markets Ltd — Investment Dealer, Financial Services Commission,
        Mauritius — Licence No. T2023340
      </li>
      <li>
        Dominion Financial Services L.L.C. (UAE) — affiliated company licensed by
        the Capital Markets Authority under Category 5 (Introduction) —
        Licence No. 20200000425
      </li>
      <li>Transparency, technology, and incentives as operating pillars</li>
    </ul>
  </section>

  <section id="final-cta" class="section">
    <span class="section__label">12 · Final CTA</span>
    <h2>Ready to trade with clarity?</h2>
    <p>Open an account or talk to our team — Dubai headquarters, global support.</p>
    <a class="btn btn--primary" href="#">Open Account</a>
    <a class="btn btn--ghost" href="mailto:info@dominionmarkets.com">Contact us</a>
  </section>

  <footer id="footer" class="section">
    <span class="section__label">13 · Footer</span>
    <p><strong>Dominion Markets Ltd</strong> · Dubai, United Arab Emirates</p>
    <p>
      <a href="mailto:info@dominionmarkets.com">info@dominionmarkets.com</a> ·
      +971 4 570 4324 · dominionmarkets.com
    </p>
    <p class="disclaimer">
      Trading CFDs and leveraged financial instruments involves a high level of
      risk and may not be suitable for all investors. Clients may lose more than
      their initial deposit where permitted by applicable law. Past performance is
      not indicative of future results.
    </p>
    <p class="muted">© 2026 Dominion Markets Ltd</p>
  </footer>
```

- [ ] **Step 2: Run full checker — expect PASS**

Run: `node wireframes/wireframe-check.mjs`  
Expected: `wireframe-check: all homepage requirements OK`

- [ ] **Step 3: Visual smoke preview**

Run: `npx --yes serve wireframes -p 4173`  
Open `http://localhost:4173` and confirm: all 13 sections visible, nav anchors jump, chart/video slots labeled green, hero has no 50,000+ metrics.

- [ ] **Step 4: Commit**

```bash
git add wireframes/index.html
git commit -m "feat: complete homepage wireframe sections through footer"
```

---

### Task 5: Plan handoff note for hi-fi + production

**Files:**
- Modify: `wireframes/README.md`
- Create: `docs/superpowers/plans/2026-08-07-dominion-markets-wireframes.md` is this file (already saved)

**Interfaces:**
- Consumes: completed wireframes
- Produces: README “Next plans” section pointing to hi-fi mockups then production

- [ ] **Step 1: Append next-steps to README**

Add to `wireframes/README.md`:

```markdown
## Next plans (not this plan)

1. **Hi-fi UI mockups** — apply Floating Sanctuary liquid glass, Poppins/Mont, motion prototypes on top of this IA.
2. **Production website** — framework, real chart/video embeds, CMS/hosting, SEO, legal review.
```

- [ ] **Step 2: Final checker run**

Run: `node wireframes/wireframe-check.mjs`  
Expected: PASS

- [ ] **Step 3: Commit**

```bash
git add wireframes/README.md docs/superpowers/plans/2026-08-07-dominion-markets-wireframes.md
git commit -m "docs: add wireframes implementation plan and next-phase notes"
```

---

## Spec coverage self-check

| Spec requirement | Task |
| --- | --- |
| 13-section IA | Tasks 2–4 |
| Hero without stats | Task 2 + checker |
| Chart slots (markets, copy trading) | Tasks 3–4 + checker |
| Video slots (platforms, dashboard) | Tasks 3–4 + checker |
| Account types + facts | Task 3 |
| Licence numbers + risk disclaimer | Task 4 + checker |
| No hype language | Checker bans |
| HTML wireframes, no Figma | All tasks under `wireframes/` |
| Brand navy/green tokens | Task 1 CSS |
| Hi-fi + production deferred | Task 5 + Architecture |

## Follow-on plans (separate documents later)

- `docs/superpowers/plans/YYYY-MM-DD-dominion-markets-hifi-mockups.md`
- `docs/superpowers/plans/YYYY-MM-DD-dominion-markets-production-site.md`
)
