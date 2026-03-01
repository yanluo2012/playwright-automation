class WebAPIOrdersPage {
    constructor(page) {
        this.page = page;
        this.ordersRows = page.locator("tbody tr");
        this.orderDetailsId = page.locator(".-main");
    }

    async bootstrapSessionWithToken(token) {
        await this.page.addInitScript((value) => {
            window.localStorage.setItem("token", value);
        }, token);
    }

    async goToClientApp() {
        await this.page.goto("https://rahulshettyacademy.com/client/");
    }

    async openMyOrders() {
        await this.page.locator("button[routerlink*='myorders']").click();
        await this.ordersRows.first().waitFor();
    }

    async openOrderById(orderId) {
        const rowCount = await this.ordersRows.count();

        for (let i = 0; i < rowCount; ++i) {
            const currentOrderId = await this.ordersRows.nth(i).locator("th").textContent();
            if (currentOrderId && orderId.includes(currentOrderId.trim())) {
                await this.ordersRows.nth(i).locator("td button:has-text('View')").click();
                return;
            }
        }

        throw new Error(`Order '${orderId}' was not found in My Orders table`);
    }

    async getDisplayedOrderId() {
        const text = await this.orderDetailsId.textContent();
        return text ? text.trim() : "";
    }
}

module.exports = { WebAPIOrdersPage };
