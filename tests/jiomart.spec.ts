import { verify } from 'crypto';
import { HomePage } from './homePage.ts';
import { LoginPage } from './LoginPage.ts';
import { CartPage } from './CartPage.ts';
import { SearchResultsPage } from './SearchResultsPage.ts';
import { ProfilePage } from './ProfilePage.ts';
import { WishlistPage } from './WishListPage.ts';
import { test, expect } from './jiomart.fixture.ts';
import * as config from './config';

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

    test.only('Verify wishlisted items are in the wishlist',async({homePage, loginPage, profilePage, wishlistPage})=>{
        await homePage.verifyUserIsOnHomePage();
        await homePage.navigateToLogin();
        await loginPage.inputLoginDetails();
        await loginPage.inputOtp();
        await homePage.clickOnAgree();
        await homePage.verifyUserIsLoggedInSuccessfully();
        await homePage.wishlistASpecificItem();
        await homePage.clickOnProfileIcon();
        await profilePage.clickOnWishList(); 
        await wishlistPage.verifyItemInWishlist({homePage});
    });









});