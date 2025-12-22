import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  reporter: 'html',
  timeout: 60000,

  use: {
    trace: 'on',
  },

  projects: [
    {
      name: 'bs-chrome-windows',
      use: {
        connectOptions: {
          wsEndpoint: `wss://cdp.browserstack.com/playwright?caps=${encodeURIComponent(
            JSON.stringify({
              browser: 'chrome',
              browser_version: 'latest',
              os: 'Windows',
              os_version: '11',

              // BrowserStack credentials (hard-coded)
              'browserstack.username': 'christianbuenvia_N9hiQw',
              'browserstack.accessKey': 'D5m6sDYaoMh4scFx834U',

              // Metadata shown in BrowserStack dashboard
              name: 'Playwright Codespaces Test',
              build: 'codespaces-browserstack',
            })
          )}`,
        },
      },
    },
  ],
});