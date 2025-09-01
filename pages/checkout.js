exports.CheckingOutPage = class CheckingOutPage {
    constructor(page) {
        this.page = page;
    
        page.firstName = page.locator('[data-test="firstName"]')
        page.lastName = page.locator('[data-test="lastName"]')
        page.postalCode = page.locator('[data-test="postalCode"]')
        page.continueBtn = page.getByRole('button', { name: 'CONTINUE' })
        page.finishBtn = page.getByRole('button', { name: 'FINISH' })   
    }

    async checkingOut(firstN, lastN, postCode) {
        await this.page.firstName.fill(firstN);
        await this.page.lastName.fill(lastN);
        await this.page.postalCode.fill(postCode);
        await this.page.continueBtn.click();
        await this.page.finishBtn.click();

    }
}
