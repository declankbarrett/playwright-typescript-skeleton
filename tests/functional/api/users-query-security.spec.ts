import { test, expect } from '../../../fixtures/usersFixtures';

/**
 * SCAFFOLD ONLY — work item adhoc-20261008-users-search-filter.
 *
 * SECURITY-SENSITIVE: covers jira.md FR12 / NFR1 / NFR2 — SQL-injection
 * safety of the new `search` query parameter. Kept in its own file (per
 * qa-work/adhoc-20261008-users-search-filter/automation.md) for clear
 * security-suite visibility and because `regression.md` scores this the
 * highest (CRITICAL) risk area in the whole ticket.
 *
 * No real backend exists in this repository to actually execute these
 * payloads against — see
 * qa-work/adhoc-20261008-users-search-filter/context.md. Conditionally
 * skipped unless USERS_APP_BASE_URL is set. When unblocked, this file
 * MUST be run against the real parameterised-query implementation, never
 * a mocked database — mocking would hide exactly the defect this suite
 * exists to catch.
 *
 * Design source: qa-work/adhoc-20261008-users-search-filter/design.md
 * (scenario S12).
 */
test.describe('Functional API: GET /users search — SQL-injection and special-character safety', () => {
  test.beforeEach(({ usersAppBaseUrl }) => {
    test.skip(!usersAppBaseUrl, 'Requires USERS_APP_BASE_URL — no real Users API exists in this repository.');
  });

  // Covers: FR12, NFR1
  test('a classic SQL-injection payload is treated as literal text, not executed', async ({
    usersApiContext,
    usersTestData,
  }) => {
    const payload = usersTestData.injectionPayloads[0]; // "' OR 1=1 --"
    const response = await usersApiContext.get('/users', { params: { search: payload } });

    expect(response.status()).toBe(200);
    const body = (await response.json()) as unknown[];
    // If the payload were executed as SQL ("OR 1=1"), every seed user would
    // be returned; a safe, literal-text match returns none (no user's
    // name/surname/email contains that literal string).
    expect(body.length).toBeLessThan(usersTestData.seedUsers.length);
  });

  // Covers: FR12, NFR2
  test('a literal "%" is escaped and matched literally, not as an SQL wildcard', async ({
    usersApiContext,
    usersTestData,
  }) => {
    const payload = usersTestData.injectionPayloads[1]; // "%"
    const response = await usersApiContext.get('/users', { params: { search: payload } });

    expect(response.status()).toBe(200);
    const body = (await response.json()) as Array<{ name: string; surname: string; email: string }>;
    // An unescaped "%" would wildcard-match every row; a correctly escaped
    // search only matches users whose fields literally contain "%".
    expect(
      body.every((u) => `${u.name}${u.surname}${u.email}`.includes('%')),
    ).toBe(true);
  });

  // Covers: FR12, NFR2
  test('a literal "_" is escaped and matched literally, not as an SQL single-char wildcard', async ({
    usersApiContext,
  }) => {
    const payload = '_';
    const response = await usersApiContext.get('/users', { params: { search: payload } });

    expect(response.status()).toBe(200);
    const body = (await response.json()) as Array<{ name: string; surname: string; email: string }>;
    expect(
      body.every((u) => `${u.name}${u.surname}${u.email}`.includes('_')),
    ).toBe(true);
  });

  // Covers: FR12
  test('no injection or special-character payload causes a server error', async ({
    usersApiContext,
    usersTestData,
  }) => {
    for (const payload of usersTestData.injectionPayloads) {
      const response = await usersApiContext.get('/users', { params: { search: payload } });
      expect(response.status()).not.toBe(500);
      expect(response.status()).toBe(200);
    }
  });
});
