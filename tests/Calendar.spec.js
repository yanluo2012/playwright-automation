const { test, expect } = require('@playwright/test');
test('Calendar validation', async ({ page }) => {
    await page.goto('https://rahulshettyacademy.com/seleniumPractise/#/offers');

    const monthNumber = "6";
    const date = "15";
    const year = "2027";
    const expectedList = [monthNumber, date, year];

    await page.locator(".react-date-picker__inputGroup").click();
    await page.locator(".react-calendar__navigation__label").click();
    await page.locator(".react-calendar__navigation__label").click(); // click twice to go to year selection
    await page.getByText(year).click();
    await page.locator(".react-calendar__year-view__months__month").nth(Number(monthNumber) - 1).click();
    await page.locator("//abbr[text()='" + date + "']").click();

    const inputs = page.locator(".react-date-picker__inputGroup__input");
    for(let i = 0; i < expectedList.length; ++i) {
        await expect(inputs.nth(i)).toHaveValue(expectedList[i]);
    }
})