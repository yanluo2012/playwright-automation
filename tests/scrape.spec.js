const { test, expect } = require('@playwright/test');
const { chromium } = require('playwright');
const fs = require('fs');

test('Scrape Amazon Teapots', async () => {
    const SEARCH_URL = 'https://www.amazon.com/s?k=teapots';
    const OUTPUT_FILE = 'amazon_teapots.html';
    const browser = await chromium.launch({ headless: false });
    const page = await browser.newPage();
    await page.goto(SEARCH_URL, { timeout: 60000 });
    // Amazon may keep background requests open, so avoid flaky networkidle timeouts.
    await page.waitForLoadState('domcontentloaded', { timeout: 60000 });
    const html = await page.content();
    fs.writeFileSync(OUTPUT_FILE, html, 'utf-8');
    console.log('Page saved successfully.');
    await browser.close();
});
