import assert from "node:assert/strict";
import fs from "node:fs";
import vm from "node:vm";

const root = new URL("../", import.meta.url);
const context = vm.createContext({
    console,
    window: { addEventListener: () => {} },
    document: { addEventListener: () => {} },
    navigator: { onLine: true },
    localStorage: { getItem: () => null, setItem: () => {} },
    sessionStorage: { getItem: () => null, setItem: () => {} },
    crypto: { randomUUID: () => "test-id" },
    fetch: async () => ({ ok: true, json: async () => ({}) })
});

function run(relativePath, suffix = "") {
    const source = fs.readFileSync(new URL(relativePath, root), "utf8");
    vm.runInContext(`${source}\n${suffix}`, context, { filename: relativePath });
}

run("js/config.js");
run("js/data/impact-factors.js");
run("js/services/mi-config.js");
run("js/core/tmr-calculator.js");
run("js/data/surveys.js", "globalThis.__surveys = surveys; state.profile = { soThanhVienHoGiaDinh: 4 };");
run("js/services/database.js", "globalThis.__buildFashionSheetData = buildFashionSheetData; globalThis.__buildDatabaseResult = buildDatabaseResult;");

const fashion = context.__surveys.find((survey) => survey.id === "fashion");
assert.ok(fashion, "Phải có khảo sát thời trang");

const numberedQuestions = fashion.groups
    .flatMap((group) => group.questions)
    .filter((question) => /^\d+\./.test(question.label));
assert.equal(numberedQuestions.length, 27, "Phải có đủ 27 câu hỏi chính");
assert.equal(new Set(numberedQuestions.map((question) => question.id)).size, 27, "ID của 27 câu hỏi phải duy nhất");

const input = new Map([
    ["fashion_annual_purchase_clothes", "2"],
    ["fashion_annual_purchase_shoes", "1"],
    ["fashion_used_items", "Có mua quần áo second-hand"]
]);
const result = fashion.calculate({ get: (name) => input.get(name) ?? null });
const expectedHouseholdTmr = (2 * 1264.145) + 449.9;
assert.equal(result.totalTMRHouseholdYear, expectedHouseholdTmr);
assert.equal(result.totalTMRPersonYear, expectedHouseholdTmr / 4);
assert.ok(Number.isFinite(result.totalTMRPersonYear));
const savedResult = context.__buildDatabaseResult(result, "MS");
assert.equal(savedResult.totalKgPersonYear, expectedHouseholdTmr / 4);
assert.equal(savedResult.tongTMRHoGiaDinhKgNam, expectedHouseholdTmr);
assert.equal(savedResult.soThanhVienHoGiaDinhDungDeTinh, 4);
assert.equal(savedResult.tmrTheoNhomKgNguoiNam.clothing, expectedHouseholdTmr / 4);
assert.ok(savedResult.chiTietPhepTinh.some((line) => line.includes("Quần, áo")));

const electricity = context.__surveys.find((survey) => survey.id === "electricity");
const electricityInput = new Map([
    ["electricity_consumption_basis", "kwh"],
    ["electricity_monthly_kwh", "100"],
    ["electricity_electric_bill", ""],
    ["electricity_gas_usage", "Không sử dụng"],
    ["electricity_devices_tv", "1"]
]);
const electricityResult = electricity.calculate({ get: (name) => electricityInput.get(name) ?? null });
const savedElectricityResult = context.__buildDatabaseResult(electricityResult, "DIEN");
assert.ok(savedElectricityResult.totalKgPersonYear > 0);
assert.ok(savedElectricityResult.tongTMRHoGiaDinhKgNam > 0);
assert.equal(savedElectricityResult.soThanhVienHoGiaDinhDungDeTinh, 4);
assert.ok(savedElectricityResult.tmrTheoNhomKgNguoiNam.energy > 0);
assert.ok(savedElectricityResult.tmrTheoNhomKgNguoiNam.device > 0);
assert.ok(savedElectricityResult.chiTietPhepTinh.some((line) => line.includes("Điện năng sử dụng trong năm")));

const fields = [];
const addField = (name, type, value, checked = false) => fields.push({
    name, type, value: String(value), checked, disabled: false,
    defaultChecked: false, dataset: { userEdited: "true" }
});

numberedQuestions.forEach((question) => {
    const prefix = `fashion_${question.id}`;
    if (["radio", "scale"].includes(question.type)) addField(prefix, "radio", question.options?.[0] ?? question.min ?? 0, true);
    else if (["checkbox", "checkbox-other"].includes(question.type)) addField(prefix, "checkbox", question.options[0], true);
    else if (["text", "textarea"].includes(question.type)) addField(prefix, "text", "Câu trả lời kiểm thử");
    else if (question.type === "rank") question.options.forEach((option, index) => {
        const slug = option.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "_");
        addField(`${prefix}_${slug}`, "select-one", index + 1);
    });
});
addField("fashion_annual_purchase_clothes", "number", 2);
addField("fashion_annual_purchase_shoes", "number", 1);
addField("fashion_used_items", "text", "Có mua quần áo second-hand");

const payload = context.__buildFashionSheetData({ elements: fields });
const expectedAnswerKeys = [
    "hoTenNguoiTraLoi", "nhomTuoi", "gioiTinhNguoiTraLoi", "diaChiNguoiTraLoi",
    "mucDoQuanTamThoiTrang", "thuNhapHangThang", "xepHangYeuToMuaHang", "noiThuongMua",
    "tanSuatMuaThoiTrang", "chiPhiThoiTrangMoiThang", "uuTienKhiMua", "dipMuaThoiTrang",
    "thoiGianSuDungTrungBinh", "cachXuLyQuanAoCu", "lyDoNgungSuDung", "cachXuLyHuHongNho",
    "tanSuatMuaDoSecondHand", "noiMuaDoSecondHand", "loaiDoSecondHand", "mucDoQuanTamTaiCheTaiSuDung",
    "sanSangTraGiaCaoHon", "mucGiaCaoHonChapNhan", "nhanThucHanhViThoiTrangTuanHoan",
    "raoCanThoiTrangTuanHoan", "hoatDongThucDayKinhTeTuanHoan", "mucTacDongTaiSuDungDenMoiTruong",
    "niemTinXuHuongThoiTrangBenVung"
];
expectedAnswerKeys.forEach((key) => assert.ok(key in payload, `Payload thiếu trường ${key}`));
assert.equal(payload.soLuongQuanAoMoiNam, 2);
assert.equal(payload.soLuongGiayDepMoiNam, 1);

console.log("Fashion survey: 27 questions, payload mapping and TMR calculation passed.");
