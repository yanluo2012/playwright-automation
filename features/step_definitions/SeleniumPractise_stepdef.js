const { Given, When, Then } = require('@cucumber/cucumber');

Given('launch the Selenium Practice application', async function () {
    this.seleniumPractisePage = this.poManager.getSeleniumPractisePage();
    await this.seleniumPractisePage.goTo();
});

When('Search for product {string}', async function (productName) {
    await this.seleniumPractisePage.searchProduct(productName);
});

Then('Verify product {string} is displayed', async function (productName) {
    await this.seleniumPractisePage.verifyFirstVisibleProduct(productName);
});

When('Add the searched product to cart', async function () {
    await this.seleniumPractisePage.addFirstVisibleProductToCart();
});

Then('Verify cart count is {string}', async function (count) {
    await this.seleniumPractisePage.verifyCartCount(count);
});

When('Click Top Deals link', async function () {
    await this.seleniumPractisePage.clickTopDeals();
});

When('Choose Delivery Date to {string} {string} {string}', async function (date, month, year) {
    await this.seleniumPractisePage.chooseDeliveryDate(date, month, year);
});

Then('Verify Delivery Date is {string} {string} {string}', async function (date, month, year) {
    await this.seleniumPractisePage.verifyDeliveryDate(date, month, year);
});
