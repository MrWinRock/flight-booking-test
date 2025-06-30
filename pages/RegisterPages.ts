import { Page, Locator, expect } from "@playwright/test";

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
    this.firstName = page.getByTestId("input-first-name");
    this.lastName = page.getByTestId("input-last-name");
    this.email = page.getByTestId("input-email");
    this.phone = page.getByTestId("input-phone-number");
    this.password = page.getByTestId("input-password");
    this.registerBtn = page.getByTestId("btn-submit");
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
      this.page.getByRole("heading", { name: "Registration Successful!" })
    ).toBeVisible();

    await expect(
      this.page.getByText(
        "Please check your email to confirm your registration.",
        { exact: true }
      )
    ).toBeVisible();
  }

  async expectErrorPopup(errorCode: string, expectedMessage: string) {
    const errorTitle = this.page.locator("#swal2-title");
    const errorMessage = this.page.locator("#swal2-html-container");

    await expect(errorTitle).toHaveText(`Error: ${errorCode}`);
    await expect(errorMessage).toContainText(expectedMessage);
  }
}
