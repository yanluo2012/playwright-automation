const { expect } = require('@playwright/test')

class AngularPracticePage {

    constructor(page) {
        this.page = page;
        this.passwordInput = this.page.getByPlaceholder('Password');
        this.dateOfBirthInput = this.page.locator("input[name='bday']");
        this.iceCreamCheckbox = this.page.getByLabel('Check me out if you Love IceCreams!');
        this.employmentStatusRadio = this.page.getByLabel('Employed');
        this.genderDropdown = this.page.getByLabel('Gender');
        this.signInButton = this.page.getByRole('button', { name: 'Submit' });
        this.successMessage = this.page.getByText('Success! The Form has been submitted successfully!');
        this.shopLink = this.page.getByRole('link', { name: 'Shop', exact: true });

    }

    async goTo() {
        await this.page.goto('https://rahulshettyacademy.com/angularpractice/');
    }

    async checkIceCreamCheckbox() {
        await this.iceCreamCheckbox.check();
    }

    async verifyIceCreamCheckboxChecked() {
        await expect(this.iceCreamCheckbox).toBeChecked();
    }

    async selectEmploymentStatus() {
        await this.employmentStatusRadio.check();
    }

    async verifyEmploymentStatus() {
        await expect(this.employmentStatusRadio).toBeChecked();
    }

    async selectGender(gender) {
        await this.genderDropdown.selectOption(gender);
    }

    async verifyGender(gender) {
        await expect(this.genderDropdown).toHaveValue(gender);
    }

    async fillPassword(password) {
        await this.passwordInput.fill(password);
    }

    async verifyPassword(password) {
        await expect(this.passwordInput).toHaveValue(password);
    }

    async selectDateOfBirth(dateOfBirth) {
        await this.dateOfBirthInput.fill(this.formatDateOfBirth(dateOfBirth));
    }

    async verifyDateOfBirth(dateOfBirth) {
        await expect(this.dateOfBirthInput).toHaveValue(this.formatDateOfBirth(dateOfBirth));
    }

    formatDateOfBirth(dateOfBirth) {
        const [month, day, year] = dateOfBirth.split('/');
        const normalizedMonth = month.padStart(2, '0');
        const normalizedDay = day.padStart(2, '0');
        return `${year}-${normalizedMonth}-${normalizedDay}`;
    }

    async clickSignInButton() {
        await this.signInButton.click();
    }

    async verifySuccessMessage(message) {
        await expect(this.successMessage).toContainText(message);
    }

    async clickShopLink() {
        await this.shopLink.click();
    }

    async verifyProductOnPage(productName) {
        await expect(this.page.getByRole('link', { name: productName })).toBeVisible();
    }

}
module.exports = { AngularPracticePage };