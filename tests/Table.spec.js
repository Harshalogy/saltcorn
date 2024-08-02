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
  let randomString;

  test.beforeAll(async ({ browser }) => {
    // Create a new context and page for all tests
    context = await browser.newContext();
    page = await context.newPage();

    // Maximize the screen
    await page.setViewportSize({ width: 1350, height: 1080 });

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

  test('Click table button and verify URL', async () => {
    //click table button
    await functions.click_table();
    expect(page.url()).toBe(baseURL + derivedURL + 'table');
  });

  // Check the "Create table" function
  test('Check the "Create table" Function', async () => {

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
    // click on next button again
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
  test('Add row and inser value in the coulmns', async () => {
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

  //download table as csv
  test('download table as csv file', async () => {
    // navigate back to table
    await page.goBack();
    //Click on download link
    await page.click(pageobject.downloadlinklocator);
  });

  // create view with list view pattern
  test('create view with list view pattern', async () => {
    await functions.views();
    // assert the view edit url
    expect(page.url()).toBe(baseURL + derivedURL + 'viewedit');
    //assert the visibility of create new view
    await expect(page.locator(pageobject.createnewview)).toBeVisible();
    //click on create new view
    await page.click(pageobject.createnewview);
    // assert the view url
    expect(page.url()).toBe(baseURL + derivedURL + 'viewedit/new');
    // input view name and discription
    await page.fill(pageobject.viewnametextbox, 'NewView_' + randomString);
    await page.fill(pageobject.viewdiscriptiontext, 'view for table');
    // click on dropdown and select option
    await page.click(pageobject.viewpatterndropdown);
    //await page.keyboard.press('ArrowDown'); // click down aero to change options
    await page.keyboard.press('Enter');
    // validate the table name in table dropdown
    await expect(page.locator('#inputtable_name')).toHaveText(`My_Table${randomString}users`);
    await page.click(pageobject.viewtabledropdown);
    await page.keyboard.press('Enter');
    // click on view minimum role dropdown
    await page.click(pageobject.viewminimumroledropdown);
    await page.keyboard.press('Enter');
    // submit the page
    await functions.submit();
    // click on add column button on page
    await page.click(pageobject.addcolumnbutton);
    //drag and drop the action locator
    await functions.drag_And_Drop(pageobject.cardSource, pageobject.newcolumn);
    // click on next button
    await page.click(pageobject.nextoption);
    // click on next button
    await functions.submit();
    // click on rows per page dropdown
    await page.click(pageobject.rowsperpage);
    await page.keyboard.press('Enter');
    // click on new view link
    await page.click(pageobject.newviewlink);
    // assert the visibility of delete button
    await expect(page.locator(pageobject.deleteviewbutton)).toBeVisible();
  });

  // create new view with edit view pattern
  test('create new view with edit view pattern', async () => {
    await functions.views();
    //assert the visibility of create new view
    await expect(page.locator(pageobject.createnewview)).toBeVisible();
    //click on create new view
    await page.click(pageobject.createnewview);
    // input view name and discription
    await page.fill(pageobject.viewnametextbox, 'View2_' + randomString);
    await page.fill(pageobject.viewdiscriptiontext, 'view for table');
    // click on dropdown and select option
    await page.click(pageobject.viewpatterndropdown);
    // click down aero to change options to edit
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('Enter');
    // click to view table dropdown
    await page.click(pageobject.viewtabledropdown);
    await page.keyboard.press('Enter');
    // click to view minimum role dropdown
    await page.click(pageobject.viewminimumroledropdown);
    await page.keyboard.press('Enter');
    // submit the page
    await functions.submit();
    // drag and drop the page source on the page
    await functions.drag_And_Drop(pageobject.textSource, pageobject.target);
    await functions.fill_Text(pageobject.textlocator, 'I said..');
    // click on delete button
    await page.click(pageobject.deletebutton);

    // select inputbox and delete
    await page.click(pageobject.inputbox2);
    await page.click(pageobject.deletebutton);
    // add new input box in page
    await page.click(pageobject.lineBreakSource);
    await functions.drag_And_Drop(pageobject.lineBreakSource, pageobject.target);
    // click on field dropdown for field
    await page.click(pageobject.fielddropdown);
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('Enter');
    // click on save button
    await page.click(pageobject.saveactionbutton);
    // add new action button on page
    await functions.drag_And_Drop(pageobject.cardSource, pageobject.target);
    await page.click(pageobject.ActionDropdown);
    // delete the button
    await page.click(pageobject.deletebutton);
    // click on next page
    await page.click(pageobject.nextoption);
    // click to see destination type
    await page.click(pageobject.destinationtype);
    await page.keyboard.press('Enter');
    // click to see destination view
    await page.click(pageobject.destinationview);
    await page.keyboard.press('Enter');
    // click on finish button
    await page.click(pageobject.finishprimary);
  });

  // Add edit link in list view
  test('Add edit link in list view', async () => {
    // visit view 
    await functions.views();
    // click on newly created view link
    await page.click(pageobject.newviewlink);
    // click on edit link
    await page.click(pageobject.editviewlink);
    // submit the page
    await functions.submit();
    // click on add column button on page
    await page.click(pageobject.addcolumnbutton);
    //drag and drop the action view link
    await functions.drag_And_Drop(pageobject.htmlCodeSource, pageobject.newcolumn);
    // click to view link dropdown
    await page.click(pageobject.viewtolinkdropdown);
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('Enter');
    // add lable for link
    await functions.fill_Text(pageobject.lebelforfield, 'Edit');
    await page.click(pageobject.viewtolinkdropdown);
    // click next button
    await page.click(pageobject.nextoption);
    // click next button again
    await functions.submit();
    //submit the page
    await functions.submit();
    // click finish button
    await page.click(pageobject.finishbuttonprimary);
    // click to new view link again
    await page.click(pageobject.newviewlink);
    // check visibility for edit butoon for row
    await expect(page.locator(pageobject.editfieldlink)).toBeVisible();
    // click on edit button
    await page.click(pageobject.editfieldlink);
    // add text on input box and save
    await functions.fill_Text(pageobject.inputbox1, 'India');
    await page.click(pageobject.saveprimarybutton);
  });

   // Add link to create new row in table
   test('Add link to create new row in table', async () => {
    // visit view
    await functions.views();
    // click on new view link
    await page.click(pageobject.newviewlink);
    // click on edit link
    await page.click(pageobject.editviewlink);
    // submit the page
    await functions.submit();
    // click on next page
    await page.click(pageobject.nextoption);
    // seslet view to create from dropdown
    await page.click(pageobject.viewtocreate);
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('Enter');
    // add lable for view to create
    await functions.fill_Text(pageobject.labeltocreate, 'Add person');
    // submit the page
    await functions.submit();
    await functions.submit();
    await page.click(pageobject.finishbuttonprimary);
    await page.click(pageobject.newviewlink);
    await expect(page.locator(pageobject.addpersonlink)).toBeVisible();
    await page.click(pageobject.addpersonlink);
    await page.click(pageobject.saveprimarybutton);
    await functions.views();
    await page.click(pageobject.newviewlink);
   });

   // create view with show view pattern
  test('create view with show view pattern', async () => {
    await functions.views();
    // assert the view edit url
    expect(page.url()).toBe(baseURL + derivedURL + 'viewedit');
    //assert the visibility of create new view
    await expect(page.locator(pageobject.createnewview)).toBeVisible();
    //click on create new view
    await page.click(pageobject.createnewview);
    // assert the view url
    expect(page.url()).toBe(baseURL + derivedURL + 'viewedit/new');
    // input view name and discription
    await page.fill(pageobject.viewnametextbox, 'showView_' + randomString);
    await page.fill(pageobject.viewdiscriptiontext, 'view for table');
    // click on dropdown and select option
    await page.click(pageobject.viewpatterndropdown);
    // click down aero to change options
    await page.keyboard.press('ArrowDown'); 
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('Enter');
    await page.click(pageobject.viewtabledropdown);
    await page.keyboard.press('Enter');
    // click on view minimum role dropdown
    await page.click(pageobject.viewminimumroledropdown);
    await page.keyboard.press('Enter');
    // submit the page
    await functions.submit();
    

    // click on next button
    await page.click(pageobject.nextoption);
    // click on new view link
    await page.click(pageobject.newviewlink);
  });

  //clear all tables
  test('Navigate to setting page and clear all changes', async () => {
    functions = new PageFunctions(page);
    await functions.SALTCORN();
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