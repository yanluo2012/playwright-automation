// // @ts-check
// import { defineConfig, devices } from '@playwright/test';

// /**
//  * Read environment variables from file.
//  * https://github.com/motdotla/dotenv
//  */
// // import dotenv from 'dotenv';
// // import path from 'path';
// // dotenv.config({ path: path.resolve(__dirname, '.env') });

// /**
//  * @see https://playwright.dev/docs/test-configuration
//  */
// export default defineConfig({
//   testDir: './tests',
//   // Maximum time one test can run for.
//   timeout: 40 * 1000,
//   expect: {
//     /**
//      * Maximum time expect() should wait for the condition to be met.
//      * For example in `await expect(locator).toHaveText();`
//      */
//     timeout: 5000
//   },
//   /* Run tests in files in parallel */
//   fullyParallel: true,
//   /* Fail the build on CI if you accidentally left test.only in the source code. */
//   forbidOnly: !!process.env.CI,
//   /* Retry on CI only */
//   retries: process.env.CI ? 2 : 0,
//   /* Opt out of parallel tests on CI. */
//   workers: process.env.CI ? 1 : undefined,
//   /* Reporter to use. See https://playwright.dev/docs/test-reporters */
//   reporter: 'html',
//   /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
//   use: {
//     /* Base URL to use in actions like `await page.goto('')`. */
//     // baseURL: 'http://localhost:3000',

//     /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
//     trace: 'on-first-retry',
//     browserName: 'chromium',
//   },

//   /* Configure projects for major browsers */
//   projects: [
//     {
//       name: 'chromium',
//       use: { ...devices['Desktop Chrome'] },
//     },

//     // {
//     //   name: 'firefox',
//     //   use: { ...devices['Desktop Firefox'] },
//     // },

//     // {
//     //   name: 'webkit',
//     //   use: { ...devices['Desktop Safari'] },
//     // },

//     /* Test against mobile viewports. */
//     // {
//     //   name: 'Mobile Chrome',
//     //   use: { ...devices['Pixel 5'] },
//     // },
//     // {
//     //   name: 'Mobile Safari',
//     //   use: { ...devices['iPhone 12'] },
//     // },

//     /* Test against branded browsers. */
//     // {
//     //   name: 'Microsoft Edge',
//     //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
//     // },
//     // {
//     //   name: 'Google Chrome',
//     //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
//     // },
//   ],

//   /* Run your local dev server before starting the tests */
//   // webServer: {
//   //   command: 'npm run start',
//   //   url: 'http://localhost:3000',
//   //   reuseExistingServer: !process.env.CI,
//   // },
// });
// the above is the original content of playwright.config.js before edit

// the following is the edited content of playwright.config.js used in Rahul Shetty Course
// @ts-check
// const { devices } = require('@playwright/test');

const config = {
  testDir: './tests', // specify the folder where the tests are located
  retries: 0,

  /* Maximum time one test can run for. */
  timeout: 40 * 1000, // default is 30 seconds, here we set it to 40 seconds explicitly
  expect: {
    timeout: 6000 // default is 5000 ms, here we set it to 6000 ms explicitly
  },

  reporter: 'html', // specify the reporter to use, here we use the built-in HTML reporter to generate a report after the test run
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    browserName : 'chromium', // the most stable browser among the three supported by Playwright, others are firefox, webkit (playwright specific engine developed by safari)
    headless: false, // set headless to false to see the browser actions, default is true which means the browser will run in the background without a UI
    screenshot: 'on',
    trace: 'on', // retain-on-failure
  },
};

module.exports = config;