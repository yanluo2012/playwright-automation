const { Given, When, Then } = require('@cucumber/cucumber');
const { expect, request } = require('@playwright/test');
const { WebAPIDrivenPage } = require('../../pageobjects/WebApiDrivenPage');
const { APIUtils } = require('../../utils/ApiUtils');

Given('an API created order for {string} with {string} and {string}', async function (productName, userEmail, userPassword) {
    const apiContext = await request.newContext();
    const apiUtils = new APIUtils(apiContext, { userEmail, userPassword });
    const createOrderResponse = await apiUtils.createOrderByProductName(productName, 'Cuba');

    this.apiToken = createOrderResponse.token;
    this.createdOrderId = createOrderResponse.orderId;

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
