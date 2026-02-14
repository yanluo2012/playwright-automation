# Playwright Cucumber Test Automation Framework

A hybrid test automation framework combining Playwright's powerful browser automation capabilities with Cucumber's Behavior-Driven Development (BDD) approach. This framework enables both Playwright native testing and Cucumber BDD style testing with comprehensive reporting and parallel execution capabilities.

## 🚀 Features

- **Dual Framework Support**: Write tests in both Playwright native syntax and Cucumber BDD format
- **Cross-Browser Testing**: Test across Chromium, Firefox, WebKit, and mobile devices
- **Parallel Execution**: Run tests in parallel for faster feedback
- **Tag-Based Filtering**: Selectively run tests using tags
- **Custom Configuration**: Flexible configuration management for different environments
- **Allure Reporting**: Beautiful and interactive test reports
- **Mobile Testing**: Test responsiveness and mobile-friendly websites
- **Retry Mechanism**: Automatic retry for flaky tests

## 🛠 Installation

```bash
# Clone the repository
git clone <repository-url>

# Install dependencies
npm install

# Install Playwright browsers
npx playwright install

# Install Cucumber (if not already installed)
npm install @cucumber/cucumber

# Install Allure reporting (optional)
npm i -D @playwright/test allure-playwright
npm i -D allure-commandline
```
## 📁 Directory Details

| Path | Purpose |
|------|---------|
| `features/` | Contains Gherkin feature files describing test scenarios in BDD format |
| `step_definitions/` | JavaScript implementations of the Gherkin steps |
| `tests/` | Traditional Playwright test specs (non-BDD) |
| `playwright.config.js` | Base configuration for Playwright tests |
| `playwright.config1.js` | Alternative configuration for different test environments |

## 🎯 Running Tests
### Basic Execution
```bash
# Run all tests
npx playwright test

# Run a specific test file
npx playwright test tests/ClientAppPO.spec.js

# Run with custom config
npx playwright test tests/ClientAppPO.spec.js --config playwright.config1.js

# Run with specific project
npx playwright test tests/ClientAppPO.spec.js --config playwright.config1.js --project=firefox
```
### Tag-Based Execution/Skipping Tests
```bash
// In your test file
test('@Web UI Controls', async ({ page }) => {
  // test implementation
});
# Run only @Web tagged tests
npx playwright test --grep @Web
```
```bash
// Skip a specific test
test.skip('Test to skip', async ({ page }) => {
  // This test won't run
});
```
### Cucumber Tests
```bash
# Run a specific feature file
npx cucumber-js features/ErrorValidations.feature --exit

# Run tests with specific tag
npx cucumber-js --tags "@Regression" --exit

# Run scenarios in parallel
npx cucumber-js features/Ecommerce.feature --parallel 2 --exit
```
## ⚙️ Configuration
### Playwright Configuration
#### Create different configuration files for different environments:
#### playwright.config1.js
```javascript
const { devices } = require('@playwright/test');

const config = {
  testDir: './tests',
  retries: 1,
  workers: 3,
  projects: [
    {
      name: 'chrome',
      use: {
        browserName: 'chromium',
        headless: false,
        screenshot: 'on',
        trace: 'on',
        viewport: { width: 720, height: 720 }
      }
    },
    {
      name: 'webkit',
      use: {
        browserName: 'webkit',
        headless: false,
        screenshot: 'on',
        trace: 'on',
        ...devices['iPhone 11']
      }
    }
  ]
};

module.exports = config;
```
## Package.json Scripts
### Add custom scripts to package.json:
```json
{
  "scripts": {
    "regression": "npx playwright test",
    "webTests": "npx playwright test --grep @web",
    "APItests": "npx playwright test --grep @API",
    "SafariNewConfig": "npx playwright test --config playwright.config1.js --project=chrome",
    "cucumber-regression": "npx cucumber-js --tags \"@Regression\" --exit",
    "cucumber-report": "npx cucumber-js features/Ecommerce.feature --parallel 2 --exit --format html:cucumber-report.html"
  }
}
```
### Run custom scripts:
```bash
npm run webTests
npm run SafariNewConfig
```
## 📱 Mobile Testing & Responsiveness
### Test website responsiveness and mobile friendliness using device emulation:
```javascript
// Configure mobile testing in playwright.config.js
{
  name: 'webkit',
  use: {
    browserName: 'webkit',
    headless: false,
    screenshot: 'on',
    trace: 'on',
    ...devices['iPhone 11']  // Emulate iPhone 11
  }
}
```
## 🔄 Parallel Execution Control
### Global Parallel Configuration
```javascript
// playwright.config.js
const config = {
  workers: 3,  // Number of parallel workers (default: 5)
  // ... other config
};
```
### Test File Level Configuration
```javascript
By default, Playwright run all files in parallel, all tests in a file sequentially.
// Run tests in a file in parallel
test.describe.configure({ mode: 'parallel' });

// Run tests sequentially, exit on first failure
test.describe.configure({ mode: 'serial' });
```

## 🏷️ Tagged Hooks (Cucumber)
### Conditionally execute hooks based on scenario tags:
```javascript
const { Before } = require('@cucumber/cucumber');

Before({ tags: "@foo" }, async function () {
  // This will run only for scenarios tagged with @foo
  // Setup code here
});
```
## 📊 Reporting
### Allure Reports
```bash
# Run tests with Allure reporter
npx playwright test --grep @Web --reporter=line,allure-playwright

# Generate Allure report
npx allure generate ./allure-results --clean

# View Allure report
npx allure open ./allure-report
```
### Cucumber HTML Reports
```bash
# Generate HTML report during test execution
npx cucumber-js features/Ecommerce.feature --parallel 2 --exit --format html:cucumber-report.html

# Run with retry and generate report
npx cucumber-js --tags "@Regression" --retry 1 --exit --format html:cucumber-report.html
```
## 🔧 Advanced Configuration
### Retry Configuration
```javascript
// playwright.config.js
const config = {
  retries: 1,  // Retry failed tests once
  // ... other config
};
```
### Screenshot and Trace Configuration
```javascript
// In project configuration
{
  use: {
    screenshot: 'on',           // Take screenshot on test completion
    trace: 'on',                 // 'on', 'off', 'retain-on-failure'
    // ... other options
  }
}
```



