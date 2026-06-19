const scriptURL = "https://script.google.com/macros/s/AKfycbyHSXgSIO9pYBIQubS-_65CmrUzKIzJRBKpjRci1M3mLrbw0FZkbBJmcmonZ8bynAkMnQ/exec";
const DATA_SCRIPT_URL = "";
const SHEET_SOURCE_URL = "https://docs.google.com/spreadsheets/d/14Zo1oQT0--dw7L5OJ46OGVivvcxqFViqJzTMhkrrXXg/edit?usp=sharing";
const SHEET_CSV_URL = "https://docs.google.com/spreadsheets/d/14Zo1oQT0--dw7L5OJ46OGVivvcxqFViqJzTMhkrrXXg/export?format=csv";
const MI_CONFIG_ENDPOINT = `${scriptURL}?action=mi-config`;
const HISTORY_STORAGE_KEY = "nttu-survey-history";
const SESSION_ID_KEY = "nttu-device-session-id";

const state = {
    profile: null,
    selectedSurveyId: null,
    selectedSurveyName: "",
    history: [],
    miConfig: {},
    miSource: {
        mode: "dataset",
        label: "Bảng số liệu MI người dùng cung cấp",
        detail: "Thiết bị dùng MI quy đổi theo tuổi thọ khi có đủ dữ liệu; máy giặt dùng TMR theo tuổi thọ vì ô MI tổng đang trống. Thực phẩm, điện, quần áo và giày dép dùng hệ số MI trong bảng."
    }
};

const deviceSessionId = getOrCreateSessionId();

const surveys = [
    {
        id: "electricity",
        name: "Khảo sát điện",
        icon: "fa-bolt",
        description: "Tập trung vào loại năng lượng sử dụng, mức tiêu thụ điện, thiết bị điện và hành vi tiết kiệm năng lượng.",
        available: true,
        groups: [
            {
                title: "Nguồn năng lượng và gas",
                questions: [
                    {
                        id: "energy_sources",
                        label: "Loại năng lượng hộ gia đình sử dụng? (Có thể chọn nhiều phương án)",
                        type: "checkbox-other",
                        options: [
                            "Từ điện lưới quốc gia",
                            "Từ điện áp mái từ năng lượng mặt trời",
                            "Từ điện gió"
                        ],
                        otherLabel: "Khác"
                    },
                    {
                        id: "gas_usage",
                        label: "Tiêu thụ gas trong gia đình hàng tháng",
                        type: "radio-other",
                        options: ["Không sử dụng", "1 bình gas/tháng", "2 bình gas/tháng"],
                        otherLabel: "Khác",
                        required: true
                    }
                ]
            },
            {
                title: "Điện năng tiêu thụ",
                description: "Chọn một trong hai cách nhập. Hệ thống sẽ tự quy đổi dữ liệu còn lại để tính MI.",
                questions: [
                    {
                        id: "consumption_basis",
                        label: "Bạn muốn cung cấp mức sử dụng điện theo cách nào?",
                        type: "electricity-choice",
                        required: true,
                        options: [
                            {
                                value: "kwh",
                                inputId: "monthly_kwh",
                                icon: "fa-bolt",
                                title: "Theo điện năng",
                                description: "Nhập số kWh trên hóa đơn điện",
                                inputLabel: "Lượng điện trung bình mỗi tháng",
                                unit: "kWh/tháng"
                            },
                            {
                                value: "bill",
                                inputId: "electric_bill",
                                icon: "fa-receipt",
                                title: "Theo tiền điện",
                                description: "Nhập số tiền thanh toán hàng tháng",
                                inputLabel: "Tiền điện trung bình mỗi tháng",
                                unit: "VNĐ/tháng"
                            }
                        ]
                    }
                ]
            },
            {
                title: "Thiết bị điện tử chính",
                questions: [
                    {
                        id: "devices",
                        label: "Số lượng thiết bị điện tử chính có trong hộ gia đình",
                        type: "grid",
                        items: [
                            { code: "tv", label: "Tivi", factor: 9211.8 },
                            { code: "fridge", label: "Tủ lạnh", factor: 1158.6 },
                            { code: "aircon", label: "Máy lạnh (điều hòa)", factor: 28.8 },
                            { code: "phone", label: "Điện thoại", factor: 8.4 },
                            { code: "laptop", label: "Laptop", factor: 1384.5 },
                            { code: "microwave", label: "Lò vi sóng", factor: 558.9 },
                            { code: "stove", label: "Bếp điện và lò nướng", factor: 1131.8 },
                            { code: "washer", label: "Máy giặt", factor: 82.9 }
                        ]
                    }
                ]
            },
            {
                title: "Tiết kiệm năng lượng",
                questions: [
                    {
                        id: "saving_habits",
                        label: "Hộ gia đình có biện pháp tiết kiệm năng lượng? Nếu có vui lòng nêu ví dụ",
                        type: "text",
                        required: true
                    }
                ]
            }
        ],
        calculate(formData) {
            let usedExternal = false;
            const enteredMonthlyKwh = Number(formData.get("electricity_monthly_kwh")) || 0;
            const enteredElectricBill = Number(formData.get("electricity_electric_bill")) || 0;
            const requestedBasis = String(formData.get("electricity_consumption_basis") || "");
            const consumptionBasis = requestedBasis || (enteredElectricBill > 0 && enteredMonthlyKwh === 0 ? "bill" : "kwh");
            const electricityPrice = pickScalar("electricity", "electricity_price_per_kwh", 3000);
            const safeElectricityPrice = electricityPrice.value > 0 ? electricityPrice.value : 3000;
            usedExternal = usedExternal || electricityPrice.source === "external";

            const monthlyKwh = consumptionBasis === "bill"
                ? enteredElectricBill / safeElectricityPrice
                : enteredMonthlyKwh;
            const estimatedMonthlyBill = consumptionBasis === "bill"
                ? enteredElectricBill
                : enteredMonthlyKwh * safeElectricityPrice;
            const energyScalar = pickScalar("electricity", "energy_per_kwh", 189.75);
            usedExternal = usedExternal || energyScalar.source === "external";
            const energyMi = monthlyKwh * 12 * energyScalar.value;

            const devicesQuestion = this.groups.flatMap((group) => group.questions).find((question) => question.id === "devices");
            const deviceDivisor = pickScalar("electricity", "device_divisor", 1);
            const safeDeviceDivisor = deviceDivisor.value > 0 ? deviceDivisor.value : 1;
            usedExternal = usedExternal || deviceDivisor.source === "external";
            const deviceRows = devicesQuestion.items.map((item) => {
                const quantity = Number(formData.get(`electricity_devices_${item.code}`)) || 0;
                const factorInfo = pickFactor("electricity", item.code, item.factor);
                usedExternal = usedExternal || factorInfo.source === "external";
                return {
                    label: item.label,
                    value: ((quantity * factorInfo.value) / safeDeviceDivisor).toFixed(1)
                };
            }).filter((row) => Number(row.value) > 0);

            const gasMultiplier = formData.get("electricity_gas_usage");
            const gasOptions = {
                "1 bình gas/tháng": { code: "gas_1_cylinder", fallback: 0 },
                "2 bình gas/tháng": { code: "gas_2_cylinders", fallback: 0 }
            };
            const gasOption = gasOptions[gasMultiplier];
            const gasFactor = gasOption ? pickFactor("electricity", gasOption.code, gasOption.fallback) : { value: 0, source: "fallback" };
            usedExternal = usedExternal || gasFactor.source === "external";
            const gasMi = gasFactor.value;
            const deviceTotal = deviceRows.reduce((sum, row) => sum + Number(row.value), 0);
            const total = energyMi + deviceTotal + gasMi;

            const breakdown = [
                {
                    label: consumptionBasis === "bill"
                        ? "Điện năng sử dụng trong năm (quy đổi từ tiền điện)"
                        : "Điện năng sử dụng trong năm",
                    value: energyMi.toFixed(1)
                },
                {
                    label: "Mức điện bình quân dùng để tính",
                    value: `${monthlyKwh.toFixed(1)} kWh/tháng`
                },
                {
                    label: consumptionBasis === "bill" ? "Tiền điện đã nhập" : "Tiền điện ước tính",
                    value: `${Math.round(estimatedMonthlyBill).toLocaleString("vi-VN")} VNĐ/tháng`
                }
            ];
            if (gasMi > 0) {
                breakdown.push({ label: "Ước tính gas sử dụng", value: gasMi.toFixed(1) });
            } else if (gasMultiplier && gasMultiplier !== "Không sử dụng") {
                breakdown.push({ label: "Gas - chưa có hệ số trong bảng", value: "0.0" });
            }
            deviceRows.forEach((row) => breakdown.push({ label: `Thiết bị - ${row.label}`, value: row.value }));

            return {
                total: total.toFixed(1),
                breakdown,
                sourceMode: usedExternal ? "external" : "fallback"
            };
        }
    },
    {
        id: "food",
        name: "Khảo sát thực phẩm",
        icon: "fa-utensils",
        available: true,
        groups: [
            {
                title: "Thói quen tiêu thụ thực phẩm",
                questions: [
                    {
                        id: "meal_habit",
                        label: "Hộ gia đình thường xuyên (có thể chọn nhiều phương án)",
                        type: "checkbox-other",
                        options: ["Nấu ăn ở nhà", "Mua đồ ăn sẵn ở ngoài rồi về ăn", "Đi ăn ở ngoài"],
                        otherLabel: "Khác"
                    },
                    {
                        id: "food_source",
                        label: "Hộ gia đình mua thực phẩm chủ yếu từ nguồn nào? (Có thể chọn nhiều đáp án)",
                        type: "checkbox-other",
                        options: ["Mua ở siêu thị", "Mua ở chợ", "Mua ở cửa hàng tiện lợi", "Đặt online"],
                        otherLabel: "Khác"
                    },
                    {
                        id: "distance",
                        label: "Khoảng cách từ hộ gia đình đến nơi mua thực phẩm (km hoặc phút)",
                        type: "text",
                        required: true
                    }
                ]
            },
            {
                title: "Mua thực phẩm để nấu ăn tại nhà",
                questions: [
                    {
                        id: "weekly_food",
                        label: "Khối lượng thực phẩm tiêu thụ trung bình mỗi tuần",
                        type: "grid",
                        items: [
                            { code: "pork", label: "Thịt heo (kg/tuần)", factor: 2697 },
                            { code: "beef", label: "Thịt bò (kg/tuần)", factor: 3325.19 },
                            { code: "chicken", label: "Thịt gà, vịt (kg/tuần)", factor: 1390.3 },
                            { code: "milk", label: "Sữa (kg/tuần)", factor: 309.504 },
                            { code: "fish", label: "Cá (kg/tuần)", factor: 427.5 },
                            { code: "vegetable", label: "Rau, củ (kg/tuần)", factor: 1022.1245 },
                            { code: "rice", label: "Gạo (kg/tuần)", factor: 2.85 }
                        ]
                    }
                ]
            },
            {
                title: "Đặt đồ ăn online",
                questions: [
                    {
                        id: "delivery_range",
                        label: "Đồ ăn được đặt mua online trong phạm vi",
                        type: "radio",
                        options: ["1-2 km", "2-5 km", "5-10 km", "hơn 10 km"],
                        required: true
                    },
                    {
                        id: "delivery_type",
                        label: "Loại đồ ăn, uống thường được đặt mua online",
                        type: "checkbox-other",
                        options: ["Bữa ăn chính", "Đồ ăn vặt", "Đồ uống (trà sữa, nước ép)"],
                        otherLabel: "Khác"
                    },
                    {
                        id: "delivery_times",
                        label: "Số lần đặt đồ ăn online trong tuần",
                        type: "radio",
                        options: ["1-2 lần/tuần", "3-4 lần/tuần", "5-6 lần/tuần", "hơn 6 lần/tuần"],
                        required: true
                    }
                ]
            },
            {
                title: "Đi ăn ngoài và chế độ ăn đặc biệt",
                questions: [
                    {
                        id: "eatout_times",
                        label: "Số lần đi ăn ở ngoài",
                        type: "radio",
                        options: ["dưới 3 lần/tuần", "3-6 lần/tuần", "6-10 lần/tuần", "hơn 10 lần/tuần"],
                        required: true
                    },
                    {
                        id: "eatout_choices",
                        label: "Số lần chọn món khi đi ăn ở ngoài",
                        type: "grid",
                        items: [
                            { code: "pork", label: "Món có thịt heo (lần/tuần)", factor: 0 },
                            { code: "beef", label: "Món có thịt bò (lần/tuần)", factor: 0 },
                            { code: "chicken", label: "Món có thịt gà (lần/tuần)", factor: 0 },
                            { code: "fish", label: "Món có cá (lần/tuần)", factor: 0 },
                            { code: "milk", label: "Món / đồ uống có sữa (lần/tuần)", factor: 0 },
                            { code: "vegetable", label: "Món rau, củ (lần/tuần)", factor: 0 },
                            { code: "rice", label: "Cơm trắng (lần/tuần)", factor: 0 }
                        ]
                    },
                    {
                        id: "vegetarian",
                        label: "Hộ gia đình có bao nhiêu thành viên ăn chay? Nếu có, chế độ ăn chay như thế nào? Số lần ăn chay trong tháng?",
                        type: "text",
                        required: true
                    },
                    {
                        id: "organic",
                        label: "Hộ gia đình có mua thực phẩm hữu cơ hoặc địa phương không? Nếu có, số lần mua trong tuần?",
                        type: "text",
                        required: true
                    }
                ]
            }
        ],
        calculate(formData) {
            let usedExternal = false;
            const weeklyQuestion = this.groups.flatMap((group) => group.questions).find((question) => question.id === "weekly_food");
            const weeklyRows = weeklyQuestion.items.map((item) => {
                const amount = Number(formData.get(`food_weekly_food_${item.code}`)) || 0;
                const factorInfo = pickFactor("food", item.code, item.factor);
                usedExternal = usedExternal || factorInfo.source === "external";
                return {
                    label: item.label,
                    value: (amount * 52 * factorInfo.value).toFixed(1)
                };
            }).filter((row) => Number(row.value) > 0);

            const eatoutQuestion = this.groups.flatMap((group) => group.questions).find((question) => question.id === "eatout_choices");
            const eatoutRows = eatoutQuestion.items.map((item) => {
                const times = Number(formData.get(`food_eatout_choices_${item.code}`)) || 0;
                const factorInfo = pickFactor("food", `eatout_${item.code}`, item.factor);
                usedExternal = usedExternal || factorInfo.source === "external";
                return {
                    label: item.label,
                    value: (times * 52 * factorInfo.value).toFixed(1)
                };
            }).filter((row) => Number(row.value) > 0);

            const deliveryTimes = formData.get("food_delivery_times");
            const deliveryOptions = {
                "1-2 lần/tuần": { code: "delivery_1_2", fallback: 0 },
                "3-4 lần/tuần": { code: "delivery_3_4", fallback: 0 },
                "5-6 lần/tuần": { code: "delivery_5_6", fallback: 0 },
                "hơn 6 lần/tuần": { code: "delivery_more_6", fallback: 0 }
            };
            const deliveryOption = deliveryOptions[deliveryTimes];
            const deliveryFactor = deliveryOption ? pickFactor("food", deliveryOption.code, deliveryOption.fallback) : { value: 0, source: "fallback" };
            usedExternal = usedExternal || deliveryFactor.source === "external";
            const deliveryMi = deliveryFactor.value;
            const total = weeklyRows.reduce((sum, row) => sum + Number(row.value), 0) + eatoutRows.reduce((sum, row) => sum + Number(row.value), 0) + deliveryMi;

            const breakdown = [...weeklyRows];
            if (deliveryMi > 0) {
                breakdown.push({ label: "Đặt đồ ăn online", value: deliveryMi.toFixed(1) });
            }
            eatoutRows.forEach((row) => breakdown.push({ label: `Ăn ngoài - ${row.label}`, value: row.value }));
            if (deliveryTimes && deliveryMi === 0) {
                breakdown.push({ label: "Đặt đồ ăn online - chưa có hệ số trong bảng", value: "0.0" });
            }
            const hasEatoutChoices = eatoutQuestion.items.some((item) => Number(formData.get(`food_eatout_choices_${item.code}`)) > 0);
            if (hasEatoutChoices && eatoutRows.length === 0) {
                breakdown.push({ label: "Ăn ngoài - bảng chưa có hệ số theo mỗi lần ăn", value: "0.0" });
            }

            return {
                total: total.toFixed(1),
                breakdown,
                sourceMode: usedExternal ? "external" : "fallback"
            };
        }
    },
    {
        id: "fashion",
        name: "Khảo sát thời trang",
        icon: "fa-shirt",
        available: true,
        groups: [
            {
                title: "Mua sắm hằng năm",
                questions: [
                    {
                        id: "annual_purchase",
                        label: "Khối lượng mua sắm trung bình mỗi năm của hộ gia đình",
                        type: "grid",
                        items: [
                            { code: "clothes", label: "Quần, áo (kg/năm)", factor: 1264.145 },
                            { code: "shoes", label: "Giày, dép (kg/năm)", factor: 449.9 }
                        ]
                    }
                ]
            },
            {
                title: "Đồ cũ và kéo dài vòng đời sử dụng",
                questions: [
                    {
                        id: "used_items",
                        label: "Hộ gia đình có mua đồ dùng, thiết bị, nội thất cũ không? Nếu có vui lòng nêu cụ thể",
                        type: "text",
                        required: true
                    },
                    {
                        id: "shopping_style",
                        label: "Gia đình thường chọn cách nào khi mua sắm?",
                        type: "checkbox-other",
                        options: ["Mua mới", "Mua second-hand", "Sửa lại đồ cũ", "Tái sử dụng từ người thân"],
                        otherLabel: "Khác"
                    }
                ]
            }
        ],
        calculate(formData) {
            let usedExternal = false;
            const purchaseQuestion = this.groups.flatMap((group) => group.questions).find((question) => question.id === "annual_purchase");
            const breakdown = purchaseQuestion.items.map((item) => {
                const amount = Number(formData.get(`fashion_annual_purchase_${item.code}`)) || 0;
                const factorInfo = pickFactor("fashion", item.code, item.factor);
                usedExternal = usedExternal || factorInfo.source === "external";
                return {
                    label: item.label,
                    value: (amount * factorInfo.value).toFixed(1)
                };
            }).filter((row) => Number(row.value) > 0);

            const usedText = String(formData.get("fashion_used_items") || "").toLowerCase();
            const total = breakdown.reduce((sum, row) => sum + Number(row.value), 0);

            if (usedText.includes("cũ") || usedText.includes("second")) {
                breakdown.push({ label: "Đồ cũ - bảng chưa có hệ số điều chỉnh", value: "0.0" });
            }

            return {
                total: total.toFixed(1),
                breakdown,
                sourceMode: usedExternal ? "external" : "fallback"
            };
        }
    },
    { id: "housing", name: "Khảo sát nhà ở", icon: "fa-house", description: "Sẽ cập nhật từ phần nhà ở trong Form.", available: false },
    { id: "water", name: "Khảo sát nước", icon: "fa-droplet", description: "Sẽ cập nhật từ phần tiêu thụ nước trong Form.", available: false },
    { id: "transport", name: "Khảo sát giao thông", icon: "fa-bus", description: "Sẽ cập nhật từ phần giao thông và du lịch trong Form.", available: false },
    { id: "waste", name: "Khảo sát rác thải", icon: "fa-recycle", description: "Sẽ cập nhật sau.", available: false },
    { id: "lifestyle", name: "Khảo sát lối sống", icon: "fa-seedling", description: "Sẽ cập nhật sau.", available: false }
];

const stepProgress = {
    "step-profile": "25%",
    "step-selector": "50%",
    "step-questionnaire": "75%",
    "step-result": "100%"
};

const stepLabels = {
    "step-profile": "Bước 1 - Thông tin người tham gia",
    "step-selector": "Bước 2 - Chọn khảo sát",
    "step-questionnaire": "Bước 3 - Trả lời câu hỏi",
    "step-result": "Bước 4 - Kết quả, so sánh và lịch sử của bạn"
};

function setActiveStep(stepId) {
    document.body.classList.toggle("profile-step", stepId === "step-profile");

    document.querySelectorAll(".wizard-step").forEach((step) => {
        step.classList.toggle("active", step.id === stepId);
    });

    const navItems = Array.from(document.querySelectorAll(".step-nav-item"));
    const currentIndex = navItems.findIndex((item) => item.dataset.stepTarget === stepId);
    navItems.forEach((item, index) => {
        item.classList.toggle("active", item.dataset.stepTarget === stepId);
        item.classList.toggle("completed", currentIndex > -1 && index < currentIndex);
    });

    const progressBar = document.getElementById("progress");
    if (progressBar) {
        progressBar.style.width = stepProgress[stepId] || "25%";
    }

    const currentStepLabel = document.getElementById("currentStepLabel");
    if (currentStepLabel) {
        currentStepLabel.textContent = stepLabels[stepId] || "Khảo sát tiêu dùng bền vững";
    }

    window.scrollTo({ top: 0, behavior: "smooth" });
}

function escapeHtml(value) {
    return String(value)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#39;");
}

function getOrCreateSessionId() {
    const existing = sessionStorage.getItem(SESSION_ID_KEY);
    if (existing) return existing;

    const generated = `session-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
    sessionStorage.setItem(SESSION_ID_KEY, generated);
    return generated;
}

function getStoredHistory() {
    try {
        const raw = sessionStorage.getItem(HISTORY_STORAGE_KEY);
        const parsed = raw ? JSON.parse(raw) : [];
        return Array.isArray(parsed) ? parsed : [];
    } catch (error) {
        return [];
    }
}

function persistHistory() {
    sessionStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(state.history));
}

function renderHistory() {
    const targets = [
        document.getElementById("historyList"),
        document.getElementById("historyListResult")
    ].filter(Boolean);

    const markup = state.history.length
        ? state.history.map((entry) => `
            <article class="history-item">
                <div>
                    <h4>${escapeHtml(entry.surveyName)}</h4>
                    <p>${escapeHtml(entry.fullname)} • ${escapeHtml(entry.location)}</p>
                    <p>${escapeHtml(entry.completedAtLabel)} • ${escapeHtml(entry.sourceLabel)}</p>
                </div>
                <strong>${escapeHtml(entry.total)} MI</strong>
            </article>
        `).join("")
        : `
            <article class="history-empty">
                <h4>Lịch sử chỉ thuộc thiết bị này</h4>
                <p>Mục này chỉ lưu những khảo sát bạn đã thực hiện trên chính trình duyệt hiện tại, không hiển thị dữ liệu của người khác.</p>
            </article>
        `;

    targets.forEach((target) => {
        target.innerHTML = markup;
    });
}

function clearHistory() {
    state.history = [];
    persistHistory();
    renderHistory();
}

function normalizeExternalConfig(data) {
    if (!data || typeof data !== "object") return {};
    if (data.surveys && typeof data.surveys === "object") return data.surveys;
    if (!Array.isArray(data.rows)) return {};

    return rowsToMiConfig(data.rows);
}

function normalizeConfigHeader(value) {
    return String(value || "")
        .trim()
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/đ/g, "d")
        .replace(/[^a-z0-9_]/g, "");
}

function findConfigIndex(headers, aliases) {
    return aliases.reduce((foundIndex, alias) => {
        if (foundIndex >= 0) return foundIndex;
        return headers.indexOf(normalizeConfigHeader(alias));
    }, -1);
}

function readConfigValue(row, aliases) {
    for (const alias of aliases) {
        if (Object.prototype.hasOwnProperty.call(row, alias)) {
            return row[alias];
        }

        const normalizedAlias = normalizeConfigHeader(alias);
        const matchedKey = Object.keys(row).find((key) => normalizeConfigHeader(key) === normalizedAlias);
        if (matchedKey) {
            return row[matchedKey];
        }
    }

    return "";
}

function parseConfigNumber(value) {
    if (typeof value === "number") return value;

    let normalized = String(value || "")
        .trim()
        .replace(/\s/g, "");

    const commaCount = (normalized.match(/,/g) || []).length;
    const dotCount = (normalized.match(/\./g) || []).length;

    if (commaCount > 0 && dotCount > 0) {
        normalized = normalized.replace(/\./g, "").replace(",", ".");
    } else if (commaCount === 1 && /^\d+,\d{3}$/.test(normalized)) {
        normalized = normalized.replace(",", "");
    } else if (commaCount === 1) {
        normalized = normalized.replace(",", ".");
    } else if (dotCount === 1 && /^\d+\.\d{3}$/.test(normalized)) {
        normalized = normalized.replace(".", "");
    }

    return Number(normalized);
}

function rowsToMiConfig(rows) {
    return rows.reduce((acc, row) => {
        const survey = String(readConfigValue(row, ["survey", "survey_id", "surveyId", "khao_sat", "khảo sát", "nhom", "nhóm"])).trim();
        const code = String(readConfigValue(row, ["code", "ma", "mã", "ma_he_so", "mã hệ số", "item"])).trim();
        const value = parseConfigNumber(readConfigValue(row, ["value", "gia_tri", "giá trị", "he_so", "hệ số", "factor", "mi"]));
        const type = String(readConfigValue(row, ["type", "loai", "loại", "kind"]) || "factor").trim().toLowerCase();

        if (!survey || !code || Number.isNaN(value)) return acc;
        if (!acc[survey]) {
            acc[survey] = { factors: {}, scalars: {} };
        }

        const bucket = type === "scalar" ? acc[survey].scalars : acc[survey].factors;
        bucket[code] = value;
        return acc;
    }, {});
}

function parseCsvLine(line) {
    const cells = [];
    let current = "";
    let inQuotes = false;

    for (let index = 0; index < line.length; index += 1) {
        const char = line[index];
        const next = line[index + 1];
        if (char === '"' && inQuotes && next === '"') {
            current += '"';
            index += 1;
        } else if (char === '"') {
            inQuotes = !inQuotes;
        } else if (char === "," && !inQuotes) {
            cells.push(current.trim());
            current = "";
        } else {
            current += char;
        }
    }

    cells.push(current.trim());
    return cells;
}

function parseCsvConfig(csvText) {
    const lines = csvText.split(/\r?\n/).filter(Boolean);
    if (lines.length < 2) return {};

    const headers = parseCsvLine(lines[0]).map(normalizeConfigHeader);
    const surveyIndex = findConfigIndex(headers, ["survey", "survey_id", "khao_sat", "khảo sát", "nhom", "nhóm"]);
    const codeIndex = findConfigIndex(headers, ["code", "ma", "mã", "ma_he_so", "mã hệ số", "item"]);
    const valueIndex = findConfigIndex(headers, ["value", "gia_tri", "giá trị", "he_so", "hệ số", "factor", "mi"]);
    const typeIndex = findConfigIndex(headers, ["type", "loai", "loại", "kind"]);

    if (surveyIndex === -1 || codeIndex === -1 || valueIndex === -1) return {};

    return lines.slice(1).reduce((acc, line) => {
        const cells = parseCsvLine(line);
        const surveyId = cells[surveyIndex];
        const code = cells[codeIndex];
        const value = parseConfigNumber(cells[valueIndex]);
        const type = typeIndex >= 0 ? cells[typeIndex] : "factor";

        if (!surveyId || !code || Number.isNaN(value)) return acc;
        if (!acc[surveyId]) {
            acc[surveyId] = { factors: {}, scalars: {} };
        }

        if (type === "scalar") {
            acc[surveyId].scalars[code] = value;
        } else {
            acc[surveyId].factors[code] = value;
        }
        return acc;
    }, {});
}

async function loadExternalMiConfig() {
    const attempts = [
        async () => {
            const response = await fetch(MI_CONFIG_ENDPOINT);
            if (!response.ok) throw new Error(`HTTP ${response.status}`);
            const data = await response.json();
            const config = normalizeExternalConfig(data);
            if (!Object.keys(config).length) throw new Error("Empty JSON config");
            return {
                config,
                source: {
                    mode: "external",
                    label: "App Script / JSON",
                    detail: "Đã lấy hệ số MI từ endpoint JSON bên ngoài."
                }
            };
        },
        async () => {
            const response = await fetch(SHEET_CSV_URL);
            if (!response.ok) throw new Error(`HTTP ${response.status}`);
            const csvText = await response.text();
            const config = parseCsvConfig(csvText);
            if (!Object.keys(config).length) throw new Error("Empty CSV config");
            return {
                config,
                source: {
                    mode: "external",
                    label: "Google Sheet / CSV",
                    detail: "Đã lấy hệ số MI từ Google Sheet public."
                }
            };
        }
    ];

    for (const attempt of attempts) {
        try {
            const result = await attempt();
            state.miConfig = result.config;
            state.miSource = result.source;
            return;
        } catch (error) {
            continue;
        }
    }
}

function getExternalFactor(surveyId, code) {
    return state.miConfig?.[surveyId]?.factors?.[code];
}

function getExternalScalar(surveyId, code) {
    return state.miConfig?.[surveyId]?.scalars?.[code];
}

function pickFactor(surveyId, code, fallbackValue) {
    const externalValue = getExternalFactor(surveyId, code);
    if (typeof externalValue === "number" && !Number.isNaN(externalValue)) {
        return { value: externalValue, source: "external" };
    }
    return { value: fallbackValue, source: "fallback" };
}

function pickScalar(surveyId, code, fallbackValue) {
    const externalValue = getExternalScalar(surveyId, code);
    if (typeof externalValue === "number" && !Number.isNaN(externalValue)) {
        return { value: externalValue, source: "external" };
    }
    return { value: fallbackValue, source: "fallback" };
}

function showInlineError(target, message) {
    clearInlineError(target);
    const error = document.createElement("p");
    error.className = "error-text";
    error.textContent = message;
    target.insertAdjacentElement("afterend", error);
}

function clearInlineError(target) {
    const next = target.nextElementSibling;
    if (next && next.classList.contains("error-text")) {
        next.remove();
    }
}

function showGroupError(group, message) {
    const existing = group.querySelector(".error-text");
    if (existing) existing.remove();

    const error = document.createElement("p");
    error.className = "error-text";
    error.textContent = message;
    group.appendChild(error);
}

function validateForm(form) {
    let isValid = true;
    let firstInvalidField = null;
    const fields = form.querySelectorAll("input, select, textarea");
    const checkedNames = new Set();

    const markInvalid = (field, message) => {
        isValid = false;
        if (!firstInvalidField) firstInvalidField = field;
        showInlineError(field, message);
    };

    fields.forEach((field) => {
        if (field.disabled) {
            if (field.required) {
                markInvalid(field, "Vui lòng hoàn tất lựa chọn phía trên trước.");
            }
            return;
        }

        if (field.type === "radio" && field.required) {
            if (checkedNames.has(field.name)) return;
            checkedNames.add(field.name);

            const checked = form.querySelector(`input[name="${field.name}"]:checked`);
            const group = field.closest(".question-group");
            if (group) {
                const existing = group.querySelector(".error-text");
                if (existing) existing.remove();
            }

            if (!checked) {
                isValid = false;
                if (!firstInvalidField) firstInvalidField = field;
                if (group) showGroupError(group, "Vui lòng chọn một đáp án.");
            }
            return;
        }

        if (field.type === "radio" || field.type === "checkbox") return;

        clearInlineError(field);
        const value = String(field.value).trim();
        if (field.required && !value) {
            markInvalid(field, "Vui lòng điền trường này.");
            return;
        }

        if (field.type === "number" && value) {
            const numberValue = Number(value);
            const min = field.min === "" ? null : Number(field.min);
            const max = field.max === "" ? null : Number(field.max);

            if (!Number.isFinite(numberValue)) {
                markInvalid(field, "Vui lòng nhập một số hợp lệ.");
            } else if (min !== null && numberValue < min) {
                markInvalid(field, `Giá trị nhỏ nhất là ${field.min}.`);
            } else if (max !== null && numberValue > max) {
                markInvalid(field, `Giá trị lớn nhất là ${field.max}.`);
            } else if (field.step === "1" && !Number.isInteger(numberValue)) {
                markInvalid(field, "Vui lòng nhập số nguyên.");
            }
        }
    });

    form.querySelectorAll('input[value="other"]:checked').forEach((otherOption) => {
        const otherField = form.elements.namedItem(`${otherOption.name}_other`);
        if (!(otherField instanceof HTMLInputElement)) return;

        clearInlineError(otherField);
        if (!otherField.value.trim()) {
            markInvalid(otherField, "Vui lòng ghi rõ phương án khác.");
        }
    });

    if (firstInvalidField) {
        firstInvalidField.focus({ preventScroll: true });
        firstInvalidField.scrollIntoView({ behavior: "smooth", block: "center" });
    }

    return isValid;
}

function getSurveyById(surveyId) {
    return surveys.find((survey) => survey.id === surveyId);
}

function renderSurveyCards() {
    const grid = document.getElementById("surveyGrid");
    if (!grid) return;

    grid.innerHTML = surveys.map((survey, index) => `
        <article class="survey-box ${survey.available ? "" : "disabled"}" data-survey-id="${survey.id}" ${survey.available ? "" : 'aria-disabled="true"'}>
            <span class="survey-badge">${survey.available ? `Khảo sát ${index + 1}` : "Sắp có"}</span>
            <i class="fas ${survey.icon}"></i>
            <h3>${survey.name}</h3>
            ${survey.description ? `<p>${survey.description}</p>` : ""}
        </article>
    `).join("");

    grid.querySelectorAll(".survey-box").forEach((card) => {
        card.addEventListener("click", () => {
            const surveyId = card.dataset.surveyId;
            const survey = getSurveyById(surveyId);
            if (!survey || !survey.available) return;
            startSurvey(surveyId);
        });
    });
}

function renderQuestion(question, surveyId) {
    const namePrefix = `${surveyId}_${question.id}`;
    let html = '<div class="question-group">';

    if (question.note) {
        html += `<div class="note-highlight">${question.note}</div>`;
    }

    html += `<label class="question-label">${question.label}</label>`;

    if (question.type === "number") {
        html += `<input type="number" name="${namePrefix}" min="${question.min ?? 0}" step="${question.step ?? "any"}" inputmode="decimal" ${question.required ? "required" : ""}>`;
    } else if (question.type === "text") {
        html += `<input type="text" name="${namePrefix}" ${question.required ? "required" : ""}>`;
    } else if (question.type === "radio" || question.type === "radio-other") {
        html += `<div class="options-list">${question.options.map((option) => `
            <label class="option-item-custom">
                <input type="radio" name="${namePrefix}" value="${option}" ${question.required ? "required" : ""}>
                ${option}
            </label>
        `).join("")}`;
        if (question.type === "radio-other") {
            html += `
                <label class="option-item-custom">
                    <input type="radio" name="${namePrefix}" value="other">
                    ${question.otherLabel}:
                    <input type="text" name="${namePrefix}_other">
                </label>
            `;
        }
        html += "</div>";
    } else if (question.type === "checkbox-other") {
        html += `<div class="options-list">${question.options.map((option) => `
            <label class="option-item-custom">
                <input type="checkbox" name="${namePrefix}" value="${option}">
                ${option}
            </label>
        `).join("")}
            <label class="option-item-custom">
                <input type="checkbox" name="${namePrefix}" value="other">
                ${question.otherLabel}:
                <input type="text" name="${namePrefix}_other">
            </label>
        </div>`;
    } else if (question.type === "electricity-choice") {
        html += `
            <div class="consumption-choice" data-consumption-choice>
                <div class="consumption-choice-head">
                    <span class="eco-mini-icon"><i class="fas fa-leaf"></i></span>
                    <div>
                        <strong>Chỉ cần nhập một thông tin</strong>
                        <p>Hệ thống dùng mức giá quy đổi tham khảo 3.000 VNĐ/kWh và có thể cập nhật từ bảng hệ số MI.</p>
                    </div>
                </div>
                <div class="consumption-tabs" role="radiogroup" aria-label="Cách nhập mức sử dụng điện">
                    ${question.options.map((option, index) => `
                        <label class="consumption-option ${index === 0 ? "active" : ""}">
                            <input type="radio" name="electricity_consumption_basis" value="${option.value}" ${index === 0 ? "checked" : ""} required>
                            <span class="consumption-option-icon"><i class="fas ${option.icon}"></i></span>
                            <span>
                                <strong>${option.title}</strong>
                                <small>${option.description}</small>
                            </span>
                            <i class="fas fa-circle-check consumption-check"></i>
                        </label>
                    `).join("")}
                </div>
                <div class="consumption-panels">
                    ${question.options.map((option, index) => `
                        <div class="consumption-panel ${index === 0 ? "active" : ""}" data-consumption-panel="${option.value}">
                            <label class="input-label" for="electricity_${option.inputId}">${option.inputLabel}</label>
                            <div class="input-with-unit">
                                <input
                                    id="electricity_${option.inputId}"
                                    type="number"
                                    class="smart-number consumption-value"
                                    name="electricity_${option.inputId}"
                                    min="0"
                                    step="any"
                                    inputmode="decimal"
                                    value="0"
                                    ${index === 0 ? "required" : "disabled"}
                                >
                                <span>${option.unit}</span>
                            </div>
                            <p class="conversion-preview" data-conversion-preview></p>
                        </div>
                    `).join("")}
                </div>
            </div>
        `;
    } else if (question.type === "grid") {
        html += `<div class="grid-container">${question.items.map((item) => `
            <div class="grid-row">
                <span>${item.label}</span>
                <input type="number" class="smart-number" name="${namePrefix}_${item.code}" min="0" step="any" inputmode="decimal" value="0">
            </div>
        `).join("")}</div>`;
    }

    html += "</div>";
    return html;
}

function bindSmartNumberInputs(scope) {
    scope.querySelectorAll('input[type="number"]').forEach((input) => {
        input.addEventListener("focus", () => {
            if (input.value === "0") {
                input.value = "";
            }
        });

        input.addEventListener("blur", () => {
            if (input.classList.contains("smart-number") && input.value.trim() === "") {
                input.value = "0";
            }
        });
    });
}

function bindElectricityChoice(scope) {
    scope.querySelectorAll("[data-consumption-choice]").forEach((choice) => {
        const radios = Array.from(choice.querySelectorAll('input[name="electricity_consumption_basis"]'));
        const options = Array.from(choice.querySelectorAll(".consumption-option"));
        const panels = Array.from(choice.querySelectorAll("[data-consumption-panel]"));

        const updatePreview = (panel) => {
            const input = panel.querySelector(".consumption-value");
            const preview = panel.querySelector("[data-conversion-preview]");
            if (!input || !preview) return;

            const amount = Number(input.value) || 0;
            const priceInfo = pickScalar("electricity", "electricity_price_per_kwh", 3000);
            const pricePerKwh = priceInfo.value > 0 ? priceInfo.value : 3000;
            const mode = panel.dataset.consumptionPanel;

            if (amount <= 0) {
                preview.textContent = mode === "bill"
                    ? "Hệ thống sẽ quy đổi số tiền này sang kWh."
                    : "Hệ thống sẽ ước tính tiền điện tương ứng.";
                return;
            }

            preview.textContent = mode === "bill"
                ? `Tương đương khoảng ${(amount / pricePerKwh).toFixed(1)} kWh/tháng`
                : `Tiền điện ước tính khoảng ${Math.round(amount * pricePerKwh).toLocaleString("vi-VN")} VNĐ/tháng`;
        };

        const activateMode = (mode, shouldFocus = false) => {
            options.forEach((option) => {
                const radio = option.querySelector('input[type="radio"]');
                option.classList.toggle("active", radio?.value === mode);
            });

            panels.forEach((panel) => {
                const isActive = panel.dataset.consumptionPanel === mode;
                const input = panel.querySelector(".consumption-value");
                panel.classList.toggle("active", isActive);
                if (input) {
                    input.disabled = !isActive;
                    input.required = isActive;
                    if (isActive && shouldFocus) input.focus();
                }
                updatePreview(panel);
            });
        };

        radios.forEach((radio) => {
            radio.addEventListener("change", () => activateMode(radio.value, true));
        });

        panels.forEach((panel) => {
            const input = panel.querySelector(".consumption-value");
            if (input) input.addEventListener("input", () => updatePreview(panel));
        });

        activateMode(radios.find((radio) => radio.checked)?.value || "kwh");
    });
}

function renderSurveyQuestions(survey) {
    const surveyTitle = document.getElementById("surveyTitle");
    const surveyMeta = document.getElementById("surveyMeta");
    const dynamicQuestions = document.getElementById("dynamicQuestions");
    const surveyForm = document.getElementById("surveyForm");

    if (!surveyTitle || !surveyMeta || !dynamicQuestions || !surveyForm) return;

    surveyTitle.textContent = survey.name;
    surveyMeta.innerHTML = `
        ${survey.description ? `<strong>Mô tả:</strong> ${survey.description}` : ""}
    `;

    dynamicQuestions.innerHTML = survey.groups.map((group) => `
        <section class="question-cluster">
            <div class="question-cluster-header">
                <h3>${group.title}</h3>
                ${group.description ? `<p>${group.description}</p>` : ""}
            </div>
            ${group.questions.map((question) => renderQuestion(question, survey.id)).join("")}
        </section>
    `).join("");

    surveyForm.reset();
    bindElectricityChoice(dynamicQuestions);
    bindSmartNumberInputs(dynamicQuestions);
}

function collectProfileData() {
    const form = document.getElementById("profileForm");
    const formData = new FormData(form);

    return {
        fullname: String(formData.get("fullname") || "").trim(),
        age: String(formData.get("age") || "").trim(),
        gender: String(formData.get("gender") || "").trim(),
        household: String(formData.get("household") || "").trim(),
        province: String(formData.get("province") || "").trim(),
        district: String(formData.get("district") || "").trim(),
        ward: String(formData.get("ward") || "").trim()
    };
}

function startSurvey(surveyId) {
    const survey = getSurveyById(surveyId);
    if (!survey) return;

    const profileForm = document.getElementById("profileForm");
    if (!state.profile) {
        setActiveStep("step-profile");
        if (profileForm) validateForm(profileForm);
        return;
    }

    state.selectedSurveyId = survey.id;
    state.selectedSurveyName = survey.name;
    renderSurveyQuestions(survey);
    setActiveStep("step-questionnaire");
}

function getComparisonSummary(surveyId, currentTotal) {
    const relevant = state.history
        .filter((entry) => entry.surveyId === surveyId)
        .map((entry) => Number(entry.total))
        .filter((value) => !Number.isNaN(value));

    if (relevant.length === 0) {
        return {
            average: null,
            diff: null,
            count: 0
        };
    }

    const average = relevant.reduce((sum, value) => sum + value, 0) / relevant.length;
    return {
        average,
        diff: currentTotal - average,
        count: relevant.length
    };
}

function renderResult(result, survey) {
    const resultLead = document.getElementById("resultLead");
    const resultSurveyName = document.getElementById("resultSurveyName");
    const resultTotal = document.getElementById("resultTotal");
    const resultBreakdown = document.getElementById("resultBreakdown");
    const comparisonCard = document.getElementById("comparisonCard");

    if (!resultLead || !resultSurveyName || !resultTotal || !resultBreakdown || !comparisonCard) return;

    const participantName = state.profile?.fullname || "Bạn";
    resultLead.textContent = `${participantName} đã hoàn thành ${survey.name}. Đây là kết quả MI ước tính cho khảo sát vừa chọn.`;
    resultSurveyName.textContent = survey.name;
    const numericTotal = Number(result.total);
    resultTotal.textContent = Number.isFinite(numericTotal)
        ? `${numericTotal.toLocaleString("vi-VN", { maximumFractionDigits: 1 })} MI`
        : "0 MI";
    resultBreakdown.innerHTML = result.breakdown.length
        ? result.breakdown.map((item) => `
            <div class="result-item">
                <span>${item.label}</span>
                <strong>${item.value}</strong>
            </div>
        `).join("")
        : '<div class="result-item"><span>Chưa có dữ liệu đủ để tính MI.</span><strong>0</strong></div>';

    const comparison = getComparisonSummary(survey.id, Number(result.total));
    if (comparison.count > 0) {
        comparisonCard.innerHTML = `
            <h4>So sánh với các lần bạn đã làm trước đó trên thiết bị này</h4>
            <p>Phần này hiện chỉ so sánh với lịch sử cục bộ của chính bạn trong trình duyệt này. Khi có dữ liệu chung, mình có thể nâng cấp sang so sánh với trung bình nhiều người.</p>
            <div class="comparison-stats">
                <div class="comparison-stat">
                    <span>Kết quả hiện tại</span>
                    <strong>${Number(result.total).toFixed(1)} MI</strong>
                </div>
                <div class="comparison-stat">
                    <span>Trung bình trước đó</span>
                    <strong>${comparison.average.toFixed(1)} MI</strong>
                </div>
                <div class="comparison-stat">
                    <span>Chênh lệch</span>
                    <strong>${comparison.diff >= 0 ? "+" : ""}${comparison.diff.toFixed(1)} MI</strong>
                </div>
            </div>
        `;
    } else {
        comparisonCard.innerHTML = `
            <h4>So sánh kết quả</h4>
            <p>Hiện chưa có đủ lịch sử trên thiết bị này để tạo trung bình so sánh. Sau khi bạn làm thêm các khảo sát trong phiên, mục này sẽ bắt đầu hiện số liệu đối chiếu.</p>
        `;
    }
}

function formDataToObject(formData) {
    const data = {};

    formData.forEach((value, key) => {
        if (Object.prototype.hasOwnProperty.call(data, key)) {
            data[key] = Array.isArray(data[key]) ? data[key].concat(value) : [data[key], value];
        } else {
            data[key] = value;
        }
    });

    return data;
}

function buildSubmissionPayload(formData, result) {
    const payload = new URLSearchParams();
    const submittedAt = new Date().toISOString();
    const responseData = formDataToObject(formData);

    if (state.profile) {
        Object.entries(state.profile).forEach(([key, value]) => payload.append(key, value));
    }

    payload.append("submitted_at", submittedAt);
    payload.append("submission_id", `${deviceSessionId}-${Date.now()}`);
    payload.append("device_session_id", deviceSessionId);
    payload.append("survey_id", state.selectedSurveyId);
    payload.append("survey_name", state.selectedSurveyName);
    payload.append("result_total", result?.total ?? "");
    payload.append("result_source_mode", result?.sourceMode ?? "");
    payload.append("mi_source_label", result?.sourceMode === "external" ? state.miSource.label : "Bảng số liệu MI");
    payload.append("mi_source_detail", state.miSource.detail || "");
    payload.append("result_breakdown_json", JSON.stringify(result?.breakdown ?? []));
    payload.append("response_json", JSON.stringify(responseData));
    payload.append("profile_json", JSON.stringify(state.profile ?? {}));
    payload.append("user_agent", navigator.userAgent || "");
    formData.forEach((value, key) => payload.append(key, value));

    return payload;
}

async function submitToGoogleScript(formData, result) {
    try {
        await fetch(scriptURL, {
            method: "POST",
            body: buildSubmissionPayload(formData, result),
            mode: "no-cors"
        });
        return { configured: true, success: true };
    } catch (error) {
        console.error("Submit failed:", error);
        return { configured: true, success: false };
    }
}

async function submitToDataSheet(formData, result) {
    if (!DATA_SCRIPT_URL) {
        return { configured: false, success: false };
    }

    try {
        await fetch(DATA_SCRIPT_URL, {
            method: "POST",
            body: buildSubmissionPayload(formData, result),
            mode: "no-cors"
        });
        return { configured: true, success: true };
    } catch (error) {
        console.error("Data sheet submit failed:", error);
        return { configured: true, success: false };
    }
}

async function handleSurveySubmit(event) {
    event.preventDefault();
    const submitButton = document.getElementById("submitSurveyBtn");
    const submitStatus = document.getElementById("surveySubmitStatus");
    const form = event.currentTarget;

    if (!validateForm(form)) return;

    const survey = getSurveyById(state.selectedSurveyId);
    if (!survey) return;

    const formData = new FormData(form);
    submitButton.disabled = true;
    submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Đang xử lý...';
    if (submitStatus) {
        submitStatus.className = "submit-status";
        submitStatus.textContent = "";
    }

    let result;
    try {
        result = survey.calculate(formData);
        if (!result || !Number.isFinite(Number(result.total))) {
            throw new Error("Invalid MI result");
        }
        renderResult(result, survey);
    } catch (error) {
        console.error("MI calculation failed:", error);
        submitButton.disabled = false;
        submitButton.innerHTML = 'Hoàn thành khảo sát <i class="fa fa-paper-plane"></i>';
        if (submitStatus) {
            submitStatus.className = "submit-status error";
            submitStatus.textContent = "Không thể tính chỉ số MI. Vui lòng tải lại trang và thử lại.";
        }
        return;
    }

    state.history.unshift({
        surveyId: survey.id,
        surveyName: survey.name,
        fullname: state.profile?.fullname || "Người dùng",
        location: [state.profile?.ward, state.profile?.district, state.profile?.province].filter(Boolean).join(", "),
        total: result.total,
        sourceLabel: result.sourceMode === "external" ? state.miSource.label : "Bảng số liệu MI",
        completedAt: new Date().toISOString(),
        completedAtLabel: new Date().toLocaleString("vi-VN")
    });
    state.history = state.history.slice(0, 12);
    persistHistory();
    renderHistory();

    submitButton.disabled = false;
    submitButton.innerHTML = 'Hoàn thành khảo sát <i class="fa fa-paper-plane"></i>';
    setActiveStep("step-result");

    Promise.all([
        submitToGoogleScript(formData, result),
        submitToDataSheet(formData, result)
    ]).catch((error) => {
        console.error("Background sheet submit failed:", error);
    });
}

async function loadAdministrativeData() {
    const provinceSelect = document.getElementById("province");
    const districtSelect = document.getElementById("district");
    const wardSelect = document.getElementById("ward");
    if (!provinceSelect || !districtSelect || !wardSelect) return;

    const apiProviders = [
        {
            id: "open-api",
            provinceUrl: "https://provinces.open-api.vn/api/p/",
            provinceDetailUrl: (code) => `https://provinces.open-api.vn/api/p/${code}?depth=2`,
            districtDetailUrl: (code) => `https://provinces.open-api.vn/api/d/${code}?depth=2`,
            normalizeProvinces: (data) => data.map((province) => ({
                code: province.code,
                name: province.name
            })),
            normalizeDistricts: (data) => (data.districts || []).map((district) => ({
                code: district.code,
                name: district.name
            })),
            normalizeWards: (data) => (data.wards || []).map((ward) => ({
                code: ward.code || ward.name,
                name: ward.name
            }))
        },
        {
            id: "esgoo",
            provinceUrl: "https://esgoo.net/api-tinhthanh/1/0.htm",
            provinceDetailUrl: (code) => `https://esgoo.net/api-tinhthanh/2/${code}.htm`,
            districtDetailUrl: (code) => `https://esgoo.net/api-tinhthanh/3/${code}.htm`,
            normalizeProvinces: (data) => (data.data || []).map((province) => ({
                code: province.id,
                name: province.full_name || province.name
            })),
            normalizeDistricts: (data) => (data.data || []).map((district) => ({
                code: district.id,
                name: district.full_name || district.name
            })),
            normalizeWards: (data) => (data.data || []).map((ward) => ({
                code: ward.id,
                name: ward.full_name || ward.name
            }))
        }
    ];

    async function fetchJsonWithTimeout(url, timeoutMs = 8000) {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

        try {
            const response = await fetch(url, { signal: controller.signal });
            if (!response.ok) throw new Error(`HTTP ${response.status}`);
            return await response.json();
        } finally {
            clearTimeout(timeoutId);
        }
    }

    function setOptions(select, placeholder, items, sourceId = "") {
        select.innerHTML = `<option value="">${placeholder}</option>`;
        items.forEach((item) => {
            const option = document.createElement("option");
            option.value = item.name;
            option.textContent = item.name;
            option.dataset.code = item.code;
            option.dataset.source = sourceId;
            select.appendChild(option);
        });
        select.disabled = false;
    }

    function setManualFallback() {
        provinceSelect.innerHTML = '<option value="Không xác định">Không xác định</option>';
        districtSelect.innerHTML = '<option value="Không xác định">Không xác định</option>';
        wardSelect.innerHTML = '<option value="Không xác định">Không xác định</option>';
        provinceSelect.disabled = false;
        districtSelect.disabled = false;
        wardSelect.disabled = false;
    }

    async function loadWithProviders(loader) {
        for (const provider of apiProviders) {
            try {
                const items = await loader(provider);
                if (items.length > 0) {
                    return { provider, items };
                }
            } catch (error) {
                continue;
            }
        }
        return null;
    }

    try {
        const result = await loadWithProviders(async (provider) => {
            const data = await fetchJsonWithTimeout(provider.provinceUrl);
            return provider.normalizeProvinces(data);
        });
        if (!result) throw new Error("No province data");
        setOptions(provinceSelect, "Chọn tỉnh / thành...", result.items, result.provider.id);
    } catch (error) {
        setManualFallback();
    }

    provinceSelect.addEventListener("change", async function handleProvinceChange() {
        clearInlineError(this);
        const selectedOption = this.options[this.selectedIndex];
        const code = selectedOption?.dataset.code;
        const sourceId = selectedOption?.dataset.source;
        const provider = apiProviders.find((item) => item.id === sourceId);
        districtSelect.innerHTML = '<option value="">Chọn quận / huyện...</option>';
        districtSelect.disabled = !code || !provider;
        wardSelect.innerHTML = '<option value="">Chọn phường / xã...</option>';
        wardSelect.disabled = true;
        if (!code || !provider) return;

        try {
            const data = await fetchJsonWithTimeout(provider.provinceDetailUrl(code));
            const districts = provider.normalizeDistricts(data);
            if (!districts.length) throw new Error("No district data");
            setOptions(districtSelect, "Chọn quận / huyện...", districts, provider.id);
        } catch (error) {
            districtSelect.innerHTML = '<option value="Không xác định">Không xác định</option>';
            districtSelect.disabled = false;
            wardSelect.innerHTML = '<option value="Không xác định">Không xác định</option>';
            wardSelect.disabled = false;
        }
    });

    districtSelect.addEventListener("change", async function handleDistrictChange() {
        clearInlineError(this);
        const selectedOption = this.options[this.selectedIndex];
        const code = selectedOption?.dataset.code;
        const sourceId = selectedOption?.dataset.source;
        const provider = apiProviders.find((item) => item.id === sourceId);
        wardSelect.innerHTML = '<option value="">Chọn phường / xã...</option>';
        wardSelect.disabled = !code || !provider;
        if (!code || !provider) return;

        try {
            const data = await fetchJsonWithTimeout(provider.districtDetailUrl(code));
            const wards = provider.normalizeWards(data);
            if (!wards.length) throw new Error("No ward data");
            setOptions(wardSelect, "Chọn phường / xã...", wards, provider.id);
        } catch (error) {
            wardSelect.innerHTML = '<option value="Không xác định">Không xác định</option>';
            wardSelect.disabled = false;
        }
    });
}

function bindEvents() {
    const toSurveySelector = document.getElementById("toSurveySelector");
    const backToProfile = document.getElementById("backToProfile");
    const backToSelector = document.getElementById("backToSelector");
    const anotherSurvey = document.getElementById("anotherSurvey");
    const againSameSurvey = document.getElementById("againSameSurvey");
    const surveyForm = document.getElementById("surveyForm");
    const profileForm = document.getElementById("profileForm");
    const clearHistoryBtn = document.getElementById("clearHistoryBtn");
    const stepNavItems = document.querySelectorAll(".step-nav-item");

    const openSurveySelector = () => {
        if (!validateForm(profileForm)) return;
        state.profile = collectProfileData();
        setActiveStep("step-selector");
    };

    toSurveySelector.addEventListener("click", openSurveySelector);

    backToProfile.addEventListener("click", () => setActiveStep("step-profile"));
    backToSelector.addEventListener("click", () => setActiveStep("step-selector"));
    anotherSurvey.addEventListener("click", () => setActiveStep("step-selector"));
    clearHistoryBtn.addEventListener("click", clearHistory);

    stepNavItems.forEach((item) => {
        item.addEventListener("click", () => {
            const target = item.dataset.stepTarget;
            if (!target) return;
            if (target === "step-profile") {
                setActiveStep(target);
                return;
            }
            if (target === "step-selector") {
                openSurveySelector();
                return;
            }
            if (target === "step-questionnaire" && state.selectedSurveyId) {
                setActiveStep(target);
                return;
            }
            if (target === "step-result" && state.history.length > 0) {
                setActiveStep(target);
            }
        });
    });

    againSameSurvey.addEventListener("click", () => {
        if (state.selectedSurveyId) {
            startSurvey(state.selectedSurveyId);
        }
    });

    surveyForm.addEventListener("submit", handleSurveySubmit);
    bindSmartNumberInputs(document);
}

document.addEventListener("DOMContentLoaded", () => {
    state.history = getStoredHistory();
    renderSurveyCards();
    renderHistory();
    bindEvents();
    loadAdministrativeData();
    loadExternalMiConfig().finally(() => {
        if (state.selectedSurveyId) {
            const survey = getSurveyById(state.selectedSurveyId);
            if (survey) {
                renderSurveyQuestions(survey);
            }
        }
    });
    setActiveStep("step-profile");
});
