const { test, expect } = require('@playwright/test');

test('Playwright special locators', async ({ page }) => {
    await page.goto('https://rahulshettyacademy.com/angularpractice/');

    await page.getByPlaceholder("Password").fill("learning123");
    await page.getByLabel("Gender").selectOption("Female");
    await page.getByLabel('Check me out if you Love IceCreams!').click();
    await page.getByLabel('Employed').check();
    await page.getByRole('button', { name: 'Submit' }).click();
    await page.getByText('Success! The Form has been submitted successfully!').waitFor();
    await page.getByRole('link', { name: 'Shop', exact: true }).click();
    await page.locator("app-card").filter({ hasText: 'Nokia Edge' }).getByRole('button').click();
})
