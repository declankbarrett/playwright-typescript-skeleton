import { test as base, request as baseRequest, APIRequestContext } from '@playwright/test';
import { env } from '../config/env';
import { loadTestData } from '../utils/testDataLoader';

interface UserTestData {
  newUserTemplate: {
    name: string;
    surname: string;
    email: string;
    position: string;
  };
  allowedPositions: string[];
}

interface ApiFixtures {
  apiContext: APIRequestContext;
  users: UserTestData;
}

/**
 * Minimal fixture set for the API-contract spec in tests/api/, kept
 * separate from fixtures/testFixtures.ts (UI page objects) because these
 * tests talk directly to the backend's own base URL (API_BASE_URL),
 * not the frontend's BASE_URL used for browser navigation.
 */
export const test = base.extend<ApiFixtures>({
  apiContext: async ({}, use) => {
    const context = await baseRequest.newContext({ baseURL: env.apiBaseUrl });
    await use(context);
    await context.dispose();
  },

  users: async ({}, use) => {
    await use(loadTestData<UserTestData>('users.json'));
  },
});

export { expect } from '@playwright/test';
