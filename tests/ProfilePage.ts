import { Locator, Page } from '@playwright/test';
import { expect } from './jiomart.fixture';
import * as config from './config';


export class ProfilePage {
    readonly page: Page;
    readonly wishlistBtn: Locator;
    readonly editProfileBtn: Locator;
    readonly editProfileHeading: Locator;
    readonly nameEditBtn: Locator;
    readonly firstNameInput: Locator;
    readonly lastNameInput: Locator;
    readonly saveChangesBtn: Locator;
    readonly nameHeading: Locator;


    constructor(page: Page) {
        this.page = page;
        this.wishlistBtn = page.locator('jds-grid').getByText("Wishlist");
        this.editProfileBtn = page.locator('[aria-label="button Edit"]');
        this.editProfileHeading = page.locator('[class="j-text j-text-heading-s"]');
        this.nameEditBtn = page.locator('.j-button.j-button-size__medium.tertiary.icon-primary.icon-only').nth(0);
        this.firstNameInput = page.locator('[class*="input-required"]').locator('input');
        this.lastNameInput = page.locator('[class*="personal-info_inputFieldDesktop__IHdXr"]').nth(1).locator('input');
        this.saveChangesBtn = page.locator('[aria-label="button Save Changes"]');
        this.nameHeading = page.locator('.profile-page_nameText__5gSk7.j-text.j-text-heading-xs');
    }

    async clickOnWishList(){
        await expect(this.wishlistBtn).toBeVisible();
        await this.wishlistBtn.click();
    }

    async verifyEditProfilePage(){
        await this.editProfileBtn.click();
        await expect (this.editProfileHeading).toHaveText("Personal Info on JioMart");
    }

    async editName(){
        await this.nameEditBtn.click();
        await this.firstNameInput.clear();
        await this.firstNameInput.fill(config.firstName);
        await this.lastNameInput.clear();
        await this.lastNameInput.fill(config.lastName);
        await this.saveChangesBtn.click();
    }

    async verifyNameChangesAreDisplayed(){
        const fullName = await (this.nameHeading).innerText();
        const names = fullName.trim().split(' ');
        expect(names[0]).toBe(config.firstName);
        expect(names[1]).toBe(config.lastName);
    }

    

    
    
}
