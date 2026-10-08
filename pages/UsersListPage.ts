import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * UsersListPage - SCAFFOLD ONLY (work item: adhoc-20261008-users-search-filter).
 *
 * This page object targets a Users list feature (search box, Position filter,
 * Clear button) described in jira.md. That feature, and the application it
 * belongs to, do NOT exist in this repository (which exercises only
 * https://www.saucedemo.com) - see qa-work/adhoc-20261008-users-search-filter
 * for the full design rationale and the confirmed scope-mismatch drift.
 *
 * Selectors below are placeholders inferred from the ticket's technical
 * notes (users-list-scripts.js) and are NOT verified against a real DOM.
 * Replace them once pointed at the actual application.
 */
export class UsersListPage extends BasePage {
  private readonly searchInput = this.page.getByPlaceholder('Search users');
  private readonly positionFilter = this.page.getByLabel('Position');
  private readonly clearButton = this.page.getByRole('button', { name: 'Clear' });
  private readonly noResultsMessage = this.page.getByText('No users match your search');
  private readonly userRows = this.page.locator('[data-test="user-row"]');

  constructor(page: Page) {
    super(page);
  }

  async open(): Promise<void> {
    await this.navigate('/users');
  }

  async searchFor(text: string): Promise<void> {
    await this.fill(this.searchInput, text);
  }

  async selectPosition(position: string): Promise<void> {
    await this.positionFilter.selectOption({ label: position });
  }

  async clear(): Promise<void> {
    await this.click(this.clearButton);
  }

  async getVisibleUserNames(): Promise<string[]> {
    return this.userRows.locator('[data-test="user-name"]').allTextContents();
  }

  async getPositionOptions(): Promise<string[]> {
    return this.positionFilter.locator('option').allTextContents();
  }

  async isNoResultsMessageVisible(): Promise<boolean> {
    return this.isVisible(this.noResultsMessage);
  }

  async removeUserByName(name: string): Promise<void> {
    const row = this.userRows.filter({ hasText: name });
    await this.click(row.getByRole('button', { name: 'Remove' }));
  }

  async viewUserByName(name: string): Promise<void> {
    const row = this.userRows.filter({ hasText: name });
    await this.click(row.getByRole('button', { name: 'View' }));
  }

  async updateUserByName(name: string): Promise<void> {
    const row = this.userRows.filter({ hasText: name });
    await this.click(row.getByRole('button', { name: 'Update' }));
  }

  async getRowCount(): Promise<number> {
    return this.userRows.count();
  }
}
