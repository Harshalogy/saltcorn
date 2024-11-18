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

        // Create a new browser context with HTTPS error ignored
        context = await browser.newContext({ ignoreHTTPSErrors: true });
        page = await context.newPage();

        // Set the viewport for a consistent test screen size
        await page.setViewportSize({ width: 1350, height: 720 });

        // Initialize page functions and locators
        functions = new PageFunctions(page);
        pageobject = new PageObject(page);

        // Navigate to the base URL and log in
        await functions.navigate_To_Base_URL(baseURL, derivedURL);
        await functions.login('myproject19july@mailinator.com', 'myproject19july');
        await functions.submit();
       // await functions.clear_Data();

    });

    test.afterAll(async () => {
        // Ensure the page and context close properly after tests
        await page.close();
        await context.close();
    });

    test('Validate Side Navbar', async () => {
        await functions.install_any_bootstrap_theme();
        await page.selectOption(pageobject.inputmenu_style, { value: 'Side Navbar' });
        // await page.click(pageobject.finish_button);
        await functions.submit();
        await page.goto(pageobject.base_urls);
        await page.goto(pageobject.tableclick);
        
        // Enter Table name
        await customAssert('Create table button should be visible and working', async () => {
          await page.waitForSelector(pageobject.createtablebutton);
          await expect(page.locator(pageobject.createtablebutton)).toBeVisible();
          // Assert label of Create table button
          await expect(page.locator(pageobject.createtablebutton)).toHaveText('Create table');
          // Click the "Create table" button
          await page.click(pageobject.createtablebutton);
      });
        await functions.fill_Text(pageobject.InputName, 'SideNav_Table');
        await customAssert('Create button should be visible and working', async () => {
          await page.waitForSelector(pageobject.submitButton);
          await expect(page.locator(pageobject.submitButton)).toBeVisible();
          // Assert label of create button
          await expect(page.locator(pageobject.submitButton)).toHaveText('Create');
          // click on Create button
          await page.click(pageobject.submitButton);
      });
      // check visibility of id field already exist
      await customAssert('Id field for table should be already exist ', async () => {
          await page.waitForSelector(pageobject.idfieldlocator);
          await expect(page.locator(pageobject.idfieldlocator)).toBeVisible();
          // Assert the lable of ID field
          await expect(page.locator(pageobject.idfieldlocator)).toHaveText('ID');
      });
      // check id field is integer type
      await customAssert('Id field should be integer type ', async () => {
          await page.waitForSelector(pageobject.idtypelocator);
          await expect(page.locator(pageobject.idtypelocator)).toBeVisible();
          // Assert the label of variable type of id
          await expect(page.locator(pageobject.idtypelocator)).toHaveText('Integer');
      });
        

        //creating a csv upload
          await page.goto(pageobject.base_urls);
          await customAssert('Assert the csvupload', async () => {
            await expect(page.locator(pageobject.createfromcsvupload)).toBeVisible();
            await page.click(pageobject.createfromcsvupload);

          });
          // await page.goto(pageobject.create_CSV);
          // Wait for the file input element to be available
          const fileInput = await page.waitForSelector('input[type="file"]');
          // Set the file input to the desired file
          const filePath = 'Csv_file_to_uplaod/People1.csv'; // Replace with the correct path to your CSV file
          await fileInput.setInputFiles(filePath);
          // fill table name on text box
          await functions.fill_Text(pageobject.InputName, 'SideNav_CSV');
          // Click on create button
          await functions.submit();
         
          // id field should be visible
          await customAssert('Assert id field is visible', async () => {
              await expect(page.locator(pageobject.idfieldlocator)).toBeVisible();
              await expect(page.locator(pageobject.idfieldlocator)).toHaveText('ID');
          });
          // id field variable type should be integer
          await customAssert('Assert id field type is integer', async () => {
              await expect(page.locator(pageobject.idtypelocator)).toBeVisible();
              await expect(page.locator(pageobject.idtypelocator)).toHaveText('Integer');
          });
          // Full Name field should be visible
          await customAssert('Assert Full name field is visible', async () => {
              await expect(page.locator(pageobject.fullnamefieldlocator)).toBeVisible();
              await expect(page.locator(pageobject.fullnamefieldlocator)).toHaveText('Full name');
          });
          // Full name field type should be string
          await customAssert('Assert Full name field is string type and visible', async () => {
              await expect(page.locator(pageobject.csvnamestringtype)).toBeVisible();
              await expect(page.locator(pageobject.csvnamestringtype)).toHaveText('String');
          });
          // DOB field should be visible
          await customAssert('Assert DOB field is visible', async () => {
              await expect(page.locator(pageobject.dobfieldlocator)).toBeVisible();
              await expect(page.locator(pageobject.dobfieldlocator)).toHaveText('Date of birth');
          });
          // DOB field type should be Date
          await customAssert('Assert DOB field is Date type and visible', async () => {
              await expect(page.locator(pageobject.datetypelocator)).toBeVisible();
              await expect(page.locator(pageobject.datetypelocator)).toHaveText('Date');
          });
          // Adress field should be visible
          await customAssert('Assert address field is string type and visible', async () => {
              await expect(page.locator(pageobject.addressfieldlocator)).toBeVisible();
              await expect(page.locator(pageobject.addressfieldlocator)).toHaveText('Address');
          });
          // Address field type should be String
          await customAssert('Assert address field is string type and visible', async () => {
              await expect(page.locator(pageobject.csvaddressstringtype)).toBeVisible();
              await expect(page.locator(pageobject.csvaddressstringtype)).toHaveText('String');
          });
          
        //   // create a new page
           await page.goto(pageobject.base_urls);
          await customAssert('Assert Create page is visible', async () => {
            await expect(page.locator(pageobject.createpage)).toBeVisible();
            await expect(page.locator(pageobject.createpage)).toHaveText('Create page');
        });
        await page.goto(baseURL + derivedURL + pageobject.admin_Clear_All);
        await functions.navi_Setting_Dropdown_Clear();
 

    });
});






















































        // await page.goto(pageobject.base_urls);
        // await customAssert('Create table button should be visible and working', async () => {
        //     await page.waitForSelector(pageobject.createtablebutton);
        //     await expect(page.locator(pageobject.createtablebutton)).toBeVisible();
        //     // Assert label of Create table button
        //     await expect(page.locator(pageobject.createtablebutton)).toHaveText('Create table');
        //     await functions.fill_Text(pageobject.InputName, 'My_Table');
        //     // Click the "Create table" button
        //     await page.click(pageobject.createtablebutton);

        // });

        // await customAssert('Assert the lable of Packs tab', async () => {
        //     await expect(page.locator(pageobject.packslocator)).toBeVisible();
        //     await expect(page.locator(pageobject.packslocator)).toHaveText('Packs');
        //     });
        //     await customAssert('Assert the label of Files setting', async () => {
        //         await expect(page.locator(pageobject.File)).toBeVisible();
        //         await expect(page.locator(pageobject.File)).toHaveText('Files');
        //     });

        // await customAssert('Triggers tab label should be visible', async () => {
        //     await expect(page.locator(pageobject.trigerslocator)).toBeVisible();
        //     await expect(page.locator(pageobject.trigerslocator)).toHaveText('Triggers');
        // });

        // // creating a new table
        // await page.goto(pageobject.tableclick); 




       


        // // creating a new page
        // await customAssert('create new view button should be visible', async () => {
        //     await expect(page.locator(pageobject.createnewview)).toBeVisible();
        //     await expect(page.locator(pageobject.createnewview)).toHaveText('Create view');
        // });
        // await page.waitForTimeout(2000);
        // await page.goto(pageobject.pageclick);
        // await page.click(pageobject.newPageButton);
        // await page.fill(pageobject.InputName,'new_page');
        // await page.click(pageobject.submitButton);
        // await page.goto(pageobject.base_urls);








