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
        label: "Bảng hệ số MIT/TMR người dùng cung cấp",
        detail: "Hệ số MIT chỉ được dùng để nhân với lượng tiêu dùng, sau đó quy đổi thành TMR kg/người/năm."
    }
};

const deviceSessionId = getOrCreateSessionId();

const tmrCategoryKeys = ["device", "food", "transport", "energy", "clothing", "entertainment", "other"];
const materialComponents = ["abiotic", "biotic", "earth", "water", "air"];
const categoryLabels = {
    device: "Thiết bị điện",
    food: "Thực phẩm",
    transport: "Đi lại",
    energy: "Điện, nước, gas",
    clothing: "Quần áo, giày dép",
    entertainment: "Giải trí",
    other: "Khác"
};

const CONFIG = {
    householdSizeDefault: 3,
    includeDeviceUsePhase: false,
    sustainabilityBenchmark: {
        sustainableTargetKgPersonYear: null,
        mediumThresholdKgPersonYear: null,
        highThresholdKgPersonYear: null
    }
};

const calculationConfig = {
    includeDeviceUsePhase: CONFIG.includeDeviceUsePhase,
    foodInputScope: "household",
    transportInputScope: "person",
    clothingInputScope: "household",
    entertainmentInputScope: "person"
};

const sustainabilityBenchmark = CONFIG.sustainabilityBenchmark;

const DEVICE_DATA = {
    tv: {
        label: "Tivi",
        lifetimeYear: 6,
        tmrLifetimeWithUse: 1350,
        tmrLifetimeNoUse: 596.2
    },
    refrigerator: {
        label: "Tủ lạnh",
        lifetimeYear: 15,
        tmrLifetimeWithUse: 3629,
        tmrLifetimeNoUse: 1323.1
    },
    air_conditioner: {
        label: "Máy lạnh",
        lifetimeYear: 15,
        tmrLifetimeWithUse: 5982,
        tmrLifetimeNoUse: 2928.8
    },
    cellphone: {
        label: "Điện thoại",
        lifetimeYear: 6,
        tmrLifetimeWithUse: 10.4,
        tmrLifetimeNoUse: 6.17
    },
    laptop: {
        label: "Laptop",
        lifetimeYear: 5,
        tmrLifetimeWithUse: 273,
        tmrLifetimeNoUse: 245.4
    },
    microwave_oven: {
        label: "Lò vi sóng",
        lifetimeYear: 9,
        tmrLifetimeWithUse: 340.1,
        tmrLifetimeNoUse: 325.3
    },
    electric_stove_oven: {
        label: "Bếp điện và lò nướng",
        lifetimeYear: 19,
        tmrLifetimeWithUse: 2164,
        tmrLifetimeNoUse: 512.4
    },
    washing_machine: {
        label: "Máy giặt",
        lifetimeYear: 12.5,
        tmrLifetimeWithUse: 1036,
        tmrLifetimeNoUse: 1036
    }
};

const FOOD_FACTORS = {
    pork: { label: "Thịt heo", unit: "kg/week", mitAbiotic: 8, mitBiotic: 10, mitEarth: 2.8, mitWater: 240, mitAir: 2 },
    beef: { label: "Thịt bò", unit: "kg/week", mitAbiotic: 12, mitBiotic: 31, mitEarth: 3, mitWater: 439, mitAir: 1 },
    chicken: { label: "Thịt gà, vịt", unit: "kg/week", mitAbiotic: 7, mitBiotic: 4.6, mitEarth: 1, mitWater: 228, mitAir: 2 },
    fish: { label: "Cá", unit: "kg/week", mitAbiotic: 3, mitBiotic: 4.7, mitEarth: 0, mitWater: 271, mitAir: 1 },
    milk: { label: "Sữa", unit: "L/week", mitAbiotic: 1, mitBiotic: 3, mitEarth: 0, mitWater: 31, mitAir: 0 },
    vegetable: { label: "Rau, củ", unit: "kg/week", mitAbiotic: 7, mitBiotic: 1, mitEarth: 23, mitWater: 974, mitAir: 4 },
    rice: { label: "Gạo", unit: "kg/month", mitAbiotic: 0, mitBiotic: 1, mitEarth: 2, mitWater: 0, mitAir: 0 }
};

const TRANSPORT_FACTORS = {
    car_ride_hailing: { label: "Ô tô, xe hơi công nghệ", unit: "km/week", mitAbiotic: 2.02, mitBiotic: 0, mitEarth: 0, mitWater: 20, mitAir: 0.19 },
    motorcycle_ride_hailing: { label: "Xe máy, xe máy công nghệ", unit: "km/week", mitAbiotic: 1.54, mitBiotic: 0, mitEarth: 0, mitWater: 0.74, mitAir: 0.27 },
    bus: { label: "Xe buýt", unit: "km/week", mitAbiotic: 0.32, mitBiotic: 0, mitEarth: 0, mitWater: 3.23, mitAir: 0.06 },
    bicycle: { label: "Xe đạp", unit: "km/week", mitAbiotic: 0.38, mitBiotic: 0, mitEarth: 0, mitWater: 12.1, mitAir: 0.02 }
};

const ENERGY_FACTORS = {
    electricity: { label: "Điện", unit: "kWh/month", mitAbiotic: 0.53, mitBiotic: 0, mitEarth: 0, mitWater: 189, mitAir: 0.22 },
    water: { label: "Nước", unit: "m3/month", mitAbiotic: 0.03, mitBiotic: 0, mitEarth: 0, mitWater: 1.33, mitAir: 0.01 },
    gas: { label: "Gas", unit: "bottle/month", mitAbiotic: 0.31, mitBiotic: 0, mitEarth: 0, mitWater: 1, mitAir: 0.8 }
};

const CLOTHING_FACTORS = {
    clothes: { label: "Quần áo", unit: "item/year", tmrFactor: 1264.145 },
    shoes: { label: "Giày dép", unit: "pair/year", tmrFactor: 449.9 }
};

const ENTERTAINMENT_FACTORS = {
    watching_movie_pc_phone: { label: "Xem phim trên máy tính hoặc điện thoại", unit: "hour/week", mitAbiotic: 1, mitBiotic: 0, mitEarth: 0, mitWater: 0, mitAir: 0 },
    playing_game_pc_phone: { label: "Chơi game trên máy tính hoặc điện thoại", unit: "hour/week", mitAbiotic: 1, mitBiotic: 0, mitEarth: 0, mitWater: 0, mitAir: 0 },
    outdoor_activities: { label: "Hoạt động ngoài trời", unit: "hour/week", mitAbiotic: 1.4, mitBiotic: 0, mitEarth: 0, mitWater: 33, mitAir: 0 },
    cinema_music_show: { label: "Đi xem phim, ca nhạc", unit: "hour/week", mitAbiotic: 3.77, mitBiotic: 0, mitEarth: 0, mitWater: 430.91, mitAir: 1.25 },
    watching_tv: { label: "Xem tivi", unit: "hour/week", mitAbiotic: 1, mitBiotic: 0, mitEarth: 0, mitWater: 0, mitAir: 0 }
};

const RESOURCE_BENCHMARKS = {
    sustainableKgPerPersonYear: 8000,
    globalAverageKgPerPersonYear: 13200,
    unit: "kg/người/năm",
    sourceNote: "Mốc 8 tấn/người/năm dùng làm ngưỡng tiêu dùng bền vững tham khảo; mốc 13,2 tấn/người/năm dùng làm trung bình toàn cầu gần đây."
};

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
                    },
                    {
                        id: "monthly_water",
                        label: "Lượng nước sinh hoạt trung bình mỗi tháng (m3/tháng)",
                        type: "number",
                        min: 0,
                        step: "any"
                    }
                ]
            },
            {
                title: "Điện năng tiêu thụ",
                description: "Chọn một trong hai cách nhập. Hệ thống sẽ tự quy đổi dữ liệu còn lại để tính dấu chân vật chất.",
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
                            { code: "tv", dataKey: "tv", label: DEVICE_DATA.tv.label },
                            { code: "fridge", dataKey: "refrigerator", label: DEVICE_DATA.refrigerator.label },
                            { code: "aircon", dataKey: "air_conditioner", label: DEVICE_DATA.air_conditioner.label },
                            { code: "phone", dataKey: "cellphone", label: DEVICE_DATA.cellphone.label },
                            { code: "laptop", dataKey: "laptop", label: DEVICE_DATA.laptop.label },
                            { code: "microwave", dataKey: "microwave_oven", label: DEVICE_DATA.microwave_oven.label },
                            { code: "stove", dataKey: "electric_stove_oven", label: DEVICE_DATA.electric_stove_oven.label },
                            { code: "washer", dataKey: "washing_machine", label: DEVICE_DATA.washing_machine.label }
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
            const electricityKwhYear = monthlyKwh * 12;
            const energyFactor = pickFirstMaterialFactor("electricity", ["electricity", "energy_per_kwh"], ENERGY_FACTORS.electricity);
            usedExternal = usedExternal || energyFactor.source === "external";
            const energyImpact = calculateMaterialImpact(electricityKwhYear, energyFactor);
            const monthlyWater = Number(formData.get("electricity_monthly_water")) || 0;
            const waterM3Year = monthlyWater * 12;
            const waterFactor = pickFirstMaterialFactor("electricity", ["water", "water_m3"], ENERGY_FACTORS.water);
            usedExternal = usedExternal || waterFactor.source === "external";
            const waterImpact = calculateMaterialImpact(waterM3Year, waterFactor);
            const energyRows = [
                createTmrDetailRow({
                    label: consumptionBasis === "bill"
                        ? "Điện năng sử dụng trong năm (quy đổi từ tiền điện)"
                        : "Điện năng sử dụng trong năm",
                    annualAmount: electricityKwhYear,
                    unit: "kWh/năm",
                    impact: energyImpact
                }),
                {
                    label: "Mức điện bình quân dùng để tính",
                    annualAmount: monthlyKwh,
                    unit: "kWh/tháng",
                    tmr: 0,
                    water: 0,
                    air: 0,
                    value: `${monthlyKwh.toFixed(1)} kWh/tháng`
                },
                {
                    label: consumptionBasis === "bill" ? "Tiền điện đã nhập" : "Tiền điện ước tính",
                    annualAmount: estimatedMonthlyBill,
                    unit: "VNĐ/tháng",
                    tmr: 0,
                    water: 0,
                    air: 0,
                    value: `${Math.round(estimatedMonthlyBill).toLocaleString("vi-VN")} VNĐ/tháng`
                }
            ];
            if (waterImpact.tmr > 0) {
                energyRows.push(createTmrDetailRow({
                    label: "Nước sinh hoạt trong năm",
                    annualAmount: waterM3Year,
                    unit: "m3/năm",
                    impact: waterImpact
                }));
            }

            const devicesQuestion = this.groups.flatMap((group) => group.questions).find((question) => question.id === "devices");
            const deviceRows = devicesQuestion.items.map((item) => {
                const quantity = Number(formData.get(`electricity_devices_${item.code}`)) || 0;
                const deviceData = DEVICE_DATA[item.dataKey || item.code];
                const factorInfo = pickDeviceMaterialFactor(item);
                const lifetimeInfo = pickScalar("electricity", `${item.dataKey || item.code}_lifetime_years`, deviceData?.lifetimeYear || 1);
                const safeLifetimeYears = lifetimeInfo.value > 0 ? lifetimeInfo.value : (deviceData?.lifetimeYear || 1);
                const lifetimeImpact = calculateMaterialImpact(quantity, factorInfo);
                const annualImpact = scaleMaterialImpact(lifetimeImpact, 1 / safeLifetimeYears);

                usedExternal = usedExternal || factorInfo.source === "external" || lifetimeInfo.source === "external";
                return createTmrDetailRow({
                    label: `Thiết bị - ${item.label}`,
                    annualAmount: quantity,
                    unit: `thiết bị, phân bổ ${safeLifetimeYears} năm`,
                    impact: annualImpact,
                    note: calculationConfig.includeDeviceUsePhase
                        ? "Đã cộng giai đoạn sử dụng thiết bị."
                        : "Không cộng giai đoạn sử dụng để tránh trùng với điện năng."
                });
            }).filter((row) => row.tmr > 0);

            const gasMultiplier = formData.get("electricity_gas_usage");
            const gasOptions = {
                "1 bình gas/tháng": { monthlyBottles: 1, code: "gas_1_cylinder", fallback: 0 },
                "2 bình gas/tháng": { monthlyBottles: 2, code: "gas_2_cylinders", fallback: 0 }
            };
            const gasOption = gasOptions[gasMultiplier];
            const gasFactor = pickFirstMaterialFactor("electricity", ["gas", "gas_cylinder"], ENERGY_FACTORS.gas);
            let gasBottleYear = gasOption ? gasOption.monthlyBottles * 12 : 0;
            usedExternal = usedExternal || gasFactor.source === "external";
            const gasImpact = calculateMaterialImpact(gasBottleYear, gasFactor);

            if (gasImpact.tmr > 0) {
                energyRows.push(createTmrDetailRow({
                    label: "Gas sử dụng trong năm",
                    annualAmount: gasBottleYear,
                    unit: "bình/năm",
                    impact: gasImpact
                }));
            } else if (gasMultiplier && gasMultiplier !== "Không sử dụng") {
                energyRows.push({
                    label: "Gas - chưa có hệ số trong bảng",
                    annualAmount: gasBottleYear,
                    unit: "bình/năm",
                    tmr: 0,
                    water: 0,
                    air: 0,
                    value: "0 kg/năm"
                });
            }

            return buildTmrResult({
                byCategory: {
                    device: sumDetailTmr(deviceRows),
                    energy: sumDetailTmr(energyRows)
                },
                detail: {
                    device: deviceRows,
                    energy: energyRows
                },
                sourceMode: usedExternal ? "external" : "fallback"
            });
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
                            { code: "pork", label: "Thịt heo (kg/tuần)" },
                            { code: "beef", label: "Thịt bò (kg/tuần)" },
                            { code: "chicken", label: "Thịt gà, vịt (kg/tuần)" },
                            { code: "milk", label: "Sữa (L/tuần)" },
                            { code: "fish", label: "Cá (kg/tuần)" },
                            { code: "vegetable", label: "Rau, củ (kg/tuần)" },
                            { code: "rice", label: "Gạo (kg/tháng)" }
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
                const fallbackFactor = FOOD_FACTORS[item.code] || 0;
                const annualAmount = calculateAnnualAmount(amount, fallbackFactor.unit);
                const factorInfo = pickMaterialFactor("food", item.code, fallbackFactor);
                const impact = calculateMaterialImpact(annualAmount, factorInfo);
                usedExternal = usedExternal || factorInfo.source === "external";
                return createTmrDetailRow({
                    label: item.label,
                    annualAmount,
                    unit: fallbackFactor.unit?.includes("month") ? "kg/năm" : item.code === "milk" ? "L/năm" : "kg/năm",
                    impact
                });
            }).filter((row) => row.tmr > 0);

            const eatoutQuestion = this.groups.flatMap((group) => group.questions).find((question) => question.id === "eatout_choices");
            const eatoutRows = eatoutQuestion.items.map((item) => {
                const times = Number(formData.get(`food_eatout_choices_${item.code}`)) || 0;
                const annualTimes = times * 52;
                const factorInfo = pickMaterialFactor("food", `eatout_${item.code}`, item.factor);
                const impact = calculateMaterialImpact(annualTimes, factorInfo);
                usedExternal = usedExternal || factorInfo.source === "external";
                return createTmrDetailRow({
                    label: `Ăn ngoài - ${item.label}`,
                    annualAmount: annualTimes,
                    unit: "lần/năm",
                    impact
                });
            }).filter((row) => row.tmr > 0);

            const deliveryTimes = formData.get("food_delivery_times");
            const deliveryOptions = {
                "1-2 lần/tuần": { weeklyTimes: 1.5, code: "delivery_1_2", fallback: 0 },
                "3-4 lần/tuần": { weeklyTimes: 3.5, code: "delivery_3_4", fallback: 0 },
                "5-6 lần/tuần": { weeklyTimes: 5.5, code: "delivery_5_6", fallback: 0 },
                "hơn 6 lần/tuần": { weeklyTimes: 7, code: "delivery_more_6", fallback: 0 }
            };
            const deliveryOption = deliveryOptions[deliveryTimes];
            let deliveryFactor = pickMaterialFactor("food", "delivery_order", 0);
            if (!hasMaterialFactor(deliveryFactor) && deliveryOption) {
                deliveryFactor = pickMaterialFactor("food", deliveryOption.code, deliveryOption.fallback);
            }
            usedExternal = usedExternal || deliveryFactor.source === "external";
            const deliveryAnnualTimes = deliveryOption ? deliveryOption.weeklyTimes * 52 : 0;
            const deliveryImpact = calculateMaterialImpact(deliveryAnnualTimes, deliveryFactor);

            const breakdown = [...weeklyRows];
            if (deliveryImpact.tmr > 0) {
                breakdown.push(createTmrDetailRow({
                    label: "Đặt đồ ăn online",
                    annualAmount: deliveryAnnualTimes,
                    unit: "lần/năm",
                    impact: deliveryImpact
                }));
            }
            eatoutRows.forEach((row) => breakdown.push(row));
            if (deliveryTimes && deliveryImpact.tmr === 0) {
                breakdown.push({
                    label: "Đặt đồ ăn online - chưa có hệ số trong bảng",
                    annualAmount: deliveryAnnualTimes,
                    unit: "lần/năm",
                    tmr: 0,
                    water: 0,
                    air: 0,
                    value: "0 kg/năm"
                });
            }
            const hasEatoutChoices = eatoutQuestion.items.some((item) => Number(formData.get(`food_eatout_choices_${item.code}`)) > 0);
            if (hasEatoutChoices && eatoutRows.length === 0) {
                breakdown.push({
                    label: "Ăn ngoài - bảng chưa có hệ số theo mỗi lần ăn",
                    annualAmount: 0,
                    unit: "lần/năm",
                    tmr: 0,
                    water: 0,
                    air: 0,
                    value: "0 kg/năm"
                });
            }

            return buildTmrResult({
                byCategory: {
                    food: convertInputTmrToHouseholdYear("food", sumDetailTmr(breakdown), calculationConfig.foodInputScope)
                },
                detail: {
                    food: breakdown
                },
                sourceMode: usedExternal ? "external" : "fallback"
            });
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
                        label: "Số lượng mua sắm trung bình mỗi năm của hộ gia đình",
                        type: "grid",
                        items: [
                            { code: "clothes", label: "Quần, áo (cái/năm)" },
                            { code: "shoes", label: "Giày, dép (đôi/năm)" }
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
                const fallbackFactor = CLOTHING_FACTORS[item.code] || 0;
                const factorInfo = pickMaterialFactor("fashion", item.code, fallbackFactor);
                const impact = calculateMaterialImpact(amount, factorInfo);
                usedExternal = usedExternal || factorInfo.source === "external";
                return createTmrDetailRow({
                    label: item.label,
                    annualAmount: amount,
                    unit: fallbackFactor.unit === "pair/year" ? "đôi/năm" : "cái/năm",
                    impact
                });
            }).filter((row) => row.tmr > 0);

            const usedText = String(formData.get("fashion_used_items") || "").toLowerCase();

            if (usedText.includes("cũ") || usedText.includes("second")) {
                breakdown.push({
                    label: "Đồ cũ - bảng chưa có hệ số điều chỉnh",
                    annualAmount: 0,
                    unit: "kg/năm",
                    tmr: 0,
                    water: 0,
                    air: 0,
                    value: "0 kg/năm"
                });
            }

            return buildTmrResult({
                byCategory: {
                    clothing: convertInputTmrToHouseholdYear("clothing", sumDetailTmr(breakdown), calculationConfig.clothingInputScope)
                },
                detail: {
                    clothing: breakdown
                },
                sourceMode: usedExternal ? "external" : "fallback"
            });
        }
    },
    { id: "housing", name: "Khảo sát nhà ở", icon: "fa-house", description: "Sẽ cập nhật từ phần nhà ở trong Form.", available: false },
    { id: "water", name: "Khảo sát nước", icon: "fa-droplet", description: "Đã được tính trong nhóm Điện, nước, gas khi làm khảo sát điện.", available: false },
    {
        id: "transport",
        name: "Khảo sát giao thông",
        icon: "fa-bus",
        description: "Nhập quãng đường di chuyển trung bình mỗi tuần để quy đổi thành dấu chân vật chất hằng năm.",
        available: true,
        groups: [
            {
                title: "Quãng đường di chuyển hằng tuần",
                questions: [
                    {
                        id: "weekly_km",
                        label: "Số km trung bình mỗi tuần",
                        type: "grid",
                        items: [
                            { code: "car_ride_hailing", label: "Ô tô, xe hơi công nghệ (km/tuần)" },
                            { code: "motorcycle_ride_hailing", label: "Xe máy, xe máy công nghệ (km/tuần)" },
                            { code: "bus", label: "Xe buýt (km/tuần)" },
                            { code: "bicycle", label: "Xe đạp (km/tuần)" }
                        ]
                    }
                ]
            }
        ],
        calculate(formData) {
            let usedExternal = false;
            const kmQuestion = this.groups.flatMap((group) => group.questions).find((question) => question.id === "weekly_km");
            const rows = kmQuestion.items.map((item) => {
                const amount = Number(formData.get(`transport_weekly_km_${item.code}`)) || 0;
                const fallbackFactor = TRANSPORT_FACTORS[item.code] || 0;
                const annualAmount = calculateAnnualAmount(amount, fallbackFactor.unit);
                const factorInfo = pickMaterialFactor("transport", item.code, fallbackFactor);
                const impact = calculateMaterialImpact(annualAmount, factorInfo);
                usedExternal = usedExternal || factorInfo.source === "external";
                return createTmrDetailRow({
                    label: item.label,
                    annualAmount,
                    unit: "km/năm",
                    impact
                });
            }).filter((row) => row.tmr > 0);

            return buildTmrResult({
                byCategory: {
                    transport: convertInputTmrToHouseholdYear("transport", sumDetailTmr(rows), calculationConfig.transportInputScope)
                },
                detail: {
                    transport: rows
                },
                sourceMode: usedExternal ? "external" : "fallback"
            });
        }
    },
    {
        id: "entertainment",
        name: "Khảo sát giải trí",
        icon: "fa-film",
        description: "Nhập thời lượng giải trí trung bình mỗi tuần để quy đổi thành kg/người/năm.",
        available: true,
        groups: [
            {
                title: "Hoạt động giải trí hằng tuần",
                questions: [
                    {
                        id: "weekly_hours",
                        label: "Số giờ trung bình mỗi tuần",
                        type: "grid",
                        items: [
                            { code: "watching_movie_pc_phone", label: "Xem phim trên máy tính hoặc điện thoại (giờ/tuần)" },
                            { code: "playing_game_pc_phone", label: "Chơi game trên máy tính hoặc điện thoại (giờ/tuần)" },
                            { code: "outdoor_activities", label: "Hoạt động ngoài trời (giờ/tuần)" },
                            { code: "cinema_music_show", label: "Đi xem phim, ca nhạc (giờ/tuần)" },
                            { code: "watching_tv", label: "Xem tivi (giờ/tuần)" }
                        ]
                    }
                ]
            }
        ],
        calculate(formData) {
            let usedExternal = false;
            const hourQuestion = this.groups.flatMap((group) => group.questions).find((question) => question.id === "weekly_hours");
            const rows = hourQuestion.items.map((item) => {
                const amount = Number(formData.get(`entertainment_weekly_hours_${item.code}`)) || 0;
                const fallbackFactor = ENTERTAINMENT_FACTORS[item.code] || 0;
                const annualAmount = calculateAnnualAmount(amount, fallbackFactor.unit);
                const factorInfo = pickMaterialFactor("entertainment", item.code, fallbackFactor);
                const impact = calculateMaterialImpact(annualAmount, factorInfo);
                usedExternal = usedExternal || factorInfo.source === "external";
                return createTmrDetailRow({
                    label: item.label,
                    annualAmount,
                    unit: "giờ/năm",
                    impact
                });
            }).filter((row) => row.tmr > 0);

            return buildTmrResult({
                byCategory: {
                    entertainment: convertInputTmrToHouseholdYear("entertainment", sumDetailTmr(rows), calculationConfig.entertainmentInputScope)
                },
                detail: {
                    entertainment: rows
                },
                sourceMode: usedExternal ? "external" : "fallback"
            });
        }
    },
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

function createEmptyCategoryTotals() {
    return tmrCategoryKeys.reduce((totals, key) => {
        totals[key] = 0;
        return totals;
    }, {});
}

function createEmptyDetail() {
    return tmrCategoryKeys.reduce((detail, key) => {
        detail[key] = [];
        return detail;
    }, {});
}

function parseOptionalNumber(value) {
    if (value === null || value === undefined || String(value).trim() === "") return null;
    const parsed = parseConfigNumber(value);
    return Number.isFinite(parsed) ? parsed : null;
}

function toFiniteNumber(value, fallbackValue = 0) {
    const parsed = parseOptionalNumber(value);
    return parsed === null ? fallbackValue : parsed;
}

function formatNumber(value, maximumFractionDigits = 1) {
    const numericValue = Number(value);
    if (!Number.isFinite(numericValue)) return "0";
    return numericValue.toLocaleString("vi-VN", { maximumFractionDigits });
}

function formatKg(value) {
    return `${formatNumber(value)} kg`;
}

function formatKgPerPersonYear(value) {
    return `${formatKg(value)}/người/năm`;
}

function calculateAnnualAmount(amountInput, unit = "") {
    const amount = Number(amountInput) || 0;
    const normalizedUnit = String(unit).toLowerCase();

    if (normalizedUnit.includes("week")) return amount * 52;
    if (normalizedUnit.includes("month")) return amount * 12;
    return amount;
}

function calculateMI(amount, factor) {
    return amount * factor;
}

function calculateTMR(miAbiotic, miBiotic, miEarth) {
    return miAbiotic + miBiotic + miEarth;
}

function calculatePerPersonYear(tmrHouseholdYear, householdSize) {
    const safeHouseholdSize = Number.isFinite(Number(householdSize)) && Number(householdSize) > 0
        ? Number(householdSize)
        : CONFIG.householdSizeDefault;
    return tmrHouseholdYear / safeHouseholdSize;
}

function getHouseholdSize() {
    return Number.isFinite(Number(state.profile?.household)) && Number(state.profile?.household) > 0
        ? Number(state.profile.household)
        : CONFIG.householdSizeDefault;
}

function getCategoryInputScope(category) {
    const scopeMap = {
        food: calculationConfig.foodInputScope,
        transport: calculationConfig.transportInputScope,
        clothing: calculationConfig.clothingInputScope,
        entertainment: calculationConfig.entertainmentInputScope
    };
    return scopeMap[category] || "household";
}

function convertInputTmrToHouseholdYear(category, inputTmrYear, inputScope = getCategoryInputScope(category)) {
    const tmrYear = Number(inputTmrYear) || 0;
    return inputScope === "person" ? tmrYear * getHouseholdSize() : tmrYear;
}

function getMaterialComponentAliases(component) {
    const aliases = {
        abiotic: ["abiotic", "mitAbiotic", "miAbiotic", "mit_abiotic", "mi_abiotic", "abiotic_mi", "abiotic_factor", "vo_sinh", "vô sinh", "phi_sinh_hoc"],
        biotic: ["biotic", "mitBiotic", "miBiotic", "mit_biotic", "mi_biotic", "biotic_mi", "biotic_factor", "huu_sinh", "hữu sinh", "sinh_hoc"],
        earth: ["earth", "mitEarth", "miEarth", "mit_earth", "mi_earth", "earth_mi", "earth_factor", "soil", "dat", "đất", "earth_movement"],
        water: ["water", "mitWater", "miWater", "mit_water", "mi_water", "water_mi", "water_factor", "nuoc", "nước"],
        air: ["air", "mitAir", "miAir", "mit_air", "mi_air", "air_mi", "air_factor", "khong_khi", "không khí"]
    };
    return aliases[component] || [component];
}

function normalizeMaterialComponentName(value) {
    const normalized = normalizeConfigHeader(value);
    const aliases = {
        abiotic: ["abiotic", "mitabiotic", "miabiotic", "vosinh", "phisinhhoc"],
        biotic: ["biotic", "mitbiotic", "mibiotic", "huusinh", "sinhhoc"],
        earth: ["earth", "mitearth", "miearth", "soil", "dat", "earthmovement"],
        water: ["water", "mitwater", "miwater", "nuoc"],
        air: ["air", "mitair", "miair", "khongkhi"]
    };

    return materialComponents.find((component) => aliases[component].includes(normalized)) || "";
}

function normalizeMaterialFactor(entry, fallbackValue = 0, source = "fallback") {
    const components = materialComponents.reduce((acc, component) => {
        acc[component] = 0;
        return acc;
    }, {});
    let hasComponentValue = false;

    if (typeof entry === "number" && Number.isFinite(entry)) {
        components.abiotic = entry;
        hasComponentValue = true;
    } else if (entry && typeof entry === "object") {
        materialComponents.forEach((component) => {
            const componentValue = parseOptionalNumber(readConfigValue(entry, getMaterialComponentAliases(component)));
            if (componentValue !== null) {
                components[component] = componentValue;
                hasComponentValue = true;
            }
        });

        const scalarValue = parseOptionalNumber(readConfigValue(entry, [
            "value",
            "gia_tri",
            "giá trị",
            "he_so",
            "hệ số",
            "factor",
            "tmrFactor",
            "tmr_factor",
            "mi",
            "mit",
            "tmr",
            "total_tmr"
        ]));
        if (!hasComponentValue && scalarValue !== null) {
            components.abiotic = scalarValue;
            hasComponentValue = true;
        }
    }

    if (!hasComponentValue) {
        components.abiotic = Number(fallbackValue) || 0;
    }

    return {
        components,
        tmrFactor: calculateTMR(components.abiotic, components.biotic, components.earth),
        waterFactor: components.water,
        airFactor: components.air,
        source
    };
}

function hasMaterialFactor(factorInfo) {
    return Boolean(factorInfo) && Math.abs(Number(factorInfo.tmrFactor) || 0) > 0;
}

function pickMaterialFactor(surveyId, code, fallbackValue = 0) {
    const externalFactor = getExternalFactor(surveyId, code);
    if (externalFactor !== undefined) {
        return normalizeMaterialFactor(externalFactor, fallbackValue, "external");
    }

    const externalScalar = getExternalScalar(surveyId, code);
    if (externalScalar !== undefined) {
        return normalizeMaterialFactor(externalScalar, fallbackValue, "external");
    }

    return normalizeMaterialFactor(fallbackValue, fallbackValue, "fallback");
}

function pickFirstMaterialFactor(surveyId, codes, fallbackValue = 0) {
    for (const code of codes) {
        const externalFactor = getExternalFactor(surveyId, code);
        if (externalFactor !== undefined) {
            return normalizeMaterialFactor(externalFactor, fallbackValue, "external");
        }

        const externalScalar = getExternalScalar(surveyId, code);
        if (externalScalar !== undefined) {
            return normalizeMaterialFactor(externalScalar, fallbackValue, "external");
        }
    }

    return normalizeMaterialFactor(fallbackValue, fallbackValue, "fallback");
}

function sumMaterialFactors(factors) {
    const components = materialComponents.reduce((acc, component) => {
        acc[component] = factors.reduce((sum, factor) => sum + (Number(factor?.components?.[component]) || 0), 0);
        return acc;
    }, {});

    return {
        components,
        tmrFactor: calculateTMR(components.abiotic, components.biotic, components.earth),
        waterFactor: components.water,
        airFactor: components.air,
        source: factors.some((factor) => factor?.source === "external") ? "external" : "fallback"
    };
}

function pickDeviceMaterialFactor(item) {
    const deviceKey = item.dataKey || item.code;
    const productFactor = pickFirstMaterialFactor("electricity", [`${deviceKey}_product`, `${item.code}_product`], 0);
    const packagingFactor = pickFirstMaterialFactor("electricity", [`${deviceKey}_packaging`, `${item.code}_packaging`], 0);
    const useFactor = pickFirstMaterialFactor("electricity", [`${deviceKey}_use`, `${item.code}_use`], 0);
    const hasCompositionFactor = hasMaterialFactor(productFactor) || hasMaterialFactor(packagingFactor) || hasMaterialFactor(useFactor);

    if (hasCompositionFactor) {
        const factors = [productFactor, packagingFactor];
        if (calculationConfig.includeDeviceUsePhase) {
            factors.push(useFactor);
        }
        return sumMaterialFactors(factors);
    }

    const deviceData = DEVICE_DATA[deviceKey];
    const fallbackLifetimeTmr = deviceData
        ? (calculationConfig.includeDeviceUsePhase ? deviceData.tmrLifetimeWithUse : deviceData.tmrLifetimeNoUse)
        : item.factor;

    return pickFirstMaterialFactor("electricity", [deviceKey, item.code], { tmrFactor: fallbackLifetimeTmr || 0 });
}

function calculateMaterialImpact(amount, factorInfo) {
    const safeAmount = Number(amount) || 0;
    const components = materialComponents.reduce((acc, component) => {
        acc[component] = calculateMI(safeAmount, Number(factorInfo?.components?.[component]) || 0);
        return acc;
    }, {});

    return {
        amount: safeAmount,
        components,
        tmr: calculateTMR(components.abiotic, components.biotic, components.earth),
        water: components.water,
        air: components.air
    };
}

function scaleMaterialImpact(impact, multiplier) {
    const safeMultiplier = Number(multiplier) || 0;
    const components = materialComponents.reduce((acc, component) => {
        acc[component] = (Number(impact?.components?.[component]) || 0) * safeMultiplier;
        return acc;
    }, {});

    return {
        amount: (Number(impact?.amount) || 0) * safeMultiplier,
        components,
        tmr: calculateTMR(components.abiotic, components.biotic, components.earth),
        water: components.water,
        air: components.air
    };
}

function createTmrDetailRow({ label, annualAmount, unit, impact, note = "" }) {
    return {
        label,
        annualAmount: Number(annualAmount) || 0,
        unit,
        mi: impact?.components || {},
        tmr: Number(impact?.tmr) || 0,
        water: Number(impact?.water) || 0,
        air: Number(impact?.air) || 0,
        note,
        value: `${formatKg(impact?.tmr || 0)}/năm`
    };
}

function sumDetailTmr(rows) {
    return rows.reduce((sum, row) => sum + (Number(row.tmr) || 0), 0);
}

function evaluateSustainability(totalTMRPersonYear) {
    const sustainableTarget = sustainabilityBenchmark.sustainableTargetKgPersonYear;
    const mediumThreshold = sustainabilityBenchmark.mediumThresholdKgPersonYear;
    const highThreshold = sustainabilityBenchmark.highThresholdKgPersonYear;

    if (![sustainableTarget, mediumThreshold, highThreshold].every((value) => value !== null && value !== undefined && Number.isFinite(Number(value)))) {
        return {
            level: "unknown",
            label: "Cần ngưỡng tham chiếu",
            message: "Dấu chân vật chất của bạn đã được tính theo kg/người/năm. Cần so sánh với ngưỡng tham chiếu để kết luận mức độ tiêu dùng bền vững."
        };
    }

    if (totalTMRPersonYear <= sustainableTarget) {
        return {
            level: "low",
            label: "Tiêu dùng tương đối bền vững",
            message: "Dấu chân vật chất của bạn đang nằm trong vùng mục tiêu tham chiếu."
        };
    }

    if (totalTMRPersonYear <= mediumThreshold) {
        return {
            level: "medium",
            label: "Tiêu dùng ở mức trung bình",
            message: "Bạn có thể ưu tiên giảm các nhóm có đóng góp lớn nhất trong bảng phân rã."
        };
    }

    return {
        level: "high",
        label: "Tiêu dùng chưa bền vững",
        message: "Dấu chân vật chất của bạn cao so với ngưỡng tham chiếu. Nên ưu tiên giảm nhóm tiêu dùng có đóng góp lớn nhất."
    };
}

function generateConsumptionReview(totalResourceUseKgPerPersonYear, byCategory) {
    const benchmarks = RESOURCE_BENCHMARKS;
    let level;
    let title;
    let summary;

    if (totalResourceUseKgPerPersonYear <= benchmarks.sustainableKgPerPersonYear) {
        level = "good";
        title = "Bạn đang ở mức tiêu dùng tương đối bền vững";
        summary = "Kết quả của bạn đang nằm trong mức tiêu dùng tương đối bền vững. Bạn nên tiếp tục duy trì thói quen hiện tại và ưu tiên các lựa chọn giúp kéo dài tuổi thọ sản phẩm, tiết kiệm điện, giảm lãng phí thực phẩm và sử dụng phương tiện di chuyển ít phát thải hơn.";
    } else if (totalResourceUseKgPerPersonYear <= benchmarks.globalAverageKgPerPersonYear) {
        level = "medium";
        title = "Bạn đang tiêu dùng cao hơn mức bền vững khuyến nghị";
        summary = "Kết quả của bạn cao hơn mức tiêu dùng bền vững khuyến nghị. Điều này cho thấy vẫn còn một số nhóm tiêu dùng có thể cải thiện. Hãy ưu tiên giảm các nhóm đang chiếm tỷ trọng cao nhất trong kết quả của bạn.";
    } else {
        level = "high";
        title = "Bạn đang tiêu dùng cao hơn mức trung bình tham khảo";
        summary = "Kết quả của bạn cao hơn mức trung bình tham khảo. Mức tiêu dùng này chưa thật sự bền vững và nên được điều chỉnh. Bạn nên bắt đầu từ nhóm tiêu dùng có đóng góp lớn nhất trong kết quả khảo sát.";
    }

    const categorySuggestions = {
        device: "Nhóm thiết bị điện đang đóng góp cao. Bạn có thể giảm bằng cách kéo dài thời gian sử dụng thiết bị, sửa chữa khi có thể, hạn chế thay mới quá sớm và chọn thiết bị bền, tiết kiệm điện.",
        food: "Nhóm thực phẩm đang đóng góp cao trong kết quả của bạn. Bạn có thể giảm bằng cách hạn chế lãng phí thực phẩm, cân đối lượng thịt đỏ, tăng rau củ theo mùa và ưu tiên thực phẩm địa phương khi phù hợp.",
        transport: "Nhóm đi lại đang chiếm tỷ trọng cao. Bạn có thể giảm bằng cách ưu tiên đi bộ, xe đạp, xe buýt, đi chung xe hoặc giảm các chuyến đi không cần thiết.",
        energy: "Nhóm điện, nước, gas đang đóng góp đáng kể. Bạn có thể giảm bằng cách tắt thiết bị khi không sử dụng, dùng thiết bị tiết kiệm điện, điều chỉnh nhiệt độ máy lạnh hợp lý và theo dõi lượng điện hằng tháng.",
        clothing: "Nhóm quần áo, giày dép đang đóng góp cao. Bạn có thể giảm bằng cách mua ít hơn nhưng chất lượng hơn, sử dụng lâu hơn, sửa chữa hoặc tái sử dụng thay vì thay mới thường xuyên.",
        entertainment: "Nhóm giải trí đang đóng góp đáng kể. Bạn có thể giảm bằng cách cân đối thời gian sử dụng thiết bị điện tử, ưu tiên các hoạt động ngoài trời gần nơi ở và hạn chế các hoạt động tiêu thụ nhiều năng lượng."
    };

    const topCategories = Object.entries(byCategory || {})
        .filter(([key, value]) => key !== "other" && Number(value) > 0)
        .sort((a, b) => Number(b[1]) - Number(a[1]))
        .slice(0, 3);

    const suggestions = topCategories
        .map(([key, value]) => ({
            category: key,
            value,
            text: categorySuggestions[key]
        }))
        .filter((item) => item.text);

    return {
        level,
        title,
        summary,
        suggestions,
        benchmarks
    };
}

function buildTmrResult({ byCategory = {}, detail = {}, sourceMode = "fallback" }) {
    const householdByCategory = createEmptyCategoryTotals();
    Object.entries(byCategory).forEach(([category, value]) => {
        if (Object.prototype.hasOwnProperty.call(householdByCategory, category)) {
            householdByCategory[category] += Number(value) || 0;
        }
    });

    const normalizedDetail = createEmptyDetail();
    Object.entries(detail).forEach(([category, rows]) => {
        if (Object.prototype.hasOwnProperty.call(normalizedDetail, category) && Array.isArray(rows)) {
            normalizedDetail[category] = rows;
        }
    });

    const totalTMRHouseholdYear = Object.values(householdByCategory).reduce((sum, value) => sum + value, 0);
    const totalTMRPersonYear = calculatePerPersonYear(totalTMRHouseholdYear, getHouseholdSize());
    const totalTMRPersonYearTon = totalTMRPersonYear / 1000;
    const personByCategory = tmrCategoryKeys.reduce((totals, category) => {
        totals[category] = calculatePerPersonYear(householdByCategory[category], getHouseholdSize());
        return totals;
    }, {});

    return {
        totalTMRHouseholdYear,
        totalTMRPersonYear,
        totalTMRPersonYearTon,
        byCategory: personByCategory,
        byCategoryHouseholdYear: householdByCategory,
        detail: normalizedDetail,
        evaluation: evaluateSustainability(totalTMRPersonYear),
        total: totalTMRPersonYear.toFixed(1),
        breakdown: Object.values(normalizedDetail).flat(),
        sourceMode
    };
}

function getEntryResult(entry) {
    if (entry?.result && typeof entry.result === "object") return entry.result;
    if (entry?.resultJson) {
        try {
            return JSON.parse(entry.resultJson);
        } catch (error) {
            return null;
        }
    }
    return null;
}

function getEntryTotalPersonYear(entry) {
    const storedResult = getEntryResult(entry);
    const value = storedResult?.totalTMRPersonYear ?? entry?.totalTMRPersonYear ?? entry?.total;
    const numericValue = Number(value);
    return Number.isFinite(numericValue) ? numericValue : 0;
}

function mergeResultIntoTotals(targetTotals, targetDetail, result) {
    if (!result) return;
    tmrCategoryKeys.forEach((category) => {
        const householdValue = result.byCategoryHouseholdYear?.[category] ?? result.byCategory?.[category];
        targetTotals[category] += Number(householdValue) || 0;
        if (Array.isArray(result.detail?.[category])) {
            targetDetail[category] = targetDetail[category].concat(result.detail[category]);
        }
    });
}

function buildSessionResult(currentResult = null, currentSurveyId = "") {
    const latestBySurvey = new Map();

    state.history.forEach((entry) => {
        if (!entry.surveyId || latestBySurvey.has(entry.surveyId)) return;
        const storedResult = getEntryResult(entry);
        if (storedResult?.byCategory) {
            latestBySurvey.set(entry.surveyId, storedResult);
        }
    });

    if (currentResult && currentSurveyId) {
        latestBySurvey.set(currentSurveyId, currentResult);
    }

    const byCategory = createEmptyCategoryTotals();
    const detail = createEmptyDetail();
    latestBySurvey.forEach((result) => mergeResultIntoTotals(byCategory, detail, result));

    return buildTmrResult({
        byCategory,
        detail,
        sourceMode: currentResult?.sourceMode || "fallback"
    });
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
                    <p>${escapeHtml(entry.completedAtLabel)} • ${escapeHtml(entry.sourceLabel || "Bảng hệ số MIT/TMR")}</p>
                </div>
                <strong>${escapeHtml(formatKgPerPersonYear(getEntryTotalPersonYear(entry)))}</strong>
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

function buildConfigValueFromRow(row, value, componentName) {
    const factorValue = {};

    materialComponents.forEach((component) => {
        const componentValue = parseOptionalNumber(readConfigValue(row, getMaterialComponentAliases(component)));
        if (componentValue !== null) {
            factorValue[component] = componentValue;
        }
    });

    if (componentName && value !== null) {
        factorValue[componentName] = value;
    }

    if (Object.keys(factorValue).length > 0) {
        return factorValue;
    }

    return value;
}

function mergeConfigValue(existingValue, nextValue) {
    if (existingValue === undefined) return nextValue;
    if (typeof existingValue === "object" || typeof nextValue === "object") {
        return {
            ...(typeof existingValue === "object" ? existingValue : { value: existingValue }),
            ...(typeof nextValue === "object" ? nextValue : { value: nextValue })
        };
    }

    return nextValue;
}

function rowsToMiConfig(rows) {
    return rows.reduce((acc, row) => {
        const survey = String(readConfigValue(row, ["survey", "survey_id", "surveyId", "khao_sat", "khảo sát", "nhom", "nhóm"])).trim();
        const code = String(readConfigValue(row, ["code", "ma", "mã", "ma_he_so", "mã hệ số", "item"])).trim();
        const value = parseOptionalNumber(readConfigValue(row, ["value", "gia_tri", "giá trị", "he_so", "hệ số", "factor", "mi", "mit", "tmr"]));
        const type = String(readConfigValue(row, ["type", "loai", "loại", "kind"]) || "factor").trim().toLowerCase();
        const componentName = normalizeMaterialComponentName(readConfigValue(row, ["component", "thanh_phan", "thành phần", "mi_component", "mit_component"]));
        const configValue = buildConfigValueFromRow(row, value, componentName);

        if (!survey || !code || configValue === null) return acc;
        if (!acc[survey]) {
            acc[survey] = { factors: {}, scalars: {} };
        }

        const bucket = type === "scalar" ? acc[survey].scalars : acc[survey].factors;
        bucket[code] = mergeConfigValue(bucket[code], configValue);
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

    const headers = parseCsvLine(lines[0]);
    const normalizedHeaders = headers.map(normalizeConfigHeader);
    const surveyIndex = findConfigIndex(normalizedHeaders, ["survey", "survey_id", "khao_sat", "khảo sát", "nhom", "nhóm"]);
    const codeIndex = findConfigIndex(normalizedHeaders, ["code", "ma", "mã", "ma_he_so", "mã hệ số", "item"]);

    if (surveyIndex === -1 || codeIndex === -1) return {};

    const rows = lines.slice(1).map((line) => {
        const cells = parseCsvLine(line);
        return headers.reduce((row, header, index) => {
            row[header] = cells[index] ?? "";
            return row;
        }, {});
    });

    return rowsToMiConfig(rows);
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
                    detail: "Đã lấy hệ số MIT/TMR từ endpoint JSON bên ngoài."
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
                    detail: "Đã lấy hệ số MIT/TMR từ Google Sheet public."
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
                        <p>Hệ thống dùng mức giá quy đổi tham khảo 3.000 VNĐ/kWh và có thể cập nhật từ bảng hệ số MIT/TMR.</p>
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
        .map(getEntryTotalPersonYear)
        .filter((value) => Number.isFinite(value) && value > 0);

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
    const resultReviewCard = document.getElementById("resultReviewCard");
    const resultSuggestionsCard = document.getElementById("resultSuggestionsCard");
    const comparisonCard = document.getElementById("comparisonCard");

    if (!resultLead || !resultSurveyName || !resultTotal || !resultReviewCard || !resultSuggestionsCard) return;

    const sessionResult = buildSessionResult(result, survey.id);
    const review = generateConsumptionReview(sessionResult.totalTMRPersonYear, sessionResult.byCategory);
    const badgeLabels = {
        good: "Tiêu dùng tương đối bền vững",
        medium: "Cần cải thiện",
        high: "Chưa bền vững"
    };

    resultLead.textContent = "";
    resultSurveyName.textContent = survey.name;
    resultTotal.textContent = formatKgPerPersonYear(sessionResult.totalTMRPersonYear);
    const resultTotalUnit = resultTotal.nextElementSibling;
    if (resultTotalUnit) {
        resultTotalUnit.textContent = `≈ ${formatNumber(sessionResult.totalTMRPersonYearTon, 2)} tấn/người/năm`;
    }

    resultReviewCard.innerHTML = `
        <div class="resource-card-head">
            <span class="resource-status-badge ${escapeHtml(review.level)}">${escapeHtml(badgeLabels[review.level] || review.title)}</span>
            <h4>Nhận xét</h4>
        </div>
        <h3>${escapeHtml(review.title)}</h3>
        <p>${escapeHtml(review.summary)}</p>
    `;

    const topCategoryMarkup = review.suggestions.length
        ? review.suggestions.map((item, index) => `
            <li>
                <span>${index + 1}. ${escapeHtml(categoryLabels[item.category] || item.category)}</span>
                <strong>${escapeHtml(formatKgPerPersonYear(item.value))}</strong>
            </li>
        `).join("")
        : '<li><span>Chưa có nhóm tiêu dùng nào có dữ liệu đủ lớn để xếp hạng.</span><strong>0 kg/người/năm</strong></li>';

    const suggestionMarkup = review.suggestions.length
        ? review.suggestions.map((item) => `<li>${escapeHtml(item.text)}</li>`).join("")
        : "<li>Hãy hoàn thành thêm các nhóm khảo sát để hệ thống đưa ra gợi ý cụ thể hơn.</li>";

    resultSuggestionsCard.innerHTML = `
        <div class="resource-card-head">
            <h4>Gợi ý cải thiện</h4>
        </div>
        <div class="top-category-block">
            <h5>Nhóm ảnh hưởng nhiều nhất</h5>
            <ol class="top-category-list">${topCategoryMarkup}</ol>
        </div>
        <div class="suggestion-block">
            <h5>Ưu tiên hành động</h5>
            <ul class="suggestion-list">${suggestionMarkup}</ul>
        </div>
    `;

    if (resultBreakdown) {
        resultBreakdown.innerHTML = "";
        resultBreakdown.hidden = true;
    }
    if (comparisonCard) {
        comparisonCard.innerHTML = "";
        comparisonCard.hidden = true;
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
    payload.append("result_total", result?.totalTMRPersonYear ?? "");
    payload.append("result_total_tmr_household_year", result?.totalTMRHouseholdYear ?? "");
    payload.append("result_total_tmr_person_year", result?.totalTMRPersonYear ?? "");
    payload.append("result_total_tmr_person_year_ton", result?.totalTMRPersonYearTon ?? "");
    payload.append("result_source_mode", result?.sourceMode ?? "");
    payload.append("mi_source_label", result?.sourceMode === "external" ? state.miSource.label : "Bảng hệ số MIT/TMR");
    payload.append("mi_source_detail", state.miSource.detail || "");
    payload.append("result_by_category_json", JSON.stringify(result?.byCategory ?? {}));
    payload.append("result_by_category_household_year_json", JSON.stringify(result?.byCategoryHouseholdYear ?? {}));
    payload.append("result_detail_json", JSON.stringify(result?.detail ?? {}));
    payload.append("result_evaluation_json", JSON.stringify(result?.evaluation ?? {}));
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
        if (!result || !Number.isFinite(Number(result.totalTMRPersonYear))) {
            throw new Error("Invalid TMR result");
        }
        renderResult(result, survey);
    } catch (error) {
        console.error("TMR calculation failed:", error);
        submitButton.disabled = false;
        submitButton.innerHTML = 'Hoàn thành khảo sát <i class="fa fa-paper-plane"></i>';
        if (submitStatus) {
            submitStatus.className = "submit-status error";
            submitStatus.textContent = "Không thể tính dấu chân vật chất. Vui lòng tải lại trang và thử lại.";
        }
        return;
    }

    state.history.unshift({
        surveyId: survey.id,
        surveyName: survey.name,
        fullname: state.profile?.fullname || "Người dùng",
        location: [state.profile?.ward, state.profile?.district, state.profile?.province].filter(Boolean).join(", "),
        total: result.totalTMRPersonYear.toFixed(1),
        totalTMRHouseholdYear: result.totalTMRHouseholdYear,
        totalTMRPersonYear: result.totalTMRPersonYear,
        totalTMRPersonYearTon: result.totalTMRPersonYearTon,
        result,
        sourceLabel: result.sourceMode === "external" ? state.miSource.label : "Bảng hệ số MIT/TMR",
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
