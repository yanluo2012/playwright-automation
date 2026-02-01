const { test, expect, request } = require('@playwright/test');
const { APIUtils } = require('../utils/ApiUtils');
const loginPayload = { userEmail: "yanluo2012@gmail.com", userPassword: ".5x.xGRyB8h6RR#" };
const orderPayload = {
    orders: [
        {
            country: "Cuba",
            productOrderedId: "6964af52c941646b7a919472"
        }
    ]
};

let createOrderResponse;

test.beforeAll(async () => {
    const apiContext = await request.newContext();
    const apiUtils = new APIUtils(apiContext, loginPayload);

    // Create order
    createOrderResponse = await apiUtils.createOrder(orderPayload);
    console.log("orderId: ", createOrderResponse.orderId);
});

test('End to end order experience', async ({ page }) => {
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