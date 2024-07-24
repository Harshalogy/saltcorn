const { test, expect, chromium } = require('@playwright/test');
const { baseURL, derivedURL } = require('../base_url');
const PageFunctions = require('../function');
const PageObject = require('../locators.js');

test('Validate left panel components', async ({ page }) => {
    const functions = new PageFunctions(page);
    const pageobject = new PageObject(page);

    await functions.navigateToBaseURL(baseURL, derivedURL);
    await functions.login('myproject19july@mailinator.com', 'myproject19july');
    await functions.submit();

    //click table button
    await functions.clicktable();
    expect(page.url()).toBe(baseURL + derivedURL + 'table');

    // Assert the presence of "Your tables" tab
    await expect(page.locator(pageobject.Yourtabletab)).toBeVisible();

    // Assert the presence of "Relationship diagram" tab
    await expect(page.locator(pageobject.relationshipdiagram)).toBeVisible();

    // Assert the table contains "users" row by defalut
    await expect(page.locator(pageobject.Defaultusertable)).toBeVisible();


    // Assert the presence of "Create table" button
    await expect(page.locator(pageobject.createtablebutton)).toBeVisible();

    // Assert the presence of "Create from CSV upload" button
    await expect(page.locator(pageobject.createtablefromCSV)).toBeVisible();

    // Assert the presence of "Discover tables" button
    await expect(page.locator(pageobject.discoverbutton)).toBeVisible();


    // Saltcorn home page 
    await functions.SALTCORN();

    // Assert the presence of "Tables" section 
    await expect(page.locator(pageobject.createtablebutton)).toBeVisible();
    await expect(page.locator(pageobject.homeCSVuplaod)).toBeVisible();
    await page.click(pageobject.createtablebutton);
    expect(page.url()).toBe(baseURL + derivedURL + 'table/new');
    //get back to homepage
    await functions.SALTCORN();

    // Assert the presence of "Views" section with "Create view" button
    await expect(page.locator(pageobject.Homecreateview)).toBeVisible();
    await page.click(pageobject.Homecreateview);
    expect(page.url()).toBe(baseURL+derivedURL+'viewedit/new');
    //get back to homepage
    await functions.SALTCORN();

    // Assert the presence of "Pages" section with "Create page" button
    await expect(page.locator(pageobject.Home_new_page_button)).toBeVisible();
    await page.click(pageobject.Home_new_page_button);
    expect(page.url()).toBe(baseURL+derivedURL+'pageedit/new');
    //get back to homepage
    await functions.SALTCORN();

    //click Views button 
    await page.waitForTimeout(2500);
    await functions.views();
    expect(page.url()).toBe(baseURL+derivedURL+'viewedit');
    await expect(page.locator(pageobject.createnewview)).toBeVisible();
    await page.click(pageobject.createnewview);
    expect(page.url()).toBe(baseURL+derivedURL+'viewedit/new');
    await functions.SALTCORN();

    // await functions.clickAllSettingsInDropdown();

});