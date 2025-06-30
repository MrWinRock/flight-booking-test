import { Page, Locator, expect } from "@playwright/test";
import { LoginPageLocators } from "../fixtures/locator/login.page";
import { OTPPopupLocators } from "../fixtures/locator/popup.locators";
import { HomePageLocators } from "../fixtures/locator/home.page";

export class LoginPage {
  readonly page: Page;
  readonly email: Locator;
  readonly password: Locator;
  readonly loginBtn: Locator;

  constructor(page: Page) {
    this.page = page;
    this.email = page.getByTestId(LoginPageLocators.email);
    this.password = page.getByTestId(LoginPageLocators.password);
    this.loginBtn = page.getByRole("button", {
      name: LoginPageLocators.loginBtn,
    });
  }

  async navigate() {
    await this.page.goto("/login");
  }

  async loginUser({ email, password }: { email: string; password: string }) {
    await this.email.fill(email);
    await this.password.fill(password);
    await this.loginBtn.click();
  }

  async expectOTPPopup() {
    await expect(
      this.page.getByRole("heading", { name: OTPPopupLocators.otpTitle })
    ).toBeVisible();
  }

  async verifyOTP(otp: string) {
    const otpInput = this.page.getByTestId(OTPPopupLocators.otpInput);
    await otpInput.fill(otp);
    const otpSubmitBtn = this.page.getByTestId(OTPPopupLocators.otpSubmitBtn);
    await otpSubmitBtn.click();
  }

  async compareFirstName(expectedName: string) {
    const actualName = await this.page.getByTestId(HomePageLocators.username);
    await expect(actualName).toHaveText(expectedName);
  }

  async loginViaGoogle() {
    const googleBtn = this.page.getByTestId(LoginPageLocators.googleBtn);

    await googleBtn.click();
    await expect(this.page).toHaveURL(/accounts\.google\.com/);
  }
}
