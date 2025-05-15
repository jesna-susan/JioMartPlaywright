import { Locator, Page } from '@playwright/test';
import { expect } from './jiomart.fixture';
import { HomePage } from './homePage';

export class WishlistPage {
    readonly page: Page;
    readonly wishlistHeading: Locator;
    readonly productCard: Locator;
    readonly productCardTitle: Locator;

    constructor(page: Page) {
        this.page = page;
        this.wishlistHeading = page.getByText('My Wishlist');
        this.productCard = page.locator('.yfpheading.ng-star-inserted + div').locator('div.item.ng-star-inserted'); 
        this.productCardTitle = page.locator('jds-heading.yfpheading + div.wihlistproductsstn .prdname')
    }

    async verifyUserIsOnWishlistPage(){
        await expect(this.page).toHaveURL('https://www.jiomart.com/customer/wishlist')
    }

    async verifyWishlistHeading(){
        await expect(this.wishlistHeading).toHaveText("My Wishlist"); 
    }

    async verifyItemInWishlist({homePage, prodName}){
        //const prodNameFromWishlist = await (this.productCard.locator("div.product-details").locator('div.prdname')).innerText();
        const prodNameFromWishlist = await this.productCardTitle.textContent();
        const productName = await prodName.replace("..", "").trim();
        console.log(productName+" = "+prodNameFromWishlist);
        if (!prodNameFromWishlist) {
            throw new Error("Product name from wishlist is null or undefined");
        }
        expect(prodNameFromWishlist.startsWith(productName)).toBe(true);
        
    }
    
}
