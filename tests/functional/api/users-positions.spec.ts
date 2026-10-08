import { test, expect } from '../../../fixtures/usersFixtures';

/**
 * SCAFFOLD ONLY — work item adhoc-20261008-users-search-filter.
 *
 * Covers jira.md FR4 / NFR3 (new `GET /users/positions` endpoint). No real
 * backend exists in this repository — see
 * qa-work/adhoc-20261008-users-search-filter/context.md. Conditionally
 * skipped unless USERS_APP_BASE_URL is set.
 *
 * Design source: qa-work/adhoc-20261008-users-search-filter/design.md
 * (scenario S5, API half).
 */
test.describe('Functional API: GET /users/positions', () => {
  test.beforeEach(({ usersAppBaseUrl }) => {
    test.skip(!usersAppBaseUrl, 'Requires USERS_APP_BASE_URL — no real Users API exists in this repository.');
  });

  // Covers: FR4, NFR3
  test('returns each distinct position exactly once, sorted alphabetically', async ({
    usersApiContext,
    usersTestData,
  }) => {
    const response = await usersApiContext.get('/users/positions');
    expect(response.status()).toBe(200);

    const positions = (await response.json()) as string[];
    const expectedDistinct = [...new Set(usersTestData.seedUsers.map((u) => u.position))].sort();

    expect(positions).toEqual(expectedDistinct);
    expect(new Set(positions).size).toBe(positions.length); // no duplicates
  });
});
