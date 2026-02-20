const { devices } = require("@playwright/test");

const config = {
  testDir: './tests',
  retries: 1,
  workers: 3,
  /* Maximum time one test can run for. */
  timeout: 30 * 1000,
  expect: {
    timeout: 5000
  },

  projects: [
    {
      name: 'firefox',
      use: {
        browserName: 'firefox',
        headless: false, // set headless to false to see the browser actions, default is true which means the browser will run in the background without a UI
        screenshot: 'on',
        trace: 'on', // retain-on-failure
      }
    },
    {
      name: 'chrome',
      use: {
        browserName: 'chromium',
        headless: false,
        ignoreHttpsErrors: true, // accept SSL, click on Advenced and proceed
        permissions: ['geolocation'], // automatically agree if the browser wants to know your exact location
        screenshot: 'on',
        video: 'retain-on-failure',
        trace: 'on', // retain-on-failure, off
        viewport: { width: 720, height: 720 }
      }
    },
    {
      name: 'webkit', // iPhone 11 comes under this Safari family, which is WebKit
      use: {
        browserName: 'webkit',
        headless: false,
        screenshot: 'on',
        trace: 'on', // retain-on-failure, off
        ...devices['iPhone 11']
      }
    }
  ],

  reporter: 'html',
};

module.exports = config;