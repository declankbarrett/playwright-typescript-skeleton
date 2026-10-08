# Testing conventions

## Scopes

| Test path | Level | Pack | Location | Naming | Fixtures/builders | Tags | Base classes | Assertions | Status | Evidence/source |
|---|---|---|---|---|---|---|---|---|---|---|
| `tests/smoke/**/*.spec.ts` | E2E (smoke) | playwright-ts | `tests/smoke/` | `<feature>.spec.ts`; `describe('Smoke: <Feature>')` | `fixtures/testFixtures.ts` (`loginPage`, `homePage`, `users`, `config`); POM in `pages/` (`BasePage`, `LoginPage`, `HomePage`) | None observed | `test` extended from `@playwright/test` via `testFixtures.ts` | Web-first `await expect(...)`, e.g. `toBeTruthy()`, `toBe()` | ✓ | tests/smoke/login.spec.ts; tests/smoke/logout.spec.ts; tests/smoke/app-loads.spec.ts (3/3 sampled) |
| `tests/functional/**/*.spec.ts` | E2E (functional) | playwright-ts | `tests/functional/` | `<feature>.spec.ts`; `describe('Functional: <Feature>')` | Same as above | None observed | Same as above | Same as above | ✓ | tests/functional/login-validation.spec.ts; tests/functional/navigation.spec.ts (2/2 sampled) |

## Commands

| Command kind | Command / selector | Status | Evidence/source |
|---|---|---|---|
| All | `npm test` | ✓ | package.json L7 |
| Path | `npx playwright test "<path>"` | ✓ | README.md "Creating New Tests" |
| Env-scoped | `npm run test:local` / `test:int` / `test:qa` | ✓ | package.json L8–10 |
| Subset | `npm run test:smoke` (tests/smoke) / `npm run test:functional` (tests/functional) | ✓ | package.json L11–12 |
| Lint/compile | `npm run typecheck` (`tsc --noEmit`) | ✓ | package.json L16 |
| List/help | `npx playwright test --list` | ◐ | Standard Playwright CLI; not explicitly documented in README |

## Reports

| Format | Path | Coverage source | Status | Evidence/source |
|---|---|---|---|---|
| HTML (built-in, `open: never`) | `playwright-report/` | None (no coverage tooling) | ✓ | playwright.config.ts L18 |

## Environments and base URLs

| Environment | Purpose / allowed use | Base URL variable name | Other variable names | Status | Evidence/source |
|---|---|---|---|---|---|
| `local` | Developer machine runs (`.env.local`) | `BASE_URL` | `BROWSER`, `HEADLESS`, `TIMEOUT` | ✓ | config/env.ts; README.md "Environment Configuration" |
| `int` | CI default (`.env.int`, used by `playwright.yml`) | `BASE_URL` | `BROWSER`, `HEADLESS`, `TIMEOUT` | ✓ | .github/workflows/playwright.yml L23–24 |
| `qa` | Manual/QA runs (`.env.qa`) | `BASE_URL` | `BROWSER`, `HEADLESS`, `TIMEOUT` | ✓ | package.json L10 |

Allowed test target in all environments: the public demo app `https://www.saucedemo.com` (default `BASE_URL` fallback). No project-owned staging/production environment exists.

## Test data rules

| Rule | Value | Status | Evidence/source |
|---|---|---|---|
| Ownership, source and permitted data | JSON fixtures under `test-data/` (e.g. `users.json`), loaded via `utils/testDataLoader.ts`; synthetic saucedemo demo credentials only, no real PII | ✓ | test-data/ (observed), utils/testDataLoader.ts |
| Fixture naming, isolation and cleanup | No isolation/cleanup rule found — demo app is stateless/public and requires none | ∅ | — |
| Retention/privacy constraints | None beyond standard `.gitignore` exclusion of real `.env` values | ✓ | .gitignore L10–13 |

## Manual testing ownership

| Behaviour / level | Owner | Evidence/status | Source |
|---|---|---|---|
| No separate unit/integration layer exists; all automated coverage is E2E | N/A | ∅ | Repo contains only `tests/smoke` and `tests/functional` |

Unit tests are developer-owned unless project evidence says otherwise (none exist here). Apply `method/dedup-rule.md` to avoid duplicate manual scenarios.
