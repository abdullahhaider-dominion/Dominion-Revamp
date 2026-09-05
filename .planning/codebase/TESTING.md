# Testing Patterns

**Analysis Date:** 2026-09-05

## Test Framework

**Runner:**
- Not detected — no Jest, Vitest, Playwright, or Cypress config under the repo
- `web/package.json` scripts: `dev`, `build`, `start`, `lint` only — no `test` script
- DevDependencies include ESLint + TypeScript only; no test runner packages

**Assertion Library:**
- Not applicable until a runner is added

**Run Commands:**
```bash
# Current verification (no unit/e2e suite yet)
cd web && npm run lint          # ESLint (core-web-vitals + typescript)
cd web && npm run build         # Production build / typecheck via Next

# When a runner is introduced, add scripts such as:
# npm test                      # Run unit tests
# npm test -- --watch           # Watch mode
# npm run test:e2e              # E2E (if Playwright added)
```

## Test File Organization

**Location:**
- No `*.test.*`, `*.spec.*`, `__tests__/`, or `e2e/` directories present
- Primary app code lives under `web/src/` — co-locate future unit tests next to modules when introduced

**Naming (prescribed for new tests):**
- Unit: `ModuleName.test.ts` or `module-name.test.ts` alongside source
- Component: `CinematicHero.test.tsx` next to `CinematicHero.tsx`
- E2E: `e2e/*.spec.ts` at `web/` root if Playwright is added

**Structure (target when adding tests):**
```
web/
  src/
    components/
      CinematicHero.tsx
      CinematicHero.test.tsx      # future
      DominionHome.tsx
      DominionHome.test.tsx       # future
    lib/
      mockups-main.js             # prefer extracting pure helpers before unit-testing
    content/
      home-html.ts                # snapshot or smoke only — huge HTML string
  e2e/                            # future Playwright flows
```

## Test Structure

**Suite Organization:**
```typescript
// Prescribed pattern (no existing suites to copy) — Vitest + React Testing Library example
import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { CinematicHero } from "@/components/CinematicHero";

describe("CinematicHero", () => {
  beforeEach(() => {
    // reset DOM / mocks
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("renders primary brand logo with alt text", () => {
    render(<CinematicHero />);
    expect(screen.getAllByAltText("Dominion Markets").length).toBeGreaterThan(0);
  });

  it("toggles mobile drawer aria-expanded on burger click", () => {
    render(<CinematicHero />);
    const burger = screen.getByRole("button", { name: /open menu/i });
    fireEvent.click(burger);
    expect(burger).toHaveAttribute("aria-expanded", "true");
  });
});
```

**Patterns:**
- Use `beforeEach` for per-test setup; avoid shared mutable `beforeAll` state
- Restore mocks in `afterEach`
- Prefer role / label queries (matches existing a11y attributes in `CinematicHero.tsx`)
- Arrange / act / assert; one behavioral focus per test

## Mocking

**Framework:**
- Not in use — prescribe Vitest `vi` or Jest mocks when a runner is added

**Patterns:**
```typescript
// Dynamic mockup init (DominionHome) — mock the vanilla port module
vi.mock("@/lib/mockups-main.js", () => ({
  initDominionMockups: vi.fn(),
  default: vi.fn(),
}));

// Next/Image — stub for unit tests
vi.mock("next/image", () => ({
  default: (props: { alt: string; src: string }) => {
    // eslint-disable-next-line @next/next/no-img-element
    return <img alt={props.alt} src={props.src} />;
  },
}));
```

**What to Mock:**
- `initDominionMockups` / `window` DOM APIs when testing React shells
- `next/image` in component unit tests
- Network / remote avatars (`i.pravatar.cc`, `images.unsplash.com` per `next.config.ts`) in E2E — use fixtures or route interception
- `matchMedia` / `IntersectionObserver` when testing scroll/reveal behavior from `lib/mockups-main.js`

**What NOT to Mock:**
- Pure presentational markup once extracted from `home-html.ts`
- Brand token constants / static `NAV` / `AWARDS` data (assert against real values)
- ESLint / TypeScript compiler (already covered by `lint` / `build`)

## Fixtures and Factories

**Test Data:**
```typescript
// Example factory for nav items if NAV is later exported/tested
function createNavItem(
  overrides?: Partial<{ label: string; href: string }>
) {
  return {
    label: "Markets",
    href: "#markets",
    ...overrides,
  };
}
```

**Location:**
- Not present — add `web/src/test/fixtures/` or inline factories in the test file
- Design reference (not automated tests): `mockups/`, `docs/brand/`, `.cursor/skills/dominion-section-redesign/SKILL.md`
- Large HTML: treat `content/home-html.ts` as a fixture source; prefer section-level extraction before snapshotting the entire string

## Coverage

**Requirements:**
- None enforced — no coverage tooling or CI gates
- No `.github` workflows detected for test runs

**Configuration:**
- Not applicable

**View Coverage:**
```bash
# After adding Vitest (example):
# cd web && npm run test:coverage
# open coverage/index.html
```

**Practical verification today:**
- `npm run lint` — static quality
- `npm run build` — compile + Next type checking
- Manual visual check of Floating Sanctuary sections (desktop + mobile) against `mockups/`

## Test Types

**Unit Tests:**
- Not used
- Highest value targets when introduced:
  - Nav open/close / Escape / scroll-hide behavior in `CinematicHero.tsx`
  - Pure helpers if extracted from `lib/mockups-main.js` (`sessionState`, `pad2`, chart math)
  - `DominionHome` cancel-safe dynamic import effect

**Integration Tests:**
- Not used
- Candidate: page render of `app/page.tsx` with mocked mockup init + hero + HTML mount container

**E2E Tests:**
- Not used
- Candidate flows: load `/`, open mobile menu, follow `#accounts` / `#final-cta` anchors, confirm key sections from `homeHtml` exist (`#proof`, `#funding`, etc.)
- Prefer Playwright if adding E2E; keep demos deterministic (respect `prefers-reduced-motion` paths in mockup JS)

## Common Patterns

**Async Testing:**
```typescript
it("loads mockup init once on mount", async () => {
  const init = vi.fn();
  vi.doMock("@/lib/mockups-main.js", () => ({
    initDominionMockups: init,
    default: init,
  }));
  // render DominionHome and flush effects
  await Promise.resolve();
  expect(init).toHaveBeenCalledTimes(1);
});
```

**Error Testing:**
```typescript
// Guard-clause style from mockups-main — extract then:
it("returns early when canvas is missing", () => {
  expect(() => drawLineChart(null as unknown as HTMLCanvasElement)).not.toThrow();
});
```

**Snapshot Testing:**
- Not used
- Avoid full-page snapshots of `homeHtml` (184k+ character string in `content/home-html.ts`)
- Prefer targeted queries for critical copy/CTA and a11y roles

**Hydration / Strict Mode notes for testers:**
- `reactStrictMode` is disabled in `next.config.ts` because vanilla listeners must init once
- Tests that remount components should expect `window.__dominionMockupsInit` gating — reset the flag in `beforeEach` when testing re-init

---

*Testing analysis: 2026-09-05*
*Update when test patterns change*
