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
    // check visibility of id field already exist
    await expect(page.locator(pageobject.idfieldlocator)).toBeVisible();
    // check id field is iteger type
    await expect(page.locator(pageobject.idtypelocator)).toBeVisible();
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
    await page.check(pageobject.RequiredcheckboxLocator);
    //Click on next button
    await functions.submit();

    //Fill the min length for field
    await functions.fill_Text(pageobject.minlengthlocator, '5');
    //Fill the max length for field
    await functions.fill_Text(pageobject.maxlengthlocator, '50');
    //Fill the error message for field
    await functions.fill_Text(pageobject.errormessagelocator, 'incorrect value');
    // click on next button
    await functions.submit();
    // click on finish button
    await functions.submit();

    // check visibility of full name field added
    await expect(page.locator(pageobject.fullnamefieldlocator)).toBeVisible();
    // check required tag for full name field
    await expect(page.locator(pageobject.fullnamerequiredtaglocator)).toBeVisible();
    // check full name field type is string
    await expect(page.locator(pageobject.fullnametypelocator)).toBeVisible();
    // check variable name for full name field is visible
    await expect(page.locator(pageobject.fullnamevariablelocator)).toBeVisible();
    // check delete button for full name field is visible
    await expect(page.locator(pageobject.fullnamedeletebutton)).toBeVisible();
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
    // check visibility of Date of birth field added
    await expect(page.locator(pageobject.dobfieldlocator)).toBeVisible();
    // check DOB field type is Date
    await expect(page.locator(pageobject.datetypelocator)).toBeVisible();
    // check varable name for dob field is visible
    await expect(page.locator(pageobject.datetypelocator)).toBeVisible();
    // check DOB field type is Date
    await expect(page.locator(pageobject.datevariablelocator)).toBeVisible();
    // check delete button for DOB field is visible
    await expect(page.locator(pageobject.deletedobbutton)).toBeVisible();
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
    // check visibility of Address field added
    await expect(page.locator(pageobject.addressfieldlocator)).toBeVisible();
    // check address field type is string
    await expect(page.locator(pageobject.addresstypelocator)).toBeVisible();
    // check variable name for address field is visible
    await expect(page.locator(pageobject.addressvariablelocator)).toBeVisible();
    // check delete button for address field is visible
    await expect(page.locator(pageobject.deleteaddressbutton)).toBeVisible();
  });

  // Add Row and value in the table
  test('Add row and value in the table', async () => {
    // Generate a random string
    const randomString = PageFunctions.generate_Random_String(5);
    //Click on edit link
    await page.click(pageobject.EditlinkLocator);
    //Click on add row button
    await expect(page.locator(pageobject.addrowlocator)).toBeVisible();
    
    await page.waitForTimeout(4000);
    // click on add row button
    await page.click(pageobject.addrowlocator);
    // click on tab cell to activate it
    await page.click(pageobject.tab1locater);
    // enter value in cell
    await page.keyboard.type('Saltcorn ' + randomString);
    // click on tab cell to activate it
    await page.click(pageobject.tab2locator);
    // Check if the calendar is visible
    const calendarVisible = await page.isVisible(pageobject.calendarlocator);
    // Assert that the calendar is visible
    expect(calendarVisible).toBe(true);
    // enter year value in cell
    await page.fill(pageobject.yearlocator, '1990')
    // select month in calendar
    await page.selectOption(pageobject.monthlocator, { label: 'June' });
    // Click on the date using the provided selector
    await page.click(pageobject.datelocator);
    // Press enter in keyboard
    await page.keyboard.press('Enter');
    // click on tab cell to activate it
    await page.click(pageobject.tab3locator)
    // enter address value in cell
    await page.keyboard.type('HN 01, WN 26 noida india');
    await page.keyboard.press('Enter');
  });

  // Add Row and value in the table
  test('download table as csv file', async () => {
    // navigate back to table
    await page.goBack();
    //Click on download link
    await page.click(pageobject.downloadlinklocator);
  });
    
  // clear all tables
  test('Navigate to setting page and clear all changes', async () => {
    functions = new PageFunctions(page);
     await functions.navigate_To_Settings();
     await functions.navigate_To_about_application();
     await functions.about_application_to_system();
     await functions.clear_All();
  });
  
  // Add table by uploading csv file
  // test('Add table by uploading csv file', async () => {
  //   //Click on upload csv link
  //   await page.click(pageobject.uploadcsvlinklocator);
  //   // Wait for the file input element to be available
  //   const fileInput = await page.waitForSelector('input[type="file"]');
  //   // Set the file input to the desired file
  //   const filePath = 'Downloads/My_Table12hjJ.csv'; // Replace with the correct path to your CSV file
  //   await fileInput.setInputFiles(filePath);
  //   // Optionally, you can wait for some element to confirm the file upload was successful
  //   await page.waitForSelector('#some-confirmation-element'); // Replace with an appropriate selector
  // });

});