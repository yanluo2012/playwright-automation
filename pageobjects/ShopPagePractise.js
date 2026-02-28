class ShopPagePractise {

constructor(page) {
    this.page = page;
    this.productCards = page.locator('app-card');
}

async waitForProducts() {
    await this.productCards.first().waitFor();
}

getProductCardByName(productName) {
    // return this.productCards.filter({ hasText: productName }).first();
    return this.page.getByRole('link', { name: productName });
}

}
module.exports = { ShopPagePractise };
