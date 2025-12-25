const fs = require('fs');
const path = require('path');

const screenshotDir = '/workspaces/vscodeweb/screenshot';
const reportDir = '/workspaces/vscodeweb/report';
const reportFile = path.join(reportDir, 'test-report.html');

exports.config = {
    //
    // ====================
    // BrowserStack credentials (hard-coded)
    // ====================
    user: 'christianbuenvia_N9hiQw',
    key: 'D5m6sDYaoMh4scFx834U',

    //
    // ====================
    // Specify Test Files
    // ====================
    specs: ['./tests/example.spec.js'],
    maxInstances: 2,

    //
    // ====================
    // Capabilities
    // ====================
    capabilities: [
        {
            browserName: 'Chrome',
            'bstack:options': {
                deviceName: 'Samsung Galaxy S24',
                osVersion: '14',
                realMobile: true,
                sessionName: 'Galaxy S24 Test',
                buildName: 'codespaces-browserstack-mobile',
            },
        },
        {
            browserName: 'Safari',
            'bstack:options': {
                deviceName: 'iPhone 15',
                osVersion: '17',
                realMobile: true,
                sessionName: 'iPhone 15 Test',
                buildName: 'codespaces-browserstack-mobile',
            },
        },
    ],

    //
    // ====================
    // Test Framework
    // ====================
    framework: 'mocha',
    mochaOpts: {
        ui: 'bdd',
        timeout: 300000,
    },

    //
    // ====================
    // Services
    // ====================
    services: ['browserstack'],

    //
    // ====================
    // Reporters
    // ====================
    reporters: [
        'spec',
        ['allure', {
            outputDir: './allure-results',
            disableWebdriverStepsReporting: true,
            disableWebdriverScreenshotsReporting: false,
        }],
    ],

    //
    // ====================
    // WDIO Hooks for parallel-safe HTML report
    // ====================
    onPrepare: function () {
        if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });
        if (!fs.existsSync(reportDir)) fs.mkdirSync(reportDir, { recursive: true });

        // Initialize HTML report (only once)
        fs.writeFileSync(
            reportFile,
            `<!DOCTYPE html>
<html>
<head>
<title>Test Execution Report</title>
<style>
body { font-family: Arial, Helvetica, sans-serif; background: #f5f7fa; padding: 20px; }
h1 { color: #1f2937; }
table { border-collapse: collapse; width: 100%; background: white; border-radius: 6px; overflow: hidden; box-shadow: 0 2px 6px rgba(0,0,0,0.1);}
th { background: #2563eb; color: white; padding: 12px; text-align: left;}
td { padding: 10px; border-bottom: 1px solid #e5e7eb;}
tr:hover { background: #f9fafb;}
.passed { color: #16a34a; font-weight: bold;}
.failed { color: #dc2626; font-weight: bold;}
a { color: #2563eb; text-decoration: none;}
a:hover { text-decoration: underline;}
</style>
</head>
<body>
<h1>BrowserStack Automation Report</h1>
<table>
<thead>
<tr>
<th>Device</th><th>OS</th><th>Browser</th><th>Page Title</th><th>Status</th><th>Screenshot</th>
</tr>
</thead>
<tbody>
`
        );
    },

    onComplete: function () {
        // Finalize HTML report after all workers complete
        fs.appendFileSync(
            reportFile,
            `</tbody></table>
<footer style="margin-top:20px; font-size:12px; color:#6b7280;">
Generated on ${new Date().toLocaleString()}
</footer>
</body>
</html>`
        );
    },

    afterTest: async function (test, context, { error, result, duration, passed, retries }) {
        if (!passed) {
            // Attach screenshot to Allure report on failure
            const screenshot = await browser.takeScreenshot();
            const { addAttachment } = require('@wdio/allure-reporter').default;
            addAttachment('Screenshot on Failure', Buffer.from(screenshot, 'base64'), 'image/png');
        }
    },
};