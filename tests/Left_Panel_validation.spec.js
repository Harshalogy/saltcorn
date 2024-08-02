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
    await customAssert('page url should be https://e2etest.saltcorn.co/table', async () => {
    expect(page.url()).toBe(baseURL + derivedURL + 'table');
    });
  });
  
  // Assert the presence of "Your tables" tab
  test('Validate presence of "Your tables" tab', async () => {
    //click table button
    await functions.click_table();
    // assert the visiblity of table tab
    await customAssert('your table tab should be visible', async () => {
    await expect(page.locator(pageobject.Yourtabletab)).toBeVisible();
    });
  });

  // Assert the table contains "users" row by defalut
  test('Verify default "users" row in the table', async () => {
    //click table button
    await functions.click_table();
    //assert the default user table
    await customAssert('User table should be visible', async () => {
    await expect(page.locator(pageobject.Defaultusertable)).toBeVisible();
    });
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
    await customAssert('Create table from csv button should be visible', async () => {
    await expect(page.locator(pageobject.createtablefromCSV)).toBeVisible();
    });
  });

  // Assert the presence of "Discover tables" button
  test('Check visibility of "Discover tables" button', async () => {
    //click table button
    await functions.click_table();
    // assert the discover button
    await customAssert('discover button should be visible', async () => {
    await expect(page.locator(pageobject.discoverbutton)).toBeVisible();
    });
  });

  // Assert the presence of "Relationship diagram" tab
  test('Validate presence of "Relationship diagram" tab', async () => {
    //click table button
    await functions.click_table();
    // assert the visibility of relationship diagram
    await customAssert('relationship diagram tab should be visible', async () => {
    await expect(page.locator(pageobject.relationshipdiagram)).toBeVisible();
    });
  });

  // Assert the presence of "Create new views" button
  test('Verify "Views" section and "Create new view" button', async () => {
    await functions.views();
    // assert the view edit url
    await customAssert('page url should be https://e2etest.saltcorn.co/viewtable', async () => {
    expect(page.url()).toBe(baseURL + derivedURL + 'viewedit');
    });
    //assert the visibility of create new view
    await customAssert('create new table button should be visible', async () => {
    await expect(page.locator(pageobject.createnewview)).toBeVisible();
    });
    //click on create new view
    await page.click(pageobject.createnewview);
    // assert the view url
    await customAssert('page url should be https://e2etest.saltcorn.co/viewedit/new', async () => {
    expect(page.url()).toBe(baseURL + derivedURL + 'viewedit/new');
    });
  });

  // Assert the presence of "About Application" button
  test('Validate "About Application" tabs', async () => {
    functions = new PageFunctions(page);
    // Navigate to setting
    await functions.navigate_To_Settings();
    // Navigate to about applications
    await functions.navigate_To_about_application();
    // assert the about application url
    await customAssert('page url should be https://e2etest.saltcorn.co/admin', async () => {
    expect(page.url()).toBe(baseURL + derivedURL + 'admin');
    });
    // validate each tab of about application and assert url
    await functions.about_application_to_site_identity();
    await customAssert('page url should be https://e2etest.saltcorn.co/admin', async () => {
    expect(page.url()).toBe(baseURL + derivedURL + 'admin');
    });
    await functions.about_application_to_backup();
    await customAssert('page url should be https://e2etest.saltcorn.co/admin/backup', async () => {
    expect(page.url()).toBe(baseURL + derivedURL + 'admin' + derivedURL + 'backup');
    });
    await functions.about_application_to_email();
    await customAssert('page url should be https://e2etest.saltcorn.co/admin/email', async () => {
    expect(page.url()).toBe(baseURL + derivedURL + 'admin' + derivedURL + 'email');
    });
    await functions.about_application_to_system();
    await customAssert('page url should be https://e2etest.saltcorn.co/admin/system', async () => {
    expect(page.url()).toBe(baseURL + derivedURL + 'admin' + derivedURL + 'system');
    });
    await functions.about_application_to_mobile_app();
    await customAssert('page url should be https://e2etest.saltcorn.co/admin/build-mobile-app', async () => {
    expect(page.url()).toBe(baseURL + derivedURL + 'admin' + derivedURL + 'build-mobile-app');
    });
    await functions.about_application_to_development();
    await customAssert('page url should be https://e2etest.saltcorn.co/admin/dev', async () => {
    expect(page.url()).toBe(baseURL + derivedURL + 'admin' + derivedURL + 'dev');
    });
    await functions.about_application_to_notification();
    await customAssert('page url should be https://e2etest.saltcorn.co/admin/notifications', async () => {
    expect(page.url()).toBe(baseURL + derivedURL + 'admin' + derivedURL + 'notifications');
    });
  });
  
  test('Validate "Module" tabs', async () => {
    functions = new PageFunctions(page);
    // Navigate to setting
    await functions.navigate_To_Settings();
    // Navigate to Module
    await functions.navigate_To_module();
    // Assert the module URL
    await customAssert('page url should be https://e2etest.saltcorn.co/plugins', async () => {
      expect(page.url()).toBe(baseURL + derivedURL + 'plugins');
    });
    // Validate each tab of module and assert URL
    await functions.navigate_To_All_modules();
    await customAssert('page url should be https://e2etest.saltcorn.co/plugins?set=all', async () => {
      expect(page.url()).toBe(baseURL + derivedURL + 'plugins?set=all');
    });
    await functions.navigate_modules_To_modules();
    await customAssert('page url should be https://e2etest.saltcorn.co/plugins?set=modules', async () => {
      expect(page.url()).toBe(baseURL + derivedURL + 'plugins?set=modules');
    });
    await functions.navigate_modules_To_packs();
    await customAssert('page url should be https://e2etest.saltcorn.co/plugins?set=packs', async () => {
      expect(page.url()).toBe(baseURL + derivedURL + 'plugins?set=packs');
    });
    await functions.navigate_modules_To_themes();
    await customAssert('page url should be https://e2etest.saltcorn.co/plugins?set=themes', async () => {
      expect(page.url()).toBe(baseURL + derivedURL + 'plugins?set=themes');
    });
    await functions.navigate_modules_To_Installed();
    await customAssert('page url should be https://e2etest.saltcorn.co/plugins?set=installed', async () => {
      expect(page.url()).toBe(baseURL + derivedURL + 'plugins?set=installed');
    });
  });

  // Assert the presence of "Users and Security" tab
  test('Validate "Users and Security" tabs', async () => {
    functions = new PageFunctions(page);
    // Navigate to setting
    await functions.navigate_To_Settings();
    // Navigate to Users and Security
    await functions.navigate_To_Users_And_Security();
    // assert the user and security url
    await customAssert('page url should be https://e2etest.saltcorn.co/useradmin', async () => {
    expect(page.url()).toBe(baseURL + derivedURL + 'useradmin');
    });
    // validate each tab of users and security and assert urls
    await functions.Users_And_Security_to_Users();
    await customAssert('page url should be https://e2etest.saltcorn.co/useradmin', async () => {
    expect(page.url()).toBe(baseURL + derivedURL + 'useradmin');
    });
    await functions.Users_And_Security_to_Roles();
    await customAssert('page url should be https://e2etest.saltcorn.co/roleadmin', async () => {
    expect(page.url()).toBe(baseURL + derivedURL + 'roleadmin');
    });
    await functions.Users_And_Security_to_Login_and_Signup();
    await customAssert('page url should be https://e2etest.saltcorn.co/useradmin/settings', async () => {
    expect(page.url()).toBe(baseURL + derivedURL + 'useradmin' + derivedURL + 'settings');
    });
    await functions.Users_And_Security_to_Table_access();
    await customAssert('page url should be https://e2etest.saltcorn.co/useradmin/table-access', async () => {
    expect(page.url()).toBe(baseURL + derivedURL + 'useradmin' + derivedURL + 'table-access');
    });
    await functions.Users_And_Security_to_HTTP();
    await customAssert('page url should be https://e2etest.saltcorn.co/useradmin/http', async () => {
    expect(page.url()).toBe(baseURL + derivedURL + 'useradmin' + derivedURL + 'http');
    });
    await functions.Users_And_Security_to_Permissions();
    await customAssert('page url should be https://e2etest.saltcorn.co/useradmin/permissions', async () => {
    expect(page.url()).toBe(baseURL + derivedURL + 'useradmin' + derivedURL + 'permissions');
    });
  });

  // Assert the presence of "Site Structure" tab
  test('Validate "Site Structure" tabs', async () => {
    functions = new PageFunctions(page);
    // Navigate to setting
    await functions.navigate_To_Settings();
    // Navigate to Site Structure
    await functions.navigate_To_Site_Structure();
    // assert the site structure url
    await customAssert('page url should be https://e2etest.saltcorn.co/menu', async () => {
    expect(page.url()).toBe(baseURL + derivedURL + 'menu');
    });
    // validate each tab of  site structure and assert urls
    await functions.Site_Structure_to_Menu();
    await customAssert('page url should be https://e2etest.saltcorn.co/menu', async () => {
    expect(page.url()).toBe(baseURL + derivedURL + 'menu');
    });
    await functions.Site_Structure_to_Search();
    await customAssert('page url should be https://e2etest.saltcorn.co/search/config', async () => {
    expect(page.url()).toBe(baseURL + derivedURL + 'search' + derivedURL + 'config');
    });
    await functions.Site_Structure_to_Library();
    await customAssert('page url should be https://e2etest.saltcorn.co/list', async () => {
    expect(page.url()).toBe(baseURL + derivedURL + 'library' + derivedURL + 'list');
    });
    await functions.Site_Structure_to_Languages();
    await customAssert('page url should be https://e2etest.saltcorn.co/site-structure/localizer', async () => {
    expect(page.url()).toBe(baseURL + derivedURL + 'site-structure' + derivedURL + 'localizer');
    });
    await functions.Site_Structure_to_Page_groups();
    await customAssert('page url should be https://e2etest.saltcorn.co/page_group/settings', async () => {
    expect(page.url()).toBe(baseURL + derivedURL + 'page_group' + derivedURL + 'settings');
    });
    await functions.Site_Structure_to_Tags();
    await customAssert('page url should be https://e2etest.saltcorn.co/tag', async () => {
    expect(page.url()).toBe(baseURL + derivedURL + 'tag');
    });
    await functions.Site_Structure_to_Diagram();
    await customAssert('page url should be https://e2etest.saltcorn.co/diagram', async () => {
    expect(page.url()).toBe(baseURL + derivedURL + 'diagram');
    });
    await functions.Site_Structure_to_Registry_editor();
    await customAssert('page url should be https://e2etest.saltcorn.co/registry-editor', async () => {
    expect(page.url()).toBe(baseURL + derivedURL + 'registry-editor');
    });
  });

  // Assert the presence of "Files" tab
  test('Validate "Files" tabs', async () => {
    functions = new PageFunctions(page);
    // Navigate to setting
    await functions.navigate_To_Settings();
    // Navigate to Files
    await functions.navigate_To_File();
    // assert the files url
    await customAssert('page url should be https://e2etest.saltcorn.co/files', async () => {
    expect(page.url()).toBe(baseURL + derivedURL + 'files');
    });
    // validate each tab of files and assert urls
    await functions.Files_to_Files();
    await customAssert('page url should be https://e2etest.saltcorn.co/files', async () => {
    expect(page.url()).toBe(baseURL + derivedURL + 'files');
    });
    await functions.Files_to_Storage();
    await customAssert('page url should be https://e2etest.saltcorn.co/files/storage', async () => {
    expect(page.url()).toBe(baseURL + derivedURL + 'files' + derivedURL +'storage');
    });
    await functions.Files_to_Settings();
    await customAssert('page url should be https://e2etest.saltcorn.co/files/settings', async () => {
    expect(page.url()).toBe(baseURL + derivedURL + 'files' + derivedURL +'settings');
    });
  });

  // Assert the presence of "Events" tab
  test('Validate "Events" tabs', async () => {
    functions = new PageFunctions(page);
    // Navigate to setting
    await functions.navigate_To_Settings();
    /// Navigate to Events
    await functions.navigate_To_Events();
     // assert the events url
     await customAssert('page url should be https://e2etest.saltcorn.co/actions', async () => {
     expect(page.url()).toBe(baseURL + derivedURL + 'actions');
     });
    // validate each tab of events and assert urls
    await functions.Events_to_Triggers();
    await customAssert('page url should be https://e2etest.saltcorn.co/actions', async () => {
    expect(page.url()).toBe(baseURL + derivedURL + 'actions');
    });
    await functions.Events_to_Custom();
    await customAssert('page url should be https://e2etest.saltcorn.co/eventlog/custom', async () => {
    expect(page.url()).toBe(baseURL + derivedURL + 'eventlog' + derivedURL +'custom');
    });
    await functions.Events_to_Log_settings();
    await customAssert('page url should be https://e2etest.saltcorn.co/eventlog/settings', async () => {
    expect(page.url()).toBe(baseURL + derivedURL + 'eventlog' + derivedURL +'settings');
    });
    await functions.Events_to_Event_log();
    await customAssert('page url should be https://e2etest.saltcorn.co/eventlog', async () => {
    expect(page.url()).toBe(baseURL + derivedURL + 'eventlog');
    });
  });
});