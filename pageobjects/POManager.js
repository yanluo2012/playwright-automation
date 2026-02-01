const { LoginPage } = require('../pageobjects/LoginPage.js');  // relative path to ClientAppPO.spec.js
const { DashboardPage } = require('../pageobjects/DashboardPage.js');
const { CheckoutPage } = require('../pageobjects/CheckoutPage.js');

class POManager {
    constructor(page, expect) {
        this.loginPage = new LoginPage(page);
        this.dashboardPage = new DashboardPage(page);
        this.checkoutPage = new CheckoutPage(page, expect);
    }

    getLoginPage() {
        return this.loginPage;
    }

    getDashboardPage() {
        return this.dashboardPage;
    }

    getCheckoutPage() {
        return this.checkoutPage;
    }
}
module.exports = { POManager };