# Hướng dẫn Khởi động Nhanh (Quickstart) cho Lập trình viên mới

Chào mừng bạn đến với dự án **Backoffice**! Đây là tài liệu hướng dẫn nhanh giúp bạn thiết lập môi trường phát triển cục bộ và làm quen với các câu lệnh cơ bản.

---

## 📋 1. Yêu cầu Hệ thống (Prerequisites)

Trước khi bắt đầu, hãy đảm bảo máy tính của bạn đã cài đặt các công cụ sau:
* **Node.js**: Phiên bản `22` (Khuyến nghị sử dụng NVM để quản lý).
* **pnpm**: Phiên bản `>=10.0.0` và `<11.0.0`.
* **Cơ sở dữ liệu**: SQLite được cấu hình mặc định giúp dev dễ dàng chạy thử mà không cần cài đặt SQL Server/Postgres cục bộ.

---

## 🛠️ 2. Các bước Thiết lập Môi trường

### Bước 1: Clone dự án và cài đặt dependencies
Sử dụng `pnpm` để cài đặt tất cả các gói trong Monorepo:
```bash
pnpm install
```

### Bước 2: Cấu hình biến môi trường (`.env`)
Dự án đã định cấu hình sẵn file môi trường mẫu. Tạo file `.env` ở thư mục gốc:
```bash
cp .env.example .env  # Hoặc tự tạo nếu không có sẵn
```

Nội dung `.env` mặc định phục vụ phát triển cục bộ với SQLite:
```ini
DB_CLIENT="sqlite3"
DB_FILENAME="./data.db"
KEY="backoffice-development-key-default-value-very-long"
SECRET="backoffice-development-secret-default-value-very-long"
ADMIN_EMAIL="admin@backoffice.io"
ADMIN_PASSWORD="password"
MARKETPLACE_REGISTRY="https://registry.directus.io"
```

### Bước 3: Khởi động máy chủ phát triển (Dev Server)
Để khởi động cả Backend API và Frontend Dashboard cùng lúc, hãy chạy script hỗ trợ:
```bash
./dev.sh
```
*Script này sẽ chạy `pnpm build` để build các package dùng chung trước, sau đó chạy `pnpm --filter @backoffice/api dev` với chế độ tự động phục vụ Frontend (`SERVE_APP=true`).*

Sau khi khởi động thành công, bạn có thể truy cập dashboard trên trình duyệt qua URL hiển thị ở terminal (mặc định thường là `http://localhost:8055`).

### Bước 4: Đăng nhập Dashboard
Sử dụng tài khoản admin được định nghĩa trong `.env`:
* **Email**: `admin@backoffice.io`
* **Mật khẩu**: `password`

---

## 💻 3. Các câu lệnh phát triển thường dùng

Các câu lệnh sau được chạy ở thư mục gốc của monorepo:

* **Khởi động server phát triển**:
  ```bash
  ./dev.sh
  ```
* **Build toàn bộ các package**:
  ```bash
  pnpm build
  ```
* **Định dạng code (Formatter)**:
  ```bash
  pnpm format
  ```
* **Kiểm tra lỗi tĩnh (Linter & Stylelint)**:
  ```bash
  pnpm lint
  pnpm lint:style
  ```
* **Chạy Unit/Integration Tests**:
  ```bash
  pnpm test
  ```

---

## 📂 4. Cấu trúc thư mục Monorepo

* `/api`: Chứa mã nguồn máy chủ Express Backend.
* `/app`: Chứa mã nguồn giao diện Dashboard sử dụng Vue 3 & Vite.
* `/sdk`: SDK hỗ trợ kết nối client JS/TS độc lập.
* `/packages`: Các thư viện tiện ích dùng chung (Stores, Storage drivers, Utils, Schema...).
* `/tests`: Kiểm thử tích hợp dạng Blackbox.
