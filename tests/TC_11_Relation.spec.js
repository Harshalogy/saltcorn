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

    // Create the Employee table
    test('Create Employee table', async () => {
        await functions.clear_Data();
        // click table button
        await functions.click_table();
        // Click the "Create table" button
        await page.click(pageobject.createtablebutton);
        // Enter Table name
        await functions.fill_Text(pageobject.InputName, 'Employee');
        // click on Create button
        await page.click(pageobject.submitButton);
        // click on add field button
        await page.click(pageobject.addFieldButtonLocator);
        // Fill the lable name
        await functions.fill_Text(pageobject.labelTextboxlocator, 'Name');
        // select the input type
        const type = await page.$("#inputtype");
        await type?.selectOption("String");
        // Fill the discription
        await functions.fill_Text(pageobject.descriptionSelector, 'Name of Employee');
        // Click on next button
        await functions.submit();
        // click on next button
        await functions.submit();
        // click on finish button
        await functions.submit();
        await page.click(pageobject.EditlinkLocator);
        // Click on add row button
        await page.waitForTimeout(5000);
        await page.click(pageobject.addrowlocator);
        // click on tab cell to activate it
        await page.waitForSelector(pageobject.Nametab);
        await page.click(pageobject.Nametab);
        // enter value in cell
        await page.keyboard.type('Adam');
        await page.click(pageobject.addrowlocator);
        await page.click(pageobject.Nametab);
        await page.keyboard.type('Bolt');
        await page.click(pageobject.addrowlocator);
        await page.click(pageobject.Nametab);
        await page.keyboard.type('Charl');
        await page.waitForTimeout(2000);
    });

    // Create Department table
    test('Create Department table', async () => {
        // click table button
        await functions.click_table();
        // Click the "Create table" button
        await page.click(pageobject.createtablebutton);
        // Enter Table name
        await functions.fill_Text(pageobject.InputName, 'Department');
        // click on Create button
        await page.click(pageobject.submitButton);
        // await page.click(pageobject.DepartmentTable);
        // click on add field button
        await page.click(pageobject.addFieldButtonLocator);
        // Fill the lable name
        await functions.fill_Text(pageobject.labelTextboxlocator, 'Name');
        // select the input type
        const type = await page.$("#inputtype");
        await type?.selectOption("String");
        // Fill the discription
        await functions.fill_Text(pageobject.descriptionSelector, 'Name of Department');
        // Click on next button
        await functions.submit();
        // click on next button
        await functions.submit();
        // click on finish button
        await functions.submit();
        // click on add field button
        await page.click(pageobject.addFieldButtonLocator);
        // Fill the lable name
        await functions.fill_Text(pageobject.labelTextboxlocator, 'Manage');
        // select the input type
        await customAssert('Select type key to employee ', async () => {
            const type1 = await page.$("#inputtype");
            await type1?.selectOption("Key to Employee");
        });
        // Fill the discription
        await functions.fill_Text(pageobject.descriptionSelector, 'Name of Employee who manage the department');
        // Click on next button
        await functions.submit();
        await customAssert('Select Name on summary field', async () => {
            await page.selectOption(pageobject.summaryFieldSelect, { label: 'Name [String]' });
        });
        await customAssert('Select Set null On delete of parant row ', async () => {
            await page.selectOption(pageobject.onDeleteSelect, { label: 'Set null' });
        });
        // Click on next button
        await functions.submit();
        await page.click(pageobject.EditlinkLocator);
        // Click on add row button
        await page.waitForTimeout(5000);
        await page.click(pageobject.addrowlocator);
        // click on tab cell to activate it
        await page.waitForSelector(pageobject.manageCell);
        // enter value in First row
        await page.click(pageobject.manageCell);
        await page.click('text=Adam');
        await page.click(pageobject.Nametab);
        await page.keyboard.type('Earn');
        await page.waitForTimeout(1000);

        await page.click(pageobject.addrowlocator);
        // enter value in Second row
        await page.click(pageobject.manageCell);
        await page.click('text=Bolt');
        await page.click(pageobject.Nametab);
        await page.keyboard.type('Spend');
        await page.waitForTimeout(1000);

        await page.click(pageobject.addrowlocator);
        // enter value in Third row
        await page.click(pageobject.manageCell);
        await page.click('text=Charl');
        await page.click(pageobject.Nametab);
        await page.keyboard.type('Collect');
        await page.waitForTimeout(2000);
    });

    // Add Department field in Employe table and link with
    test('Add Department field in Employe table and link with', async () => {
        // click table button
        await functions.click_table();
        // Click on emlpoyee table
        await page.click(pageobject.EmployeeTable);
        // click on add field button
        await page.click(pageobject.addFieldButtonLocator);
        // Fill the lable name
        await functions.fill_Text(pageobject.labelTextboxlocator, 'Department');
        // select the input type
        await customAssert('Select type key to employee ', async () => {
            const type1 = await page.$("#inputtype");
            await type1?.selectOption("Key to Department");
        });
        // Fill the discription
        await functions.fill_Text(pageobject.descriptionSelector, 'Department of Employee that they manage');
        // Click on next button
        await functions.submit();
        await customAssert('Select Name on summary field', async () => {
            await page.selectOption(pageobject.summaryFieldSelect, { label: 'Name [String]' });
        });
        await customAssert('Select Set null On delete of parant row ', async () => {
            await page.selectOption(pageobject.onDeleteSelect, { label: 'Set null' });
        });
        // Click on next button
        await functions.submit();
        await page.click(pageobject.EditlinkLocator);
        await page.click(pageobject.departmentCell1);
        await page.click('text=Earn');
        await page.click(pageobject.departmentCell2);
        await page.click('text=Spend');
        await page.click(pageobject.departmentCell3);
        await page.click('text=Collect');
        await page.waitForTimeout(2000);
        await functions.click_table();
    });

    // Create show view for Department
    test('Create show view for Department', async () => {
        await functions.views();
        // click on create new view
        await page.click(pageobject.createnewview);
        // input view name and discription
        await page.fill(pageobject.InputName, 'Show_Department');
        await page.fill(pageobject.discriptiontext, 'view to show department');

        // validate the view pattern in table dropdown
        await customAssert('Select Show View Pattern', async () => {
            // select list pattern
            const ListPattern = await page.$("#inputviewtemplate");
            await ListPattern?.selectOption("Show");
        });

        // validate the table name in table dropdown
        await customAssert('Select department table to create show view', async () => {
            await page.selectOption(pageobject.viewtabledropdown, { label: 'Department' });
        });
        // submit the page
        await functions.submit();
        await page.waitForTimeout(2000);
        await functions.views();
    });

    // Create List view for employee table and add show Department link
    test('Create List view for Employee table and add show Department link', async () => {
        await functions.views();
        // click on create new view
        await page.click(pageobject.createnewview);
        // input view name and discription
        await page.fill(pageobject.InputName, 'List_Employee');
        await page.fill(pageobject.discriptiontext, 'List view of show Employee');

        // validate the view pattern in table dropdown
        await customAssert('Select List View Pattern', async () => {
            // select list pattern
            const ListPattern = await page.$("#inputviewtemplate");
            await ListPattern?.selectOption("List");
        });

        // validate the table name in table dropdown
        await customAssert('Select department table to create show view', async () => {
            await page.selectOption(pageobject.viewtabledropdown, { label: 'Employee' });
        });
        await functions.submit();
        await page.waitForTimeout(2000);
        // click on add column button on page
        await page.waitForSelector(pageobject.addcolumnbutton);
        await page.click(pageobject.addcolumnbutton);
        // drag and drop the viewlink locator
        await functions.drag_And_Drop(pageobject.viewlinksource, pageobject.newcolumn3);
        // select view to show from dropdown
        await customAssert('Select Show department view in view dropdown', async () => {
            await page.waitForSelector(pageobject.viewtolinkdropdown);
            await page.click(pageobject.viewtolinkdropdown);
            // Click to select show department option in the dropdown
            await page.click(pageobject.view2showDepartment);
        });
        // add lable for link
        await page.waitForSelector(pageobject.lebelforfield);
        await functions.fill_Text(pageobject.lebelforfield, 'Show Department');
        await page.waitForTimeout(5000);
        // click on next button
        await page.click(pageobject.nextoption);
        await functions.views()
        // click to List employee view link again
        await page.click(pageobject.EmployeeListlink);
        // check that show link is visible and working for an employee
        await customAssert('Assert show department link is visible and working for first employee', async () => {
            // Click on show department link
            await page.click(pageobject.showDepartmentlink);
        });
        await customAssert('Assert show department for id = 1', async () => {
            expect(page.url()).toBe(baseURL + derivedURL + 'view/Show_Department?id=1');
        });
        // Navigate back to the previous page
        await page.goBack();
        // check that show link is visible and working for another employee
        await customAssert('Assert show department link is visible and working for second employee', async () => {
            // Click on show department link
            await page.click(pageobject.showDepartmentlink2);
        });
        await customAssert('Assert show department for id = 2', async () => {
            expect(page.url()).toBe(baseURL + derivedURL + 'view/Show_Department?id=2');
        });
    });

    // Create show view for Employee table
    test('Create show view for Employee table', async () => {
        await functions.views();
        // click on create new view
        await page.click(pageobject.createnewview);
        // input view name and discription
        await page.fill(pageobject.InputName, 'Show_Employee');
        await page.fill(pageobject.discriptiontext, 'view to show employee');

        // validate the view pattern in table dropdown
        await customAssert('Select Show View Pattern', async () => {
            // select list pattern
            const ListPattern = await page.$("#inputviewtemplate");
            await ListPattern?.selectOption("Show");
        });

        // validate the table name in table dropdown
        await customAssert('Select department table to create show view', async () => {
            await page.selectOption(pageobject.viewtabledropdown, { label: 'Employee' });
        });
        // submit the page
        await functions.submit();
        await page.waitForTimeout(2000);
        await functions.views();
    });

    // Create List view for Department table and add show Employee link
    test('Create List view for Department table and add show Employee link', async () => {
        await functions.views();
        // click on create new view
        await page.click(pageobject.createnewview);
        // input view name and discription
        await page.fill(pageobject.InputName, 'List_Department');
        await page.fill(pageobject.discriptiontext, 'List view of department');

        // validate the view pattern in table dropdown
        await customAssert('Select List View Pattern', async () => {
            // select list pattern
            const ListPattern = await page.$("#inputviewtemplate");
            await ListPattern?.selectOption("List");
        });
        // validate the table name in table dropdown
        await customAssert('Select department table to create show view', async () => {
            await page.selectOption(pageobject.viewtabledropdown, { label: 'Department' });
        });
        await functions.submit();
        await page.waitForTimeout(2000);
        // click on add column button on page
        await page.waitForSelector(pageobject.addcolumnbutton);
        await page.click(pageobject.addcolumnbutton);
        // drag and drop the viewlink locator
        await functions.drag_And_Drop(pageobject.viewlinksource, pageobject.newcolumn3);
        // select view to show from dropdown
        await customAssert('Select Show department view in view dropdown', async () => {
            await page.waitForSelector(pageobject.viewtolinkdropdown);
            await page.click(pageobject.viewtolinkdropdown);
            // Click to select show department option in the dropdown
            await page.click(pageobject.view2showEmployee);
        });
        // add lable for link
        await page.waitForSelector(pageobject.lebelforfield);
        await functions.fill_Text(pageobject.lebelforfield, 'Managed by');
        await page.waitForTimeout(5000);
        // click on next button
        await page.click(pageobject.nextoption);
        await functions.views()
        // click to List employee view link again
        await page.click(pageobject.DepartmentListlink);
        // check that show link is visible and working for an employee
        await customAssert('Assert show Employee link is visible and working for first employee', async () => {
            // Click on show department link
            await page.click(pageobject.showEmployeelink);
        });
        await customAssert('Assert show employee for id = 1', async () => {
            expect(page.url()).toBe(baseURL + derivedURL + 'view/Show_Employee?id=1');
        });
        // Navigate back to the previous page
        await page.goBack();
        // check that show link is visible and working for another employee
        await customAssert('Assert show employee link is visible and working for second employee', async () => {
            // Click on show department link
            await page.click(pageobject.showEmployeelink2);
        });
        await customAssert('Assert show employee for id = 2', async () => {
            expect(page.url()).toBe(baseURL + derivedURL + 'view/Show_Employee?id=2');
        });
    });
});