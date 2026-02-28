const { expect } = require('@playwright/test')

class LoginPagePractise {

    constructor(page, context) {
        this.context = context;
        this.page = page;
        this.userName = this.page.getByLabel('Username');
        this.password = this.page.getByLabel('Password');
        this.termsCheckbox = this.page.getByRole('checkbox', { name: /I Agree to the terms and conditions/i });
        this.signInButton = this.page.getByRole('button', { name: 'Sign In' });
        this.errorMessage = this.page.getByText(/incorrect/i);
        this.dropdown = this.page.getByRole('combobox');
        this.okUserRoleWarning = this.page.getByRole('button', { name: 'Okay' });
        this.blinkingText = this.page.getByText("Free Access to");
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
            this.context.waitForEvent('page'), // listen for new opened tab
            this.blinkingText.click() // action that opens the tab
        ]);
        this.newPage = newPage;
    }

    async verifyMentorName(mentorName) {
        const redText = this.newPage.locator("p.im-para.red")
        const contact = await redText.textContent();
        console.log(contact);

        const arrayText = contact.split('@');
        const domain = arrayText[1].split(' ')[0];

        console.log(domain);
        expect(domain).toBe(mentorName);
    }

}
module.exports = { LoginPagePractise };