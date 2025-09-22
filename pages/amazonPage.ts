import { expect, Locator, Page } from "@playwright/test";
import { clickIfVisible, fillIfVisible, reloadPageUntilVisible } from "../utils/uiFunctions";

export class AmazonPage {
    url = 'https://amazon.com/';
    page: Page;
    loginLocator: Locator;
    loginIdentifier = '#nav-link-accountList-nav-line-1';
    searchLocator: Locator;
    searchIdentifier = '#twotabsearchtextbox';
    searchButtonIdentifier = '#nav-search-submit-button';
    searchButtonLocator: Locator;
    cartIdentifier = '#nav-cart-count-container';
    cartLocator: Locator;
    cartCountIdentifier = '#nav-cart-count';
    cartCountLocator: Locator;

  constructor(page: Page) {
    this.page = page
    this.loginLocator = this.page.locator(this.loginIdentifier);
    this.searchLocator = this.page.locator(this.searchIdentifier);
    this.searchButtonLocator = this.page.locator(this.searchButtonIdentifier);
    this.cartLocator = this.page.locator(this.cartIdentifier);
    this.cartCountLocator = this.page.locator(this.cartCountIdentifier);
  }

  async goto() {
    await this.page.goto(this.url);
  }

  async clickLogin() {
    await reloadPageUntilVisible(this.page, this.loginLocator);
    await this.loginLocator.click();
  }

  async search(searchTerm: string) {
    await fillIfVisible(this.searchLocator, searchTerm);
  }

  async clickSearch() {
    await clickIfVisible(this.searchButtonLocator);
  }

  async clickOnCart() {
    await expect(this.cartCountLocator).toHaveText  (/[1-9]/);
    await clickIfVisible(this.cartLocator);
  }
}