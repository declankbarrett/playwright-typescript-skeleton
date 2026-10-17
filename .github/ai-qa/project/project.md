# Project Context

This is the project-owned Project Context for `playwright-typescript-skeleton`. Only `qa-configure` writes this file, after an L5 diff preview and explicit approval. Keep this section (what the project is) distinct from `conventions/*.md` (how AI-QA operates on it). Never include credentials or secret values.

<!-- ai-qa:managed:summary -->
## Summary

A clean, modern Playwright + TypeScript UI test automation framework skeleton, built for onboarding and training rather than as an enterprise framework. Repository: `declankbarrett/playwright-typescript-skeleton` (public, GitHub). Owned by a single maintainer. Example tests run against the public demo app `saucedemo.com`, so the suite works immediately after cloning with no app setup required. Principal user journeys exercised: application load, login, logout, navigation and login-field validation.

**Confidence:** High
**Sources:** README.md:1-30; package.json:1-20; playwright.config.ts:1-40
<!-- /ai-qa:managed:summary -->

<!-- ai-qa:user -->
<Project-authored context. Configure preserves this section verbatim on refresh.>
<!-- /ai-qa:user -->

<!-- ai-qa:managed:components -->
## Components

| Component | Type | Path | Tech | Purpose |
|---|---|---|---|---|
| Test suite | test automation | `tests/` | Playwright Test + TypeScript | Smoke and functional UI specs |
| Page objects | library | `pages/` | TypeScript | Page Object Model (`BasePage`, `LoginPage`, `HomePage`) |
| Fixtures | library | `fixtures/testFixtures.ts` | TypeScript | Extends Playwright `test` with page objects and test data |
| Config loader | library | `config/env.ts` | TypeScript | Reads/validates `BASE_URL`, `BROWSER`, `HEADLESS`, `TIMEOUT` |
| Test data | data | `test-data/users.json` | JSON | Example user credentials, loaded via `utils/testDataLoader.ts` |

**Confidence:** High
**Sources:** README.md:70-85; pages/, fixtures/, config/env.ts, test-data/
<!-- /ai-qa:managed:components -->

<!-- ai-qa:user -->
<Project-authored component notes. Configure preserves this section verbatim on refresh.>
<!-- /ai-qa:user -->

<!-- ai-qa:managed:technology-stack -->
## Technology stack

Playwright `@playwright/test` `^1.48.0`, TypeScript `^5.5.0`, Node.js `>=18` (LTS 20.x recommended), `dotenv`/`dotenv-cli` for per-environment configuration. No linter/formatter config present (no ESLint/Prettier files found).

**Confidence:** High
**Sources:** package.json:16-20; README.md:33-36; tsconfig.json:1-20
<!-- /ai-qa:managed:technology-stack -->

<!-- ai-qa:user -->
<Project-authored stack notes. Configure preserves this section verbatim on refresh.>
<!-- /ai-qa:user -->

<!-- ai-qa:managed:environments -->
## Environments

Three named environments, selected via `dotenv-cli` before Playwright starts: `local` (`.env.local`), `int` (`.env.int`), `qa` (`.env.qa`). CI runs against `int`. No staging/production environment is defined; the public demo app is reused across all three.

**Confidence:** High
**Sources:** package.json:7-10 (`test:local`, `test:int`, `test:qa`); .github/workflows/playwright.yml:23-24; README.md "Environment Configuration"
<!-- /ai-qa:managed:environments -->

<!-- ai-qa:user -->
<Project-authored environment notes. Configure preserves this section verbatim on refresh.>
<!-- /ai-qa:user -->

<!-- ai-qa:managed:data-stores-and-external-dependencies -->
## Data stores and external dependencies

No database, cache, queue or internal service dependency. The only external dependency is the public demo application `https://www.saucedemo.com`, used as a stand-in "application under test."

**Confidence:** High
**Sources:** config/env.ts:21 (`BASE_URL` default `https://www.saucedemo.com`); README.md:28-30
<!-- /ai-qa:managed:data-stores-and-external-dependencies -->

<!-- ai-qa:user -->
<Project-authored dependency notes. Configure preserves this section verbatim on refresh.>
<!-- /ai-qa:user -->

<!-- ai-qa:managed:ci-cd -->
## CI/CD

Single GitHub Actions workflow `.github/workflows/playwright.yml`, triggered on push/PR to `main` and manual `workflow_dispatch`. Steps: checkout, Node 20 setup, `npm ci`, `npx playwright install --with-deps`, `npm run test:int`, then uploads the HTML report and `test-results/` (traces/screenshots/videos) as artefacts (14-day retention), always.

**Confidence:** High
**Sources:** .github/workflows/playwright.yml:1-41
<!-- /ai-qa:managed:ci-cd -->

<!-- ai-qa:user -->
<Project-authored CI/CD notes. Configure preserves this section verbatim on refresh.>
<!-- /ai-qa:user -->

<!-- ai-qa:managed:test-landscape -->
## Test landscape

Single test level: Playwright browser E2E, pack `playwright-ts`. Two scopes: `tests/smoke/` (3 specs — app-loads, login, logout) and `tests/functional/` (2 specs — navigation, login-validation). All specs import `test`/`expect` from `fixtures/testFixtures.ts`. No tag convention, no base test classes beyond the shared fixture extension. Assertions use Playwright's web-first `expect` API. No unit or API test level exists in this skeleton.

**Confidence:** High (read all 5 existing spec files)
**Sources:** tests/smoke/*.spec.ts, tests/functional/*.spec.ts, fixtures/testFixtures.ts
<!-- /ai-qa:managed:test-landscape -->

<!-- ai-qa:user -->
<Project-authored testing notes. Configure preserves this section verbatim on refresh.>
<!-- /ai-qa:user -->

<!-- ai-qa:managed:constraints -->
## Constraints

Never commit `.env` or `.env.*.local` files (gitignored; `.env.local`/`.env.int`/`.env.qa` in the repo hold only non-secret example values). No custom "Do Not" rules beyond the framework's standard safety rules were identified or requested (confirmed with the user during configuration — no project-specific constraints beyond safety.md).

**Confidence:** High
**Sources:** .gitignore:9-11; user confirmation, 2026-10-17
<!-- /ai-qa:managed:constraints -->

<!-- ai-qa:user -->
<Project-authored constraints. Configure preserves this section verbatim on refresh.>
<!-- /ai-qa:user -->

<!-- ai-qa:managed:documentation-sources -->
## Documentation sources

`README.md` is the only documentation source (framework overview, structure, commands, environment configuration). No Confluence, Azure Wiki or other remote documentation system is configured; confirmed with the user (repo docs only).

**Confidence:** High
**Sources:** README.md; bounded repository search for ADRs/docs/ confirmed none found; user confirmation, 2026-10-17
<!-- /ai-qa:managed:documentation-sources -->

<!-- ai-qa:user -->
<Project-authored documentation notes. Configure preserves this section verbatim on refresh.>
<!-- /ai-qa:user -->

<!-- ai-qa:managed:unknowns-and-conflicts -->
## Unknowns and conflicts

- Branch protection on `main` could not be checked: no branch-protection read tool was available in this session (`?`).
- Git/PR conventions have a very thin sample: 1 commit total and 0 pull requests exist, so commit style and PR title pattern were resolved by matching currently observed practice rather than inferring a strict rule (user confirmed, 2026-10-17).

**Confidence:** Medium (thin evidence, explicitly flagged)
**Sources:** `git log --oneline`; GitHub PR/issue listing (0 results, 2026-10-17); user interview, 2026-10-17
<!-- /ai-qa:managed:unknowns-and-conflicts -->

<!-- ai-qa:user -->
<Project-authored unknowns/conflicts notes. Configure preserves this section verbatim on refresh.>
<!-- /ai-qa:user -->

<!-- ai-qa:managed:provenance -->
## Provenance

Discovery performed by `qa-configure` on branch `feature/configure-ai-tool` at commit `2af3ecb` ("Adding skeleton to repo"), observed 2026-10-17. Confirmed via a 6-question Option-A interview (git/PR conventions, scenario format, work-item system, documentation system, project constraints, GitHub transport persistence). Approved by the user on 2026-10-17 for the exact file list previewed.

**Confidence:** High
**Sources:** `.github/ai-qa/project/discovery.md`; interview transcript, 2026-10-17
<!-- /ai-qa:managed:provenance -->

<!-- ai-qa:user -->
<Project-authored provenance notes. Configure preserves this section verbatim on refresh.>
<!-- /ai-qa:user -->
