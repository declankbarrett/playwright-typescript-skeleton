import { test, expect } from '../../fixtures/testFixtures';

test.describe('Functional: Add user', () => {
  test('a new user can be created and appears in the users list', async ({
    page,
    usersListPage,
    addUserPage,
    users,
  }) => {
    const newUser = {
      ...users.newUser,
      // Keep emails unique across test runs to avoid clashing with
      // previously created data in a shared environment.
      email: `alex.morgan.${Date.now()}@test.com`,
    };
    const fullName = `${newUser.name} ${newUser.surname}`;

    await usersListPage.open();
    await usersListPage.goToAddUser();
    await expect(page).toHaveURL(/.*add-user\.html/);

    await addUserPage.addUser(newUser);

    await expect(page).toHaveURL(/.*index\.html/);
    expect(await usersListPage.isUserListed(fullName)).toBeTruthy();
  });

  test('submitting the form with missing fields shows a validation error', async ({
    addUserPage,
  }) => {
    await addUserPage.open();

    await addUserPage.submit();

    expect(await addUserPage.isValidationErrorVisible()).toBeTruthy();
  });
});
