// Extending Playwright's test with HTTP auth credentials for Storabble staging
import { test as base } from "@playwright/test";

export const test = base.extend({
  context: async ({ browser }, use) => {
    const context = await browser.newContext({
      httpCredentials: {
        username: "storabble", // HTTP Auth username
        password: "ed2023", // HTTP Auth password
      },
    });
    await use(context);
    await context.close();
  },
});
