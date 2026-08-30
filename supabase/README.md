# Kết nối Supabase

1. Tạo project tại Supabase.
2. Mở **SQL Editor**, dán và chạy toàn bộ `schema.sql`.
3. Vào **Settings → API Keys** và **Integrations → Data API**.
4. Điền Project URL và Publishable/Anon key vào `js/config.js`:

```js
const DATABASE_URL = "https://PROJECT_REF.supabase.co";
const DATABASE_ANON_KEY = "YOUR_PUBLISHABLE_KEY";
```

Không đặt `service_role` key trong web hoặc APK. Sau khi thay cấu hình, chạy `npm run build` và `npm run android:sync`.

Các bảng `impact_campaigns` và `impact_ledger` chỉ cho ứng dụng đọc chiến dịch đã công bố cùng bản ghi có bằng chứng. Không cấp quyền ghi hai bảng này cho người dùng; quản trị viên hoặc backend đáng tin cậy chịu trách nhiệm xác minh trước khi công bố. `impact_interests` chỉ cho phép người dùng đăng nhập quản lý lựa chọn của chính mình.

Khi chưa cấu hình database, khảo sát được giữ trong hàng đợi cục bộ và sẽ tự đồng bộ sau khi cấu hình/kết nối mạng.
