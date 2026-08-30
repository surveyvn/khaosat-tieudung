# Hướng dẫn tạo database Supabase cho EcoImpact

Bạn chỉ cần làm lần lượt các bước dưới đây. Không gửi `Secret key`, `service_role` hoặc mật khẩu database cho bất kỳ ai.

## Bước 1: Tạo tài khoản và project

1. Mở <https://supabase.com/dashboard>.
2. Đăng nhập bằng tài khoản Google hoặc email của bạn.
3. Nhấn **New project**.
4. Nếu được hỏi Organization, chọn Organization hiện có hoặc tạo một Organization miễn phí.
5. Nhập:
   - **Project name:** `EcoImpact`
   - **Database password:** tạo mật khẩu mạnh và lưu ở nơi an toàn. Ứng dụng không cần dùng mật khẩu này.
   - **Region:** chọn khu vực gần Việt Nam nhất mà Supabase đang cung cấp.
6. Nhấn **Create new project** và chờ project khởi tạo xong.

## Bước 2: Tạo bảng dữ liệu

1. Trong project Supabase, chọn **SQL Editor** ở thanh bên trái.
2. Nhấn **New query**.
3. Mở file `supabase/schema.sql` trong dự án EcoImpact.
4. Sao chép toàn bộ nội dung file, dán vào SQL Editor.
5. Nhấn **Run**.
6. Khi thành công, mở **Table Editor** và kiểm tra có bảng `survey_submissions`.

Thiết lập này chỉ cho ứng dụng thêm khảo sát mới. Người dùng web không được phép đọc, sửa hoặc xóa dữ liệu khảo sát của người khác.

## Bước 3: Lấy hai thông tin kết nối công khai

1. Mở **Project Settings**.
2. Mở **API Keys** hoặc nhấn **Connect** trên đầu trang.
3. Sao chép **Project URL**, có dạng:

   ```text
   https://abcdefghijk.supabase.co
   ```

4. Sao chép **Publishable key**, bắt đầu bằng:

   ```text
   sb_publishable_...
   ```

Publishable key được thiết kế để dùng trong ứng dụng web. Tuyệt đối không sao chép `Secret key`, `service_role` hoặc chuỗi bắt đầu bằng `sb_secret_`.

## Bước 4: Gửi thông tin cho người phát triển

Gửi đúng hai dòng:

```text
Project URL: https://...supabase.co
Publishable key: sb_publishable_...
```

Sau khi hai giá trị được điền vào `js/config.js`, cần build lại ứng dụng và gửi thử một khảo sát Điện cùng một khảo sát Thời trang.

## Bước 5: Xem dữ liệu khảo sát

1. Vào **Table Editor**.
2. Chọn bảng `survey_submissions`.
3. Mỗi dòng là một lượt khảo sát.
4. Cột `survey_code`:
   - `DIEN`: khảo sát Điện.
   - `MS`: khảo sát Thời trang.
5. Cột `answers` chứa câu trả lời và kết quả tổng hợp.
6. Cột `result` chứa kết quả TMR sau tính toán.

## Nếu SQL báo lỗi

- Kiểm tra đã sao chép toàn bộ file `schema.sql` chưa.
- Không chạy SQL trong một project mà bạn chỉ có quyền đọc.
- Chụp toàn bộ thông báo lỗi màu đỏ và gửi cho người phát triển; không gửi mật khẩu hoặc secret key.
