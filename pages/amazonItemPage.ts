import { expect, Locator, Page } from "@playwright/test";
import { clickIfVisible } from "../utils/uiFunctions";

export class AmazonItemPage {
    page: Page;
    buyNowIdentifier = "#submit.buy-now-announce";
    buyNowLocator: Locator;
    cartIdentifier = '#nav-cart-count-container';
    cartLocator: Locator;
    cartCountIdentifier = '#nav-cart-count';
    cartCountLocator: Locator;
    addToCartIdentifier = "#add-to-cart-button";
    addToCartLocator: Locator;
    rejectInsuranceIdentifier = "#attachSiNoCoverage"
    rejectInsuranceLocator: Locator;

    constructor(page: Page) {
        this.page = page;
        this.buyNowLocator = this.page.getByText("Buy Now");
        this.cartLocator = this.page.locator(this.cartIdentifier);
        this.cartCountLocator = this.page.locator(this.cartCountIdentifier);
        this.addToCartLocator = this.page.locator(this.addToCartIdentifier);
        this.rejectInsuranceLocator = this.page.locator(this.rejectInsuranceIdentifier);
    }

    async buyNow(){
        await clickIfVisible(this.buyNowLocator.last());
    }

    async addToCart(){
        await clickIfVisible(this.addToCartLocator.first());
    }


    async clickOnCart() {
        await expect(this.cartCountLocator).toHaveText(/[1-9]/);
        await clickIfVisible(this.cartLocator);
    }

    async rejectInsurance() {
        await clickIfVisible(this.rejectInsuranceLocator);
    }

}