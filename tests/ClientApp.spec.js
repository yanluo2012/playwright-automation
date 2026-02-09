const { test, expect } = require('@playwright/test');

test('End to end order experience', async ({ page }) => {
    // Locators for product cards and titles
    const cardTitles = page.locator('.card-body b');
    const products = page.locator('.card-body');
    // Test credentials
    const email = "yanluo2012@gmail.com";
    const password = ".5x.xGRyB8h6RR#";

    // Navigate to login page
    await page.goto('https://rahulshettyacademy.com/client/#/auth/login');

    // Fill login form
    await page.getByPlaceholder("email@example.com").fill(email);
    await page.getByPlaceholder('enter your passsword').fill(password);

    // Click Login
    await page.getByRole('button', { name: 'Login' }).click();

    // // Rahul Shetty said if the page get feeds from API calls, waiting for netwrokidle will ganrantee the availability of elements 
    // await page.waitForLoadState('networkidle'); // some students reported flakiness using this line, Rahul suggested to use the follwoing line
    // Wait for product cards to render
    await page.locator(".card-body b").last().waitFor();
    const allTitles = await cardTitles.allTextContents();

    const count = allTitles.length;
    const productName = "ZARA COAT 3";
    // Find the target product and add to cart
    for (let i = 0; i < count; ++i) {
        if (await products.nth(i).locator('b').textContent() === productName) {
            // Add to cart
            await products.nth(i).getByRole('button', { name: 'Add To Cart' }).click();
            // await products.nth(i).locator("text= Add To Cart").click(); // Rahul's way
            break;
        }

    }

    // Open cart
    await page.locator("[routerlink*='cart']").click();
    await page.locator("div li").first().waitFor();

    // Verify product is in cart
    const bool = await page.getByRole('heading', { name: productName }).isVisible;
    // const bool = await page.locator("h3:has-text(producName)").isVisible; // Rahul's way

    expect(bool).toBeTruthy();
    // await page.locator("button:has-text('Checkout')").click(); // Rahul's way
    // Proceed to checkout
    await page.getByRole('button', { name: 'Checkout' }).click();
    // Type country and select from dropdown
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

    // Verify pre-filled email and submit order
    await expect(page.locator("div.user__name label")).toHaveText(email);
    await page.locator(".action__submit").click();
    // Validate order success banner and capture order id
    await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
    const orderId = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
    const realId = orderId.split(" ")[2];
    console.log(realId);

    // Navigate to orders history
    await page.locator("button[routerlink*='myorders']").click();
    const orders = page.locator("tbody tr");
    await orders.first().waitFor();
    const orderCount = await orders.count();

    // Find the order and open details
    for (let i = 0; i < orderCount; ++i) {
        const text = await orders.nth(i).locator("th").textContent();
        if (text.trim() === realId) {
            await orders.nth(i).locator("td button:has-text('View')").click();
            break;
        }
    }

    // Verify order details id matches the created order
    const orderDetailsId = await page.locator(".-main").textContent();
    expect(realId === orderDetailsId).toBeTruthy();
});