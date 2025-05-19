import { test as base, expect, BrowserContext, Page } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { LoginPage } from '../pages/LoginPage';
import { CartPage } from '../pages/CartPage';
import { SearchResultsPage } from '../pages/SearchResultsPage';
import { ProfilePage } from '../pages/ProfilePage';
import { WishlistPage } from '../pages/WishlistPage';
import { CategoryPage } from '../pages/Category';

type JioMartFixtures = {
    homePage: HomePage;
    loginPage: LoginPage;
    cartPage: CartPage;
    searchResultsPage: SearchResultsPage;
    profilePage: ProfilePage;
    wishlistPage: WishlistPage;
    categoryPage: CategoryPage;
};

export const test = base.extend<JioMartFixtures>({
    homePage: async ({ page }, use) => {
        const homePage = new HomePage(page);
        await homePage.navigateToHome();
        await use(homePage);
    },

    loginPage: async ({ page }, use ) => {
        const loginPage = new LoginPage(page);
        await use(loginPage);
    },

    cartPage: async ({ page }, use ) => {
        const cartPage = new CartPage(page);
        await use(cartPage);
    },

    searchResultsPage: async ({ page }, use ) => {
        const searchResultsPage = new SearchResultsPage(page);
        await use(searchResultsPage);
    },

    profilePage: async ({ page }, use ) => {
        const profilePage = new ProfilePage(page);
        await use(profilePage);
    },

    wishlistPage: async ({ page }, use ) => {
        const wishlistPage = new WishlistPage(page);
        await use(wishlistPage);
    },

    categoryPage: async ({ page }, use ) => {
        const categoryPage = new CategoryPage(page);
        await use(categoryPage);
    },


    
})

export { expect } from '@playwright/test';