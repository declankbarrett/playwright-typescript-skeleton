import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { HomePage } from '../pages/HomePage';
import { loadTestData } from '../utils/testDataLoader';
import { env } from '../config/env';

export interface User {
  username: string;
  password: string;
}

interface UserTestData {
  validUser: User;
  lockedOutUser: User;
  invalidUser: User;
}

/**
 * Custom fixtures extend Playwright's base test with:
 *  - Ready-to-use page objects (avoids repetitive instantiation per test)
 *  - Shared test data
 *  - Common configuration access
 */
interface Fixtures {
  loginPage: LoginPage;
  homePage: HomePage;
  users: UserTestData;
  config: typeof env;
}

export const test = base.extend<Fixtures>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },

  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },

  users: async ({}, use) => {
    await use(loadTestData<UserTestData>('users.json'));
  },

  config: async ({}, use) => {
    await use(env);
  },
});

export { expect } from '@playwright/test';
