#!/bin/bash

# Dừng kịch bản nếu có lỗi xảy ra
set -e

# Cấu hình mặc định
IMAGE_NAME="hiennd23/backoffice"

# Lấy lựa chọn driver từ tham số đầu vào (mặc định là 'all')
DRIVER="${1:-all}"

# Khởi tạo giá trị mặc định cho các biến build-arg
INSTALL_PG="false"
INSTALL_MYSQL="false"
INSTALL_MSSQL="false"
INSTALL_ORACLE="false"
INSTALL_SQLITE="false"
INSTALL_REDIS="true" # Giữ mặc định bật Redis cho caching

case "${DRIVER}" in
    pg|postgres|postgresql)
        INSTALL_PG="true"
        IMAGE_TAG="pg"
        ;;
    mysql|mariadb)
        INSTALL_MYSQL="true"
        IMAGE_TAG="mysql"
        ;;
    mssql|sqlserver)
        INSTALL_MSSQL="true"
        IMAGE_TAG="mssql"
        ;;
    oracle|oracledb)
        INSTALL_ORACLE="true"
        IMAGE_TAG="oracle"
        ;;
    sqlite|sqlite3)
        INSTALL_SQLITE="true"
        IMAGE_TAG="sqlite"
        ;;
    all|latest)
        INSTALL_PG="true"
        INSTALL_MYSQL="true"
        INSTALL_MSSQL="true"
        INSTALL_ORACLE="true"
        INSTALL_SQLITE="true"
        IMAGE_TAG="latest"
        ;;
    *)
        # Nếu nhập tag tùy chỉnh khác, cài đặt tất cả các driver
        INSTALL_PG="true"
        INSTALL_MYSQL="true"
        INSTALL_MSSQL="true"
        INSTALL_ORACLE="true"
        INSTALL_SQLITE="true"
        IMAGE_TAG="${DRIVER}"
        echo "⚠️ Cảnh báo: Sử dụng Tag tùy chỉnh '${IMAGE_TAG}'. Cài đặt toàn bộ các driver."
        ;;
esac

FULL_IMAGE_NAME="${IMAGE_NAME}:${IMAGE_TAG}"

echo "=========================================================="
echo "🚀 Bắt đầu build Docker Image: ${FULL_IMAGE_NAME}"
echo "📦 Các driver được bật:"
echo "   - PostgreSQL: ${INSTALL_PG}"
echo "   - MySQL:      ${INSTALL_MYSQL}"
echo "   - SQL Server: ${INSTALL_MSSQL}"
echo "   - Oracle DB:  ${INSTALL_ORACLE}"
echo "   - SQLite:     ${INSTALL_SQLITE}"
echo "   - Redis:      ${INSTALL_REDIS}"
echo "=========================================================="

# Kiểm tra Docker daemon có đang hoạt động không
if ! docker info >/dev/null 2>&1; then
    echo "❌ Lỗi: Docker Daemon chưa chạy. Hãy khởi động Docker và thử lại."
    exit 1
fi

# Bật Docker BuildKit để tối ưu tốc độ build và hỗ trợ cú pháp nâng cao
export DOCKER_BUILDKIT=1

# Thực hiện build docker
echo "📦 Đang thực thi build..."
docker build --pull \
    --build-arg INSTALL_PG="${INSTALL_PG}" \
    --build-arg INSTALL_MYSQL="${INSTALL_MYSQL}" \
    --build-arg INSTALL_MSSQL="${INSTALL_MSSQL}" \
    --build-arg INSTALL_ORACLE="${INSTALL_ORACLE}" \
    --build-arg INSTALL_SQLITE="${INSTALL_SQLITE}" \
    --build-arg INSTALL_REDIS="${INSTALL_REDIS}" \
    -t "${FULL_IMAGE_NAME}" .

echo "📤 Đang push Docker Image"
docker push "${FULL_IMAGE_NAME}"

echo "=========================================================="
echo "✅ Build Docker Image hoàn tất thành công!"
echo "🐳 Image: ${FULL_IMAGE_NAME}"
echo "=========================================================="
