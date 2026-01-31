const { test, expect } = require('@playwright/test');

test('Security test request intercept', async ({ page }) => {
    const email = "yanluo2012@gmail.com";
    const password = ".5x.xGRyB8h6RR#";
    await page.goto('https://rahulshettyacademy.com/client/#/auth/login');
    await page.getByPlaceholder("email@example.com").fill(email);
    await page.getByPlaceholder('enter your passsword').fill(password);
    await page.getByRole('button', { name: 'Login' }).click();
    await page.locator(".card-body b").last().waitFor();

    await page.locator("[routerlink*='myorders']").click();
    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=*",
        async route => route.continue({
            url: 'https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=621661f884b053f676546554'
        })
    )
    await page.getByRole('button', { name: 'View' }).first().click();
    // await page.pause();
    await expect(
        page.getByText("not authorize")
    ).toBeVisible();
});