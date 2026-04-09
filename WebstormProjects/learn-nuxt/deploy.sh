#!/bin/bash

# 配置
GITHUB_USER="h5-zjm"
IMAGE_NAME="ghcr.io/$GITHUB_USER/nuxt-app"
SERVER_IP="47.121.191.242"
SERVER_DIR="/opt/nuxt-app"

echo "=== 1. 构建镜像 ==="
docker compose build

echo "=== 2. 打 tag ==="
docker tag learn-nuxt-app $IMAGE_NAME:latest

echo "=== 3. 推送到 ghcr.io ==="
docker push $IMAGE_NAME:latest

echo "=== 4. 部署到服务器 ==="
ssh root@$SERVER_IP << 'ENDSSH'
mkdir -p /opt/nuxt-app
cd /opt/nuxt-app

# 拉取最新镜像
docker compose pull

# 重启服务
docker compose up -d

echo "部署完成！"
ENDSSH

echo "=== 部署完成！访问 http://$SERVER_IP:3000 ==="
