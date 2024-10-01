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

    // Add Aggregation to field on People list view
    test('Add Aggregation to field on People list view', async () => {
        await functions.views();
        await page.click(pageobject.configurePeopleList);
        await page.waitForTimeout(5000);
        // Click on add column button
        await page.click(pageobject.addcolumnbutton);
        await customAssert('Drag and drop Aggregation field on page', async () => {
            await functions.drag_And_Drop(pageobject.aggregationDiv, pageobject.newcolumn4);
        });
        // await page.click(pageobject.RelationDropdown);
        await customAssert('Select Task.assigned_to in relation dropdown', async () => {
            await page.selectOption(pageobject.RelationDropdown, { label: 'Task.assigned_to' });
        });
        await customAssert('Select id field in on field dropdown', async () => {
            const Childtablefield = await page.locator('select.form-control.form-select').nth(1);
            await Childtablefield.selectOption({ value: 'id' });
        });
        await customAssert('Select Count in static dropdown', async () => {
            const StatisticDropdown = await page.locator('select.form-control.form-select').nth(2);
            await StatisticDropdown.selectOption({ value: 'Count' });
        });
        await page.waitForTimeout(2000);
        await page.click(pageobject.nextoption);

        await functions.views();
        await page.click(pageobject.PeopleList);
        // await customAssert('count Task field should be visible on people list', async () => {
        //     await expect(page.locator(pageobject.countTaskLocator)).toBeVisible();
        // });
    });

    // Add Estimated hours field on Task table
    test('Add Estimated hours field on Task table', async () => {
        // click table button
        await functions.click_table();
        // Go to task table
        await page.click(pageobject.Tasktable);
        // click on add field button
        await page.click(pageobject.addFieldButtonLocator);
        // Fill the lable name
        await functions.fill_Text(pageobject.labelTextboxlocator, 'Estimated Hours');
        await customAssert('Select type key to employee ', async () => {
            const type1 = await page.$("#inputtype");
            await type1?.selectOption("Integer");
        });
        // Click on next button
        await functions.submit();
        await functions.fill_Text(pageobject.minInputLocator, '0');
        // Click on next button
        await functions.submit();
        await page.click(pageobject.EditlinkLocator);
        await customAssert('Input Estimated hours for every task ', async () => {
        await page.click(pageobject.estimatedHourscell);
        await page.keyboard.type('2');

        await page.click(pageobject.estimatedHourscell2);
        await page.keyboard.type('1');
        await page.waitForTimeout(1000);

        await page.click(pageobject.estimatedHourscell3);
        await page.keyboard.type('3');
        await page.waitForTimeout(2000);
        await functions.click_table();
        });
    });

    // Add Estimated hours on aggregation on people list
    test('Add Estimated hours on aggregation on people list', async () => {
        await functions.views();
        await page.click(pageobject.configurePeopleList);
        await page.waitForTimeout(5000);
        await page.click(pageobject.addcolumnbutton);
        await customAssert('Drag and drop Aggregation field on page', async () => {
            await functions.drag_And_Drop(pageobject.aggregationDiv, pageobject.newcolumn5);
        });
        await customAssert('Select id field in on field dropdown', async () => {
            const Childtablefield = await page.locator('select.form-control.form-select').nth(1);
            await Childtablefield.selectOption({ value: 'estimated_hours' });
        });
        await customAssert('Select Sum in static dropdown', async () => {
            const StatisticDropdown = await page.locator('select.form-control.form-select').nth(2);
            await StatisticDropdown.selectOption({ value: 'Sum' });
        });
        await page.waitForTimeout(5000);
        await page.click(pageobject.nextoption);
        await functions.views();
        await page.click(pageobject.PeopleList);
        await customAssert('Sum Task field should be visible on people list', async () => {
            await expect(page.locator(pageobject.SumTaskLocator)).toBeVisible();
        });
    });

    // Add Array_agg on aggregation on people list
    test('Add Array_agg on aggregation on people list', async () => {
        await functions.views();
        await page.click(pageobject.configurePeopleList);
        await page.waitForTimeout(5000);
        await page.click(pageobject.addcolumnbutton);
        await customAssert('Drag and drop Aggregation field on page', async () => {
            await functions.drag_And_Drop(pageobject.aggregationDiv, pageobject.newcolumn6);
        });
        await customAssert('Select name field in on field dropdown', async () => {
            const Childtablefield = await page.locator('select.form-control.form-select').nth(1);
            await Childtablefield.selectOption({ value: 'name' });
        });
        await customAssert('Select Array_Agg in static dropdown', async () => {
            const StatisticDropdown = await page.locator('select.form-control.form-select').nth(2);
            await StatisticDropdown.selectOption({ value: 'Array_Agg' });
        });
        await page.waitForTimeout(5000);
        await page.click(pageobject.nextoption);
        await functions.views();
        await page.click(pageobject.PeopleList);
        await customAssert('Sum Task field should be visible on people list', async () => {
            await expect(page.locator(pageobject.Array_AggLocator)).toBeVisible();
            await expect(page.getByText('Buy Milk')).toBeVisible();    
        });
    });

    // Add aggregation on people show view
    test('Add aggregation on people show view', async () => {
        await functions.views();
        await page.click(pageobject.configureShowPeople);
        await page.waitForTimeout(5000);
        await page.click(pageobject.editIconLocator);
        await page.click(pageobject.deletebutton);
        await page.click(pageobject.target);
        await page.click(pageobject.deletebutton);
        await functions.drag_And_Drop(pageobject.columnsElement, pageobject.target);
        await functions.fill_Text(pageobject.numbercolumn, '2');
        await functions.drag_And_Drop(pageobject.textSource, pageobject.secondrowcolumn1);
        await functions.clearText(pageobject.richTextEditor);
        await functions.fill_Text(pageobject.richTextEditor, 'team');
        await functions.drag_And_Drop(pageobject.joinField, pageobject.secondrowcolumn);
        await customAssert('Select Name from teams for join field', async () => {
            await page.click(pageobject.fieldsButton);
            await page.click(pageobject.teamDropdownLocator);
            await page.click(pageobject.teamnameitem);
        });
        await functions.drag_And_Drop(pageobject.columnsElement, pageobject.target);
        await functions.fill_Text(pageobject.numbercolumn, '2');
        await functions.drag_And_Drop(pageobject.textSource, pageobject.secondrowcolumn1);
        await functions.clearText(pageobject.richTextEditor);
        await functions.fill_Text(pageobject.richTextEditor, 'Task Assigned');
        await functions.drag_And_Drop(pageobject.aggregationDiv, pageobject.secondrowcolumn);
        await customAssert('Select id field in on field dropdown', async () => {
            const Childtablefield = await page.locator('select.form-control.form-select').nth(1);
            await Childtablefield.selectOption({ value: 'id' });
        });
        await customAssert('Select Count in static dropdown', async () => {
            const StatisticDropdown = await page.locator('select.form-control.form-select').nth(2);
            await StatisticDropdown.selectOption({ value: 'Count' });
        });
        await page.waitForTimeout(5000);
    });

    // Add Array_agg on aggregation on people list
    test('Add Show person link on people list', async () => {
        await functions.views();
        await page.click(pageobject.configurePeopleList);
        await page.waitForTimeout(5000);
        await page.click(pageobject.addcolumnbutton);
        await customAssert('Drag and drop Aggregation field on page', async () => {
            await functions.drag_And_Drop(pageobject.viewlinksource, pageobject.newcolumn7);
        });
        await customAssert('Select show_people on view to link dropdown', async () => {
            await page.click(pageobject.viewtolinkdropdown);
            await page.click(pageobject.view2showpeople);
        });
        await functions.fill_Text(pageobject.lebelforfield, 'Show');
        await page.waitForTimeout(5000);
        await page.click(pageobject.nextoption);
        await functions.views();
        await page.click(pageobject.PeopleList);
        await page.click(pageobject.showfieldlink);
    });

    // Create show team view and add view in show people view
    test('Create show team view and add view in show people view', async () => {
        await functions.views();
        // click on create new view
        await page.click(pageobject.createnewview);
        // input view name and discription
        await page.fill(pageobject.InputName, 'Show_Team');
        await page.fill(pageobject.discriptiontext, 'Show for team');
        // select show pattern
        await customAssert('Select show view pattern for view', async () => {
            const ShowPattern = await page.$("#inputviewtemplate");
            await ShowPattern?.selectOption("Show");
        });
        // Select teams table in table dropdown
        await customAssert('Select teams table for view', async () => {
            await page.selectOption(pageobject.viewtabledropdown, { label: 'Teams' });
        });
        // submit the page
        await functions.submit();
        await page.waitForTimeout(5000);
        await functions.drag_And_Drop(pageobject.columnsElement, pageobject.target);
        await functions.fill_Text(pageobject.numbercolumn, '2');
        await functions.drag_And_Drop(pageobject.textSource, pageobject.secondrowcolumn1);
        await functions.clearText(pageobject.richTextEditor);
        await functions.fill_Text(pageobject.richTextEditor, 'ID');
        await functions.drag_And_Drop(pageobject.fieldsourrce, pageobject.secondrowcolumn);
        await page.waitForTimeout(5000);
        await page.click(pageobject.nextoption);
    });

    // // Create show team view and add view in show people view
    // test('Create show team view and add view in show people view', async () => {
    //     await functions.views();
    //     await page.click(pageobject.configureShowPeople);
    //     await page.waitForTimeout(5000);
    //     await functions.drag_And_Drop(pageobject.fieldsourrce, pageobject.target);
    // });
});