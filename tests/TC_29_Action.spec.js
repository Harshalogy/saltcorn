const { test, expect } = require('@playwright/test');
const { baseURL, derivedURL } = require('../pageobject/base_url.js');
const PageFunctions = require('../pageobject/function.js');
const PageObject = require('../pageobject/locators.js');
const customAssert = require('../pageobject/utils.js');
const Logger = require('../pageobject/logger.js');
const fs = require('fs');

test.describe('E2E Test Suite', () => {
    let functions;
    let pageobject;
    let context;
    let page;

    test.beforeAll(async ({ browser }) => {
        // Initialize the log file
        Logger.initialize();
        // Create a new context and page for all tests
        context = await browser.newContext({
            ignoreHTTPSErrors: true
        });

        page = await context.newPage();

        // Maximize the screen
        await page.setViewportSize({ width: 1350, height: 720 });

        functions = new PageFunctions(page);
        pageobject = new PageObject(page);

        // Navigate to base URL and perform login
        await functions.navigate_To_Base_URL(baseURL, derivedURL);
        await functions.login('myproject19july@mailinator.com', 'myproject19july');
        await functions.submit();
    });

    test.afterAll(async () => {
        // Close the page and context after all test
        await page.close();
        await context.close();
    });

    test('TC_01_Action: Verify the action functionality', async () => {
        await functions.clear_Data();
        await functions.click_table();
        // Click on Create from CSV upload link
        await page.waitForSelector(pageobject.createfromcsvupload);
        await page.click(pageobject.createfromcsvupload);

        // Wait for the file input element to be available
        const fileInput = await page.waitForSelector('input[type="file"]');
        // Set the file input to the desired file
        const filePath = 'Csv_file_to_uplaod/People1.csv'; // Replace with the correct path to your CSV file
        await fileInput.setInputFiles(filePath);
        // fill table name on text box
        await functions.fill_Text(pageobject.InputName, 'csv_Table');
        // Click on create button
        await functions.submit();
    });

    test('create new view with edit view pattern', async () => {
        await functions.views();
        // click on create new view
        await page.waitForSelector(pageobject.createnewview);
        await page.click(pageobject.createnewview);
        // input view name and discription
        await page.fill(pageobject.InputName, 'View2_Edit');
        await page.fill(pageobject.discriptiontext, 'view for table');
        // validate the view pattern in table dropdown
        await customAssert('View Pattern should be Edit', async () => {
            // select the Edit pattern
            const EditPattern = await page.$("#inputviewtemplate");
            await EditPattern?.selectOption("Edit");
        });
        // submit the page
        await functions.submit();
        // drag and drop the page source on the page
        await page.waitForTimeout(2000);
        // add new action button on page
        await functions.drag_And_Drop(pageobject.ActionLocator, pageobject.fourthrowcolumn2);
        // Click the input field inside the dropdown
        await page.locator('.css-1wy0on6').click();
        await page.waitForTimeout(2000);

        // Type 'modify' into the input field
        await page.keyboard.type('modify_row');
        await page.waitForTimeout(1000);

        // Press Enter to select the option
        await page.keyboard.press('Enter');
        await page.waitForTimeout(1000);

        // click on next page
        await page.waitForSelector(pageobject.nextoption);
        await page.click(pageobject.nextoption);
        // click on finish button
        await functions.submit();
    });
});