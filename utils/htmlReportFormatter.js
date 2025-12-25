const fs = require('fs');
const path = require('path');

const reportDir = '/workspaces/vscodeweb/report';
const reportFile = path.join(reportDir, 'test-report.html');

function ensureReportDir() {
    if (!fs.existsSync(reportDir)) {
        fs.mkdirSync(reportDir, { recursive: true });
    }
}

function initReport() {
    ensureReportDir();

    fs.writeFileSync(
        reportFile,
        `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Automation Test Report</title>
<style>
    body {
        font-family: Arial, Helvetica, sans-serif;
        background: #f5f7fa;
        padding: 20px;
    }
    h1 {
        color: #1f2937;
    }
    .summary {
        margin-bottom: 20px;
        padding: 15px;
        background: white;
        border-radius: 6px;
        box-shadow: 0 2px 6px rgba(0,0,0,0.1);
    }
    table {
        width: 100%;
        border-collapse: collapse;
        background: white;
        border-radius: 6px;
        overflow: hidden;
        box-shadow: 0 2px 6px rgba(0,0,0,0.1);
    }
    th {
        background: #2563eb;
        color: white;
        text-align: left;
        padding: 12px;
    }
    td {
        padding: 10px;
        border-bottom: 1px solid #e5e7eb;
    }
    tr:hover {
        background: #f9fafb;
    }
    .passed {
        color: #16a34a;
        font-weight: bold;
    }
    .failed {
        color: #dc2626;
        font-weight: bold;
    }
    a {
        color: #2563eb;
        text-decoration: none;
    }
    a:hover {
        text-decoration: underline;
    }
    footer {
        margin-top: 20px;
        color: #6b7280;
        font-size: 12px;
    }
</style>
</head>
<body>

<h1>BrowserStack Automation Report</h1>

<div class="summary" id="summary">
    <strong>Execution Summary</strong><br/>
    Total: <span id="total">0</span> |
    Passed: <span id="passed">0</span> |
    Failed: <span id="failed">0</span>
</div>

<table>
<thead>
<tr>
    <th>Device</th>
    <th>OS</th>
    <th>Browser</th>
    <th>Page Title</th>
    <th>Status</th>
    <th>Screenshot</th>
</tr>
</thead>
<tbody id="results">
`
    );
}

function appendResult({ device, os, browser, title, status, screenshotName }) {
    fs.appendFileSync(
        reportFile,
        `
<tr>
    <td>${device}</td>
    <td>${os}</td>
    <td>${browser}</td>
    <td>${title}</td>
    <td class="${status}">${status.toUpperCase()}</td>
    <td>
        <a href="../screenshot/${screenshotName}" target="_blank">View</a>
    </td>
</tr>
`
    );
}

function finalizeReport({ total, passed, failed }) {
    fs.appendFileSync(
        reportFile,
        `
</tbody>
</table>

<script>
    document.getElementById('total').innerText = '${total}';
    document.getElementById('passed').innerText = '${passed}';
    document.getElementById('failed').innerText = '${failed}';
</script>

<footer>
    Generated on ${new Date().toLocaleString()}
</footer>

</body>
</html>
`
    );
}

module.exports = {
    initReport,
    appendResult,
    finalizeReport
};