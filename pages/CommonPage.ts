import { Page, Locator, expect } from "@playwright/test";
import { CommonPopupLocators } from "../fixtures/locator/popup.locators";

export class CommonPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async expectErrorPopup(errorCode: string, expectedMessage: string) {
    const errorTitle = this.page.locator(CommonPopupLocators.title);
    const errorMessage = this.page.locator(CommonPopupLocators.message);

    await expect(errorTitle).toHaveText(`Error: ${errorCode}`);
    await expect(errorMessage).toContainText(expectedMessage);
  }
}
