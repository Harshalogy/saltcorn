const { expect } = require('@playwright/test');
class PageFunctions {
  constructor(page) {
    this.page = page;
    this.locators = new (require('./locators'))(page);
  }

  async navigate_To_Base_URL(baseURL, derivedURL) {
    await this.page.goto(baseURL + derivedURL);
  }

  async submit() {
    await this.page.click(this.locators.submitButton);
  }

  async login(email, password) {
    await this.page.fill(this.locators.emailInput, email);
    await this.page.fill(this.locators.passwordInput, password);
  }

  async create_New_Page(pageName) {
    await this.page.click(this.locators.newPage_sidebar);
    await this.page.waitForSelector(this.locators.newPageButton);
    await this.page.click(this.locators.newPageButton);
    await this.page.fill(this.locators.newPageNameInput, pageName);
    await this.page.click(this.locators.submitButton);
  }

  async drag_And_Drop(source, target) {
    await this.page.locator(source).dragTo(this.page.locator(target), { force: true });
  }

  async fill_Text(selector, text) {
    await this.page.fill(selector, text);
  }

  async navigate_To_Settings() {
    await this.page.click(this.locators.settingsTab, { force: true });
  }

  async navigate_To_about_application() {
    await this.page.waitForSelector(this.locators.aboutApplicationLink, { timeout: 10000 });
    await this.page.click(this.locators.aboutApplicationLink, { force: true });
  }

  async about_application_to_site_identity() {
    await this.page.waitForSelector(this.locators.setidentitylocator);
    await this.page.click(this.locators.setidentitylocator);
  }

  async about_application_to_backup() {
    await this.page.waitForSelector(this.locators.backuplocator);
    await this.page.click(this.locators.backuplocator);
  }

  async about_application_to_email() {
    await this.page.waitForSelector(this.locators.emaillocator);
    await this.page.click(this.locators.emaillocator);
  }

  async about_application_to_system() {
    await this.page.waitForSelector(this.locators.systemSettingsLink);
    await this.page.click(this.locators.systemSettingsLink);
  }

  async about_application_to_mobile_app() {
    await this.page.waitForSelector(this.locators.mobileapplocator);
    await this.page.click(this.locators.mobileapplocator);
  }

  async about_application_to_development() {
    await this.page.waitForSelector(this.locators.developmentlocator);
    await this.page.click(this.locators.developmentlocator);
  }

  async about_application_to_notification() {
    await this.page.waitForSelector(this.locators.notificationlocator);
    await this.page.click(this.locators.notificationlocator);
  }

  async Users_And_Security_to_Users() {
    await this.page.waitForSelector(this.locators.userslocator);
    await this.page.click(this.locators.userslocator);
  }

  async Users_And_Security_to_Roles() {
    await this.page.waitForSelector(this.locators.roleslocator);
    await this.page.click(this.locators.roleslocator);
  }

  async Users_And_Security_to_Login_and_Signup() {
    await this.page.waitForSelector(this.locators.loginandsignup);
    await this.page.click(this.locators.loginandsignup);
  }

  async Users_And_Security_to_Table_access() {
    await this.page.waitForSelector(this.locators.tableaccess);
    await this.page.click(this.locators.tableaccess);
  }

  async Users_And_Security_to_HTTP() {
    await this.page.waitForSelector(this.locators.httplocator);
    await this.page.click(this.locators.httplocator);
  }

  async Users_And_Security_to_Permissions() {
    await this.page.waitForSelector(this.locators.permissionslocator);
    await this.page.click(this.locators.permissionslocator);
  }

  async Site_Structure_to_Menu() {
    await this.page.waitForSelector(this.locators.menulocator);
    await this.page.click(this.locators.menulocator);
  }

  async Site_Structure_to_Search() {
    await this.page.waitForSelector(this.locators.searchlocator);
    await this.page.click(this.locators.searchlocator);
  }

  async Site_Structure_to_Library() {
    await this.page.waitForSelector(this.locators.librarylocator);
    await this.page.click(this.locators.librarylocator);
  }

  async Site_Structure_to_Languages() {
    await this.page.waitForSelector(this.locators.languagelocator);
    await this.page.click(this.locators.languagelocator);
  }

  async Site_Structure_to_Page_groups() {
    await this.page.waitForSelector(this.locators.pagegroupslocator);
    await this.page.click(this.locators.pagegroupslocator);
  }

  async Site_Structure_to_Tags() {
    await this.page.waitForSelector(this.locators.tagslocator);
    await this.page.click(this.locators.tagslocator);
  }

  async Site_Structure_to_Diagram() {
    await this.page.waitForSelector(this.locators.diagramlocator);
    await this.page.click(this.locators.diagramlocator);
  }

  async Site_Structure_to_Registry_editor() {
    await this.page.waitForSelector(this.locators.registrylocator);
    await this.page.click(this.locators.registrylocator);
  }

  async Files_to_Files() {
    await this.page.waitForSelector(this.locators.fileslocator);
    await this.page.click(this.locators.fileslocator);
  }

  async Files_to_Storage() {
    await this.page.waitForSelector(this.locators.storagelocator);
    await this.page.click(this.locators.storagelocator);
  }

  async Files_to_Settings() {
    await this.page.waitForSelector(this.locators.Filesettinglocator);
    await this.page.click(this.locators.Filesettinglocator);
  }

  async Events_to_Triggers() {
    await this.page.waitForSelector(this.locators.trigerslocator);
    await this.page.click(this.locators.trigerslocator);
  }

  async Events_to_Custom() {
    await this.page.waitForSelector(this.locators.Customlocator);
    await this.page.click(this.locators.Customlocator);
  }

  async Events_to_Log_settings() {
    await this.page.waitForSelector(this.locators.logsettinglocator);
    await this.page.click(this.locators.logsettinglocator);
  }

  async Events_to_Event_log() {
    await this.page.waitForSelector(this.locators.Eventloglocator);
    await this.page.click(this.locators.Eventloglocator);
  }

  async navigate_To_module() {
    await this.page.waitForSelector(this.locators.Modulesettngsidebar);
    await this.page.click(this.locators.Modulesettngsidebar);
  }

  async navigate_To_All_modules() {
    await this.page.waitForSelector(this.locators.AllModuleslocator);
    await this.page.click(this.locators.AllModuleslocator);
  }

  async navigate_modules_To_modules() {
    await this.page.waitForSelector(this.locators.Moduleslocator);
    await this.page.click(this.locators.Moduleslocator);
  }

  async navigate_modules_To_packs() {
    await this.page.waitForSelector(this.locators.packslocator);
    await this.page.click(this.locators.packslocator);
  }

  async navigate_modules_To_themes() {
    await this.page.waitForSelector(this.locators.themeslocator);
    await this.page.click(this.locators.themeslocator);
  }

  async navigate_modules_To_Installed() {
    await this.page.waitForSelector(this.locators.Installedlocator);
    await this.page.click(this.locators.Installedlocator);
  }  

  async navigate_To_Users_And_Security() {
    await this.page.waitForSelector(this.locators.UsersAndSecurity);
    await this.page.click(this.locators.UsersAndSecurity);
  }

  async navigate_To_Site_Structure() {
    await this.page.waitForSelector(this.locators.SiteStructure);
    await this.page.click(this.locators.SiteStructure);
  }

  async navigate_To_Events() {
    await this.page.waitForSelector(this.locators.Events);
    await this.page.click(this.locators.Events);
  }

  async navigate_To_File() {
    await this.page.waitForSelector(this.locators.File);
    await this.page.click(this.locators.File);
  }

  async navigate_To_Site_Structure() {
    await this.page.waitForSelector(this.locators.SiteStructure);
    await this.page.click(this.locators.SiteStructure);
  }

  async clear_All() {
    await this.page.click(this.locators.clearAllButton);
    await this.page.waitForTimeout(2500); // Wait for navigation to complete
    await this.page.click('#inputusers');
    await this.page.waitForSelector(this.locators.submitButton);
    await this.page.click(this.locators.submitButton);
  }

  async wait_For_Toaster_Message() {
    await this.page.waitForSelector(this.locators.toasterSelector);
  }

  get_Toaster_Message_Locator() {
    return this.page.locator(this.locators.toasterSelector);
  }

  async Save_Page_Project() {
    await this.page.click(this.locators.saveButton);
  }

  async click_table() {
    await this.page.click(this.locators.click_table)
  }

  async SALTCORN() {
    await this.page.click(this.locators.SaltCornButton)
  }

  async views() {
    await this.page.click(this.locators.sidebarviewbutton)
  }

  static generate_Random_String(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  async enter_Value_In_Div(page, selector, value) {
    await page.evaluate((selector, value) => {
      const element = document.querySelector(selector);
      if (element) {
        element.contentEditable = true;
        element.innerText = value; // Set the desired text here
      } else {
        throw new Error(`Element with selector ${selector} not found`);
      }
    }, selector, value);
  }

}

module.exports = PageFunctions;
