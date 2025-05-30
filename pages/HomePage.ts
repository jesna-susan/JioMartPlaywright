import { Locator, Page } from '@playwright/test';
import { expect } from '../fixture/jiomart.fixture';
import * as config from '../utils/config';

export class HomePage {
    readonly page: Page;
    readonly signInIcon: Locator;
    readonly agreeBtn: Locator;
    readonly profileIcon: Locator;
    readonly deliveryLoc: Locator;
    readonly pinOption: Locator;
    readonly pinInput: Locator;
    readonly applyPinCode: Locator;
    readonly cartIcon: Locator;
    readonly searchInput: Locator;
    readonly categoryHeading: Locator;
    readonly subCategoryDiv: Locator;
    readonly listSearch: Locator;
    readonly shoppingListHeading: Locator;
    readonly shoppingListInput: Locator;
    readonly closeIcon: Locator;
    readonly searchAllBtn: Locator;
    readonly wishListBtns: Locator;
    readonly categoryTitleText: Locator;
    readonly productCard: Locator;
    readonly contactUsHeading: Locator;
    readonly logo: Locator;
    readonly jiomartWallet: Locator;
    readonly electronicsZone: Locator;
    
    

    constructor(page: Page) {
        this.page = page;
        this.signInIcon = page.locator('span#sign_in_text');
        this.agreeBtn = page.getByText('Agree');
        this.profileIcon = page.locator('#user_initial');
        this.deliveryLoc = page.locator('#delivery_city_pincode');
        this.pinOption = page.locator('#btn_enter_pincode');
        this.pinInput = page.locator('#rel_pincode');
        this.applyPinCode = page.locator('#btn_pincode_submit');
        this.cartIcon = page.locator('#btn_minicart');
        this.searchInput = page.locator('.aa-Input');
        this.categoryHeading = page.locator('.header-nav-l1-item');
        this.subCategoryDiv = page.locator('[class*="header-nav-l2-wrapper"]');
        this.listSearch = page.locator('#btn_search_list');
        this.shoppingListHeading = page.locator('.shopping-list-title-main');
        this.closeIcon = page.locator('#btn_location_close_icon');
        this.shoppingListInput = page.locator('[name="shopping-list"]');
        this.searchAllBtn = page.getByText('Search All');
        this.wishListBtns = page.locator('.wishlist_btn');
        this.categoryTitleText = page.locator('.header-nav-l1-item-link');
        this.productCard = page.locator('.widget-product-card-wrapper.swiper-slide.swiper-slide-active');
        this.contactUsHeading = page.getByRole('heading', { name: 'Contact Us', level: 2 });
        this.logo = page.locator('[class="jm-btn primary small jm-heading-base jm-fc-white jm-border-none"]');
        this.jiomartWallet = page.getByRole('link', { name: 'JioMart Wallet', exact: true }); 
        this.electronicsZone = page.locator('div:has-text(" Electronics Zone ")').nth(1);
        

    }

    async navigateToHome() {
        await this.page.goto('https://www.jiomart.com/');
        if(await this.closeIcon.isVisible()){
            await this.closeIcon.click();
        }  
    }

    async verifyUserIsOnHomePage() {
        await expect(this.page).toHaveURL('https://www.jiomart.com/');
    }
    async verifyTitleOnHomePage() {
        await expect(this.page).toHaveTitle("JioMart: India's online shopping destination");
    }

    async navigateToLogin(){
        await this.signInIcon.click();
    }

    async clickOnAgree(){
        await this.agreeBtn.waitFor();
        await expect (this.agreeBtn).toBeVisible();
        await this.agreeBtn.click();
    }

    async verifyUserIsLoggedInSuccessfully() {
        await expect(this.profileIcon).toBeVisible();
    }

    async clickOnDeliverylocation(){
        await this.deliveryLoc.click();
    }

    async changeLocationOnHomePageWithPinCode(){
        await this.pinOption.click();
        await this.pinInput.fill('691501');
        await this.applyPinCode.click();
    }

    async verifyUserLocationHasChanged(){
        await expect(this.deliveryLoc).toContainText('691501');
    }

    async clickOnCartIcon(){
        await expect(this.cartIcon).toBeVisible();
        await this.cartIcon.click();
    }

    async searchAnItem(){
        await this.searchInput.fill(config.item);
        await this.searchInput.press('Enter')
    }

    async verifyCategoryDropDownsWork(){
        const itemCount = await this.categoryHeading.count();
        for (let i = 0; i < itemCount; i++) {
            const item = this.categoryHeading.nth(i);
            const badge = item.locator('.jm-badge.alco_badge');
            const badgeCount = await badge.count();
            if (badgeCount > 0) {
                continue; // Skip hover check
            }
            await item.hover();
            await expect(this.subCategoryDiv.nth(i)).toBeVisible();
        }
    }

    async clickOnSearchLists(){
        await this.listSearch.click();
        await expect(this.shoppingListHeading).toBeVisible();
    }

    async searchWithAList(list: string){
        await this.shoppingListInput.fill(list);
        await this.searchAllBtn.click();
        const words = list.split(", ");
        await words.forEach(element => {
            expect(this.page.url()).toContain(element);
        });
    }

    async wishlistAnItem(){
        await this.wishListBtns.nth(0).click();
    }

    async verifyCategoryTitle(){
        const itemCount = await this.categoryTitleText.count();
        console.log(`Total categories found: ${itemCount}`); 
        for (let i = 0; i < itemCount-1; i++) { //last one is NEW
            const item = this.categoryTitleText.nth(i);
            const headingText = (await item.innerText()).replace(/ies$/, 'y').replace(/s$/, '').trim().toLowerCase();
            console.log("\n"+headingText)
            await item.click();
            const pageTitle = (await this.page.title()).toLowerCase();
            console.log(pageTitle);
            const headingWords = headingText.split(' ');
            const matchFound = headingWords.some(word => pageTitle.includes(word));
            expect(matchFound).toBeTruthy();
        }         
    }

    async verifyLocalShopsTitle(){
        await this.categoryTitleText.nth(7).click();
        await expect (this.page).toHaveTitle('JioMart');
    }

    async addToWishlist(){
        await this.wishListBtns.first().click();
    }

    async clickOnProfileIcon(){
        await this.profileIcon.click();
    }

    async wishlistASpecificItem(){
        await (this.productCard.locator('div.widget-product-card-wishlist')).click();
        const itemName = await (this.productCard.locator('div.widget-product-card-details').locator('div').first()).innerText();
        console.log(itemName);
        return itemName;
    }

    async clickOnACategory(){
        await this.categoryHeading.nth(0).click();
        await this.page.mouse.move(0, 0); //to prevent dropdown from coming because of mouse hover 
    }

    async verifyUserIsSignedOut(){
        await expect (this.signInIcon).toBeVisible();
    }

    async verifyContactInfoIsDisplayed(){
        await expect (this.contactUsHeading).toBeVisible();
    }

    async verifyLogoRedirectsToHomePage(){
        await this.logo.click();
        await expect(this.page).toHaveURL('https://www.jiomart.com/');
    }

    async openJioMartWalletFromHome(){
        await this.jiomartWallet.click();
    }

    async verifyElectronicsZoneSectionIsVisible(){
        await expect (this.electronicsZone).toBeVisible();
    }

}