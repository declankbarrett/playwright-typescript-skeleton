# Project Context

<!-- ai-qa:managed:summary -->
## Summary

Playwright + TypeScript skeleton automation framework for onboarding/training (not a product repo). Tests exercise the public demo app https://www.saucedemo.com — no application code or backend owned by this repository.

**Confidence:** High
**Sources:** README.md L1–30; package.json; config/env.ts L1–23
<!-- /ai-qa:managed:summary -->

<!-- ai-qa:user -->
<!-- /ai-qa:user -->

<!-- ai-qa:managed:components -->
## Components

| Component | Type | Path | Tech | Purpose |
|---|---|---|---|---|
| Playwright test skeleton | Test automation framework | `/` (repo root) | Playwright + TypeScript, Node.js | Demonstrates POM, fixtures, env config, JSON test data against saucedemo.com |

**Confidence:** High
**Sources:** README.md L1–90
<!-- /ai-qa:managed:components -->

<!-- ai-qa:user -->
<!-- /ai-qa:user -->

<!-- ai-qa:managed:technology-stack -->
## Technology stack

TypeScript ^5.5.0, `@playwright/test` ^1.48.0, Node.js (>=18 per README, 20.x in CI), `dotenv`/`dotenv-cli` ^16.4.5/^7.4.2, npm package manager, `tsconfig.json` (ES2021, strict, path aliases `@pages/*`, `@fixtures/*`, `@utils/*`, `@config/*`, `@test-data/*`).

**Confidence:** High
**Sources:** package.json L1–22; tsconfig.json L1–22; .github/workflows/playwright.yml L13–15
<!-- /ai-qa:managed:technology-stack -->

<!-- ai-qa:user -->
<!-- /ai-qa:user -->

<!-- ai-qa:managed:environments -->
## Environments

`local` (`.env.local`), `int` (`.env.int`, used by CI), `qa` (`.env.qa`), selected via `dotenv-cli` before Playwright starts. Test target in all environments is the public demo app saucedemo.com; no project-owned staging/production environment exists.

**Confidence:** High
**Sources:** README.md "Environment Configuration"; playwright.yml L23–24; config/env.ts
<!-- /ai-qa:managed:environments -->

<!-- ai-qa:user -->
<!-- /ai-qa:user -->

<!-- ai-qa:managed:data-stores-and-external-dependencies -->
## Data stores and external dependencies

None. Sole external dependency is the public demo site saucedemo.com; no database, queue, or third-party API contract found.

**Confidence:** High
**Sources:** Bounded search of repo root — ∅ no manifests/IaC/compose found
<!-- /ai-qa:managed:data-stores-and-external-dependencies -->

<!-- ai-qa:user -->
<!-- /ai-qa:user -->

<!-- ai-qa:managed:ci-cd -->
## CI/CD

GitHub Actions workflow `.github/workflows/playwright.yml` ("Playwright Tests"): triggers on push/PR to `main` and `workflow_dispatch`; installs deps (`npm ci`), installs browsers, runs `npm run test:int`, uploads `playwright-report/` and `test-results/` as artifacts (14-day retention).

**Confidence:** High
**Sources:** .github/workflows/playwright.yml L1–40
<!-- /ai-qa:managed:ci-cd -->

<!-- ai-qa:user -->
<!-- /ai-qa:user -->

<!-- ai-qa:managed:test-landscape -->
## Test landscape

E2E only, Playwright Test runner. `tests/smoke/*.spec.ts` (3 files: app-loads, login, logout) and `tests/functional/*.spec.ts` (2 files: navigation, login-validation). Page Object Model in `pages/` (`BasePage`, `LoginPage`, `HomePage`). Custom fixtures in `fixtures/testFixtures.ts` (`loginPage`, `homePage`, `users`, `config`). JSON test data in `test-data/users.json` via `utils/testDataLoader.ts`. No unit/integration test layer exists.

**Confidence:** High (5/5 spec files read)
**Sources:** tests/smoke/*.spec.ts; tests/functional/*.spec.ts; fixtures/testFixtures.ts L1–45
<!-- /ai-qa:managed:test-landscape -->

<!-- ai-qa:user -->
<!-- /ai-qa:user -->

<!-- ai-qa:managed:constraints -->
## Constraints

Built-in HTML reporter only — "no third-party reporting tools" by design. `.env*` real values are git-ignored (`.gitignore` L11–12); only variable names (`BASE_URL`, `BROWSER`, `HEADLESS`, `TIMEOUT`) are tracked. No work-item provider is configured (confirmed with user — `jira.md` is a one-off sample ticket, not a live integration). Generated test code must follow this repo's existing Playwright conventions (POM + fixtures + `*.spec.ts`), regardless of manual scenario format.

**Confidence:** High
**Sources:** playwright.config.ts L18; .gitignore L10–13; user confirmation 2026-10-08
<!-- /ai-qa:managed:constraints -->

<!-- ai-qa:user -->
<!-- /ai-qa:user -->

<!-- ai-qa:managed:documentation-sources -->
## Documentation sources

README.md is the sole documentation root; no `docs/` folder, ADRs, or wiki exists.

**Confidence:** High
**Sources:** Repo root listing
<!-- /ai-qa:managed:documentation-sources -->

<!-- ai-qa:user -->
<!-- /ai-qa:user -->

<!-- ai-qa:managed:unknowns-and-conflicts -->
## Unknowns and conflicts

None outstanding — all Configure interview questions were resolved on 2026-10-08 (work-item provider, scenario format, git/PR defaults, remaining framework defaults).

**Confidence:** High
**Sources:** Configure session 2026-10-08
<!-- /ai-qa:managed:unknowns-and-conflicts -->

<!-- ai-qa:user -->
<!-- /ai-qa:user -->

<!-- ai-qa:managed:provenance -->
## Provenance

Discovery performed on branch `feature/testing-ai-tool`, commit `2af3ecb`, observed 2026-10-08. Approved via Configure chat interview (4 questions, all Option A).

**Confidence:** High
**Sources:** git log; Configure session 2026-10-08
<!-- /ai-qa:managed:provenance -->

<!-- ai-qa:user -->
<!-- /ai-qa:user -->
