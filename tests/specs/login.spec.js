// Login test cases for Storabble Login functionality using Page Object Model
import { test } from "../fixtures/baseFixture";
import { expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import {
  homePageData,
  loginData,
  passwordResetData,
} from "../fixtures/loginData";
import { qase } from "playwright-qase-reporter";

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

  // Test Case: Submitting login form with valid credentials
  test("STL-01: Submit login form registrated user", async ({ page }) => {
    qase.id(1);
    // Using the invalid login data for empty fields
    const { email, password, expectedErrors } = loginData.registered;
    await loginPage.login(email, password);
    // Confirm we are on the correct page
    await loginPage.assertHomePageVisible();
    await expect(page).toHaveURL(homePageData.expectedUrlPattern);
  });

  // Test Case: Submitting login form without filling email and password
  test("STL-03: Submit login form without entering email and password", async () => {
    qase.id(3);
    // Using the invalid login data for empty fields
    const { email, password, expectedErrors } = loginData.emptyFields;
    await loginPage.login(email, password);
    const errors = await loginPage.getErrorMessages();
    expect(errors.filter((msg) => msg === expectedErrors[0])).toHaveLength(2);
  });

  // Test Case: Submitting login form with invalid email format
  test("STL-04: Login with invalid email format", async () => {
    qase.id(4);
    // Using the invalid email format data
    const { email, password, expectedError } = loginData.invalidEmailFormat;
    await loginPage.login(email, password);
    const errors = await loginPage.getErrorMessages();
    expect(errors).toContain(expectedError);
  });

  // Test Case: Attempting login with an unregistered email
  test.fail("STL-05: Login with unregistered email", async () => {
    qase.id(5);
    // Using the invalid login data for unregistered email
    const { email, password, expectedError } = loginData.unregistered;
    await loginPage.login(email, password);
    const errors = await loginPage.getErrorMessages();

    // Intentionally expecting the correct message even if the app doesn't return it
    expect(errors).toContain(expectedError);
  });

  // Test Case: Only email field filled
  test("STL-08: Login attempt with only email field filled", async () => {
    qase.id(8);
    // Using the invalid login data for only email filled
    const { email, password, expectedError } = loginData.onlyEmail;
    await loginPage.login(email, password);
    const errors = await loginPage.getErrorMessages();
    expect(errors).toContain(expectedError);
  });

  // Test Case: Only password field filled
  test("STL-09: Login attempt with only password field filled", async () => {
    qase.id(9);
    // Using the same data structure for consistency
    const { email, password, expectedError } = loginData.onlyPassword;
    await loginPage.login(email, password);
    const errors = await loginPage.getErrorMessages();
    expect(errors).toContain(expectedError);
  });

  // Test Case: Forgot password link works
  test("STL-10: Forgot password link opens password reset flow", async ({
    page,
  }) => {
    qase.id(10);
    // Navigate to the forgot password page
    await loginPage.clickForgotPassword();
    await expect(page).toHaveURL(passwordResetData.expectedUrlPattern);
  });
});
