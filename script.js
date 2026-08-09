const scriptURL = "https://script.google.com/macros/s/AKfycbyHSXgSIO9pYBIQubS-_65CmrUzKIzJRBKpjRci1M3mLrbw0FZkbBJmcmonZ8bynAkMnQ/exec";
const GOOGLE_SHEET_WEB_APP_URL = "https://script.google.com/macros/s/AKfycbx5byG8NRx_wvmsBW5pozH6hnkVnC-GdHaOxEg5mtVCMuG8DKxYCLvBxLf4TDBirnq_gg/exec";
const GOOGLE_SHEET_SECRET_KEY = "khaosat_2026";
const GOOGLE_SHEET_SOURCE = "khaosat-tieudung";
const SHEET_SOURCE_URL = "https://docs.google.com/spreadsheets/d/14Zo1oQT0--dw7L5OJ46OGVivvcxqFViqJzTMhkrrXXg/edit?usp=sharing";
const SHEET_CSV_URL = "https://docs.google.com/spreadsheets/d/14Zo1oQT0--dw7L5OJ46OGVivvcxqFViqJzTMhkrrXXg/export?format=csv";
const MI_CONFIG_ENDPOINT = `${scriptURL}?action=mi-config`;
const HISTORY_STORAGE_KEY = "nttu-survey-history";
const RESPONDENT_ID_KEY = "nttu-respondent-id";
const ACTIVE_SURVEY_IDS = ["electricity", "food", "fashion"];

const ENERGY_NLP_API_URL = "https://ecoimpact-energy-backend.onrender.com/analyze";

const SURVEY_CODE_BY_ID = {
    food: "TP",
    electricity: "DIEN",
    water: "NUOC",
    waste: "RAC",
    transport: "DC",
    fashion: "MS",
    devices: "TBI",
    equipment: "TBI",
    profile: "TTC",
    lifestyle: "TTC",
    entertainment: "TTC"
};

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

const respondentId = getOrCreateRespondentId();

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
// Ước tính tốc độ trung bình khi đi mua thực phẩm, dùng để quy đổi phút sang km.
const AVERAGE_FOOD_TRIP_SPEED_KMH = 20;

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

const SUGGESTION_LEVELS = {
    good: {
        label: "Mức tốt",
        badgeClass: "good"
    },
    medium: {
        label: "Mức trung bình",
        badgeClass: "medium"
    },
    improve: {
        label: "Mức cần cải thiện",
        badgeClass: "improve"
    },
    high: {
        label: "Mức cao/cần chú ý",
        badgeClass: "high"
    }
};

const SURVEY_SUGGESTIONS = {
    DIEN: {
        good: {
            title: "Bạn đang sử dụng điện khá tiết kiệm",
            summary: "Kết quả điện/năng lượng đang ở mức tốt. Bạn nên tiếp tục duy trì các thói quen tiết kiệm hiện có.",
            suggestions: [
                "Duy trì thói quen tắt thiết bị khi không sử dụng.",
                "Tiếp tục ưu tiên thiết bị tiết kiệm điện.",
                "Theo dõi hóa đơn điện để giữ mức tiêu thụ ổn định."
            ]
        },
        medium: {
            title: "Mức sử dụng điện còn vài điểm có thể tối ưu",
            summary: "Bạn có thể giảm thêm tác động bằng các thay đổi nhỏ trong sinh hoạt hằng ngày.",
            suggestions: [
                "Hạn chế để thiết bị ở chế độ chờ quá lâu.",
                "Điều chỉnh máy lạnh ở mức hợp lý.",
                "Ưu tiên dùng đèn LED và thiết bị có nhãn tiết kiệm năng lượng."
            ]
        },
        improve: {
            title: "Nên ưu tiên giảm nhóm thiết bị tiêu thụ điện lớn",
            summary: "Kết quả cho thấy điện/năng lượng có thể đang tạo tác động đáng kể.",
            suggestions: [
                "Kiểm tra các thiết bị tiêu thụ điện lớn như máy lạnh, tủ lạnh, máy nước nóng.",
                "Giảm thời gian sử dụng thiết bị không cần thiết.",
                "Xem lại thói quen sử dụng điện vào giờ cao điểm."
            ]
        },
        high: {
            title: "Mức tiêu thụ điện cần được chú ý hơn",
            summary: "Mức tiêu thụ điện có thể đang cao so với nhu cầu cơ bản.",
            suggestions: [
                "Mức tiêu thụ điện có thể đang cao so với nhu cầu cơ bản.",
                "Cần ưu tiên giảm thiết bị công suất lớn và kiểm tra thiết bị cũ.",
                "Nên lập kế hoạch sử dụng điện theo ngày/tuần để kiểm soát tốt hơn."
            ]
        }
    },
    TP: {
        good: {
            title: "Thói quen tiêu dùng thực phẩm của bạn khá hợp lý",
            summary: "Kết quả thực phẩm đang ở mức tốt. Hãy duy trì cách mua và sử dụng thực phẩm có kiểm soát.",
            suggestions: [
                "Tiếp tục ưu tiên thực phẩm địa phương và theo mùa.",
                "Duy trì thói quen mua vừa đủ, hạn chế lãng phí.",
                "Có thể tăng thêm thực phẩm ít tác động môi trường."
            ]
        },
        medium: {
            title: "Có thể giảm thêm lãng phí và thực phẩm tác động cao",
            summary: "Một vài lựa chọn trong ăn uống và mua thực phẩm vẫn còn dư địa cải thiện.",
            suggestions: [
                "Lên kế hoạch bữa ăn để tránh mua dư.",
                "Giảm thực phẩm đóng gói nếu chưa cần thiết.",
                "Ưu tiên nơi mua gần hơn để giảm tác động di chuyển."
            ]
        },
        improve: {
            title: "Nên điều chỉnh nhóm thực phẩm có tác động cao",
            summary: "Kết quả thực phẩm đang cao hơn mức mong muốn, nên ưu tiên các thay đổi dễ làm nhưng có tác động rõ.",
            suggestions: [
                "Giảm tần suất tiêu thụ nhóm thực phẩm có tác động cao.",
                "Tăng tỷ lệ rau củ, thực phẩm theo mùa và nguồn gốc gần.",
                "Hạn chế lãng phí thực phẩm bằng cách bảo quản và sử dụng hợp lý."
            ]
        },
        high: {
            title: "Mức tác động từ thực phẩm cần được chú ý",
            summary: "Thói quen tiêu dùng thực phẩm có thể tạo tác động môi trường cao.",
            suggestions: [
                "Thói quen tiêu dùng thực phẩm có thể tạo tác động môi trường cao.",
                "Nên xem lại tần suất mua, loại thực phẩm và khoảng cách di chuyển.",
                "Ưu tiên thay đổi từ những nhóm tiêu thụ nhiều nhất trước."
            ]
        }
    },
    MS: {
        good: {
            title: "Bạn mua sắm khá có kiểm soát",
            summary: "Kết quả thời trang/mua sắm đang ở mức tốt. Hãy tiếp tục ưu tiên dùng lâu và mua có chủ đích.",
            suggestions: [
                "Tiếp tục mua sắm có kiểm soát.",
                "Ưu tiên dùng lâu, sửa chữa và tái sử dụng.",
                "Duy trì thói quen cân nhắc trước khi mua mới."
            ]
        },
        medium: {
            title: "Có thể mua sắm chậm lại và chọn lọc hơn",
            summary: "Bạn có vài điểm có thể cải thiện bằng cách cân nhắc kỹ trước khi mua mới.",
            suggestions: [
                "Hạn chế mua theo cảm xúc hoặc theo xu hướng ngắn hạn.",
                "Ưu tiên sản phẩm bền, dễ phối và dùng được lâu.",
                "Cân nhắc đồ second-hand nếu phù hợp."
            ]
        },
        improve: {
            title: "Nên giảm mua theo xu hướng ngắn hạn",
            summary: "Mức mua sắm có thể đang làm tăng dấu chân vật chất đáng kể.",
            suggestions: [
                "Giảm số lượng sản phẩm mua mới mỗi tháng.",
                "Tránh mua nhiều sản phẩm chỉ dùng ít lần.",
                "Tái sử dụng, trao đổi hoặc quyên góp đồ cũ thay vì bỏ đi."
            ]
        },
        high: {
            title: "Mức tác động từ mua sắm cần được kiểm soát hơn",
            summary: "Mức mua sắm/thời trang có thể đang cao so với nhu cầu thật.",
            suggestions: [
                "Mức mua sắm/thời trang có thể đang cao so với nhu cầu thật.",
                "Cần giảm mua theo trend và ưu tiên chất lượng hơn số lượng.",
                "Nên đặt giới hạn chi tiêu hoặc số món mua mới mỗi tháng."
            ]
        }
    }
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
                        label: "Khoảng cách từ hộ gia đình đến nơi mua thực phẩm",
                        type: "food-distance-choice",
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
    { id: "water", name: "Khảo sát nước", icon: "fa-droplet", description: "Sẽ cập nhật thành khảo sát nước riêng.", available: false },
    {
        id: "transport",
        name: "Khảo sát giao thông",
        icon: "fa-bus",
        description: "Nhập quãng đường di chuyển trung bình mỗi tuần để quy đổi thành dấu chân vật chất hằng năm.",
        available: false,
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
        available: false,
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
    "step-result": "Bước 4 - Kết quả và lịch sử của bạn"
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
    const householdSize = state.profile?.soThanhVienHoGiaDinh ?? state.profile?.household;
    return Number.isFinite(Number(householdSize)) && Number(householdSize) > 0
        ? Number(householdSize)
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

function getImprovementSuggestionLevel(result) {
    const total = Number(result?.totalTMRPersonYear) || 0;
    const goodThreshold = RESOURCE_BENCHMARKS.sustainableKgPerPersonYear;
    const mediumThreshold = RESOURCE_BENCHMARKS.globalAverageKgPerPersonYear;
    const improveThreshold = mediumThreshold * 1.5;

    if (total <= goodThreshold) return "good";
    if (total <= mediumThreshold) return "medium";
    if (total <= improveThreshold) return "improve";
    return "high";
}

function getImprovementSuggestions(surveyCode, result) {
    const code = String(surveyCode || "").trim().toUpperCase();
    const level = getImprovementSuggestionLevel(result);
    const rules = SURVEY_SUGGESTIONS[code] || {};
    const suggestion = rules[level] || rules.medium || rules.good || {
        title: "Gợi ý cải thiện",
        summary: "Hãy ưu tiên các nhóm tiêu dùng có tác động lớn nhất trong kết quả.",
        suggestions: ["Duy trì thói quen tốt và cải thiện từng bước nhỏ trong sinh hoạt hằng ngày."]
    };
    const levelInfo = SUGGESTION_LEVELS[level] || SUGGESTION_LEVELS.medium;
    const suggestions = suggestion.suggestions || [];

    return {
        level,
        label: levelInfo.label,
        badgeClass: levelInfo.badgeClass,
        title: suggestion.title,
        summary: suggestion.summary,
        suggestions
    };
}

function getTopImpactCategories(result, limit = 3) {
    return Object.entries(result?.byCategory || {})
        .filter(([key, value]) => key !== "other" && Number(value) > 0)
        .sort((a, b) => Number(b[1]) - Number(a[1]))
        .slice(0, limit)
        .map(([category, value]) => ({ category, value }));
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

function createClientId(prefix) {
    const randomValue = window.crypto?.randomUUID
        ? window.crypto.randomUUID()
        : `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
    return `${prefix}-${randomValue}`;
}

function getOrCreateRespondentId() {
    try {
        const existing = localStorage.getItem(RESPONDENT_ID_KEY);
        if (existing) return existing;

        const generated = createClientId("respondent");
        localStorage.setItem(RESPONDENT_ID_KEY, generated);
        return generated;
    } catch (error) {
        return createClientId("respondent");
    }
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

function isSurveyEnabledForUsers(survey) {
    return Boolean(survey?.available) && ACTIVE_SURVEY_IDS.includes(survey.id);
}

function showSurveySelectorStatus(message) {
    const status = document.getElementById("surveySelectorStatus");
    if (!status) return;

    status.className = "submit-status info";
    status.textContent = message || "";
}

function renderSurveyCards() {
    const grid = document.getElementById("surveyGrid");
    if (!grid) return;

    let activeIndex = 0;

    grid.innerHTML = surveys.map((survey) => {
        const isEnabled = isSurveyEnabledForUsers(survey);
        if (isEnabled) activeIndex += 1;

        return `
        <article
            class="survey-box ${isEnabled ? "enabled" : "disabled"}"
            data-survey-id="${survey.id}"
            role="button"
            aria-label="${isEnabled ? `Mở ${survey.name}` : `${survey.name} sắp ra mắt`}"
            ${isEnabled ? 'tabindex="0"' : 'aria-disabled="true" tabindex="-1"'}
        >
            <span class="survey-badge">${isEnabled ? `Khảo sát ${activeIndex}` : "Sắp ra mắt"}</span>
            <i class="fas ${survey.icon}"></i>
            <h3>${survey.name}</h3>
            ${survey.description ? `<p>${survey.description}</p>` : ""}
        </article>
    `;
    }).join("");

    grid.querySelectorAll(".survey-box").forEach((card) => {
        const openCardSurvey = () => {
            const surveyId = card.dataset.surveyId;
            const survey = getSurveyById(surveyId);
            if (!isSurveyEnabledForUsers(survey)) {
                showSurveySelectorStatus("Khảo sát này sẽ được mở trong thời gian tới.");
                return;
            }
            showSurveySelectorStatus("");
            startSurvey(surveyId);
        };

        card.addEventListener("click", openCardSurvey);
        card.addEventListener("keydown", (event) => {
            if (event.key !== "Enter" && event.key !== " ") return;
            event.preventDefault();
            openCardSurvey();
        });
    });
}

function getNumberPlaceholder(question, surveyId) {
    const label = `${question?.label || ""} ${surveyId || ""}`.toLowerCase();

    if (label.includes("kwh") || label.includes("điện")) return "Nhập số kWh";
    if (label.includes("tiền") || label.includes("chi phí")) return "Nhập chi phí";
    if (label.includes("km") || label.includes("khoảng cách")) return "Nhập số km";
    if (label.includes("phút") || label.includes("thời gian")) return "Nhập số phút";
    if (label.includes("tuổi")) return "Nhập tuổi";
    return "Nhập số lượng";
}

function renderQuestion(question, surveyId) {
    const namePrefix = `${surveyId}_${question.id}`;
    let html = '<div class="question-group">';

    if (question.note) {
        html += `<div class="note-highlight">${question.note}</div>`;
    }

    html += `<label class="question-label">${question.label}</label>`;

    if (question.type === "number") {
        html += `<input type="number" name="${namePrefix}" min="${question.min ?? 0}" step="${question.step ?? "any"}" inputmode="decimal" placeholder="${getNumberPlaceholder(question, surveyId)}" ${question.required ? "required" : ""}>`;
    } else if (question.type === "text") {
        html += `<input type="text" name="${namePrefix}" placeholder="Nhập câu trả lời" ${question.required ? "required" : ""}>`;
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
                                    placeholder="${option.value === "bill" ? "Nhập số tiền điện" : "Nhập số kWh"}"
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
    } else if (question.type === "food-distance-choice") {
        html += `
            <div class="consumption-choice" data-food-distance-choice>
                <div class="consumption-choice-head">
                    <span class="eco-mini-icon"><i class="fas fa-location-dot"></i></span>
                    <div>
                        <strong>Chỉ cần nhập một thông tin</strong>
                        <p>Nếu không nhớ khoảng cách, hãy nhập thời gian di chuyển. Hệ thống sẽ quy đổi theo tốc độ trung bình ước tính.</p>
                    </div>
                </div>
                <div class="consumption-tabs" role="radiogroup" aria-label="Cách nhập khoảng cách mua thực phẩm">
                    <label class="consumption-option active">
                        <input type="radio" name="food_distance_method" value="km" checked required>
                        <span class="consumption-option-icon"><i class="fas fa-route"></i></span>
                        <span>
                            <strong>Nhập theo km</strong>
                            <small>Khoảng cách di chuyển</small>
                        </span>
                        <i class="fas fa-circle-check consumption-check"></i>
                    </label>
                    <label class="consumption-option">
                        <input type="radio" name="food_distance_method" value="phut" required>
                        <span class="consumption-option-icon"><i class="fas fa-clock"></i></span>
                        <span>
                            <strong>Nhập theo phút</strong>
                            <small>Thời gian di chuyển</small>
                        </span>
                        <i class="fas fa-circle-check consumption-check"></i>
                    </label>
                </div>
                <div class="consumption-panels">
                    <div class="consumption-panel active" data-food-distance-panel="km">
                        <label class="input-label" for="food_distance_km">Khoảng cách mua thực phẩm</label>
                        <div class="input-with-unit">
                            <input
                                id="food_distance_km"
                                type="number"
                                class="consumption-value"
                                name="food_distance_km"
                                min="0"
                                step="any"
                                inputmode="decimal"
                                placeholder="Nhập số km"
                                required
                            >
                            <span>km</span>
                        </div>
                        <p class="conversion-preview" data-food-distance-preview></p>
                    </div>
                    <div class="consumption-panel" data-food-distance-panel="phut">
                        <label class="input-label" for="food_distance_minutes">Thời gian đi mua thực phẩm</label>
                        <div class="input-with-unit">
                            <input
                                id="food_distance_minutes"
                                type="number"
                                class="consumption-value"
                                name="food_distance_minutes"
                                min="0"
                                step="any"
                                inputmode="decimal"
                                placeholder="Nhập số phút"
                                disabled
                            >
                            <span>phút</span>
                        </div>
                        <p class="conversion-preview" data-food-distance-preview></p>
                    </div>
                </div>
            </div>
        `;
    } else if (question.type === "grid") {
        html += `<div class="grid-container">${question.items.map((item) => `
            <div class="grid-row">
                <span>${item.label}</span>
                <input type="number" class="smart-number" name="${namePrefix}_${item.code}" min="0" step="any" inputmode="decimal" placeholder="Nhập số lượng">
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
    });
}

function bindUserInputTracking(scope) {
    scope.querySelectorAll("input, select, textarea").forEach((field) => {
        if (field.dataset.inputTrackingBound === "true") return;

        const markEdited = () => {
            field.dataset.userEdited = "true";
        };

        field.addEventListener("input", markEdited);
        field.addEventListener("change", markEdited);
        field.dataset.inputTrackingBound = "true";
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
                    if (!isActive) {
                        input.value = "";
                        delete input.dataset.userEdited;
                        clearInlineError(input);
                    }
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

function bindFoodDistanceChoice(scope) {
    scope.querySelectorAll("[data-food-distance-choice]").forEach((choice) => {
        const radios = Array.from(choice.querySelectorAll('input[name="food_distance_method"]'));
        const options = Array.from(choice.querySelectorAll(".consumption-option"));
        const panels = Array.from(choice.querySelectorAll("[data-food-distance-panel]"));

        const updatePreview = (panel) => {
            const input = panel.querySelector(".consumption-value");
            const preview = panel.querySelector("[data-food-distance-preview]");
            if (!input || !preview) return;

            const amount = Number(input.value) || 0;
            const mode = panel.dataset.foodDistancePanel;

            if (amount <= 0) {
                preview.textContent = "";
                return;
            }

            if (mode === "phut") {
                const estimatedKm = estimateFoodTripDistanceKm("phut", null, amount);
                preview.textContent = `Ước tính khoảng ${formatNumber(estimatedKm, 1)} km`;
                return;
            }

            preview.textContent = "";
        };

        const activateMode = (mode, shouldFocus = false) => {
            options.forEach((option) => {
                const radio = option.querySelector('input[type="radio"]');
                option.classList.toggle("active", radio?.value === mode);
            });

            panels.forEach((panel) => {
                const isActive = panel.dataset.foodDistancePanel === mode;
                const input = panel.querySelector(".consumption-value");
                panel.classList.toggle("active", isActive);
                if (input) {
                    input.disabled = !isActive;
                    input.required = isActive;
                    if (!isActive) {
                        input.value = "";
                        delete input.dataset.userEdited;
                        clearInlineError(input);
                    }
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

        activateMode(radios.find((radio) => radio.checked)?.value || "km");
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
    bindFoodDistanceChoice(dynamicQuestions);
    bindSmartNumberInputs(dynamicQuestions);
    bindUserInputTracking(dynamicQuestions);
}

function collectProfileData() {
    const form = document.getElementById("profileForm");
    const formData = new FormData(form);

    return {
        hoTen: String(formData.get("fullname") || "").trim(),
        doTuoi: String(formData.get("age") || "").trim(),
        gioiTinh: String(formData.get("gender") || "").trim(),
        soThanhVienHoGiaDinh: String(formData.get("household") || "").trim(),
        thanhPho: String(formData.get("thanhPho") || "").trim(),
        xa: String(formData.get("xa") || "").trim(),
        maThanhPho: String(formData.get("maThanhPho") || "").trim(),
        maXa: String(formData.get("maXa") || "").trim()
    };
}

function startSurvey(surveyId) {
    const survey = getSurveyById(surveyId);
    if (!isSurveyEnabledForUsers(survey)) return;

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

function renderResult(result, survey) {
    const resultLead = document.getElementById("resultLead");
    const resultSurveyName = document.getElementById("resultSurveyName");
    const resultTotal = document.getElementById("resultTotal");
    const resultBreakdown = document.getElementById("resultBreakdown");
    const resultReviewCard = document.getElementById("resultReviewCard");
    const resultSuggestionsCard = document.getElementById("resultSuggestionsCard");

    if (!resultLead || !resultSurveyName || !resultTotal || !resultReviewCard || !resultSuggestionsCard) return;

    const surveyCode = getSurveyCodeForSurvey(survey);
    const improvement = getImprovementSuggestions(surveyCode, result);
    const topCategories = getTopImpactCategories(result);

    resultLead.className = "";
    resultLead.textContent = "";
    resultSurveyName.textContent = survey.name;
    resultTotal.textContent = formatKgPerPersonYear(result.totalTMRPersonYear);
    const resultTotalUnit = resultTotal.nextElementSibling;
    if (resultTotalUnit) {
        resultTotalUnit.textContent = `≈ ${formatNumber(result.totalTMRPersonYearTon, 2)} tấn/người/năm`;
    }

    resultReviewCard.innerHTML = `
        <div class="resource-card-head">
            <span class="resource-status-badge ${escapeHtml(improvement.badgeClass)}">${escapeHtml(improvement.label)}</span>
            <h4>Nhận xét</h4>
        </div>
        <h3>${escapeHtml(improvement.title)}</h3>
        <p>${escapeHtml(improvement.summary)}</p>
    `;

    const topCategoryMarkup = topCategories.length
        ? topCategories.map((item, index) => `
            <li>
                <span>${index + 1}. ${escapeHtml(categoryLabels[item.category] || item.category)}</span>
                <strong>${escapeHtml(formatKgPerPersonYear(item.value))}</strong>
            </li>
        `).join("")
        : '<li><span>Chưa có nhóm tiêu dùng nào có dữ liệu đủ lớn để xếp hạng.</span><strong>0 kg/người/năm</strong></li>';

    const suggestionMarkup = improvement.suggestions.length
        ? improvement.suggestions.map((text) => `<li>${escapeHtml(text)}</li>`).join("")
        : "<li>Hãy duy trì thói quen tốt và cải thiện từng bước nhỏ trong sinh hoạt hằng ngày.</li>";

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
}

function setResultSubmissionStatus(type, message) {
    const resultLead = document.getElementById("resultLead");
    if (!resultLead) return;

    resultLead.className = `result-submit-status ${type || ""}`.trim();
    resultLead.textContent = message || "";
}

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
    const luaChonMuaSam = getChoiceValues(form, "fashion_shopping_style", "fashion_shopping_style_other");

    if (soLuongQuanAoMoiNam !== undefined && soLuongQuanAoMoiNam > 0) loaiSanPhamThoiTrang.push("Quần áo");
    if (soLuongGiayDepMoiNam !== undefined && soLuongGiayDepMoiNam > 0) loaiSanPhamThoiTrang.push("Giày dép");

    return compactSubmissionObject({
        loaiSanPhamThoiTrang,
        soLuongQuanAoMoiNam,
        soLuongGiayDepMoiNam,
        coMuaDoCu: getTypedValue(form, "fashion_used_items"),
        luaChonMuaSam,
        cachXuLyQuanAoCu: luaChonMuaSam.filter((value) => /sửa|tái sử dụng|second-hand/i.test(value))
    }) || {};
}

function buildSurveyAnswerSheetData(form, surveyId) {
    if (surveyId === "electricity") return buildElectricitySheetData(form);
    if (surveyId === "food") return buildFoodSheetData(form);
    if (surveyId === "fashion") return buildFashionSheetData(form);
    return {};
}

function buildGoogleSheetData(form, survey) {
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

function buildGoogleSheetResult(result, surveyCode) {
    const evaluation = result?.evaluation || {};
    const improvement = getImprovementSuggestions(surveyCode, result);
    const totalKgPersonYear = getResultNumber(result?.totalTMRPersonYear);
    const totalTonPersonYear = getResultNumber(result?.totalTMRPersonYearTon);
    const topImpactCategories = getTopImpactCategories(result).map((item) => {
        const label = categoryLabels[item.category] || item.category;
        return `${label}: ${formatKgPerPersonYear(getResultNumber(item.value))}`;
    });

    return compactSubmissionObject({
        chiSoTieuDungTaiNguyen: totalKgPersonYear,
        donViChiSoTieuDungTaiNguyen: "kg/người/năm",
        tmr: totalKgPersonYear,
        totalKgPersonYear,
        totalTonPersonYear,
        xepLoai: improvement.label || evaluation.label || "",
        nhanXet: improvement.summary || evaluation.message || "",
        mucGoiY: improvement.level || "",
        tieuDeGoiY: improvement.title || "",
        goiYCaiThien: improvement.suggestions || [],
        nhomAnhHuongNhieuNhat: topImpactCategories
    }) || {};
}

async function submitSurveyToGoogleSheet(surveyCode, data, result) {
    const normalizedSurveyCode = String(surveyCode || "").trim().toUpperCase();

    if (!GOOGLE_SHEET_WEB_APP_URL || !normalizedSurveyCode) {
        return { configured: false, success: false };
    }

    const payload = {
        secretKey: GOOGLE_SHEET_SECRET_KEY,
        surveyCode: normalizedSurveyCode,
        respondentId,
        pageUrl: window.location.href,
        source: GOOGLE_SHEET_SOURCE,
        data,
        result
    };

    try {
        await fetch(GOOGLE_SHEET_WEB_APP_URL, {
            method: "POST",
            body: JSON.stringify(payload),
            mode: "no-cors"
        });
        return { configured: true, success: true };
    } catch (error) {
        console.error("Google Sheet submit failed:", error);
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
    const resetSubmitButton = () => {
        submitButton.disabled = false;
        submitButton.innerHTML = 'Hoàn thành khảo sát <i class="fa fa-paper-plane"></i>';
    };

    submitButton.disabled = true;
    submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Đang gửi...';
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
        resetSubmitButton();
        if (submitStatus) {
            submitStatus.className = "submit-status error";
            submitStatus.textContent = "Không thể tính dấu chân vật chất. Vui lòng tải lại trang và thử lại.";
        }
        return;
    }

    state.history.unshift({
        surveyId: survey.id,
        surveyName: survey.name,
        fullname: state.profile?.hoTen || "Người dùng",
        location: [state.profile?.xa, state.profile?.thanhPho].filter(Boolean).join(", "),
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

    const surveyCode = getSurveyCodeForSurvey(survey);
    const googleSheetData = buildGoogleSheetData(form, survey);
    const googleSheetResult = buildGoogleSheetResult(result, surveyCode);

    setActiveStep("step-result");
    setResultSubmissionStatus("pending", "Đang gửi khảo sát...");

    submitSurveyToGoogleSheet(surveyCode, googleSheetData, googleSheetResult)
        .then((submitResult) => {
            if (submitResult.success) {
                setResultSubmissionStatus("success", "Đã gửi khảo sát thành công.");
                return;
            }
            setResultSubmissionStatus("error", "Chưa thể gửi khảo sát. Vui lòng kiểm tra kết nối và thử lại.");
        })
        .catch((error) => {
            console.error("Background sheet submit failed:", error);
            setResultSubmissionStatus("error", "Chưa thể gửi khảo sát. Vui lòng kiểm tra kết nối và thử lại.");
        })
        .finally(resetSubmitButton);
}

function normalizeLocationData2025(rawData) {
    if (!Array.isArray(rawData)) return [];

    return rawData.map((entry) => {
        const maThanhPho = String(entry.maThanhPho || entry.code || "").trim();
        const thanhPho = String(entry.thanhPho || entry.tenThanhPho || entry.name || "").trim();
        const xaPhuong = Array.isArray(entry.xaPhuong) ? entry.xaPhuong : [];

        return {
            maThanhPho,
            thanhPho,
            xaPhuong: xaPhuong.map((ward) => ({
                maXa: String(ward.maXa || ward.code || "").trim(),
                tenXa: String(ward.tenXa || ward.xa || ward.name || "").trim()
            })).filter((ward) => ward.tenXa)
        };
    }).filter((entry) => entry.thanhPho);
}

function resetWardSelect(wardSelect, placeholder = "Vui lòng chọn Tỉnh/Thành phố trước") {
    wardSelect.innerHTML = `<option value="">${placeholder}</option>`;
    wardSelect.value = "";
    wardSelect.disabled = true;
    wardSelect.required = false;
    wardSelect.classList.remove("location-select-hidden");
}

function setManualWardInput(isEnabled, placeholder = "Nhập Xã/Phường/Đặc khu") {
    const wardManualInput = document.getElementById("wardManual");
    const wardCodeInput = document.getElementById("wardCode");
    if (!wardManualInput) return;

    wardManualInput.classList.toggle("hidden", !isEnabled);
    wardManualInput.disabled = !isEnabled;
    wardManualInput.required = isEnabled;
    wardManualInput.value = "";
    wardManualInput.placeholder = placeholder;
    if (wardCodeInput) wardCodeInput.value = "";
}

function showManualWardInput(wardSelect, placeholder) {
    wardSelect.classList.add("location-select-hidden");
    wardSelect.disabled = true;
    wardSelect.required = false;
    setManualWardInput(true, placeholder);
}

function loadAdministrativeData() {
    const provinceSelect = document.getElementById("province");
    const wardSelect = document.getElementById("ward");
    const provinceCodeInput = document.getElementById("provinceCode");
    const wardCodeInput = document.getElementById("wardCode");
    if (!provinceSelect || !wardSelect) return;

    const locations = normalizeLocationData2025(window.LOCATION_DATA_2025);

    provinceSelect.innerHTML = '<option value="">Chọn Tỉnh/Thành phố...</option>';
    resetWardSelect(wardSelect);
    setManualWardInput(false);

    if (provinceCodeInput) provinceCodeInput.value = "";
    if (wardCodeInput) wardCodeInput.value = "";

    if (locations.length === 0) {
        provinceSelect.innerHTML = '<option value="">Chưa có dữ liệu địa chỉ 2025</option>';
        provinceSelect.disabled = false;
        resetWardSelect(wardSelect, "Cần nạp dữ liệu địa chỉ 2025 trước");
        setManualWardInput(false);
        return;
    }

    locations.forEach((location, index) => {
        const option = document.createElement("option");
        option.value = location.thanhPho;
        option.textContent = location.thanhPho;
        option.dataset.code = location.maThanhPho;
        option.dataset.index = String(index);
        provinceSelect.appendChild(option);
    });
    provinceSelect.disabled = false;

    provinceSelect.addEventListener("change", function handleProvinceChange() {
        clearInlineError(this);
        if (provinceCodeInput) provinceCodeInput.value = "";
        if (wardCodeInput) wardCodeInput.value = "";
        resetWardSelect(wardSelect);
        setManualWardInput(false);

        const selectedOption = this.options[this.selectedIndex];
        const selectedIndex = Number(selectedOption?.dataset.index);
        const location = Number.isInteger(selectedIndex) ? locations[selectedIndex] : null;
        if (!location) return;

        if (provinceCodeInput) provinceCodeInput.value = location.maThanhPho;

        if (!location.xaPhuong.length) {
            showManualWardInput(wardSelect, "Nhập Xã/Phường/Đặc khu theo địa chỉ hiện tại");
            return;
        }

        wardSelect.innerHTML = '<option value="">Chọn Xã/Phường/Đặc khu...</option>';
        wardSelect.required = true;
        location.xaPhuong.forEach((ward) => {
            const option = document.createElement("option");
            option.value = ward.tenXa;
            option.textContent = ward.tenXa;
            option.dataset.code = ward.maXa;
            wardSelect.appendChild(option);
        });
        wardSelect.disabled = false;
    });

    wardSelect.addEventListener("change", function handleWardChange() {
        clearInlineError(this);
        if (!wardCodeInput) return;

        const selectedOption = this.options[this.selectedIndex];
        wardCodeInput.value = selectedOption?.dataset.code || "";
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
    bindUserInputTracking(document);
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
            if (isSurveyEnabledForUsers(survey)) {
                renderSurveyQuestions(survey);
            }
        }
    });
    setActiveStep("step-profile");
});
