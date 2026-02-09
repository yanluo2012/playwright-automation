const { test, expect } = require('@playwright/test');
const { LoginPagePractise } = require('../pageobjects/LoginPagePractise');
const { ShopPagePractise } = require('../pageobjects/ShopPagePractise');

test('Login Practise - verify iPhone X product', async ({ page }) => {
    const loginPage = new LoginPagePractise(page);
    const shopPage = new ShopPagePractise(page);

    const username = "rahulshettyacademy";
    const password = "Learning@830$3mK2";

    await loginPage.goTo();
    await loginPage.login(username, password);
    await loginPage.acceptTerms();
    await loginPage.signInAndWaitForShop();

    await shopPage.waitForProducts();
    await expect(page).toHaveURL(/.*(loginpagePractise\/shop|angularpractice\/shop).*/);
    await expect(shopPage.getProductCardByName('iphone X')).toBeVisible();
});
