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
    await this.page.waitForSelector(this.locators.aboutApplicationLink);
    await this.page.click(this.locators.aboutApplicationLink, { force: true });
    await this.page.click(this.locators.systemSettingsLink);
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

  // async clickAllSettingsInDropdown() {
  //   const dropdownSelector = this.locators.settingdropdown + ' a';
    
  //   // Get all dropdown items
  //   const settings = await this.page.$$(dropdownSelector);
  
  //   for (const setting of settings) {
  //     try {
  //       // Wait for the element to be visible before clicking
  //       await this.page.waitForSelector(dropdownSelector, { state: 'visible', timeout: 5000 });
  
  //       // Optionally re-fetch the settings list to ensure current state
  //       const isElementVisible = await setting.isVisible();
  //       if (isElementVisible) {
  //         await setting.click();
  //         // Wait for any changes or navigation if needed
  //         await this.page.waitForTimeout(5000); // Adjust the timeout as necessary
  //       } else {
  //         console.log('Element is not visible:', setting);
  //       }
  
  //       // Re-fetch the settings list if the DOM changes after each click
  //       // settings = await this.page.$$(dropdownSelector);
  
  //     } catch (error) {
  //       console.error('Error clicking element:', error);
  //     }
  //   }
  // }
    
}

module.exports = PageFunctions;
