const http = require('http');

const PORT = process.env.PORT || 3000;
const PROJECT = process.env.EDGEONE_PROJECT_NAME || 'Yunhe Project';

const server = http.createServer((req, res) => {
    // 健康检查接口
    if (req.url === '/health') {
        res.writeHead(200);
        res.end('OK');
        return;
    }

    // 状态展示页面
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>EdgeOne Status: ${PROJECT}</title>
            <style>
                body { font-family: sans-serif; background: #0f172a; color: #f8fafc; display: flex; justify-content: center; align-items: center; height: 100vh; margin: 0; }
                .card { background: #1e293b; padding: 2rem; border-radius: 1rem; box-shadow: 0 25px 50px -12px rgba(0,0,0,0.5); text-align: center; border: 1px solid #334155; }
                .status { color: #22c55e; font-weight: bold; font-size: 1.2rem; margin-top: 1rem; }
                .time { color: #94a3b8; font-size: 0.8rem; margin-top: 0.5rem; }
            </style>
        </head>
        <body>
            <div class="card">
                <div style="font-size: 3rem;">🚀</div>
                <h1 style="margin: 0;">${PROJECT}</h1>
                <p style="color: #94a3b8;">Deployment Status</p>
                <div class="status">● DEPLOYED TO EDGEONE</div>
                <div class="time">Last deployed at: ${new Date().toLocaleString('zh-CN')}</div>
            </div>
        </body>
        </html>
    `);
});

server.listen(PORT, () => {
    console.log(`[${new Date().toISOString()}] Monitor running on port ${PORT}`);
});