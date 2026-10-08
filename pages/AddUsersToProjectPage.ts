import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * AddUsersToProjectPage - represents the "Add users to project" screen,
 * shown automatically after creating a project
 * (add-users-to-project.html?projectId=).
 */
export class AddUsersToProjectPage extends BasePage {
  private readonly projectNameLabel = this.page.locator('#project-name');
  private readonly confirmButton = this.page.getByRole('button', { name: 'Confirm' });

  constructor(page: Page) {
    super(page);
  }

  async isDisplayed(): Promise<boolean> {
    return this.isVisible(this.confirmButton);
  }

  async getProjectName(): Promise<string> {
    return this.getText(this.projectNameLabel);
  }

  private userCheckbox(fullName: string) {
    return this.page.locator('#users-selection .form-check').filter({ hasText: fullName }).locator('input[type="checkbox"]');
  }

  async selectUser(fullName: string): Promise<void> {
    await this.userCheckbox(fullName).check();
  }

  async confirm(): Promise<void> {
    await this.click(this.confirmButton);
  }
}
