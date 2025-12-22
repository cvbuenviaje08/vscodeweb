import { defineConfig, devices } from '@playwright/test';

// Get credentials from your terminal environment variables
const BS_USER = process.env.BROWSERSTACK_USERNAME || 'christianbuenvia_N9hiQw';
const BS_KEY = process.env.BROWSERSTACK_ACCESS_KEY || 'D5m6sDYaoMh4scFx834U';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: 1, // Keep at 1 for tablet stability
  reporter: 'html',

  use: {
    trace: 'on',
    screenshot: 'on',
  },

  projects: [
    // 1. THIS IS THE MISSING PROJECT
    {
      name: 'bs-chrome-windows',
      use: {
        connectOptions: {
          wsEndpoint: `wss://cdp.browserstack.com/playwright?caps=${encodeURIComponent(JSON.stringify({
            'browser': 'chrome',
            'browser_version': 'latest',
            'os': 'Windows',
            'os_version': '11',
            'browserstack.username': BS_USER,
            'browserstack.accessKey': BS_KEY,
            'name': 'Tablet Playwright Run'
          }))}`,
        },
      },
    },
    // Keep local projects for offline/headless testing
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
