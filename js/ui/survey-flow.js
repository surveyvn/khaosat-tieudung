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
    if (question.type === "title-block") {
        return `
            <div class="question-title-block">
                <h4>${escapeHtml(question.label || "Tiêu đề")}</h4>
                ${question.description ? `<p>${escapeHtml(question.description)}</p>` : ""}
                ${question.note ? `<p>${escapeHtml(question.note)}</p>` : ""}
            </div>
        `;
    }

    const namePrefix = `${surveyId}_${question.id}`;
    const inputId = `question_${namePrefix}`;
    const isAddressQuestion = surveyId === "fashion" && question.id === "address";
    let html = '<div class="question-group">';

    if (question.note) {
        html += `<div class="note-highlight">${question.note}</div>`;
    }

    html += `<label class="question-label" for="${inputId}">${question.label}</label>`;

    if (question.type === "number") {
        html += `<input type="number" name="${namePrefix}" min="${question.min ?? 0}" step="${question.step ?? "any"}" inputmode="decimal" placeholder="${getNumberPlaceholder(question, surveyId)}" ${question.required ? "required" : ""}>`;
    } else if (question.type === "text") {
        html += `<input id="${inputId}" type="text" name="${namePrefix}" placeholder="${isAddressQuestion ? "Nhập số nhà, đường, phường/xã, tỉnh/thành" : "Nhập câu trả lời"}" autocomplete="${isAddressQuestion ? "street-address" : "off"}" ${question.required ? "required" : ""}>`;
    } else if (question.type === "textarea") {
        html += `<textarea name="${namePrefix}" rows="3" placeholder="Nhập câu trả lời" ${question.required ? "required" : ""}></textarea>`;
    } else if (question.type === "fashion-location") {
        html += `<div class="fashion-location-fields" data-fashion-location><select id="${inputId}_province" name="fashion_province" required><option value="">Chọn Tỉnh/Thành phố...</option></select><select id="${inputId}_ward" name="fashion_ward" disabled><option value="">Chọn Tỉnh/Thành phố trước</option></select><input type="hidden" name="fashion_province_code"><input type="hidden" name="fashion_ward_code"></div>`;
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
    } else if (question.type === "checkbox" || question.type === "checkbox-other") {
        html += `<div class="options-list">${question.options.map((option) => `
            <label class="option-item-custom">
                <input type="checkbox" name="${namePrefix}" value="${option}">
                ${option}
            </label>
        `).join("")}`;
        if (question.type === "checkbox-other") html += `
            <label class="option-item-custom">
                <input type="checkbox" name="${namePrefix}" value="other">
                ${question.otherLabel}:
                <input type="text" name="${namePrefix}_other">
            </label>
        `;
        html += "</div>";
    } else if (question.type === "scale") {
        const min = Number.isFinite(question.min) ? question.min : 0;
        const max = Number.isFinite(question.max) ? question.max : 5;
        const values = Array.from({ length: max - min + 1 }, (_, index) => min + index);
        html += `
            <div class="survey-scale" role="radiogroup" aria-label="${escapeHtml(question.label)}">
                <span class="survey-scale-label">${escapeHtml(question.minLabel || "Mức thấp nhất")}</span>
                <div class="survey-scale-options">
                    ${values.map((value) => `
                        <label>
                            <input type="radio" name="${namePrefix}" value="${value}" ${question.required ? "required" : ""}>
                            <span>${value}</span>
                        </label>
                    `).join("")}
                </div>
                <span class="survey-scale-label">${escapeHtml(question.maxLabel || "Mức cao nhất")}</span>
            </div>
        `;
    } else if (question.type === "rank") {
        html += `<div class="ranking-list">${question.options.map((option) => `
            <label class="ranking-item">
                <span>${option}</span>
                <select name="${namePrefix}_${option.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "_")}" ${question.required ? "required" : ""}>
                    <option value="">Chọn thứ tự</option>
                    ${question.options.map((_, index) => `<option value="${index + 1}">${index + 1}</option>`).join("")}
                </select>
            </label>
        `).join("")}</div>`;
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
                            <label class="input-label" for="electricity_${option.inputId}${option.value === "bill" ? "_display" : ""}">${option.inputLabel}</label>
                            <div class="input-with-unit">
                                ${option.value === "bill" ? `
                                    <input
                                        id="electricity_${option.inputId}_display"
                                        type="text"
                                        class="consumption-value formatted-currency"
                                        name="electricity_${option.inputId}_display"
                                        inputmode="numeric"
                                        autocomplete="off"
                                        placeholder="Ví dụ: 300.000"
                                        disabled
                                    >
                                    <input type="hidden" name="electricity_${option.inputId}" disabled>
                                ` : `
                                    <input
                                        id="electricity_${option.inputId}"
                                        type="number"
                                        class="smart-number consumption-value"
                                        name="electricity_${option.inputId}"
                                        min="0"
                                        step="any"
                                        inputmode="decimal"
                                        placeholder="Nhập số kWh"
                                        ${index === 0 ? "required" : "disabled"}
                                    >
                                `}
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

function bindFashionLocationInputs(scope) {
    const locations = normalizeLocationData2025(window.LOCATION_DATA_2025);
    scope.querySelectorAll("[data-fashion-location]").forEach((container) => {
        const province = container.querySelector('[name="fashion_province"]'); const ward = container.querySelector('[name="fashion_ward"]'); const provinceCode = container.querySelector('[name="fashion_province_code"]'); const wardCode = container.querySelector('[name="fashion_ward_code"]');
        if (!province || !ward) return;
        locations.forEach((location, index) => { const option = document.createElement("option"); option.value = location.thanhPho; option.textContent = location.thanhPho; option.dataset.index = String(index); option.dataset.code = location.maThanhPho; province.appendChild(option); });
        province.addEventListener("change", () => { clearInlineError(province); ward.innerHTML = '<option value="">Chọn Xã/Phường/Đặc khu...</option>'; ward.disabled = true; ward.required = false; ward.value = ""; if (provinceCode) provinceCode.value = ""; if (wardCode) wardCode.value = ""; const location = locations[Number(province.options[province.selectedIndex]?.dataset.index)]; if (!location) return; if (provinceCode) provinceCode.value = location.maThanhPho; location.xaPhuong.forEach((item) => { const option = document.createElement("option"); option.value = item.tenXa; option.textContent = item.tenXa; option.dataset.code = item.maXa; ward.appendChild(option); }); ward.disabled = false; ward.required = true; });
        ward.addEventListener("change", () => { clearInlineError(ward); if (wardCode) wardCode.value = ward.options[ward.selectedIndex]?.dataset.code || ""; });
    });
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

function bindRankingInputs(scope) {
    scope.querySelectorAll(".ranking-list").forEach((ranking) => {
        const selects = Array.from(ranking.querySelectorAll("select"));
        const updateAvailableRanks = () => {
            const selected = new Set(selects.map((select) => select.value).filter(Boolean));
            selects.forEach((select) => {
                Array.from(select.options).forEach((option) => {
                    option.disabled = Boolean(option.value && option.value !== select.value && selected.has(option.value));
                });
            });
        };

        selects.forEach((select) => select.addEventListener("change", updateAvailableRanks));
        updateAvailableRanks();
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

            const amount = Number(input.dataset.rawValue || input.value) || 0;
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
                const rawInput = panel.querySelector('input[type="hidden"]');
                panel.classList.toggle("active", isActive);
                if (input) {
                    input.disabled = !isActive;
                    input.required = isActive;
                    if (rawInput) rawInput.disabled = !isActive;
                    if (!isActive) {
                        input.value = "";
                        delete input.dataset.rawValue;
                        if (rawInput) rawInput.value = "";
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
            if (!input) return;
            input.addEventListener("input", () => {
                if (input.classList.contains("formatted-currency")) {
                    const digits = input.value.replace(/\D/g, "").replace(/^0+(?=\d)/, "");
                    input.dataset.rawValue = digits;
                    input.value = digits ? Number(digits).toLocaleString("vi-VN") : "";
                    const rawInput = panel.querySelector('input[type="hidden"]');
                    if (rawInput) {
                        rawInput.value = digits;
                        rawInput.dataset.userEdited = digits ? "true" : "";
                    }
                }
                updatePreview(panel);
            });
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
        ${survey.introduction ? `<div class="survey-introduction">${survey.introduction.map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`).join("")}</div>` : ""}
        ${survey.introductionNote ? `<div class="note-highlight survey-introduction-note">${escapeHtml(survey.introductionNote)}</div>` : ""}
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
    bindRankingInputs(dynamicQuestions);
    bindFashionLocationInputs(dynamicQuestions);
    bindSmartNumberInputs(dynamicQuestions);
    bindUserInputTracking(dynamicQuestions);
}

function collectProfileData() {
    const form = document.getElementById("profileForm");
    const formData = new FormData(form);
    let account = {};
    try { account = JSON.parse(localStorage.getItem("ecoimpact-session-v1")) || {}; } catch (_) { account = {}; }

    return {
        hoTen: String(account.name || "Người dùng").trim(),
        doTuoi: String(account.age || "").trim(),
        gioiTinh: String(account.gender || "").trim(),
        soThanhVienHoGiaDinh: String(formData.get("household") || "").trim(),
        thanhPho: "",
        xa: "",
        maThanhPho: "",
        maXa: ""
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
    const assessment = improvement.assessment;
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
        <div class="impact-alert ${escapeHtml(assessment.level)}">
            <div class="impact-alert-head"><strong>${assessment.excessAmount > 0 ? `Vượt mốc ${formatNumber(assessment.excessPercent, 0)}%` : "Trong mốc tham chiếu"}</strong><span>${escapeHtml(formatKgPerPersonYear(assessment.total))}</span></div>
            <div class="impact-meter"><span style="width:${Math.min(assessment.total / assessment.benchmark.improve * 100, 100)}%"></span></div>
            <div class="impact-scale"><small>Tốt ≤ ${formatNumber(assessment.benchmark.good, 0)}</small><small>Trung bình ≤ ${formatNumber(assessment.benchmark.medium, 0)}</small><small>Cảnh báo &gt; ${formatNumber(assessment.benchmark.improve, 0)}</small></div>
            <p>${assessment.excessAmount > 0 ? `Cao hơn vùng tốt ${formatKgPerPersonYear(assessment.excessAmount)}.` : `Kết quả chưa vượt mốc ${formatKgPerPersonYear(assessment.comparisonThreshold)}.`}</p>
        </div>
        <small class="benchmark-note"><i class="fas fa-circle-info"></i> Đây là ngưỡng tham chiếu vận hành của ứng dụng và sẽ được hiệu chỉnh khi có thêm dữ liệu thực tế.</small>
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
