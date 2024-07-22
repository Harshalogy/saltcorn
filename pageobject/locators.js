class PageObject {
  constructor(page) {
    this.page = page;
    // Define selectors
    
    this.tryItNowLink = 'a[href="https://saltcorn.com/tenant/create"]';
    this.subdomainInput = 'input[name="subdomain"]';
    this.submitButton = 'button[type="submit"]';
    this.successMessage = '#page-inner-content > section.page-section.pt-2 > div > div > div:nth-child(1)';
    this.newApplicationLink = '#page-inner-content > section.page-section.pt-2 > div > div > div.my-3 > a';
    this.emailInput = 'input[type="email"]';
    this.passwordInput = 'input[type="password"]';
    this.textSource = '#saltcorn-builder > div.row > div.col-sm-auto.left-builder-col.builder-left-shrunk > div.componets-and-library-accordion.toolbox-card > div.card.mt-1 > div:nth-child(1) > div:nth-child(1) > div > svg';
    this.textlocator='#saltcorn-builder > div.row > div.col-sm-auto.builder-sidebar > div > div.settings-panel.card.mt-1 > div.card-body.p-2 > div > div.border > div';
    this.target = '#builder-main-canvas > div > div > div';
    this.lineBreakSource = '#saltcorn-builder > div.row > div.col-sm-auto.left-builder-col.builder-left-shrunk > div.componets-and-library-accordion.toolbox-card > div.card.mt-1 > div:nth-child(2) > div:nth-child(1) > div';
    this.htmlCodeSource = '#saltcorn-builder > div.row > div.col-sm-auto.left-builder-col.builder-left-shrunk > div.componets-and-library-accordion.toolbox-card > div.card.mt-1 > div:nth-child(2) > div:nth-child(2)';
    this.cardSource = '#saltcorn-builder > div.row > div.col-sm-auto.left-builder-col.builder-left-shrunk > div.componets-and-library-accordion.toolbox-card > div.card.mt-1 > div:nth-child(3) > div:nth-child(1)';
    this.linkSource = '#saltcorn-builder > div.row > div.col-sm-auto.left-builder-col.builder-left-shrunk > div.componets-and-library-accordion.toolbox-card > div.card.mt-1 > div:nth-child(4) > div:nth-child(1)';
    this.imageSource = '#saltcorn-builder > div.row > div.col-sm-auto.left-builder-col.builder-left-shrunk > div.componets-and-library-accordion.toolbox-card > div.card.mt-1 > div:nth-child(3) > div:nth-child(2)';
    this.saveButton = '#saltcorn-builder > div.row > div.col-sm-auto.builder-sidebar > div > button';
    this.newPageButton = '#page-inner-content > div:nth-child(2) > div.card.shadow.mt-0 > div > div > a';
    this.newPage_sidebar='#accordionSidebar > li:nth-child(6) > a > span';
    this.newPageNameInput = 'input[type="text"]';
    this.settingsTab = '#accordionSidebar > li:nth-child(7) > a > span';
    this.aboutApplicationLink = '#collapseSettings > div > a:nth-child(1)';
    this.systemSettingsLink = '#page-inner-content > div:nth-child(2) > div.card.shadow.mt-0 > div > div > ul > li:nth-child(4) > a';
    this.clearAllButton = 'a[href="/admin/clear-all"]';
    this.toasterSelector = '#toasts-area > div > div.toast-body.py-2.fs-6.fw-bold > strong';
    this.htmltextlocator ='#saltcorn-builder > div.row > div.col-sm-auto.builder-sidebar > div > div.settings-panel.card.mt-1 > div.card-body.p-2 > table > tbody > tr > td > textarea';
    this.cardtextlocator = '#saltcorn-builder > div.row > div.col-sm-auto.builder-sidebar > div > div.settings-panel.card.mt-1 > div.card-body.p-2 > table > tbody > tr:nth-child(1) > td > input';
    this.linklocator = '#saltcorn-builder > div.row > div.col-sm-auto.builder-sidebar > div > div.settings-panel.card.mt-1 > div.card-body.p-2 > div > table.w-100 > tbody > tr:nth-child(1) > td:nth-child(2) > input';
    this.linkurllocator = '#saltcorn-builder > div.row > div.col-sm-auto.builder-sidebar > div > div.settings-panel.card.mt-1 > div.card-body.p-2 > div > table.w-100 > tbody > tr:nth-child(3) > td:nth-child(2) > input';
    this.expectedtoastermsg = 'Deleted all tables, views, pages, page_groups, files, triggers, eventlog, library, config, plugins';
  }

  getRandomString(length) {
    let result = '';
    const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }
  async navigateToCreateApplication() {
    await this.page.click(this.tryItNowLink);
  }

  async fillSubdomain(subdomain) {
    await this.page.fill(this.subdomainInput, subdomain);
  }

  async submitForm() {
    await this.page.click(this.submitButton);
  }

  async verifySuccessMessage() {
    await this.page.waitForSelector(this.successMessage);
  }

  async navigateToNewApplication() {
    await this.page.click(this.newApplicationLink);
  }

  async login(email, password) {
    await this.page.fill(this.emailInput, email);
    await this.page.fill(this.passwordInput, password);
    await Promise.all([
      this.page.waitForNavigation(),
      this.page.click(this.submitButton)
    ]);
  }

  async dragAndDrop(source, target) {
    await this.page.locator(source).dragTo(this.page.locator(target));
  }

  async SavePageProject(){
    await this.page.click(this.saveButton);
  }

  async fillText(selector, text) {
    await this.page.fill(selector,text);
  }

  async createNewPage(pageName) {
    await this.page.click(this.newPage_sidebar);
    await this.page.waitForSelector(this.newPageButton);
    await this.page.click(this.newPageButton);
    await this.page.fill(this.newPageNameInput, pageName);
    await this.page.click(this.submitButton);
  }

  async navigateToSettings() {
    await this.page.click(this.settingsTab);
    await this.page.click(this.aboutApplicationLink);
    await this.page.click(this.systemSettingsLink);
  }

  async clearAll() {
    await this.page.click(this.clearAllButton);
    await this.page.waitForTimeout(2500); // Wait for navigation to complete
    await this.page.click('#inputusers');
    await this.page.waitForSelector(this.submitButton);
    await this.page.click(this.submitButton);
  }

  async waitForToasterMessage() {
    await this.page.waitForSelector(this.toasterSelector);
  }

  getToasterMessageLocator() {
    return this.page.locator(this.toasterSelector);
  }
}

module.exports = PageObject;
