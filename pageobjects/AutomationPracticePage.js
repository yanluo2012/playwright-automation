const { expect } = require('@playwright/test');

class AutomationPracticePage {
    constructor(page) {
        this.page = page;
        this.hideShowTextbox = this.page.getByRole('textbox', { name: 'Hide/Show Example' });
        this.hideButton = this.page.getByRole('button', { name: 'Hide' });
        this.confirmButton = this.page.locator('#confirmbtn');
        this.mouseHoverButton = this.page.locator('#mousehover');
        this.framesPage = this.page.frameLocator('#courses-iframe');
        this.newAccessPlanLink = this.framesPage.getByRole('link', { name: 'NEW All Access plan' });
        this.frameHeading = this.framesPage.locator('.text h2');
    }

    async goTo() {
        await this.page.goto('https://rahulshettyacademy.com/AutomationPractice/');
    }

    async verifyHideShowTextboxVisible() {
        await expect(this.hideShowTextbox).toBeVisible();
    }

    async clickHideButton() {
        await this.hideButton.click();
    }

    async verifyHideShowTextboxHidden() {
        await expect(this.hideShowTextbox).toBeHidden();
    }

    async acceptConfirmDialogAndClick() {
        this.page.once('dialog', dialog => dialog.accept()); // or dialog.dismiss()
        await this.confirmButton.click();
    }

    async hoverMouseOverButton() {
        await this.mouseHoverButton.hover();
    }

    async clickNewAllAccessPlanInFrame() {
        await this.newAccessPlanLink.click();
    }

    async verifyFrameHeadingContains(text) {
        await expect(this.frameHeading).toContainText(text);
    }
}

module.exports = { AutomationPracticePage };