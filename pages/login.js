exports.LoginPage=class LoginPage{
    constructor(page) {

         this.page = page;
         page.usernameTxtBox = page.locator('[data-test="username"]')
         page.passwordTxtBox = page.locator('[data-test="password"]')
         page.loginBtn = page.locator('[data-test="login-button"]')
    }

    async goto() {
        await this.page.goto('https://www.saucedemo.com/');
    }

    async login(username, password) {
        await this.page.usernameTxtBox.fill(username);
        await this.page.passwordTxtBox.fill(password);
        await this.page.loginBtn.click();
    }


}