exports.InventoryPage = class InventoryPage {

    constructor(page) {
        this.page = page;
        page.addToCart = page.locator('[data-test="add-to-cart-sauce-labs-backpack"]')
        page.addToCartIcon = page.locator('[data-test="shopping-cart-link"]')
        page.checkoutBtn = page.locator('[data-test="checkout"]')


    }

    async inventoryInfo() {
        await this.page.addToCart.click();
        await this.page.addToCartIcon.click();
        await this.page.checkoutBtn.click();
    }

}