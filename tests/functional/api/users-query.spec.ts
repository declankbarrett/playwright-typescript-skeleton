import { test, expect } from '../../../fixtures/usersFixtures';

/**
 * SCAFFOLD ONLY — work item adhoc-20261008-users-search-filter.
 *
 * Covers jira.md FR10, FR11 (API). No real backend implements `GET /users`
 * query-parameter filtering in this repository — see
 * qa-work/adhoc-20261008-users-search-filter/context.md. Conditionally
 * skipped unless USERS_APP_BASE_URL is set.
 *
 * Design source: qa-work/adhoc-20261008-users-search-filter/design.md
 * (scenarios S10, S11).
 */
test.describe('Functional API: GET /users query parameters', () => {
  test.beforeEach(({ usersAppBaseUrl }) => {
    test.skip(!usersAppBaseUrl, 'Requires USERS_APP_BASE_URL — no real Users API exists in this repository.');
  });

  // Covers: FR10
  test('neither search nor position returns every user (unchanged legacy behaviour)', async ({
    usersApiContext,
    usersTestData,
  }) => {
    const response = await usersApiContext.get('/users');
    expect(response.status()).toBe(200);

    const body = (await response.json()) as unknown[];
    expect(body.length).toBe(usersTestData.seedUsers.length);
  });

  // Covers: FR10
  test('search only returns users matching the text', async ({ usersApiContext }) => {
    const response = await usersApiContext.get('/users', { params: { search: 'anna' } });
    expect(response.status()).toBe(200);

    const body = (await response.json()) as Array<{ name: string; surname: string; email: string }>;
    expect(
      body.every((u) => `${u.name} ${u.surname} ${u.email}`.toLowerCase().includes('anna')),
    ).toBe(true);
  });

  // Covers: FR10
  test('position only returns users matching that position', async ({ usersApiContext }) => {
    const response = await usersApiContext.get('/users', { params: { position: 'Test Engineer' } });
    expect(response.status()).toBe(200);

    const body = (await response.json()) as Array<{ position: string }>;
    expect(body.every((u) => u.position === 'Test Engineer')).toBe(true);
  });

  // Covers: FR10
  test('search and position together return only the intersection', async ({ usersApiContext }) => {
    const response = await usersApiContext.get('/users', {
      params: { search: 'Jan Kowalski', position: 'Test Engineer' },
    });
    expect(response.status()).toBe(200);

    const body = (await response.json()) as Array<{ name: string; surname: string; position: string }>;
    expect(body.length).toBe(1);
    expect(body[0].position).toBe('Test Engineer');
  });

  // Covers: FR11
  test('a query with no matches returns 200 with an empty array, never 404', async ({
    usersApiContext,
    usersTestData,
  }) => {
    const response = await usersApiContext.get('/users', {
      params: { search: usersTestData.noMatchSearchTerm },
    });

    expect(response.status()).toBe(200);
    expect(await response.json()).toEqual([]);
  });
});
