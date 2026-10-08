import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * UsersListPage - represents the Users list screen (index.html).
 * Users are rendered as table rows, each with View / Update / Remove actions.
 */
export class UsersListPage extends BasePage {
  private readonly pageHeading = this.page.getByRole('heading', { name: 'List of the users' });
  private readonly addUserButton = this.page.getByRole('link', { name: 'Add new user' });
  private readonly usersTableRows = this.page.locator('#users-table-body tr');

  constructor(page: Page) {
    super(page);
  }

  async open(): Promise<void> {
    await this.navigate('/index.html');
  }

  async isDisplayed(): Promise<boolean> {
    return this.isVisible(this.pageHeading);
  }

  async goToAddUser(): Promise<void> {
    await this.click(this.addUserButton);
  }

  async getUserRowCount(): Promise<number> {
    return this.usersTableRows.count();
  }

  private rowByName(fullName: string) {
    return this.usersTableRows.filter({ hasText: fullName });
  }

  async isUserListed(fullName: string): Promise<boolean> {
    return this.isVisible(this.rowByName(fullName).first());
  }

  async viewUser(fullName: string): Promise<void> {
    await this.click(this.rowByName(fullName).getByRole('button', { name: 'View details' }));
  }

  async removeUser(fullName: string): Promise<void> {
    await this.click(this.rowByName(fullName).getByRole('button', { name: 'Remove user' }));
  }
}
