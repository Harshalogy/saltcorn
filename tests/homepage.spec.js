const { test, expect } = require('@playwright/test');
const PageObject = require('../pageobject/locators.js');

const url = 'https://saltcorn.com/';
test('Creating new application', async ({ page }) => {
  const pageObject = new PageObject(page);
  await page.goto(url);
  await pageObject.navigateToCreateApplication();

  // verify url
  await expect(page).toHaveURL('https://createapplication.saltcorn.com/tenant/create');

// generate a random subdomain and email password
  const randomSubdomain = 'My_project-' + pageObject.getRandomString(10);
  const domain = 'mailinator.com';
  const email = randomSubdomain + '@' + domain;
  const password = randomSubdomain + '@123';

  // enter project name and submit
  await pageObject.fillSubdomain(randomSubdomain);
  await pageObject.submitForm();

  // verify URL navigates to create page and verify success message
  await expect(page).toHaveURL('https://createapplication.saltcorn.com/tenant/create');
  await pageObject.verifySuccessMessage();
  await pageObject.navigateToNewApplication();

  // login using registered username and password
  await pageObject.login(email, password);

  //Create a new page from dashboard
  await pageObject.createNewPage('My_project');

  // drag and drop textsource and rename
  await pageObject.dragAndDrop(pageObject.textSource, pageObject.target);
  await pageObject.fillText(pageObject.textlocator,'Sumit');
  
  // drag and drop linebreak
  await pageObject.dragAndDrop(pageObject.lineBreakSource, pageObject.target);

  // drag and drop htmleditor and rename
  await pageObject.dragAndDrop(pageObject.htmlCodeSource, pageObject.target);
  await pageObject.fillText(pageObject.htmltextlocator, '<h3>Hello Sumit</h3>');
  await pageObject.dragAndDrop(pageObject.lineBreakSource, pageObject.target);

  // drag and drop image source
  await pageObject.dragAndDrop(pageObject.imageSource, pageObject.target);
  await pageObject.dragAndDrop(pageObject.lineBreakSource, pageObject.target);

  // drag and drop card and rename
  await pageObject.dragAndDrop(pageObject.cardSource, pageObject.target);
  await pageObject.fillText(pageObject.cardtextlocator, 'Master Visa Debit Card');
  await pageObject.dragAndDrop(pageObject.lineBreakSource, pageObject.target);

  // drag and drop link source and edit link
  await pageObject.dragAndDrop(pageObject.linkSource, pageObject.target);
  await pageObject.fillText(pageObject.linklocator, 'LINK');
  await pageObject.fillText(pageObject.linkurllocator, 'https://www.youtube.com/@saltcorn');

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
