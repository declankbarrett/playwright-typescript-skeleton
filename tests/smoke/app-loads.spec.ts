import { test, expect } from '../../fixtures/testFixtures';

test.describe('Smoke: Application availability', () => {
  test('application loads successfully', async ({ page, loginPage }) => {
    await loginPage.open();

    await expect(page).toHaveTitle('Swag Labs');
    await expect(await loginPage.isLoginButtonVisible()).toBeTruthy();
  });
});
