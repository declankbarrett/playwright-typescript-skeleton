import { Locator, Page } from '@playwright/test';

/**
 * BasePage provides common, reusable browser interactions used by
 * every page object. Keep this generic - page-specific logic belongs
 * in the concrete page object classes.
 */
export class BasePage {
  constructor(protected readonly page: Page) {}

  async navigate(path = '/'): Promise<void> {
    await this.page.goto(path);
  }

  async click(locator: Locator): Promise<void> {
    await locator.click();
  }

  async fill(locator: Locator, value: string): Promise<void> {
    await locator.fill(value);
  }

  async getText(locator: Locator): Promise<string> {
    return (await locator.textContent())?.trim() ?? '';
  }

  /**
   * Waits briefly for the element to become visible rather than performing
   * an instant, non-retrying check - this avoids flaky false negatives
   * immediately after navigation or form submission.
   */
  async isVisible(locator: Locator, timeout = 5000): Promise<boolean> {
    try {
      await locator.waitFor({ state: 'visible', timeout });
      return true;
    } catch {
      return false;
    }
  }

  async title(): Promise<string> {
    return this.page.title();
  }

  /**
   * The top navigation bar ("Users" / "Projects") is shared across every
   * page in the app, so navigation helpers live on BasePage rather than
   * being duplicated per page object.
   */
  async goToUsersNav(): Promise<void> {
    await this.click(this.page.getByRole('link', { name: 'Users' }));
  }

  async goToProjectsNav(): Promise<void> {
    await this.click(this.page.getByRole('link', { name: 'Projects' }));
  }
}
