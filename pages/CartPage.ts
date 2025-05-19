import { Locator, Page } from '@playwright/test';
import { expect } from '../fixture/jiomart.fixture';

export class CartPage {
    readonly page: Page;
    readonly cartHeading: Locator;
    readonly cartEmptyText: Locator;



    constructor(page: Page) {
        this.page = page;
        this.cartHeading = page.locator('h1.j-heading'); 
        this.cartEmptyText = page.locator('[classname="emptycart-title"]');
    }

    async verifyUserIsOnCartPage(){
        await expect(this.page).toHaveURL('https://www.jiomart.com/checkout/cart')
    }

    async verifyCartpageHeading(){
        await expect(this.cartHeading).toHaveText("My Cart"); 
    }

    async verifyCartIsEmpty(){
        await expect(this.cartEmptyText).toBeVisible();
    }

    
    
}
