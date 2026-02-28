const { chromium } = require('playwright')
const { POManager } = require('../../pageobjects/POManager');
const { Before, AfterStep, Status } = require('@cucumber/cucumber');

Before(async function () {
    const browser = await chromium.launch({ headless: false });
    this.context = await browser.newContext();
    this.page = await this.context.newPage();
    this.poManager = new POManager(this.page, this.context);
});

AfterStep(async function ({ pickle, result }) {
    if (result.status === Status.FAILED) {
        const screenshot = await this.page.screenshot({ path: `screenshots/${pickle.name.replace(/ /g, '_')}.png` });
        this.attach(screenshot, 'image/png');
    }
});