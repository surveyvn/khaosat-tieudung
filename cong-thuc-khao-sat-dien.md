# Cong thuc tinh toan - Khao sat dien

File nay tom tat cong thuc dang duoc su dung trong cac file `js/data/surveys.js`, `js/core/tmr-calculator.js` va `js/data/impact-factors.js` cho phan **Khao sat dien**.

## 1. Du lieu dau vao

Nguoi dung cung cap cac nhom thong tin:

- So thanh vien ho gia dinh.
- Muc su dung dien trung binh moi thang, nhap theo mot trong hai cach:
  - So kWh/thang.
  - Tien dien/thang.
- So luong thiet bi dien tu chinh trong ho gia dinh.
- Muc su dung gas hang thang.

## 2. Quy doi tien dien sang kWh

Neu nguoi dung nhap truc tiep so kWh:

```text
kWh_thang = so_kWh_nguoi_dung_nhap
```

Neu nguoi dung nhap tien dien:

```text
kWh_thang = tien_dien_thang / gia_dien_moi_kWh
```

Gia dien mac dinh trong app:

```text
gia_dien_moi_kWh = 3.000 VND/kWh
```

Neu bang he so ben ngoai co gia tri `electricity_price_per_kwh`, app se uu tien dung gia tri ben ngoai.

## 3. Tinh dien nang hang nam

```text
kWh_nam = kWh_thang x 12
```

## 4. He so vat chat cua dien

He so mac dinh cua dien:

```text
abiotic = 0.53
biotic  = 0
earth   = 0
water   = 189
air     = 0.22
```

Chi so TMR chi cong 3 thanh phan:

```text
TMR_factor = abiotic + biotic + earth
```

Voi dien mac dinh:

```text
TMR_factor_dien = 0.53 + 0 + 0 = 0.53
```

Cong thuc TMR tu dien:

```text
TMR_dien_nam = kWh_nam x 0.53
```

## 5. Tinh TMR thiet bi dien

Moi thiet bi duoc tinh theo TMR vong doi va phan bo theo so nam su dung:

```text
TMR_thiet_bi_nam = so_luong_thiet_bi x TMR_vong_doi / so_nam_su_dung
```

Hien app dang cau hinh:

```text
includeDeviceUsePhase = false
```

Nghia la app **khong cong giai doan su dung thiet bi** de tranh tinh trung voi phan dien nang da nhap.

Bang he so mac dinh:

| Thiet bi | Vong doi | TMR vong doi dang dung |
|---|---:|---:|
| Tivi | 6 nam | 596.2 |
| Tu lanh | 15 nam | 1323.1 |
| May lanh | 15 nam | 2928.8 |
| Dien thoai | 6 nam | 6.17 |
| Laptop | 5 nam | 245.4 |
| Lo vi song | 9 nam | 325.3 |
| Bep dien va lo nuong | 19 nam | 512.4 |
| May giat | 12.5 nam | 1036 |

Vi du voi 1 tu lanh:

```text
TMR_tu_lanh_nam = 1 x 1323.1 / 15 = 88.21 kg/nam
```

## 6. Tinh TMR gas

Lua chon gas duoc quy doi:

```text
1 binh/thang -> 12 binh/nam
2 binh/thang -> 24 binh/nam
```

He so mac dinh cua gas:

```text
abiotic = 0.31
biotic  = 0
earth   = 0
water   = 1
air     = 0.8
```

TMR factor cua gas:

```text
TMR_factor_gas = 0.31 + 0 + 0 = 0.31
```

Cong thuc:

```text
TMR_gas_nam = so_binh_gas_nam x 0.31
```

## 7. Tong TMR cua ho gia dinh

Tong TMR cua ho gia dinh trong mot nam:

```text
TMR_ho_gia_dinh_nam = TMR_dien_nam + TMR_thiet_bi_nam + TMR_gas_nam
```

Trong do:

```text
TMR_thiet_bi_nam = tong TMR nam cua tat ca thiet bi
```

## 8. Quy doi theo dau nguoi

Ket qua cuoi cung hien thi la kg/nguoi/nam:

```text
TMR_nguoi_nam = TMR_ho_gia_dinh_nam / so_thanh_vien_ho_gia_dinh
```

Neu so thanh vien khong hop le, app dung mac dinh:

```text
so_thanh_vien_mac_dinh = 3
```

## 9. Vi du tinh nhanh

Gia su:

```text
Ho gia dinh co 3 nguoi
Dien: 100 kWh/thang
Gas: khong su dung
Thiet bi: khong nhap
```

Tinh dien hang nam:

```text
kWh_nam = 100 x 12 = 1200 kWh/nam
```

Tinh TMR dien:

```text
TMR_dien_nam = 1200 x 0.53 = 636 kg/nam
```

Quy doi theo dau nguoi:

```text
TMR_nguoi_nam = 636 / 3 = 212 kg/nguoi/nam
```

Ket qua hien thi:

```text
212 kg/nguoi/nam
0.21 tan/nguoi/nam
```

## 10. Luu y ve bang he so ben ngoai

App co the lay he so tu endpoint hoac Google Sheet CSV. Neu lay duoc he so ben ngoai, app uu tien he so ben ngoai. Neu khong lay duoc, app dung he so mac dinh trong `js/data/impact-factors.js`.

Phan hien thi giao dien co the viet `Dien`, `Thuc pham`, `Thoi trang`, nhung ma gui ve Google Sheet van giu:

```text
DIEN
TP
MS
```
