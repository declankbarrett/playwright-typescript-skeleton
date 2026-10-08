import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * HomePage - represents the post-login inventory/products page on
 * Sauce Demo. Demonstrates basic navigation and validation.
 */
export class HomePage extends BasePage {
  private readonly pageTitle = this.page.locator('.title');
  private readonly inventoryItems = this.page.locator('.inventory_item');
  private readonly menuButton = this.page.getByRole('button', { name: 'Open Menu' });
  private readonly logoutLink = this.page.getByRole('button', { name: 'Logout' });
  private readonly cartIcon = this.page.locator('.shopping_cart_link');

  constructor(page: Page) {
    super(page);
  }

  async isDisplayed(): Promise<boolean> {
    return this.isVisible(this.pageTitle);
  }

  async getPageTitle(): Promise<string> {
    return this.getText(this.pageTitle);
  }

  async getInventoryItemCount(): Promise<number> {
    return this.inventoryItems.count();
  }

  async logout(): Promise<void> {
    await this.click(this.menuButton);
    await this.click(this.logoutLink);
  }

  async goToCart(): Promise<void> {
    await this.click(this.cartIcon);
  }
}
