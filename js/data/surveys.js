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
        description: "Tìm hiểu thói quen mua sắm, sử dụng và xử lý sản phẩm thời trang nhằm thúc đẩy tiêu dùng bền vững và kinh tế tuần hoàn.",
        available: true,
        groups: [
            {
                title: "Phần 1 — Thông tin chung",
                questions: [
                    { id: "full_name", label: "1. Họ và tên", type: "text", required: true },
                    {
                        id: "age_group",
                        label: "2. Độ tuổi",
                        type: "radio",
                        options: ["Dưới 18", "Từ 18–25", "Từ 26–35", "Trên 35"],
                        required: true
                    },
                    { id: "gender", label: "3. Giới tính", type: "radio", options: ["Nam", "Nữ", "Khác"], required: true },
                    { id: "address", label: "4. Địa chỉ", type: "text", required: true },
                    {
                        id: "fashion_interest",
                        label: "5. Mức độ quan tâm đến thời trang",
                        type: "scale", min: 0, max: 5,
                        minLabel: "Không quan tâm", maxLabel: "Rất quan tâm",
                        required: true
                    },
                    {
                        id: "monthly_income",
                        label: "6. Khoảng thu nhập bình quân hằng tháng hiện nay",
                        type: "radio",
                        options: ["Dưới 1 triệu", "1–5 triệu", "5–10 triệu", "10–20 triệu", "Trên 20 triệu"],
                        required: true
                    }
                ]
            },
            {
                title: "Phần 2 — Hành vi mua sắm và sử dụng",
                questions: [
                    {
                        id: "purchase_factor_ranking",
                        label: "7. Xếp hạng các yếu tố ảnh hưởng đến quyết định mua hàng (1 là ưu tiên cao nhất, 3 là thấp nhất)",
                        type: "rank", options: ["Giá cả", "Mẫu mã/xu hướng", "Chất lượng"], required: true
                    },
                    {
                        id: "shopping_places",
                        label: "8. Anh/Chị thường mua sản phẩm thời trang ở đâu? (Có thể chọn nhiều phương án)",
                        type: "checkbox-other",
                        options: ["Cửa hàng trực tiếp", "Trung tâm thương mại", "Sàn thương mại điện tử (Shopee, Lazada, Tiki…)", "Mạng xã hội (Facebook, TikTok, Instagram…)", "Chợ/Local shop"],
                        otherLabel: "Khác"
                    },
                    {
                        id: "shopping_frequency",
                        label: "9. Mức độ/tần suất mua sắm thời trang",
                        type: "scale", min: 1, max: 5,
                        minLabel: "Rất hiếm khi mua", maxLabel: "Rất thường xuyên mua",
                        note: "1: Chỉ mua khi thật sự cần; 2: Vài tháng/lần; 3: Khoảng 1 lần/tháng; 4: 2–3 lần/tháng; 5: Hàng tuần hoặc nhiều hơn.",
                        required: true
                    },
                    {
                        id: "monthly_fashion_spending",
                        label: "10. Anh/Chị thường chi bao nhiêu tiền cho thời trang mỗi tháng?",
                        type: "radio",
                        options: ["Dưới 200.000đ", "200.000–500.000đ", "500.000–1.000.000đ", "Trên 1.000.000đ"],
                        required: true
                    },
                    {
                        id: "purchase_priorities",
                        label: "11. Anh/Chị ưu tiên điều gì khi chọn mua sản phẩm thời trang? (Có thể chọn nhiều phương án)",
                        type: "checkbox-other",
                        options: ["Giá rẻ", "Độ bền", "Thoải mái", "Hợp xu hướng", "Thân thiện môi trường"],
                        otherLabel: "Khác"
                    },
                    {
                        id: "shopping_occasions",
                        label: "12. Anh/Chị thường mua thời trang vào dịp nào? (Có thể chọn nhiều phương án)",
                        type: "checkbox",
                        options: ["Khi cần", "Khi có giảm giá", "Theo xu hướng mới", "Dịp lễ/Tết", "Mua ngẫu hứng"]
                    },
                    {
                        id: "average_usage_time",
                        label: "13. Thời gian sử dụng trung bình của một sản phẩm thời trang trước khi không dùng nữa",
                        type: "radio",
                        options: ["Dưới 6 tháng", "6 tháng–1 năm", "1–3 năm", "Trên 3 năm"],
                        required: true
                    }
                ]
            },
            {
                title: "Phần 3 — Hành vi xử lý thời trang cũ",
                questions: [
                    {
                        id: "old_fashion_disposal",
                        label: "14. Khi sản phẩm thời trang không còn nhu cầu sử dụng, Anh/Chị thường xử lý bằng cách nào? (Có thể chọn nhiều phương án)",
                        type: "checkbox",
                        options: ["Vứt chung với rác thải sinh hoạt", "Quyên góp từ thiện", "Pass hoặc tặng lại cho người khác", "Thanh lý/ký gửi tại cửa hàng đồ cũ", "Mang đến điểm thu gom của hãng thời trang để đổi ưu đãi", "Tự tái chế tại nhà", "Cất trong tủ và không sử dụng"]
                    },
                    {
                        id: "stop_using_reasons",
                        label: "15. Lý do chính khiến Anh/Chị không tiếp tục sử dụng sản phẩm thời trang là gì? (Có thể chọn nhiều phương án)",
                        type: "checkbox",
                        options: ["Không còn hợp xu hướng", "Bị hỏng/cũ", "Không còn phù hợp kích cỡ", "Chất lượng kém", "Không thích nữa"]
                    },
                    {
                        id: "minor_damage_action",
                        label: "16. Nếu sản phẩm bị hư hỏng nhỏ, Anh/Chị thường xử lý như thế nào? (Có thể chọn nhiều phương án)",
                        type: "checkbox",
                        options: ["Tự sửa chữa để tiếp tục sử dụng", "Mang đi sửa tại tiệm", "Tận dụng cho mục đích khác", "Cho/tặng người khác", "Vứt bỏ"]
                    },
                    {
                        id: "secondhand_frequency",
                        label: "17. Anh/Chị mua hoặc sử dụng đồ second-hand bao nhiêu lần mỗi năm?",
                        type: "radio", options: ["Chưa từng", "1–2 lần/năm", "3–5 lần/năm", "Trên 5 lần/năm"], required: true
                    },
                    {
                        id: "secondhand_places",
                        label: "18. Anh/Chị thường mua đồ second-hand ở đâu?",
                        type: "radio", options: ["Chợ đồ cũ", "Facebook/Instagram", "Shopee/TikTok Shop", "Cửa hàng second-hand", "Bạn bè/người quen", "Chưa từng"], required: true
                    },
                    {
                        id: "secondhand_types",
                        label: "19. Anh/Chị thường mua loại đồ second-hand nào?",
                        type: "radio", options: ["Quần áo", "Giày dép", "Túi xách/phụ kiện", "Nội thất/đồ gia dụng", "Chưa từng"], required: true
                    },
                    {
                        id: "reuse_interest",
                        label: "20. Mức độ quan tâm đến việc tái chế hoặc tái sử dụng thời trang",
                        type: "scale", min: 0, max: 5, minLabel: "Không quan tâm", maxLabel: "Rất quan tâm", required: true
                    },
                    {
                        id: "circular_price_willingness",
                        label: "21. Anh/Chị có sẵn sàng trả giá cao hơn cho sản phẩm thời trang tuần hoàn không?",
                        type: "radio",
                        options: ["Sẵn sàng", "Không sẵn sàng", "Còn tùy thuộc vào chất lượng và kiểu dáng thực tế"],
                        required: true
                    },
                    {
                        id: "acceptable_price_premium",
                        label: "22. Nếu sẵn sàng, Anh/Chị chấp nhận mức giá cao hơn bao nhiêu so với sản phẩm thông thường?",
                        type: "radio", options: ["Dưới 5%", "Từ 5%–10%", "Từ 10%–20%", "Từ 20%–30%", "Trên 30%"]
                    }
                ]
            },
            {
                title: "Phần 4 — Nhận thức về thời trang bền vững và kinh tế tuần hoàn",
                questions: [
                    {
                        id: "circular_fashion_behaviors",
                        label: "23. Theo Anh/Chị, hành vi nào sau đây thuộc về thời trang tuần hoàn?",
                        type: "radio",
                        options: ["Mua sản phẩm làm từ vật liệu tái chế", "Mang sản phẩm cũ đến cửa hàng để hãng thu gom/tái chế", "Mua bán hoặc ký gửi sản phẩm second-hand", "Sửa/làm mới sản phẩm thay vì vứt bỏ khi hỏng nhỏ", "Tất cả các phương án trên"],
                        required: true
                    },
                    {
                        id: "circular_fashion_barriers",
                        label: "24. Rào cản khiến gia đình Anh/Chị ngại tiếp cận thời trang tuần hoàn là gì? (Có thể chọn nhiều phương án)",
                        type: "checkbox-other",
                        options: ["Giá thành sản phẩm bền vững còn quá cao", "Thiếu thông tin hoặc không biết mua ở đâu", "Lo ngại vệ sinh của đồ second-hand/đồ cho thuê", "Mẫu mã sản phẩm tái chế chưa phong phú hoặc lỗi mốt", "Chưa có điểm thu gom đồ cũ tiện lợi gần nhà", "Ngại dùng đồ đã qua sử dụng hoặc lo ngại chất lượng và độ bền"],
                        otherLabel: "Khác"
                    },
                    {
                        id: "circular_economy_actions",
                        label: "25. Hoạt động nào giúp thúc đẩy kinh tế tuần hoàn trong thời trang hiệu quả nhất? (Có thể chọn nhiều phương án)",
                        type: "checkbox",
                        options: ["Tái chế quần áo", "Mua đồ second-hand", "Sửa chữa và tái sử dụng", "Giảm mua sắm quá mức", "Sử dụng chất liệu thân thiện môi trường"]
                    },
                    {
                        id: "reuse_environment_impact",
                        label: "26. Việc tái sử dụng thời trang có giúp bảo vệ môi trường không?",
                        type: "scale", min: 0, max: 5, minLabel: "Không ảnh hưởng", maxLabel: "Rất ảnh hưởng", required: true
                    },
                    {
                        id: "sustainable_fashion_future",
                        label: "27. Anh/Chị có tin thời trang bền vững sẽ trở thành xu hướng trong tương lai không?",
                        type: "scale", min: 0, max: 5, minLabel: "Không xảy ra", maxLabel: "Chắc chắn xảy ra", required: true
                    }
                ]
            },
            {
                title: "Dữ liệu bổ sung để tính dấu chân vật chất TMR",
                description: "Hai câu dưới đây giúp hệ thống ước tính tác động vật chất từ lượng mua sắm thời trang của hộ gia đình.",
                questions: [
                    {
                        id: "annual_purchase",
                        label: "Số lượng mua sắm trung bình mỗi năm của hộ gia đình",
                        type: "grid",
                        items: [
                            { code: "clothes", label: "Quần, áo (cái/năm)" },
                            { code: "shoes", label: "Giày, dép (đôi/năm)" }
                        ]
                    },
                    {
                        id: "used_items",
                        label: "Hộ gia đình có mua sản phẩm thời trang cũ không? Nếu có, vui lòng nêu cụ thể",
                        type: "textarea",
                        required: true
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

if (typeof window !== "undefined") {
    window.SURVEYS = surveys;
}
