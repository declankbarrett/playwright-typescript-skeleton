import { test, expect } from '../../fixtures/apiFixtures';

/**
 * Covers TS07-TS10 from
 * qa-work/adhoc-20261013-add-user/04_test_scenarios.md (FR7-FR9, FR11, NFR1),
 * exercising POST /users directly against the backend (API_BASE_URL),
 * independently of the UI.
 *
 * TS11 (unexpected error returns 500, FR10) is intentionally NOT
 * implemented here: per 06_automation_plan.md it is "Automate (blocked)"
 * pending a confirmed, safe, repeatable way to force a server-side error
 * in this environment (Open Question 3, 01_requirement_analysis.md). Do
 * not add a test for it until that mechanism is agreed.
 */
test.describe('Functional API: POST /users contract', () => {
  function uniqueEmail(prefix: string): string {
    return `${prefix}.${Date.now()}.${Math.floor(Math.random() * 1_000_000)}@test.com`;
  }

  test('a valid payload returns 201 with the new user id', async ({ apiContext, users }) => {
    const payload = { ...users.newUserTemplate, email: uniqueEmail('contract.valid') };

    const response = await apiContext.post('/users', { data: payload });

    expect(response.status()).toBe(201);
    const body = (await response.json()) as { id?: unknown };
    expect(body.id).toBeDefined();
  });

  test('a payload missing a required field returns 400', async ({ apiContext, users }) => {
    const { email: _email, ...payloadWithoutEmail } = {
      ...users.newUserTemplate,
      email: uniqueEmail('contract.missing-field'),
    };

    const response = await apiContext.post('/users', { data: payloadWithoutEmail });

    expect(response.status()).toBe(400);
  });

  test('a payload with a position outside the allowed list returns 400', async ({ apiContext, users }) => {
    const payload = {
      ...users.newUserTemplate,
      email: uniqueEmail('contract.bad-position'),
      position: 'Chief Astronaut',
    };

    const response = await apiContext.post('/users', { data: payload });

    expect(response.status()).toBe(400);
  });

  test('a duplicate email returns 409', async ({ apiContext, users }) => {
    const email = uniqueEmail('contract.duplicate');
    const payload = { ...users.newUserTemplate, email };

    // Setup: create the first user via the API (not part of the assertion).
    const firstResponse = await apiContext.post('/users', { data: payload });
    expect(firstResponse.status()).toBe(201);

    const duplicateResponse = await apiContext.post('/users', { data: payload });

    expect(duplicateResponse.status()).toBe(409);
  });

  test('a SQL-injection string in the name is stored and returned as plain text', async ({
    apiContext,
    users,
  }) => {
    const injectionPayload = "Robert'); DROP TABLE Users;--";
    const payload = {
      ...users.newUserTemplate,
      name: injectionPayload,
      email: uniqueEmail('contract.sql-injection'),
    };

    const createResponse = await apiContext.post('/users', { data: payload });
    expect(createResponse.status()).toBe(201);
    const created = (await createResponse.json()) as { id: number };

    const getResponse = await apiContext.get(`/users/${created.id}`);
    expect(getResponse.status()).toBe(200);
    const retrieved = (await getResponse.json()) as { name: string };
    expect(retrieved.name).toBe(injectionPayload);

    // No SQL executed / no other data affected: the users list must still
    // be queryable and return a non-empty, sane result set.
    const listResponse = await apiContext.get('/users');
    expect(listResponse.status()).toBe(200);
    const allUsers = (await listResponse.json()) as unknown[];
    expect(allUsers.length).toBeGreaterThan(0);
  });
});
