import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * ViewUserPage - represents the user details screen (view-user.html?userId=).
 */
export class ViewUserPage extends BasePage {
  private readonly detailsTable = this.page.locator('#view-user-table');
  private readonly updateUserButton = this.page.getByRole('button', { name: 'Update user' });
  private readonly backToListLink = this.page.getByRole('link', { name: 'Back to list' });

  constructor(page: Page) {
    super(page);
  }

  async getDetailsText(): Promise<string> {
    return this.getText(this.detailsTable);
  }

  async isDisplayed(): Promise<boolean> {
    return this.isVisible(this.detailsTable);
  }

  async goToUpdateUser(): Promise<void> {
    await this.click(this.updateUserButton);
  }

  async goBackToList(): Promise<void> {
    await this.click(this.backToListLink);
  }
}
