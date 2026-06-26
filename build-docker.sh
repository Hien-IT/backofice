#!/bin/bash

# Dừng kịch bản nếu có lỗi xảy ra
set -e

# Cấu hình mặc định
IMAGE_NAME="backoffice"
DEFAULT_TAG="latest"

# Lấy tag từ tham số truyền vào (nếu có), mặc định là "latest"
IMAGE_TAG="${1:-$DEFAULT_TAG}"
FULL_IMAGE_NAME="${IMAGE_NAME}:${IMAGE_TAG}"

echo "=========================================================="
echo "🚀 Bắt đầu build Docker Image: ${FULL_IMAGE_NAME}"
echo "=========================================================="

# Kiểm tra Docker daemon có đang hoạt động không
if ! docker info >/dev/null 2>&1; then
    echo "❌ Lỗi: Docker Daemon chưa chạy. Hãy khởi động Docker và thử lại."
    exit 1
fi

# Bật Docker BuildKit để tối ưu tốc độ build và hỗ trợ cú pháp nâng cao
export DOCKER_BUILDKIT=1

# Thực hiện build docker
echo "📦 Đang thực thi: docker build --pull -t ${FULL_IMAGE_NAME} ."
docker build --pull -t "${FULL_IMAGE_NAME}" .

echo "=========================================================="
echo "✅ Build Docker Image hoàn tất thành công!"
echo "🐳 Image: ${FULL_IMAGE_NAME}"
echo "=========================================================="
