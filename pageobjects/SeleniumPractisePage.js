const { expect } = require('@playwright/test');

class SeleniumPractisePage {
    constructor(page) {
        this.page = page;
        this.searchInput = this.page.locator('.search-keyword');
        this.firstVisibleProduct = this.page.locator('.products .product:visible').first();
        this.firstVisibleProductName = this.firstVisibleProduct.locator('h4.product-name');
        this.firstVisibleAddToCartButton = this.firstVisibleProduct.getByRole('button', { name: 'ADD TO CART' });
        this.cartCount = this.page.locator('.cart-count');
    }

    async goTo() {
        await this.page.goto('https://rahulshettyacademy.com/seleniumPractise/#/');
    }

    async searchProduct(productName) {
        await this.searchInput.fill(productName);
    }

    async verifyFirstVisibleProduct(expectedProductText) {
        await expect(this.firstVisibleProductName).toContainText(expectedProductText);
    }

    async addFirstVisibleProductToCart() {
        await this.firstVisibleAddToCartButton.click();
    }

    async verifyCartCount(expectedCount) {
        await expect(this.cartCount).toHaveText(expectedCount);
    }

    async clickTopDeals() {
        const [newPage] = await Promise.all([
            this.page.context().waitForEvent('page', { timeout: 5000 }).catch(() => null),
            this.page.getByRole('link', { name: 'Top Deals' }).click()
        ]);

        this.offersPage = newPage || this.page;
        await this.offersPage.waitForLoadState('domcontentloaded');
    }

    async chooseDeliveryDate(date, month, year) {
        const targetPage = this.offersPage || this.page;
        const monthNumber = this.getMonthNumber(month);

        await targetPage.locator('.react-date-picker__inputGroup').click();
        await targetPage.locator('.react-calendar__navigation__label').click();
        await targetPage.locator('.react-calendar__navigation__label').click();
        await targetPage.getByText(year, { exact: true }).click();
        await targetPage.locator('.react-calendar__year-view__months__month').nth(monthNumber - 1).click();
        await targetPage.locator(`//abbr[text()='${date}']`).click();
    }

    async verifyDeliveryDate(date, month, year) {
        const targetPage = this.offersPage || this.page;
        const monthNumber = this.getMonthNumber(month).toString();
        const expectedList = [monthNumber, date, year];
        const inputs = targetPage.locator('.react-date-picker__inputGroup__input');

        for (let i = 0; i < expectedList.length; ++i) {
            await expect(inputs.nth(i)).toHaveValue(expectedList[i]);
        }
    }

    getMonthNumber(month) {
        const monthMap = {
            January: 1,
            February: 2,
            March: 3,
            April: 4,
            May: 5,
            June: 6,
            July: 7,
            August: 8,
            September: 9,
            October: 10,
            November: 11,
            December: 12
        };
        return monthMap[month];
    }
}

module.exports = { SeleniumPractisePage };