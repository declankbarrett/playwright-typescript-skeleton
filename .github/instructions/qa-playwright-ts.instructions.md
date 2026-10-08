---
name: Playwright + TypeScript test conventions
description: Best practices for Playwright tests written in TypeScript.
applyTo: "tests/**/*.spec.ts"
---

# Playwright + TypeScript — test conventions

> Rendered by `qa-configure` for this project's selected test paths (`tests/smoke/**/*.spec.ts`, `tests/functional/**/*.spec.ts`). The project's `.github/ai-qa/project/conventions/testing.md` and neighbouring tests take precedence over this pack guidance (precedence: user instruction > project conventions > neighbouring code > pack > framework defaults).

## Locators
- Prefer user-facing, role-based locators: `getByRole`, `getByLabel`, `getByPlaceholder`, `getByText`.
- Avoid CSS/XPath and `nth()` chains — they break on markup changes. Use `getByTestId` only when no accessible handle exists.
- Store locators in variables; do not use the legacy `page.$` / `page.waitForSelector`.

## Waiting & synchronisation
- Never use `page.waitForTimeout()` (a hard sleep). Playwright auto-waits for actionability.
- Use web-first assertions that auto-retry: `await expect(locator).toBeVisible()`, `toHaveText`, `toHaveURL`.
- To wait for a specific condition use `waitForResponse` / `waitForLoadState`, never an arbitrary delay.

## Assertions
- Always `await expect(...)`. Prefer locator assertions over reading a value and then asserting on it.
- Assert on user-visible outcomes, not implementation detail.

## Structure & fixtures
- Group with `test.describe` using this project's naming: `describe('Smoke: <Feature>')` / `describe('Functional: <Feature>')`.
- Use the project's existing fixtures from `fixtures/testFixtures.ts` (`loginPage`, `homePage`, `users`, `config`) rather than inventing new ones unless a new page/feature genuinely needs one.
- Use Page Object Model classes from `pages/` extending `BasePage`; add new page objects there for new pages/features.
- Load test data via `utils/testDataLoader.ts` (`loadTestData<T>('<file>.json')`) with JSON under `test-data/`.
- Every test must run independently and in parallel.

## Network
- Mock or stub with `page.route`; assert backend calls with the `request` fixture, if/when API-level tests are introduced.

## Config
- `baseURL`, `trace: 'on-first-retry'`, `retries` and environment selection are already configured in `playwright.config.ts` and `config/env.ts` (`BASE_URL`, `BROWSER`, `HEADLESS`, `TIMEOUT`) — do not duplicate or override these per-test.

## Anti-patterns
- No `waitForTimeout`, no CSS/XPath selectors, no shared mutable state, no `console.log` noise, no secrets in specs, no third-party reporters (this project uses the built-in HTML reporter only).
