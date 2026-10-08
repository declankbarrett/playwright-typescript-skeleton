import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * ViewProjectPage - represents the project details screen
 * (view-project.html?projectId=).
 */
export class ViewProjectPage extends BasePage {
  private readonly projectNameCell = this.page.locator('#project-name-cell');
  private readonly projectSectorCell = this.page.locator('#project-sector-cell');
  private readonly projectTechnologyCell = this.page.locator('#project-technology-cell');
  private readonly projectOwnerCell = this.page.locator('#project-owner-cell');
  private readonly usersInProjectTable = this.page.locator('#users-in-project');
  private readonly updateProjectButton = this.page.getByRole('button', { name: 'Update project' });
  private readonly addUsersButton = this.page.getByRole('button', { name: 'Update users in project' });
  private readonly backToListLink = this.page.getByRole('link', { name: 'Back to list' });

  constructor(page: Page) {
    super(page);
  }

  async isDisplayed(): Promise<boolean> {
    return this.isVisible(this.projectNameCell);
  }

  async getProjectName(): Promise<string> {
    return this.getText(this.projectNameCell);
  }

  async getSector(): Promise<string> {
    return this.getText(this.projectSectorCell);
  }

  async getTechnologies(): Promise<string> {
    return this.getText(this.projectTechnologyCell);
  }

  async getOwner(): Promise<string> {
    return this.getText(this.projectOwnerCell);
  }

  async isUserAssigned(fullName: string): Promise<boolean> {
    return this.isVisible(this.usersInProjectTable.locator('tr').filter({ hasText: fullName }).first());
  }

  async goToAddUsers(): Promise<void> {
    await this.click(this.addUsersButton);
  }

  async goBackToList(): Promise<void> {
    await this.click(this.backToListLink);
  }
}
