const { Given, When, Then } = require('@cucumber/cucumber');
const { expect, request } = require('@playwright/test');
const { WebAPIDrivenPage } = require('../../pageobjects/WebApiDrivenPage');

Given('an API created order for {string} with {string} and {string}', async function (productName, userEmail, userPassword) {
    const apiContext = await request.newContext();

    const loginResponse = await apiContext.post('https://rahulshettyacademy.com/api/ecom/auth/login', {
        data: { userEmail, userPassword }
    });
    const loginJson = await loginResponse.json();

    if (!loginResponse.ok() || !loginJson.token) {
        throw new Error(`Login failed (${loginResponse.status()}): ${JSON.stringify(loginJson)}`);
    }

    this.apiToken = loginJson.token;

    const productsResponse = await apiContext.post('https://rahulshettyacademy.com/api/ecom/product/get-all-products', {
        headers: {
            Authorization: this.apiToken,
            'Content-Type': 'application/json'
        }
    });
    const productsJson = await productsResponse.json();

    if (!productsResponse.ok()) {
        throw new Error(`Get products failed (${productsResponse.status()}): ${JSON.stringify(productsJson)}`);
    }

    const products = productsJson.data ?? [];
    const matchedProduct = products.find((product) => product.productName === productName);

    if (!matchedProduct?._id) {
        throw new Error(`Product '${productName}' not found in API catalog`);
    }

    const orderPayload = {
        orders: [{
            country: 'Cuba',
            productOrderedId: matchedProduct._id
        }]
    };

    const createOrderResponse = await apiContext.post('https://rahulshettyacademy.com/api/ecom/order/create-order', {
        data: orderPayload,
        headers: {
            Authorization: this.apiToken,
            'Content-Type': 'application/json'
        }
    });

    const createOrderJson = await createOrderResponse.json();

    if (!createOrderResponse.ok()) {
        throw new Error(`Create order failed (${createOrderResponse.status()}): ${JSON.stringify(createOrderJson)}`);
    }

    this.createdOrderId = Array.isArray(createOrderJson.orders) ? createOrderJson.orders[0] : undefined;
    if (!this.createdOrderId) {
        throw new Error(`Create order response missing order id: ${JSON.stringify(createOrderJson)}`);
    }

    await apiContext.dispose();
});

When('I open the client app with the API token', async function () {
    this.webApiDrivenPage = new WebAPIDrivenPage(this.page);
    await this.webApiDrivenPage.bootstrapSessionWithToken(this.apiToken);
    await this.webApiDrivenPage.goToClientApp();
});

When('I open My Orders and view the API created order', async function () {
    await this.webApiDrivenPage.openMyOrders();
    await this.webApiDrivenPage.openOrderById(this.createdOrderId);
});

Then('the order details should match the API created order id', async function () {
    const displayedOrderId = await this.webApiDrivenPage.getDisplayedOrderId();
    expect(displayedOrderId).toBe(this.createdOrderId);
});
