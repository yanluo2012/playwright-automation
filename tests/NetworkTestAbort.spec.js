const { test, expect } = require('@playwright/test');

test('Playwright practise', async ({ page }) => {
    // page.route('**/*.{jpg,png,jpeg}', async route => route.abort());

    const username = page.getByLabel('Username'); // default to { exact : false } partial match
    const signinButton = page.getByRole('button', { name: 'Sign In' });
    const cardTitles = page.locator('.card-body a');

    page.on('request', request => console.log(request.url()));
    page.on('response', response => console.log(response.url(), response.status()));
    
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

