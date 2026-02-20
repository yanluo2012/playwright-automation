const { Given, When, Then } = require('@cucumber/cucumber')
const { expect } = require('@playwright/test')

// by default, cucumber has a timeout of 5s for each step, here we are overriding it to 10 seconds for the login step, as sometimes it may take more time to load the page and perform login action
Given('a login to Ecommerce applicataion with {string} and {string}', { timeout: 10 * 1000 }, async function (username, password) {
    const loginPage = this.poManager.getLoginPage();
    await loginPage.goTo();
    await loginPage.validLogin(username, password);
});


When('Add {string} to Cart', async function (productName) {
    console.log("Product Name is: " + productName);
    this.dashboardPage = this.poManager.getDashboardPage();
    await this.dashboardPage.searchProductAddCart(productName);
    await this.dashboardPage.navigateToCart();
});


Then('Verify {string} is displayed in Cart', async function (productName) {
    const cartPage = this.poManager.getCartPage();
    await cartPage.VerifyProductIsDisplayed(productName);
    await cartPage.Checkout();
});


When('Enter valid details and Place the Order', async function () {
    const ordersReviewPage = this.poManager.getOrdersReviewPage();
    await ordersReviewPage.searchCountryAndSelect("ind", "India");
    this.orderId = await ordersReviewPage.SubmitAndGetOrderId();
    console.log(this.orderId);
});


Then('Verify order in present in the OrderHistory', async function () {
    await this.dashboardPage.navigateToOrders();
    const ordersHistoryPage = this.poManager.getOrdersHistoryPage();
    await ordersHistoryPage.searchOrderAndSelect(this.orderId);
    expect(this.orderId.includes(await ordersHistoryPage.getOrderId())).toBeTruthy();
});

Given('a login to Ecommerce2 applicataion with {string} and {string}', async function (username, password) {
    await this.page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    await expect(this.page).toHaveTitle('LoginPage Practise | Rahul Shetty Academy');
    await this.page.getByLabel('Username').fill(username);
    await this.page.getByLabel('Password').fill(password);
    await this.page.getByRole('button', { name: 'Sign In' }).click();
});

Then('Verify Error message is displayed', async function () {
    const errorMessage = this.page.getByText(/incorrect/i);
    await expect(errorMessage).toBeVisible();
});
