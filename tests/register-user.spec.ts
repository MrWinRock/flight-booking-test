import { test } from "@playwright/test";
import { RegisterPage } from "../pages/RegisterPage";
import { deleteUserByEmail } from "../utils/mongo/deleteUserByEmail";

test.describe("Register - Success Cases", () => {
  let email: string;

  test.beforeEach(async ({ page }) => {
    const register = new RegisterPage(page);
    await register.navigate();

    email = `nongwin${Date.now()}@example.com`;
  });

  test.afterEach(async () => {
    await deleteUserByEmail(email);
    console.log(`Deleted user with email: ${email}`);
  });

  test("TC_REG_01: Register with valid data @regression @smoke", async ({
    page,
  }) => {
    const register = new RegisterPage(page);
    await register.navigate();

    await register.registerUser({
      firstName: "Test",
      lastName: "User",
      email,
      phone: "0667778888",
      password: "Test@1234",
    });

    await register.expectSuccessPopupMessage();
  });
});

test.describe("Register - Fail Cases", () => {
  test("TC_REG_02: Register with existing email @regression", async ({
    page,
  }) => {
    const register = new RegisterPage(page);
    await register.navigate();

    await register.registerUser({
      firstName: "Test",
      lastName: "User",
      email: "testuser@example.com",
      phone: "0667778888",
      password: "Test@1234",
    });

    await register.expectErrorPopup(
      "REG_1005",
      "Email Already Exists: The email already exists in the system."
    );
  });

  test("TC_REG_03: Register with weak password(invalid format) @regression", async ({
    page,
  }) => {
    const register = new RegisterPage(page);
    await register.navigate();

    const weakPassword = "abc123";

    await register.registerUser({
      firstName: "Test",
      lastName: "User",
      email: `testuser${Date.now()}@example.com`,
      phone: "0667778888",
      password: weakPassword,
    });

    await register.expectErrorPopup(
      "REG_1006",
      `Password must meet the following requirements: 1. Length between 8 and 20 characters, 2. At least one uppercase letter (A-Z), 3. At least one lowercase letter (a-z), 4. At least one number (0-9), 5. At least one special character (e.g., !@#$%^&*(),.?":{}|<>).`
    );
  });

  test("TC_REG_04: Register with invalid phone number (too long/incorrect format) @regression", async ({
    page,
  }) => {
    const register = new RegisterPage(page);
    await register.navigate();

    const invalidPhone = "066777888888";

    await register.registerUser({
      firstName: "Test",
      lastName: "User",
      email: `testuser${Date.now()}@example.com`,
      phone: invalidPhone,
      password: "Test@1234",
    });

    await register.expectErrorPopup(
      "REG_1003",
      `Invalid Formats: ${invalidPhone}`
    );
  });

  test("TC_REG_05: Register with invalid first name (contains numbers) @regression", async ({
    page,
  }) => {
    const register = new RegisterPage(page);
    await register.navigate();

    const firstName = "1Test";

    await register.registerUser({
      firstName: firstName,
      lastName: "User",
      email: `testuser${Date.now()}@example.com`,
      phone: "0667778888",
      password: "Test@1234",
    });

    await register.expectErrorPopup(
      "REG_1003",
      `Invalid Formats: ${firstName}`
    );
  });

  test("TC_REG_06: Register with invalid last name (contains symbols or numbers) @regression", async ({
    page,
  }) => {
    const register = new RegisterPage(page);
    await register.navigate();

    const lastName = "User1";

    await register.registerUser({
      firstName: "Test",
      lastName: lastName,
      email: `testuser${Date.now()}@example.com`,
      phone: "0667778888",
      password: "Test@1234",
    });

    await register.expectErrorPopup("REG_1003", `Invalid Formats: ${lastName}`);
  });
});
