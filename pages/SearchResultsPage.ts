import { Locator, Page } from '@playwright/test';
import { expect } from '../fixture/jiomart.fixture';
import { HomePage } from '../pages/HomePage';
import * as config from '../utils/config'

export class SearchResultsPage {
  readonly page: Page;
  readonly addToCartBtns: Locator;
  readonly productCards: Locator;
  readonly outOfStockFilterBox: Locator;
  readonly appliedFiltersText: Locator;
  readonly appliedFilterContent: Locator;

  constructor(page: Page) {
    this.page = page;
    this.addToCartBtns = page.locator('.addtocartbtn');
    this.productCards = page.locator('.ais-InfiniteHits-item.jm-col-4.jm-mt-base');
    this.outOfStockFilterBox = page.locator('[class="ais-RefinementList-labelText"]');
    this.appliedFiltersText = page.locator('.applied-filters-header');
    this.appliedFilterContent = page.locator('[class="applied-filters-content"]').locator('button');
  }

  async verifySearchResults() {
    const currentURL = this.page.url();
    expect(currentURL).toContain(config.item);
  }

  async verifyAddToCartButtonIsVisible() {
    await expect(this.addToCartBtns.nth(0)).toBeVisible();
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

  async verifyAddButtonEnabled() {
    await expect(this.addToCartBtns.nth(0)).toBeEnabled();
  }

  async verifyHeartColourChangesOnWishlisting({ homePage }) {
    await homePage.wishListBtns.nth(0).click();
    await expect(homePage.wishListBtns.nth(0)).toHaveAttribute("class", /selected/);
  }

  async applyFilterOutOfStock() {
    await expect(this.outOfStockFilterBox).toBeVisible();
    await this.outOfStockFilterBox.click();
    await expect(this.appliedFiltersText).toBeVisible();
    await expect(this.appliedFilterContent).toHaveText("Include out of stock");
  }

  async verifyFilterOutOfStockIsApplied() {
    await this.page.waitForLoadState('networkidle');
    const count = await this.productCards.count();
    let found = false;

    for (let i = 0; i < count; i++) {
      const subCardDetails = this.productCards.nth(i).locator('.plp-card-details-sub span');
      if (await subCardDetails.count() > 0) {
        const classAttr = await subCardDetails.first().getAttribute('class');
        if (classAttr?.includes('out-of-stock-label')) {
          found = true;
          break;
        }
      }
    }
    expect(found).toBe(true);
  }


}
