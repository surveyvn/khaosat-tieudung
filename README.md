# EcoImpact

Ứng dụng sống xanh đa nền tảng gồm khảo sát tác động TMR, quản lý chi tiêu và khung Carbon AI.

## Chạy bản web

```bash
npm install
npm run build
python3 -m http.server 4173 -d dist
```

Mở `http://localhost:4173`.

## Chạy Android

Yêu cầu:

- Android Studio và Android SDK Platform 36
- JDK 21 trở lên
- Một máy ảo Android hoặc điện thoại đã bật USB debugging

Sau khi cài Android Studio:

```bash
npm install
npm run android:sync
npm run android:open
```

Trong Android Studio, chọn thiết bị rồi nhấn **Run**.

## Tạo APK debug

```bash
cd android
./gradlew assembleDebug
```

APK nằm tại `android/app/build/outputs/apk/debug/app-debug.apk`.

## Tạo Android App Bundle để đưa lên Google Play

Mở Android Studio và chọn **Build > Generate Signed Bundle / APK > Android App Bundle**. Không đưa keystore hoặc mật khẩu ký ứng dụng vào Git.

## Chạy iOS

Yêu cầu:

- Máy Mac đã cài bản Xcode đầy đủ từ App Store
- Mở Xcode một lần để chấp nhận giấy phép và cài các thành phần bổ sung
- Có iPhone Simulator trong **Xcode > Settings > Platforms**, hoặc iPhone thật đã bật Developer Mode

Sau khi cài Xcode, chọn Xcode làm bộ công cụ mặc định:

```bash
sudo xcode-select -s /Applications/Xcode.app/Contents/Developer
sudo xcodebuild -runFirstLaunch
```

Đồng bộ mã nguồn web và mở project iOS:

```bash
npm install
npm run ios:sync
npm run ios:open
```

Trong Xcode:

1. Chọn project **App**, target **App**, rồi mở **Signing & Capabilities**.
2. Bật **Automatically manage signing** và chọn Apple ID trong mục **Team**.
3. Giữ Bundle Identifier là `vn.ecoimpact.app`; nếu đã có ứng dụng khác dùng tên này trong tài khoản Apple, đổi sang một định danh riêng.
4. Chọn iPhone Simulator hoặc iPhone thật trên thanh công cụ rồi nhấn **Run**.

Sau mỗi lần sửa HTML, CSS hoặc JavaScript, chạy lại:

```bash
npm run ios:sync
```

### Đưa bản iOS lên TestFlight/App Store

Trong Xcode, chọn thiết bị **Any iOS Device (arm64)**, sau đó dùng **Product > Archive**. Khi archive hoàn thành, chọn **Distribute App > App Store Connect > Upload**. Việc phát hành cần tài khoản Apple Developer trả phí, khai báo quyền riêng tư và tạo ứng dụng tương ứng trên App Store Connect.

## Quy trình cập nhật giao diện

Sau khi sửa HTML, CSS hoặc JavaScript, luôn đồng bộ lại trước khi chạy Android:

```bash
npm run android:sync
```

## Cấu trúc chính

- `index.html`: giao diện ứng dụng
- `css/`: hệ thống giao diện responsive/mobile-first
- `js/`: khảo sát, chi tiêu, tài khoản demo và hành vi ứng dụng
- `android/`: project Android native do Capacitor quản lý
- `ios/`: project iOS native mở và ký bằng Xcode
- `capacitor.config.json`: cấu hình app/package/plugin native
- `dist/`: bản build web, được tạo tự động

## Trước khi phát hành

Tài khoản hiện tại vẫn là demo cục bộ. Trước khi phát hành cần thay bằng backend thật, thêm chính sách bảo mật, xác minh quyền truy cập dữ liệu, cấu hình OAuth và Google Play Billing.
