# Excel Tutor

Ứng dụng desktop học Excel với giao diện thực hành giống Microsoft Excel.

## Công nghệ

- Vite + Vue 3
- Electron
- Element Plus UI
- MySQL
- Pinia (State Management)
- Tailwind CSS

## Cài đặt

```bash
npm install
```

## Chạy development

```bash
npm run dev
```

## Build production

```bash
npm run build
```

## Chạy ứng dụng Electron

```bash
npm run start
```

## Cấu hình MySQL

1. Tạo database bằng file `database/schema.sql`
2. Cập nhật thông tin kết nối trong file `.env`

## Tính năng

- Đăng nhập/Đăng xuất
- Dashboard với thống kê
- Quản lý chương trình học
- Danh sách bài tập
- Màn hình thực hành Excel với:
  - Grid giống Excel
  - Formula bar
  - Trợ lý AI
  - Hướng dẫn chi tiết
- Theo dõi tiến độ học tập
- Quản trị hệ thống (Admin)

## Màn hình

1. Login - Đăng nhập
2. Dashboard - Tổng quan
3. Programs - Danh sách chương trình
4. Assignments - Bài tập được giao
5. Practice - Thực hành Excel
6. Progress - Tiến độ học tập
7. Admin - Quản trị (chỉ admin)
