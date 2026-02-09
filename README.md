How to use custom configuration to run test?
  % npx playwright test tests/ClientAppPO.spec.js --config playwright.config1.js --project=firefox
If you don't specify project, Playwright will run test for all projects
  % npx playwright test tests/ClientAppPO.spec.js --config playwright.config1.js

How to test if a website is web responsive, or mobile friendly?
    {
      name: 'chrome',
      use: {
        browserName: 'chromium',
        headless: false,
        screenshot: 'on',
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

By default, Playwright run all files in parallel, but run the tests in a file sequentially.
You can modify the default 5 worker to a custom number, by defining workers.
    const config = {
        testDir: './tests',
        retries: 1,
        workers: 3,
    }
To run tests in a file in parallel, add the following configuration in the file.
    test.describe.configure({mode:'parallel'});    
To run all tests sequentially, and exit if any test fails, skipping the remaining tests.
    test.describe.configure({mode:'serial'});    

To skip a particular test, add test.skip in the file.

To select/tag the tests and run,
    test('@Web UI Controls', async ({ page }) => { });
    test('@API End to end order experience', async ({ page }) => {});
    % npx playwright test --grep @Web
    % npx playwright test --grep @API

To enable allure report, first install the plug-in, then use allure reporter.
Allure generates its report based on line (regular html) reporting, and stores its raw files under allure-results folder.
  % npm i -D @playwright/test allure-playwright
  % npm i -D allure-commandline
  % npx playwright test --grep @Web --reporter=line,allure-playwright
Allure generates its HTML report from the raw files and clean up the previous reports.
  % npx allure generate ./allure-results --clean
Use the following command to view allure report.
  % npx allure open ./allure-report

Other custome configuration includes, adding the following in package.json
  "scripts": {
    "regression": "npx playwright test",
    "webTests": "npx playwright test --grep @web",
    "APItests": "npx playwright test --grep @API",
    "SafariNewConfig": "npx playwright test --config playwright.config1.js --project=chrome"
  },  
Then run the custom configuration at the command line
  % npm run webTests  

To run a specific feature file,
% npx cucumber-js features/ErrorValidations.feature --exit

To run a specific tag,
 % npx cucumber-js --tags "@Regression" --exit 

Tagged hooks can be conditionally selected for execution on the tags of the scenario.
Before({tags:"@foo"}, async function () {});

Cucumber can run tests within a feature file in parallel, but it cannot run feature files in parallel.  The following command runs 2 scenarios at a time in Ecommerce.feature file.
% npx cucumber-js features/Ecommerce.feature --parallel 2 --exit

To generate html report,
% npx cucumber-js features/Ecommerce.feature --parallel 2 --exit --format html:cucumber-report.html

To retry,
% npx cucumber-js --tags "@Regression" --retry 1 --exit --format html:cucumber-report.html# playwright-automation
