# Project Context

This is the project-owned `.github/ai-qa/project/project.md`. Only `qa-configure` writes this file, after an L5 diff preview and explicit approval. Keep Project Context (what the project is) distinct from `conventions/*.md` (how AI-QA operates on it). Never include credentials or secret values.

<!-- ai-qa:managed:summary -->
## Summary

A clean, minimal Playwright + TypeScript UI test automation skeleton, intended for onboarding and training. The repository contains only test automation code; the system under test ("Test Application" — a Users/Projects management app) is external and configured via `BASE_URL`. Principal journeys covered: adding users, adding projects, assigning users to projects, and site navigation.

**Confidence:** High
**Sources:** `README.md:1-30`, `fixtures/testFixtures.ts:1-50`, `config/env.ts:1-27`
<!-- /ai-qa:managed:summary -->

<!-- ai-qa:user -->
<Project-authored context. Configure preserves this section verbatim on refresh.>
<!-- /ai-qa:user -->

<!-- ai-qa:managed:components -->
## Components

| Component | Type | Path | Tech | Purpose |
|---|---|---|---|---|
| Page objects | library | `pages/` | TypeScript | Page Object Model classes (`BasePage`, `AddUserPage`, `UsersListPage`, `ViewUserPage`, `ProjectsListPage`, `AddProjectPage`, `ViewProjectPage`, `AddUsersToProjectPage`) |
| Fixtures | library | `fixtures/testFixtures.ts` | TypeScript, `@playwright/test` | Extends Playwright's `test` with ready-to-use page objects and shared JSON test data |
| Config loader | library | `config/env.ts` | TypeScript | Reads/validates `BASE_URL`, `BROWSER`, `HEADLESS`, `TIMEOUT` |
| Test data | data | `test-data/*.json` | JSON | Example users/projects loaded via `utils/testDataLoader.ts` |
| Smoke tests | test suite | `tests/smoke/*.spec.ts` | Playwright Test | App-availability checks |
| Functional tests | test suite | `tests/functional/*.spec.ts` | Playwright Test | Add-project and navigation flows |

**Confidence:** High
**Sources:** `README.md` Framework Structure table; `pages/`, `fixtures/`, `config/`, `test-data/`, `tests/` directory listings
<!-- /ai-qa:managed:components -->

<!-- ai-qa:user -->
<Project-authored component notes. Configure preserves this section verbatim on refresh.>
<!-- /ai-qa:user -->

<!-- ai-qa:managed:technology-stack -->
## Technology stack

- TypeScript 5.5 (`package.json:21`), Node.js ≥18 (README Prerequisites)
- `@playwright/test` ^1.48.0 (`package.json:18`)
- `dotenv` / `dotenv-cli` ^16.4.5 / ^7.4.2 for per-environment configuration (`package.json:19-20`)
- `tsconfig.json`: strict mode, path aliases `@pages/*`, `@fixtures/*`, `@utils/*`, `@config/*`, `@test-data/*`

**Confidence:** High
**Sources:** `package.json:1-25`, `tsconfig.json:1-21`
<!-- /ai-qa:managed:technology-stack -->

<!-- ai-qa:user -->
<Project-authored stack notes. Configure preserves this section verbatim on refresh.>
<!-- /ai-qa:user -->

<!-- ai-qa:managed:environments -->
## Environments

Three environment configurations, selected via `dotenv-cli` before Playwright starts: `local` (`.env.local`), `int` (`.env.int`), `qa` (`.env.qa`). Each defines `BASE_URL`, `BROWSER`, `HEADLESS`, `TIMEOUT` (variable names only; values are environment-specific and untracked beyond the repo's example files). CI (`playwright.yml`) always runs against `int`. User-confirmed default for local/manual runs: `local`.

**Confidence:** High
**Sources:** `package.json:6-9` (`test:local`/`test:int`/`test:qa` scripts), `config/env.ts:1-27`, `.github/workflows/playwright.yml` (`Run tests (int environment)` step), user confirmation (2026-10-13)
<!-- /ai-qa:managed:environments -->

<!-- ai-qa:user -->
<Project-authored environment notes. Configure preserves this section verbatim on refresh.>
<!-- /ai-qa:user -->

<!-- ai-qa:managed:data-stores-and-external-dependencies -->
## Data stores and external dependencies

No application data stores or services exist in this repository — it is test automation only. The system under test is an external application reached via `BASE_URL`; no API contracts (OpenAPI/AsyncAPI) or IaC were found in this repo.

**Confidence:** High
**Sources:** Bounded search of repository root and subdirectories for manifests, compose files and IaC — none found (∅)
<!-- /ai-qa:managed:data-stores-and-external-dependencies -->

<!-- ai-qa:user -->
<Project-authored dependency notes. Configure preserves this section verbatim on refresh.>
<!-- /ai-qa:user -->

<!-- ai-qa:managed:ci-cd -->
## CI/CD

`.github/workflows/playwright.yml`: triggers on push/PR to `main` and `workflow_dispatch`. Steps: checkout, Node 20 setup (npm cache), `npm ci`, `npx playwright install --with-deps`, `npm run test:int`, then uploads `playwright-report/` and `test-results/` as artifacts (always, 14-day retention). No deployment stage.

**Confidence:** High
**Sources:** `.github/workflows/playwright.yml:1-36`
<!-- /ai-qa:managed:ci-cd -->

<!-- ai-qa:user -->
<Project-authored CI/CD notes. Configure preserves this section verbatim on refresh.>
<!-- /ai-qa:user -->

<!-- ai-qa:managed:test-landscape -->
## Test landscape

Playwright Test (TypeScript) only; no other test framework (no Jest/Vitest/Cypress/pytest manifests found). Two scopes: `tests/smoke/*.spec.ts` (app-availability checks) and `tests/functional/*.spec.ts` (add-project, navigation flows). Page Object Model via `pages/`; shared setup via `fixtures/testFixtures.ts` (`test.extend`); JSON test data in `test-data/` loaded via `utils/testDataLoader.ts`. Sampled 4/4 existing spec files — all follow `test.describe('<Smoke|Functional>: <name>', ...)` naming and import `test`/`expect` from `../../fixtures/testFixtures`.

**Confidence:** High
**Sources:** `tests/smoke/app-loads.spec.ts`, `tests/smoke/users-list.spec.ts`, `tests/functional/add-project.spec.ts`, `tests/functional/navigation.spec.ts`; `fixtures/testFixtures.ts:1-98`
<!-- /ai-qa:managed:test-landscape -->

<!-- ai-qa:user -->
<Project-authored testing notes. Configure preserves this section verbatim on refresh.>
<!-- /ai-qa:user -->

<!-- ai-qa:managed:constraints -->
## Constraints

No project-specific "Do Not" rules were found (no CONTRIBUTING, no documented restrictions); user confirmed no constraints beyond the framework defaults in `method/safety.md`. Never commit secret values from `.env.*` files (git-ignored per `.gitignore:9-10`).

**Confidence:** High
**Sources:** Bounded search for CONTRIBUTING/policy docs — none found (∅); `.gitignore:8-10`; user confirmation (2026-10-13)
<!-- /ai-qa:managed:constraints -->

<!-- ai-qa:user -->
<Project-authored constraints. Configure preserves this section verbatim on refresh.>
<!-- /ai-qa:user -->

<!-- ai-qa:managed:documentation-sources -->
## Documentation sources

Repository docs only: `README.md` (framework overview, structure, commands). User confirmed no remote documentation system (no Confluence/Azure Wiki) is in use. `jira.md` at repo root is a single pasted example ticket (not a live integration) used for ad-hoc manual QA work.

**Confidence:** High
**Sources:** `README.md`; `jira.md`; user confirmation (2026-10-13)
<!-- /ai-qa:managed:documentation-sources -->

<!-- ai-qa:user -->
<Project-authored documentation notes. Configure preserves this section verbatim on refresh.>
<!-- /ai-qa:user -->

<!-- ai-qa:managed:unknowns-and-conflicts -->
## Unknowns and conflicts

- `?` Branch protection on `main` could not be checked in this session (no read-only provider tool available). Re-run `@qa-configure refresh` once a GitHub access path for `repo.branch-protection` is available.
- `⚠` `README.md` describes the example tests as running against the public demo app saucedemo.com, but the actual fixtures/page objects (`fixtures/testFixtures.ts`, `pages/AddUserPage.ts`, etc.) target a different app ("Test Application", a Users/Projects manager). Treat the README's SUT description as stale; the page objects and fixtures are authoritative.

**Confidence:** Medium
**Sources:** `README.md:28-30`; `fixtures/testFixtures.ts:1-20`; `tests/smoke/app-loads.spec.ts:6-7` (asserts title `'Test Application'`)
<!-- /ai-qa:managed:unknowns-and-conflicts -->

<!-- ai-qa:user -->
<Project-authored unknowns/conflicts notes. Configure preserves this section verbatim on refresh.>
<!-- /ai-qa:user -->

<!-- ai-qa:managed:provenance -->
## Provenance

Discovered and configured on branch `feature/testing-ai-tool-existing-dev-work`, commit `df9a439aa0cd25ed58318e0f5db23acb7dc7265b`, observed 2026-10-13. Approved by user via `qa-configure` interview and L5 preview approval on 2026-10-13.

**Confidence:** High
**Sources:** `.github/ai-qa/project/discovery.md`; this configuration session
<!-- /ai-qa:managed:provenance -->

<!-- ai-qa:user -->
<Project-authored provenance notes. Configure preserves this section verbatim on refresh.>
<!-- /ai-qa:user -->
