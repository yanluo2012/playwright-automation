import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://rahulshettyacademy.com/angularpractice/');
  await page.locator('form input[name="name"]').click();
  await page.locator('form input[name="name"]').fill('Yan');
  await page.locator('input[name="email"]').click();
  await page.locator('input[name="email"]').fill('yanluo2012@gmail.com');
  await page.getByRole('checkbox', { name: 'Check me out if you Love' }).check();
  await page.getByLabel('Gender').selectOption('Female');
  await page.getByRole('radio', { name: 'Employed' }).check();
  await page.locator('input[name="bday"]').fill('2026-02-05');
  await page.getByRole('button', { name: 'Submit' }).click();
  await page.getByRole('link', { name: 'Shop' }).click();
  await page.getByRole('link').filter({ hasText: /^$/ }).first().click();
  await page.getByRole('link', { name: 'Shop' }).click();
  await page.locator('app-card').filter({ hasText: 'iphone X $24.99 Lorem ipsum' }).getByRole('button').click();
  await page.locator('app-card').filter({ hasText: 'Samsung Note 8 $24.99 Lorem' }).getByRole('button').click();
  await page.getByText('Checkout ( 2 ) (current)').click();
  await page.getByRole('button', { name: 'Checkout' }).click();
  await page.getByRole('textbox', { name: 'Please choose your delivery' }).click();
  await page.getByRole('textbox', { name: 'Please choose your delivery' }).fill('India');
  await page.getByText('I agree with the term &').click();
  await page.getByRole('button', { name: 'Purchase' }).click();
});