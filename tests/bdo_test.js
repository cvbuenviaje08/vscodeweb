const fs = require('fs');
const path = require('path');

const screenshotDir = '/workspaces/vscodeweb/screenshot';
const reportDir = '/workspaces/vscodeweb/report';
const reportFile = path.join(reportDir, 'test-report.html');

describe('BDO Online Banking - Page Load Test', function () {
    this.timeout(300000); // 5 minutes

    it('should open BDO Online Banking and validate full page readiness', async function () {
        const caps = browser.capabilities;
        const device = caps.deviceName || caps.browserName || 'unknown-device';
        const os = caps.os || caps.platformName || 'unknown-os';
        const browserName = caps.browserName || 'unknown-browser';
        const isMobile = /ios|android/i.test(os) || /safari/i.test(browserName) || /chrome/i.test(browserName);

        let status = 'passed';
        let title = 'N/A';
        let screenshotName = 'N/A';
        let softFailNote = '';

        try {
            await browser.url('https://www.onlinebanking.bdo.com.ph/');

            // 1️⃣ DOM + URL ready (soft-fail for mobile)
            try {
                await browser.waitUntil(
                    async () => {
                        const readyState = await browser.execute(() => document.readyState);
                        const currentUrl = await browser.getUrl();
                        return readyState === 'complete' && currentUrl.includes('bdo.com.ph');
                    },
                    { timeout: isMobile ? 90000 : 45000 }
                );
            } catch (domErr) {
                if (isMobile) {
                    softFailNote += '⚠ Mobile DOM may not be fully rendered; continuing as soft-fail<br/>';
                } else {
                    throw domErr;
                }
            }

            // 2️⃣ Detect BLOCKED / SECURITY pages
            const pageContent = await browser.execute(() => document.body.innerText.toLowerCase());
            if (
                pageContent.includes('access denied') ||
                pageContent.includes('security check') ||
                pageContent.includes('unusual activity') ||
                pageContent.includes('verify you are human')
            ) {
                throw new Error('Blocked / security page detected');
            }

            // 3️⃣ Detect MAINTENANCE page
            if (
                pageContent.includes('maintenance') ||
                pageContent.includes('temporarily unavailable') ||
                pageContent.includes('we’ll be back soon')
            ) {
                throw new Error('Maintenance page detected');
            }

            // 4️⃣ Network idle approximation
            await browser.execute(() => {
                window.__lastNetworkActivity = Date.now();
                const origFetch = window.fetch;
                window.fetch = function () {
                    window.__lastNetworkActivity = Date.now();
                    return origFetch.apply(this, arguments);
                };
                const origXhrOpen = XMLHttpRequest.prototype.open;
                XMLHttpRequest.prototype.open = function () {
                    this.addEventListener('loadend', () => {
                        window.__lastNetworkActivity = Date.now();
                    });
                    origXhrOpen.apply(this, arguments);
                };
            });

            try {
                await browser.waitUntil(
                    async () => {
                        const last = await browser.execute(() => window.__lastNetworkActivity);
                        return Date.now() - last > 3000; // 3s network idle
                    },
                    { timeout: 45000 }
                );
            } catch (netErr) {
                softFailNote += '⚠ Network idle not reached; continuing as soft-fail<br/>';
            }

            // 5️⃣ Spinner wait (SOFT-FAIL for all mobile)
            try {
                await browser.waitUntil(
                    async () => {
                        return await browser.execute(() => {
                            const spinners = document.querySelectorAll(
                                '[class*="spinner"], [class*="loading"], [aria-busy="true"]'
                            );
                            return Array.from(spinners).every(el => {
                                const style = window.getComputedStyle(el);
                                return style.display === 'none' || style.visibility === 'hidden';
                            });
                        });
                    },
                    { timeout: 90000 } // extend to 90s for slow devices
                );
            } catch (spinnerErr) {
                softFailNote += '⚠ Spinner still visible (soft-fail)<br/>';
            }

            // 6️⃣ Capture title
            title = await browser.getTitle();

            // 7️⃣ Screenshot
            screenshotName = `${Date.now()}-${device.replace(/\s/g, '_')}-BDO.png`;
            const screenshotPath = path.join(screenshotDir, screenshotName);
            await browser.saveScreenshot(screenshotPath);

        } catch (err) {
            status = 'failed';
            throw err;
        } finally {
            // Prepare HTML report row
            if (!fs.existsSync(reportDir)) fs.mkdirSync(reportDir, { recursive: true });
            if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

            const finalStatus =
                status === 'passed' && softFailNote ? 'warning' : status;

            const rowHtml = `<tr>
<td>${device}</td>
<td>${os}</td>
<td>${browserName}</td>
<td>${title}${softFailNote ? `<br/><small>${softFailNote}</small>` : ''}</td>
<td class="${finalStatus}">${finalStatus.toUpperCase()}</td>
<td>${
                screenshotName !== 'N/A'
                    ? `<a href="../screenshot/${screenshotName}" target="_blank">View</a>`
                    : 'N/A'
            }</td>
</tr>`;

            fs.appendFileSync(reportFile, rowHtml);
        }
    });
});