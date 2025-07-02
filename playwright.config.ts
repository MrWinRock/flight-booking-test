import { defineConfig, devices } from "@playwright/test";

import dotenv from "dotenv";
import path from "path";

const ENV = process.env.ENV || "prod";

dotenv.config({ path: path.resolve(__dirname, "configs", `.env.${ENV}`) });

const baseURL = process.env.BASE_URL || "https://localhost:3000";
console.log(`ENV: ${ENV} | BASE_URL: ${baseURL}`);

export default defineConfig({
  testDir: "./tests",

  use: {
    trace: "on-first-retry",
    headless: true,
    baseURL,
    screenshot: "only-on-failure",
    video: "retain-on-failure",
  },

  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },

    {
      name: "firefox",
      use: { ...devices["Desktop Firefox"] },
    },

    {
      name: "webkit",
      use: { ...devices["Desktop Safari"] },
    },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    {
      name: "Microsoft Edge",
      use: { ...devices["Desktop Edge"], channel: "msedge" },
    },
    {
      name: "Google Chrome",
      use: { ...devices["Desktop Chrome"], channel: "chrome" },
    },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
