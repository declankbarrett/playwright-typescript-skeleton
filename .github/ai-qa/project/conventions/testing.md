# Testing conventions

Rendered by `qa-configure` after discovery and L5 approval, 2026-10-17.

## Scopes

| Test path | Level | Pack | Location | Naming | Fixtures/builders | Tags | Base classes | Assertions | Status | Evidence/source |
|---|---|---|---|---|---|---|---|---|---|---|
| Smoke | Browser E2E | `playwright-ts` | `tests/smoke/` | `<feature>.spec.ts` | `fixtures/testFixtures.ts` (`loginPage`, `homePage`, `users`) | None | `pages/BasePage.ts` subclasses | Web-first `expect(...)` | ✓ | tests/smoke/*.spec.ts (3/3 read) |
| Functional | Browser E2E | `playwright-ts` | `tests/functional/` | `<feature>.spec.ts` | `fixtures/testFixtures.ts` | None | `pages/BasePage.ts` subclasses | Web-first `expect(...)` | ✓ | tests/functional/*.spec.ts (2/2 read) |

## Commands

| Command kind | Command / selector | Status | Evidence/source |
|---|---|---|---|
| All | `npm test` (default env) / `npm run test:local`\|`test:int`\|`test:qa` for a specific environment | ✓ | package.json:7-10 |
| Path | `npx playwright test tests/functional/<file>.spec.ts` | ✓ | README.md "Creating New Tests" step 4 |
| Tag | Not configured | ∅ | No tag/grep convention observed |
| Lint/compile | `npm run typecheck` (`tsc --noEmit`) | ✓ | package.json:14 |
| List/help | `npx playwright test --list` (documented Playwright CLI; not run) | ◐ | Standard Playwright CLI help; not exercised during discovery |

## Reports

| Format | Path | Coverage source | Status | Evidence/source |
|---|---|---|---|---|
| HTML (built-in Playwright reporter, `open: never`) | `playwright-report/` | None — pass/fail per test only, no code-coverage instrumentation | ✓ | playwright.config.ts:24; .github/workflows/playwright.yml:28-34 (CI artefact upload) |

## Environments and base URLs

| Environment | Purpose / allowed use | Base URL variable name | Other variable names | Status | Evidence/source |
|---|---|---|---|---|---|
| local | Local development runs | `BASE_URL` | `BROWSER`, `HEADLESS`, `TIMEOUT` | ✓ | .env.local; config/env.ts:21-24 |
| int | CI default run target | `BASE_URL` | `BROWSER`, `HEADLESS`, `TIMEOUT` | ✓ | .env.int; .github/workflows/playwright.yml:26 |
| qa | Manual/optional run target | `BASE_URL` | `BROWSER`, `HEADLESS`, `TIMEOUT` | ✓ | .env.qa |

All three point at the public demo app `saucedemo.com` by default; no real staging/production target exists in this skeleton.

## Test data rules

| Rule | Value | Status | Evidence/source |
|---|---|---|---|
| Ownership, source and permitted data | Static JSON fixtures in `test-data/` (e.g. `users.json`), loaded via `utils/testDataLoader.ts` `loadTestData<T>()` | ✓ | README.md "Test data"; test-data/, utils/testDataLoader.ts |
| Fixture naming, isolation and cleanup | No isolation/cleanup convention needed — data is static and read-only | ✓ | Same as above; no DB/state to clean up |
| Retention/privacy constraints | No real user data; demo credentials only; never commit real secrets (`.env*` gitignored) | ✓ | .gitignore:9-11 |

## Manual testing ownership

| Behaviour / level | Owner | Evidence/status | Source |
|---|---|---|---|
| No manual testing process documented; all current coverage is automated E2E | N/A | ∅ | No manual test docs/process found |

Apply `method/dedup-rule.md` to avoid duplicate manual scenarios against the existing automated smoke/functional suite.
