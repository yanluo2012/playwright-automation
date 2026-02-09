import type { APIRequestContext } from "@playwright/test";

type LoginPayload = {
    userEmail: string;
    userPassword: string;
};

type CreateOrderResponse = {
    token: string;
    orderId: string;
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
        return loginResponseBody.token;
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
        const orderId = orderResponseJson.orders[0];
        response.orderId = orderId;

        return response;
    }
}
