class DashboardPage {
    constructor(page) {
        this.products = page.locator('.card-body');
        this.productsText = page.locator('.card-body b');
    }
}
module.exports = { DashboardPage }