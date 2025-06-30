import { test } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { CommonPage } from "../pages/CommonPage";
import { getOtpByUserId } from "../utils/redis/getOptByUserId";

let login: LoginPage;
let common: CommonPage;

test.describe("Login - Success Cases", () => {
  test.beforeEach(async ({ page }) => {
    login = new LoginPage(page);
    await login.navigate();
  });

  test.afterEach(async () => {});

  test("TC_LOGIN_01: Login with valid credentials @regression @smoke", async ({
    page,
  }) => {
    await login.loginUser({
      email: "mrwinrock11@gmail.com",
      password: "NongWinPassword1234!",
    });

    await login.expectOTPPopup();
    await login.verifyOTP("123456");

    await login.compareFirstName("Win");
  });

  test("TC_LOGIN_05: Google login @regression", async ({ page }) => {
    await login.loginViaGoogle();
  });
});

test.describe("Login - Fail Cases", () => {
  test.beforeEach(async ({ page }) => {
    login = new LoginPage(page);
    common = new CommonPage(page);
    await login.navigate();
  });

  test("TC_LOGIN_02: Login without email @regression", async ({ page }) => {
    await login.loginUser({
      email: "",
      password: "NongWinPassword1234!",
    });

    await common.expectErrorPopup(
      "LGN_2002",
      "Missing required information: flightId, email, password and otp are mandatory."
    );
  });

  test("TC_LOGIN_03: Login without password @regression", async ({ page }) => {
    await login.loginUser({
      email: "mrwinrock11@gmail.com",
      password: "",
    });

    await common.expectErrorPopup(
      "LGN_2002",
      "Missing required information: flightId, email, password and otp are mandatory."
    );
  });

  test("TC_LOGIN_04: Login with invalid email/password @regression", async ({
    page,
  }) => {
    await login.loginUser({
      email: "wrong@email.com",
      password: "WrongPassword1234!",
    });

    await common.expectErrorPopup(
      "LGN_2003",
      "The email you entered is incorrect. Please try again."
    );
  });

  test("TC_LOGIN_06: Login with invalid OTP & error popup @regression", async ({
    page,
  }) => {
    await login.loginUser({
      email: "mrwinrock11@gmail.com",
      password: "NongWinPassword1234!",
    });
    await login.expectOTPPopup();
    await login.verifyOTP("000000");

    await common.expectErrorPopup("OTP_1002", "Invalid OTP. Please try again.");
  });
});
