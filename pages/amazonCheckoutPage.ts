import { Locator, Page } from "@playwright/test";

export class AmazonCheckoutPage {
    page: Page;
    placeOrderIdentifier = "#placeOrder";
    placeOrderLocator: Locator;
    paymentMethodCheckoutIdentifier = "#checkout-secondary-continue-button-id-announce"
    paymentMethodCheckoutLocator: Locator;
    
    constructor(page: Page) {
        this.page = page;
        this.placeOrderLocator = this.page.locator(this.placeOrderIdentifier);
        this.paymentMethodCheckoutLocator = this.page.locator(this.paymentMethodCheckoutIdentifier);
    }

    async checkout(){
        await this.placeOrderLocator.isVisible();
        //await this.placeOrderLocator.click();
    }


}