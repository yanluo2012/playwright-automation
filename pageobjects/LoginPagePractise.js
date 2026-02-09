class LoginPagePractise {

constructor(page) {
    this.page = page;
    this.userName = page.getByLabel('Username');
    this.password = page.getByLabel('Password');
    this.termsCheckbox = page.getByRole('checkbox', { name: /I Agree to the terms and conditions/i });
    this.signInButton = page.getByRole('button', { name: 'Sign In' });
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

async signInAndWaitForShop() {
    await Promise.all([
        this.page.waitForURL(/.*(loginpagePractise\/shop|angularpractice\/shop).*/),
        this.signInButton.click()
    ]);
}

}
module.exports = { LoginPagePractise };
