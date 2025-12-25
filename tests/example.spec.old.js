const fs = require('fs');
const path = require('path');

describe('Mobile Web Test - BrowserStack', function () {
    this.timeout(300000); // 5 minutes timeout

    it('should open SauceDemo page, print title and take screenshot', async function () {
        // Open URL
        await browser.url('https://www.saucedemo.com/');

        // Get page title
        const title = await browser.getTitle();

        // Print device/browser info
        const device = browser.capabilities.deviceName || browser.capabilities.browserName;
        const os = browser.capabilities.os || browser.capabilities.platformName || 'unknown';
        const browserName = browser.capabilities.browserName || 'unknown';
        console.log(`Device: ${device}, OS: ${os}, Browser: ${browserName}, Page title: ${title}`);

        // Take screenshot
        const screenshotPath = path.join(__dirname, `${device.replace(/\s/g, '_')}_screenshot.png`);
        await browser.saveScreenshot(screenshotPath);
        console.log(`Screenshot saved to: ${screenshotPath}`);
    });
});