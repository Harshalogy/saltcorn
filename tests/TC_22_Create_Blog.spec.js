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

  test('create a Blog ', async () => {
    await functions.createBlog();
        // Click the "Add Post" link
        await page.click(pageobject.addPost);
        await customAssert('Page URL should be view/EditPost', async () => {
          expect(page.url()).toBe(baseURL + derivedURL + 'view/EditPost');
      });
        // Fill in the "Title" input field with "New Blog"
        await page.fill(pageobject.inputtitle, 'New Blog');
        // Excerpt should be an integer type
        await customAssert('Excerpt should be correctly filled', async () => {
            const frameLocator = page.frameLocator(pageobject.frameLocator);
            await frameLocator.locator('body').fill('This is the content of my first blog!');
        });
        // Body should be an integer type
        await customAssert('Body should be correctly filled', async () => {
            const frameLocatorbody = page.frameLocator(pageobject.frameLocatorbody);
            await frameLocatorbody.locator('body').fill('My first blog!');
            await functions.submit();
            await page.click(pageobject.SaltCornButton);
          });
        await customAssert('Saltcorn Blog title should be visible', async () => {
            await expect(page.locator(pageobject.saltcornblog)).toHaveText('Saltcorn blog');
          });       
        // Navigate settings tabs and clear dropdown settings
        await page.goto(baseURL + derivedURL + pageobject.admin_Clear_All);
          await functions.navi_Setting_Dropdown_Clear();
  });
});