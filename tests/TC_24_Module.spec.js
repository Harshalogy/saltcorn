const { test, expect } = require('@playwright/test');
const { baseURL, derivedURL } = require('../pageobject/base_url.js');
const PageFunctions = require('../pageobject/function.js');
const PageObject = require('../pageobject/locators.js');
const customAssert = require('../pageobject/utils.js');
const Logger = require('../pageobject/logger.js');

test.describe('E2E Test Suite', () => {
    let functions;
    let pageobject;
    let context;
    let page;

    test.beforeAll(async ({ browser }) => {
        // Initialize the log file
        Logger.initialize();

        // Create a new browser context with HTTPS error ignored
        context = await browser.newContext({ ignoreHTTPSErrors: true });
        page = await context.newPage();

        // Set the viewport for a consistent test screen size
        await page.setViewportSize({ width: 1350, height: 720 });

        // Initialize page functions and locators
        functions = new PageFunctions(page);
        pageobject = new PageObject(page);

        // Navigate to the base URL and log in
        await functions.navigate_To_Base_URL(baseURL, derivedURL);
        await functions.login('myproject19july@mailinator.com', 'nUYLLoVR2o');
        await functions.submit(); // Ensure submit is required
        // await functions.clear_Data();
    });

    test.afterAll(async () => {
        // Ensure the page and context close properly after tests
        await page.close();
        await context.close();
    });

    test('Search Panel', async () => {
        await functions.navigate_To_Settings();
        await functions.navigate_To_module();
        await customAssert('Search should be visible ', async () => {
            // Locate the search input field by its class name (search-bar) and placeholder
            const searchInput = page.locator(pageobject.searchinput);
            // Assert the search input field is visible
            await expect(searchInput).toBeVisible();
            // Assert the placeholder text of the search input field
            await expect(searchInput).toHaveAttribute('placeholder', 'Search for...');
        });

    });

    test('Three Dot', async () => {
        await customAssert('Three Dot should be visible and click', async () => {
            await page.waitForTimeout(3000);
            const dropdownButton = page.locator(pageobject.dropdownmenubutton); // Direct by ID
            await expect(dropdownButton).toBeVisible();
            await dropdownButton.click();
        });
        await customAssert('Refresh contain correct text ', async () => {
            // Locate the "Refresh" dropdown item
            await page.locator(pageobject.dropdownitem, { hasText: 'Refresh' });
        });

        await customAssert('Add another module contain correct text ', async () => {
            // Locate the "Add another module" link
            await page.locator(pageobject.dropdownitem, { hasText: 'Add another module' });
        });

        await customAssert('Add another pack contain correct text ', async () => {
            // Locate the "Add another pack" link
            await page.locator(pageobject.dropdownitem, { hasText: 'Add another pack' });
        });

        await customAssert('Create pack contain correct text ', async () => {
            // Locate the "Create pack" link
            await page.locator(pageobject.dropdownitem, { hasText: 'Create pack' });
        });

    });

    test('Create Pack', async () => {
        const createPackLink = page.locator(pageobject.dropdownitem, { hasText: 'Create pack' });
        await createPackLink.click();
        await customAssert('Page URL should be  packs/create', async () => {
            expect(page.url()).toBe(baseURL + derivedURL + 'packs/create');
        });
        await customAssert('Create pack should be visible ', async () => {
            // Locate the "Create pack" header
            const createPackHeader = page.locator(pageobject.createpack);
            // Assert the "Create pack" header is visible
            await expect(createPackHeader).toBeVisible();
            // Assert the text of the "Create pack" header
            await expect(createPackHeader).toHaveText('Create pack');
        });
        // Assert 'users table' label and checkbox
        await customAssert('users table contain correct text', async () => {
            const label = page.locator(pageobject.userTable);
            await expect(label).toHaveText('users table');
            const checkbox = page.locator(pageobject.userTableCheckbox);
            await expect(checkbox).toBeVisible();
        });

        // Assert 'base plugin' label and checkbox
        await customAssert('base plugin contain correct text', async () => {
            const label = page.locator(pageobject.basePlugin);
            await expect(label).toHaveText('base plugin');
            const checkbox = page.locator(pageobject.basePluginCheckbox);
            await expect(checkbox).toBeVisible();
        });

        // Assert 'sbadmin2 plugin' label and checkbox
        await customAssert('sbadmin2 plugin contain correct text', async () => {
            const label = page.locator(pageobject.sbadmin2plugin);
            await expect(label).toHaveText('sbadmin2 plugin');
            const checkbox = page.locator(pageobject.sbadmin2pluginCheckbox);
            await expect(checkbox).toBeVisible();
        });

        // Assert 'public role' label and checkbox
        await customAssert('public role contain correct text', async () => {
            const label = page.locator(pageobject.publicRole);
            await expect(label).toHaveText('public role');
            const checkbox = page.locator(pageobject.publicRoleCheckbox);
            await expect(checkbox).toBeVisible();
        });

        // Assert 'user role' label and checkbox
        await customAssert('user role contain correct text', async () => {
            const label = page.locator(pageobject.userRole);
            await expect(label).toHaveText('user role');
            const checkbox = page.locator(pageobject.userRoleCheckbox);
            await expect(checkbox).toBeVisible();
        });

        // Assert 'staff role' label and checkbox
        await customAssert('staff role contain correct text', async () => {
            const label = page.locator(pageobject.staffRole);
            await expect(label).toHaveText('staff role');
            const checkbox = page.locator(pageobject.staffRoleCheckbox);
            await expect(checkbox).toBeVisible();
        });

        // Assert 'Include Event Logs' label and checkbox
        await customAssert('Include Event Logs contain correct text ', async () => {
            const label = page.locator(pageobject.includeEventLog);
            await expect(label).toHaveText('Include Event Logs');
            const checkbox = page.locator(pageobject.in_EventLogCheckbox);
            await expect(checkbox).toBeVisible();
        });

        // Locate and verify the 'Save' button
        await customAssert('Save button should be visible and have correct text', async () => {
            const saveButton = page.locator(pageobject.savebutton);
            // Check that the button is visible
            await expect(saveButton).toBeVisible();
            // Verify the text inside the button
            await expect(saveButton).toHaveText('Save');
        });
    });


});