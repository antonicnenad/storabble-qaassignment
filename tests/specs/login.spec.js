// Login test cases for Storabble Login functionality using Page Object Model
import { test } from "../fixtures/baseFixture";
import { expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { invalidLoginData, passwordResetData } from "../fixtures/loginData";

test.describe("Storabble Login - Automated Tests", () => {
  let loginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goto();

    // Confirm we are on the correct page
    await loginPage.assertLoginPageVisible();
    // Accept cookies if the popup is visible
    await loginPage.acceptCookiesIfVisible();
  });

  // Test Case: Submitting login form without filling email and password
  test("STL-03: Submit login form without entering email and password", async () => {
    const { email, password, expectedErrors } = invalidLoginData.emptyFields;
    await loginPage.login(email, password);
    const errors = await loginPage.getErrorMessages();
    expect(errors.filter((msg) => msg === expectedErrors[0])).toHaveLength(2);
  });

  // Test Case: Submitting login form with invalid email format
  test("STL-04: Login with invalid email format", async () => {
    const { email, password, expectedError } =
      invalidLoginData.invalidEmailFormat;
    await loginPage.login(email, password);
    const errors = await loginPage.getErrorMessages();
    expect(errors).toContain(expectedError);
  });

  // Test Case: Attempting login with an unregistered email
  test("STL-05: Login with unregistered email", async () => {
    const { email, password, expectedError } = invalidLoginData.unregistered;
    await loginPage.login(email, password);
    const errors = await loginPage.getErrorMessages();

    // Intentionally expecting the correct message even if the app doesn't return it
    expect(errors).toContain(expectedError);
  });

  // Test Case: Only email field filled
  test("STL-08: Login attempt with only email field filled", async () => {
    const { email, password, expectedError } = invalidLoginData.onlyEmail;
    await loginPage.login(email, password);
    const errors = await loginPage.getErrorMessages();
    expect(errors).toContain(expectedError);
  });

  // Test Case: Only password field filled
  test("STL-09: Login attempt with only password field filled", async () => {
    const { email, password, expectedError } = invalidLoginData.onlyPassword;
    await loginPage.login(email, password);
    const errors = await loginPage.getErrorMessages();
    expect(errors).toContain(expectedError);
  });

  // Test Case: Forgot password link works
  test("STL-10: Forgot password link opens password reset flow", async ({
    page,
  }) => {
    await loginPage.clickForgotPassword();
    await expect(page).toHaveURL(passwordResetData.expectedUrlPattern); // Use centralized pattern
  });
});
