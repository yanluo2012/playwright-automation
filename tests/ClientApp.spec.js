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
    const allTitles = await cardTitles.allTextContents();

    const count = allTitles.length;
    const productName = "ZARA COAT 3";
    for (let i = 0; i < count; ++i) {
        if (await products.nth(i).locator('b').textContent() === productName) {
            // Add to cart
            await products.nth(i).getByRole('button', { name: 'Add To Cart' }).click();
            // await products.nth(i).locator("text= Add To Cart").click(); // Rahul's way
            break;
        }

    }

    await page.locator("[routerlink*='cart']").click();
    await page.locator("div li").first().waitFor();

    const bool = await page.getByRole('heading', { name: productName }).isVisible;
    // const bool = await page.locator("h3:has-text(producName)").isVisible; // Rahul's way

    expect(bool).toBeTruthy();
    // await page.locator("button:has-text('Checkout')").click(); // Rahul's way
    await page.getByRole('button', { name: 'Checkout' }).click();
    await page.locator("[placeholder*='Country']").pressSequentially("ind", { delay: 150 });
    const countryDropdown = page.locator(".ta-results");
    await countryDropdown.waitFor();

    const countryOptions = await countryDropdown.locator("button");
    const countryCount = await countryOptions.count();
    for (let i = 0; i < countryCount; ++i) {
        const text = await countryOptions.nth(i).textContent();
        if (text.trim() === "India") {
            await countryOptions.nth(i).click();
            break;
        }
    }

    await expect(page.locator("div.user__name label")).toHaveText(email);
    await page.locator(".action__submit").click();
    await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
    const orderId = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
    const realId = orderId.split(" ")[2];
    console.log(realId);

    await page.locator("button[routerlink*='myorders']").click();
    const orders = page.locator("tbody tr");
    await orders.first().waitFor();
    const orderCount = await orders.count();

    for (let i = 0; i < orderCount; ++i) {
        const text = await orders.nth(i).locator("th").textContent();
        if (text.trim() === realId) {
            await orders.nth(i).locator("td button:has-text('View')").click();
            break;
        }
    }

    const orderDetailsId = await page.locator(".-main").textContent();
    expect(realId === orderDetailsId).toBeTruthy();
});