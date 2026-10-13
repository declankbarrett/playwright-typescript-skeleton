import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

export interface NewUser {
  name: string;
  surname: string;
  email: string;
  position: string;
}

const PLACEHOLDER_POSITION_LABEL = 'Select position';

/**
 * AddUserPage - represents the "Add new user" form (add-user.html).
 * A successful submission redirects to the Users list (index.html); a
 * rejected submission shows #validationError and keeps the user on this page.
 */
export class AddUserPage extends BasePage {
  private readonly nameInput = this.page.locator('#name');
  private readonly surnameInput = this.page.locator('#surname');
  private readonly emailInput = this.page.locator('#email');
  private readonly positionDropdown = this.page.locator('#position');
  private readonly createUserButton = this.page.getByRole('button', { name: 'Create user' });
  private readonly validationError = this.page.locator('#validationError');

  constructor(page: Page) {
    super(page);
  }

  async open(): Promise<void> {
    await this.navigate('/add-user.html');
  }

  async fillForm(user: Partial<NewUser>): Promise<void> {
    if (user.name !== undefined) {
      await this.fill(this.nameInput, user.name);
    }
    if (user.surname !== undefined) {
      await this.fill(this.surnameInput, user.surname);
    }
    if (user.email !== undefined) {
      await this.fill(this.emailInput, user.email);
    }
    if (user.position !== undefined) {
      await this.selectPosition(user.position);
    }
  }

  async selectPosition(position: string): Promise<void> {
    await this.positionDropdown.selectOption({ label: position });
  }

  /**
   * Leaves the dropdown on its default "Select position" placeholder,
   * which has no `value` attribute and so submits its own label text.
   */
  async selectPlaceholderPosition(): Promise<void> {
    await this.positionDropdown.selectOption({ index: 0 });
  }

  async submit(): Promise<void> {
    await this.click(this.createUserButton);
  }

  async createUser(user: NewUser): Promise<void> {
    await this.fillForm(user);
    await this.submit();
  }

  async isValidationErrorVisible(): Promise<boolean> {
    return this.isVisible(this.validationError);
  }

  /**
   * Returns the real, selectable position options - every <option> except
   * the "Select position" placeholder - for asserting the full allowed
   * position list (FR1) independently of the placeholder.
   */
  async getSelectablePositionOptions(): Promise<string[]> {
    const allLabels = await this.positionDropdown.locator('option').allTextContents();
    return allLabels.map((label) => label.trim()).filter((label) => label !== PLACEHOLDER_POSITION_LABEL);
  }
}
