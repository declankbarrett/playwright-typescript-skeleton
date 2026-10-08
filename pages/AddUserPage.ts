import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

export interface NewUser {
  name: string;
  surname: string;
  email: string;
  position: string;
}

/**
 * AddUserPage - represents the "Add new user" form (add-user.html).
 */
export class AddUserPage extends BasePage {
  private readonly nameInput = this.page.locator('#name');
  private readonly surnameInput = this.page.locator('#surname');
  private readonly emailInput = this.page.locator('#email');
  private readonly positionSelect = this.page.locator('#position');
  private readonly createUserButton = this.page.getByRole('button', { name: 'Create user' });
  private readonly validationError = this.page.locator('#validationError');

  constructor(page: Page) {
    super(page);
  }

  async open(): Promise<void> {
    await this.navigate('/add-user.html');
  }

  async fillForm(user: NewUser): Promise<void> {
    await this.fill(this.nameInput, user.name);
    await this.fill(this.surnameInput, user.surname);
    await this.fill(this.emailInput, user.email);
    await this.positionSelect.selectOption({ label: user.position });
  }

  async submit(): Promise<void> {
    await this.click(this.createUserButton);
  }

  async addUser(user: NewUser): Promise<void> {
    await this.fillForm(user);
    await this.submit();
  }

  async isValidationErrorVisible(): Promise<boolean> {
    return this.isVisible(this.validationError);
  }
}
