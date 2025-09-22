import { expect, test } from '@playwright/test';
import { AmazonPage } from '../pages/amazonPage';
import { AmazonResultsPage } from '../pages/amazonResultsPage';
import { AmazonCartPage } from '../pages/amazonCartPage';
import { AmazonCheckoutPage } from '../pages/amazonCheckoutPage';
import { AmazonPrimePage } from '../pages/amazonPrimePage';
import { loginSequence } from '../utils/uiFunctions';
import { getLatestSms } from '../utils/twilio';

//basic amazon login and credential entry
test.beforeEach(async ({ page }) => {
  const EMAIL = process.env.EMAIL;
  const PASSWORD = process.env.PASSWORD;
  if (!EMAIL || !PASSWORD) throw new Error('Set AMAZON_EMAIL and AMAZON_PASSWORD env vars');

  const amazonPage = new AmazonPage(page);
  await amazonPage.goto();
  await amazonPage.clickLogin();
  await loginSequence(page);

});


test.skip('Amazon purchase with 2FA', async ({ page }) => {


  //FOR 2FA notifications, we need to either poll or have a local server running to obtain the 2fa key
  // For simplicity, we will poll per request, which may require error handling to be implemented


  let latestSMS = await getLatestSms(process.env.SMS)
  console.log(latestSMS)
  await page.locator('#auth-mfa-otpcode').fill(latestSMS?.body)

  //This was used to trigger an automatic click when manually filling in an OTP
  // await page.waitForFunction(() => {
  //   const input = document.querySelector('#auth-mfa-otpcode') as HTMLInputElement;
  //   return input && input.value.length === 6;
  // });

  await page.locator('#auth-signin-button').click();

  const amazonPage = new AmazonPage(page);
  await expect(page).toHaveURL(/^https:\/\/www\.amazon\.com.*/)
  await amazonPage.search('kava');
  await amazonPage.clickSearch();
  const amazonResultsPage = new AmazonResultsPage(page)
  await expect(page).toHaveURL(/^https:\/\/www\.amazon\.com\/s\?k\=kava.*/)
  await amazonResultsPage.addFirstItemToCart();
  await amazonResultsPage.clickOnCart()
  const amazonCartPage = new AmazonCartPage(page);
  await expect(page).toHaveURL(/^https:\/\/www\.amazon\.com\/gp\/cart\/view\.html.*/)
  await amazonCartPage.clickToCheckout();
  const amazonPrimePage = new AmazonPrimePage(page);
  await expect(page).toHaveURL(/^https:\/\/www\.amazon\.com\/checkout.*/)
  await amazonPrimePage.clickNoThanks();
  const amazonCheckoutPage = new AmazonCheckoutPage(page);
  await expect(page).toHaveURL(/^https:\/\/www\.amazon\.com\/checkout.*/)
  await amazonCheckoutPage.checkout(); 

});

test('Amazon purchase without 2FA', async ({ page }) => {

  const amazonPage = new AmazonPage(page);
  await expect(page).toHaveURL(/^https:\/\/www\.amazon\.com.*/)
  await amazonPage.search('kava');
  await amazonPage.clickSearch();
  const amazonResultsPage = new AmazonResultsPage(page)
  await expect(page).toHaveURL(/^https:\/\/www\.amazon\.com\/s\?k\=kava.*/)
  await amazonResultsPage.addFirstItemToCart();
  await amazonResultsPage.clickOnCart()
  const amazonCartPage = new AmazonCartPage(page);
  await expect(page).toHaveURL(/^https:\/\/www\.amazon\.com\/gp\/cart\/view\.html.*/)
  await amazonCartPage.clickToCheckout();
  const amazonPrimePage = new AmazonPrimePage(page);
  await expect(page).toHaveURL(/^https:\/\/www\.amazon\.com\/checkout.*/)
  await amazonPrimePage.clickNoThanks();
  const amazonCheckoutPage = new AmazonCheckoutPage(page);
  await expect(page).toHaveURL(/^https:\/\/www\.amazon\.com\/checkout.*/)
  await amazonCheckoutPage.checkout(); 
  // we dont actually click the button in order to avoid order cancellation issues
});


