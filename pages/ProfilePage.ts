import { Locator, Page } from '@playwright/test';
import { expect } from '../fixture/jiomart.fixture';
import * as config from '../utils/config';


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
    readonly myOrdersTab: Locator;
    readonly myAccountNav: Locator;
    readonly myListTab: Locator;
    readonly couponsTab: Locator;
    readonly deliveryAddressestab: Locator;
    readonly addAddressBtn: Locator;
    readonly confirmLocBtn: Locator;
    readonly saveAndProceedBtn: Locator;
    readonly areaNameInput: Locator;
    readonly homeOption: Locator;
    readonly addressBox: Locator;
    readonly addEditAddressDiv: Locator;
    readonly addEditAddressHeading: Locator;
    readonly panCardInformation: Locator;
    readonly panCradInfoHeading: Locator;
    readonly legalInfoTab: Locator;
    readonly termsAndConditionsHeading: Locator;
    readonly signOutTab: Locator;
    readonly signOutBtn: Locator;
    readonly paymentTab: Locator;
    readonly jiomartWallet: Locator;
    readonly jiomartWalletHeading: Locator;
    readonly readDetailsTab: Locator;
    readonly jiomartGiftCardHeading: Locator;


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
        this.myOrdersTab = page.locator('a[title="My Orders"]').nth(0);
        this.myAccountNav = page.locator('[title="My Account"]');
        this.myListTab = page.locator('a[title="My List"]').nth(0);
        this.couponsTab = page.locator('a[title="Coupons"]').nth(0);
        this.deliveryAddressestab = page.locator('a[title="Delivery Addresses"]').nth(0);
        this.addAddressBtn = page.locator('[aria-label="button Add New Address"]');
        this.confirmLocBtn = page.locator('[aria-label="button Confirm Location"]');
        this.saveAndProceedBtn = page.getByRole('button', { name: 'button Save & Proceed' });
        this.areaNameInput = page.locator('input#areaname');
        this.homeOption = page.locator('#addresstypesection').getByText('Home');
        this.addressBox = page.locator('[class="list active j-content-layout-panel ng-star-inserted"]');
        this.addEditAddressDiv = page.locator('div[class="modal-dialog modal-dialog-centered"]').nth(2);
        this.addEditAddressHeading = page.locator('span:has-text("Add/Edit Address")');
        this.panCardInformation = page.locator('a[title="PAN Card Information"]').nth(0);
        this.panCradInfoHeading = page.locator('[class="j-text pcititle ng-star-inserted"]');
        this.legalInfoTab = page.locator('a[title="Legal Information"]').nth(0);
        this.termsAndConditionsHeading = page.locator('a[title="Go to Terms and Conditions"]');
        this.signOutTab = page.locator('a[title="Sign Out"]').nth(0);
        this.signOutBtn = page.locator('jds-grid').getByLabel('button Sign Out');
        this.paymentTab = page.locator('div[class="j-text j-text-list-title ng-star-inserted"]').nth(1);
        this.jiomartWallet = page.locator('a[title="JioMart Wallet"]').nth(0);
        this.jiomartWalletHeading = page.locator('h1:has-text("JioMart Wallet")');
        this.readDetailsTab = page.locator('a[class="secondraybtn"]');
        this.jiomartGiftCardHeading = page.locator('h1:has-text("JioMart Gift Card")');



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

    async verifyMyOrdersTab(){
        await this.myOrdersTab.click();
        await expect (this.page).toHaveURL('https://www.jiomart.com/customer/orderhistory')
    }

    async clickOnMyAccountNavigationBtn(){
        await this.myAccountNav.click();
    }

    async verifyMyListTab(){
        await this.myListTab.click();
        await expect (this.page).toHaveURL('https://www.jiomart.com/customer/mylist')
    }

    async verifyCouponsTab(){
        await this.couponsTab.click();
        await expect (this.page).toHaveURL('https://www.jiomart.com/customer/couponstore')
    }

    async addANewAddress(){
        await this.deliveryAddressestab.click();
        const addressBoxNum = await this.addressBox.count();
        await this.addAddressBtn.click();
        await this.confirmLocBtn.click();
        await this.areaNameInput.fill(config.areaName);
        await this.homeOption.click();
        await this.saveAndProceedBtn.click();
        const addressBoxNumAfter = await this.addressBox.count();
        await expect (this.addressBox).toBeVisible();
        expect(addressBoxNumAfter).toBeGreaterThanOrEqual(addressBoxNum); 
    }

    async editAddress(){
        await this.deliveryAddressestab.click();
        const menuOption = this.addressBox.locator('[class="menuaction"]');
        await menuOption.click();
        const editOption = this.addressBox.locator('a[class="link-btn ng-star-inserted"]');
        await editOption.click();
        await expect (this.addEditAddressDiv).toBeVisible();
        await expect (this.addEditAddressHeading).toBeVisible();
    }

    async navigateToPanCardInformation(){
        await this.panCardInformation.click();
        await expect (this.panCradInfoHeading).toBeVisible();
    }

    async verifyTermsAndConditionsVisible(){
        await this.legalInfoTab.click();
        await expect (this.termsAndConditionsHeading).toBeVisible();
    }

    async verifyUserCanSignOut(){
        await this.signOutTab.click();
        await this.signOutBtn.click();
    }

    async clickOnPaymentsOption(){
        await this.paymentTab.click();
    }

    async verifyUserCanNavigateToJioMartWalletDetails(){
        await this.jiomartWallet.click();
        await expect (this.jiomartWalletHeading).toBeVisible();
    }






    


    
    
}
