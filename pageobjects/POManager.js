const { LoginPage } = require('./LoginPage');
const { DashboardPage } = require('./DashboardPage');
const { OrdersHistoryPage } = require('./OrdersHistoryPage');
const { OrdersReviewPage } = require('./OrdersReviewPage');
const { CartPage } = require('./CartPage');
const { LoginPagePractise } = require('./LoginPagePractise');
const { ShopPagePractise } = require('./ShopPagePractise');

class POManager {
    constructor(page, context) {
        this.context = context;
        this.page = page;
        this.loginPage = new LoginPage(this.page);
        this.loginPagePractise = new LoginPagePractise(this.page, this.context);
        this.shopPagePractise = new ShopPagePractise(this.page);
        this.dashboardPage = new DashboardPage(this.page);
        this.ordersHistoryPage = new OrdersHistoryPage(this.page);
        this.ordersReviewPage = new OrdersReviewPage(this.page);
        this.cartPage = new CartPage(this.page);
    }

    getLoginPage() {
        return this.loginPage;
    }

    getLoginPagePractise() {
        return this.loginPagePractise;
    }

    getCartPage() {
        return this.cartPage;
    }

    getDashboardPage() {
        return this.dashboardPage;
    }

    getOrdersHistoryPage() {
        return this.ordersHistoryPage;
    }

    getOrdersReviewPage() {
        return this.ordersReviewPage;
    }

    getShopPagePractise() {
        return this.shopPagePractise;
    }
}

module.exports = { POManager };