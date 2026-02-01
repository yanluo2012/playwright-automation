class CheckoutPage {
    constructor(page, expect) {
        this.countrySelector = page.locator("[placeholder*='Country']");
        this.countryDropdown = page.locator(".ta-results");
        this.countryOptions = page.locator(".ta-results").locator("button");
        this.submitButton = page.locator(".action__submit");
        this.recipient = page.locator("div.user__name label");
        this.expect = expect;
    }

    async selectCountrySubmit(partialCountry, username) {
        await this.countrySelector .pressSequentially(partialCountry, { delay: 150 });
        await this.countryDropdown.waitFor();
        const countryCount = await this.countryOptions.count();
        console.log(`countryCount: ${countryCount}`);
        for (let i = 0; i < countryCount; ++i) {
            const text = await this.countryOptions.nth(i).textContent();
            console.log(`country: ${text}`);
            if (text.trim() === "India") {
                console.log("found India");
                await this.countryOptions.nth(i).click();
                break;
            }
        }
        await this.expect(this.recipient).toHaveText(username);
        await this.submitButton.click();
    }
}
module.exports = { CheckoutPage };