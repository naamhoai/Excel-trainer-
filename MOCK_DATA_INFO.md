# Mock Data Information

## Đang sử dụng Mock Data

Hiện tại ứng dụng đang chạy với mock data (dữ liệu giả) để test mà không cần backend.

## Demo Accounts

### Admin Account
- Email: `admin@classin.com`
- Password: `admin123`
- Role: Admin (full access)

### Teacher Account
- Email: `teacher@classin.com`
- Password: `teacher123`
- Role: Teacher

### Student Account
- Email: `student@classin.com`
- Password: `student123`
- Role: Student

## Chuyển sang Real API

Để chuyển sang sử dụng API thật từ backend:

1. Mở file `src/services/auth.js`
2. Đổi `const USE_MOCK = true;` thành `const USE_MOCK = false;`
3. Đảm bảo backend đang chạy tại `http://localhost:3000`
4. Restart frontend

## Mock Data Available

### Users
- 3 users với các role khác nhau (admin, teacher, student)

### Classes
- 2 classes: Mathematics 101, Physics 101

### Assignments
- 2 assignments cho Mathematics 101

### Progress
- Progress data cho student user

### Sessions
- 2 sessions (1 completed, 1 upcoming)

## Tính năng Mock

- ✅ Login với validation
- ✅ Register user mới
- ✅ Token authentication
- ✅ LocalStorage persistence
- ✅ Error handling
- ✅ Network delay simulation (500ms)

## Lưu ý

- Mock data được lưu trong memory, sẽ reset khi refresh page
- Registered users sẽ được thêm vào MOCK_USERS array tạm thời
- Token format: `mock-token-{timestamp}`
