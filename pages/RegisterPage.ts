import { Page, Locator, expect } from "@playwright/test";
import { RegisterPageLocators } from "../fixtures/locator/register.page";
import { CommonPopupLocators } from "../fixtures/locator/popup.locators";

export class RegisterPage {
  readonly page: Page;
  readonly firstName: Locator;
  readonly lastName: Locator;
  readonly email: Locator;
  readonly phone: Locator;
  readonly password: Locator;
  readonly registerBtn: Locator;

  constructor(page: Page) {
    this.page = page;
    this.firstName = page.getByTestId(RegisterPageLocators.firstName);
    this.lastName = page.getByTestId(RegisterPageLocators.lastName);
    this.email = page.getByTestId(RegisterPageLocators.email);
    this.phone = page.getByTestId(RegisterPageLocators.phone);
    this.password = page.getByTestId(RegisterPageLocators.password);
    this.registerBtn = page.getByTestId(RegisterPageLocators.registerBtn);
  }

  async navigate() {
    await this.page.goto("/register");
  }

  async registerUser({
    firstName,
    lastName,
    email,
    phone,
    password,
  }: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    password: string;
  }) {
    await this.firstName.fill(firstName);
    await this.lastName.fill(lastName);
    await this.email.fill(email);
    await this.phone.fill(phone);
    await this.password.fill(password);
    await this.registerBtn.click();
  }

  async expectSuccessPopupMessage() {
    await expect(
      this.page.getByRole("heading", {
        name: RegisterPageLocators.popupTitle,
      })
    ).toBeVisible();

    await expect(
      this.page.getByText(RegisterPageLocators.popupDescription, {
        exact: true,
      })
    ).toBeVisible();
  }

  async expectErrorPopup(errorCode: string, expectedMessage: string) {
    const errorTitle = this.page.locator(CommonPopupLocators.title);
    const errorMessage = this.page.locator(CommonPopupLocators.message);

    await expect(errorTitle).toHaveText(`Error: ${errorCode}`);
    await expect(errorMessage).toContainText(expectedMessage);
  }
}
