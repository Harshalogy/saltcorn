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

    // Maximize the screen
    await page.setViewportSize({ width: 1350, height: 1080 });

    functions = new PageFunctions(page);
    pageobject = new PageObject(page);

    // Navigate to base URL and perform login
    await functions.navigate_To_Base_URL(baseURL, derivedURL);
    await functions.login('myproject19july@mailinator.com', 'myproject19july');
    await functions.submit();

    // Save the logged-in state
    await context.storageState({ path: storageState });
  });


  test('Click table button and verify URL', async () => {
    //click table button
    await functions.click_table();
    expect(page.url()).toBe(baseURL + derivedURL + 'table');
  });

  // Check the "Create table" function
  test('Check the "Create table" Function', async () => {

    // Generate a random string
    const randomString = PageFunctions.generate_Random_String(5);
    await expect(page.locator(pageobject.createtablebutton)).toBeVisible();

    // Click the "Create table" button
    await page.click(pageobject.createtablebutton);
    // Enter Table name
    await functions.fill_Text(pageobject.tableNameTextlocator, 'My_Table' + randomString);

    await expect(page.locator(pageobject.createButtonLocator)).toBeVisible();
    // click on Create button
    await page.click(pageobject.createButtonLocator);
    await expect(page.locator(pageobject.FieldsLocator)).toBeVisible();

  });

  // Add Full name field in the table
  test('Add Full name field in the table', async () => {
    // click on add field button
    await page.click(pageobject.addFieldButtonLocator);
    //Fill the lable name
    await functions.fill_Text(pageobject.labelTextboxlocator, 'Full Name');
    //select the input type
    const type = await page.$("#inputtype");
    await type?.selectOption("String");
    //Fill the discription
    await functions.fill_Text(pageobject.descriptionSelector, 'Full Name of User');
    // select the required check box
    await page.locator("//input[@id='inputrequired' and @type='checkbox']").check();
    //Click on next button
    await functions.submit();

    //Fill the min length for field
    await functions.fill_Text(pageobject.minlengthlocator, '5');
    //Fill the max length for field
    await functions.fill_Text(pageobject.maxlengthlocator, '50');
    //Fill the regular expression for field
    //await functions.fill_Text(pageobject.regularexpressionlocator, '^([a-zA-z,/.-]+)\s([a-zA-z,/.-]+)$');
    //Fill the error message for field
    await functions.fill_Text(pageobject.errormessagelocator, 'incorrect value');
    // click on next button
    await functions.submit();
    // click on finish button
    await functions.submit();

  });

  // Add Date of birth field in the table
  test('Add Date of birth field in the table', async () => {
    // click on add field button
    await page.click(pageobject.addFieldButtonLocator);
    //Fill the lable name
    await functions.fill_Text(pageobject.labelTextboxlocator, 'Date Of Birth');
    //select the input type
    const type = await page.$("#inputtype");
    await type?.selectOption("Date");
    //Fill the discription
    await functions.fill_Text(pageobject.descriptionSelector, 'Date of birth of User');
    //Click on next button
    await functions.submit();
    //await page.click(pageobject.Nextbuttonlocator);
    await functions.submit();
   
  });

  // Add Address field in the table
  test('Add Address field in the table', async () => {
    // click on add field button
    await page.click(pageobject.addFieldButtonLocator);
    //Fill the lable name
    await functions.fill_Text(pageobject.labelTextboxlocator, 'Address');
    //select the input type
    const type = await page.$("#inputtype");
    await type?.selectOption("String");
    //Fill the discription
    await functions.fill_Text(pageobject.descriptionSelector, 'Address of User');
    //Click on next button
    await functions.submit();

    //Fill the min length for field
    await functions.fill_Text(pageobject.minlengthlocator, '20');
    //Fill the max length for field
    await functions.fill_Text(pageobject.maxlengthlocator, '100');

    // click on next button
    await functions.submit();
    // click on finish button
    await functions.submit();

  });

  // Add Row and value in the table
  test('Add row and value in the table', async () => {
    // Generate a random string
    const randomString = PageFunctions.generate_Random_String(5);
    //Click on edit link
    await page.click(pageobject.EditlinkLocator);
    //Click on add row button
    await expect(page.locator(pageobject.addrowlocator)).toBeVisible();
    // wait for 4 seconds
    await page.waitForTimeout(4000);
    // click on add row button
    await page.click(pageobject.addrowlocator);
    // click on tab cell to activate it
    await page.click(pageobject.tab1locater);
    // enter value in cell
    await page.keyboard.type('Saltcorn ' + randomString);
    // wait for 7 seconds
    await page.waitForTimeout(7000);
    // click on tab cell to activate it
    await page.click(pageobject.tab2locator);
    // Check if the calendar is visible
    const calendarVisible = await page.isVisible(pageobject.calendarlocator);
    // Assert that the calendar is visible
    expect(calendarVisible).toBe(true);
    // enter value in cell
    await page.fill(pageobject.yearlocator, '1990')
    await page.waitForTimeout(7000);
    //select month
    await page.selectOption(pageobject.monthlocator, { label: 'June' });
    // Click on the date using the provided selector
    await page.click(pageobject.datelocator);

    await page.keyboard.press('Enter');
    await page.click(pageobject.tab2locator);
    await page.keyboard.press('Tab', { shift: true });
    

    // wait for 10 seconds
    //await page.waitForTimeout(10000);
    // click on tab cell to activate it
    //await page.click(pageobject.tab3locater);
    // enter value in cell
    //await page.keyboard.type('H N 01 noida india');

    
    //await page.waitForTimeout(4000);
  });

});