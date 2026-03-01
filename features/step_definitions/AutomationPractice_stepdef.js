const { Given, When, Then } = require('@cucumber/cucumber');

Given('launch the Automation Practice application', { timeout: 100 * 1000 }, async function () {
    this.automationPracticePage = this.poManager.getAutomationPracticePage();
    await this.automationPracticePage.goTo();
});

Then('Verify Hide Show textbox is visible', async function () {
    await this.automationPracticePage.verifyHideShowTextboxVisible();
});

When('Click Hide button', async function () {
    await this.automationPracticePage.clickHideButton();
});

Then('Verify Hide Show textbox is hidden', async function () {
    await this.automationPracticePage.verifyHideShowTextboxHidden();
});

When('Accept confirm dialog', async function () {
    await this.automationPracticePage.acceptConfirmDialogAndClick();
});

When('Hover over Mouse Hover button', async function () {
    await this.automationPracticePage.hoverMouseOverButton();
});

When('Click NEW All Access plan in iframe', async function () {
    await this.automationPracticePage.clickNewAllAccessPlanInFrame();
});

Then('Verify frame heading contains {string}', async function (text) {
    await this.automationPracticePage.verifyFrameHeadingContains(text);
});
