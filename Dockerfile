# ==========================================
# 阶段 1: 基础环境构建
# ==========================================
FROM node:20-alpine AS builder

WORKDIR /app

# 安装必要的系统工具，确保 Alpine 兼容性
RUN apk add --no-cache libc6-compat git curl

# ==========================================
# 阶段 2: 依赖安装 (含 npm 缓存优化)
# ==========================================
COPY package.json package-lock.json* ./

# 安装 EdgeOne CLI 全局工具
RUN npm install -g edgeone

# 使用缓存挂载加速 npm ci
# 这会将 npm 缓存保存在宿主机，避免每次下载重复的包
RUN --mount=type=cache,target=/root/.npm \
    npm ci

# ==========================================
# 阶段 3: 源代码构建 (含 Astro cacheDir 优化)
# ==========================================
COPY . .

# 使用缓存挂载持久化 Astro 构建产物
# 注意：target 路径 /app/.astro_cache 必须与下文中 astro.config.mjs 的设置一致
RUN --mount=type=cache,target=/app/.astro_cache \
    npm run build

# ==========================================
# 阶段 4: 运行时配置
# ==========================================
ENV CI=true
ENV PORT=3000

# 暴露监控看板端口
EXPOSE 3000

# 注入并启动部署编排脚本
COPY deploy-wrapper.cjs /app/deploy-wrapper.cjs

CMD ["node", "/app/deploy-wrapper.cjs"]