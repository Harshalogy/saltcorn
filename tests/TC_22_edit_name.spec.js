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

  // create view with list view pattern
  test('create view with list view pattern', async () => {
    await functions.views();
    // assert the view edit url
    await customAssert('page url should be /viewedit  ', async () => {
      expect(page.url()).toBe(baseURL + derivedURL + 'viewedit');
    });
    // assert the visibility of create new view
    await customAssert('Create new view button should be visible and working', async () => {
      await page.waitForSelector(pageobject.createnewview);
      await expect(page.locator(pageobject.createnewview)).toBeVisible();
      // Assert the lable for create view button
      await expect(page.locator(pageobject.createnewview)).toHaveText('Create view');
      // click on create new view
      await page.click(pageobject.createnewview);
    });
    // assert the view url
    await customAssert('page url should be /viewedit/new  ', async () => {
      expect(page.url()).toBe(baseURL + derivedURL + 'viewedit/new');
    });
    // input view name and discription
    await page.fill(pageobject.InputName, 'NewView_List');
    await page.fill(pageobject.discriptiontext, 'view for table');

    await page.waitForTimeout(10000)

    // validate the view pattern in table dropdown
    await customAssert('View Pattern should be list', async () => {
      // select list pattern
      const ListPattern = await page.$("#inputviewtemplate");
      await ListPattern?.selectOption("List");
    });

    // validate the table name in table dropdown
    await customAssert('Table Name should be same as we created earlier', async () => {
      await expect(page.locator('#inputtable_name')).toHaveText(`users`);
      const tableText = await page.locator('#inputtable_name').innerText();
      await page.locator('#inputtable_name').selectText('My_Table');
      console.log(`Text in locator '#inputtable_name': ${tableText}`);
    });
    // submit the page
    await functions.submit();
    await page.locator(`text=myproject19july@mailinator.com`).nth(0).click();
    await customAssert('Click on the checkbox to edit', async () => {
      const checkboxLocator = page.locator(pageobject.ClickToEditCheckBox);
      await expect(checkboxLocator).toBeVisible();  // Assert checkbox is visible
      await checkboxLocator.click();
    });
    await page.waitForTimeout(5000);
    await customAssert('Click the next option twice', async () => {
      await page.locator(pageobject.nextoption).click();
      await page.locator(pageobject.nextoption).click();
    });

    await functions.submit();

    await functions.views();

    await page.waitForSelector(pageobject.newviewlink);
    await page.click(pageobject.newviewlink);

    await customAssert('Click on the email to edit', async () => {
      const emailEditLocator = page.locator('table tbody td div:has-text("myproject19july@mailinator.com")');
      await emailEditLocator.click();
    });

    await customAssert('Click on the email to edit and check edit icon visibility', async () => {
      const emailEditLocator = page.locator('table tbody td div:has-text("myproject19july@mailinator.com")');
      await emailEditLocator.hover(); // Hover over the email to make the edit icon appear
      const editIconLocator = emailEditLocator.locator('.editicon');

      // Assertion to check if edit icon is visible
      await expect(editIconLocator).toBeVisible();
      await emailEditLocator.click(); // Click to edit after verifying visibility
    });

    await customAssert('Click on the edit icon and verify OK and Cancel button visibility', async () => {

      // Locators for OK and Cancel buttons
      const okButtonLocator = page.locator('button.btn.btn-sm.btn-primary'); // OK button
      const cancelButtonLocator = page.locator('button.btn.btn-sm.btn-danger'); // Cancel button

      // Assertions to verify both buttons are visible
      await expect(okButtonLocator).toBeVisible();
      await expect(cancelButtonLocator).toBeVisible();
    });


    // Generate a random email
    const randomEmail = `updated${Math.floor(Math.random() * 10000)}@mailinator.com`;

    await customAssert('Ensure the username field is editable and fill it with new value', async () => {
      const usernameFieldLocator = page.locator(pageobject.editedUserName);
      await usernameFieldLocator.fill(randomEmail); // Use the random email
    });

    await customAssert('Click on submit button after editing the name', async () => {
      const submitButtonLocator = page.locator(pageobject.submitEditedName);
      await submitButtonLocator.click();
    });

    await page.reload();
    await page.reload({ waitUntil: 'networkidle' });

    await customAssert('Verify the updated email is visible in the table', async () => {
      const updatedEmailLocator = page.locator(`table tbody td div:has-text("${randomEmail}")`);
      await updatedEmailLocator.click();
    });


    await customAssert('Ensure the username field is editable again and reset it', async () => {
      const usernameFieldLocator = page.locator(pageobject.editedUserName);
      await page.waitForSelector(pageobject.editedUserName);

      // Clear the input field
      await usernameFieldLocator.fill(''); // This ensures the field is empty
      await usernameFieldLocator.fill('myproject19july@mailinator.com'); // Fill with new email
    });

    await customAssert('Click on submit button to save the reset email', async () => {
      const submitButtonLocator = page.locator(pageobject.submitEditedName);
      await expect(submitButtonLocator).toBeEnabled();  // Assert submit button is enabled
      await submitButtonLocator.click();
    });
    await functions.clear_Data();
  });
});