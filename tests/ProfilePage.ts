import { Locator, Page } from '@playwright/test';
import { expect } from './jiomart.fixture';


export class ProfilePage {
    readonly page: Page;
    readonly wishlistBtn: Locator;
    
    



    constructor(page: Page) {
        this.page = page;
        this.wishlistBtn = page.locator('jds-grid').getByText("Wishlist"); 
        

    }

    async clickOnWishList(){
        await this.wishlistBtn.click();
    }

    

    
    
}
