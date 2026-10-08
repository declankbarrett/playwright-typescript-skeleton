import { test, expect } from '../../fixtures/testFixtures';

test.describe('Smoke: Users list', () => {
  test.beforeEach(async ({ usersListPage }) => {
    await usersListPage.open();
  });

  test('seeded users are displayed in the list', async ({ usersListPage, users }) => {
    const developerName = `${users.seededUsers.developer.name} ${users.seededUsers.developer.surname}`;

    expect(await usersListPage.getUserRowCount()).toBeGreaterThan(0);
    expect(await usersListPage.isUserListed(developerName)).toBeTruthy();
  });

  test('viewing a user navigates to their details page', async ({
    page,
    usersListPage,
    viewUserPage,
    users,
  }) => {
    const developer = users.seededUsers.developer;
    const developerName = `${developer.name} ${developer.surname}`;

    await usersListPage.viewUser(developerName);

    await expect(page).toHaveURL(/view-user\.html\?userId=\d+/);
    expect(await viewUserPage.isDisplayed()).toBeTruthy();
    expect(await viewUserPage.getDetailsText()).toContain(developer.email);
  });
});
