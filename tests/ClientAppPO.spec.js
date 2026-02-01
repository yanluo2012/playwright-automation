const { test, expect } = require('@playwright/test');
const { customtest } = require('../utils/test-base');
const { POManager } = require('../pageobjects/POManager');
const dataset = JSON.parse(JSON.stringify(require("../utils/placeorderTestData.json")));

for (const data of dataset) {
    test(`Order experience of ${data.username}`, async ({ page }) => {
        const poManager = new POManager(page, expect);
        const cardTitles = page.locator('.card-body b');
        const products = page.locator('.card-body');
        const loginPage = poManager.getLoginPage();
        const dashboardPage = poManager.getDashboardPage();
        const checkoutPage = poManager.getCheckoutPage();

        await loginPage.goTo();
        await loginPage.validLogin(data.username, data.password);
        await dashboardPage.searchProductAddCart(data.productName);
        await dashboardPage.navigateToCart();

        await page.locator("div li").first().waitFor();
        const bool = await page.getByRole('heading', { name: data.productName }).isVisible;
        expect(bool).toBeTruthy();
        await page.getByRole('button', { name: 'Checkout' }).click();

        await checkoutPage.selectCountrySubmit("ind", data.username);

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
};

customtest.only ("Test Data as Fixture", async ({page, testDataForOrder}) =>
{
        const poManager = new POManager(page, expect);
        const cardTitles = page.locator('.card-body b');
        const products = page.locator('.card-body');
        const loginPage = poManager.getLoginPage();
        const dashboardPage = poManager.getDashboardPage();
        const checkoutPage = poManager.getCheckoutPage();

        await loginPage.goTo();
        await loginPage.validLogin(testDataForOrder.username, testDataForOrder.password);
        await dashboardPage.searchProductAddCart(testDataForOrder.productName);
        await dashboardPage.navigateToCart();

        await page.locator("div li").first().waitFor();
        const bool = await page.getByRole('heading', { name: testDataForOrder.productName }).isVisible;
        expect(bool).toBeTruthy();
        await page.getByRole('button', { name: 'Checkout' }).click();

        await checkoutPage.selectCountrySubmit("ind", testDataForOrder.username);
});