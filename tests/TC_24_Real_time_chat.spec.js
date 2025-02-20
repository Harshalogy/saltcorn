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
    let YEAR;
    let MONTH;
    let DAY;

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

    test('Prerequisite real time chat test', async () => {
        await functions.clear_Data();
        // click table button
        await functions.click_table();
        // Click the "Create table" button
        await page.click(pageobject.createtablebutton);
        // Enter Table name
        await functions.fill_Text(pageobject.InputName, 'Room');
        // Click on next button
        await functions.submit();
        // click on add field button
        await page.waitForSelector(pageobject.addFieldButtonLocator);
        await page.click(pageobject.addFieldButtonLocator);
        // Fill the lable name
        await functions.fill_Text(pageobject.labelTextboxlocator, 'Room  Name');
        // select the input type
        const type = await page.$("#inputtype");
        await type?.selectOption("String");
        // Click on next button
        await functions.submit();
        // Fill the min length for field
        await functions.fill_Text(pageobject.minlengthlocator, '5');
        // Fill the max length for field
        await functions.fill_Text(pageobject.maxlengthlocator, '50');
        // Fill the error message for field
        await functions.fill_Text(pageobject.errormessagelocator, 'incorrect value');
        // click on next button
        await functions.submit();
        // click on finish button
        await functions.submit();
        // Click on edit link
        await page.waitForSelector(pageobject.EditlinkLocator);
        await page.click(pageobject.EditlinkLocator);
        // click on add row button
        await page.waitForLoadState('networkidle');
        await page.waitForTimeout(2000);
        await page.waitForSelector(pageobject.addrowlocator);
        await page.click(pageobject.addrowlocator);
        // click on tab cell to activate it
        await page.waitForSelector('.tabulator .tabulator-cell[tabulator-field="room__name"]');
        await page.click('.tabulator .tabulator-cell[tabulator-field="room__name"]');
        // enter value in cell
        await page.keyboard.type('Testing room');
        await page.waitForLoadState('networkidle');

        // Create Participants table

        await functions.click_table();
        // Click the "Create table" button
        await page.click(pageobject.createtablebutton);
        // Enter Table name
        await functions.fill_Text(pageobject.InputName, 'Participants');
        // Click on next button
        await functions.submit();
        // click on add field button
        await page.waitForSelector(pageobject.addFieldButtonLocator);
        await page.click(pageobject.addFieldButtonLocator);


        // Click the dropdown to open it
        await page.click('#inputtype');

        // Scroll to the bottom of the dropdown
        await page.evaluate(() => {
            const dropdown = document.querySelector('#inputtype');
            dropdown.scrollTop = dropdown.scrollHeight;
        });

        // Select "Type" option
        await page.selectOption('#inputtype', { label: 'Key to Room' });

        // Wait for a second to see the selection (optional)
        await page.waitForTimeout(1000);

        await functions.fill_Text(pageobject.labelTextboxlocator, 'room');

        // Click on next button
        await functions.submit();
        await functions.submit();

        // click on add field button
        await page.waitForSelector(pageobject.addFieldButtonLocator);
        await page.click(pageobject.addFieldButtonLocator);
        // Fill the lable name
         // Click the dropdown to open it
         await page.click('#inputtype');

         // Scroll to the bottom of the dropdown
         await page.evaluate(() => {
             const dropdown = document.querySelector('#inputtype');
             dropdown.scrollTop = dropdown.scrollHeight;
         });
 
         // Select "Workflow" option
         await page.selectOption('#inputtype', { label: 'Key to users' });
 
         // Wait for a second to see the selection (optional)
         await page.waitForTimeout(1000);

         await functions.fill_Text(pageobject.labelTextboxlocator, 'user');
 
        // Click on next button
        await functions.submit();
        await functions.submit();


         // Create Messages table

         await functions.click_table();
         // Click the "Create table" button
         await page.click(pageobject.createtablebutton);
         // Enter Table name
         await functions.fill_Text(pageobject.InputName, 'Messages');
         // Click on next button
         await functions.submit();
         // click on add field button
         await page.waitForSelector(pageobject.addFieldButtonLocator);
         await page.click(pageobject.addFieldButtonLocator);
         // Click the dropdown to open it
         await page.click('#inputtype');
         // Scroll to the bottom of the dropdown
         await page.evaluate(() => {
            const dropdown = document.querySelector('#inputtype');
            dropdown.scrollTop = dropdown.scrollHeight;
        });

        // Select "type" option
        await page.selectOption('#inputtype', { label:  'String'});

        // Wait for a second to see the selection (optional)
        await page.waitForTimeout(1000);

        await functions.fill_Text(pageobject.labelTextboxlocator, 'content');
        await functions.submit();
        await functions.submit();

        await page.waitForTimeout(3000);

         // click on add field button
         await page.waitForSelector(pageobject.addFieldButtonLocator);
         await page.click(pageobject.addFieldButtonLocator);
         // Click the dropdown to open it
         await page.click('#inputtype');
         // Scroll to the bottom of the dropdown
         await page.evaluate(() => {
            const dropdown = document.querySelector('#inputtype');
            dropdown.scrollTop = dropdown.scrollHeight;
        });

        // Select "type" option
        await page.selectOption('#inputtype', { label:  'Key to Messages'});

        // Wait for a second to see the selection (optional)
        await page.waitForTimeout(1000);

        await functions.fill_Text(pageobject.labelTextboxlocator, 'reply_to');
        await functions.submit();
        await functions.submit();

        await page.waitForTimeout(3000);

        // click on add field button
        await page.waitForSelector(pageobject.addFieldButtonLocator);
        await page.click(pageobject.addFieldButtonLocator);
         // Click the dropdown to open it
         await page.click('#inputtype');

         // Scroll to the bottom of the dropdown
         await page.evaluate(() => {
             const dropdown = document.querySelector('#inputtype');
             dropdown.scrollTop = dropdown.scrollHeight;
         });
 
         // Select "Type" option
         await page.selectOption('#inputtype', { label: 'Key to Room' });
 
         // Wait for a second to see the selection (optional)
         await page.waitForTimeout(1000);
 
         await functions.fill_Text(pageobject.labelTextboxlocator, 'room');
 
         // Click on next button
         await functions.submit();
         await functions.submit();

         await page.waitForTimeout(3000);
 
         // click on add field button
         await page.waitForSelector(pageobject.addFieldButtonLocator);
         await page.click(pageobject.addFieldButtonLocator);
         // Fill the lable name
          // Click the dropdown to open it
          await page.click('#inputtype');
 
          // Scroll to the bottom of the dropdown
          await page.evaluate(() => {
              const dropdown = document.querySelector('#inputtype');
              dropdown.scrollTop = dropdown.scrollHeight;
          });
  
          // Select "Workflow" option
          await page.selectOption('#inputtype', { label: 'Key to users' });
  
          // Wait for a second to see the selection (optional)
          await page.waitForTimeout(1000);
 
          await functions.fill_Text(pageobject.labelTextboxlocator, 'user');
  
         // Click on next button
         await functions.submit();
         await functions.submit();



    });


});