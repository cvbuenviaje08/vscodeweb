import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  timeout: 60000,
  retries: 1,

  reporter: [
    ['html'],
    ['allure-playwright'],
  ],

  use: {
    trace: 'on',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },

  projects: [
    // -------------------------------
    // Chrome (Tablet) - Windows 11
    // -------------------------------
    {
      name: 'bs-chrome-windows-tablet',
      use: {
        viewport: { width: 768, height: 1024 },
        connectOptions: {
          wsEndpoint: `wss://cdp.browserstack.com/playwright?caps=${encodeURIComponent(
            JSON.stringify({
              browser: 'chrome',
              browser_version: 'latest',
              os: 'Windows',
              os_version: '11',
              'browserstack.username': 'christianbuenvia_N9hiQw',
              'browserstack.accessKey': 'D5m6sDYaoMh4scFx834U',
              name: 'Chrome Tablet Test',
              build: 'codespaces-browserstack',
            })
          )}`,
        },
      },
    },

    // -------------------------------
    // Edge (Tablet) - Windows 11
    // -------------------------------
    {
      name: 'bs-edge-windows-tablet',
      use: {
        viewport: { width: 768, height: 1024 },
        connectOptions: {
          wsEndpoint: `wss://cdp.browserstack.com/playwright?caps=${encodeURIComponent(
            JSON.stringify({
              browser: 'edge',
              browser_version: 'latest',
              os: 'Windows',
              os_version: '11',
              'browserstack.username': 'christianbuenvia_N9hiQw',
              'browserstack.accessKey': 'D5m6sDYaoMh4scFx834U',
              name: 'Edge Tablet Test',
              build: 'codespaces-browserstack',
            })
          )}`,
        },
      },
    },

    // -------------------------------
    // Firefox (Tablet) - Windows 11
    // -------------------------------
    {
      name: 'bs-firefox-windows-tablet',
      use: {
        viewport: { width: 768, height: 1024 },
        connectOptions: {
          wsEndpoint: `wss://cdp.browserstack.com/playwright?caps=${encodeURIComponent(
            JSON.stringify({
              browser: 'playwright-firefox',
              browser_version: 'latest',
              os: 'Windows',
              os_version: '11',
              'browserstack.username': 'christianbuenvia_N9hiQw',
              'browserstack.accessKey': 'D5m6sDYaoMh4scFx834U',
              name: 'Firefox Tablet Test',
              build: 'codespaces-browserstack',
            })
          )}`,
        },
      },
    },
  ],
});