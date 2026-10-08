import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * ProjectsListPage - represents the Projects list screen (projects.html).
 */
export class ProjectsListPage extends BasePage {
  private readonly pageHeading = this.page.getByRole('heading', { name: 'List of projects' });
  private readonly addProjectButton = this.page.getByRole('link', { name: 'Add new project' });
  private readonly projectsTableRows = this.page.locator('#projects-table-body tr');

  constructor(page: Page) {
    super(page);
  }

  async open(): Promise<void> {
    await this.navigate('/projects.html');
  }

  async isDisplayed(): Promise<boolean> {
    return this.isVisible(this.pageHeading);
  }

  async goToAddProject(): Promise<void> {
    await this.click(this.addProjectButton);
  }

  async getProjectRowCount(): Promise<number> {
    return this.projectsTableRows.count();
  }

  private rowByName(projectName: string) {
    return this.projectsTableRows.filter({ hasText: projectName });
  }

  async isProjectListed(projectName: string): Promise<boolean> {
    return this.isVisible(this.rowByName(projectName).first());
  }

  async viewProject(projectName: string): Promise<void> {
    await this.click(this.rowByName(projectName).getByRole('button', { name: 'View details' }));
  }

  async removeProject(projectName: string): Promise<void> {
    await this.click(this.rowByName(projectName).getByRole('button', { name: 'Remove project' }));
  }
}
