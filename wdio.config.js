exports.config = {
    //
    // ====================
    // BrowserStack credentials
    // ====================
    user: process.env.BROWSERSTACK_USERNAME || 'christianbuenvia_N9hiQw',
    key: process.env.BROWSERSTACK_ACCESS_KEY || 'D5m6sDYaoMh4scFx834U',

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
                deviceName: 'Samsung Galaxy S25',
                osVersion: '15',
                realMobile: true,
                sessionName: 'Galaxy S25 Test',
                buildName: 'codespaces-browserstack-mobile',
            },
        },
        {
            browserName: 'Safari',
            'bstack:options': {
                deviceName: 'iPhone 17',
                osVersion: '26',
                realMobile: true,
                sessionName: 'iPhone 17 Test',
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
        timeout: 300000, // 5 minutes
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
    // Hooks
    // ====================
    afterTest: async function (test, context, { error, result, duration, passed, retries }) {
        if (!passed) {
            // Attach screenshot to Allure report on failure
            const screenshot = await browser.takeScreenshot();
            const { addAttachment } = require('@wdio/allure-reporter').default;
            addAttachment('Screenshot on Failure', Buffer.from(screenshot, 'base64'), 'image/png');
        }
    },
};