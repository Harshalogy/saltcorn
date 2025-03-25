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

  //Create Subscription Plan table
  test('Create Subscription Plan table', async () => {
    await functions.clear_Data();
    // click table button
    await functions.click_table();
    // Click the "Create table" button
    await page.click(pageobject.createtablebutton);
    // Enter Table name
    await functions.fill_Text(pageobject.InputName, 'Subscription_Plan');
    // click on Create button
    await page.click(pageobject.submitButton);
    await page.click(pageobject.addFieldButtonLocator);
    // Fill the lable name
    await functions.fill_Text(pageobject.labelTextboxlocator, 'Plan Name');
    // select the input type
    const type = await page.$("#inputtype");
    await type?.selectOption("String");
    // Fill the discription
    await functions.fill_Text(pageobject.descriptionSelector, 'Name of Subscription Plan');
    // select the required check box
    await page.waitForSelector(pageobject.RequiredcheckboxLocator);
    await page.check(pageobject.RequiredcheckboxLocator);
    // Click on next button
    await functions.submit();
    await functions.submit();
    await functions.submit();
  });

  //Add Price field
  test('Add Price field', async () => {
    // Install money module for price
    await functions.install_money();
    // click table button
    await functions.click_table();
    await page.click(pageobject.Subs_Plantable);
    await page.click(pageobject.addFieldButtonLocator);
    // Fill the lable name
    await functions.fill_Text(pageobject.labelTextboxlocator, 'Price');
    // select the input type
    const type = await page.$("#inputtype");
    await type?.selectOption("Money");
    // Fill the discription
    await functions.fill_Text(pageobject.descriptionSelector, 'Price of Subscription Plan');
    // Click on next button
    await functions.submit();
    // Input currency type
    await functions.fill_Text(pageobject.inputcurrency, 'USD');
    // Click on Next button
    await functions.submit();
  });

  //Add Feature field
  test('Add Feature field', async () => {
    // Install money module for price
    await functions.install_ckeditor();
    // click table button
    await functions.click_table();
    await page.click(pageobject.Subs_Plantable);
    await page.click(pageobject.addFieldButtonLocator);
    // Fill the lable name
    await functions.fill_Text(pageobject.labelTextboxlocator, 'Features');
    // select the input type
    const type = await page.$("#inputtype");
    await type?.selectOption("HTML");
    // Fill the discription
    await functions.fill_Text(pageobject.descriptionSelector, 'Featurs of Subscription Plan');
    // Submit the page
    await functions.submit();
    await functions.submit();
  });

  //Add cta_link and icon field
  test('Add cta_link and icon field', async () => {
    // click table button
    await functions.click_table();
    await page.click(pageobject.Subs_Plantable);
    // Add cta_link field
    await page.click(pageobject.addFieldButtonLocator);
    // Fill the lable name
    await functions.fill_Text(pageobject.labelTextboxlocator, 'cta_link');
    // select the input type
    const type = await page.$("#inputtype");
    await type?.selectOption("String");
    // Fill the discription
    await functions.fill_Text(pageobject.descriptionSelector, 'Call to Action link of Subscription Plan');
    // Submit the page
    await functions.submit();
    await functions.submit();

    // Add icon field
    await page.click(pageobject.addFieldButtonLocator);
    // Fill the lable name
    await functions.fill_Text(pageobject.labelTextboxlocator, 'Icon');
    // select the input type
    const type1 = await page.$("#inputtype");
    await type1?.selectOption("File");
    // Fill the discription
    await functions.fill_Text(pageobject.descriptionSelector, 'Icon for Subscription Plan');
    // Submit the page
    await functions.submit();
    await functions.fill_Text(pageobject.inputfilestype, 'image/*');
    await functions.submit();
  });

  //Create Edit_Plan view with edit view pattern
  test('Create Edit_Plan view with edit view pattern', async () => {
    await functions.views();
    // click on create new view
    await page.click(pageobject.createnewview);
    // input view name and discription
    await page.fill(pageobject.InputName, 'Edit_Plan');
    await page.fill(pageobject.discriptiontext, 'Add subscription Plan');
      // select the Edit pattern
      const EditPattern = await page.$("#inputviewtemplate");
      await EditPattern?.selectOption("Edit");
  
    // submit the page
    await functions.submit();
    // drag and drop the page source on the page
    await page.waitForTimeout(2000);
    await page.click(pageobject.inputfeatures);
    await page.selectOption(pageobject.fieldViewdropdown, { label: 'CKEditor4' });
    // click on next page
    await page.waitForSelector(pageobject.nextoption);
    await page.click(pageobject.nextoption);
    // click on finish button
    await functions.submit();
  });

  //Create list view For Subscription Plans
  test('Create list view For Subscription Plans', async () => {
    await functions.views();
    // click on create new view
    await page.click(pageobject.createnewview);
    // input view name and discription
    await page.fill(pageobject.InputName, 'Plan_List');
    await page.fill(pageobject.discriptiontext, 'List of Subscription Plans');
    // select list pattern
    const ListPattern = await page.$("#inputviewtemplate");
    await ListPattern?.selectOption("List");
    // submit the page
    await functions.submit();
    await page.waitForTimeout(2000);
    await page.click('text="[Link icon]"');      
    // Select 'Thumbnail' from the dropdown
    await page.selectOption(pageobject.fieldViewdropdown, { label: 'Thumbnail' }); // If using a select dropdown
    // Add new column for edit plan link
    await page.click(pageobject.addcolumnbutton);
    // drag and drop the action view link
    await functions.drag_And_Drop(pageobject.viewlinksource, pageobject.newcolumn);
    // add lable for link
    await functions.fill_Text(pageobject.lebelforfield, 'Edit Plan');
    // click on again new column button on page
    await page.click(pageobject.addcolumnbutton);
    // drag and drop the action locator for delete button
    await functions.drag_And_Drop(pageobject.ActionLocator, pageobject.newcolumn);
    // click on next button
    await page.click(pageobject.nextoption);
    await page.click(pageobject.viewtocreate);
    const viewtocreate = await page.$("#inputview_to_create");
    await viewtocreate?.selectOption("Edit_Plan [Edit]");
    // add lable for view to create
    await functions.fill_Text(pageobject.labeltocreate, 'Add New Plan');
    // click on next button
    await functions.submit();
    // click on next button
    await functions.submit();
    await functions.submit();

    // Add Plan_List view as Destination view for Edit_Plan view
    await page.click(pageobject.configureEditPlan);
    await page.click(pageobject.nextoption);
    // select destination view
    await page.click(pageobject.destinationview);
    await page.selectOption(pageobject.destinationview, { label: 'Plan_List [List on Subscription_Plan]' }); 
    // Finish the page
    await functions.submit();
  });

  //Add Subscription plans from view
  test('Add Subscription plans from view', async () => {
    await functions.views();
    await page.click(pageobject.PlanListlink);
    await page.click(pageobject.addplanlink);
    await functions.fill_Text(pageobject.inputplan_name, 'Basic Plan');
    await functions.fill_Text(pageobject.inputprice, '9.99');
    await functions.fill_Text(pageobject.inputcta_link, '/subscribe/basic');
    // Add Feature in iframe
    await page.waitForSelector('iframe');
    // Wait for the iframe to be available
    const frame = page.frameLocator('iframe');
    // Wait for the body inside the iframe to be available
    await frame.locator('body').waitFor();
    // Optionally, ensure the body is visible before filling it
    await frame.locator('body').waitFor({ state: 'visible' });
    // Fill the content inside the iframe
    await frame.locator('body').click(); // Ensure the body is focused
    // make text bold
    await page.click('#cke_12');
    await frame.locator('body').type('Access to free content\nCommunity support\nLimited resources');
    // Wait for the file input element to be available
    const fileInput = await page.waitForSelector('input[type="file"]');
    // Set the file input to the desired file
    const filePath = 'Csv_file_to_uplaod/basic.png'; // Replace with the correct path to your png file
    await fileInput.setInputFiles(filePath);
    // Click on create button
    await functions.submit();

    await page.click(pageobject.addplanlink);
    await functions.fill_Text(pageobject.inputplan_name, 'Pro Plan');
    await functions.fill_Text(pageobject.inputprice, '19.99');
    await functions.fill_Text(pageobject.inputcta_link, '/subscribe/Pro');
    // Add Feature in iframe
    await page.waitForSelector('iframe');
    // Wait for the iframe to be available
    const frame1 = page.frameLocator('iframe');
    // Wait for the body inside the iframe to be available
    await frame1.locator('body').waitFor();
    // Optionally, ensure the body is visible before filling it
    await frame1.locator('body').waitFor({ state: 'visible' });
    // Fill the content inside the iframe
    await frame1.locator('body').click(); // Ensure the body is focused
    // make text bold
    await page.click('#cke_12');
    await frame1.locator('body').type('Everything in Basic\nExclusive content\nPriority support');
    // Wait for the file input element to be available
    const fileInput1 = await page.waitForSelector('input[type="file"]');
    // Set the file input to the desired file
    const filePath1 = 'Csv_file_to_uplaod/pro.jpg'; // Replace with the correct path to your png file
    await fileInput1.setInputFiles(filePath1);
    // Click on create button
    await functions.submit();

    await page.click(pageobject.addplanlink);
    await functions.fill_Text(pageobject.inputplan_name, 'Premium Plan');
    await functions.fill_Text(pageobject.inputprice, '29.99');
    await functions.fill_Text(pageobject.inputcta_link, '/subscribe/Premium');
    // Add Feature in iframe
    await page.waitForSelector('iframe');
    // Wait for the iframe to be available
    const frame2 = page.frameLocator('iframe');
    // Wait for the body inside the iframe to be available
    await frame2.locator('body').waitFor();
    // Optionally, ensure the body is visible before filling it
    await frame2.locator('body').waitFor({ state: 'visible' });
    // Fill the content inside the iframe
    await frame2.locator('body').click(); // Ensure the body is focused
    // make text bold
    await page.click('#cke_12');
    await frame2.locator('body').type('Everything in Basic\nExclusive content\nPriority support');
    // Wait for the file input element to be available
    const fileInput2 = await page.waitForSelector('input[type="file"]');
    // Set the file input to the desired file
    const filePath2 = 'Csv_file_to_uplaod/Premium.jpg'; // Replace with the correct path to your png file
    await fileInput2.setInputFiles(filePath2);
    // Click on create button
    await functions.submit();
  });

  // Create show_Plan view with show view pattern
  test('Create Show_Plan view with show view pattern', async () => {
    await functions.views();
    // click on create new view
    await page.click(pageobject.createnewview);
    // input view name and discription
    await page.fill(pageobject.InputName, 'Show_Plan');
    await page.fill(pageobject.discriptiontext, 'show subscription Plan');
    // select the show pattern
    const showPattern = await page.$("#inputviewtemplate");
    await showPattern?.selectOption("Show");
    // submit the page
    await functions.submit();
    // drag and drop the page source on the page
    await page.waitForTimeout(2000);
    await page.click(pageobject.target);
    await page.click(pageobject.deletebutton);
    // drag and drop the Column on page
    await functions.drag_And_Drop(pageobject.columnsElement, pageobject.target);
    await functions.fill_Text(pageobject.numbercolumn, '1');
    await page.click(pageobject.columnSettings);
    await page.click(pageobject.CenterButtonalign);
    await page.click(pageobject.clonebutton);
    await page.click(pageobject.clonebutton);
    await page.click(pageobject.clonebutton);
    await page.click(pageobject.clonebutton);
    await functions.drag_And_Drop(pageobject.fieldsource, pageobject.column1);
    //await page.click(pageobject.fielddropdown);
    // Select 'icon' from the dropdown
    await page.selectOption('select.form-control.form-select', 'icon');
    // Set icon field view as thumbnail
    await page.selectOption(pageobject.fieldViewdropdown, { label: 'Thumbnail' });
    // select width and height for thumbnail
    await functions.fill_Text(pageobject.widthInput, '200');
    await functions.fill_Text(pageobject.heightInput, '200');

    await functions.drag_And_Drop(pageobject.fieldsource, pageobject.column2);
    // await page.click(pageobject.fielddropdown);
    // Select 'icon' from the dropdown
    await page.selectOption('select.form-control.form-select', 'Plan Name');
    // Set heading1
    await page.click(pageobject.h1Button);

    await functions.drag_And_Drop(pageobject.fieldsource, pageobject.column3);
    await page.selectOption('select.form-control.form-select', 'Features');
    // Set as Heading2
    await page.click(pageobject.h2Button);

    await functions.drag_And_Drop(pageobject.fieldsource, pageobject.column4);
    await page.selectOption('select.form-control.form-select', 'Price');
    // Set as Heading2
    await page.click(pageobject.h1Button);

    await functions.drag_And_Drop(pageobject.fieldsource, pageobject.column5);
    await page.selectOption('select.form-control.form-select', 'cta_link');
    await page.selectOption(pageobject.fieldViewdropdown, { label: 'as_link' });
    await functions.fill_Text(pageobject.linkTitleInput, 'Subscribe');
    // click on next button
    await page.click(pageobject.nextoption);
  });

  // Create Feed view to show view cards
  test('Create Feed view to show view cards', async () => {
    await functions.views();
    // click on create new view
    await page.click(pageobject.createnewview);
    // input view name and discription
    await page.fill(pageobject.InputName, 'Card_Feed');
    await page.fill(pageobject.discriptiontext, 'Feed for show plan');
    // select the feed pattern
    const showPattern = await page.$("#inputviewtemplate");
    await showPattern?.selectOption("Feed");
    // submit the page
    await functions.submit()
    await page.selectOption(pageobject.ShowViewSelect, { label: 'Show_Plan [Show]' });
    await functions.submit();
    await page.selectOption(pageobject.OrderFieldSelect, { label: 'id' });
    await page.selectOption(pageobject.ViewDecorationSelect, { label: 'Card' });
    await functions.fill_Text(pageobject.ColsXlInput, '3');
    await functions.submit()
  });

  test('Create a new page with random string', async () => {
    // Create a new page for landing page
    await functions.create_New_Page('Landing_Page');
    await page.waitForTimeout(5000);
    // Drag and drop the text source
    await page.waitForSelector(pageobject.textSource);
    await functions.drag_And_Drop(pageobject.textSource, pageobject.target);
    await functions.fill_Text(pageobject.textlocator, '');
    await page.waitForTimeout(2000);
    await functions.fill_Text(pageobject.textlocator, 'Welcome to our subscription');
  });
});