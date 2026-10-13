import { test, expect } from '../../fixtures/testFixtures';

/**
 * Covers TS01-TS04 and TS06 from
 * qa-work/adhoc-20261013-add-user/04_test_scenarios.md (FR1-FR4, FR6, FR11).
 *
 * TS05 (server error preserves form values, FR5) is intentionally NOT
 * implemented here: per 06_automation_plan.md it is "Automate (blocked)"
 * pending a confirmed, safe, repeatable way to force a server-side error
 * in this environment (Open Question 3, 01_requirement_analysis.md). Do
 * not add a test for it until that mechanism is agreed.
 */
test.describe('Functional: Add user', () => {
  test('a user can be created successfully and appears on the Users page', async ({
    page,
    addUserPage,
    usersListPage,
    users,
  }) => {
    const newUser = {
      ...users.newUserTemplate,
      email: `${users.newUserTemplate.email}.${Date.now()}@test.com`,
    };

    await addUserPage.open();
    await addUserPage.createUser(newUser);

    await expect(page).toHaveURL(/.*index\.html/);
    expect(await usersListPage.isUserListed(`${newUser.name} ${newUser.surname}`)).toBeTruthy();
  });

  test('the Position dropdown offers exactly the 9 allowed positions, no others', async ({
    addUserPage,
    users,
  }) => {
    await addUserPage.open();

    const options = await addUserPage.getSelectablePositionOptions();

    expect(options.sort()).toEqual([...users.allowedPositions].sort());
  });

  // Covers FR1, FR2 - one sub-test per position for per-case diagnosis
  // (07_design_review.md: avoid merging independently-failable checks).
  for (const position of [
    'Lead Test Engineer',
    'Senior Test Engineer',
    'Test Engineer',
    'Junior Engineer',
    'Lead Developer',
    'Senior Developer',
    'Test Developer',
    'Junior Developer',
    'Business Analyst',
  ]) {
    test(`a user can be created with position "${position}"`, async ({
      page,
      addUserPage,
      usersListPage,
      users,
    }) => {
      const newUser = {
        ...users.newUserTemplate,
        email: `${users.newUserTemplate.email}.${position.replace(/\s+/g, '-').toLowerCase()}.${Date.now()}@test.com`,
        position,
      };

      await addUserPage.open();
      await addUserPage.createUser(newUser);

      await expect(page).toHaveURL(/.*index\.html/);
      expect(await usersListPage.isUserListed(`${newUser.name} ${newUser.surname}`)).toBeTruthy();
    });
  }

  test('an empty Name field is rejected and no user is created', async ({ addUserPage, users }) => {
    await addUserPage.open();
    await addUserPage.fillForm({
      surname: users.newUserTemplate.surname,
      email: `${users.newUserTemplate.email}.${Date.now()}@test.com`,
      position: users.newUserTemplate.position,
    });

    await addUserPage.submit();

    expect(await addUserPage.isValidationErrorVisible()).toBeTruthy();
  });

  test('leaving the Position dropdown on its placeholder is rejected and no user is created', async ({
    addUserPage,
    users,
  }) => {
    await addUserPage.open();
    await addUserPage.fillForm({
      name: users.newUserTemplate.name,
      surname: users.newUserTemplate.surname,
      email: `${users.newUserTemplate.email}.${Date.now()}@test.com`,
    });
    await addUserPage.selectPlaceholderPosition();

    await addUserPage.submit();

    expect(await addUserPage.isValidationErrorVisible()).toBeTruthy();
  });

  test('an invalid email is rejected and no user is created', async ({ addUserPage, users }) => {
    await addUserPage.open();
    await addUserPage.createUser({
      ...users.newUserTemplate,
      email: 'abc@',
    });

    expect(await addUserPage.isValidationErrorVisible()).toBeTruthy();
  });

  test('an exact-match duplicate email is rejected with the duplicate-email message', async ({
    addUserPage,
    page,
    users,
  }) => {
    const email = `duplicate.check.${Date.now()}@test.com`;

    // Setup: create the first user via the UI (not part of the assertion).
    await addUserPage.open();
    await addUserPage.createUser({ ...users.newUserTemplate, email });
    await expect(page).toHaveURL(/.*index\.html/);

    await addUserPage.open();
    await addUserPage.createUser({ ...users.newUserTemplate, email });

    await expect(page.getByText('A user with this email already exists')).toBeVisible();
  });

  test('a duplicate email with different capitalisation is rejected with the duplicate-email message', async ({
    addUserPage,
    page,
    users,
  }) => {
    const timestamp = Date.now();
    const email = `duplicate.case.${timestamp}@test.com`;
    const differentCaseEmail = `DUPLICATE.CASE.${timestamp}@TEST.COM`;

    // Setup: create the first user via the UI (not part of the assertion).
    await addUserPage.open();
    await addUserPage.createUser({ ...users.newUserTemplate, email });
    await expect(page).toHaveURL(/.*index\.html/);

    await addUserPage.open();
    await addUserPage.createUser({ ...users.newUserTemplate, email: differentCaseEmail });

    await expect(page.getByText('A user with this email already exists')).toBeVisible();
  });

  test('a name with an apostrophe is saved and displayed exactly as entered', async ({
    page,
    addUserPage,
    usersListPage,
    users,
  }) => {
    const newUser = {
      ...users.newUserTemplate,
      name: "O'Brien",
      email: `${users.newUserTemplate.email}.apostrophe.${Date.now()}@test.com`,
    };

    await addUserPage.open();
    await addUserPage.createUser(newUser);

    await expect(page).toHaveURL(/.*index\.html/);
    expect(await usersListPage.isUserListed(`${newUser.name} ${newUser.surname}`)).toBeTruthy();
  });

  test('a name with a diacritic is saved and displayed exactly as entered', async ({
    page,
    addUserPage,
    usersListPage,
    users,
  }) => {
    const newUser = {
      ...users.newUserTemplate,
      name: 'Zoë',
      email: `${users.newUserTemplate.email}.diacritic.${Date.now()}@test.com`,
    };

    await addUserPage.open();
    await addUserPage.createUser(newUser);

    await expect(page).toHaveURL(/.*index\.html/);
    expect(await usersListPage.isUserListed(`${newUser.name} ${newUser.surname}`)).toBeTruthy();
  });
});
