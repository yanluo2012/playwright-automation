const { chromium } = require('playwright')
const { POManager } = require('../../pageobjects/POManager');
const { Before, AfterStep, Status } = require('@cucumber/cucumber');

Before(async function () {
    const browser = await chromium.launch({ headless: false });
    const context = await browser.newContext();
    this.page = await context.newPage();
    this.poManager = new POManager(this.page);
});

AfterStep(async function ({ pickle, result }) {
    if (result.status === Status.FAILED) {
        const screenshot = await this.page.screenshot({ path: `screenshots/${pickle.name.replace(/ /g, '_')}.png` });
        this.attach(screenshot, 'image/png');
    }
});