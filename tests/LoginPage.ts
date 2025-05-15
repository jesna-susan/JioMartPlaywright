import { Locator, Page } from '@playwright/test';
import { expect } from './jiomart.fixture';

export class LoginPage {
    readonly page: Page;
    readonly signInIcon: Locator;
    readonly phoneNumberInput: Locator;
    readonly continueBtn: Locator;
    readonly otpHeading: Locator;
    readonly verifyBtn: Locator;



    constructor(page: Page) {
        this.page = page;
        this.signInIcon = page.locator('span#sign_in_text');
        this.phoneNumberInput = page.locator('input#phoneNumber');
        this.continueBtn = page.locator("[aria-label='button Continue']");
        this.otpHeading = page.getByText('OTP verification');
        this.verifyBtn = page.locator("[aria-label='button Verify']");
    }

    async verifyUserIsOnLoginPage(){
        await expect (this.page).toHaveTitle('Retail Account');
    }

    async inputLoginDetails(){
        await this.phoneNumberInput.click();
        await this.phoneNumberInput.fill('8589986767');
        await this.continueBtn.click();
        await expect(this.otpHeading).toBeVisible();      
    }

    async inputOtp(){
        await this.page.waitForTimeout(10000); //manually input the otp here
    }

    
    
}