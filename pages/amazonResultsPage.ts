import { expect, Locator, Page } from "@playwright/test";
import { clickIfVisible } from "../utils/uiFunctions";

export class AmazonResultsPage {
    page: Page;
    addToCartIdentifier = 'Add To Cart';
    addToCartLocator: Locator;
    cartIdentifier = '#nav-cart-count-container';
    cartLocator: Locator;
    cartCountIdentifier = '#nav-cart-count';
    cartCountLocator: Locator;
 
    constructor(page: Page) {
    this.page = page
    this.addToCartLocator = this.page.getByText(this.addToCartIdentifier);
    this.cartLocator = this.page.locator(this.cartIdentifier);
    this.cartCountLocator = this.page.locator(this.cartCountIdentifier);
  }

  async addToCartNthItem(n: number) {
    await this.addToCartLocator.isVisible();
    await clickIfVisible(this.addToCartLocator.nth(n));

    }

  async addFirstItemToCart() {
    await clickIfVisible(this.addToCartLocator.first());

  }

  async clickOnCart() {
    await expect(this.cartCountLocator).toHaveText  (/[1-9]/);
    await clickIfVisible(this.cartLocator);
  }
}