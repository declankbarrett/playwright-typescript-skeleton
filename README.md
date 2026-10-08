# Playwright TypeScript Skeleton Framework

A clean, modern starting point for UI test automation using **Playwright** and
**TypeScript**. Built for onboarding, training, and bootstrapping new
automation projects — not as a fully-featured enterprise framework.

## Framework Overview

**Purpose:** Provide a simple, well-structured Playwright framework that
demonstrates industry best practices (Page Object Model, fixtures,
environment configuration, JSON test data, CI/CD reporting) without
unnecessary complexity.

**Technology stack:**
- [Playwright](https://playwright.dev/) + Playwright Test Runner
- TypeScript
- Node.js
- dotenv / dotenv-cli (environment configuration)

**Design goals:**
- Simple and easy to understand
- Follows modern Playwright best practices (web-first assertions, auto-waiting
  locators, fixtures)
- Suitable for onboarding and training
- Easy to extend as project needs evolve
- Minimal third-party dependencies — relies on Playwright's built-in features
  (HTML reporting, tracing, screenshots) wherever possible

The example tests run against the public demo app
[saucedemo.com](https://www.saucedemo.com), so the suite works immediately
after cloning — no app setup required.

## Prerequisites

- Node.js >= 18 (LTS recommended, e.g. 20.x)
- npm >= 9

## Installation

```bash
# Clone the repository
git clone <repo-url>
cd playwright-typescript-skeleton

# Install dependencies
npm install

# Install Playwright browsers
npx playwright install
```

## Running Tests

```bash
npm test              # Run all tests using default Playwright config
npm run test:local    # Run against the "local" environment (.env.local)
npm run test:int      # Run against the "int" environment (.env.int)
npm run test:qa       # Run against the "qa" environment (.env.qa)

npm run test:smoke       # Run only smoke tests
npm run test:functional  # Run only functional tests
npm run test:headed      # Run with a visible browser window

npx playwright show-report   # View the last HTML report
```

## Framework Structure

```
playwright-typescript-skeleton
│
├── .github/workflows/     # CI/CD pipeline (GitHub Actions)
├── config/                # Environment configuration loader (env.ts)
├── pages/                 # Page Object Model classes
├── tests/
│   ├── smoke/              # Smoke tests (critical-path checks)
│   └── functional/         # Functional tests (feature-level checks)
├── fixtures/               # Custom Playwright fixtures (shared setup)
├── utils/                  # Shared helpers (e.g. test data loader)
├── test-data/              # JSON test data files
├── playwright.config.ts    # Playwright Test Runner configuration
├── package.json
├── tsconfig.json
├── .env.local / .env.int / .env.qa   # Per-environment configuration
└── .gitignore
```

| Path | Purpose |
|---|---|
| `config/env.ts` | Reads and validates environment variables (`BASE_URL`, `BROWSER`, `HEADLESS`, `TIMEOUT`) |
| `pages/BasePage.ts` | Common reusable methods (`navigate`, `click`, `fill`, `getText`, `isVisible`) |
| `pages/LoginPage.ts` | Page object for the login flow |
| `pages/HomePage.ts` | Page object for the post-login products page |
| `fixtures/testFixtures.ts` | Extends Playwright's `test` with ready-to-use page objects and test data |
| `utils/testDataLoader.ts` | Lightweight JSON test data loader |
| `test-data/users.json` | Example user credentials used across tests |
| `tests/smoke` | App loads, login, logout, home page checks |
| `tests/functional` | Navigation and login validation examples |

## Creating New Tests

1. **Create a page object** in `pages/` extending `BasePage`, encapsulating
   locators and actions for a single page/feature.
2. **Create a test file** under `tests/smoke` or `tests/functional` (or a new
   subfolder), importing `test`/`expect` from `fixtures/testFixtures`.
3. **Manage test data** by adding JSON files to `test-data/` and loading them
   via `loadTestData<T>('your-file.json')`, or by adding a new fixture in
   `fixtures/testFixtures.ts`.
4. **Run your tests** with `npm run test:local` (or target a specific file:
   `npx playwright test tests/functional/your-test.spec.ts`).

## Playwright Features

- **Run in different browsers:** configured as projects (`chromium`,
  `firefox`, `edge`) in `playwright.config.ts`.
  ```bash
  npx playwright test --project=firefox
  npx playwright test --project=edge
  ```
- **View the HTML report:** `npx playwright show-report`
- **View traces:** traces are captured `on-first-retry`. Open a trace with:
  ```bash
  npx playwright show-trace test-results/<test-folder>/trace.zip
  ```
- **Debug failures:**
  ```bash
  npx playwright test --debug
  npx playwright test --ui
  ```

## Environment Configuration

Each environment file (`.env.local`, `.env.int`, `.env.qa`) defines:

```
BASE_URL=   # Application URL under test
BROWSER=    # Default browser (chromium | firefox | edge)
HEADLESS=   # true | false
TIMEOUT=    # Global test timeout in ms
```

`npm run test:<env>` uses `dotenv-cli` to load the matching file before
Playwright starts, so `config/env.ts` and `playwright.config.ts` pick up the
correct values automatically.

## CI/CD

`.github/workflows/playwright.yml` installs dependencies, installs Playwright
browsers, runs the suite against the `int` environment, and publishes the
HTML report and test artifacts (screenshots, videos, traces) on every push and
pull request to `main`.

## Future Enhancements

This skeleton is intentionally minimal. Natural next steps for a growing
project include:

- **API testing** using Playwright's `request` context
- **Authentication state reuse** via `storageState` to skip repeated logins
- **Visual testing** with Playwright's screenshot comparison
- **Component testing** using `@playwright/experimental-ct-*`
- **Advanced fixtures** (e.g. auto-fixtures, worker-scoped fixtures)
- **Parallel execution optimisation** (sharding, test tagging, selective runs)
