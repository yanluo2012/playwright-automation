import type { APIRequestContext } from "@playwright/test";

type LoginPayload = {
    userEmail: string;
    userPassword: string;
};

type CreateOrderResponse = {
    token: string;
    orderId: string;
};

type Product = {
    _id: string;
    productName: string;
};

type ProductsResponse = {
    data?: Product[];
};

export class APIUtils {
    apiContext: APIRequestContext;
    loginPayload: LoginPayload;

    constructor(apiContext: APIRequestContext, loginPayload: LoginPayload) {
        this.apiContext = apiContext;
        this.loginPayload = loginPayload;
    }

    async getToken(): Promise<string> {
        const loginResponse = await this.apiContext.post(
            "https://rahulshettyacademy.com/api/ecom/auth/login",
            { data: this.loginPayload }
        );
        const loginResponseBody = await loginResponse.json();
        console.log("Login Response:", loginResponseBody);
        return loginResponseBody.token;
    }

    async getProductIdByName(productName: string, token: string): Promise<string> {
        const productsResponse = await this.apiContext.post(
            "https://rahulshettyacademy.com/api/ecom/product/get-all-products",
            {
                headers: { Authorization: token, "Content-Type": "application/json" },
            }
        );

        const productsJson = (await productsResponse.json()) as ProductsResponse;
        const products = productsJson.data ?? [];
        const product = products.find((item) => item.productName === productName);

        if (!product?._id) {
            throw new Error(`Product '${productName}' not found in API catalog`);
        }

        return product._id;
    }

    async createOrder(orderPayload: Record<string, unknown>): Promise<CreateOrderResponse> {
        const response = {
            token: await this.getToken(),
            orderId: "",
        };

        const orderResponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order", {
            data: orderPayload,
            headers: { 'Authorization': response.token, 'Content-Type': "application/json" }
        });
        const orderResponseJson = await orderResponse.json();

        if (!orderResponse.ok()) {
            throw new Error(`Create order failed (${orderResponse.status()}): ${JSON.stringify(orderResponseJson)}`);
        }

        const orderId = Array.isArray(orderResponseJson.orders) ? orderResponseJson.orders[0] : undefined;
        if (!orderId) {
            throw new Error(`Create order response missing order id: ${JSON.stringify(orderResponseJson)}`);
        }

        response.orderId = orderId;

        return response;
    }
}
