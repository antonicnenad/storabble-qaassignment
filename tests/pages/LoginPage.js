// Page Object Model for the Storabble Login Page
import { expect } from "@playwright/test";

export class LoginPage {
  constructor(page) {
    this.page = page;

    // LOCATORS
    this.emailInput = page.locator("#email"); // Email input field
    this.passwordInput = page.locator("#password"); // Password input field
    this.loginButton = page.locator('button[type="submit"].btn.btn--big-red'); // Login button
    this.forgotPasswordLink = page.locator('a[href="/en/reset-password"]'); // Forgot password link
    this.errorMessages = page.locator("span.invalid-msg"); // Generic error message container
  }

  // Navigate to the login page
  async goto() {
    await this.page.goto("https://st.storabble.etondigital.com/en/login", {
      waitUntil: "domcontentloaded",
    });
  }

  // Validate that we are on the login page by checking the main heading
  async assertLoginPageVisible() {
    await expect(this.page.locator("h3")).toHaveText("Log into your account");
  }

  // Accept cookie popup if it's visible
  async acceptCookiesIfVisible() {
    const cookieButton = this.page.getByRole("button", {
      name: "Ok",
      exact: true,
    });
    if (await cookieButton.isVisible()) {
      await cookieButton.click();
      await this.page
        .locator("div.cookie-wrapper")
        .waitFor({ state: "detached", timeout: 5000 });
    }
  }

  // Perform login with provided credentials
  async login(email, password) {
    // Fill credentials
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);

    // Try clicking login
    await this.loginButton.click();
  }

  // Click the "Forgot password?" link
  async clickForgotPassword() {
    await this.forgotPasswordLink.click();
  }

  // Retrieve visible error messages from the page
  async getErrorMessages() {
    return await this.errorMessages.allInnerTexts();
  }
}
