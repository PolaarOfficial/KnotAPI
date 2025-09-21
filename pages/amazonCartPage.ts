import { Locator, Page } from "@playwright/test";
import { clickIfVisible } from "../utils/uiFunctions";

export class AmazonCartPage {
    page: Page;
    checkoutIdentifier = '[data-feature-id="proceed-to-checkout-action"]';
    checkoutLocator: Locator;
  
    constructor(page: Page) {
        this.page = page
        this.checkoutLocator = this.page.locator(this.checkoutIdentifier);
    }

    async clickToCheckout(){
        await clickIfVisible(this.checkoutLocator);
    }


}