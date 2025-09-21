import { Locator, Page } from "@playwright/test";
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
  constructor(page: Page) {
    this.page = page
    this.loginLocator = this.page.locator(this.loginIdentifier);
    this.searchLocator = this.page.locator(this.searchIdentifier);
    this.searchButtonLocator = this.page.locator(this.searchButtonIdentifier);
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
}