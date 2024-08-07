const { test, expect } = require('@playwright/test');
const { baseURL, derivedURL } = require('../pageobject/base_url.js');
const PageFunctions = require('../pageobject/function.js');
const PageObject = require('../pageobject/locators.js');
const customAssert = require('../pageobject/utils.js');
const Logger = require('../pageobject/logger.js');

let storageState = 'storageState.json';

test.describe('E2E Test Suite', () => {
    let functions;
    let pageobject;
    let context;
    let page;
    let randomString;

    test.beforeAll(async ({ browser }) => {
        // Initialize the log file
        Logger.initialize();
        // Create a new context and page for all tests
        context = await browser.newContext();
        page = await context.newPage();

        // Maximize the screen
        await page.setViewportSize({ width: 1350, height: 720 });

        functions = new PageFunctions(page);
        pageobject = new PageObject(page);

        // Generate a random string for all tests
        randomString = PageFunctions.generate_Random_String(5);

        // Navigate to base URL and perform login
        await functions.navigate_To_Base_URL(baseURL, derivedURL);
        await functions.login('myproject19july@mailinator.com', 'myproject19july');
        await functions.submit();

        // Save the logged-in state
        await context.storageState({ path: storageState });
    });

    // Create a new user
    test('Create new user by visiting "Users and Security" tabs', async () => {
        functions = new PageFunctions(page);
        // Navigate to setting
        await functions.navigate_To_Settings();
        // Navigate to Users and Security
        await functions.navigate_To_Users_And_Security();
        // assert the user and security url
        await customAssert('page url should be /useradmin', async () => {
            expect(page.url()).toBe(baseURL + derivedURL + 'useradmin');
        });
        // validate each tab of users and security and assert urls
        await functions.Users_And_Security_to_Users();
        //  Create user button should be visible and working
        await customAssert('Create user button is visible and working', async () => {
            await expect(page.locator(pageobject.createuserlink)).toBeVisible();
            await page.click(pageobject.createuserlink);
        });
        // assert the page url for new user
        await customAssert('page url should be /useradmin/new', async () => {
            expect(page.url()).toBe(baseURL + derivedURL + 'useradmin' + derivedURL + 'new');
        });
        // input DOB for user
        await functions.fill_Text(pageobject.inputdob, '09-08-1997');
        // input email address with random name
        await functions.fill_Text(pageobject.inputemail, randomString + '@mailinator.com');
        // select user role
        await page.click(pageobject.inputrole_id);
        await page.keyboard.press('Enter');
        // uncheck random password checkbox
        await page.click(pageobject.inputrnd_password);
        // enter password on password field
        await functions.fill_Text(pageobject.inputpassword, 'Pass@123');
        // click on create user button
        await page.click(pageobject.createuserbutton);

    });

    // Search new user on users tab
    test('Search new user from Users tabs', async () => {
        functions = new PageFunctions(page);
        // search with username as created earlier
        await functions.fill_Text(pageobject.searchbar, randomString);
        await page.keyboard.press('Enter');
        // assert new user is visible
        await customAssert('new user should be visible', async () => {
            await expect(page.getByRole('link', { name: randomString + '@mailinator.com' })).toBeVisible();
        });
    });


    // Delete new user from users tab
    test('Delete new user from users tabs', async () => {
        // Wait for and click the last dropdown menu button
        await customAssert('dropdown menu should be visible', async () => {
            const elements = await page.locator('[id^="dropdownMenuButton"]');
            const count = await elements.count();
            if (count === 0) {
                throw new Error('No elements found for selector: [id^="dropdownMenuButton"]');
            }
            const lastDropdownButton = elements.nth(count - 1);
            await lastDropdownButton.scrollIntoViewIfNeeded();
            await expect(lastDropdownButton).toBeVisible();
            await lastDropdownButton.click();
            await page.waitForTimeout(10000);
        });

        // Wait for the delete button to be visible and then click it
        await customAssert('delete user button should be visible and working', async () => {
            const deleteButton = page.locator('#content > div.dropdown-menu.dropdown-menu-end.show > a:nth-child(11)');

            await deleteButton.waitFor({ state: 'visible', timeout: 10000 });
            await expect(deleteButton).toBeVisible().click();

            await deleteButton.scrollIntoViewIfNeeded();

            // Alternative click methods
            await page.evaluate((selector) => {
                document.querySelector(selector).click({force:true});
            }, '#content > div.dropdown-menu.dropdown-menu-end.show > a:nth-child(11)');

            // Small delay to ensure the click is registered
            await page.waitForTimeout(1000);

            page.on('dialog', async dialog => {
                console.log('Dialog message:', dialog.message());
                await dialog.accept(); // Clicks "OK" or "Confirm"
              });
        });
    });

    // Assert the presence of "Users and Security" tab
    test('Validate "Users and Security" tabs', async () => {
        functions = new PageFunctions(page);
        // Navigate to setting
        await functions.navigate_To_Settings();
        // Navigate to Users and Security
        await functions.navigate_To_Users_And_Security();
        // assert the user and security url
        await customAssert('page url should be /useradmin', async () => {
            expect(page.url()).toBe(baseURL + derivedURL + 'useradmin');
        });
        // validate each tab of users and security and assert urls
        await functions.Users_And_Security_to_Users();
        await customAssert('page url should be /useradmin', async () => {
            expect(page.url()).toBe(baseURL + derivedURL + 'useradmin');
        });
        await functions.Users_And_Security_to_Roles();
        await customAssert('page url should be /roleadmin', async () => {
            expect(page.url()).toBe(baseURL + derivedURL + 'roleadmin');
        });
        await functions.Users_And_Security_to_Login_and_Signup();
        await customAssert('page url should be /useradmin/settings', async () => {
            expect(page.url()).toBe(baseURL + derivedURL + 'useradmin' + derivedURL + 'settings');
        });
        await functions.Users_And_Security_to_Table_access();
        await customAssert('page url should be /useradmin/table-access', async () => {
            expect(page.url()).toBe(baseURL + derivedURL + 'useradmin' + derivedURL + 'table-access');
        });
        await functions.Users_And_Security_to_HTTP();
        await customAssert('page url should be /useradmin/http', async () => {
            expect(page.url()).toBe(baseURL + derivedURL + 'useradmin' + derivedURL + 'http');
        });
        await functions.Users_And_Security_to_Permissions();
        await customAssert('page url should be /useradmin/permissions', async () => {
            expect(page.url()).toBe(baseURL + derivedURL + 'useradmin' + derivedURL + 'permissions');
        });
    });
});