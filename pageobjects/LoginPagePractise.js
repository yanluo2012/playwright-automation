const { expect } = require('@playwright/test')

class LoginPagePractise {

    constructor(page) {
        this.page = page;
        this.userName = page.getByLabel('Username');
        this.password = page.getByLabel('Password');
        this.termsCheckbox = page.getByRole('checkbox', { name: /I Agree to the terms and conditions/i });
        this.signInButton = page.getByRole('button', { name: 'Sign In' });
        this.errorMessage = page.getByText(/incorrect/i);
        this.dropdown = page.getByRole('combobox');
        this.okUserRoleWarning = page.getByRole('button', { name: 'Okay' });
        this.blinkingText = page.getByText("Free Access to");
    }

    async goTo() {
        await this.page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    }

    async login(username, password) {
        await this.userName.fill(username);
        await this.password.fill(password);
    }

    async acceptTerms() {
        await this.termsCheckbox.check();
    }

    async clickSignIn() {
        await this.signInButton.click();
    }

    async chooseRadioButton(role) {
        await this.page.locator('.radiotextsty', { hasText: role }).click();
    }

    async selectOption(option) {
        await this.dropdown.selectOption(option);
    }

    async agreenToUserRoleWarning() {
        await this.okUserRoleWarning.click();
    }

    async verifyErrorMessage() {
        await expect(this.errorMessage).toBeVisible();
    }

    async signInAndWaitForShop() {
        await Promise.all([
            this.page.waitForURL(/.*(loginpagePractise\/shop|angularpractice\/shop).*/),
            this.signInButton.click()
        ]);
    }

    async verifyBlinkingText() {
        await expect(this.blinkingText).toHaveAttribute("class", "blinkingText");
    }

    async clickBlinkingText() {
        await this.blinkingText.click();
        const [newPage] = await Promise.all([
            context.waitForEvent('page'), // listen for new opened tab
            this.blinkingText.click() // action that opens the tab
        ]);
    }

}
module.exports = { LoginPagePractise };