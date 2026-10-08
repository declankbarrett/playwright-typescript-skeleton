import { test, expect } from '../../fixtures/testFixtures';

test.describe('Functional: Navigation', () => {
  test.beforeEach(async ({ loginPage, users }) => {
    await loginPage.open();
    await loginPage.login(users.validUser.username, users.validUser.password);
  });

  test('user can navigate to the shopping cart', async ({ page, homePage }) => {
    await homePage.goToCart();

    await expect(page).toHaveURL(/.*cart.html/);
    await expect(page.locator('.title')).toHaveText('Your Cart');
  });
});
