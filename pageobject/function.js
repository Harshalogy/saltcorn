const { expect } = require('@playwright/test');
class PageFunctions {
  constructor(page) {
    this.page = page;
    this.locators = new (require('./locators'))(page);
  }

  async navigateToBaseURL(baseURL, derivedURL) {
    await this.page.goto(baseURL + derivedURL);
  }

  async submit() {
    await this.page.click(this.locators.submitButton);
  }



  async login(email, password) {
    await this.page.fill(this.locators.emailInput, email);
    await this.page.fill(this.locators.passwordInput, password);
  }

  async createNewPage(pageName) {
    await this.page.click(this.locators.newPage_sidebar);
    await this.page.waitForSelector(this.locators.newPageButton);
    await this.page.click(this.locators.newPageButton);
    await this.page.fill(this.locators.newPageNameInput, pageName);
    await this.page.click(this.locators.submitButton);
  }

  async dragAndDrop(source, target) {
    await this.page.locator(source).dragTo(this.page.locator(target), { force: true });
  }

  async fillText(selector, text) {
    await this.page.fill(selector, text);
  }

  async navigateToSettings() {

    await this.page.click(this.locators.settingsTab);
  }
  async navigateToaboutapplication(){
    await this.page.waitForSelector(this.locators.aboutApplicationLink);
    await this.page.click(this.locators.aboutApplicationLink, { force: true });
  }
  async aboutapplicationtosystem(){
    await this.page.click(this.locators.systemSettingsLink);
    
  }
  async Validateeachtabofaboutapplications(){
    const tabs = [
      'Site identity',
      'Backup',
      'Email',
      'System',
      'Mobile app',
      'Development',
      'Notifications'
  ];

  // Check if each tab is visible and has the correct text
  for (const tab of tabs) {
      const tabLocator = this.page.locator(`ul.nav.nav-pills.plugin-section a.nav-link:has-text("${tab}")`);
      await expect(tabLocator).toBeVisible();
      await expect(tabLocator).toHaveText(tab);
      await (tabLocator).click();
  }
  }
  async Validateeachtabofmodule(){
    const tabs = [
      'All',
      'Modules',
      'Packs',
      'Themes',
      'Installed'
    ];
  
    // Check if each tab is visible, has the correct text, and click it
    for (const tab of tabs) {
      const tabLocator =this.page.locator(`div.card-body ul.nav.nav-pills.plugin-section a.nav-link:has-text("${tab}")`);
      await expect(tabLocator).toBeVisible();
      await expect(tabLocator).toHaveText(tab);
      await (tabLocator).click();
  }  
}

async navigateTomodule(){
  await this.page.waitForSelector(this.locators.Modulesettngsidebar);
  await this.page.click(this.locators.Modulesettngsidebar);
  }

  async clearAll() {
    await this.page.click(this.locators.clearAllButton);
    await this.page.waitForTimeout(2500); // Wait for navigation to complete
    await this.page.click('#inputusers');
    await this.page.waitForSelector(this.locators.submitButton);
    await this.page.click(this.locators.submitButton);
  }


  async waitForToasterMessage() {
    await this.page.waitForSelector(this.locators.toasterSelector);
  }

  getToasterMessageLocator() {
    return this.page.locator(this.locators.toasterSelector);
  }
  async SavePageProject() {
    await this.page.click(this.locators.saveButton);
  }

  async clicktable() {
    await this.page.click(this.locators.clicktable)
  }

  async SALTCORN() {
    await this.page.click(this.locators.SaltCornButton)
  }

  async views() {
    await this.page.click(this.locators.sidebarviewbutton)
  }

  static generateRandomString(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  // async clickAllDropdownItems(page,settingdropdown) {
  //   await this.page.click(this.locators.settingsTab);
  //   // Get all the dropdown items
  //   const dropdownItems = await page.$$(this.locators.settingdropdown + 'a.collapse-item');

  //   // Loop through each dropdown item and click it
  //   for (const item of dropdownItems) {
  //     await item.click();
  //     // Optionally, you can add some assertion or wait time here if needed
  //   }
  // }

  
}

module.exports = PageFunctions;
