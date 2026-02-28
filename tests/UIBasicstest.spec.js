const { test, expect } = require('@playwright/test');

test('Playwright practise', async ({ page }) => {
    const username = page.getByLabel('Username'); // default to { exact : false } partial match
    const signinButton = page.getByRole('button', { name: 'Sign In' });
    const cardTitles = page.locator('.card-body a');

    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');

    // Assert title (no need to fetch it manually)
    await expect(page).toHaveTitle('LoginPage Practise | Rahul Shetty Academy');

    // Fill login form
    await username.fill('rahulshetty');
    await page.getByLabel('Password').fill('Learning@830$3mK2');

    // Click sign in
    await signinButton.click();

    // Assert error message
    const errorMessage = page.getByText(/incorrect/i);
    await expect(errorMessage).toBeVisible();

    await username.fill('rahulshettyacademy');
    await signinButton.click();

    // wait until at least one element appears, otherwise allTextContents() may return empty array
    await cardTitles.first().waitFor();
    const allTitles = await cardTitles.allTextContents();
    console.log(allTitles);
});

// test('@Web UI Controls', async ({ page }) => {
//     const dropdown = page.getByRole('combobox');
//     const userRadioButton = page.locator(".radiotextsty").last();
//     const okButton = page.getByRole('button', { name: 'Okay' });
//     const termsCheckbox = page.locator("input#terms");
//     const blinkingText = page.getByText("Free Access to");
//     // const blinkingText = page.locator("[href*='documents-request']"); // Rahul's way

//     await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
//     await dropdown.selectOption("consult"); // select by value

//     // Select radio button Student and click okay in the pop up
//     await userRadioButton.check();
//     await okButton.click();
//     await expect(userRadioButton).toBeChecked();

//     // check and uncheck the terms checkbox
//     await termsCheckbox.check();
//     await expect(termsCheckbox).toBeChecked();
//     await termsCheckbox.uncheck();
//     await expect(termsCheckbox).not.toBeChecked();
//     // inner assertion page.locator("input#terms").isChecked() need to be awaited
//     expect(await termsCheckbox.isChecked()).toBeFalsy();

//     // assert blinking text
//     await expect(blinkingText).toHaveAttribute("class", "blinkingText");
// });


test('Child Window Handling', async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    const username = page.getByLabel('Username');
    const blinkingText = page.getByText("Free Access to");

    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');

    const [newPage] = await Promise.all([
        context.waitForEvent('page'), // listen for new opened tab
        blinkingText.click() // action that opens the tab
    ]);

    const redText = newPage.locator("p.im-para.red")
    const contact = await redText.textContent();
    console.log(contact);

    const arrayText = contact.split('@');
    const domain = arrayText[1].split(' ')[0];

    console.log(domain);

    await username.fill(domain);
    const newUsername = await username.inputValue();
    console.log("new username is ", newUsername);
})

test('First Playwright test', async ({ browser }) => {
    const context = await browser.newContext(); // create a new browser context (like incognito mode)
    const page = await context.newPage(); // create a new page in the context
    await page.goto('https://google.com/'); // navigate to the URL
});

