const { Given, When, Then } = require('@cucumber/cucumber')
const { expect } = require('@playwright/test')

// by default, cucumber has a timeout of 5s for each step, here we are overriding it to 100 seconds for the login step, as sometimes it may take more time to load the page and perform login action
Given('a login to loginpagePractise Ecommerce applicataion with {string} and {string}', { timeout: 100 * 1000 }, async function (username, password) {
    this.loginPagePractise = this.poManager.getLoginPagePractise();
    await this.loginPagePractise.goTo();
    await this.loginPagePractise.login(username, password);
    // await this.loginPagePractise.clickSignIn();
});

Then('Verify Error message is displayed', async function () {
    await this.loginPagePractise.verifyErrorMessage();
});

Then('Verify {string} is displayed in Shop Page', async function (productName) {
    this.shopPagePractise = this.poManager.getShopPagePractise();
    const productCard = await this.shopPagePractise.getProductCardByName(productName);
    await expect(productCard).toBeVisible();
})

Given('choose {string} role', async function (role) {
    await this.loginPagePractise.chooseRadioButton(role);
});


Given('agree to user role warning', async function () {
    await this.loginPagePractise.agreenToUserRoleWarning();
});


Given('select {string} from dropdown', async function (option) {
    await this.loginPagePractise.selectOption(option);
});

Given('accept terms and conditions', async function () {
    await this.loginPagePractise.acceptTerms();
});


Given('click on Sign In button', async function () {
    await this.loginPagePractise.clickSignIn();
});

Then('Verify blinking text is displayed', async function () {
    await this.loginPagePractise.verifyBlinkingText();
})
