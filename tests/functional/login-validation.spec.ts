import { test, expect } from '../../fixtures/testFixtures';

test.describe('Functional: Login validation', () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.open();
  });

  test('locked out user sees an error message', async ({ loginPage, users }) => {
    await loginPage.login(users.lockedOutUser.username, users.lockedOutUser.password);

    expect(await loginPage.getErrorMessage()).toContain('locked out');
  });

  test('invalid credentials are rejected', async ({ loginPage, users }) => {
    await loginPage.login(users.invalidUser.username, users.invalidUser.password);

    expect(await loginPage.getErrorMessage()).toContain(
      'Username and password do not match'
    );
  });
});
