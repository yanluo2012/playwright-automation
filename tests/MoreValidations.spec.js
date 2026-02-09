const { test, expect } = require('@playwright/test')

test.describe.configure({mode:'parallel'});
test("Popup validation", async ({ page }) => {

    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    // await expect(page.locator("#displayed-text")).toBeVisible(); //getByRole('textbox', { name: 'Hide/Show Example' })
    await expect(page.getByRole('textbox', { name: 'Hide/Show Example' })).toBeVisible();
    // await page.locator("#hide-textbox").click(); //getByRole('button', { name: 'Hide' })
    await page.getByRole('button', { name: 'Hide' }).click();
    await expect(page.locator("#displayed-text")).toBeHidden();

    page.on("dialog", dialog => dialog.accept()); // or dialog.dismiss()
    await page.locator("#confirmbtn").click();

    await page.locator("#mousehover").hover();

    const framesPage = page.frameLocator("#courses-iframe");
    // await framesPage.locator("li a[href*='lifetime-access']:visible").click(); // Rahul's way
    await framesPage.getByRole('link', { name: 'NEW All Access plan' }).click();
    const textCheck = await framesPage.locator(".text h2").textContent();
    const count = textCheck.split(" ")[1];
    console.log(count);
});

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