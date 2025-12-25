const fs = require('fs');
const path = require('path');

const screenshotDir = '/workspaces/vscodeweb/screenshot';
const reportDir = '/workspaces/vscodeweb/report';
const reportFile = path.join(reportDir, 'test-report.html');

describe('Mobile Web Test - BrowserStack', function () {
    this.timeout(300000); // 5 minutes

    it('should open SauceDemo page, print title and take screenshot', async function () {
        const caps = browser.capabilities;
        const device = caps.deviceName || caps.browserName || 'unknown-device';
        const os = caps.os || caps.platformName || 'unknown-os';
        const browserName = caps.browserName || 'unknown-browser';

        let status = 'passed';
        let title = 'N/A';
        let screenshotName = 'N/A';

        try {
            await browser.url('https://www.saucedemo.com/');
            title = await browser.getTitle();

            screenshotName = `${device.replace(/\s/g, '_')}.png`;
            const screenshotPath = path.join(screenshotDir, screenshotName);
            await browser.saveScreenshot(screenshotPath);
        } catch (err) {
            status = 'failed';
            throw err;
        } finally {
            // Append row to report safely (works for multiple parallel workers)
            if (!fs.existsSync(reportDir)) fs.mkdirSync(reportDir, { recursive: true });
            if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

            const rowHtml = `<tr>
<td>${device}</td>
<td>${os}</td>
<td>${browserName}</td>
<td>${title}</td>
<td class="${status}">${status.toUpperCase()}</td>
<td>${
                screenshotName !== 'N/A'
                    ? `<a href="../screenshot/${screenshotName}" target="_blank">View</a>`
                    : 'N/A'
            }</td>
</tr>`;

            // Append without overwriting
            fs.appendFileSync(reportFile, rowHtml);
        }
    });
});