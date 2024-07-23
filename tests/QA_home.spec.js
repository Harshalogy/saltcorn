const { test, expect } = require('@playwright/test');
const PageObject = require('../pageobject/locators.js');
// Create an instance of the helper class
const url = 'https://e2etest.saltcorn.co/';
test('Creating new application', async ({ page }) => {
const pageObject = new PageObject(page);

const email = 'myproject19july@mailinator.com';
const password = 'myproject19july';

await page.goto(url);
// login using registered username and password
await pageObject.login(email, password);

//Create a new page from dashboard
await pageObject.createNewPage('My_project'+pageObject.getRandomString(10));

// drag and drop textsource and rename
await pageObject.dragAndDrop(pageObject.textSource, pageObject.target);
await pageObject.fillText(pageObject.textlocator,'Testing');

// Check Text settings is visible
await expect (page.getByText('Text settings')).toBeVisible();
await expect (page.getByText('Text to display')).toBeVisible();

// check delete button exist and visible
const deleteButton = await page.locator(pageObject.deletebutton);
await expect(deleteButton).toBeVisible();

// Check clone button exist and visible
const cloneButton = await page.locator(pageObject.clonebutton);
await expect(cloneButton).toBeVisible();
  
// Check Text to display has text
const heloworld=await page.locator(pageObject.textlocator);
await expect(heloworld).toHaveText('Testing');

// //------ line Break
await pageObject.dragAndDrop(pageObject.lineBreakSource, pageObject.target);

// drag and drop htmleditor and rename
await pageObject.dragAndDrop(pageObject.htmlCodeSource, pageObject.target);
await pageObject.fillText(pageObject.htmltextlocator, '<h3>Hello Sumit</h3>');
await pageObject.dragAndDrop(pageObject.lineBreakSource, pageObject.target);

//Check HTML box has text
const htmlbox=await page.locator(pageObject.htmltextlocator);
await expect(htmlbox).toBeVisible;

//------ line Break
await pageObject.dragAndDrop(pageObject.lineBreakSource, pageObject.target);

// drag and drop image source
await pageObject.dragAndDrop(pageObject.imageSource, pageObject.target);

//Check the Image settings text
await expect (page.getByText('Image settings')).toBeVisible();

//------ line Break
await pageObject.dragAndDrop(pageObject.lineBreakSource, pageObject.target);

// drag and drop card and rename
await pageObject.dragAndDrop(pageObject.cardSource, pageObject.target);
await pageObject.fillText(pageObject.cardtextlocator, 'Master Visa Debit Card');
  
// Check if 'Card title' field is empty
const cardTitle = await page.locator(pageObject.cardtextlocator);
await expect(cardTitle).toHaveValue('Master Visa Debit Card');

// Check if 'URL' field is empty
const urlField = await page.locator(pageObject.CardUrl);
await expect(urlField).toHaveValue('');

//------ line Break
await pageObject.dragAndDrop(pageObject.lineBreakSource, pageObject.target);

// drag and drop link source and edit link
await pageObject.dragAndDrop(pageObject.linkSource, pageObject.target);
await pageObject.fillText(pageObject.linklocator, 'youtube link');

//check link text has text
const Linktext = await page.locator(pageObject.linklocator);
await expect(Linktext).toHaveValue('youtube link');

// Enter youtube url of saltcorn.com
await pageObject.fillText(pageObject.linkurllocator, 'https://www.youtube.com/@saltcorn');

//Check Link Url has Link of saltcorn Youtube channel
const Linkurl = await page.locator(pageObject.linkurllocator);
await expect(Linkurl).toHaveValue('https://www.youtube.com/@saltcorn');

//------ line Break
await pageObject.dragAndDrop(pageObject.lineBreakSource, pageObject.target);

//----- drag and drop search option
await pageObject.dragAndDrop(pageObject.SearchLocator, pageObject.target);

// Assertions of Search tab
// Assertion for the "Has Dropdown" checkbox
const hasDropdownCheckbox = await page.locator(pageObject.hasdropdowncheckbox);
await expect(hasDropdownCheckbox).not.toBeChecked();

// Assertion for the "Show current state badges" checkbox
const showStateBadgesCheckbox = await page.locator(pageObject.statebadgecheckbox);
await expect(showStateBadgesCheckbox).not.toBeChecked();

// Assertion for the "Autofocus" checkbox
const autofocusCheckbox = await page.locator(pageObject.Autofocuscheckbox);
await expect(autofocusCheckbox).not.toBeChecked();

//------ line Break
await pageObject.dragAndDrop(pageObject.lineBreakSource, pageObject.target);

//------ drag and drop search option
await pageObject.dragAndDrop(pageObject.containsdraglocator, pageObject.target);

//Assertions of container settings
await expect (page.getByText('Container settings')).toBeVisible();

// Assertions for the expandable sections
const displaySection = await page.locator(pageObject.containerdisplaysetting);
await expect(displaySection).toBeVisible();

const contentsSection = await page.locator(pageObject.containercontentsetting);
await expect(contentsSection).toBeVisible();

const flexPropertiesSection = await page.locator(pageObject.containerflexsetting);
await expect(flexPropertiesSection).toBeVisible();

const containerLinkSection = await page.locator(pageObject.containercontentlink);
await expect(containerLinkSection).toBeVisible();

const customClassCSSSection = await page.locator(pageObject.containercustomclass);
await expect(customClassCSSSection).toBeVisible();

//------ line Break
await pageObject.dragAndDrop(pageObject.lineBreakSource, pageObject.target);

//------ drag and drop search option
await pageObject.dragAndDrop(pageObject.ActionLocator, pageObject.target);


//Assertions of action tab
await expect (page.getByText('Action settings')).toBeVisible();

// Assertion for the "Action" dropdown
const actionDropdown = await page.locator(pageObject.ActionDropdown);
await expect(actionDropdown).toBeVisible();
await expect(actionDropdown).toHaveValue('GoBack');  

// Assertion for the "Label" input field
const labelInput = await page.locator(pageObject.ActionLabel);
await expect(labelInput).toBeVisible();
await expect(labelInput).toHaveValue(''); 

// Assertion for the "Style" dropdown
const styleDropdown = await page.locator(pageObject.ActionStyledropdown);
await expect(styleDropdown).toBeVisible();
await expect(styleDropdown).toHaveValue('btn-primary');  // Adjust if the default value is different

// Assertion for the "Size" dropdown
const sizeDropdown = await page.locator(pageObject.Actionsizedropdown);
await expect(sizeDropdown).toBeVisible();
await expect(sizeDropdown).toHaveValue('');  // Adjust if the default value is different


// Assertion for the "Hover title" input field
const hoverTitleInput = await page.locator(pageObject.ActionHoverTitle);
await expect(hoverTitleInput).toBeVisible();
await expect(hoverTitleInput).toHaveValue('');  // Adjust if the default value is different


// save project
await pageObject.SavePageProject();

// Navigate to setting page and clear all changes
await pageObject.navigateToSettings();
await pageObject.clearAll();

//verify toaster msg that clear all deleted all the changes
await pageObject.waitForToasterMessage();
const title = pageObject.getToasterMessageLocator();
await expect(title).toHaveText(pageObject.expectedtoastermsg);
});
