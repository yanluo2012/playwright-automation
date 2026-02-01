const { test, expect } = require('@playwright/test');
const { POManager } = require('../pageobjects/POManager');
const dataSet = JSON.parse(JSON.stringify(require("../utils/placeorderTestData.json")));

test('End to end order experience', async ({ page }) => {
    const poManager = new POManager(page, expect);
    const cardTitles = page.locator('.card-body b');
    const products = page.locator('.card-body');
    const loginPage = poManager.getLoginPage();
    const dashboardPage = poManager.getDashboardPage();
    const checkoutPage = poManager.getCheckoutPage();

    await loginPage.goTo();
    await loginPage.validLogin(dataSet.username, dataSet.password);
    await dashboardPage.searchProductAddCart(dataSet.productName);
    await dashboardPage.navigateToCart();

    await page.locator("div li").first().waitFor();
    const bool = await page.getByRole('heading', { name: dataSet.productName }).isVisible;
    expect(bool).toBeTruthy();
    await page.getByRole('button', { name: 'Checkout' }).click();

    await checkoutPage.selectCountrySubmit("ind", dataSet.username);

    await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
    const orderId = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
    const realId = orderId.split(" ")[2];
    console.log(realId);

    await page.locator("button[routerlink*='myorders']").click();
    const orders = page.locator("tbody tr");
    await orders.first().waitFor();
    const orderCount = await orders.count();

    for (let i = 0; i < orderCount; ++i) {
        const text = await orders.nth(i).locator("th").textContent();
        if (text.trim() === realId) {
            await orders.nth(i).locator("td button:has-text('View')").click();
            break;
        }
    }

    const orderDetailsId = await page.locator(".-main").textContent();
    expect(realId === orderDetailsId).toBeTruthy();
});