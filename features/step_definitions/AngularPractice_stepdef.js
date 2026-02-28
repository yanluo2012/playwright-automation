const { Given, When, Then } = require('@cucumber/cucumber')

Given('launch the Angular Practice application', async function () {
    this.angularPracticePage = this.poManager.getAngularPracticePage();
    await this.angularPracticePage.goTo();
});

When('Select Date of Birth to {string}', async function (dateOfBirth) {
    await this.angularPracticePage.selectDateOfBirth(dateOfBirth);
});

Then('Verify Date of Birth is {string}', async function (dateOfBirth) {
    await this.angularPracticePage.verifyDateOfBirth(dateOfBirth);
});

When('Fill password with {string}', async function (password) {
    await this.angularPracticePage.fillPassword(password);
});

Then('Verify password is {string}', async function (password) {
    await this.angularPracticePage.verifyPassword(password);
});

When('Select Female from Gender dropdown', async function () {
    await this.angularPracticePage.selectGender('Female');
});

Then('Verify Female is selected in Gender dropdown', async function () {
    await this.angularPracticePage.verifyGender('Female');
});

When('Check the Ice Cream checkbox', async function () {
    await this.angularPracticePage.checkIceCreamCheckbox();
});

Then('Verify the checkbox is checked', async function () {
    await this.angularPracticePage.verifyIceCreamCheckboxChecked();
});

When('Select Employed employment status', async function () {
    await this.angularPracticePage.selectEmploymentStatus();
});

Then('Verify Employed employment status is selected', async function () {
    await this.angularPracticePage.verifyEmploymentStatus();
});

When('Click Sign In button', async function () {
    await this.angularPracticePage.clickSignInButton();
});

Then('Verify {string} message displayed', async function (message) {
    await this.angularPracticePage.verifySuccessMessage(message);
});

When('Click Shop link', async function () {
    await this.angularPracticePage.clickShopLink();
});

Then('Verify Blackberry phone product is on the page', async function () {
    await this.angularPracticePage.verifyProductOnPage('Blackberry');
});
