/**
 * deploy-wrapper.cjs
 * 云合智联 - EdgeOne 部署监控服务
 */
const http = require('http');

const PORT = process.env.PORT || 3000;
const PROJECT = process.env.EDGEONE_PROJECT_NAME || 'Yunhe-Project';

const server = http.createServer((req, res) => {
    // 1. Dokploy 健康检查接口
    if (req.url === '/health') {
        res.writeHead(200);
        res.end('OK');
        return;
    }

    // 2. 状态看板页面
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(`
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <title>部署监控 | ${PROJECT}</title>
            <style>
                body { font-family: -apple-system, system-ui, sans-serif; background: #0f172a; color: #f1f5f9; display: flex; justify-content: center; align-items: center; height: 100vh; margin: 0; }
                .card { background: #1e293b; padding: 2.5rem; border-radius: 1.25rem; box-shadow: 0 20px 25px -5px rgba(0,0,0,0.3); text-align: center; border: 1px solid #334155; max-width: 400px; }
                .icon { font-size: 3.5rem; margin-bottom: 1rem; }
                h1 { margin: 0.5rem 0; font-size: 1.5rem; color: #fff; }
                .status-group { margin: 1.5rem 0; padding: 1rem; background: #0f172a; border-radius: 0.75rem; border-left: 4px solid #22c55e; }
                .status-text { color: #22c55e; font-weight: bold; display: flex; align-items: center; justify-content: center; gap: 8px; }
                .footer { margin-top: 2rem; color: #64748b; font-size: 0.85rem; line-height: 1.5; }
                .dot { height: 10px; width: 10px; background: #22c55e; border-radius: 50%; display: inline-block; animation: pulse 2s infinite; }
                @keyframes pulse { 0% { opacity: 1; } 50% { opacity: 0.4; } 100% { opacity: 1; } }
            </style>
        </head>
        <body>
            <div class="card">
                <div class="icon">🚀</div>
                <h1>${PROJECT}</h1>
                <p style="color: #94a3b8;">边缘计算同步状态</p>
                
                <div class="status-group">
                    <div class="status-text">
                        <span class="dot"></span> 已同步至 EdgeOne 全球节点
                    </div>
                </div>

                <div class="footer">
                    管理方：杭州云合智联科技有限公司 <br>
                    同步时间：${new Date().toLocaleString('zh-CN')} <br>
                    容器端口：${PORT}
                </div>
            </div>
        </body>
        </html>
    `);
});

server.listen(PORT, () => {
    console.log(`[${new Date().toISOString()}] 监控服务已启动：http://localhost:${PORT}`);
    console.log(`[Target] EdgeOne Project: ${PROJECT}`);
});