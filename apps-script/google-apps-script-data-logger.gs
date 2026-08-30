const SPREADSHEET_ID = "1ZDb6oRDBDY6YQ-O8V9Z_G4ilNTL0VCB5_1u9XKPU7lc";
// Cấu hình bằng Script Properties khi triển khai, không lưu secret trong Git.
const SECRET_KEY = typeof PropertiesService !== "undefined"
  ? PropertiesService.getScriptProperties().getProperty("SHEET_LOGGER_SECRET") || ""
  : "";

const SYSTEM_COLUMNS = [
  "submittedAt",
  "clientSubmittedAt",
  "submissionId",
  "surveyCode",
  "surveyName",
  "respondentId",
  "pageUrl",
  "source",
  "appVersion",
  "platform"
];

const SURVEY_SHEET_NAMES = {
  TP: "01_TP_ThucPham",
  DIEN: "02_DIEN_Dien",
  NUOC: "03_NUOC_Nuoc",
  RAC: "04_RAC_RacThai",
  DC: "05_DC_DiChuyen",
  MS: "06_MS_MuaSam",
  TBI: "07_TBI_ThietBi",
  TTC: "08_TTC_ThongTinChung"
};

const SURVEY_NAMES = {
  TP: "Thực phẩm",
  DIEN: "Điện",
  NUOC: "Nước",
  RAC: "Rác thải",
  DC: "Di chuyển",
  MS: "Mua sắm",
  TBI: "Thiết bị",
  TTC: "Thông tin chung"
};

const FIELD_LABELS = {
  submittedAt: "Thời gian gửi",
  clientSubmittedAt: "Thời gian hoàn thành trên thiết bị",
  submissionId: "Mã lượt gửi",
  surveyCode: "Mã khảo sát",
  surveyName: "Tên khảo sát",
  respondentId: "Mã người trả lời",
  pageUrl: "URL trang",
  source: "Nguồn gửi",
  appVersion: "Phiên bản ứng dụng",
  platform: "Nền tảng",

  hoTen: "Họ tên",
  doTuoi: "Độ tuổi",
  gioiTinh: "Giới tính",
  soThanhVienHoGiaDinh: "Số thành viên hộ gia đình",
  thanhPho: "Tỉnh/Thành phố",
  xa: "Xã/Phường",
  maThanhPho: "Mã Tỉnh/Thành phố",
  maXa: "Mã Xã/Phường",

  nguonNangLuong: "Nguồn năng lượng",
  mucSuDungGas: "Mức sử dụng gas",
  cachNhapDien: "Cách nhập điện",
  soDienMoiThang: "Số điện mỗi tháng",
  dienMoiThang: "Điện mỗi tháng",
  tienDienMoiThang: "Tiền điện mỗi tháng",
  thietBiSuDung: "Thiết bị sử dụng",
  soLuongThietBi: "Số lượng thiết bị",
  "soLuongThietBi.tivi": "Số lượng tivi",
  "soLuongThietBi.tuLanh": "Số lượng tủ lạnh",
  "soLuongThietBi.mayLanh": "Số lượng máy lạnh",
  "soLuongThietBi.dienThoai": "Số lượng điện thoại",
  "soLuongThietBi.laptop": "Số lượng laptop",
  "soLuongThietBi.loViSong": "Số lượng lò vi sóng",
  "soLuongThietBi.bepDienLoNuong": "Số lượng bếp điện/lò nướng",
  "soLuongThietBi.mayGiat": "Số lượng máy giặt",
  bienPhapTietKiemNangLuong: "Biện pháp tiết kiệm năng lượng",
  tanSuatSuDung: "Tần suất sử dụng",
  thoiGianSuDung: "Thời gian sử dụng",

  loaiThucPham: "Loại thực phẩm",
  tanSuatTieuThu: "Tần suất tiêu thụ",
  khoiLuongTieuThu: "Khối lượng tiêu thụ",
  "khoiLuongTieuThu.thitHeoKgTuan": "Thịt heo (kg/tuần)",
  "khoiLuongTieuThu.thitBoKgTuan": "Thịt bò (kg/tuần)",
  "khoiLuongTieuThu.thitGiaCamKgTuan": "Thịt gia cầm (kg/tuần)",
  "khoiLuongTieuThu.suaLitTuan": "Sữa (L/tuần)",
  "khoiLuongTieuThu.caHaiSanKgTuan": "Cá/hải sản (kg/tuần)",
  "khoiLuongTieuThu.rauCuKgTuan": "Rau củ (kg/tuần)",
  "khoiLuongTieuThu.gaoKgThang": "Gạo (kg/tháng)",
  donViTinh: "Đơn vị tính",
  nguonGocThucPham: "Nguồn gốc thực phẩm",
  thucPhamChinh: "Thực phẩm chính",
  soBuaAn: "Số bữa ăn",
  anThitDo: "Ăn thịt đỏ",
  "anThitDo.thitHeoKgTuan": "Ăn thịt đỏ - thịt heo (kg/tuần)",
  "anThitDo.thitBoKgTuan": "Ăn thịt đỏ - thịt bò (kg/tuần)",
  anThitGiaCam: "Ăn thịt gia cầm",
  anCaHaiSan: "Ăn cá/hải sản",
  anRauCu: "Ăn rau củ",
  anSuaTrung: "Ăn sữa/trứng",
  thucPhamDongGoi: "Thực phẩm đóng gói",
  thucPhamLangPhi: "Thực phẩm lãng phí",
  khoangCachMuaThucPham: "Khoảng cách mua thực phẩm",
  phuongThucNhapKhoangCachThucPham: "Cách nhập khoảng cách mua thực phẩm",
  khoangCachMuaThucPhamKm: "Khoảng cách mua thực phẩm (km)",
  thoiGianDiMuaThucPhamPhut: "Thời gian đi mua thực phẩm (phút)",
  khoangCachUocTinhKm: "Khoảng cách ước tính dùng để tính toán (km)",
  phamViDatDoAnOnline: "Phạm vi đặt đồ ăn online",
  loaiDoAnOnline: "Loại đồ ăn online",
  tanSuatDatDoAnOnline: "Tần suất đặt đồ ăn online",
  tanSuatAnNgoai: "Tần suất ăn ngoài",
  soLanChonMonAnNgoai: "Số lần chọn món khi ăn ngoài",
  "soLanChonMonAnNgoai.monThitHeoLanTuan": "Ăn ngoài - món thịt heo (lần/tuần)",
  "soLanChonMonAnNgoai.monThitBoLanTuan": "Ăn ngoài - món thịt bò (lần/tuần)",
  "soLanChonMonAnNgoai.monThitGiaCamLanTuan": "Ăn ngoài - món thịt gia cầm (lần/tuần)",
  "soLanChonMonAnNgoai.monCaHaiSanLanTuan": "Ăn ngoài - món cá/hải sản (lần/tuần)",
  "soLanChonMonAnNgoai.monSuaLanTuan": "Ăn ngoài - món sữa (lần/tuần)",
  "soLanChonMonAnNgoai.monRauCuLanTuan": "Ăn ngoài - món rau củ (lần/tuần)",
  "soLanChonMonAnNgoai.monComTrangLanTuan": "Ăn ngoài - cơm trắng (lần/tuần)",
  cheDoAnChay: "Chế độ ăn chay",
  thucPhamHuuCoDiaPhuong: "Thực phẩm hữu cơ/địa phương",

  loaiSanPhamThoiTrang: "Loại sản phẩm thời trang",
  tanSuatMuaThoiTrang: "Tần suất mua thời trang",
  soLuongQuanAoMoiThang: "Số lượng quần áo mua mỗi tháng",
  soLuongGiayDepMoiThang: "Số lượng giày dép mua mỗi tháng",
  soLuongQuanAoMoiNam: "Số lượng quần áo mua mỗi năm",
  soLuongGiayDepMoiNam: "Số lượng giày dép mua mỗi năm",
  chatLieuThuongMua: "Chất liệu thường mua",
  noiThuongMua: "Nơi thường mua",
  coMuaDoCu: "Có mua đồ cũ/second-hand không",
  cachXuLyQuanAoCu: "Cách xử lý quần áo cũ",
  mucDoQuanTamBenVung: "Mức độ quan tâm thời trang bền vững",
  chiPhiThoiTrangMoiThang: "Chi phí thời trang mỗi tháng",
  luaChonMuaSam: "Lựa chọn mua sắm",

  hoTenNguoiTraLoi: "Thời trang - Họ tên người trả lời",
  nhomTuoi: "Thời trang - Nhóm tuổi",
  gioiTinhNguoiTraLoi: "Thời trang - Giới tính",
  diaChiNguoiTraLoi: "Thời trang - Địa chỉ",
  mucDoQuanTamThoiTrang: "Thời trang - Mức độ quan tâm",
  thuNhapHangThang: "Thời trang - Thu nhập hằng tháng",
  "xepHangYeuToMuaHang.giaCa": "Xếp hạng mua hàng - Giá cả",
  "xepHangYeuToMuaHang.mauMaXuHuong": "Xếp hạng mua hàng - Mẫu mã/xu hướng",
  "xepHangYeuToMuaHang.chatLuong": "Xếp hạng mua hàng - Chất lượng",
  uuTienKhiMua: "Thời trang - Ưu tiên khi mua",
  dipMuaThoiTrang: "Thời trang - Dịp mua",
  thoiGianSuDungTrungBinh: "Thời trang - Thời gian sử dụng trung bình",
  lyDoNgungSuDung: "Thời trang - Lý do ngừng sử dụng",
  cachXuLyHuHongNho: "Thời trang - Cách xử lý hư hỏng nhỏ",
  tanSuatMuaDoSecondHand: "Thời trang - Tần suất mua đồ second-hand",
  noiMuaDoSecondHand: "Thời trang - Nơi mua đồ second-hand",
  loaiDoSecondHand: "Thời trang - Loại đồ second-hand",
  mucDoQuanTamTaiCheTaiSuDung: "Thời trang - Quan tâm tái chế/tái sử dụng",
  sanSangTraGiaCaoHon: "Thời trang - Sẵn sàng trả giá cao hơn",
  mucGiaCaoHonChapNhan: "Thời trang - Mức giá cao hơn chấp nhận",
  nhanThucHanhViThoiTrangTuanHoan: "Thời trang - Nhận thức hành vi tuần hoàn",
  raoCanThoiTrangTuanHoan: "Thời trang - Rào cản tuần hoàn",
  hoatDongThucDayKinhTeTuanHoan: "Thời trang - Hoạt động thúc đẩy tuần hoàn",
  mucTacDongTaiSuDungDenMoiTruong: "Thời trang - Tác động tái sử dụng đến môi trường",
  niemTinXuHuongThoiTrangBenVung: "Thời trang - Niềm tin xu hướng bền vững",

  chiSoTieuDungTaiNguyen: "Chỉ số tiêu dùng tài nguyên",
  donViChiSoTieuDungTaiNguyen: "Đơn vị chỉ số tiêu dùng tài nguyên",

  "result.tongDiem": "Kết quả - tổng điểm",
  "result.xepLoai": "Kết quả - xếp loại",
  "result.nhanXet": "Kết quả - nhận xét",
  "result.mucGoiY": "Kết quả - mức gợi ý",
  "result.tieuDeGoiY": "Kết quả - tiêu đề gợi ý",
  "result.goiYCaiThien": "Kết quả - gợi ý cải thiện",
  "result.tongMips": "Kết quả - tổng MIPS",
  "result.mipsTmr": "Kết quả - MIPS/TMR",
  "result.tmr": "Kết quả - TMR",
  "result.totalKgPersonYear": "Kết quả - kg/người/năm",
  "result.totalTonPersonYear": "Kết quả - tấn/người/năm",

  "ketQua.chiSoTieuDungTaiNguyen": "Kết quả - Chỉ số tiêu dùng tài nguyên",
  "ketQua.donViChiSoTieuDungTaiNguyen": "Kết quả - Đơn vị chỉ số tiêu dùng tài nguyên",
  "ketQua.tongMips": "Kết quả - Tổng MIPS",
  "ketQua.mipsTmr": "Kết quả - MIPS TMR",
  "ketQua.tmr": "Kết quả - TMR",
  "ketQua.totalKgPersonYear": "Kết quả - kg/người/năm",
  "ketQua.totalTonPersonYear": "Kết quả - tấn/người/năm",
  "ketQua.tongTMRHoGiaDinhKgNam": "Kết quả - Tổng TMR hộ gia đình (kg/năm)",
  "ketQua.soThanhVienHoGiaDinhDungDeTinh": "Kết quả - Số thành viên dùng để tính",
  "ketQua.tmrTheoNhomKgNguoiNam.device": "Kết quả - Thiết bị (kg/người/năm)",
  "ketQua.tmrTheoNhomKgNguoiNam.food": "Kết quả - Thực phẩm (kg/người/năm)",
  "ketQua.tmrTheoNhomKgNguoiNam.transport": "Kết quả - Đi lại (kg/người/năm)",
  "ketQua.tmrTheoNhomKgNguoiNam.energy": "Kết quả - Điện, nước, gas (kg/người/năm)",
  "ketQua.tmrTheoNhomKgNguoiNam.clothing": "Kết quả - Thời trang (kg/người/năm)",
  "ketQua.tmrTheoNhomKgHoGiaDinhNam.device": "Kết quả - Thiết bị (kg/hộ/năm)",
  "ketQua.tmrTheoNhomKgHoGiaDinhNam.energy": "Kết quả - Điện, nước, gas (kg/hộ/năm)",
  "ketQua.tmrTheoNhomKgHoGiaDinhNam.clothing": "Kết quả - Thời trang (kg/hộ/năm)",
  "ketQua.nguonHeSo": "Kết quả - Nguồn hệ số",
  "ketQua.chiTietPhepTinh": "Kết quả - Chi tiết phép tính",
  "ketQua.tongDiem": "Kết quả - Tổng điểm",
  "ketQua.xepLoai": "Kết quả - Xếp loại",
  "ketQua.nhanXet": "Kết quả - Nhận xét",
  "ketQua.mucGoiY": "Kết quả - Mức gợi ý",
  "ketQua.tieuDeGoiY": "Kết quả - Tiêu đề gợi ý",
  "ketQua.goiYCaiThien": "Kết quả - Gợi ý cải thiện",
  "ketQua.nhomAnhHuongNhieuNhat": "Kết quả - Nhóm ảnh hưởng nhiều nhất"
};

const MAX_CELL_LENGTH = 50000;

function doPost(e) {
  try {
    const request = parseRequestBody_(e);

    validateSecretKey_(request.secretKey);

    const surveyCode = normalizeSurveyCode_(request.surveyCode);
    validateDataObject_(request.data);
    const sheetName = getSheetNameBySurveyCode_(surveyCode);
    const surveyName = SURVEY_NAMES[surveyCode] || sheetName;
    const submittedAt = new Date().toISOString();

    const flatData = flattenObject_(request.data || {});
    const flatResult = hasObjectFields_(request.result) ? flattenObject_(request.result, "ketQua") : {};
    const cleanData = sanitizeObject_(flatData);
    const cleanResult = sanitizeObject_(flatResult);
    const rowObject = buildRowObject_({
      submittedAt: submittedAt,
      clientSubmittedAt: request.clientSubmittedAt,
      submissionId: request.submissionId,
      surveyCode: surveyCode,
      surveyName: surveyName,
      respondentId: request.respondentId,
      pageUrl: request.pageUrl,
      source: request.source,
      appVersion: request.appVersion,
      platform: request.platform,
      data: cleanData,
      result: cleanResult
    });

    const sheet = getOrCreateSheet_(sheetName);
    if (request.submissionId && hasSubmissionId_(sheet, request.submissionId)) {
      return jsonResponse_({
        ok: true,
        duplicate: true,
        message: "Already saved",
        submissionId: request.submissionId
      });
    }
    const header = ensureHeaderAndColumns_(sheet, Object.keys(rowObject));

    appendRowByHeader_(sheet, header, rowObject);

    return jsonResponse_({
      ok: true,
      message: "Saved",
      sheetName: sheetName,
      surveyCode: surveyCode,
      surveyName: surveyName,
      submittedAt: submittedAt
    });
  } catch (error) {
    return jsonResponse_({
      ok: false,
      error: error.message || String(error)
    });
  }
}

function doGet() {
  return jsonResponse_({
    ok: true,
    message: "Survey logger is running",
    spreadsheetId: SPREADSHEET_ID,
    surveySheets: SURVEY_SHEET_NAMES
  });
}

// Chạy thủ công một lần trong Apps Script Editor trước khi triển khai.
// Hàm chỉ đọc tên bảng tính để Google hiển thị màn hình cấp quyền cần thiết.
function authorizeApp() {
  const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
  const result = {
    ok: true,
    spreadsheetId: spreadsheet.getId(),
    spreadsheetName: spreadsheet.getName()
  };
  Logger.log(JSON.stringify(result));
  return result;
}

function parseRequestBody_(e) {
  if (!e) {
    throw new Error("Missing request event.");
  }

  const postContents = e.postData && typeof e.postData.contents === "string"
    ? e.postData.contents.trim()
    : "";
  const postType = e.postData && typeof e.postData.type === "string"
    ? e.postData.type.toLowerCase()
    : "";

  if (postContents && (postType.indexOf("json") >= 0 || looksLikeJsonObject_(postContents))) {
    return parseJsonText_(postContents);
  }

  if (e.parameter && Object.keys(e.parameter).length > 0) {
    const payload = Object.assign({}, e.parameter);
    if (typeof payload.data === "string" && payload.data.trim()) {
      payload.data = parseJsonText_(payload.data);
    }
    if (typeof payload.result === "string" && payload.result.trim()) {
      payload.result = parseJsonText_(payload.result);
    }
    return payload;
  }

  if (postContents) {
    return parseJsonText_(postContents);
  }

  throw new Error("Missing request body.");
}

function looksLikeJsonObject_(text) {
  return String(text || "").trim().charAt(0) === "{";
}

function parseJsonText_(text) {
  try {
    const parsed = JSON.parse(String(text || "").trim());
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
      throw new Error("Request body must be a JSON object.");
    }
    return parsed;
  } catch (error) {
    throw new Error("Invalid JSON request body.");
  }
}

function validateSecretKey_(secretKey) {
  if (!SECRET_KEY || String(secretKey || "") !== String(SECRET_KEY)) {
    throw new Error("Invalid secretKey.");
  }
}

function validateDataObject_(data) {
  if (!isPlainObject_(data)) {
    throw new Error("Missing or invalid data object.");
  }
}

function normalizeSurveyCode_(surveyCode) {
  const code = String(surveyCode || "").trim().toUpperCase();
  if (!code) {
    throw new Error("Missing surveyCode.");
  }
  return code;
}

function getSheetNameBySurveyCode_(surveyCode) {
  const sheetName = SURVEY_SHEET_NAMES[surveyCode];
  if (!sheetName) {
    throw new Error("Invalid surveyCode: " + surveyCode);
  }
  return sheetName;
}

function getOrCreateSheet_(sheetName) {
  const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
  let sheet = spreadsheet.getSheetByName(sheetName);

  if (!sheet) {
    sheet = spreadsheet.insertSheet(sheetName);
  }

  return sheet;
}

function ensureHeaderAndColumns_(sheet, rowKeys) {
  let header = readHeader_(sheet);

  if (header.length === 0) {
    header = uniqueValues_(SYSTEM_COLUMNS.concat(rowKeys.filter(function (key) {
      return SYSTEM_COLUMNS.indexOf(key) === -1;
    })));
    writeHeader_(sheet, header);
    return header;
  }

  const missingKeys = rowKeys.filter(function (key) {
    return header.indexOf(key) === -1;
  });

  if (missingKeys.length > 0) {
    header = header.concat(missingKeys);
    writeHeader_(sheet, header);
  }

  return header;
}

function readHeader_(sheet) {
  const lastColumn = sheet.getLastColumn();
  if (lastColumn < 1) {
    return [];
  }

  const values = sheet.getRange(1, 1, 1, lastColumn).getValues()[0];
  const notes = sheet.getRange(1, 1, 1, lastColumn).getNotes()[0];
  return values.map(function (value, index) {
    const noteKey = String(notes[index] || "").trim();
    if (noteKey) {
      return noteKey;
    }
    return getHeaderKeyFromDisplay_(value);
  }).filter(function (value) {
    return value !== "";
  });
}

function writeHeader_(sheet, header) {
  ensureSheetColumnCapacity_(sheet, header.length);
  const range = sheet.getRange(1, 1, 1, header.length);
  range.setValues([header.map(getHeaderLabel_)]);
  range.setNotes([header]);
  sheet.setFrozenRows(1);
}

function getHeaderLabel_(key) {
  return FIELD_LABELS[key] || key;
}

function getHeaderKeyFromDisplay_(value) {
  const displayValue = String(value || "").trim();
  if (!displayValue) {
    return "";
  }

  const matchingKey = Object.keys(FIELD_LABELS).find(function (key) {
    return FIELD_LABELS[key] === displayValue;
  });

  return matchingKey || displayValue;
}

function ensureSheetColumnCapacity_(sheet, columnCount) {
  const maxColumns = sheet.getMaxColumns();
  if (maxColumns < columnCount) {
    sheet.insertColumnsAfter(maxColumns, columnCount - maxColumns);
  }
}

function appendRowByHeader_(sheet, header, rowObject) {
  const row = header.map(function (columnName) {
    return Object.prototype.hasOwnProperty.call(rowObject, columnName) ? rowObject[columnName] : "";
  });

  sheet.appendRow(row);
}

function buildRowObject_(options) {
  const row = {
    submittedAt: sanitizeValue_(options.submittedAt),
    clientSubmittedAt: sanitizeValue_(options.clientSubmittedAt),
    submissionId: sanitizeValue_(options.submissionId),
    surveyCode: sanitizeValue_(options.surveyCode),
    surveyName: sanitizeValue_(options.surveyName),
    respondentId: sanitizeValue_(options.respondentId),
    pageUrl: sanitizeValue_(options.pageUrl),
    source: sanitizeValue_(options.source),
    appVersion: sanitizeValue_(options.appVersion),
    platform: sanitizeValue_(options.platform)
  };

  Object.keys(options.data || {}).forEach(function (key) {
    const columnName = SYSTEM_COLUMNS.indexOf(key) >= 0 ? "data." + key : key;
    row[columnName] = options.data[key];
  });

  Object.keys(options.result || {}).forEach(function (key) {
    row[key] = options.result[key];
  });

  return row;
}

function hasSubmissionId_(sheet, submissionId) {
  if (!sheet || sheet.getLastRow() < 2 || !submissionId) return false;
  const header = readHeader_(sheet);
  const columnIndex = header.indexOf("submissionId");
  if (columnIndex < 0) return false;
  return sheet.getRange(2, columnIndex + 1, sheet.getLastRow() - 1, 1)
    .createTextFinder(String(submissionId))
    .matchEntireCell(true)
    .findNext() !== null;
}

function flattenObject_(value, prefix, result) {
  const output = result || {};
  const currentPrefix = prefix || "";

  if (isPlainObject_(value)) {
    const keys = Object.keys(value);

    if (keys.length === 0 && currentPrefix) {
      output[currentPrefix] = "";
    }

    keys.forEach(function (key) {
      const fieldName = normalizeFieldName_(key);
      const nextPrefix = currentPrefix ? currentPrefix + "." + fieldName : fieldName;
      flattenObject_(value[key], nextPrefix, output);
    });

    return output;
  }

  if (Array.isArray(value)) {
    if (value.length === 0) {
      if (currentPrefix) {
        output[currentPrefix] = "";
      }
      return output;
    }

    if (value.every(isScalarValue_)) {
      output[currentPrefix] = value.join(" | ");
      return output;
    }

    value.forEach(function (item, index) {
      flattenObject_(item, currentPrefix + "." + (index + 1), output);
    });

    return output;
  }

  if (currentPrefix) {
    output[currentPrefix] = value;
  }

  return output;
}

function sanitizeObject_(data) {
  return Object.keys(data || {}).reduce(function (clean, key) {
    clean[normalizeFieldName_(key)] = sanitizeValue_(data[key]);
    return clean;
  }, {});
}

function sanitizeValue_(value) {
  if (value === null || value === undefined) {
    return "";
  }

  if (value instanceof Date) {
    return value.toISOString();
  }

  if (typeof value === "number") {
    return Number.isFinite(value) ? value : "";
  }

  if (typeof value === "boolean") {
    return value;
  }

  let text = typeof value === "string" ? value : JSON.stringify(value);

  text = String(text || "")
    .replace(/\u0000/g, "")
    .replace(/[\u0001-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, " ");

  if (text.length > MAX_CELL_LENGTH) {
    text = text.slice(0, MAX_CELL_LENGTH);
  }

  if (/^[=+\-@]/.test(text)) {
    return "'" + text;
  }

  return text;
}

function normalizeFieldName_(key) {
  const fieldName = String(key || "field")
    .trim()
    .replace(/[\r\n\t]+/g, " ")
    .replace(/\s+/g, " ");

  return fieldName || "field";
}

function isPlainObject_(value) {
  return Object.prototype.toString.call(value) === "[object Object]";
}

function hasObjectFields_(value) {
  return isPlainObject_(value) && Object.keys(value).length > 0;
}

function isScalarValue_(value) {
  return !isPlainObject_(value) && !Array.isArray(value);
}

function uniqueValues_(values) {
  return values.reduce(function (list, value) {
    if (list.indexOf(value) === -1) {
      list.push(value);
    }
    return list;
  }, []);
}

function jsonResponse_(data) {
  return ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}

function testPost() {
  const event = {
    postData: {
      type: "application/json",
      contents: JSON.stringify({
        secretKey: SECRET_KEY,
        surveyCode: "DIEN",
        respondentId: "respondent-test-001",
        pageUrl: "https://example.com/khaosat",
        source: "khaosat-tieudung",
        data: {
          hoTen: "Nguyen Van A",
          doTuoi: 22,
          gioiTinh: "Nam",
          soThanhVienHoGiaDinh: 3,
          thanhPho: "TP. Ho Chi Minh",
          xa: "Ben Nghe",
          soDienMoiThang: 120,
          thietBiSuDung: ["Tivi", "Tủ lạnh"],
          soLuongThietBi: {
            tivi: 1,
            tuLanh: 1
          },
          bienPhapTietKiemNangLuong: "=this text will not become a formula"
        },
        result: {
          chiSoTieuDungTaiNguyen: 1234.56,
          donViChiSoTieuDungTaiNguyen: "kg/người/năm",
          tmr: 1234.56,
          totalKgPersonYear: 1234.56,
          totalTonPersonYear: 1.23,
          xepLoai: "Mức tốt",
          nhanXet: "Dữ liệu test.",
          mucGoiY: "good",
          tieuDeGoiY: "Bạn đang sử dụng điện khá tiết kiệm",
          goiYCaiThien: [
            "Duy trì thói quen tắt thiết bị khi không sử dụng.",
            "Theo dõi hóa đơn điện để giữ mức tiêu thụ ổn định."
          ],
          nhomAnhHuongNhieuNhat: [
            "Điện, nước, gas: 1.234,6 kg/người/năm"
          ]
        }
      })
    }
  };

  const output = doPost(event);
  Logger.log(output.getContent());
  return output.getContent();
}
