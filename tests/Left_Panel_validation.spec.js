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

    // Maximize the screen
    await page.setViewportSize({ width: 1350, height: 1080 });
    
    functions = new PageFunctions(page);
    pageobject = new PageObject(page);
    
    // Navigate to base URL and perform login
    await functions.navigate_To_Base_URL(baseURL, derivedURL);
    await functions.login('myproject19july@mailinator.com', 'myproject19july');
    await functions.submit();
    
    // Save the logged-in state
    await context.storageState({ path: storageState });
  });

  test.beforeEach(async () => {
    // Reuse the existing context and page
    await functions.navigate_To_Base_URL(baseURL, derivedURL);
  });

  test('Click table button and verify URL', async () => {
    //click table button
    await functions.click_table();
    // assert the table url
    expect(page.url()).toBe(baseURL + derivedURL + 'table');
  });
  
  // Assert the presence of "Your tables" tab
  test('Validate presence of "Your tables" tab', async () => {
    //click table button
    await functions.click_table();
    // assert the visiblity of table tab
    await expect(page.locator(pageobject.Yourtabletab)).toBeVisible();
  });

  // Assert the table contains "users" row by defalut
  test('Verify default "users" row in the table', async () => {
    //click table button
    await functions.click_table();
    //assert the default user table
    await expect(page.locator(pageobject.Defaultusertable)).toBeVisible();
  });

  // Assert the presence of "Create table" button
  test('Check visibility of "Create table" button', async () => {
    await expect(page.locator(pageobject.createtablebutton)).toBeVisible();
  });

  // Assert the presence of "Create from CSV upload" button
  test('Check visibility of "Create from CSV upload" button', async () => {
    //click table button
    await functions.click_table();
    //asert the create table from csv option
    await expect(page.locator(pageobject.createtablefromCSV)).toBeVisible();
  });

  // Assert the presence of "Discover tables" button
  test('Check visibility of "Discover tables" button', async () => {
    //click table button
    await functions.click_table();
    // assert the discover button
    await expect(page.locator(pageobject.discoverbutton)).toBeVisible();
  });

  // Assert the presence of "Relationship diagram" tab
  test('Validate presence of "Relationship diagram" tab', async () => {
    //click table button
    await functions.click_table();
    // assert the visibility of relationship diagram
    await expect(page.locator(pageobject.relationshipdiagram)).toBeVisible();
  });

  // Assert the presence of "Create new views" button
  test('Verify "Views" section and "Create new view" button', async () => {
    await functions.views();
    // assert the view edit url
    expect(page.url()).toBe(baseURL + derivedURL + 'viewedit');
    //assert the visibility of create new view
    await expect(page.locator(pageobject.createnewview)).toBeVisible();
    //click on create new view
    await page.click(pageobject.createnewview);
    // assert the view url
    expect(page.url()).toBe(baseURL + derivedURL + 'viewedit/new');
  });

  // Assert the presence of "About Application" button
  test('Validate "About Application" tabs', async () => {
    functions = new PageFunctions(page);
    // Navigate to setting
    await functions.navigate_To_Settings();
    // Navigate to about applications
    await functions.navigate_To_about_application();
    // assert the about application url
    expect(page.url()).toBe(baseURL + derivedURL + 'admin');
    // validate each tab of about application and assert url
    await functions.about_application_to_site_identity();
    expect(page.url()).toBe(baseURL + derivedURL + 'admin');
    await functions.about_application_to_backup();
    expect(page.url()).toBe(baseURL + derivedURL + 'admin' + derivedURL + 'backup');
    await functions.about_application_to_email();
    expect(page.url()).toBe(baseURL + derivedURL + 'admin' + derivedURL + 'email');
    await functions.about_application_to_system();
    expect(page.url()).toBe(baseURL + derivedURL + 'admin' + derivedURL + 'system');
    await functions.about_application_to_mobile_app();
    expect(page.url()).toBe(baseURL + derivedURL + 'admin' + derivedURL + 'build-mobile-app');
    await functions.about_application_to_development();
    expect(page.url()).toBe(baseURL + derivedURL + 'admin' + derivedURL + 'dev');
    await functions.about_application_to_notification();
    expect(page.url()).toBe(baseURL + derivedURL + 'admin' + derivedURL + 'notifications');
  });
  // Assert the presence of "Module" tab
  test('Validate "Module" tabs', async () => {
    functions = new PageFunctions(page);
    // Navigate to setting
    await functions.navigate_To_Settings();
    // Navigate to Module
    await functions.navigate_To_module();
    // assert the module url
    expect(page.url()).toBe(baseURL + derivedURL + 'plugins');
    // validate each tab of module and assert url
    await functions.navigate_To_All_modules();
    expect(page.url()).toBe(baseURL + derivedURL + 'plugins?set=all');
    await functions.navigate_modules_To_modules();
    expect(page.url()).toBe(baseURL + derivedURL + 'plugins?set=modules');
    await functions.navigate_modules_To_packs();
    expect(page.url()).toBe(baseURL + derivedURL + 'plugins?set=packs');
    await functions.navigate_modules_To_themes();
    expect(page.url()).toBe(baseURL + derivedURL + 'plugins?set=themes');
    await functions.navigate_modules_To_Installed();
    expect(page.url()).toBe(baseURL + derivedURL + 'plugins?set=installed');
  });

  // Assert the presence of "Users and Security" tab
  test('Validate "Users and Security" tabs', async () => {
    functions = new PageFunctions(page);
    // Navigate to setting
    await functions.navigate_To_Settings();
    // Navigate to Users and Security
    await functions.navigate_To_Users_And_Security();
    // assert the user and security url
    expect(page.url()).toBe(baseURL + derivedURL + 'useradmin');
    // validate each tab of users and security and assert urls
    await functions.Users_And_Security_to_Users();
    expect(page.url()).toBe(baseURL + derivedURL + 'useradmin');
    await functions.Users_And_Security_to_Roles();
    expect(page.url()).toBe(baseURL + derivedURL + 'roleadmin');
    await functions.Users_And_Security_to_Login_and_Signup();
    expect(page.url()).toBe(baseURL + derivedURL + 'useradmin' + derivedURL + 'settings');
    await functions.Users_And_Security_to_Table_access();
    expect(page.url()).toBe(baseURL + derivedURL + 'useradmin' + derivedURL + 'table-access');
    await functions.Users_And_Security_to_HTTP();
    expect(page.url()).toBe(baseURL + derivedURL + 'useradmin' + derivedURL + 'http');
    await functions.Users_And_Security_to_Permissions();
    expect(page.url()).toBe(baseURL + derivedURL + 'useradmin' + derivedURL + 'permissions');
  });

  // Assert the presence of "Site Structure" tab
  test('Validate "Site Structure" tabs', async () => {
    functions = new PageFunctions(page);
    // Navigate to setting
    await functions.navigate_To_Settings();
    // Navigate to Site Structure
    await functions.navigate_To_Site_Structure();
    // assert the site structure url
    expect(page.url()).toBe(baseURL + derivedURL + 'menu');
    // validate each tab of  site structure and assert urls
    await functions.Site_Structure_to_Menu();
    expect(page.url()).toBe(baseURL + derivedURL + 'menu');
    await functions.Site_Structure_to_Search();
    expect(page.url()).toBe(baseURL + derivedURL + 'search' + derivedURL + 'config');
    await functions.Site_Structure_to_Library();
    expect(page.url()).toBe(baseURL + derivedURL + 'library' + derivedURL + 'list');
    await functions.Site_Structure_to_Languages();
    expect(page.url()).toBe(baseURL + derivedURL + 'site-structure' + derivedURL + 'localizer');
    await functions.Site_Structure_to_Page_groups();
    expect(page.url()).toBe(baseURL + derivedURL + 'page_group' + derivedURL + 'settings');
    await functions.Site_Structure_to_Tags();
    expect(page.url()).toBe(baseURL + derivedURL + 'tag');
    await functions.Site_Structure_to_Diagram();
    expect(page.url()).toBe(baseURL + derivedURL + 'diagram');
    await functions.Site_Structure_to_Registry_editor();
    expect(page.url()).toBe(baseURL + derivedURL + 'registry-editor');
  });

  // Assert the presence of "Files" tab
  test('Validate "Files" tabs', async () => {
    functions = new PageFunctions(page);
    // Navigate to setting
    await functions.navigate_To_Settings();
    // Navigate to Files
    await functions.navigate_To_File();
    // assert the files url
    expect(page.url()).toBe(baseURL + derivedURL + 'files');
    // validate each tab of files and assert urls
    await functions.Files_to_Files();
    expect(page.url()).toBe(baseURL + derivedURL + 'files');
    await functions.Files_to_Storage();
    expect(page.url()).toBe(baseURL + derivedURL + 'files' + derivedURL +'storage');
    await functions.Files_to_Settings();
    expect(page.url()).toBe(baseURL + derivedURL + 'files' + derivedURL +'settings');
  });

  // Assert the presence of "Events" tab
  test('Validate "Events" tabs', async () => {
    functions = new PageFunctions(page);
    // Navigate to setting
    await functions.navigate_To_Settings();
    /// Navigate to Events
    await functions.navigate_To_Events();
     // assert the events url
     expect(page.url()).toBe(baseURL + derivedURL + 'actions');
    // validate each tab of events and assert urls
    await functions.Events_to_Triggers();
    expect(page.url()).toBe(baseURL + derivedURL + 'actions');
    await functions.Events_to_Custom();
    expect(page.url()).toBe(baseURL + derivedURL + 'eventlog' + derivedURL +'custom');
    await functions.Events_to_Log_settings();
    expect(page.url()).toBe(baseURL + derivedURL + 'eventlog' + derivedURL +'settings');
    await functions.Events_to_Event_log();
    expect(page.url()).toBe(baseURL + derivedURL + 'eventlog');
  });
});