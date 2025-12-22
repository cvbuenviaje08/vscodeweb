import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 60000,
  projects: [
    {
      name: 'bs-chrome-windows',
      use: {
        connectOptions: {
          // We are putting the credentials directly into the URL here to avoid any encoding errors
          wsEndpoint: `wss://cdp.browserstack.com/playwright?caps={"browser":"chrome","os":"Windows","os_version":"11","browserstack.username":"christianbuenvia_N9hiQw","browserstack.accessKey":"YOUR_ACTUAL_KEY_HERE"}`
        },
      },
    },
  ],
});
