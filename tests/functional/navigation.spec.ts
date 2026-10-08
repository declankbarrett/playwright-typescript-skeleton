import { test, expect } from '../../fixtures/testFixtures';

test.describe('Functional: Navigation', () => {
  test('user can navigate from Users to Projects and back', async ({
    page,
    usersListPage,
    projectsListPage,
  }) => {
    await usersListPage.open();
    expect(await usersListPage.isDisplayed()).toBeTruthy();

    await usersListPage.goToProjectsNav();

    await expect(page).toHaveURL(/.*projects\.html/);
    expect(await projectsListPage.isDisplayed()).toBeTruthy();

    await projectsListPage.goToUsersNav();

    await expect(page).toHaveURL(/.*index\.html/);
    expect(await usersListPage.isDisplayed()).toBeTruthy();
  });
});
