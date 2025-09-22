require('dotenv').config()
import { expect, test } from '@playwright/test';
import { AmazonPage } from '../pages/amazonPage';
import { AmazonCartPage } from '../pages/amazonCartPage';
import { AmazonCheckoutPage } from '../pages/amazonCheckoutPage';
import { AmazonPrimePage } from '../pages/amazonPrimePage';
import { fetchProductByName } from '../utils/amazon';
import { AmazonItemPage } from '../pages/amazonItemPage';

//basic amazon login and credential entry
// test.beforeEach(async ({ page }) => {
//   const EMAIL = process.env.EMAIL;
//   const PASSWORD = process.env.PASSWORD;
//   if (!EMAIL || !PASSWORD) throw new Error('Set AMAZON_EMAIL and AMAZON_PASSWORD env vars');

//   const amazonPage = new AmazonPage(page);
//   await amazonPage.goto();
//   await amazonPage.clickLogin();
//   await page.locator('#ap_email_login').fill(EMAIL);
//   await page.locator('#continue').click();
//   await page.locator('#ap_password').fill(PASSWORD);
//   await page.locator('#signInSubmit').click();
// });

test('Amazon purchase with Amazon Product API without MFA', async ({ page }) => {
    const EMAIL = process.env.EMAIL;
    const PASSWORD = process.env.PASSWORD;
    if (!EMAIL || !PASSWORD) throw new Error('Set AMAZON_EMAIL and AMAZON_PASSWORD env vars');
    const response = await fetchProductByName('laptop')
   
    let url = response.products[0].url
    await page.goto(url)
    await expect(page).toHaveURL(/^https:\/\/www\.amazon\.com.*/)
    const amazonItemPage = new AmazonItemPage(page)
    await amazonItemPage.addToCart();
    await amazonItemPage.rejectInsurance();
    await amazonItemPage.clickOnCart();
   
    const amazonCartPage = new AmazonCartPage(page);
    await expect(page).toHaveURL(/^https:\/\/www\.amazon\.com\/gp\/cart\/view\.html.*/)
    await amazonCartPage.clickToCheckout();
    
    await page.locator('#ap_email_login').fill(EMAIL);
    await page.locator('#continue').click();
    await page.locator('#ap_password').fill(PASSWORD);
    await page.locator('#signInSubmit').click();

    // theres an amazon side issue, where a 5XX error occurs during login, need to reload page
    await page.locator('#b').click()
    const amazonPage = new AmazonPage(page);
    await amazonPage.goto();
    await amazonPage.clickOnCart();

    await expect(page).toHaveURL(/^https:\/\/www\.amazon\.com\/gp\/cart\/view\.html.*/)
    await amazonCartPage.clickToCheckout();
    const amazonPrimePage = new AmazonPrimePage(page);
    await expect(page).toHaveURL(/^https:\/\/www\.amazon\.com\/checkout.*/)
    await amazonPrimePage.clickNoThanks();
    const amazonCheckoutPage = new AmazonCheckoutPage(page);
    await expect(page).toHaveURL(/^https:\/\/www\.amazon\.com\/checkout.*/)
    await amazonCheckoutPage.checkout(); 
  
  });