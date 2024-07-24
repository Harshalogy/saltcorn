const { test, expect, chromium } = require('@playwright/test');
const { baseURL, derivedURL } = require('../base_url');
const PageFunctions = require('../function');
const PageObject = require('../locators.js');
// Function to generate a random string
function generateRandomString(length) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

test('Validate Login functionality', async ({ page }) => {
  const functions = new PageFunctions(page);
  const pageobject = new PageObject(page);
  const randomSubdomain = generateRandomString(10);

  await functions.navigateToBaseURL(baseURL, derivedURL);
  await functions.login('myproject19july@mailinator.com', 'myproject19july');
  await functions.submit();
  // Add more actions and assertions

  await functions.createNewPage('My_project' + generateRandomString(10));

  // drag and drop textsource and rename
  await functions.dragAndDrop(pageobject.textSource, pageobject.target);
  await functions.fillText(pageobject.textlocator, 'Testing');

  // Check Text settings is visible
  await expect(page.getByText('Text settings')).toBeVisible();
  await expect(page.getByText('Text to display')).toBeVisible();

  // check delete button exist and visible
  const deleteButton = await page.locator(pageobject.deletebutton);
  await expect(deleteButton).toBeVisible();

  // Check clone button exist and visible
  const cloneButton = await page.locator(pageobject.clonebutton);
  await expect(cloneButton).toBeVisible();

  // Check Text to display has text
  const heloworld = page.locator(pageobject.textlocator);
  await expect(heloworld).toHaveText('Testing');

  // //------ line Break
  await functions.dragAndDrop(pageobject.lineBreakSource, pageobject.target);

  // drag and drop htmleditor and rename
  await functions.dragAndDrop(pageobject.htmlCodeSource, pageobject.target);
  await functions.fillText(pageobject.htmltextlocator, '<h3>Hello Sumit</h3>');


  //Check HTML box has text
  const htmlbox = page.locator(pageobject.htmltextlocator);
  await expect(htmlbox).toBeVisible;

  // //------ line Break
  await functions.dragAndDrop(pageobject.lineBreakSource, pageobject.target);

  await page.waitForTimeout(2000);

  // drag and drop image source
  await functions.dragAndDrop(pageobject.imageSource, pageobject.target);

  //Check the Image settings text
  await expect(page.getByText('Image settings')).toBeVisible();

  //------ line Break
  await functions.dragAndDrop(pageobject.lineBreakSource, pageobject.target);

  // drag and drop card and rename
  await functions.dragAndDrop(pageobject.cardSource, pageobject.target);
  await functions.fillText(pageobject.cardtextlocator, 'Master Visa Debit Card');

  // Check if 'Card title' field is empty
  const cardTitle = page.locator(pageobject.cardtextlocator);
  await expect(cardTitle).toHaveValue('Master Visa Debit Card');

  // Check if 'URL' field is empty
  const urlField = page.locator(pageobject.CardUrl);
  await expect(urlField).toHaveValue('');
  //------ line Break
  await functions.dragAndDrop(pageobject.lineBreakSource, pageobject.target);

  // drag and drop link source and edit link
  await functions.dragAndDrop(pageobject.linkSource, pageobject.target);
  await functions.fillText(pageobject.linklocator, 'youtube link');

  //check link text has text
  const Linktext = page.locator(pageobject.linklocator);
  await expect(Linktext).toHaveValue('youtube link');

  // Enter youtube url of saltcorn.com
  await functions.fillText(pageobject.linkurllocator, 'https://www.youtube.com/@saltcorn');

  //Check Link Url has Link of saltcorn Youtube channel
  const Linkurl = page.locator(pageobject.linkurllocator);
  await expect(Linkurl).toHaveValue('https://www.youtube.com/@saltcorn');

  //------ line Break
  await functions.dragAndDrop(pageobject.lineBreakSource, pageobject.target);

  //----- drag and drop search option
  await functions.dragAndDrop(pageobject.SearchLocator, pageobject.target);

  // Assertions of Search tab
  // Assertion for the "Has Dropdown" checkbox
  const hasDropdownCheckbox = await page.locator(pageobject.hasdropdowncheckbox);
  await expect(hasDropdownCheckbox).not.toBeChecked();

  // Assertion for the "Show current state badges" checkbox
  const showStateBadgesCheckbox = await page.locator(pageobject.statebadgecheckbox);
  await expect(showStateBadgesCheckbox).not.toBeChecked();

  // Assertion for the "Autofocus" checkbox
  const autofocusCheckbox = await page.locator(pageobject.Autofocuscheckbox);
  await expect(autofocusCheckbox).not.toBeChecked();

  //------ line Break
  await functions.dragAndDrop(pageobject.lineBreakSource, pageobject.target);


  //------ drag and drop Container option
  await functions.dragAndDrop(pageobject.containsdraglocator, pageobject.target);

  //Assertions of container settings
  await expect(page.getByText('Container settings')).toBeVisible();

  // Assertions for the expandable sections
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

  //------ line Break
  await functions.dragAndDrop(pageobject.lineBreakSource, pageobject.target);

  //------ drag and drop search option
  await functions.dragAndDrop(pageobject.ActionLocator, pageobject.target);


  //Assertions of action tab
  await expect(page.getByText('Action settings')).toBeVisible();

  // Assertion for the "Action" dropdown
  const actionDropdown = await page.locator(pageobject.ActionDropdown);
  await expect(actionDropdown).toBeVisible();
  await expect(actionDropdown).toHaveValue('GoBack');

  // Assertion for the "Label" input field
  const labelInput = await page.locator(pageobject.ActionLabel);
  await expect(labelInput).toBeVisible();
  await expect(labelInput).toHaveValue('');

  // Assertion for the "Style" dropdown
  const styleDropdown = await page.locator(pageobject.ActionStyledropdown);
  await expect(styleDropdown).toBeVisible();
  await expect(styleDropdown).toHaveValue('btn-primary');  // Adjust if the default value is different

  // Assertion for the "Size" dropdown
  const sizeDropdown = await page.locator(pageobject.Actionsizedropdown);
  await expect(sizeDropdown).toBeVisible();
  await expect(sizeDropdown).toHaveValue('');  // Adjust if the default value is different


  // Assertion for the "Hover title" input field
  const hoverTitleInput = await page.locator(pageobject.ActionHoverTitle);
  await expect(hoverTitleInput).toBeVisible();
  await expect(hoverTitleInput).toHaveValue('');  // Adjust if the default value is different

  // save project
  await functions.SavePageProject();


  // Navigate to setting page and clear all changes
  await page.waitForTimeout(2500);
  await functions.navigateToSettings();
  await functions.clearAll();

  //verify toaster msg that clear all deleted all the changes
  await functions.waitForToasterMessage();
  const title = functions.getToasterMessageLocator();
  await expect(title).toHaveText(pageobject.expectedtoastermsg);
});
