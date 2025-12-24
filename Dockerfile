# ==========================================
# 阶段 1: 基础环境构建 [cite: 39]
# ==========================================
FROM node:20-alpine AS builder

WORKDIR /app

# 安装必要的系统工具 [cite: 39]
# libc6-compat 解决某些 npm 包（如 sharp）的兼容性问题
RUN apk add --no-cache libc6-compat git curl

# ==========================================
# 阶段 2: 依赖安装 [cite: 39, 40]
# ==========================================
COPY package.json package-lock.json* ./

# 安装 EdgeOne CLI 全局工具 [cite: 39, 40]
RUN npm install -g edgeone

# 使用 npm ci 确保构建环境依赖的一致性 [cite: 40]
RUN npm ci

# ==========================================
# 阶段 3: 源代码构建 [cite: 40]
# ==========================================
COPY . .

# 执行 Astro 构建命令生成 /dist 目录 [cite: 40]
RUN npm run build

# ==========================================
# 阶段 4: 运行时配置 [cite: 41]
# ==========================================
ENV CI=true
ENV PORT=3000

# 暴露端口用于监控看板与健康检查 [cite: 41]
EXPOSE 3000

# 注入部署编排脚本 [cite: 41]
COPY deploy-wrapper.cjs /app/deploy-wrapper.cjs

# 启动 Node.js 包装脚本 [cite: 41]
CMD ["node", "/app/deploy-wrapper.cjs"]