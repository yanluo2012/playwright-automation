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
const fakePayloadOrders = { data: [], message: "No Orders" };

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
    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*",
        async route => {
            // intercepting response - API response -> browser -> render data on front end
            const response = await page.request.fetch(route.request());
            let body = JSON.stringify(fakePayloadOrders);
            route.fulfill({
                response,
                body

            })
        });

    await page.locator("button[routerlink*='myorders']").click();
    await page.waitForResponse("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*");
    console.log("message received: ", await page.locator(".mt-4").textContent());
});