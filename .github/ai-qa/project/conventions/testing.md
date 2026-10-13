# Testing conventions

Configure renders this source into `.github/ai-qa/project/conventions/testing.md` after discovery and L5 approval. Environment-variable names only; never secret values.

## Scopes

| Test path | Level | Pack | Location | Naming | Fixtures/builders | Tags | Base classes | Assertions | Status | Evidence/source |
|---|---|---|---|---|---|---|---|---|---|---|
| `tests/smoke/*.spec.ts` | E2E (smoke) | `playwright-ts` | `tests/smoke/` | `test.describe('Smoke: <area>', ...)` | `fixtures/testFixtures.ts` (`usersListPage`, `projectsListPage`, etc.); POM in `pages/` | None configured | `pages/BasePage.ts` extended by all page objects | Playwright web-first `expect` | ✓ | `tests/smoke/app-loads.spec.ts`, `tests/smoke/users-list.spec.ts` (2/2 sampled) |
| `tests/functional/*.spec.ts` | E2E (functional) | `playwright-ts` | `tests/functional/` | `test.describe('Functional: <area>', ...)` | Same fixtures/POM as smoke; JSON test data via `users`/`projects` fixtures | None configured | `pages/BasePage.ts` | Playwright web-first `expect` | ✓ | `tests/functional/add-project.spec.ts`, `tests/functional/navigation.spec.ts` (2/2 sampled) |

## Commands

| Command kind | Command / selector | Status | Evidence/source |
|---|---|---|---|
| All | `npm test` (default config) or `npm run test:local` (default environment, user-confirmed) | ✓ | `package.json:6-7` |
| Path | `npx playwright test "<path>"` | ✓ | `README.md` "Creating New Tests" section |
| Tag | None configured (no `--grep`/tag convention observed) | ∅ | Bounded search of `package.json` scripts and spec files — none found |
| Lint/compile | `npm run typecheck` (`tsc --noEmit`) | ✓ | `package.json:15` |
| List/help | `npx playwright test --list` | ✓ | Standard Playwright CLI help; not project-specific but safe/read-only |

## Reports

| Format | Path | Coverage source | Status | Evidence/source |
|---|---|---|---|---|
| HTML (built-in Playwright reporter, `open: never`) | `playwright-report/` | No coverage report configured; CI uploads HTML report + `test-results/` (traces/screenshots/videos) as artifacts | ✓ | `playwright.config.ts:17-20`, `.github/workflows/playwright.yml` artifact-upload steps |

## Environments and base URLs

| Environment | Purpose / allowed use | Base URL variable name | Other variable names | Status | Evidence/source |
|---|---|---|---|---|---|
| `local` | Local/manual runs against a locally-running Test Application; **default for AI-QA runs** (user-confirmed) | `BASE_URL` | `BROWSER`, `HEADLESS`, `TIMEOUT` | ✓ | `package.json:8`, `config/env.ts:1-27`, user confirmation 2026-10-13 |
| `int` | CI runs (every push/PR to `main`) | `BASE_URL` | `BROWSER`, `HEADLESS`, `TIMEOUT` | ✓ | `package.json:9`, `.github/workflows/playwright.yml` |
| `qa` | Manual/ad-hoc runs against a QA environment | `BASE_URL` | `BROWSER`, `HEADLESS`, `TIMEOUT` | ✓ | `package.json:10` |

## Test data rules

| Rule | Value | Status | Evidence/source |
|---|---|---|---|
| Ownership, source and permitted data | JSON fixtures in `test-data/*.json` (e.g. `users.json`, `projects.json`), loaded via `utils/testDataLoader.ts`; example/non-sensitive values only | ✓ | `test-data/users.json`, `test-data/projects.json`, `utils/testDataLoader.ts` |
| Fixture naming, isolation and cleanup | New-entity names made unique per run (e.g. `${projects.newProject.name} ${Date.now()}`) to avoid clashing with prior data in a shared environment; no explicit teardown observed | ✓ | `tests/functional/add-project.spec.ts:9-13` (comment + pattern) |
| Retention/privacy constraints | None beyond standard `.gitignore` exclusions (`.env`, `.env.*.local`); no PII in sample data | ✓ | `.gitignore:8-10`, `test-data/*.json` content |

## Manual testing ownership

| Behaviour / level | Owner | Evidence/status | Source |
|---|---|---|---|
| All current coverage is automated (Playwright smoke + functional); no manual test cases or test-management tool found | N/A — no dedicated QA/manual-test owner identified | ∅ | Bounded search for manual test-case documents/templates — none found |

Unit tests are developer-owned unless project evidence says otherwise; none exist in this repo (automation-only). Apply `method/dedup-rule.md` to avoid duplicate manual scenarios against existing automated assertions.
