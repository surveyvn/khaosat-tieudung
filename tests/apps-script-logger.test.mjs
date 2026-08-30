import assert from "node:assert/strict";
import fs from "node:fs";
import vm from "node:vm";

const source = fs.readFileSync(new URL("../apps-script/google-apps-script-data-logger.gs", import.meta.url), "utf8");
const context = vm.createContext({ console });
vm.runInContext(`${source}\nglobalThis.__logger = {
  spreadsheetId: SPREADSHEET_ID,
  flatten: flattenObject_,
  sanitize: sanitizeObject_,
  buildRow: buildRowObject_,
  label: getHeaderLabel_
};`, context);

assert.equal(context.__logger.spreadsheetId, "1ZDb6oRDBDY6YQ-O8V9Z_G4ilNTL0VCB5_1u9XKPU7lc");

const result = {
    totalKgPersonYear: 1234.56,
    tongTMRHoGiaDinhKgNam: 3703.68,
    tmrTheoNhomKgNguoiNam: { device: 100, energy: 1134.56 },
    chiTietPhepTinh: ["Điện năng: 1200 kWh/năm", "Tivi: 1 thiết bị"]
};
const flatResult = context.__logger.sanitize(context.__logger.flatten(result, "ketQua"));
const row = context.__logger.buildRow({
    submittedAt: "2026-08-27T00:00:00.000Z",
    clientSubmittedAt: "2026-08-27T00:00:00.000Z",
    submissionId: "test-electricity-result",
    surveyCode: "DIEN",
    surveyName: "Điện",
    respondentId: "respondent-test",
    pageUrl: "http://localhost",
    source: "test",
    appVersion: "0.1.0",
    platform: "web",
    data: {},
    result: flatResult
});

assert.equal(row["ketQua.totalKgPersonYear"], 1234.56);
assert.equal(row["ketQua.tongTMRHoGiaDinhKgNam"], 3703.68);
assert.equal(row["ketQua.tmrTheoNhomKgNguoiNam.energy"], 1134.56);
assert.match(row["ketQua.chiTietPhepTinh"], /Điện năng/);
assert.equal(context.__logger.label("ketQua.totalKgPersonYear"), "Kết quả - kg/người/năm");
assert.equal(context.__logger.label("hoTenNguoiTraLoi"), "Thời trang - Họ tên người trả lời");

console.log("Apps Script logger: spreadsheet, electricity result and fashion columns passed.");
