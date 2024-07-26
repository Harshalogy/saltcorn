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

  test.beforeAll(async ({ browser }) => {
    // Create a new context and page for all tests
    context = await browser.newContext();
    page = await context.newPage();
    
    // Initialize page functions and navigate to base URL
    functions = new PageFunctions(page);
    await functions.navigateToBaseURL(baseURL, derivedURL);
    
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
    await functions.navigateToBaseURL(baseURL, derivedURL);
  });

  test('Create a new page with random string', async () => {
    // Generate a random string
    const randomString = PageFunctions.generateRandomString(10);
    
    await functions.createNewPage('My_project_' + randomString);
    await functions.dragAndDrop(pageobject.textSource, pageobject.target);
    await functions.fillText(pageobject.textlocator, 'Testing');

    // Check Text settings
    await expect(page.getByText('Text settings')).toBeVisible();
    await expect(page.getByText('Text to display')).toBeVisible();
  });

  test('Check buttons visibility and text', async () => {
    // Generate a random string
    const randomString = PageFunctions.generateRandomString(10);
    
    await functions.createNewPage('My_project_' + randomString);
    await functions.dragAndDrop(pageobject.textSource, pageobject.target);
    await functions.fillText(pageobject.textlocator, 'Testing');

    // Check delete button
    const deleteButton = await page.locator(pageobject.deletebutton);
    await expect(deleteButton).toBeVisible();

    // Check clone button
    const cloneButton = await page.locator(pageobject.clonebutton);
    await expect(cloneButton).toBeVisible();
  });

  test('Check text and HTML box content', async () => {
    // Generate a random string
    const randomString = PageFunctions.generateRandomString(10);
    
    await functions.createNewPage('My_project_' + randomString);
    await functions.dragAndDrop(pageobject.textSource, pageobject.target);
    await functions.fillText(pageobject.textlocator, 'Testing');

    const heloworld = page.locator(pageobject.textlocator);
    await expect(heloworld).toHaveText('Testing');

    await functions.dragAndDrop(pageobject.htmlCodeSource, pageobject.target);
    await functions.fillText(pageobject.htmltextlocator, '<h3>Hello Sumit</h3>');

    const htmlbox = page.locator(pageobject.htmltextlocator);
    await expect(htmlbox).toBeVisible();
  });

  test('Check image, card and link settings', async () => {
    // Generate a random string
    const randomString = PageFunctions.generateRandomString(10);
    
    await functions.createNewPage('My_project_' + randomString);

    // Image settings
    await functions.dragAndDrop(pageobject.imageSource, pageobject.target);
    await expect(page.getByText('Image settings')).toBeVisible();

    // Card settings
    await functions.dragAndDrop(pageobject.cardSource, pageobject.target);
    await functions.fillText(pageobject.cardtextlocator, 'Master Visa Debit Card');
    const cardTitle = page.locator(pageobject.cardtextlocator);
    await expect(cardTitle).toHaveValue('Master Visa Debit Card');
    const urlField = page.locator(pageobject.CardUrl);
    await expect(urlField).toHaveValue('');

    // Link settings
    await functions.dragAndDrop(pageobject.linkSource, pageobject.target);
    await functions.fillText(pageobject.linklocator, 'youtube link');
    const Linktext = page.locator(pageobject.linklocator);
    await expect(Linktext).toHaveValue('youtube link');
    await functions.fillText(pageobject.linkurllocator, 'https://www.youtube.com/@saltcorn');
    const Linkurl = page.locator(pageobject.linkurllocator);
    await expect(Linkurl).toHaveValue('https://www.youtube.com/@saltcorn');
  });

  test('Check search and container settings', async () => {
    // Generate a random string
    const randomString = PageFunctions.generateRandomString(10);
    
    await functions.createNewPage('My_project_' + randomString);

    // Search settings
    await functions.dragAndDrop(pageobject.SearchLocator, pageobject.target);
    const hasDropdownCheckbox = await page.locator(pageobject.hasdropdowncheckbox);
    await expect(hasDropdownCheckbox).not.toBeChecked();
    const showStateBadgesCheckbox = await page.locator(pageobject.statebadgecheckbox);
    await expect(showStateBadgesCheckbox).not.toBeChecked();
    const autofocusCheckbox = await page.locator(pageobject.Autofocuscheckbox);
    await expect(autofocusCheckbox).not.toBeChecked();

    // Container settings
    await functions.dragAndDrop(pageobject.containsdraglocator, pageobject.target);
    await expect(page.getByText('Container settings')).toBeVisible();
    const displaySection = await page.locator(pageobject.containerdisplaysetting);
    await expect(displaySection).toBeVisible();
    const contentsSection = await page.locator(pageobject.containercontentsetting);
    await expect(contentsSection).toBeVisible();
    const flexPropertiesSection = await page.locator(pageobject.containerflexsetting);
    await expect(flexPropertiesSection).toBeVisible();
    const containerLinkSection = await page.locator(pageobject.containercontentlink);
    await expect(containerLinkSection).toBeVisible();
    const customClassCSSSection = await page.locator(pageobject.containercustomclass);
    await expect(customClassCSSSection).toBeVisible();
  });

  test('Check action settings', async () => {
    // Generate a random string
    const randomString = PageFunctions.generateRandomString(10);
    
    await functions.createNewPage('My_project_' + randomString);

    // Action settings
    await functions.dragAndDrop(pageobject.ActionLocator, pageobject.target);
    await expect(page.getByText('Action settings')).toBeVisible();
    const actionDropdown = await page.locator(pageobject.ActionDropdown);
    await expect(actionDropdown).toBeVisible();
    await expect(actionDropdown).toHaveValue('GoBack');
    const labelInput = await page.locator(pageobject.ActionLabel);
    await expect(labelInput).toBeVisible();
    await expect(labelInput).toHaveValue('');
    const styleDropdown = await page.locator(pageobject.ActionStyledropdown);
    await expect(styleDropdown).toBeVisible();
    await expect(styleDropdown).toHaveValue('btn-primary');
    const sizeDropdown = await page.locator(pageobject.Actionsizedropdown);
    await expect(sizeDropdown).toBeVisible();
    await expect(sizeDropdown).toHaveValue('');
    const hoverTitleInput = await page.locator(pageobject.ActionHoverTitle);
    await expect(hoverTitleInput).toBeVisible();
    await expect(hoverTitleInput).toHaveValue('');

  });

  test('Create a new page with random string and navigate to new site URL', async ({ browser }) => {

    // Generate a random string
    const randomString = PageFunctions.generateRandomString(10);

    // Create a new page with the random string appended to the project name
    await functions.createNewPage('My_project_' + randomString);
    await functions.dragAndDrop(pageobject.textSource, pageobject.target);

    // Save project
    await functions.SavePageProject();

    // Construct the URL
    const url = baseURL +`/page/My_project_${randomString}`;

    // Navigate to the constructed URL in the same page
    await page.goto(url);

    // Assert that the page is not blank
    const bodyContent = await page.content();
    expect(bodyContent.trim()).not.toBe('');

    // Optionally, check the URL of the current page
    expect(page.url()).toBe(baseURL + derivedURL + 'page/' + 'My_project_' + randomString);

    // wait for a specific condition or timeout
    await page.waitForTimeout(5000); // Wait for 5 seconds 
  });

  test('Navigate to setting page and clear all changes', async () => {
    functions = new PageFunctions(page);
     // Wait for any potential UI stabilization or asynchronous actions
     await page.waitForTimeout(10000);
    
     // Perform navigation and clear all operations
     await functions.navigateToSettings();
     await functions.navigateToaboutapplication();
     await functions.aboutapplicationtosystem();
     await functions.clearAll();
 
     // Verify toaster message that clear all deleted all the changes
     await functions.waitForToasterMessage();
     const title = functions.getToasterMessageLocator();
    await expect(title).toHaveText(pageobject.expectedtoastermsg);
  });
});
