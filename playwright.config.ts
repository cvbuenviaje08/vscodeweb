import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  reporter: 'html',
  timeout: 60000,
  retries: 1, // Retry failed tests once
  use: {
    trace: 'on',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
  projects: [
    // Chrome on Windows
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
    // Edge on Windows
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
    // Firefox on Windows
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