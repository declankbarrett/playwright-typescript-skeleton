import { defineConfig, devices } from '@playwright/test';
import { env } from './config/env';

/**
 * Playwright configuration.
 *
 * Environment selection (local / int / qa) is handled by loading the
 * relevant .env file via dotenv-cli before this file is evaluated,
 * e.g. `npm run test:qa` -> `dotenv -e .env.qa -- playwright test`.
 */
export default defineConfig({
  testDir: './tests',
  timeout: env.timeout,
  expect: {
    timeout: 5000,
  },
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  workers: process.env.CI ? 2 : undefined,

  // Built-in HTML reporter only - no third-party reporting tools.
  reporter: [['html', { open: 'never' }]],

  use: {
    baseURL: env.baseUrl,
    headless: env.headless,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'edge',
      use: { ...devices['Desktop Edge'], channel: 'msedge' },
    },
  ],
});
