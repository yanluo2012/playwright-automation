const { test } = require('@playwright/test');

exports.customtest = test.extend({
    testDataForOrder: async ({ }, use) => {
        await use({
            username: "anshika@gmail.com",
            password: "Iamking@000",
            productName: "ADIDAS ORIGINAL"
        });
    }
});
