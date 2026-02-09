import { test, expect } from "@playwright/test";
import { customtest } from "../utils/test-base";
import { POManager } from "../pageobjects_ts/POManager";
import placeorderTestData from "../utils/placeorderTestData.json";

const dataset = JSON.parse(JSON.stringify(placeorderTestData));

for (const data of dataset) {
    test(`Order experience of ${data.username}`, async ({ page }) => {
        const poManager = new POManager(page);
        const loginPage = poManager.getLoginPage();
        const dashboardPage = poManager.getDashboardPage();
        const orderViewPage = poManager.getOrdersReviewPage();

        await loginPage.goTo();
        await loginPage.validLogin(data.username, data.password);
        await dashboardPage.searchProductAddCart(data.productName);
        await dashboardPage.navigateToCart();

        await page.locator("div li").first().waitFor();
        const bool = await page.getByRole('heading', { name: data.productName }).isVisible;
        expect(bool).toBeTruthy();
        await page.getByRole('button', { name: 'Checkout' }).click();

        await orderViewPage.searchCountryAndSelect("ind", "India");
        await orderViewPage.verifyEmailId(data.username);
        const orderId = await orderViewPage.submitAndGetOrderId();
        const realId = orderId?.split(" ")[2] ?? "";
        console.log(realId);

        await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");

        await page.locator("button[routerlink*='myorders']").click();
        const orders = page.locator("tbody tr");
        await orders.first().waitFor();
        const orderCount = await orders.count();

        for (let i = 0; i < orderCount; ++i) {
            const text = await orders.nth(i).locator("th").textContent();
            if ((text ?? "").trim() === realId) {
                await orders.nth(i).locator("td button:has-text('View')").click();
                break;
            }
        }

        const orderDetailsId = await page.locator(".-main").textContent();
        expect(realId === orderDetailsId).toBeTruthy();
    });
};

customtest("@Web Test Data as Fixture", async ({ page, testDataForOrder }) => {
        const poManager = new POManager(page);
        const loginPage = poManager.getLoginPage();
        const dashboardPage = poManager.getDashboardPage();
        const orderViewPage = poManager.getOrdersReviewPage();

        await loginPage.goTo();
        await loginPage.validLogin(testDataForOrder.username, testDataForOrder.password);
        await dashboardPage.searchProductAddCart(testDataForOrder.productName);
        await dashboardPage.navigateToCart();

        await page.locator("div li").first().waitFor();
        const bool = await page.getByRole('heading', { name: testDataForOrder.productName }).isVisible;
        expect(bool).toBeTruthy();
        await page.getByRole('button', { name: 'Checkout' }).click();

        await orderViewPage.searchCountryAndSelect("ind", "India");
});