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
    await functions.login('myproject19july@mailinator.com', 'nUYLLoVR2o');
    await functions.submit();
  });
  test.afterAll(async () => {
    await functions.clear_Data();
    // Close the page and context after all test
    await page.close();
    await context.close();
  });

  test('Address book ', async () => {
    await functions.Address_book();
    await page.click(pageobject.contacts);
    await page.click(pageobject.addperson);
    await customAssert('Page URL should be view/EditPerson', async () => {
      expect(page.url()).toBe(baseURL + derivedURL + 'view/EditPerson');
    });
    await customAssert('Title label should be visible and contain correct text', async () => {
      await page.locator(pageobject.addpersonlabels, { hasText: 'Title' });
    });

    await customAssert('Name label should be visible and contain correct text', async () => {
      await page.locator(pageobject.addpersonlabels, { hasText: 'Name' });
    });

    await customAssert('Address label should be visible and contain correct text', async () => {
      await page.locator(pageobject.addpersonlabels, { hasText: 'Address' });
    });

    await customAssert('Town or City label should be visible and contain correct text', async () => {
      await page.locator(pageobject.addpersonlabels, { hasText: 'Town or city' });
    });

    await customAssert('Postcode label should be visible and contain correct text', async () => {
      await page.locator(pageobject.addpersonlabels, { hasText: 'Postcode' });
    });

    await customAssert('Email label should be visible and contain correct text', async () => {
      await page.locator(pageobject.addpersonlabels, { hasText: 'Email' }); 
    });
    
    await customAssert('Telephone label should be visible and contain correct text', async () => {
      await page.locator(pageobject.addpersonlabels, { hasText: 'Telephone' }); 
    });
  });

  test('Add person filling text ', async () => {
   // Fill out the form fields
  await page.selectOption(pageobject.inputtitle, 'Mr'); // Select Title dropdown
  await page.fill(pageobject.InputName, 'John Doe'); // Name
  await page.fill(pageobject.inputaddress , '123 Main Street'); // Address
  await page.fill(pageobject.inputtowncity, 'New York'); // Town or city
  await page.fill(pageobject.inputpostcode, '10001'); // Postcode
  await page.fill(pageobject.inputemail, 'johndoe@example.com'); // Email
  await page.fill(pageobject.inputtelephone, '1234567890'); // Telephone
  await functions.submit();

  });

});
