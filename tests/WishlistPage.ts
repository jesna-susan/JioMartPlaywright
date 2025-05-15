import { Locator, Page } from '@playwright/test';
import { expect } from './jiomart.fixture';
import { HomePage } from './homePage';

export class WishlistPage {
    readonly page: Page;
    readonly wishlistHeading: Locator;
    readonly productCard: Locator;

    constructor(page: Page) {
        this.page = page;
        this.wishlistHeading = page.getByText('My Wishlist');
        this.productCard = page.locator('div.item ng-star-inserted'); 
    }

    async verifyUserIsOnWishlistPage(){
        await expect(this.page).toHaveURL('https://www.jiomart.com/customer/wishlist')
    }

    async verifyWishlistHeading(){
        await expect(this.wishlistHeading).toHaveText("My Wishlist"); 
    }

    async verifyItemInWishlist({homePage}){
        const prodNameFromWishlist = await this.productCard.locator("div.product-details").locator('div.prdname').innerText();
        const prodName = await homePage.wishlistASpecificItem();
        console.log(prodName+" = "+prodNameFromWishlist)
        expect(prodNameFromWishlist).toContain(prodName);
        
    }
    
}
