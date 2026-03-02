class APIUtils {
    constructor(apiContext, loginPayload) {
        this.apiContext = apiContext;
        this.loginPayload = loginPayload;
    }

    async getToken() {
        const loginResponse = await this.apiContext.post(
            "https://rahulshettyacademy.com/api/ecom/auth/login",
            { data: this.loginPayload }
        );
        const loginResponseBody = await loginResponse.json();
        console.log("Login Response:", loginResponseBody);
        return loginResponseBody.token;
    }

    async getProductIdByName(productName, token) {
        const productsResponse = await this.apiContext.post(
            "https://rahulshettyacademy.com/api/ecom/product/get-all-products",
            {
                headers: { Authorization: token, "Content-Type": "application/json" },
            }
        );

        const productsJson = await productsResponse.json();
        const products = productsJson.data ?? [];
        const product = products.find((item) => item.productName === productName);

        if (!product?._id) {
            throw new Error(`Product '${productName}' not found in API catalog`);
        }

        return product._id;
    }

    async createOrderWithToken(orderPayload, token) {
        const orderResponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order", {
            data: orderPayload,
            headers: { Authorization: token, "Content-Type": "application/json" },
        });
        const orderResponseJson = await orderResponse.json();

        if (!orderResponse.ok()) {
            throw new Error(`Create order failed (${orderResponse.status()}): ${JSON.stringify(orderResponseJson)}`);
        }

        const orderId = Array.isArray(orderResponseJson.orders) ? orderResponseJson.orders[0] : undefined;
        if (!orderId) {
            throw new Error(`Create order response missing order id: ${JSON.stringify(orderResponseJson)}`);
        }

        return orderId;
    }

    async createOrderByProductName(productName, country = "Cuba") {
        const token = await this.getToken();
        const productOrderedId = await this.getProductIdByName(productName, token);
        const orderPayload = {
            orders: [{ country, productOrderedId }],
        };

        const orderId = await this.createOrderWithToken(orderPayload, token);
        return { token, orderId };
    }

    async createOrder(orderPayload) {
        const token = await this.getToken();
        const orderId = await this.createOrderWithToken(orderPayload, token);
        return { token, orderId };
    }
}

module.exports = { APIUtils };
