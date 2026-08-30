function shouldSkipFieldValue(field, value) {
    if (value === null || value === undefined) return true;
    if (typeof value === "string" && value.trim() === "") return true;
    return field.type === "number" && value === "0" && field.dataset.userEdited !== "true";
}

function getSurveyCodeForSurvey(survey) {
    return survey?.surveyCode || SURVEY_CODE_BY_ID[survey?.id] || "";
}

function compactSubmissionObject(value) {
    if (Array.isArray(value)) {
        const compactArray = value
            .map((item) => compactSubmissionObject(item))
            .filter((item) => item !== "" && item !== null && item !== undefined);
        return compactArray.length ? compactArray : undefined;
    }

    if (value && typeof value === "object") {
        const compactObject = {};
        Object.entries(value).forEach(([key, itemValue]) => {
            const compactValue = compactSubmissionObject(itemValue);
            if (compactValue !== "" && compactValue !== null && compactValue !== undefined) {
                compactObject[key] = compactValue;
            }
        });
        return Object.keys(compactObject).length ? compactObject : undefined;
    }

    if (typeof value === "string") {
        const trimmed = value.trim();
        return trimmed === "" ? undefined : trimmed;
    }

    return value;
}

function normalizeSubmissionObject(value) {
    return value && typeof value === "object" && !Array.isArray(value) ? value : {};
}

function getFieldsByName(form, name) {
    if (!form) return [];
    return Array.from(form.elements).filter((field) => field.name === name);
}

function getTypedValue(form, name, options = {}) {
    const field = getFieldsByName(form, name).find((item) => item.type !== "radio" && item.type !== "checkbox");
    if (!field || field.disabled) return undefined;

    const value = typeof field.value === "string" ? field.value.trim() : field.value;
    if (shouldSkipFieldValue(field, value)) return undefined;

    if (options.number) {
        const numericValue = Number(value);
        return Number.isFinite(numericValue) ? numericValue : undefined;
    }

    return value;
}

function estimateFoodTripDistanceKm(method, distanceKm, durationMinutes) {
    if (method === "km") {
        return Number.isFinite(Number(distanceKm)) ? Number(distanceKm) : undefined;
    }

    if (method === "phut" && Number.isFinite(Number(durationMinutes))) {
        return (Number(durationMinutes) / 60) * AVERAGE_FOOD_TRIP_SPEED_KMH;
    }

    return undefined;
}

function getChoiceValues(form, name, otherName = "") {
    const values = [];
    getFieldsByName(form, name).forEach((field) => {
        if (!field.checked) return;
        if (field.value === "other") {
            const otherValue = otherName ? getTypedValue(form, otherName) : "";
            if (otherValue) values.push(otherValue);
            return;
        }
        values.push(field.value);
    });
    return values;
}

function getChoiceValue(form, name, otherName = "", options = {}) {
    const field = getFieldsByName(form, name).find((item) => item.checked);
    if (!field) return undefined;

    if (field.defaultChecked && field.dataset.userEdited !== "true" && !options.includeDefault) {
        return undefined;
    }

    if (field.value === "other") {
        return otherName ? getTypedValue(form, otherName) : undefined;
    }

    return field.value;
}

function buildCommonSheetData() {
    const profile = state.profile || collectProfileData();
    return compactSubmissionObject({
        hoTen: profile.hoTen,
        doTuoi: profile.doTuoi,
        gioiTinh: profile.gioiTinh,
        soThanhVienHoGiaDinh: profile.soThanhVienHoGiaDinh,
        thanhPho: profile.thanhPho,
        xa: profile.xa,
        maThanhPho: profile.maThanhPho,
        maXa: profile.maXa
    }) || {};
}

function buildElectricitySheetData(form) {
    const soDienMoiThang = getTypedValue(form, "electricity_monthly_kwh", { number: true });
    const tienDienMoiThang = getTypedValue(form, "electricity_electric_bill", { number: true });
    const cachNhapDien = getChoiceValue(form, "electricity_consumption_basis", "", {
        includeDefault: soDienMoiThang !== undefined || tienDienMoiThang !== undefined
    });
    const soLuongThietBi = {};
    const thietBiSuDung = [];
    const deviceFields = [
        ["electricity_devices_tv", "tivi", "Tivi"],
        ["electricity_devices_fridge", "tuLanh", "Tủ lạnh"],
        ["electricity_devices_aircon", "mayLanh", "Máy lạnh"],
        ["electricity_devices_phone", "dienThoai", "Điện thoại"],
        ["electricity_devices_laptop", "laptop", "Laptop"],
        ["electricity_devices_microwave", "loViSong", "Lò vi sóng"],
        ["electricity_devices_stove", "bepDienLoNuong", "Bếp điện và lò nướng"],
        ["electricity_devices_washer", "mayGiat", "Máy giặt"]
    ];

    deviceFields.forEach(([fieldName, key, label]) => {
        const quantity = getTypedValue(form, fieldName, { number: true });
        if (quantity === undefined) return;
        soLuongThietBi[key] = quantity;
        if (quantity > 0) thietBiSuDung.push(label);
    });

    return compactSubmissionObject({
        nguonNangLuong: getChoiceValues(form, "electricity_energy_sources", "electricity_energy_sources_other"),
        mucSuDungGas: getChoiceValue(form, "electricity_gas_usage", "electricity_gas_usage_other"),
        cachNhapDien,
        soDienMoiThang,
        tienDienMoiThang,
        thietBiSuDung,
        soLuongThietBi,
        bienPhapTietKiemNangLuong: getTypedValue(form, "electricity_saving_habits")
    }) || {};
}

function buildFoodSheetData(form) {
    const phuongThucNhapKhoangCachThucPham = getChoiceValue(form, "food_distance_method", "", { includeDefault: true });
    const khoangCachMuaThucPhamKm = phuongThucNhapKhoangCachThucPham === "km"
        ? getTypedValue(form, "food_distance_km", { number: true })
        : undefined;
    const thoiGianDiMuaThucPhamPhut = phuongThucNhapKhoangCachThucPham === "phut"
        ? getTypedValue(form, "food_distance_minutes", { number: true })
        : undefined;
    const khoangCachUocTinhKm = estimateFoodTripDistanceKm(
        phuongThucNhapKhoangCachThucPham,
        khoangCachMuaThucPhamKm,
        thoiGianDiMuaThucPhamPhut
    );
    const khoiLuongTieuThu = {
        thitHeoKgTuan: getTypedValue(form, "food_weekly_food_pork", { number: true }),
        thitBoKgTuan: getTypedValue(form, "food_weekly_food_beef", { number: true }),
        thitGiaCamKgTuan: getTypedValue(form, "food_weekly_food_chicken", { number: true }),
        suaLitTuan: getTypedValue(form, "food_weekly_food_milk", { number: true }),
        caHaiSanKgTuan: getTypedValue(form, "food_weekly_food_fish", { number: true }),
        rauCuKgTuan: getTypedValue(form, "food_weekly_food_vegetable", { number: true }),
        gaoKgThang: getTypedValue(form, "food_weekly_food_rice", { number: true })
    };
    const soLanChonMonAnNgoai = {
        monThitHeoLanTuan: getTypedValue(form, "food_eatout_choices_pork", { number: true }),
        monThitBoLanTuan: getTypedValue(form, "food_eatout_choices_beef", { number: true }),
        monThitGiaCamLanTuan: getTypedValue(form, "food_eatout_choices_chicken", { number: true }),
        monCaHaiSanLanTuan: getTypedValue(form, "food_eatout_choices_fish", { number: true }),
        monSuaLanTuan: getTypedValue(form, "food_eatout_choices_milk", { number: true }),
        monRauCuLanTuan: getTypedValue(form, "food_eatout_choices_vegetable", { number: true }),
        monComTrangLanTuan: getTypedValue(form, "food_eatout_choices_rice", { number: true })
    };

    return compactSubmissionObject({
        thucPhamChinh: getChoiceValues(form, "food_meal_habit", "food_meal_habit_other"),
        nguonGocThucPham: getChoiceValues(form, "food_food_source", "food_food_source_other"),
        phuongThucNhapKhoangCachThucPham,
        khoangCachMuaThucPhamKm,
        thoiGianDiMuaThucPhamPhut,
        khoangCachUocTinhKm,
        khoiLuongTieuThu,
        anThitDo: {
            thitHeoKgTuan: khoiLuongTieuThu.thitHeoKgTuan,
            thitBoKgTuan: khoiLuongTieuThu.thitBoKgTuan
        },
        anThitGiaCam: khoiLuongTieuThu.thitGiaCamKgTuan,
        anCaHaiSan: khoiLuongTieuThu.caHaiSanKgTuan,
        anRauCu: khoiLuongTieuThu.rauCuKgTuan,
        anSuaTrung: khoiLuongTieuThu.suaLitTuan,
        phamViDatDoAnOnline: getChoiceValue(form, "food_delivery_range"),
        loaiDoAnOnline: getChoiceValues(form, "food_delivery_type", "food_delivery_type_other"),
        tanSuatDatDoAnOnline: getChoiceValue(form, "food_delivery_times"),
        tanSuatAnNgoai: getChoiceValue(form, "food_eatout_times"),
        soLanChonMonAnNgoai,
        cheDoAnChay: getTypedValue(form, "food_vegetarian"),
        thucPhamHuuCoDiaPhuong: getTypedValue(form, "food_organic")
    }) || {};
}

function buildFashionSheetData(form) {
    const soLuongQuanAoMoiNam = getTypedValue(form, "fashion_annual_purchase_clothes", { number: true });
    const soLuongGiayDepMoiNam = getTypedValue(form, "fashion_annual_purchase_shoes", { number: true });
    const loaiSanPhamThoiTrang = [];

    if (soLuongQuanAoMoiNam !== undefined && soLuongQuanAoMoiNam > 0) loaiSanPhamThoiTrang.push("Quần áo");
    if (soLuongGiayDepMoiNam !== undefined && soLuongGiayDepMoiNam > 0) loaiSanPhamThoiTrang.push("Giày dép");

    return compactSubmissionObject({
        hoTenNguoiTraLoi: getTypedValue(form, "fashion_full_name"),
        nhomTuoi: getChoiceValue(form, "fashion_age_group"),
        gioiTinhNguoiTraLoi: getChoiceValue(form, "fashion_gender"),
        diaChiNguoiTraLoi: getTypedValue(form, "fashion_address"),
        mucDoQuanTamThoiTrang: getChoiceValue(form, "fashion_fashion_interest"),
        thuNhapHangThang: getChoiceValue(form, "fashion_monthly_income"),
        xepHangYeuToMuaHang: {
            giaCa: getTypedValue(form, "fashion_purchase_factor_ranking_gia_ca", { number: true }),
            mauMaXuHuong: getTypedValue(form, "fashion_purchase_factor_ranking_mau_ma_xu_huong", { number: true }),
            chatLuong: getTypedValue(form, "fashion_purchase_factor_ranking_chat_luong", { number: true })
        },
        noiThuongMua: getChoiceValues(form, "fashion_shopping_places", "fashion_shopping_places_other"),
        tanSuatMuaThoiTrang: getChoiceValue(form, "fashion_shopping_frequency"),
        chiPhiThoiTrangMoiThang: getChoiceValue(form, "fashion_monthly_fashion_spending"),
        uuTienKhiMua: getChoiceValues(form, "fashion_purchase_priorities", "fashion_purchase_priorities_other"),
        dipMuaThoiTrang: getChoiceValues(form, "fashion_shopping_occasions"),
        thoiGianSuDungTrungBinh: getChoiceValue(form, "fashion_average_usage_time"),
        cachXuLyQuanAoCu: getChoiceValues(form, "fashion_old_fashion_disposal"),
        lyDoNgungSuDung: getChoiceValues(form, "fashion_stop_using_reasons"),
        cachXuLyHuHongNho: getChoiceValues(form, "fashion_minor_damage_action"),
        tanSuatMuaDoSecondHand: getChoiceValue(form, "fashion_secondhand_frequency"),
        noiMuaDoSecondHand: getChoiceValue(form, "fashion_secondhand_places"),
        loaiDoSecondHand: getChoiceValue(form, "fashion_secondhand_types"),
        mucDoQuanTamTaiCheTaiSuDung: getChoiceValue(form, "fashion_reuse_interest"),
        sanSangTraGiaCaoHon: getChoiceValue(form, "fashion_circular_price_willingness"),
        mucGiaCaoHonChapNhan: getChoiceValue(form, "fashion_acceptable_price_premium"),
        nhanThucHanhViThoiTrangTuanHoan: getChoiceValue(form, "fashion_circular_fashion_behaviors"),
        raoCanThoiTrangTuanHoan: getChoiceValues(form, "fashion_circular_fashion_barriers", "fashion_circular_fashion_barriers_other"),
        hoatDongThucDayKinhTeTuanHoan: getChoiceValues(form, "fashion_circular_economy_actions"),
        mucTacDongTaiSuDungDenMoiTruong: getChoiceValue(form, "fashion_reuse_environment_impact"),
        niemTinXuHuongThoiTrangBenVung: getChoiceValue(form, "fashion_sustainable_fashion_future"),
        loaiSanPhamThoiTrang,
        soLuongQuanAoMoiNam,
        soLuongGiayDepMoiNam,
        coMuaDoCu: getTypedValue(form, "fashion_used_items")
    }) || {};
}

function buildSurveyAnswerSheetData(form, surveyId) {
    if (surveyId === "electricity") return buildElectricitySheetData(form);
    if (surveyId === "food") return buildFoodSheetData(form);
    if (surveyId === "fashion") return buildFashionSheetData(form);
    return {};
}

function buildDatabaseData(form, survey) {
    return compactSubmissionObject({
        ...buildCommonSheetData(),
        ...buildSurveyAnswerSheetData(form, survey?.id)
    }) || {};
}

function getResultNumber(value) {
    if (typeof value === "number") {
        return Number.isFinite(value) ? value : undefined;
    }

    if (typeof value === "string") {
        const normalized = value.trim().replace(/\./g, "").replace(",", ".");
        const parsed = Number(normalized);
        return Number.isFinite(parsed) ? parsed : undefined;
    }

    return undefined;
}

function buildDatabaseResult(result, surveyCode) {
    const evaluation = result?.evaluation || {};
    const improvement = getImprovementSuggestions(surveyCode, result);
    const totalKgPersonYear = getResultNumber(result?.totalTMRPersonYear);
    const totalTonPersonYear = getResultNumber(result?.totalTMRPersonYearTon);
    const topImpactCategories = getTopImpactCategories(result).map((item) => {
        const label = categoryLabels[item.category] || item.category;
        return `${label}: ${formatKgPerPersonYear(getResultNumber(item.value))}`;
    });
    const householdSize = getHouseholdSize();
    const calculationDetails = Object.values(result?.detail || {}).flat().map((row) => {
        const annualAmount = getResultNumber(row.annualAmount) ?? 0;
        const householdTmr = getResultNumber(row.tmr) ?? 0;
        const personTmr = householdTmr / Math.max(householdSize, 1);
        return `${row.label || "Hạng mục"}: ${annualAmount} ${row.unit || ""}; TMR ${householdTmr} kg/hộ/năm; ${personTmr} kg/người/năm`;
    });

    return compactSubmissionObject({
        chiSoTieuDungTaiNguyen: totalKgPersonYear,
        donViChiSoTieuDungTaiNguyen: "kg/người/năm",
        tmr: totalKgPersonYear,
        totalKgPersonYear,
        totalTonPersonYear,
        tongTMRHoGiaDinhKgNam: getResultNumber(result?.totalTMRHouseholdYear),
        soThanhVienHoGiaDinhDungDeTinh: householdSize,
        tmrTheoNhomKgNguoiNam: result?.byCategory,
        tmrTheoNhomKgHoGiaDinhNam: result?.byCategoryHouseholdYear,
        chiTietPhepTinh: calculationDetails,
        nguonHeSo: result?.sourceMode === "external" ? "Bảng hệ số bên ngoài" : "Bảng hệ số mặc định",
        xepLoai: improvement.label || evaluation.label || "",
        nhanXet: improvement.summary || evaluation.message || "",
        mucGoiY: improvement.level || "",
        tieuDeGoiY: improvement.title || "",
        goiYCaiThien: improvement.suggestions || [],
        nhomAnhHuongNhieuNhat: topImpactCategories
    }) || {};
}

function getSheetSubmissionQueue() {
    try {
        const queue = JSON.parse(localStorage.getItem(SHEET_SUBMISSION_QUEUE_KEY));
        return Array.isArray(queue) ? queue.filter((item) => item?.submissionId && item?.surveyCode) : [];
    } catch (_) {
        return [];
    }
}

function saveSheetSubmissionQueue(queue) {
    localStorage.setItem(SHEET_SUBMISSION_QUEUE_KEY, JSON.stringify(queue.slice(-30)));
}

function queueSheetSubmission(payload) {
    const queue = getSheetSubmissionQueue();
    if (!queue.some((item) => item.submissionId === payload.submissionId)) queue.push(payload);
    saveSheetSubmissionQueue(queue);
}

function removeQueuedSheetSubmission(submissionId) {
    saveSheetSubmissionQueue(getSheetSubmissionQueue().filter((item) => item.submissionId !== submissionId));
}

async function postSubmissionToGoogleSheet(payload) {
    if (!scriptURL) throw new Error("Google Sheet endpoint is not configured");
    const response = await fetch(scriptURL, {
        method: "POST",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify(payload)
    });
    if (!response.ok) throw new Error(`Google Sheet request failed: ${response.status}`);
    const responseData = await response.json();
    if (!responseData?.ok) throw new Error(responseData?.error || "Google Sheet rejected submission");
    return responseData;
}

async function flushSheetSubmissionQueue() {
    if (!ENABLE_GOOGLE_SHEET_SYNC || !navigator.onLine || !scriptURL) return;
    for (const payload of getSheetSubmissionQueue()) {
        try {
            await postSubmissionToGoogleSheet(payload);
            removeQueuedSheetSubmission(payload.submissionId);
        } catch (_) {
            break;
        }
    }
}

function buildDatabasePayloadData(data, result) {
    const normalizedData = normalizeSubmissionObject(data);
    const normalizedResult = normalizeSubmissionObject(result);

    if (Object.keys(normalizedResult).length === 0) {
        return normalizedData;
    }

    return compactSubmissionObject({
        ...normalizedData,
        ketQua: normalizedResult
    }) || normalizedData;
}

function getSubmissionQueue() {
    try {
        const queue = JSON.parse(localStorage.getItem(SUBMISSION_QUEUE_KEY));
        return Array.isArray(queue) ? queue.filter(item => item?.id && item?.survey_code) : [];
    } catch (_) {
        return [];
    }
}

function saveSubmissionQueue(queue) {
    localStorage.setItem(SUBMISSION_QUEUE_KEY, JSON.stringify(queue.slice(-30)));
}

function queueSubmission(payload) {
    const queue = getSubmissionQueue();
    if (!queue.some(item => item.id === payload.id)) queue.push(payload);
    saveSubmissionQueue(queue);
}

function removeQueuedSubmission(submissionId) {
    saveSubmissionQueue(getSubmissionQueue().filter(item => item.id !== submissionId));
}

async function postSubmissionPayload(payload) {
    const response = await fetch(`${DATABASE_URL}/rest/v1/${DATABASE_TABLE}`, {
        method: "POST",
        headers: {
            apikey: DATABASE_ANON_KEY,
            "Content-Type": "application/json",
            Prefer: "return=minimal,resolution=ignore-duplicates"
        },
        body: JSON.stringify(payload)
    });
    if (!response.ok) throw new Error(`Database request failed: ${response.status}`);
}

async function flushSubmissionQueue() {
    if (!navigator.onLine || !DATABASE_URL || !DATABASE_ANON_KEY) return;
    for (const payload of getSubmissionQueue()) {
        try {
            await postSubmissionPayload(payload);
            removeQueuedSubmission(payload.id);
        } catch (_) {
            break;
        }
    }
}

async function submitSurveyToDatabase(surveyCode, data, result) {
    const normalizedSurveyCode = String(surveyCode || "").trim().toUpperCase();
    const databaseResult = normalizeSubmissionObject(result);
    const submissionId = createClientId("submission");
    const platform = window.Capacitor?.isNativePlatform?.() ? "native-app" : "web";
    const sheetPayload = {
        secretKey: SHEET_LOGGER_SECRET,
        submissionId,
        surveyCode: normalizedSurveyCode,
        surveyName: state.selectedSurveyName || normalizedSurveyCode,
        respondentId,
        clientSubmittedAt: new Date().toISOString(),
        pageUrl: window.location?.href || "",
        source: "ecoimpact-web",
        appVersion: APP_VERSION,
        platform,
        // Giữ kết quả trong cả `data.ketQua` và `result` để tương thích với
        // Web App Google Sheet cũ (chỉ đọc data) lẫn logger mới (đọc result).
        data: buildDatabasePayloadData(data, databaseResult),
        result: databaseResult
    };
    const payload = {
        id: submissionId,
        respondent_id: respondentId,
        survey_code: normalizedSurveyCode,
        survey_name: state.selectedSurveyName || normalizedSurveyCode,
        profile: normalizeSubmissionObject(state.profile),
        answers: buildDatabasePayloadData(data, databaseResult),
        result: databaseResult,
        client_submitted_at: sheetPayload.clientSubmittedAt,
        app_version: APP_VERSION,
        platform,
        sync_status: "received"
    };

    if (!normalizedSurveyCode) return { configured: false, success: false };

    let sheetSaved = !ENABLE_GOOGLE_SHEET_SYNC;
    if (ENABLE_GOOGLE_SHEET_SYNC) {
        try {
            await postSubmissionToGoogleSheet(sheetPayload);
            removeQueuedSheetSubmission(submissionId);
            sheetSaved = true;
        } catch (error) {
            console.error("Google Sheet submit failed:", error);
            queueSheetSubmission(sheetPayload);
        }
    }

    if (!DATABASE_URL || !DATABASE_ANON_KEY) {
        queueSubmission(payload);
        return { configured: false, success: false, queued: true, target: "database" };
    }

    if (!navigator.onLine) {
        queueSubmission(payload);
        return { configured: true, success: false, queued: true };
    }

    try {
        await postSubmissionPayload(payload);
        removeQueuedSubmission(payload.id);
        return { configured: true, success: sheetSaved || true, sheetSaved };
    } catch (error) {
        console.error("Database submit failed:", error);
        queueSubmission(payload);
        return { configured: true, success: false, queued: true };
    }
}

window.addEventListener("online", flushSubmissionQueue);
window.addEventListener("online", flushSheetSubmissionQueue);
document.addEventListener("DOMContentLoaded", flushSubmissionQueue);
document.addEventListener("DOMContentLoaded", flushSheetSubmissionQueue);
