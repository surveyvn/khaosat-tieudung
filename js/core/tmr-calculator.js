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

function getImprovementSuggestionLevel(result, surveyCode = "") {
    const total = Number(result?.totalTMRPersonYear) || 0;
    const benchmark = SURVEY_BENCHMARKS[String(surveyCode || "").toUpperCase()] || {};
    const goodThreshold = benchmark.good || RESOURCE_BENCHMARKS.sustainableKgPerPersonYear;
    const mediumThreshold = benchmark.medium || RESOURCE_BENCHMARKS.globalAverageKgPerPersonYear;
    const improveThreshold = benchmark.improve || mediumThreshold * 1.5;

    if (total <= goodThreshold) return "good";
    if (total <= mediumThreshold) return "medium";
    if (total <= improveThreshold) return "improve";
    return "high";
}

function getSurveyAssessment(surveyCode, result) {
    const code = String(surveyCode || "").trim().toUpperCase();
    const benchmark = SURVEY_BENCHMARKS[code] || {
        good: RESOURCE_BENCHMARKS.sustainableKgPerPersonYear,
        medium: RESOURCE_BENCHMARKS.globalAverageKgPerPersonYear,
        improve: RESOURCE_BENCHMARKS.globalAverageKgPerPersonYear * 1.5,
        unit: "kg/người/năm"
    };
    const total = Number(result?.totalTMRPersonYear) || 0;
    const level = getImprovementSuggestionLevel(result, code);
    const comparisonThreshold = benchmark.good;
    const excessAmount = Math.max(total - comparisonThreshold, 0);
    const excessPercent = comparisonThreshold ? excessAmount / comparisonThreshold * 100 : 0;
    const reductionRate = level === "high" ? .3 : level === "improve" ? .2 : level === "medium" ? .1 : 0;
    const targetReduction = total * reductionRate;
    const categoryTotal = Object.values(result?.byCategory || {}).reduce((sum, value) => sum + Number(value || 0), 0);
    const topCategory = getTopImpactCategories(result, 1)[0];
    const topShare = topCategory && categoryTotal ? Number(topCategory.value) / categoryTotal * 100 : 0;
    const detailRows = Object.values(result?.detail || {}).flat().filter(row => Number(row?.tmr) > 0).sort((a, b) => Number(b.tmr) - Number(a.tmr));
    const topDriver = detailRows[0] || null;
    return { code, benchmark, total, level, comparisonThreshold, excessAmount, excessPercent, reductionRate, targetReduction, topCategory, topShare, topDriver };
}

function getImprovementSuggestions(surveyCode, result) {
    const code = String(surveyCode || "").trim().toUpperCase();
    const assessment = getSurveyAssessment(code, result);
    const level = assessment.level;
    const rules = SURVEY_SUGGESTIONS[code] || {};
    const suggestion = rules[level] || rules.medium || rules.good || {
        title: "Gợi ý cải thiện",
        summary: "Hãy ưu tiên các nhóm tiêu dùng có tác động lớn nhất trong kết quả.",
        suggestions: ["Duy trì thói quen tốt và cải thiện từng bước nhỏ trong sinh hoạt hằng ngày."]
    };
    const levelInfo = SUGGESTION_LEVELS[level] || SUGGESTION_LEVELS.medium;
    const suggestions = [...(suggestion.suggestions || [])];
    if (assessment.topDriver) {
        suggestions.unshift(`Ưu tiên xử lý “${assessment.topDriver.label}” vì đây là yếu tố đóng góp lớn nhất (${formatKgPerPersonYear(assessment.topDriver.tmr / Math.max(getHouseholdSize(), 1))}).`);
    }
    if (assessment.targetReduction > 0) {
        suggestions.splice(1, 0, `Mục tiêu kỳ tiếp theo: giảm khoảng ${formatKgPerPersonYear(assessment.targetReduction)} (${Math.round(assessment.reductionRate * 100)}%) so với kết quả hiện tại.`);
    }

    return {
        level,
        label: levelInfo.label,
        badgeClass: levelInfo.badgeClass,
        title: suggestion.title,
        summary: suggestion.summary,
        suggestions: suggestions.slice(0, 5),
        assessment
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
