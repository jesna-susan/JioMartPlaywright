import { Locator, Page } from '@playwright/test';
import { expect } from './jiomart.fixture';
import * as config from './config';


export class CategoryPage {
    readonly page: Page;
    readonly sortBtn: Locator;
    readonly popularityBtn: Locator;
    readonly priceHighToLowBtn: Locator;
    readonly productCard: Locator;
    readonly priceLowToHighBtn: Locator;
    readonly discountBtn: Locator;
    readonly filters: Locator;
    readonly subCategoryBox: Locator;
    readonly price: Locator;
    readonly discount: Locator;





    constructor(page: Page) {
        this.page = page;
        this.sortBtn = page.locator('[class="jm-btn secondary small jm-fc-black"]');
        this.popularityBtn = page.getByText('Popularity');
        this.priceHighToLowBtn = page.getByText('Price: High to Low');
        this.priceLowToHighBtn = page.getByText('Price: Low to High');
        this.discountBtn = page.locator('[class="slider round"]').nth(3);
        this.productCard = page.locator('li.ais-InfiniteHits-item.jm-col-4.jm-mt-base');
        this.filters = page.locator('[class="filter-title jm-heading-xs"]');
        this.subCategoryBox = page.locator('[class="category-container"]');
        this.price = page.locator('h2:has-text("Price")');
        this.discount = page.locator('h2:has-text("Discount")');



    }

    async clickOnSortBtn(){
        await this.sortBtn.click();

    }

    async verifyFiltersAreVisible(){
        await expect (this.filters).toBeVisible();
    }

    async verifySubCategoriesAreVisible(){
        await expect (this.subCategoryBox).toBeVisible();
    }

    async verifyPriceAndDiscountAreVisible(){
        await expect (this.price).toBeVisible();
        await expect (this.discount).toBeVisible();
    }

    async verifyDefaultSortIsByPopularity(){
        let currentUrl = this.page.url();
        await this.popularityBtn.first().click();
        await this.sortBtn.click();
        await expect (this.page).toHaveURL(currentUrl);
    }

    async verifySortingOfPriceHighToLow(){
        await this.priceHighToLowBtn.first().click();
        let previousPrice = Number.POSITIVE_INFINITY; //starting with the highest possible number
        for (let i = 0; i < 3; i++) {
            const priceText = await this.productCard.nth(i).locator('div.plp-card-details-price span.jm-heading-xxs').textContent();
            if (!priceText) throw new Error(`Price text not found for card ${i}`);
            const currentPrice = parseInt(priceText.replace(/[^\d]/g, ''));
            console.log(`Product ${i}: ₹${currentPrice}`);
            if (i > 0) {
                expect(currentPrice).toBeLessThanOrEqual(previousPrice); //High to Low
            }
            previousPrice = currentPrice; 
        }

    }

    async verifySortingOfPriceLowToHigh(){
        await this.priceLowToHighBtn.first().click();
        let previousPrice = 0; 
        for (let i = 0; i < 3; i++) {
            const priceText = await this.productCard.nth(i).locator('div.plp-card-details-price span.jm-heading-xxs').textContent();
            if (!priceText) throw new Error(`Price text not found for card ${i}`);
            const currentPrice = parseInt(priceText.replace(/[^\d]/g, ''));
            console.log(`Product ${i}: ₹${currentPrice}`);
            if (i > 0) {
                expect(currentPrice).toBeGreaterThanOrEqual(previousPrice); //Low to High
            }
            previousPrice = currentPrice; 
        }
    }

    async verifyDiscountSortWorks(){
        await this.discountBtn.first().click();
        let previousDiscount = 100; 
        for (let i = 0; i < 3; i++) {
            const discountText = await this.productCard.nth(i).locator('div.plp-card-details-discount span.jm-badge').textContent();
            if (!discountText) throw new Error(`Discount text not found for card ${i}`);
            const currentDiscount = parseInt(discountText.replace(/[^\d]/g, ''));
            console.log(`Product ${i}: ${currentDiscount}%`);
            if (i > 0) {
                expect(currentDiscount).toBeLessThanOrEqual(previousDiscount); //Discount High to Low
            }
            previousDiscount = currentDiscount; 
        }
    }
    

    
    
}
