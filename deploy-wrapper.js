// 核心逻辑：执行 EdgeOne 部署并保活
const { exec } = require('child_process');
const http = require('http');
const PORT = process.env.PORT || 3000;
const TOKEN = process.env.EDGEONE_API_TOKEN;
const PROJECT = process.env.EDGEONE_PROJECT_NAME;

let deployState = { status: 'PENDING', logs: [], startTime: new Date() };

function runDeployment() {
    if (!TOKEN || !PROJECT) {
        deployState.status = 'FAILED';
        return console.error('缺少环境变量');
    }
    deployState.status = 'RUNNING';
    const command = `edgeone pages deploy ./dist -n "${PROJECT}" -t "${TOKEN}" --force`;
    const child = exec(command, { env: { ...process.env } });

    child.stdout.on('data', (data) => deployState.logs.push(data.toString()));
    child.on('close', (code) => {
        deployState.status = code === 0 ? 'SUCCESS' : 'FAILED';
    });
}

const server = http.createServer((req, res) => {
    if (req.url === '/health') { // 健康检查端点
        res.writeHead(200);
        return res.end('OK');
    }
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(`<h1>部署状态: ${deployState.status}</h1><pre>${deployState.logs.join('')}</pre>`);
});

server.listen(PORT, () => runDeployment());