const { test, expect } = require('@playwright/test');

test('End to end order experience', async ({ page }) => {
    const cardTitles = page.locator('.card-body b');
    const products = page.locator('.card-body');
    const email = "yanluo2012@gmail.com";
    const password = ".5x.xGRyB8h6RR#";

    await page.goto('https://rahulshettyacademy.com/client/#/auth/login');

    // Fill login form
    await page.getByPlaceholder("email@example.com").fill(email);
    await page.getByPlaceholder('enter your passsword').fill(password);

    // Click Login
    await page.getByRole('button', { name: 'Login' }).click();

    // // Rahul Shetty said if the page get feeds from API calls, waiting for netwrokidle will ganrantee the availability of elements 
    // await page.waitForLoadState('networkidle'); // some students reported flakiness using this line, Rahul suggested to use the follwoing line
    await page.locator(".card-body b").last().waitFor();
    const productName = "ZARA COAT 3";
    const productCard = await page.locator(".card-body").filter({ hasText: productName });
    await productCard.getByRole('button', { name: 'Add To Cart' }).click();

    // await page.locator("[routerlink*='cart']").click();
    await page.getByRole("listitem").getByRole("button", { name: "Cart" }).click();

    await page.locator("div li").first().waitFor();
    await expect(page.getByText(productName)).toBeVisible();

    await page.getByRole('button', { name: 'Checkout' }).click();
    await page.getByPlaceholder("Select Country").pressSequentially("ind", { delay: 150 });

    await page.getByRole("button", { name: "India"}).nth(1).click();

    await expect(page.locator("div.user__name label")).toHaveText(email);
    await page.getByText("PLACE ORDER").click();

    await expect(page.getByText("Thankyou for the order.")).toBeVisible();
    const orderId = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
    const realId = orderId.split(" ")[2];
    console.log(realId);

    await page.getByRole('button', { name: 'ORDERS' }).click();
    const orders = page.locator("tbody tr");
    await orders.first().waitFor();
    const orderCount = await orders.count();

    for (let i = 0; i < orderCount; ++i) {
        const text = await orders.nth(i).locator("th").textContent();
        if (text.trim() === realId) {
            await orders.nth(i).getByRole('button', { name: 'View' }).click();
            break;
        }
    }

    const orderDetailsId = await page.locator(".-main").textContent();
    expect(realId === orderDetailsId).toBeTruthy();
});