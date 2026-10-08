import { test, expect } from '../../fixtures/testFixtures';

test.describe('Smoke: Application availability', () => {
  test('users page loads successfully', async ({ page, usersListPage }) => {
    await usersListPage.open();

    await expect(page).toHaveTitle('Test Application');
    expect(await usersListPage.isDisplayed()).toBeTruthy();
  });

  test('projects page loads successfully', async ({ page, projectsListPage }) => {
    await projectsListPage.open();

    await expect(page).toHaveTitle('Test Application');
    expect(await projectsListPage.isDisplayed()).toBeTruthy();
  });
});
