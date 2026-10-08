import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

export interface NewProject {
  name: string;
  sector: string;
  technologies: string[];
  startDate: string;
  ownerName: string;
}

/**
 * AddProjectPage - represents the "Add new project" form (add-project.html).
 * Submitting the form redirects to add-users-to-project.html, so callers
 * should navigate away/assert on that page after calling createProject().
 */
export class AddProjectPage extends BasePage {
  private readonly nameInput = this.page.locator('#name');
  private readonly startDateInput = this.page.locator('#start-date');
  private readonly ownerDropdown = this.page.locator('#owner-dropdown');
  private readonly createProjectButton = this.page.getByRole('button', { name: 'Create project' });
  private readonly validationError = this.page.locator('#validationError');

  constructor(page: Page) {
    super(page);
  }

  async open(): Promise<void> {
    await this.navigate('/add-project.html');
  }

  private sectorRadio(sector: string) {
    return this.page.locator(`input[name="sector"][value="${sector}"]`);
  }

  private technologyCheckbox(technology: string) {
    return this.page.locator(`input[id*="technology"][value="${technology}"]`);
  }

  async fillForm(project: NewProject): Promise<void> {
    await this.fill(this.nameInput, project.name);
    await this.sectorRadio(project.sector).check();
    for (const technology of project.technologies) {
      await this.technologyCheckbox(technology).check();
    }
    await this.fill(this.startDateInput, project.startDate);
    await this.selectOwnerContaining(project.ownerName);
  }

  /**
   * Owner dropdown options are generated dynamically as
   * "{name} {surname} ({position})", so we match by a partial,
   * stable substring (e.g. "Jan Kowalski") rather than the full label.
   */
  private async selectOwnerContaining(ownerName: string): Promise<void> {
    const option = this.ownerDropdown.locator('option', { hasText: ownerName });
    const value = await option.getAttribute('value');
    if (!value) {
      throw new Error(`Could not find an owner option containing "${ownerName}"`);
    }
    await this.ownerDropdown.selectOption(value);
  }

  async submit(): Promise<void> {
    await this.click(this.createProjectButton);
  }

  async createProject(project: NewProject): Promise<void> {
    await this.fillForm(project);
    await this.submit();
  }

  async isValidationErrorVisible(): Promise<boolean> {
    return this.isVisible(this.validationError);
  }
}
