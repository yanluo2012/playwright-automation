const { Given, When, Then } = require('@cucumber/cucumber')
const { expect } = require('@playwright/test')

// by default, cucumber has a timeout of 5s for each step, here we are overriding it to 100 seconds for the login step, as sometimes it may take more time to load the page and perform login action
Given('a login to loginpagePractise Ecommerce applicataion with {string} and {string}', { timeout: 100 * 1000 }, async function (username, password) {
    this.loginPagePractise = this.poManager.getLoginPagePractise();
    this.loginUsername = username;
    await this.loginPagePractise.goTo();
    await this.loginPagePractise.login(username, password);
    // await this.loginPagePractise.clickSignIn();
});

Then('Verify Error message is displayed', { timeout: 100 * 1000 }, async function () {
    await this.loginPagePractise.verifyErrorMessage();
});

Then('Verify {string} is displayed in Shop Page', { timeout: 100 * 1000 }, async function (productName) {
    this.shopPagePractise = this.poManager.getShopPagePractise();
    await this.shopPagePractise.waitForProducts();
    const productCard = await this.shopPagePractise.getProductCardByName(productName);
    await expect(productCard).toBeVisible({ timeout: 30000 });
})

Given('choose {string} role', async function (role) {
    await this.loginPagePractise.chooseRadioButton(role);
});


Given('agree to user role warning', { timeout: 100 * 1000 }, async function () {
    await this.loginPagePractise.agreenToUserRoleWarning();
});


Given('select {string} from dropdown', async function (option) {
    await this.loginPagePractise.selectOption(option);
});

Given('accept terms and conditions', { timeout: 100 * 1000 }, async function () {
    await this.loginPagePractise.acceptTerms();
});


Given('click on Sign In button', { timeout: 100 * 1000 }, async function () {
    await this.loginPagePractise.clickSignIn();
    if (this.loginUsername === 'rahulshettyacademy') {
        await this.loginPagePractise.waitForShopPage();
    }
});

Then('Verify blinking text is displayed', async function () {
    await this.loginPagePractise.verifyBlinkingText();
})

When('I click on blinking text', async function () {
    await this.loginPagePractise.clickBlinkingText();
})

Then('Verify mentor name is {string}', async function (mentorName) {
    await this.loginPagePractise.verifyMentorName(mentorName);
})
