#!/bin/bash

# Nạp nvm nếu tồn tại
export NVM_DIR="$HOME/.nvm"
if [ -s "$NVM_DIR/nvm.sh" ]; then
    . "$NVM_DIR/nvm.sh"
    nvm use 22 || echo "Không thể chuyển sang Node v22 bằng nvm, sử dụng phiên bản hiện tại."
else
    echo "Không tìm thấy NVM. Sử dụng phiên bản Node hiện tại của hệ thống."
fi

# Tự động build dự án trước khi chạy
echo "Đang build dự án Backoffice..."
pnpm build

# Chạy máy chủ phát triển Backoffice
echo "Đang khởi chạy Backoffice Dev Server..."
exec pnpm --filter @backoffice/api dev
