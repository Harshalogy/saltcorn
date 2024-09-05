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

    // Setup before all tests
    test.beforeAll(async ({ browser }) => {
        // Initialize the logger
        Logger.initialize();

        // Create a new browser context and page
        context = await browser.newContext({ ignoreHTTPSErrors: true });
        page = await context.newPage();

        // Maximize viewport
        await page.setViewportSize({ width: 1350, height: 720 });

        // Initialize page functions and locators
        functions = new PageFunctions(page);
        pageobject = new PageObject(page);

        // Navigate to base URL and perform login
        await functions.navigate_To_Base_URL(baseURL, derivedURL);
        await functions.login('myproject19july@mailinator.com', 'myproject19july');
        await functions.submit();
    });

    // Teardown after all tests
    test.afterAll(async () => {
        // Close page and context
        await page.close();
        await context.close();
    });

    // Assert the presence of "Event" section
    test('Verify Event Setting and check "Tab" section', async () => {
        // Clear existing data and navigate to settings
        await functions.clear_Data();
        await functions.SALTCORN();
        await functions.navigate_To_Settings();
        await functions.navigate_To_Events();

        // Assert the presence and URL
        await customAssert('Events label should be visible', async () => {
            await expect(page.locator(pageobject.Events)).toHaveText('Events');
        });
        await customAssert('Page URL should be /actions', async () => {
            expect(page.url()).toBe(`${baseURL}${derivedURL}actions`);
        });
    });

    // Test for Triggers tab and its elements
    test('Verify Triggers tab and its elements', async () => {
        await functions.Events_to_Triggers();

        // Assert the presence of Triggers tab and URL
        await customAssert('Triggers tab label should be visible', async () => {
            await expect(page.locator(pageobject.trigerslocator)).toHaveText('Triggers');
        });
        await customAssert('Page URL should be /actions', async () => {
            expect(page.url()).toBe(`${baseURL}${derivedURL}actions`);
        });

        // Assert trigger elements
        await customAssert('Triggers tab title should be visible', async () => {
            await expect(page.locator(pageobject.TriggerTitle)).toHaveText('Triggers');
        });
        await customAssert('Actions Available cell should be visible', async () => {
            await expect(page.locator(pageobject.actionsAvailable)).toHaveText('Actions available');
        });
        await customAssert('Event Types cell should be visible', async () => {
            await expect(page.locator(pageobject.eventTypesCell)).toHaveText('Event types');
        });
        await customAssert('Create Trigger Button should be visible and clickable', async () => {
            await expect(page.locator(pageobject.CreateTriggerBtn)).toHaveText('Create trigger');
            await page.click(pageobject.CreateTriggerBtn);
        });
        await customAssert('Page URL should be /actions/new', async () => {
            expect(page.url()).toBe(`${baseURL}${derivedURL}actions/new`);
        });

        // Assert new trigger form elements
        await customAssert('New Trigger tab title should be visible', async () => {
            await expect(page.locator(pageobject.newtriggertitle)).toHaveText('New trigger');
        });
        await customAssert('Input name for trigger should be empty', async () => {
            await expect(page.locator(pageobject.InputName)).toHaveValue('');
        });
        await customAssert('When dropdown should have Insert value', async () => {
            await expect(page.locator(pageobject.whentrigger)).toHaveValue('Insert');
        });
        await customAssert('Table dropdown should have value 1', async () => {
            await expect(page.locator(pageobject.inputtableid).nth(0)).toHaveValue('1');
        });
        await customAssert('Action dropdown should have value blocks', async () => {
            await expect(page.locator(pageobject.inputaction).nth(0)).toHaveValue('blocks');
        });
        await customAssert('Description textbox should be empty', async () => {
            await expect(page.locator(pageobject.discriptiontext)).toHaveValue('');
        });
        await customAssert('Save button should be visible and clickable', async () => {
            await expect(page.locator(pageobject.saveactionbutton)).toHaveText('Save');
        });
    });


    // Test for Custom tab and its elements
    test('Verify Custom tab and its elements', async () => {
        await functions.Events_to_Custom();

        // Assert the presence of Custom tab and URL
        await customAssert('Custom tab label should be visible', async () => {
            await expect(page.locator(pageobject.Customlocator)).toHaveText('Custom');
        });
        await customAssert('Page URL should be /eventlog/custom', async () => {
            expect(page.url()).toBe(`${baseURL}${derivedURL}eventlog${derivedURL}custom`);
        });

        // Assert create custom event button and form elements
        await customAssert('Create custom Event button should be visible and clickable', async () => {
            await expect(page.locator(pageobject.CreateEventbtn)).toHaveText('Create custom event');
            await page.click(pageobject.CreateEventbtn);
        });
        await customAssert('Page URL should be /eventlog/custom/new', async () => {
            expect(page.url()).toBe(`${baseURL}${derivedURL}eventlog${derivedURL}custom/new`);
        });
        await customAssert('Input name for Event should be empty', async () => {
            await expect(page.locator(pageobject.InputName)).toHaveValue('');
        });
        await customAssert('Has channel checkbox should not be checked', async () => {
            await expect(page.locator(pageobject.chanelcheckbox)).not.toBeChecked();
        });
        await customAssert('Save button for Custom Event should be visible and clickable', async () => {
            await expect(page.locator(pageobject.saveactionbutton)).toHaveText('Save');
        });
    });

    // Test for Log settings tab and its elements
    test('Verify Log setting tab and its elements', async () => {
        await functions.Events_to_Log_settings();

        // Assert the presence of Log settings tab and URL
        await customAssert('Log settings tab label should be visible', async () => {
            await expect(page.locator(pageobject.logsettinglocator)).toHaveText('Settings');
        });
        await customAssert('Page URL should be /eventlog/settings', async () => {
            expect(page.url()).toBe(`${baseURL}${derivedURL}eventlog${derivedURL}settings`);
        });

        // Assert log settings elements
        await customAssert('Event settings header should be visible', async () => {
            await expect(page.locator(pageobject.eventsSettingsheader)).toHaveText('Events and Trigger settings');
        });
        await customAssert('Periodic timing header should be visible', async () => {
            await expect(page.locator(pageobject.periodicTimingHeader)).toHaveText('Periodic trigger timing (next event)');
        });
        await customAssert('Next Hourly Event Input should have null value', async () => {
            await expect(page.locator(pageobject.nextHourlyEventInput)).toHaveValue('null');
        });
        await customAssert('Next Daily Event Input should have null value', async () => {
            await expect(page.locator(pageobject.nextDailyEventInput)).toHaveValue('null');
        });
        await customAssert('Next Weekly Event Input should have null value', async () => {
            await expect(page.locator(pageobject.nextWeeklyEventInput)).toHaveValue('null');
        });
        await customAssert('Which events should be logged header should be visible', async () => {
            await expect(page.locator(pageobject.whichEventsShouldBeLogged)).toHaveText('Which events should be logged?');
        });

        // Assert checkboxes for events
        await customAssert('Insert Checkbox should not be checked', async () => {
            await expect(page.locator(pageobject.insertCheckbox)).not.toBeChecked();
        });
        await customAssert('Update Checkbox should not be checked', async () => {
            await expect(page.locator(pageobject.updateCheckbox)).not.toBeChecked();
        });
        await customAssert('Validate Checkbox should not be checked', async () => {
            await expect(page.locator(pageobject.validateCheckbox)).not.toBeChecked();
        });
        await customAssert('Delete Checkbox should not be checked', async () => {
            await expect(page.locator(pageobject.deleteCheckbox)).not.toBeChecked();
        });
        await customAssert('Weekly Checkbox should not be checked', async () => {
            await expect(page.locator(pageobject.weeklyCheckbox)).not.toBeChecked();
        });
        await customAssert('Daily Checkbox should not be checked', async () => {
            await expect(page.locator(pageobject.dailyCheckbox)).not.toBeChecked();
        });
        await customAssert('Hourly Checkbox should not be checked', async () => {
            await expect(page.locator(pageobject.hourlyCheckbox)).not.toBeChecked();
        });
        await customAssert('Often Checkbox should not be checked', async () => {
            await expect(page.locator(pageobject.oftenCheckbox)).not.toBeChecked();
        });
        await customAssert('API Call Checkbox should not be checked', async () => {
            await expect(page.locator(pageobject.apiCallCheckbox)).not.toBeChecked();;
        });
        await customAssert('Never Checkbox should not be checked', async () => {
            await expect(page.locator(pageobject.neverCheckbox)).not.toBeChecked();;
        });
        await customAssert('PageLoad Checkbox should not be checked', async () => {
            await expect(page.locator(pageobject.pageLoadCheckbox)).not.toBeChecked();;
        });
        await customAssert('Login Checkbox should not be checked', async () => {
            await expect(page.locator(pageobject.loginCheckbox)).not.toBeChecked();;
        });
        await customAssert('LoginFailed Checkbox should not be checked', async () => {
            await expect(page.locator(pageobject.loginFailedCheckbox)).not.toBeChecked();;
        });
        await customAssert('The Error Checkbox should not be checked', async () => {
            await expect(page.locator(pageobject.errorCheckbox)).not.toBeChecked();;
        });
        await customAssert('Startup Checkbox should not be checked', async () => {
            await expect(page.locator(pageobject.startupCheckbox)).not.toBeChecked();;
        });
        await customAssert('UserVerified Checkbox should not be checked', async () => {
            await expect(page.locator(pageobject.userVerifiedCheckbox)).not.toBeChecked();;
        });
    });

    // Test for Event log tab and its elements
    test('Verify Event log tab ant its elements', async () => {
        await functions.Events_to_Event_log();

        // Assert the presence of Event Log tab and URL
        await customAssert('Event log tab should be visible', async () => {
            await expect(page.locator(pageobject.Eventloglocator)).toHaveText('Event log');
        });
        await customAssert('page url should be /eventlog', async () => {
            expect(page.url()).toBe(baseURL + derivedURL + 'eventlog');
        });

        // Assert the 'event Log' header for event
        await customAssert('Event Log header should be visible', async () => {
            await expect(page.locator(pageobject.eventLogHeading)).toHaveText('Event log');
        });
        // Assert the 'when' header for event
        await customAssert('When Header should be visible', async () => {
            await expect(page.locator(pageobject.whenHeader)).toHaveText('When');
        });
        // Assert the 'type' header for event
        await customAssert('Type Header should be visible', async () => {
            await expect(page.locator(pageobject.typeHeader)).toHaveText('Type');
        });
        // Assert the 'channel' header for event
        await customAssert('Channel Header should be visible', async () => {
            await expect(page.locator(pageobject.channelHeader)).toHaveText('Channel');
        });
    });
});