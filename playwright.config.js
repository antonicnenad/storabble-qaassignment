// playwright.config.js
import { defineConfig } from "@playwright/test";
import dotenv from "dotenv";
dotenv.config();

export default defineConfig({
  testDir: "./tests/specs",
  timeout: 30000,
  retries: 0,
  use: {
    baseURL: "https://st.storabble.etondigital.com/en",
    headless: true,
    viewport: { width: 1920, height: 1080 },
    ignoreHTTPSErrors: true,
    video: "retain-on-failure",
    trace: "on-first-retry",
    httpCredentials: {
      username: "storabble",
      password: "ed2023",
    },
  },
  reporter: [
    ["list"],
    [
      "playwright-qase-reporter",
      {
        mode: "testops",
        debug: false,
        testops: {
          api: {
            token: process.env.QASE_API_TOKEN,
          },
          project: "STL", // ovo je kod projekta u Qase
          run: {
            complete: true,
          },
        },
      },
    ],
  ],
});
