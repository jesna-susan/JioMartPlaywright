import { Locator, Page } from '@playwright/test';
import { expect } from './jiomart.fixture';
import { HomePage } from './homePage';
import * as config from './config'

export class SearchResultsPage {
    readonly page: Page;
    readonly addToCartBtns: Locator;
    readonly productCards: Locator;

    constructor(page: Page) {
        this.page = page;
        this.addToCartBtns = page.locator('.addtocartbtn');
        this.productCards = page.locator('.ais-InfiniteHits-item.jm-col-4.jm-mt-base')
    }

    async verifySearchResults(){
        const currentURL = this.page.url();
        await expect(currentURL).toContain(config.item);
    }

    async verifyAddToCartButtonIsVisible(){
        await expect (this.addToCartBtns.nth(0)).toBeVisible();
    }

    async verifyCountOfAddBtns() {
        let stableScrolls = 0;
        let previousCount = 0;
        let currentCount = await this.productCards.count();
      
        while (stableScrolls < 3) {
          previousCount = currentCount;
          await this.page.mouse.wheel(0, 1000); 
          await this.page.waitForTimeout(2000);
          currentCount = await this.productCards.count();
      
          if (currentCount === previousCount) {
            stableScrolls++;
          } else {
            stableScrolls = 0;
          }
        }
      
        const productCount = await this.productCards.count();
        let visibleCount = 0;
        const totalAddButtons = await this.addToCartBtns.count();
      
        for (let i = 0; i < totalAddButtons; i++) {
          await this.addToCartBtns.nth(i).scrollIntoViewIfNeeded();
          if (await this.addToCartBtns.nth(i).isVisible()) {
            visibleCount++;
          }
        }
      
        await expect(visibleCount).toBe(productCount);
        console.log(`Verified: ${productCount} products and ${visibleCount} visible Add buttons.`);
    }

    async verifyAddButtonEnabled(){
       await expect(this.addToCartBtns.nth(0)).toBeEnabled();
    }

    async verifyHeartColourChangesOnWishlisting({homePage}){
      await homePage.wishListBtns.nth(0).click();
      await expect (homePage.wishListBtns.nth(0)).toHaveAttribute("class",/selected/);
    }

    
    
}
