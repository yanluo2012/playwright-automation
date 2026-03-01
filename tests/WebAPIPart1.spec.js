const { test, expect, request } = require('@playwright/test');
const { APIUtils } = require('../utils/ApiUtils');
const loginPayload = { userEmail: "yanluo2012@gmail.com", userPassword: ".5x.xGRyB8h6RR#" };
const productName = "ZARA COAT 3";

let createOrderResponse;

test.beforeAll(async () => {
    const apiContext = await request.newContext();
    const apiUtils = new APIUtils(apiContext, loginPayload);
    const token = await apiUtils.getToken();
    const productOrderedId = await apiUtils.getProductIdByName(productName, token);
    const orderPayload = {
        orders: [
            {
                country: "Cuba",
                productOrderedId
            }
        ]
    };

    // Create order
    createOrderResponse = await apiUtils.createOrder(orderPayload);
    console.log("orderId: ", createOrderResponse.orderId);
});

test('@API End to end order experience', async ({ page }) => {
    console.log("token: " + createOrderResponse.token);
    await page.addInitScript(value => {
        window.localStorage.setItem('token', value);
    }, createOrderResponse.token);

    await page.goto("https://rahulshettyacademy.com/client/");
    await page.locator("button[routerlink*='myorders']").click();
    const orders = page.locator("tbody tr");
    await orders.first().waitFor();
    const orderCount = await orders.count();

    for (let i = 0; i < orderCount; ++i) {
        const text = await orders.nth(i).locator("th").textContent();
        console.log("row ", i, " : ", text);
        if (text.includes(createOrderResponse.orderId)) {
            await orders.nth(i).locator("td button:has-text('View')").click();
            break;
        }
    }

    const orderDetailsId = await page.locator(".-main").textContent();
    expect(createOrderResponse.orderId === orderDetailsId).toBeTruthy();
});