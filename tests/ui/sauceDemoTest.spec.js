import {test, expect} from '@playwright/test';
import {LoginPage} from '../../pages/login';
import {CheckingOutPage} from '../../pages/checkout';
import {InventoryPage} from '../../pages/inventory';
import {faker} from '@faker-js/faker'; //

test('sauceDemo', async ({page}) => {


    const Login = new LoginPage(page) 
    const Inventory = new InventoryPage(page) 
    const Checkout = new CheckingOutPage(page)
   

   await Login.goto()
   await Login.login('standard_user', 'secret_sauce')
   await Inventory.inventoryInfo()
   await Checkout.checkingOut(faker.person.firstName(), faker.person.lastName(), faker.location.zipCode())

   
   
    // await page.goto('https://www.saucedemo.com/');
    // await page.locator('[data-test="username"]').fill('standard_user');
    // await page.locator('[data-test="password"]').fill('secret_sauce');
    // await page.locator('[data-test="login-button"]').click();
    // await expect(page).toHaveTitle('Swag Labs');
});