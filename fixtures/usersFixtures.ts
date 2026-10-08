import { test as base, APIRequestContext, request } from '@playwright/test';
import { UsersListPage } from '../pages/UsersListPage';
import { loadTestData } from '../utils/testDataLoader';

/**
 * usersFixtures - SCAFFOLD ONLY (work item: adhoc-20261008-users-search-filter).
 *
 * Kept separate from `fixtures/testFixtures.ts` so this scaffold never
 * touches the existing, working saucedemo.com fixtures. There is no real
 * `USERS_APP_BASE_URL` in any .env file in this repository - every spec
 * using this fixture file conditionally skips itself (see
 * `usersAppBaseUrl` below) rather than failing against a non-existent app.
 */

export interface SeedUser {
  name: string;
  surname: string;
  email: string;
  position: string;
}

interface UsersSearchFilterTestData {
  seedUsers: SeedUser[];
  disposableRemoveUser: SeedUser;
  noMatchSearchTerm: string;
  injectionPayloads: string[];
}

interface UsersFixtures {
  usersListPage: UsersListPage;
  usersApiContext: APIRequestContext;
  usersAppBaseUrl: string | undefined;
  usersTestData: UsersSearchFilterTestData;
}

export const test = base.extend<UsersFixtures>({
  // Not a real environment - undefined unless a consumer explicitly sets
  // USERS_APP_BASE_URL (e.g. once pointed at the real application).
  usersAppBaseUrl: async ({}, use) => {
    await use(process.env.USERS_APP_BASE_URL);
  },

  usersListPage: async ({ page }, use) => {
    await use(new UsersListPage(page));
  },

  usersApiContext: async ({ usersAppBaseUrl }, use) => {
    const context = await request.newContext({
      baseURL: usersAppBaseUrl ?? 'http://usersapp.invalid',
    });
    await use(context);
    await context.dispose();
  },

  usersTestData: async ({}, use) => {
    await use(loadTestData<UsersSearchFilterTestData>('users-search-filter.json'));
  },
});

export { expect } from '@playwright/test';
