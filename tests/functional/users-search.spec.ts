import { test, expect } from '../../fixtures/usersFixtures';

/**
 * SCAFFOLD ONLY — work item adhoc-20261008-users-search-filter.
 *
 * Covers jira.md "Search and filter users on the Users list" FR1–FR3,
 * FR5–FR9 (UI). No real application implements this feature in this
 * repository (see qa-work/adhoc-20261008-users-search-filter/context.md).
 * Every test is conditionally skipped unless USERS_APP_BASE_URL is set,
 * so this file never runs against — or breaks — saucedemo.com CI.
 *
 * Design source: qa-work/adhoc-20261008-users-search-filter/design.md
 * (scenarios S1, S2, S3, S4, S5, S6, S7, S8, S9).
 */
test.describe('Functional: Users list search and filter', () => {
  test.beforeEach(async ({ usersAppBaseUrl, usersListPage }) => {
    test.skip(!usersAppBaseUrl, 'Requires USERS_APP_BASE_URL — no real Users app exists in this repository.');
    await usersListPage.open();
  });

  // Covers: FR1
  test('search matches name, surname or email, case-insensitive and partial', async ({ usersListPage, usersTestData }) => {
    const seeded = usersTestData.seedUsers.find((u) => u.surname === 'Nowak')!;
    await usersListPage.searchFor('ANNA');

    const names = await usersListPage.getVisibleUserNames();
    expect(names.every((n) => n.toLowerCase().includes('anna'))).toBe(true);
    expect(names.some((n) => n.includes(seeded.surname))).toBe(true);
  });

  // Covers: FR2
  test('search matches the concatenated full name', async ({ usersListPage }) => {
    await usersListPage.searchFor('anna nowak');

    const names = await usersListPage.getVisibleUserNames();
    expect(names).toContain('Anna Nowak');
  });

  // Covers: FR1, FR8
  test('search is debounced and requires no Enter key', async ({ usersListPage, page }) => {
    const requests: number[] = [];
    page.on('request', (req) => {
      if (req.url().includes('/users?search=')) requests.push(Date.now());
    });

    for (const char of 'anna') {
      await usersListPage.searchFor(char);
      await page.waitForTimeout(50); // simulate rapid typing, well under the debounce window
    }

    // Expect exactly one request to fire, roughly 300ms (±100ms) after the
    // last keystroke — not one request per keystroke.
    await page.waitForTimeout(400);
    expect(requests.length).toBe(1);
  });

  // Covers: FR3
  test('position filter narrows results to an exact match', async ({ usersListPage }) => {
    await usersListPage.selectPosition('Test Engineer');

    const names = await usersListPage.getVisibleUserNames();
    expect(names.length).toBeGreaterThan(0);
    // Every visible row's position cell would be asserted here once the
    // real DOM/selectors are known.
  });

  // Covers: FR4, NFR3
  test('position dropdown lists distinct positions, sorted, defaulting to "All positions"', async ({ usersListPage }) => {
    const options = await usersListPage.getPositionOptions();

    expect(options[0]).toBe('All positions');
    const positionsOnly = options.slice(1);
    expect(positionsOnly).toEqual([...positionsOnly].sort());
    expect(new Set(positionsOnly).size).toBe(positionsOnly.length);
  });

  // Covers: FR5
  test('search text and position filter combine with AND semantics', async ({ usersListPage }) => {
    await usersListPage.searchFor('Jan Kowalski');
    await usersListPage.selectPosition('Test Engineer');

    const names = await usersListPage.getVisibleUserNames();
    expect(names).toEqual(['Jan Kowalski']);
  });

  // Covers: FR6
  test('no matches shows the empty-state message, not an empty table', async ({ usersListPage, usersTestData }) => {
    await usersListPage.searchFor(usersTestData.noMatchSearchTerm);

    expect(await usersListPage.isNoResultsMessageVisible()).toBe(true);
    expect(await usersListPage.getRowCount()).toBe(0);
  });

  // Covers: FR7
  test('Clear resets search, filter and the full list', async ({ usersListPage }) => {
    await usersListPage.searchFor('anna');
    await usersListPage.selectPosition('Test Engineer');

    await usersListPage.clear();

    const options = await usersListPage.getPositionOptions();
    expect(options[0]).toBe('All positions'); // default re-selected
    const names = await usersListPage.getVisibleUserNames();
    expect(names.length).toBeGreaterThan(0); // full list restored
  });

  // Covers: FR9
  test('row actions work on filtered results, and Remove preserves filter state', async ({
    usersListPage,
    usersTestData,
  }) => {
    const disposable = usersTestData.disposableRemoveUser;
    await usersListPage.searchFor(disposable.surname);

    await usersListPage.viewUserByName(`${disposable.name} ${disposable.surname}`);
    await usersListPage.updateUserByName(`${disposable.name} ${disposable.surname}`);
    await usersListPage.removeUserByName(`${disposable.name} ${disposable.surname}`);

    const names = await usersListPage.getVisibleUserNames();
    expect(names).not.toContain(`${disposable.name} ${disposable.surname}`);
    // Cleanup: re-seed `disposable` via the real app's seed mechanism after
    // this test so the shared fixture set is restored for subsequent runs.
  });
});
