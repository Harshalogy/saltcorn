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
    test('install saltcorn store', async () => {
        await functions.Saltcorn_Store();
        await customAssert('Packs navigation link should be visible and contain text', async () => {
            const packsLink = page.locator(pageobject.packlink);
            await expect(packsLink).toBeVisible();
            await expect(packsLink).toHaveText('Packs');
        });

        await customAssert('Plugins navigation link should be visible and contain text', async () => {
            const pluginsLink = page.locator(pageobject.pluginslink);
            await expect(pluginsLink).toBeVisible();
            await expect(pluginsLink).toHaveText('Plugins');
        });
        await page.locator(pageobject.extensions).first().click();

        await customAssert('Fields should be visible and contain correct text', async () => {
            const fieldsHeader = page.locator(pageobject.tableField);
            await expect(fieldsHeader).toBeVisible();
            await expect(fieldsHeader).toHaveText('Fields'); // Ensure text matches
        });

        await customAssert('Description should be visible and contain correct text', async () => {
            const descriptionCell = page.locator(pageobject.descriptionLabel).first();
            await expect(descriptionCell).toBeVisible();
            await expect(descriptionCell).toHaveText('Description');
        });

        await customAssert('String should be visible and contain correct text', async () => {
            const stringCell = page.locator(pageobject.stringType).nth(1);
            await expect(stringCell).toBeVisible(); // Check visibility
            await expect(stringCell).toHaveText('String'); // Check exact text
        });

    });

    test('Add Field', async () => {
        // Add a new field
        await page.waitForSelector(pageobject.addFieldButtonLocator);
        await page.click(pageobject.addFieldButtonLocator);

        // Fill field details
        await functions.fill_Text(pageobject.labelTextboxlocator, 'Full name');
        const type = await page.$(pageobject.inputType);
        if (!type) throw new Error('Input type selector not found');
        await type.selectOption("JSON");
        await functions.fill_Text(pageobject.descriptionSelector, 'Full Name of User');
        await page.check(pageobject.RequiredcheckboxLocator);

        // Complete field creation
        await functions.submit(); // Next
        await functions.submit(); // Next
        await functions.submit(); // Finish

    });

    test('Add Pack', async () => {
        const PackLink = page.locator(pageobject.packlink);
        await PackLink.click();
        await customAssert('Page URL should be view/Packs', async () => {
            expect(page.url()).toBe(baseURL + derivedURL + 'view/Packs');
        });
        await customAssert('Click on Add pack link', async () => {
            const addPackLink = page.locator(pageobject.addPackLink);
            await expect(addPackLink).toBeVisible();
            await addPackLink.click();
        });
        await customAssert('Filling the Name input field', async () => {
            const nameInput = page.locator(pageobject.input_inputname);
            await expect(nameInput).toBeVisible();
            await nameInput.fill('Test Name');
        });
        await customAssert('Filling the Pack textarea', async () => {
            const packTextarea = page.locator(pageobject.textarea_inputpack);
            await expect(packTextarea).toBeVisible();
            await packTextarea.fill('Sample Pack Description');
        });

        await customAssert('Filling the Description input field', async () => {
            const descriptionInput = page.locator(pageobject.input_inputdescription);
            await expect(descriptionInput).toBeVisible();
            await descriptionInput.fill('Test Description');
        });

        await customAssert('Save button should be visible and have correct text', async () => {
            const saveButton = page.locator(pageobject.savebutton);
            await expect(saveButton).toBeVisible();
            await expect(saveButton).toHaveText('Save');
            await saveButton.click();
        });
        await customAssert('Check visibility and locator for cell containing text "Test Name"', async () => {
            const nameCell = page.locator(pageobject.nameCell).filter({ hasText: "Test Name" });
            await expect(nameCell).toBeVisible();
            await expect(nameCell).toHaveText('Test Name');
        });

        await page.goto(baseURL + derivedURL + 'viewedit/config/Packs');
        // click on add column button on page
        await page.waitForTimeout(3000);
        await page.waitForSelector(pageobject.addcolumnbutton);
        await page.click(pageobject.addcolumnbutton);
        // drag and drop the action locator
        await page.waitForSelector(pageobject.fieldsource);
        await functions.drag_And_Drop(pageobject.fieldsource, pageobject.newcolumn);
        // Locate the <select> element and select the "ID" option
        await page.locator(pageobject.selectId).selectOption('id');
        await page.click(pageobject.nextoption);
        // click on next button
        await functions.submit();
        await functions.submit();
        await functions.submit();
        await PackLink.click();
        await customAssert('ID field should be value', async () => {
            const idLocator = page.locator(pageobject.idLink);
            await idLocator.waitFor({ state: 'visible' }); // Wait for the element to be visible
        });

    });

    test('Plugins to add extension', async () => {
        const pluginsLink = page.locator(pageobject.pluginslink);
        await pluginsLink.click();
        await customAssert('Page URL should be  view/Extensions', async () => {
            expect(page.url()).toBe(baseURL + derivedURL + 'view/Extensions');
        });
        await customAssert('Click on Add extension link', async () => {
            const addExtensionLink = page.locator(pageobject.addExtensionlink);
            await expect(addExtensionLink).toBeVisible();
            await addExtensionLink.click();
        });
        await customAssert('Page URL should be  view/editexts', async () => {
            expect(page.url()).toBe(baseURL + derivedURL + 'view/editexts');
        });
        await customAssert('Check visibility, text, and fill the "Name" input field', async () => {
            const nameLabel = page.locator(pageobject.inputName);
            await expect(nameLabel).toBeVisible();
            await expect(nameLabel).toHaveText('Name');
            const nameInput = page.locator(pageobject.input_inputname);
            await expect(nameInput).toBeVisible();
            await nameInput.fill('Test Name');
        });

        await customAssert('Check visibility, text, and fill the "Description" input field', async () => {
            const descriptionLabel = page.locator(pageobject.input_desclabel);
            await expect(descriptionLabel).toBeVisible();
            await expect(descriptionLabel).toHaveText('Description');
            const descriptionInput = page.locator(pageobject.input_inputdescription);
            await expect(descriptionInput).toBeVisible();
            await descriptionInput.fill('Test Description');
        });

        await customAssert('Check visibility and select an option for the "Source" dropdown', async () => {
            const sourceLabel = page.locator(pageobject.labelInputSource);
            await expect(sourceLabel).toBeVisible();
            await expect(sourceLabel).toHaveText('Source');
            const sourceDropdown = page.locator(pageobject.sourceInput);
            await expect(sourceDropdown).toBeVisible();
            await sourceDropdown.selectOption('npm');
            await expect(sourceDropdown).toHaveValue('npm');
        });

        await customAssert('Check visibility, text, and fill the "Location" input field', async () => {
            const locationLabel = page.locator(pageobject.inputLocation);
            await expect(locationLabel).toBeVisible();
            await expect(locationLabel).toHaveText('Location');
            const locationInput = page.locator(pageobject.input_inputlocation);
            await expect(locationInput).toBeVisible();
            await locationInput.fill('Test Location');
            await expect(locationInput).toHaveValue('Test Location');
        });
        await customAssert('Save button should be visible and have correct text', async () => {
            const saveButton = page.locator(pageobject.savebutton);
            await expect(saveButton).toBeVisible();
            await expect(saveButton).toHaveText('Save');
            await saveButton.click();
        });

        await customAssert('Check Row element visibility and text in table row', async () => {
            const tableRow = page.locator('tbody tr');
            await expect(tableRow).toBeVisible();
            await expect(tableRow.locator(pageobject.firstCell_Elem)).toHaveText('Test Name'); // First cell
            await expect(tableRow.locator(pageobject.secondCell_Elem)).toHaveText('npm');       // Second cell
            await expect(tableRow.locator(pageobject.thirdCell_Elem)).toHaveText('Test Location'); // Third cell
            await expect(tableRow.locator(pageobject.fourthCell_Elem)).toHaveAttribute('href', '/view/editexts?id=1'); // Fourth cell with link
            await expect(tableRow.locator(pageobject.fivthCell_Elem)).toHaveText('Test Description'); // Fifth cell
        });

        await page.goto(baseURL + derivedURL + 'viewedit/config/Extensions');
        // click on add column button on page
        await page.waitForTimeout(2000);
        await page.waitForSelector(pageobject.addcolumnbutton);
        await page.click(pageobject.addcolumnbutton);
        // drag and drop the action locator
        await page.waitForSelector(pageobject.fieldsource);
        await functions.drag_And_Drop(pageobject.fieldsource, pageobject.newcolumn);
        // Locate the <select> element and select the "ID" option
        await page.locator(pageobject.selectId).selectOption('id');

        await page.waitForSelector(pageobject.addcolumnbutton);
        await page.click(pageobject.addcolumnbutton);
        // drag and drop the action locator
        await page.waitForSelector(pageobject.fieldsource);
        await functions.drag_And_Drop(pageobject.fieldsource, pageobject.newcolumn);
        await page.locator(pageobject.selectId).selectOption('downloads');
        await page.click(pageobject.nextoption);
        // click on next button
        await functions.submit();
        await functions.submit();
        await functions.submit();
        await pluginsLink.click();
        await customAssert('ID field should be value', async () => {
            const idLocator = page.locator(pageobject.idLink);
            await idLocator.waitFor({ state: 'visible' }); // Wait for the element to be visible
        });
        await customAssert('Download field should be value', async () => {
            const idLocator = page.locator(pageobject.selectDownload);
            await idLocator.waitFor({ state: 'visible' }); // Wait for the element to be visible
        });
        await page.goto(baseURL + derivedURL + 'page/home');
        await customAssert('Page URL should be page/home', async () => {
            expect(page.url()).toBe(baseURL + derivedURL + 'page/home');
        });
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

        // validate the view pattern in table dropdown
        await customAssert('View Pattern should be list', async () => {
            // select list pattern
            const ListPattern = await page.$(pageobject.viewpatterndropdown);
            await ListPattern?.selectOption("List");
        });

        // Validate and select the 'extensions' option in the table dropdown
        await customAssert('Table Name should be "extensions"', async () => {
            // Select the 'extensions' option in the dropdown
            await page.locator(pageobject.viewtabledropdown).selectOption({ value: 'extensions' });
            // Validate that the selected option is 'extensions'
            const selectedOption = await page.locator(pageobject.inputOptionCheck).innerText();
            expect(selectedOption.trim()).toBe('extensions');
            // Optional: Log the selected text for debugging
            const tableText = await page.locator(pageobject.viewtabledropdown).innerText();
            console.log(`Text in locator '#inputtable_name': ${tableText}`);
        });
        // submit the page
        await functions.submit();
        await page.waitForTimeout(2000);
        await page.waitForSelector(pageobject.nextoption);
        await page.click(pageobject.nextoption);
        // click on next button
        await functions.submit();
        await functions.submit();
        await functions.submit();
        await page.goto(baseURL + derivedURL + 'view/NewView_List');
        await customAssert('page url should be view/NewView_List ', async () => {
            expect(page.url()).toBe(baseURL + derivedURL + 'view/NewView_List');
        });
         // Navigate settings tabs and clear dropdown settings
        await page.goto(baseURL + derivedURL + pageobject.admin_Clear_All);
        await functions.navi_Setting_Dropdown_Clear();
    });

});