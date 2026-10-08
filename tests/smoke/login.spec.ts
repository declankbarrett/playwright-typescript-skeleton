import { test, expect } from '../../fixtures/testFixtures';

test.describe('Smoke: Login', () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.open();
  });

  test('login succeeds with valid credentials', async ({ loginPage, homePage, users }) => {
    await loginPage.login(users.validUser.username, users.validUser.password);

    await expect(await homePage.isDisplayed()).toBeTruthy();
    expect(await homePage.getPageTitle()).toBe('Products');
  });

  test('home page is displayed after login', async ({ loginPage, homePage, users }) => {
    await loginPage.login(users.validUser.username, users.validUser.password);

    await expect(await homePage.isDisplayed()).toBeTruthy();
    expect(await homePage.getInventoryItemCount()).toBeGreaterThan(0);
  });
});
