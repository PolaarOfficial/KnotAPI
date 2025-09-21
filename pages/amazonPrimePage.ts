import { Locator, Page } from "@playwright/test";
import { clickIfVisible } from "../utils/uiFunctions";

export class AmazonPrimePage {
    page: Page;
    declinePrimeIdentifier = '#prime-decline-button';
    declinePrimeLocator: Locator;

  constructor(page: Page) {
    this.page = page
    this.declinePrimeLocator = this.page.locator(this.declinePrimeIdentifier);
  }


  async clickNoThanks() {
    await clickIfVisible(this.declinePrimeLocator);
  }
}