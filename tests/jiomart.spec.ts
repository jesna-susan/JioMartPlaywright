import { verify } from 'crypto';
import { HomePage } from './homePage.ts';
import { LoginPage } from './LoginPage.ts';
import { CartPage } from './CartPage.ts';
import { SearchResultsPage } from './SearchResultsPage.ts';
import { ProfilePage } from './ProfilePage.ts';
import { WishlistPage } from './WishListPage.ts';
import { CategoryPage } from './Category.ts';
import { test, expect } from './jiomart.fixture.ts';
import * as config from './config';
import { profile } from 'console';

test.describe.configure({ mode: 'parallel' });


test.describe('JioMart Web App Tests', () => {
    
    test.beforeEach(async ({ homePage }) => {
        await homePage.navigateToHome();
    });

    test('Verify user is on home Page', async ({ homePage }) => {
        await homePage.verifyUserIsOnHomePage();
    });

    test('Verify the title on home Page', async ({homePage})=>{
        await homePage.verifyTitleOnHomePage();
    });

    test('Verify user can navigate to Login Page', async({homePage, loginPage})=>{
        await homePage.verifyUserIsOnHomePage();
        await homePage.navigateToLogin();
        await loginPage.verifyUserIsOnLoginPage();
    });

    test('Verify user can login with valid credentials', async({homePage, loginPage})=>{
        await homePage.verifyUserIsOnHomePage();
        await homePage.navigateToLogin();
        await loginPage.inputLoginDetails();
        await loginPage.inputOtp();
        await homePage.clickOnAgree();
        await homePage.verifyUserIsLoggedInSuccessfully();    
    });

    test('Verify user can change delivery location with pincode', async({homePage})=>{
        await homePage.clickOnDeliverylocation();
        await homePage.changeLocationOnHomePageWithPinCode();
        await homePage.verifyUserLocationHasChanged();
    });

    test('Verify user can navigate to Cart Page', async({homePage, cartPage})=>{
        await homePage.clickOnCartIcon();
        await cartPage.verifyUserIsOnCartPage();
    });

    test('Verify user can search products', async({homePage, searchResultsPage})=>{
        await homePage.searchAnItem();
        await searchResultsPage.verifySearchResults();
    });

    test('Verify add to cart button is visible', async({homePage, searchResultsPage})=>{
        await homePage.searchAnItem();
        await searchResultsPage.verifyAddToCartButtonIsVisible();
    });

    test('Verify add to cart button is enabled', async({homePage,searchResultsPage})=>{
        await homePage.searchAnItem();
        await searchResultsPage.verifyAddButtonEnabled();
    })

    test('Verify all the products add to cart button is visible', async({homePage,searchResultsPage})=>{
        await homePage.searchAnItem();
        await searchResultsPage.verifyCountOfAddBtns();
    });

    test('Verify drop downs of each category work', async({homePage})=>{
        await homePage.verifyCategoryDropDownsWork();
    })

    test('Verify search with list works', async({homePage})=>{
        await homePage.clickOnSearchLists();
        await homePage.searchWithAList(config.list);
    });

    test('Verify cart is empty without sign in',async({homePage, cartPage})=>{
        await homePage.clickOnCartIcon();
        await cartPage.verifyUserIsOnCartPage();
        await cartPage.verifyCartIsEmpty();
    });

    test('Verify Cart Page Heading', async({cartPage})=>{
        await cartPage.verifyCartpageHeading();
    });

    test('Verify user is redirected to login page while wishlisting without login', async({homePage, loginPage})=>{
        await homePage.wishlistAnItem();
        await loginPage.verifyUserIsOnLoginPage();
    });

    test('Verify the category page title is accordance with the category', async({homePage})=>{
        await homePage.verifyCategoryTitle();
    });

    test('Verify local shops\' section\'s title', async({homePage})=>{
        await homePage.verifyLocalShopsTitle();
    });

    test('Verify heart colour changes when adding to wishlist', async({homePage,loginPage,searchResultsPage})=>{
        await homePage.verifyUserIsOnHomePage();
        await homePage.navigateToLogin();
        await loginPage.inputLoginDetails();
        await loginPage.inputOtp();
        await homePage.clickOnAgree();
        await homePage.verifyUserIsLoggedInSuccessfully();
        await homePage.searchAnItem();
        await searchResultsPage.verifySearchResults();
        await searchResultsPage.verifyHeartColourChangesOnWishlisting({homePage});
    });

    test('Verify wishlist page heading',async({homePage, profilePage, wishlistPage, loginPage})=>{
        await homePage.verifyUserIsOnHomePage();
        await homePage.navigateToLogin();
        await loginPage.inputLoginDetails();
        await loginPage.inputOtp();
        await homePage.clickOnAgree();
        await homePage.verifyUserIsLoggedInSuccessfully();
        await homePage.clickOnProfileIcon();
        await profilePage.clickOnWishList();
        await wishlistPage.verifyUserIsOnWishlistPage();
        await wishlistPage.verifyWishlistHeading();    
    });

    test('Verify wishlisted items are in the wishlist',async({homePage, loginPage, profilePage, wishlistPage})=>{
        await homePage.verifyUserIsOnHomePage();
        await homePage.navigateToLogin();
        await loginPage.inputLoginDetails();
        await loginPage.inputOtp();
        await homePage.clickOnAgree();
        await homePage.verifyUserIsLoggedInSuccessfully();
        const prodName = await homePage.wishlistASpecificItem();
        await homePage.clickOnProfileIcon();
        await profilePage.clickOnWishList(); 
        await wishlistPage.verifyItemInWishlist({homePage, prodName});
    });

    test('Verify edit profile page heading',async({homePage, loginPage, profilePage})=>{
        await homePage.verifyUserIsOnHomePage();
        await homePage.navigateToLogin();
        await loginPage.inputLoginDetails();
        await loginPage.inputOtp();
        await homePage.clickOnAgree();
        await homePage.verifyUserIsLoggedInSuccessfully();
        await homePage.clickOnProfileIcon();
        await profilePage.verifyEditProfilePage();
    });

    test('Edit firstname and lastname of profile',async({homePage, loginPage, profilePage})=>{
        await homePage.verifyUserIsOnHomePage();
        await homePage.navigateToLogin();
        await loginPage.inputLoginDetails();
        await loginPage.inputOtp();
        await homePage.clickOnAgree();
        await homePage.verifyUserIsLoggedInSuccessfully();
        await homePage.clickOnProfileIcon();
        await profilePage.verifyEditProfilePage();
        await profilePage.editName();
    });

    test('Verify edit of name correctly displayed in profile',async({homePage, loginPage, profilePage})=>{
        await homePage.verifyUserIsOnHomePage();
        await homePage.navigateToLogin();
        await loginPage.inputLoginDetails();
        await loginPage.inputOtp();
        await homePage.clickOnAgree();
        await homePage.verifyUserIsLoggedInSuccessfully();
        await homePage.clickOnProfileIcon();
        await profilePage.verifyEditProfilePage();
        await profilePage.verifyNameChangesAreDisplayed();
    });

    test('Verify deafult sort is by popularity',async({homePage, categoryPage})=>{
        await homePage.clickOnACategory();
        await categoryPage.verifyDefaultSortIsByPopularity();
    });

    test('Verify default sort is by popularity',async({homePage, categoryPage})=>{
        await homePage.clickOnACategory();
        await categoryPage.clickOnSortBtn();
        await categoryPage.verifyDefaultSortIsByPopularity();
    });

    test('Verify sorting of price high to low',async({homePage, categoryPage})=>{
        await homePage.clickOnACategory();
        await categoryPage.clickOnSortBtn();
        await categoryPage.verifySortingOfPriceHighToLow();
    });

    test('Verify sorting of price low to high',async({homePage, categoryPage})=>{
        await homePage.clickOnACategory();
        await categoryPage.clickOnSortBtn();
        await categoryPage.verifySortingOfPriceLowToHigh();
    });

    test('Verify discount sorting works', async({homePage, categoryPage})=>{
        await homePage.clickOnACategory();
        await categoryPage.clickOnSortBtn();
        await categoryPage.verifyDiscountSortWorks();
    });

    test('Verify navigation from profile page', async({homePage, profilePage, loginPage, wishlistPage})=>{
        await homePage.verifyUserIsOnHomePage();
        await homePage.navigateToLogin();
        await loginPage.inputLoginDetails();
        await loginPage.inputOtp();
        await homePage.clickOnAgree();
        await homePage.verifyUserIsLoggedInSuccessfully();
        await homePage.clickOnProfileIcon();
        await profilePage.verifyMyOrdersTab();
        await profilePage.clickOnMyAccountNavigationBtn();
        await profilePage.clickOnWishList();
        await wishlistPage.verifyUserIsOnWishlistPage();
        await profilePage.clickOnMyAccountNavigationBtn();
        await profilePage.verifyMyListTab();
    });

    test('Verify navigation to Coupons Tab', async({homePage, profilePage, loginPage})=>{
        await homePage.verifyUserIsOnHomePage();
        await homePage.navigateToLogin();
        await loginPage.inputLoginDetails();
        await loginPage.inputOtp();
        await homePage.clickOnAgree();
        await homePage.verifyUserIsLoggedInSuccessfully();
        await homePage.clickOnProfileIcon();
        await profilePage.verifyCouponsTab();
    });

    test('Verify user can add Address', async({homePage, profilePage, loginPage})=>{
        await homePage.verifyUserIsOnHomePage();
        await homePage.navigateToLogin();
        await loginPage.inputLoginDetails();
        await loginPage.inputOtp();
        await homePage.clickOnAgree();
        await homePage.verifyUserIsLoggedInSuccessfully();
        await homePage.clickOnProfileIcon();
        await profilePage.addANewAddress();
    });

    test('Verify user can edit Address', async({homePage, profilePage, loginPage})=>{
        await homePage.verifyUserIsOnHomePage();
        await homePage.navigateToLogin();
        await loginPage.inputLoginDetails();
        await loginPage.inputOtp();
        await homePage.clickOnAgree();
        await homePage.verifyUserIsLoggedInSuccessfully();
        await homePage.clickOnProfileIcon();
        await profilePage.editAddress();
    });

    test('Verify user can navigate to PAN Card Information', async({homePage, profilePage, loginPage})=>{
        await homePage.verifyUserIsOnHomePage();
        await homePage.navigateToLogin();
        await loginPage.inputLoginDetails();
        await loginPage.inputOtp();
        await homePage.clickOnAgree();
        await homePage.verifyUserIsLoggedInSuccessfully();
        await homePage.clickOnProfileIcon();
        await profilePage.navigateToPanCardInformation();
      
    });

    test('Verify user can view the terms and conditions', async({homePage, profilePage, loginPage})=>{
        await homePage.verifyUserIsOnHomePage();
        await homePage.navigateToLogin();
        await loginPage.inputLoginDetails();
        await loginPage.inputOtp();
        await homePage.clickOnAgree();
        await homePage.verifyUserIsLoggedInSuccessfully();
        await homePage.clickOnProfileIcon();
        await profilePage.verifyTermsAndConditionsVisible();
    });

    test('Verify user can sign out from user account', async({homePage, profilePage, loginPage})=>{
        await homePage.verifyUserIsOnHomePage();
        await homePage.navigateToLogin();
        await loginPage.inputLoginDetails();
        await loginPage.inputOtp();
        await homePage.clickOnAgree();
        await homePage.verifyUserIsLoggedInSuccessfully();
        await homePage.clickOnProfileIcon();
        await profilePage.verifyUserCanSignOut();
        await homePage.navigateToHome();
        await homePage.verifyUserIsSignedOut();
    });

    test('Verify contact information is displayed even without login', async({homePage, profilePage, loginPage})=>{
        await homePage.verifyUserIsOnHomePage();
        await homePage.verifyContactInfoIsDisplayed();
    });

    test('Verify user can view their jiomart wallet and gift card details', async({homePage, profilePage, loginPage})=>{
        await homePage.verifyUserIsOnHomePage();
        await homePage.navigateToLogin();
        await loginPage.inputLoginDetails();
        await loginPage.inputOtp();
        await homePage.clickOnAgree();
        await homePage.verifyUserIsLoggedInSuccessfully();
        await homePage.clickOnProfileIcon();
        await profilePage.clickOnPaymentsOption();
        await profilePage.verifyUserCanNavigateToJioMartWalletDetails();
    });

    test('Verify the logo directs to the home page', async({homePage})=>{
        await homePage.verifyUserIsOnHomePage();
        await homePage.verifyLogoRedirectsToHomePage();
    });

    test('Verify jioMart Wallet wont open without Login', async({homePage, loginPage})=>{
        await homePage.verifyUserIsOnHomePage();
        await homePage.openJioMartWalletFromHome();
        await loginPage.verifyUserIsOnLoginPage();
        
    });

    test('Verify electronics zone section is visible', async({homePage})=>{
        await homePage.verifyUserIsOnHomePage();
        await homePage.verifyElectronicsZoneSectionIsVisible();
        
    });

    



    






    

    
















    









});