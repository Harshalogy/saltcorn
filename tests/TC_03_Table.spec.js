const { test, expect } = require('@playwright/test');
const { baseURL, derivedURL } = require('../pageobject/base_url.js');
const PageFunctions = require('../pageobject/function.js');
const PageObject = require('../pageobject/locators.js');
const customAssert = require('../pageobject/utils.js');
const Logger = require('../pageobject/logger.js');
const fs = require('fs');

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

  test('Click table button and verify URL', async () => {
    //click table button
    await functions.click_table();
    await customAssert('Page url should be https://e2etest.saltcorn.co/table ', async () => {
      expect(page.url()).toBe(baseURL + derivedURL + 'table');
    });
  });

  // Check the "Create table" function
  test('Check the "Create table" Function', async () => {
    await customAssert('Create table button should be visible and working', async () => {
      await expect(page.locator(pageobject.createtablebutton)).toBeVisible();
      // Click the "Create table" button
      await page.click(pageobject.createtablebutton);
    });
    // Enter Table name
    await functions.fill_Text(pageobject.tableNameTextlocator, 'My_Table' + randomString);
    await customAssert('Create button should be visible and working', async () => {
      await expect(page.locator(pageobject.createButtonLocator)).toBeVisible();
      // click on Create button
      await page.click(pageobject.createButtonLocator);
    });
    await customAssert('fields for table should be visible ', async () => {
      await expect(page.locator(pageobject.FieldsLocator)).toBeVisible();
    });
    // check visibility of id field already exist
    await customAssert('Id field for table should be already exist ', async () => {
      await expect(page.locator(pageobject.idfieldlocator)).toBeVisible();
    });
    // check id field is iteger type
    await customAssert('Id field should be integer type ', async () => {
      await expect(page.locator(pageobject.idtypelocator)).toBeVisible();
    });
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
    await customAssert('Full Name field should be visible on fields ', async () => {
      await expect(page.locator(pageobject.fullnamefieldlocator)).toBeVisible();
    });
    // check required tag for full name field
    await customAssert('Full name field should should have required tag ', async () => {
      await expect(page.locator(pageobject.fullnamerequiredtaglocator)).toBeVisible();
    });
    // check full name field type is string
    await customAssert('Full Name field should be string type ', async () => {
      await expect(page.locator(pageobject.fullnametypelocator)).toBeVisible();
    });
    // check variable name for full name field is visible
    await customAssert('Variable name for full name should be full_name and visible ', async () => {
      await expect(page.locator(pageobject.fullnamevariablelocator)).toBeVisible();
    });
    // check delete button for full name field is visible
    await customAssert('Delete button for full name field should be exist ', async () => {
      await expect(page.locator(pageobject.fullnamedeletebutton)).toBeVisible();
    });
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
    await customAssert('DOB field for table should be visible ', async () => {
      await expect(page.locator(pageobject.dobfieldlocator)).toBeVisible();
    });
    // check DOB field type is Date
    await customAssert('DOB field should have Date type ', async () => {
      await expect(page.locator(pageobject.datetypelocator)).toBeVisible();
    });
    // check varable name for dob field is visible
    await customAssert('Variable name for DOB field should be date_of_birth ', async () => {
      await expect(page.locator(pageobject.datevariablelocator)).toBeVisible();
    });
    // check delete button for DOB field is visible
    await customAssert('Delete button for DOB field should be exist ', async () => {
      await expect(page.locator(pageobject.deletedobbutton)).toBeVisible();
    });
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
    await customAssert('Address field should be visible', async () => {
      await expect(page.locator(pageobject.addressfieldlocator)).toBeVisible();
    });
    // check address field type is string
    await customAssert('Address field type should be string', async () => {
      await expect(page.locator(pageobject.addresstypelocator)).toBeVisible();
    });
    // check variable name for address field is visible
    await customAssert('variable name for Address field should be adress and visible ', async () => {
      await expect(page.locator(pageobject.addressvariablelocator)).toBeVisible();
    });
    // check delete button for address field is visible
    await customAssert('Delete button for Address field should be visible ', async () => {
      await expect(page.locator(pageobject.deleteaddressbutton)).toBeVisible();
    });
  });

  // Add Row and value in the table
  test('Add row and insert value in the coulmns', async () => {
    // Generate a random string
    const randomString = PageFunctions.generate_Random_String(5);
    //Click on edit link
    await page.click(pageobject.EditlinkLocator);
    //Click on add row button
    await customAssert('Add row button on table should be visible ', async () => {
      await expect(page.locator(pageobject.addrowlocator)).toBeVisible();
    });
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
    await customAssert('Calander should be open after clicking on date column ', async () => {
      const calendarVisible = await page.isVisible(pageobject.calendarlocator);
      expect(calendarVisible).toBe(true);
    });
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
    // Click table button
    await functions.click_table();
    await page.click(pageobject.Defaultusertable);

    // Wait for the download event and click the download link
    const [download] = await Promise.all([
      page.waitForEvent('download'),
      page.click(pageobject.downloadlinklocator)
    ]);

    // Get the path of the downloaded file
    const downloadPath = await download.path();

    // Verify the downloaded file
    if (downloadPath) {
      console.log('File downloaded to:', downloadPath);

      // Check if the file exists
      if (fs.existsSync(downloadPath)) {
        console.log('File exists:', downloadPath);

        // Optionally, read the file content
        const fileContent = fs.readFileSync(downloadPath, 'utf8');
        console.log('File content:', fileContent);

        // Assert the file content (adjust based on your expected content)
        await customAssert('File content should be correct', async () => {
          expect(fileContent).toContain('id,full_name,date_of_birth,address'); // Adjust this line based on the actual expected content
        });
      } else {
        throw new Error('Downloaded file not found.');
      }
    } else {
      throw new Error('Download event not triggered.');
    }
  });

  // create view with list view pattern
  test('create view with list view pattern', async () => {
    await functions.views();
    // assert the view edit url
    await customAssert('page url should be https://e2etest.saltcorn.co/viewedit  ', async () => {
      expect(page.url()).toBe(baseURL + derivedURL + 'viewedit');
    });
    //assert the visibility of create new view
    await customAssert('Create new view button should be visible and working', async () => {
      await expect(page.locator(pageobject.createnewview)).toBeVisible();
      //click on create new view
      await page.click(pageobject.createnewview);
    });
    // assert the view url
    await customAssert('page url should be https://e2etest.saltcorn.co/viewedit/new  ', async () => {
      expect(page.url()).toBe(baseURL + derivedURL + 'viewedit/new');
    });
    // input view name and discription
    await page.fill(pageobject.viewnametextbox, 'NewView_' + randomString);
    await page.fill(pageobject.viewdiscriptiontext, 'view for table');
    // click on dropdown and select option
    await page.click(pageobject.viewpatterndropdown);
    //await page.keyboard.press('ArrowDown'); // click down aero to change options
    await page.keyboard.press('Enter');
    // validate the table name in table dropdown
    await customAssert('Table Name should be same as we created earlier', async () => {
      await expect(page.locator('#inputtable_name')).toHaveText(`My_Table${randomString}users`);
    });
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
    await customAssert('Delete view button should be visible  ', async () => {
      await expect(page.locator(pageobject.deleteviewbutton)).toBeVisible();
    });
  });

  // create new view with edit view pattern
  test('create new view with edit view pattern', async () => {
    await functions.views();
    //assert the visibility of create new view
    await customAssert('Create new view button should be visible and working', async () => {
      await expect(page.locator(pageobject.createnewview)).toBeVisible();
      //click on create new view
      await page.click(pageobject.createnewview);
    });
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
    await page.waitForTimeout(4000);
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
    await customAssert('Edit field link should be visible', async () => {
      await expect(page.locator(pageobject.editfieldlink)).toBeVisible();
      // click on edit button
      await page.click(pageobject.editfieldlink);
    });
    // add text on input box and save
    //await functions.fill_Text(pageobject.inputbox1, 'India');
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
    // click on next button
    await functions.submit();
    // click on next button again
    await functions.submit();
    // click on finish button
    await page.click(pageobject.finishbuttonprimary);
    // click on new view link
    await page.click(pageobject.newviewlink);
    // assert the visibility of add person link
    await customAssert('Add person link should be visible and working', async () => {
      await expect(page.locator(pageobject.addpersonlink)).toBeVisible();
      // click on add person link
      await page.click(pageobject.addpersonlink);
    });
    // click on save button
    await page.click(pageobject.saveprimarybutton);
    // go to view again and click to see new view link
    await functions.views();
    await page.click(pageobject.newviewlink);
  });

  // create view with show view pattern
  test('create view with show view pattern', async () => {
    await functions.views();
    // assert the view edit url
    await customAssert('page url should be https://e2etest.saltcorn.co/viewedit  ', async () => {
      expect(page.url()).toBe(baseURL + derivedURL + 'viewedit');
    });
    //assert the visibility of create new view
    await customAssert('Create new view button should be visible', async () => {
      await expect(page.locator(pageobject.createnewview)).toBeVisible();
      //click on create new view
      await page.click(pageobject.createnewview);
    });
    // assert the view url
    await customAssert('page url should be https://e2etest.saltcorn.co/viewedit/new  ', async () => {
      expect(page.url()).toBe(baseURL + derivedURL + 'viewedit/new');
    });
    // input view name and discription
    await page.fill(pageobject.viewnametextbox, 'showView_' + randomString);
    await page.fill(pageobject.viewdiscriptiontext, 'view for table');
    // click on dropdown and select option
    await page.click(pageobject.viewpatterndropdown);
    // click down aero to change options to show
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('Enter');
    // click on view table drop down
    await page.click(pageobject.viewtabledropdown);
    await page.keyboard.press('Enter');
    // click on view minimum role dropdown
    await page.click(pageobject.viewminimumroledropdown);
    await page.keyboard.press('Enter');
    // submit the page
    await functions.submit();
    await page.click(pageobject.Fullnameshow);
    await page.click(pageobject.deletebutton);

    await functions.drag_And_Drop(pageobject.fullnameuser, pageobject.target);
    await page.click(pageobject.nameontarget);
    await page.click(pageobject.textstyle);
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('Enter');
    // click on next button
    await page.click(pageobject.nextoption);
    // click on new view link
    await page.click(pageobject.newviewlink);
  });

  test('Add table by uploading csv file', async () => {
    //click table button
    await functions.click_table();
    //Click on Create from CSV upload link
    await page.click(pageobject.createfromcsvupload);
    // click on choose file button
    await page.click(pageobject.choosefilebutton);
    // Wait for the file input element to be available
    const fileInput = await page.waitForSelector('input[type="file"]');
    // Set the file input to the desired file
    const filePath = 'Csv_file_to_uplaod/People1.csv'; // Replace with the correct path to your CSV file
    await fileInput.setInputFiles(filePath);
    // fill table name on text box
    await functions.fill_Text(pageobject.csvtablenametextbox, 'csv_Table' + randomString);
    // Click on create button
    await page.click(pageobject.createcsvbutton);
    // Click on create view from table
    await page.click(pageobject.createviewfromtable);
    // input view name and discription
    await page.fill(pageobject.viewnametextbox, 'csvView_' + randomString);
    await page.fill(pageobject.viewdiscriptiontext, 'view for csv table');
    // submit the page
    await functions.submit();
    // click on next button
    await page.click(pageobject.nextoption);
    // click on next button
    await functions.submit();
    await page.click(pageobject.finishbuttonprimary);
    // id field should be integer type and visible
    await customAssert('Assert id field is integer type and visible', async () => {
      await expect(page.locator(pageobject.idfromcsvtable)).toBeVisible();
      await expect(page.locator(pageobject.csvidintegertype)).toBeVisible();
    });
    // Full Name field should be string type and visible
    await customAssert('Assert Full name field is straing type and visible', async () => {
      await expect(page.locator(pageobject.csvfullnamefield)).toBeVisible();
      await expect(page.locator(pageobject.csvnamestringtype)).toBeVisible();
    });
    // DOB field should be Date type and visible
    await customAssert('Assert DOB field is Date type and visible', async () => {
      await expect(page.locator(pageobject.csvDOBfield)).toBeVisible();
      await expect(page.locator(pageobject.csvDobdatetype)).toBeVisible();
    });
    // Adress field should be string type and visible
    await customAssert('Assert address field is string type and visible', async () => {
      await expect(page.locator(pageobject.csvaddressfield)).toBeVisible();
      await expect(page.locator(pageobject.csvaddressstringtype)).toBeVisible();
    });

    // click on new view link
    await page.click(pageobject.newviewfromtable);
  });
  //clear all tables
  test('Navigate to setting page and clear all changes', async ({browser}) => {
    functions = new PageFunctions(page);
    await functions.SALTCORN();
    await functions.navigate_To_Settings();
    await functions.navigate_To_about_application();
    await functions.about_application_to_system();
    await functions.clear_All();
  });

});