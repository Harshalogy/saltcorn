const { test, expect } = require('@playwright/test');
const { baseURL, derivedURL } = require('../pageobject/base_url.js');
const PageFunctions = require('../pageobject/function.js');
const PageObject = require('../pageobject/locators.js');

let storageState = 'storageState.json';

test.describe('E2E Test Suite', () => {
  let functions;
  let pageobject;
  let context;
  let page;

  test.beforeAll(async ({ browser }) => {
    // Create a new context and page for all tests
    context = await browser.newContext();
    page = await context.newPage();
    
    functions = new PageFunctions(page);
    pageobject = new PageObject(page);
    
    // Navigate to base URL and perform login
    await functions.navigateToBaseURL(baseURL, derivedURL);
    await functions.login('myproject19july@mailinator.com', 'myproject19july');
    await functions.submit();
    
    // Save the logged-in state
    await context.storageState({ path: storageState });
  });

  test.beforeEach(async () => {
    // Reuse the existing context and page
    await functions.navigateToBaseURL(baseURL, derivedURL);
  });

  test('Click table button and verify URL', async () => {
    //click table button
    await functions.clicktable();
    expect(page.url()).toBe(baseURL + derivedURL + 'table');
  });
  
  // Assert the presence of "Your tables" tab
  test('Validate presence of "Your tables" tab', async () => {
    await functions.clicktable();
    await expect(page.locator(pageobject.Yourtabletab)).toBeVisible();
  });

  // Assert the presence of "Relationship diagram" tab
  test('Validate presence of "Relationship diagram" tab', async () => {
    await functions.clicktable();
    await expect(page.locator(pageobject.relationshipdiagram)).toBeVisible();
  });

  // Assert the table contains "users" row by defalut
  test('Verify default "users" row in the table', async () => {
    await functions.clicktable();
    await expect(page.locator(pageobject.Defaultusertable)).toBeVisible();
  });

  // Assert the presence of "Create table" button
  test('Check visibility of "Create table" button', async () => {
    await expect(page.locator(pageobject.createtablebutton)).toBeVisible();
  });

  // Assert the presence of "Create from CSV upload" button
  test('Check visibility of "Create from CSV upload" button', async () => {
    await functions.clicktable();
    await expect(page.locator(pageobject.createtablefromCSV)).toBeVisible();
  });

  // Assert the presence of "Discover tables" button
  test('Check visibility of "Discover tables" button', async () => {
    await functions.clicktable();
    await expect(page.locator(pageobject.discoverbutton)).toBeVisible();
  });

  // Assert the presence of "Tables" section
  test('Verify Saltcorn home page and check "Tables" section', async () => {
    // Saltcorn home page 
    await functions.SALTCORN();
    await expect(page.locator(pageobject.createtablebutton)).toBeVisible();
    await expect(page.locator(pageobject.homeCSVuplaod)).toBeVisible();
  });

 // Assert the presence of "Create Table"
  test('Navigate to "Create table" page from Saltcorn home', async () => {
    await functions.SALTCORN();
    await page.click(pageobject.createtablebutton);
    expect(page.url()).toBe(baseURL + derivedURL + 'table/new');
  });

  // Assert the presence of "Pages" section with "Create view" button
  test('Navigate to "Create view" page from Saltcorn home', async () => {
    await functions.SALTCORN();
    await expect(page.locator(pageobject.Homecreateview)).toBeVisible();
    await page.click(pageobject.Homecreateview);
    expect(page.url()).toBe(baseURL + derivedURL + 'viewedit/new');
  });

  // Assert the presence of "Create page" button
  test('Navigate to "Create page" page from Saltcorn home', async () => {
    await functions.SALTCORN();
    await expect(page.locator(pageobject.Home_new_page_button)).toBeVisible();
    await page.click(pageobject.Home_new_page_button);
    expect(page.url()).toBe(baseURL + derivedURL + 'pageedit/new');
  });

  // Assert the presence of "Create new views" button
  test('Verify "Views" section and "Create new view" button', async () => {
    await page.waitForTimeout(2500);
    await functions.views();
    expect(page.url()).toBe(baseURL + derivedURL + 'viewedit');
    await expect(page.locator(pageobject.createnewview)).toBeVisible();
    await page.click(pageobject.createnewview);
    expect(page.url()).toBe(baseURL + derivedURL + 'viewedit/new');
  });

  // Assert the presence of "About Application" button
  test('Validate "About Application" tabs', async () => {
    functions = new PageFunctions(page);
    await functions.navigateToSettings();
    await functions.navigateToaboutapplication();
    await functions.Validateeachtabofaboutapplications();
  });

//   test('Validate "Module" tabs', async () => {
//     functions = new PageFunctions(page);
//     await page.waitForTimeout(10000);
//     await functions.navigateToSettings();
//     await functions.navigateTomodule();
//     await functions.Validateeachtabofmodule();
//   });

});