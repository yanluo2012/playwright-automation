import { test as base } from "@playwright/test";

type TestDataForOrder = {
    username: string;
    password: string;
    productName: string;
};

export const customtest = base.extend<{ testDataForOrder: TestDataForOrder }>({
    testDataForOrder: async ({}, use) => {
        await use({
            username: "yanluo2012@gmail.com",
            password: ".5x.xGRyB8h6RR#",
            productName: "ZARA COAT 3",
        });
    },
});
