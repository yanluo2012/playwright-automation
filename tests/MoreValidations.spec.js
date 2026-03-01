const { test, expect } = require('@playwright/test')

test.describe.configure({mode:'parallel'});

test("Screenshot & Visual comparision", async ({ page }) => {
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    await expect(page.getByRole('textbox', { name: 'Hide/Show Example' })).toBeVisible();
    await page.locator("#displayed-text").screenshot({path: 'patialScreenshot.png'});
    await page.getByRole('button', { name: 'Hide' }).click();
    await page.screenshot({path: 'screenshot.png'});
    await expect(page.locator("#displayed-text")).toBeHidden();
});

test("visual", async ({page}) => {
    await page.goto("https://www.google.com/");
    await expect(await page.screenshot()).toMatchSnapshot('google.png');
});