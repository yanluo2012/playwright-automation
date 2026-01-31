class LoginPage {
    constructor(page) {
        this.signInbutton = page.getByRole('button', { name: 'Login' });
        this.username = page.getByPlaceholder("email@example.com");
        this.password = page.getByPlaceholder('enter your passsword');
        this.page = page;
    }

    async goTo() {
        await this.page.goto('https://rahulshettyacademy.com/client/#/auth/login');
    }

    async validLogin(username, password) {
        await this.username.fill(username);
        await this.password.fill(password);
        await this.signInbutton.click();
    }
}

module.exports = { LoginPage }