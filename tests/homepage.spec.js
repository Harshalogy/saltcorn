const { test, expect } = require('@playwright/test');
const { baseURL, derivedURL } = require('../pageobject/base_url.js');
const PageFunctions = require('../pageobject/function.js');
const PageObject = require('../pageobject/locators.js');
const customAssert = require('../pageobject/utils');
const Logger = require('../pageobject/logger');

let storageState = 'storageState.json';

test.describe('E2E Test Suite', () => {
  let functions;
  let pageobject;
  let context;
  let page;

  test.beforeAll(async ({ browser }) => {
    // Initialize the log file
    Logger.initialize();
    // Create a new context and page for all tests
    context = await browser.newContext();
    page = await context.newPage();

    // Maximize the screen
    await page.setViewportSize({ width: 1350, height: 1080 });

    // Initialize page functions and navigate to base URL
    functions = new PageFunctions(page);
    await functions.navigate_To_Base_URL(baseURL, derivedURL);

    // Perform login
    await functions.login('myproject19july@mailinator.com', 'myproject19july');
    await functions.submit();

    // Save logged-in state
    await context.storageState({ path: storageState });
  });

  test.beforeEach(async ({ browser }) => {
    // Reuse the existing context with saved storage state
    context = await browser.newContext({ storageState });

    // Initialize page functions and page object
    functions = new PageFunctions(page);
    pageobject = new PageObject(page);
  });

  test('Create a new page with random string', async () => {
    // Generate a random string
    const randomString = PageFunctions.generate_Random_String(10);
    // create a new page
    await functions.create_New_Page('My_project_' + randomString);
    // drag and drop the text source
    await functions.drag_And_Drop(pageobject.textSource, pageobject.target);
    await functions.fill_Text(pageobject.textlocator, 'Testing');

    // Check Text settings
    await customAssert('Text settings should be visible', async () => {
      await expect(page.getByText('Text settings')).toBeVisible();
    });
    await customAssert('Text to display should be visible', async () => {
      await expect(page.getByText('Text to display')).toBeVisible();
    });
  });

  // check buttons visibility
  test('Check buttons visibility and text', async () => {
    //await functions.drag_And_Drop(pageobject.textSource, pageobject.target);
    await functions.fill_Text(pageobject.textlocator, 'Testing');

    // Check delete button
    await customAssert('delete button should be visible', async () => {
      const deleteButton = await page.locator(pageobject.deletebutton);
      await expect(deleteButton).toBeVisible();
    });

    // Check clone button
    await customAssert('clone button should be visible', async () => {
      const cloneButton = await page.locator(pageobject.clonebutton);
      await expect(cloneButton).toBeVisible();
    });
  });

  // Check text and HTML box content
  test('Check text and HTML box content', async () => {
    await customAssert('hello world should have text texting', async () => {
      const heloworld = page.locator(pageobject.textlocator);
      await expect(heloworld).toHaveText('Testing');
    });
    // drag and drop the html code source
    await functions.drag_And_Drop(pageobject.htmlCodeSource, pageobject.target);
    await functions.fill_Text(pageobject.htmltextlocator, '<h3>Hello Sumit</h3>');

    // validate that html code source is visible
    await customAssert('HTML box should be visible', async () => {
      const htmlbox = page.locator(pageobject.htmltextlocator);
      await expect(htmlbox).toBeVisible();
    });
  });

  //Check image setting
  test('Check image settings', async () => {
    // drag and drop the image source
    await functions.drag_And_Drop(pageobject.imageSource, pageobject.target);
    await customAssert('image settings should be visible', async () => {
      await expect(page.getByText('Image settings')).toBeVisible();
    });
  });

  //Check card setting
  test('Check card settings', async () => {
    // drag and drop the card source
    await functions.drag_And_Drop(pageobject.cardSource, pageobject.target);
    await functions.fill_Text(pageobject.cardtextlocator, 'Master Visa Debit Card');
    const cardTitle = page.locator(pageobject.cardtextlocator);

    //validate that card title should be master visa debit card
    await customAssert('Card title should be Master Visa Debit Card', async () => {
      await expect(cardTitle).toHaveValue('Master Visa Debit Card');
      const urlField = page.locator(pageobject.CardUrl);
      await expect(urlField).toHaveValue('');
    });
  });

  // Check link setting
  test('Check link settings', async () => {
    // drag and drop the link source
    await functions.drag_And_Drop(pageobject.linkSource, pageobject.target);
    await functions.fill_Text(pageobject.linklocator, 'youtube link');
    await customAssert('Link Text should be youtube link', async () => {
      const Linktext = page.locator(pageobject.linklocator);
      await expect(Linktext).toHaveValue('youtube link');
    });

    // input the youtube url and visit the link
    await customAssert('Link url should be https://www.youtube.com/@saltcorn', async () => {
      await functions.fill_Text(pageobject.linkurllocator, 'https://www.youtube.com/@saltcorn');
      const Linkurl = page.locator(pageobject.linkurllocator);
      await expect(Linkurl).toHaveValue('https://www.youtube.com/@saltcorn');
    });
  });

  // Check search setting
  test('Check search settings', async () => {
    //drag and drop the Search Locator
    await functions.drag_And_Drop(pageobject.SearchLocator, pageobject.target);

    // validate that check box should be checked
    await customAssert('dropdown check box should be checked', async () => {
      const hasDropdownCheckbox = await page.locator(pageobject.hasdropdowncheckbox);
      await expect(hasDropdownCheckbox).not.toBeChecked();
    });

    // validate that check box should not be checked
    await customAssert('show state badge and auto focus check box should be checked', async () => {
      const showStateBadgesCheckbox = await page.locator(pageobject.statebadgecheckbox);
      await expect(showStateBadgesCheckbox).not.toBeChecked();
      const autofocusCheckbox = await page.locator(pageobject.Autofocuscheckbox);
      await expect(autofocusCheckbox).not.toBeChecked();
    });
  });

  //Check container settings
  test('Check container settings', async () => {
    //drag and drop the contains drag locator
    await functions.drag_And_Drop(pageobject.containsdraglocator, pageobject.target);
    await customAssert('container settings should be visible', async () => {
      await expect(page.getByText('Container settings')).toBeVisible();
    });

    // container display setting should be visible
    await customAssert('display settings should be visible', async () => {
      const displaySection = await page.locator(pageobject.containerdisplaysetting);
      await expect(displaySection).toBeVisible();
    });

    //container content setting should be visible
    await customAssert('content settings should be visible', async () => {
      const contentsSection = await page.locator(pageobject.containercontentsetting);
      await expect(contentsSection).toBeVisible();
    });

    // container flex setting should be visible
    await customAssert('container flex settings should be visible', async () => {
      const flexPropertiesSection = await page.locator(pageobject.containerflexsetting);
      await expect(flexPropertiesSection).toBeVisible();
    });

    // container content link should be visible
    await customAssert('container content should be visible', async () => {
      const containerLinkSection = await page.locator(pageobject.containercontentlink);
      await expect(containerLinkSection).toBeVisible();
    });

    // container custom class should be visible
    await customAssert('container content class should be visible', async () => {
      const customClassCSSSection = await page.locator(pageobject.containercustomclass);
      await expect(customClassCSSSection).toBeVisible();
    });
  });

  //Check action settings
  test('Check action settings', async () => {
    //drag and drop the action locator
    await functions.drag_And_Drop(pageobject.ActionLocator, pageobject.target);
    await customAssert('action settings should be visible', async () => {
      await expect(page.getByText('Action settings')).toBeVisible();
    });

    //Action Dropdown should be visible 
    await customAssert('action dropdown should be visible', async () => {
      const actionDropdown = await page.locator(pageobject.ActionDropdown);
      await expect(actionDropdown).toBeVisible();
      await expect(actionDropdown).toHaveValue('GoBack');
    });

    // Action Label should be visible 
    await customAssert('action label should be visible', async () => {
      const labelInput = await page.locator(pageobject.ActionLabel);
      await expect(labelInput).toBeVisible();
      await expect(labelInput).toHaveValue('');
    });

    // Action Style dropdown should be visible 
    await customAssert('action style dropdown should be visible', async () => {
      const styleDropdown = await page.locator(pageobject.ActionStyledropdown);
      await expect(styleDropdown).toBeVisible();
      await expect(styleDropdown).toHaveValue('btn-primary');
    });

    //Action size dropdown should be visible 
    await customAssert('action size dropdown should be visible', async () => {
      const sizeDropdown = await page.locator(pageobject.Actionsizedropdown);
      await expect(sizeDropdown).toBeVisible();
      await expect(sizeDropdown).toHaveValue('');
    });

    // Action Hover Title should be visible 
    await customAssert('action hover title should be visible', async () => {
      const hoverTitleInput = await page.locator(pageobject.ActionHoverTitle);
      await expect(hoverTitleInput).toBeVisible();
      await expect(hoverTitleInput).toHaveValue('');
    });

  });

  //Create a new page with random string and navigate to new site URL
  test('Create a new page with random string and navigate to new site URL', async ({ browser }) => {
    // Generate a random string
    const randomString = PageFunctions.generate_Random_String(10);

    // Create a new page with the random string appended to the project name
    await functions.create_New_Page('My_project_' + randomString);
    //drag and drop the page text
    await functions.drag_And_Drop(pageobject.textSource, pageobject.target);

    // Save project
    await functions.Save_Page_Project();

    // Construct the URL
    const url = baseURL + `/page/My_project_${randomString}`;

    // Navigate to the constructed URL in the same page
    await page.goto(url);

    // Assert that the page is not blank
    await customAssert('Page should not be blank', async () => {
      const bodyContent = await page.content();
      expect(bodyContent.trim()).not.toBe('');
    });

    // Optionally, check the URL of the current page
    await customAssert('Url for page should be same as page name', async () => {
      expect(page.url()).toBe(baseURL + derivedURL + 'page/' + 'My_project_' + randomString);
    });
  });

  // Check clear all function
  test('Navigate to setting page and clear all changes', async () => {
    functions = new PageFunctions(page);
    // Navigate to setting
    await functions.navigate_To_Settings();
    // navigate to about application
    await functions.navigate_To_about_application();
    // nevigate to system
    await functions.about_application_to_system();
    // clear all data
    await functions.clear_All();

    // Verify toaster message that clear all deleted all the changes
    await customAssert('toaster message for clear all should be visible with cleared content names', async () => {
      await functions.wait_For_Toaster_Message();
      const title = functions.get_Toaster_Message_Locator();
      //assert the toaster message
      await expect(title).toHaveText(pageobject.expectedtoastermsg);
    });
  });
});
