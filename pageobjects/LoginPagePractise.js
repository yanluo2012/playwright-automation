const { expect } = require('@playwright/test')

class LoginPagePractise {

constructor(page) {
    this.page = page;
    this.userName = page.getByLabel('Username');
    this.password = page.getByLabel('Password');
    this.termsCheckbox = page.getByRole('checkbox', { name: /I Agree to the terms and conditions/i });
    this.signInButton = page.getByRole('button', { name: 'Sign In' });
    this.errorMessage = page.getByText(/incorrect/i);
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

async verifyErrorMessage() {
    await expect(this.errorMessage).toBeVisible();
}

async signInAndWaitForShop() {
    await Promise.all([
        this.page.waitForURL(/.*(loginpagePractise\/shop|angularpractice\/shop).*/),
        this.signInButton.click()
    ]);
}

}
module.exports = { LoginPagePractise };
