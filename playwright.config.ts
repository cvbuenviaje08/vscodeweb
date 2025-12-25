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
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },

  projects: [
    // =====================================================
    // DESKTOP BROWSERS (TABLET VIEWPORT)
    // =====================================================
    {
      name: 'bs-chrome-windows-tablet',
      use: {
        viewport: { width: 768, height: 1024 },
        trace: 'on',
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
              build: 'codespaces-browserstack-desktop',
            })
          )}`,
        },
      },
    },

    {
      name: 'bs-edge-windows-tablet',
      use: {
        viewport: { width: 768, height: 1024 },
        trace: 'on',
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
              build: 'codespaces-browserstack-desktop',
            })
          )}`,
        },
      },
    },

    {
      name: 'bs-firefox-windows-tablet',
      use: {
        viewport: { width: 768, height: 1024 },
        trace: 'on',
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
              build: 'codespaces-browserstack-desktop',
            })
          )}`,
        },
      },
    },

    // =====================================================
    // REAL MOBILE DEVICES – iOS + Android
    // =====================================================
    {
      name: 'bs-iphone-17-ios26',
      use: {
        browserName: 'webkit',
        trace: 'off', // iOS does NOT support tracing
        screenshot: 'only-on-failure',
        video: 'retain-on-failure',
        connectOptions: {
          wsEndpoint: `wss://cdp.browserstack.com/playwright?caps=${encodeURIComponent(
            JSON.stringify({
              device: 'iPhone 17',
              os_version: '26',
              real_mobile: true,
              browser: 'playwright-webkit',
              'browserstack.username': 'christianbuenvia_N9hiQw',
              'browserstack.accessKey': 'D5m6sDYaoMh4scFx834U',
              name: 'iPhone 17 Test',
              build: 'codespaces-browserstack-mobile',
            })
          )}`,
        },
      },
    },

    {
      name: 'bs-galaxy-s25-android15',
      use: {
        browserName: 'chromium',
        trace: 'off', // Android real devices: disable tracing
        screenshot: 'only-on-failure',
        video: 'retain-on-failure',
        connectOptions: {
          wsEndpoint: `wss://cdp.browserstack.com/playwright?caps=${encodeURIComponent(
            JSON.stringify({
              device: 'Samsung Galaxy S25',
              os_version: '15',
              real_mobile: true,
              browser: 'playwright-chromium',
              'browserstack.username': 'christianbuenvia_N9hiQw',
              'browserstack.accessKey': 'D5m6sDYaoMh4scFx834U',
              name: 'Galaxy S25 Test',
              build: 'codespaces-browserstack-mobile',
            })
          )}`,
        },
      },
    },
  ],
});