import { test, expect } from '../../fixtures/testFixtures';

test.describe('Smoke: Logout', () => {
  test('logout succeeds and returns user to login page', async ({ loginPage, homePage, users }) => {
    await loginPage.open();
    await loginPage.login(users.validUser.username, users.validUser.password);
    await expect(await homePage.isDisplayed()).toBeTruthy();

    await homePage.logout();

    await expect(await loginPage.isLoginButtonVisible()).toBeTruthy();
  });
});
