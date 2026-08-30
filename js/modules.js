const MODULE_STORAGE_KEY = "ecoimpact-expense-v1";
const CHALLENGE_STORAGE_KEY = "ecoimpact-challenges-v1";
const IMPACT_INTEREST_STORAGE_KEY = "ecoimpact-impact-interests-v1";

const impactProjectCatalog = [
    { id: "mangrove", icon: "fa-tree", theme: "forest", title: "Phục hồi rừng ngập mặn", location: "Dự kiến: khu vực ven biển", description: "Hỗ trợ phục hồi hệ sinh thái và theo dõi tỷ lệ cây sống sau khi trồng." },
    { id: "coast", icon: "fa-water", theme: "ocean", title: "Làm sạch bờ biển", location: "Dự kiến: chiến dịch cộng đồng", description: "Tổ chức thu gom, phân loại và công bố khối lượng rác đã xử lý." },
    { id: "school", icon: "fa-recycle", theme: "recycle", title: "Tái chế tại trường học", location: "Dự kiến: trường học đối tác", description: "Hỗ trợ điểm thu gom và giáo dục phân loại rác đúng cách." }
];

function getImpactInterests() {
    try { const value = JSON.parse(localStorage.getItem(IMPACT_INTEREST_STORAGE_KEY)); return Array.isArray(value) ? value : []; }
    catch (_) { return []; }
}

let impactInterests = getImpactInterests();

const moduleBrandContexts = {
    home: { label: "Tổng quan cá nhân", tags: ["Hồ sơ xanh", "Chi tiêu", "Thử thách"] },
    "eco-profile": { label: "Hồ sơ Tiêu dùng Xanh", tags: ["Tài chính", "TMR", "Thói quen"] },
    challenges: { label: "Thử thách cá nhân", tags: ["Tài chính", "Sống xanh", "Check-in"] },
    biome: { label: "Khu rừng cá nhân", tags: ["Lá xanh", "Cấp độ", "Huy hiệu"] },
    community: { label: "Tác động cộng đồng", tags: ["Dự án", "NGO", "Minh bạch"] },
    survey: { label: "Khảo sát tác động", tags: ["TMR", "Điện", "Thực phẩm", "Thời trang"] },
    expense: { label: "Quản lý chi tiêu", tags: ["Ngân sách", "Giao dịch", "Tiết kiệm"] },
    ai: { label: "Trợ lý AI", tags: ["Chi tiêu", "Eco-Score", "Thử thách"] }
};

function updateModuleBrandContext(name) {
    const context = moduleBrandContexts[name] || moduleBrandContexts.home;
    const label = document.getElementById("appContextLabel");
    const meta = document.getElementById("appBrandMeta");
    if (label) label.textContent = context.label;
    if (meta) meta.innerHTML = context.tags.map(tag => `<span>${escapeHtml(tag)}</span>`).join("");
}

const challengeCatalog = [
    { id: "expense-7", type: "finance", icon: "fa-receipt", title: "7 ngày ghi chép đầy đủ", description: "Ghi lại ít nhất một khoản chi trong 7 ngày khác nhau.", goal: 7, unit: "ngày", mode: "expense-days", difficulty: "Dễ", duration: "7 ngày" },
    { id: "survey-3", type: "eco", icon: "fa-clipboard-check", title: "Hoàn thiện hồ sơ xanh", description: "Hoàn thành đủ 3 khảo sát điện, thực phẩm và thời trang.", goal: 3, unit: "khảo sát", mode: "surveys", difficulty: "Dễ", duration: "Tự do" },
    { id: "no-spend-5", type: "finance", icon: "fa-piggy-bank", title: "5 ngày không chi ngoài kế hoạch", description: "Mỗi tối xác nhận một ngày không phát sinh khoản mua ngoài kế hoạch.", goal: 5, unit: "ngày", mode: "manual-daily", difficulty: "Vừa", duration: "7 ngày" },
    { id: "closet-10", type: "eco", icon: "fa-shirt", title: "Thanh lọc tủ đồ", description: "Sắp xếp 10 món để tiếp tục dùng, sửa chữa, tặng lại hoặc tái chế.", goal: 10, unit: "món", mode: "manual", difficulty: "Vừa", duration: "7 ngày" },
    { id: "energy-7", type: "eco", icon: "fa-bolt", title: "Tối ưu năng lượng gia đình", description: "Thực hiện một hành động tiết kiệm điện trong 7 ngày.", goal: 7, unit: "ngày", mode: "manual-daily", difficulty: "Vừa", duration: "7 ngày" }
];

function getChallengeData() {
    try { return JSON.parse(localStorage.getItem(CHALLENGE_STORAGE_KEY)) || { active: {}, completed: {} }; }
    catch (_) { return { active: {}, completed: {} }; }
}

let challengeData = getChallengeData();
let selectedChallengeFilter = "all";

function money(value) {
    return new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND", maximumFractionDigits: 0 }).format(Number(value) || 0);
}

function parseCurrency(value) {
    return Number(String(value || "").replace(/\D/g, "")) || 0;
}

function formatCurrencyInput(input) {
    const amount = parseCurrency(input.value);
    input.value = amount ? amount.toLocaleString("vi-VN") : "";
}

function bindCurrencyInputs() {
    document.querySelectorAll(".currency-input").forEach(input => {
        input.addEventListener("input", () => formatCurrencyInput(input));
        input.addEventListener("paste", () => requestAnimationFrame(() => formatCurrencyInput(input)));
    });
}

function getFinanceData() {
    try {
        return JSON.parse(localStorage.getItem(MODULE_STORAGE_KEY)) || { income: 0, target: 0, expenses: [] };
    } catch (_) {
        return { income: 0, target: 0, expenses: [] };
    }
}

let financeData = getFinanceData();
let selectedExpenseMonth = new Date().toISOString().slice(0, 7);

const expenseCategoryMeta = {
    "Ăn uống": { color: "#f59e0b", icon: "fa-utensils" },
    "Đi lại": { color: "#3b82f6", icon: "fa-motorcycle" },
    "Nhà ở": { color: "#8b5cf6", icon: "fa-house" },
    "Mua sắm": { color: "#ec4899", icon: "fa-bag-shopping" },
    "Giải trí": { color: "#14b8a6", icon: "fa-film" },
    "Khác": { color: "#64748b", icon: "fa-ellipsis" }
};

function getExpenseMonth(item) {
    if (item.month) return item.month;
    if (item.createdAt) return String(item.createdAt).slice(0, 7);
    return new Date().toISOString().slice(0, 7);
}

function saveFinanceData() {
    localStorage.setItem(MODULE_STORAGE_KEY, JSON.stringify(financeData));
}

function saveChallengeData() {
    localStorage.setItem(CHALLENGE_STORAGE_KEY, JSON.stringify(challengeData));
    renderChallenges();
}

function openModule(name) {
    document.querySelectorAll(".module-view").forEach((view) => view.classList.toggle("active", view.id === `module-${name}`));
    document.querySelectorAll(".product-nav-item").forEach((item) => item.classList.toggle("active", item.dataset.module === name));
    document.body.classList.toggle("survey-mode", name === "survey");
    document.body.classList.toggle("ai-mode", name === "ai");
    updateModuleBrandContext(name);
    if (name === "survey" && typeof state !== "undefined") {
        state.profile = getStoredProfile();
        fillProfileForm(state.profile || {});
        setActiveStep(state.profile ? "step-selector" : "step-profile");
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
    if (name === "home") updateDashboard();
    if (name === "eco-profile") renderEcoProfile();
    if (name === "challenges") renderChallenges();
    if (name === "biome") renderBiome();
    if (name === "community") renderCommunityImpact();
    if (name === "ai" && typeof updateAssistantInsight === "function") updateAssistantInsight();
    if (name === "ai") {
        requestAnimationFrame(() => document.getElementById("aiChatInput")?.scrollIntoView({ block: "nearest" }));
    }
}

function getChallengeProgress(challenge) {
    const active = challengeData.active[challenge.id];
    if (!active) return 0;
    if (challenge.mode === "expense-days") {
        const start = new Date(active.startedAt).getTime();
        const days = new Set(financeData.expenses.filter(item => new Date(item.createdAt || 0).getTime() >= start).map(item => String(item.createdAt || "").slice(0, 10)).filter(Boolean));
        return Math.min(days.size, challenge.goal);
    }
    if (challenge.mode === "surveys") {
        const start = new Date(active.startedAt).getTime();
        const ids = new Set(getStoredHistory().filter(item => new Date(item.completedAt || 0).getTime() >= start).map(item => item.surveyId));
        return Math.min(ids.size, challenge.goal);
    }
    return Math.min(Number(active.progress) || 0, challenge.goal);
}

function showChallengeToast(message) {
    const toast = document.getElementById("challengeToast");
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add("show");
    clearTimeout(showChallengeToast.timer);
    showChallengeToast.timer = setTimeout(() => toast.classList.remove("show"), 2200);
}

function syncChallengeCompletions() {
    let changed = false;
    challengeCatalog.forEach(challenge => {
        if (!challengeData.active[challenge.id]) return;
        const progress = getChallengeProgress(challenge);
        if (progress < challenge.goal) return;
        challengeData.completed[challenge.id] = { ...challengeData.active[challenge.id], completedAt: new Date().toISOString() };
        delete challengeData.active[challenge.id];
        changed = true;
    });
    if (changed) localStorage.setItem(CHALLENGE_STORAGE_KEY, JSON.stringify(challengeData));
}

function renderChallenges() {
    const grid = document.getElementById("challengeGrid");
    if (!grid) return;
    syncChallengeCompletions();
    const activeEntries = challengeCatalog.filter(item => challengeData.active[item.id]);
    document.getElementById("challengeActiveCount").textContent = activeEntries.length;
    document.getElementById("challengeCompletedCount").textContent = `${Object.keys(challengeData.completed).length} đã hoàn thành`;
    const activeList = document.getElementById("activeChallengeList");
    activeList.innerHTML = activeEntries.length ? activeEntries.map(challenge => {
        const progress = getChallengeProgress(challenge);
        const percent = Math.round(progress / challenge.goal * 100);
        const canCheckIn = challenge.mode === "manual" || challenge.mode === "manual-daily";
        const checkedToday = challenge.mode === "manual-daily" && challengeData.active[challenge.id]?.lastCheckIn === new Date().toISOString().slice(0, 10);
        return `<article class="active-challenge-card"><div class="active-challenge-icon ${challenge.type}"><i class="fas ${challenge.icon}"></i></div><div class="active-challenge-main"><div><span>${escapeHtml(challenge.type === "finance" ? "Tài chính" : "Sống xanh")}</span><h3>${escapeHtml(challenge.title)}</h3></div><p>${progress}/${challenge.goal} ${escapeHtml(challenge.unit)} • ${percent}%</p><div class="challenge-progress"><i style="width:${percent}%"></i></div></div><div class="active-challenge-actions">${canCheckIn ? `<button type="button" data-challenge-checkin="${challenge.id}" ${checkedToday ? "disabled" : ""}><i class="fas fa-check"></i> ${checkedToday ? "Đã check-in" : challenge.mode === "manual" ? "+1 tiến độ" : "Check-in hôm nay"}</button>` : `<small><i class="fas fa-wand-magic-sparkles"></i> Tự động cập nhật</small>`}<button class="challenge-stop" type="button" data-challenge-stop="${challenge.id}">Dừng</button></div></article>`;
    }).join("") : `<div class="challenge-empty"><i class="fas fa-compass"></i><div><h3>Chưa có thử thách đang thực hiện</h3><p>Chọn một thử thách nhỏ ở bên dưới để bắt đầu.</p></div></div>`;
    const filtered = challengeCatalog.filter(item => selectedChallengeFilter === "all" || item.type === selectedChallengeFilter);
    grid.innerHTML = filtered.map(challenge => {
        const active = Boolean(challengeData.active[challenge.id]);
        const completed = Boolean(challengeData.completed[challenge.id]);
        return `<article class="challenge-card ${challenge.type} ${completed ? "completed" : ""}"><div class="challenge-card-top"><span><i class="fas ${challenge.icon}"></i></span><small>${escapeHtml(challenge.difficulty)}</small></div><p>${challenge.type === "finance" ? "Tài chính" : "Sống xanh"}</p><h3>${escapeHtml(challenge.title)}</h3><div class="challenge-meta"><span><i class="far fa-clock"></i> ${escapeHtml(challenge.duration)}</span><span><i class="fas fa-chart-simple"></i> ${challenge.goal} ${escapeHtml(challenge.unit)}</span></div><p class="challenge-description">${escapeHtml(challenge.description)}</p><button type="button" data-challenge-join="${challenge.id}" ${active || completed ? "disabled" : ""}>${completed ? '<i class="fas fa-circle-check"></i> Đã hoàn thành' : active ? "Đang thực hiện" : "Tham gia thử thách"}</button></article>`;
    }).join("");
}

function joinChallenge(id) {
    const challenge = challengeCatalog.find(item => item.id === id);
    if (!challenge || challengeData.active[id] || challengeData.completed[id]) return;
    challengeData.active[id] = { startedAt: new Date().toISOString(), progress: 0, lastCheckIn: "" };
    saveChallengeData();
    showChallengeToast(`Đã bắt đầu: ${challenge.title}`);
}

function checkInChallenge(id) {
    const challenge = challengeCatalog.find(item => item.id === id);
    const active = challengeData.active[id];
    if (!challenge || !active) return;
    const today = new Date().toISOString().slice(0, 10);
    if (challenge.mode === "manual-daily" && active.lastCheckIn === today) return;
    active.progress = Math.min((Number(active.progress) || 0) + 1, challenge.goal);
    active.lastCheckIn = today;
    const completedNow = active.progress >= challenge.goal;
    saveChallengeData();
    showChallengeToast(completedNow ? `Hoàn thành thử thách: ${challenge.title}!` : `Đã cập nhật ${active.progress}/${challenge.goal} ${challenge.unit}`);
}

function updateDashboard() {
    const profile = calculateEcoProfile();
    const score = document.getElementById("dashboardEcoScore");
    const label = document.getElementById("dashboardEcoScoreLabel");
    if (score) score.textContent = profile.totalScore ?? "--";
    if (label) label.textContent = profile.totalScore === null ? "Hoàn thiện dữ liệu để chấm điểm" : `${profile.totalLabel} • dữ liệu ${profile.completeness}%`;
    renderEcoProfile(profile);
    renderBiome();
}

function clampScore(value) { return Math.max(0, Math.min(100, Math.round(Number(value) || 0))); }

function calculateFinancialProfileScore() {
    if (!financeData.income) return null;
    const expenses = financeData.expenses.filter(item => getExpenseMonth(item) === selectedExpenseMonth);
    const spent = expenses.reduce((sum, item) => sum + Number(item.amount), 0);
    const savingRate = financeData.target / financeData.income;
    const spendable = Math.max(financeData.income - financeData.target, 0);
    const spendingRate = spendable ? spent / spendable : (spent ? 2 : 0);
    return clampScore(55 + Math.min(savingRate, .3) * 100 - Math.max(spendingRate - .65, 0) * 90);
}

function scoreSurveyResult(entry) {
    const survey = getSurveyById(entry.surveyId);
    const code = typeof getSurveyCodeForSurvey === "function" ? getSurveyCodeForSurvey(survey) : "";
    const assessment = typeof getSurveyAssessment === "function" ? getSurveyAssessment(code, entry.result || entry) : null;
    if (!assessment || !assessment.benchmark?.good) return null;
    const ratio = assessment.total / assessment.benchmark.good;
    if (ratio <= 1) return clampScore(90 + (1 - ratio) * 10);
    if (assessment.total <= assessment.benchmark.medium) return clampScore(90 - (ratio - 1) / Math.max(assessment.benchmark.medium / assessment.benchmark.good - 1, .01) * 30);
    if (assessment.total <= assessment.benchmark.improve) return clampScore(60 - (assessment.total - assessment.benchmark.medium) / Math.max(assessment.benchmark.improve - assessment.benchmark.medium, 1) * 20);
    return clampScore(Math.max(10, 40 * assessment.benchmark.improve / Math.max(assessment.total, 1)));
}

function calculateEcoProfile() {
    const history = typeof getStoredHistory === "function" ? getStoredHistory() : [];
    const latestBySurvey = new Map();
    history.forEach(entry => { if (!latestBySurvey.has(entry.surveyId)) latestBySurvey.set(entry.surveyId, entry); });
    const surveyScores = [...latestBySurvey.values()].map(scoreSurveyResult).filter(Number.isFinite);
    const lifestyleScore = surveyScores.length ? clampScore(surveyScores.reduce((sum, value) => sum + value, 0) / surveyScores.length) : null;
    const financialScore = calculateFinancialProfileScore();
    const currentExpenses = financeData.expenses.filter(item => getExpenseMonth(item) === selectedExpenseMonth);
    const surveyCoverage = Math.min(latestBySurvey.size / Math.max(ACTIVE_SURVEY_IDS.length, 1), 1);
    const loggingCoverage = Math.min(currentExpenses.length / 7, 1);
    const habitScore = clampScore((surveyCoverage * .6 + loggingCoverage * .4) * 100);
    const weighted = [];
    if (financialScore !== null) weighted.push([financialScore, 45]);
    if (lifestyleScore !== null) weighted.push([lifestyleScore, 45]);
    if (financialScore !== null || lifestyleScore !== null) weighted.push([habitScore, 10]);
    const weightTotal = weighted.reduce((sum, item) => sum + item[1], 0);
    const totalScore = weightTotal ? clampScore(weighted.reduce((sum, item) => sum + item[0] * item[1], 0) / weightTotal) : null;
    const completeness = Math.round(((financialScore !== null ? 1 : 0) + surveyCoverage) / 2 * 100);
    const totalLabel = totalScore === null ? "Chưa chấm điểm" : totalScore >= 85 ? "Rất tốt" : totalScore >= 70 ? "Khá cân bằng" : totalScore >= 50 ? "Cần chú ý" : "Cần điều chỉnh";
    return { totalScore, totalLabel, completeness, financialScore, lifestyleScore, habitScore, surveyCoverage, loggingCoverage, history, currentExpenses };
}

function scoreLabel(score, missingText) {
    if (score === null) return missingText;
    return score >= 85 ? "Rất tốt" : score >= 70 ? "Khá tốt" : score >= 50 ? "Cần chú ý" : "Cần điều chỉnh";
}

function renderAuditItems(targetId, items, emptyText) {
    const target = document.getElementById(targetId);
    if (!target) return;
    const rows = items.length ? items : [{ icon: "fa-circle-info", text: emptyText }];
    target.innerHTML = rows.map(item => `<article><span><i class="fas ${item.icon}"></i></span><p>${escapeHtml(item.text)}</p></article>`).join("");
}

function renderEcoProfile(profile = calculateEcoProfile()) {
    const total = document.getElementById("ecoTotalScore");
    if (!total) return;
    total.textContent = profile.totalScore ?? "--";
    document.getElementById("ecoTotalLabel").textContent = profile.totalLabel;
    document.getElementById("ecoScoreRing").style.setProperty("--eco-score", `${(profile.totalScore || 0) * 3.6}deg`);
    document.getElementById("ecoScoreConfidence").innerHTML = `<i class="fas fa-circle-info"></i> Dữ liệu hoàn thiện ${profile.completeness}%`;
    document.getElementById("ecoProfileSummary").textContent = profile.totalScore === null ? "Hoàn thành ít nhất một khảo sát hoặc thiết lập ngân sách để bắt đầu Hồ sơ Tiêu dùng Xanh." : profile.totalScore >= 70 ? "Bạn đang tạo được sự cân bằng tích cực. Hãy duy trì điểm mạnh và tập trung vào một ưu tiên nhỏ trong tháng này." : "Hồ sơ đã nhận diện một số điểm cần điều chỉnh. Bắt đầu từ hành động ưu tiên bên dưới để cải thiện bền vững.";
    [["ecoFinancial", profile.financialScore, "Cần nhập thu nhập và mục tiêu"], ["ecoLifestyle", profile.lifestyleScore, "Cần hoàn thành một khảo sát"], ["ecoHabit", profile.habitScore, "Bắt đầu ghi chép và khảo sát"]].forEach(([prefix, score, missing]) => {
        document.getElementById(`${prefix}Score`).textContent = score ?? "--";
        document.getElementById(`${prefix}Label`).textContent = scoreLabel(score, missing);
        document.getElementById(`${prefix}Progress`).style.width = `${score || 0}%`;
    });
    const strengths = [];
    const priorities = [];
    if (profile.financialScore !== null && profile.financialScore >= 70) strengths.push({ icon: "fa-piggy-bank", text: "Ngân sách và mục tiêu tiết kiệm đang được kiểm soát tương đối tốt." });
    if (profile.lifestyleScore !== null && profile.lifestyleScore >= 70) strengths.push({ icon: "fa-leaf", text: "Kết quả TMR gần đây cho thấy thói quen tiêu dùng xanh đang ở vùng tích cực." });
    if (profile.habitScore >= 60) strengths.push({ icon: "fa-calendar-check", text: "Bạn đang duy trì việc ghi nhận dữ liệu đủ đều để theo dõi tiến bộ." });
    if (profile.financialScore === null) priorities.push({ icon: "fa-wallet", text: "Nhập thu nhập và mục tiêu tiết kiệm để hoàn thiện phần sức khỏe tài chính." });
    else if (profile.financialScore < 70) priorities.push({ icon: "fa-arrow-trend-down", text: "Rà soát nhóm chi lớn nhất và giảm một khoản chưa thiết yếu trong tháng này." });
    if (profile.lifestyleScore === null) priorities.push({ icon: "fa-clipboard-check", text: "Hoàn thành một khảo sát để hệ thống đánh giá lối sống xanh bằng TMR." });
    else if (profile.lifestyleScore < 70) priorities.push({ icon: "fa-recycle", text: "Mở kết quả khảo sát gần nhất và thực hiện ưu tiên giảm tác động được đề xuất." });
    if (profile.surveyCoverage < 1) priorities.push({ icon: "fa-chart-pie", text: `Hoàn thành thêm ${Math.max(ACTIVE_SURVEY_IDS.length - Math.round(profile.surveyCoverage * ACTIVE_SURVEY_IDS.length), 0)} khảo sát để tăng độ chính xác hồ sơ.` });
    renderAuditItems("ecoStrengths", strengths, "Chưa đủ dữ liệu để xác định điểm mạnh. Hồ sơ sẽ cập nhật sau khi bạn bắt đầu sử dụng app.");
    renderAuditItems("ecoPriorities", priorities.slice(0, 3), "Tiếp tục duy trì thói quen hiện tại và kiểm tra lại hồ sơ vào tháng sau.");
}

const biomeLevels = [
    { min: 0, name: "Hạt mầm", short: "Cấp 1", className: "stage-seed" },
    { min: 90, name: "Mầm xanh", short: "Cấp 2", className: "stage-sprout" },
    { min: 220, name: "Vườn nhỏ", short: "Cấp 3", className: "stage-garden" },
    { min: 420, name: "Khu rừng xanh", short: "Cấp 4", className: "stage-forest" }
];

function calculateBiomeProgress() {
    const history = typeof getStoredHistory === "function" ? getStoredHistory() : [];
    const completedChallenges = Object.keys(challengeData.completed || {}).length;
    const expenseDays = new Set(financeData.expenses.map(item => String(item.createdAt || "").slice(0, 10)).filter(Boolean)).size;
    const surveyLeaves = history.length * 30;
    const challengeLeaves = completedChallenges * 80;
    const loggingLeaves = Math.min(expenseDays, 30) * 5;
    const leaves = surveyLeaves + challengeLeaves + loggingLeaves;
    let levelIndex = biomeLevels.findLastIndex(level => leaves >= level.min);
    if (levelIndex < 0) levelIndex = 0;
    const level = biomeLevels[levelIndex];
    const next = biomeLevels[levelIndex + 1] || null;
    const progress = next ? Math.round((leaves - level.min) / (next.min - level.min) * 100) : 100;
    const ecoProfile = calculateEcoProfile();
    const distinctSurveys = new Set(history.map(item => item.surveyId)).size;
    const badges = [
        { id: "first-survey", icon: "fa-clipboard-check", title: "Bước chân đầu tiên", detail: "Hoàn thành khảo sát đầu tiên", unlocked: history.length >= 1 },
        { id: "full-audit", icon: "fa-earth-asia", title: "Nhà khám phá xanh", detail: "Hoàn thành đủ 3 loại khảo sát", unlocked: distinctSurveys >= ACTIVE_SURVEY_IDS.length },
        { id: "expense-week", icon: "fa-calendar-check", title: "Người ghi chép", detail: "Ghi chi tiêu trong 7 ngày", unlocked: expenseDays >= 7 },
        { id: "first-challenge", icon: "fa-flag-checkered", title: "Vượt qua chính mình", detail: "Hoàn thành một thử thách", unlocked: completedChallenges >= 1 },
        { id: "balanced", icon: "fa-scale-balanced", title: "Sống cân bằng", detail: "Eco-Score đạt từ 70", unlocked: (ecoProfile.totalScore || 0) >= 70 },
        { id: "finance", icon: "fa-piggy-bank", title: "Tài chính vững vàng", detail: "Điểm tài chính đạt từ 80", unlocked: (ecoProfile.financialScore || 0) >= 80 }
    ];
    return { leaves, level, levelIndex, next, progress: clampScore(progress), surveyLeaves, challengeLeaves, loggingLeaves, history, completedChallenges, expenseDays, badges };
}

function renderBiome() {
    const scene = document.getElementById("biomeScene");
    if (!scene) return;
    const biome = calculateBiomeProgress();
    scene.classList.remove(...biomeLevels.map(level => level.className));
    scene.classList.add(biome.level.className);
    document.getElementById("biomeLeafCount").textContent = biome.leaves.toLocaleString("vi-VN");
    document.getElementById("biomeLevelName").textContent = biome.level.name;
    document.getElementById("biomeCurrentLevel").textContent = biome.level.short;
    document.getElementById("biomeLevelProgress").style.width = `${biome.progress}%`;
    document.getElementById("biomeNextText").textContent = biome.next ? `Còn ${Math.max(biome.next.min - biome.leaves, 0)} Lá để mở khóa ${biome.next.name}` : "Bạn đã mở khóa cấp độ cao nhất hiện tại";
    document.getElementById("biomeProgressNote").textContent = biome.next ? `${biome.leaves}/${biome.next.min} Lá xanh • ${biome.progress}% chặng hiện tại` : "Tiếp tục duy trì thói quen để khu rừng luôn xanh.";
    const unlockedCount = biome.badges.filter(item => item.unlocked).length;
    document.getElementById("badgeUnlockedCount").textContent = `${unlockedCount}/${biome.badges.length}`;
    document.getElementById("biomeBadgeGrid").innerHTML = biome.badges.map(badge => `<article class="biome-badge ${badge.unlocked ? "unlocked" : "locked"}"><span><i class="fas ${badge.icon}"></i></span><div><h3>${escapeHtml(badge.title)}</h3><p>${escapeHtml(badge.detail)}</p></div><i class="fas ${badge.unlocked ? "fa-circle-check" : "fa-lock"}"></i></article>`).join("");
    const sources = [
        { icon: "fa-clipboard-check", label: "Khảo sát hoàn thành", value: biome.surveyLeaves, detail: `${biome.history.length} lần × 30 Lá` },
        { icon: "fa-flag-checkered", label: "Thử thách hoàn thành", value: biome.challengeLeaves, detail: `${biome.completedChallenges} thử thách × 80 Lá` },
        { icon: "fa-receipt", label: "Ngày có ghi chép", value: biome.loggingLeaves, detail: `${Math.min(biome.expenseDays, 30)} ngày × 5 Lá` }
    ];
    document.getElementById("biomeSourceList").innerHTML = sources.map(source => `<article><span><i class="fas ${source.icon}"></i></span><div><h3>${escapeHtml(source.label)}</h3><p>${escapeHtml(source.detail)}</p></div><strong>+${source.value}</strong></article>`).join("");
}

function showImpactToast(message) {
    const toast = document.getElementById("impactToast");
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add("show");
    clearTimeout(showImpactToast.timer);
    showImpactToast.timer = setTimeout(() => toast.classList.remove("show"), 2200);
}

function renderCommunityImpact() {
    const grid = document.getElementById("impactProjectGrid");
    if (!grid) return;
    document.getElementById("impactInterestCount").textContent = `${impactInterests.length} dự án quan tâm`;
    grid.innerHTML = impactProjectCatalog.map(project => {
        const interested = impactInterests.includes(project.id);
        return `<article class="impact-project-card ${project.theme}"><div class="impact-project-visual"><span><i class="fas ${project.icon}"></i></span><small>Chưa có đối tác xác minh</small></div><div class="impact-project-body"><p>${escapeHtml(project.location)}</p><h3>${escapeHtml(project.title)}</h3><p>${escapeHtml(project.description)}</p><div class="impact-project-proof"><span><i class="fas fa-building-shield"></i> NGO: Chưa xác định</span><span><i class="fas fa-file-circle-check"></i> Chứng từ: Chưa có</span></div><button type="button" data-impact-interest="${project.id}" class="${interested ? "interested" : ""}"><i class="${interested ? "fas fa-heart" : "far fa-heart"}"></i> ${interested ? "Đã quan tâm" : "Tôi quan tâm"}</button></div></article>`;
    }).join("");
}

function toggleImpactInterest(id) {
    if (!impactProjectCatalog.some(project => project.id === id)) return;
    impactInterests = impactInterests.includes(id) ? impactInterests.filter(item => item !== id) : [...impactInterests, id];
    localStorage.setItem(IMPACT_INTEREST_STORAGE_KEY, JSON.stringify(impactInterests));
    renderCommunityImpact();
    showImpactToast(impactInterests.includes(id) ? "Đã lưu mối quan tâm trên thiết bị." : "Đã bỏ đánh dấu quan tâm.");
}

function renderFinance() {
    const monthExpenses = financeData.expenses.filter(item => getExpenseMonth(item) === selectedExpenseMonth);
    const spent = monthExpenses.reduce((sum, item) => sum + Number(item.amount), 0);
    const available = Math.max(financeData.income - financeData.target, 0);
    const remaining = available - spent;
    const ratio = available ? spent / available : 0;
    document.getElementById("monthlyIncome").value = financeData.income ? financeData.income.toLocaleString("vi-VN") : "";
    document.getElementById("savingTarget").value = financeData.target ? financeData.target.toLocaleString("vi-VN") : "";
    document.getElementById("availableBudget").textContent = money(available);
    document.getElementById("spentTotal").textContent = money(spent);
    document.getElementById("remainingBudget").textContent = money(remaining);
    document.getElementById("remainingBudget").classList.toggle("negative", remaining < 0);
    document.getElementById("budgetProgress").style.width = `${Math.min(ratio * 100, 100)}%`;
    const advice = !available ? "Nhập thu nhập và mục tiêu để nhận khuyến nghị."
        : remaining < 0 ? `Bạn đã vượt ngân sách ${money(Math.abs(remaining))}. Hãy tạm dừng các khoản mua sắm chưa thiết yếu.`
        : ratio >= .8 ? `Bạn đã dùng ${Math.round(ratio * 100)}% ngân sách. Nên ưu tiên nhu cầu thiết yếu trong phần còn lại của tháng.`
        : ratio >= .5 ? `Bạn còn ${money(remaining)}. Tiến độ đang ổn, hãy duy trì hạn mức theo ngày.`
        : `Bạn đang kiểm soát tốt và còn ${money(remaining)} trong ngân sách tháng.`;
    document.getElementById("budgetAdvice").textContent = advice;
    if (typeof updateAssistantInsight === "function") updateAssistantInsight();
    document.getElementById("overviewSpent").textContent = money(spent);
    document.getElementById("overviewTransactionCount").textContent = `${monthExpenses.length} giao dịch trong tháng`;
    const now = new Date();
    const currentMonth = now.toISOString().slice(0, 7);
    const [selectedYear, selectedMonth] = selectedExpenseMonth.split("-").map(Number);
    const trackedDays = selectedExpenseMonth === currentMonth ? now.getDate() : new Date(selectedYear, selectedMonth, 0).getDate();
    document.getElementById("dailyAverage").textContent = money(spent / Math.max(trackedDays, 1));
    const categoryTotals = monthExpenses.reduce((totals, item) => { totals[item.category] = (totals[item.category] || 0) + Number(item.amount); return totals; }, {});
    const categories = Object.entries(categoryTotals).sort((a, b) => b[1] - a[1]);
    document.getElementById("topCategory").textContent = categories[0]?.[0] || "Chưa có";
    document.getElementById("categoryCount").textContent = `${categories.length} danh mục`;
    document.getElementById("donutPercent").textContent = available ? `${Math.round(Math.min(spent / available, 1) * 100)}%` : "0%";
    let donutCursor = 0;
    const donutStops = categories.map(([category, amount]) => { const start = donutCursor; donutCursor += spent ? amount / spent * 100 : 0; return `${expenseCategoryMeta[category]?.color || "#64748b"} ${start}% ${donutCursor}%`; });
    document.getElementById("categoryDonut").style.background = categories.length ? `conic-gradient(${donutStops.join(",")})` : "#e5eee8";
    document.getElementById("categoryBreakdown").innerHTML = categories.length ? categories.slice(0, 5).map(([category, amount]) => { const meta = expenseCategoryMeta[category] || expenseCategoryMeta.Khác; const percent = spent ? Math.round(amount / spent * 100) : 0; return `<div class="category-line"><span style="--category-color:${meta.color}"><i class="fas ${meta.icon}"></i></span><div><p><b>${escapeHtml(category)}</b><small>${percent}%</small></p><div><i style="width:${percent}%;background:${meta.color}"></i></div></div><strong>${money(amount)}</strong></div>`; }).join("") : `<p class="category-empty">Thêm giao dịch để xem phân bổ theo danh mục.</p>`;
    document.getElementById("expenseList").innerHTML = monthExpenses.length ? monthExpenses.map(item => { const meta = expenseCategoryMeta[item.category] || expenseCategoryMeta.Khác; return `<article class="expense-row"><span class="expense-category" style="--category-color:${meta.color}"><i class="fas ${meta.icon}"></i></span><div><strong>${escapeHtml(item.name)}</strong><small>${escapeHtml(item.category)} • ${escapeHtml(item.date)}</small></div><b>-${money(item.amount)}</b><button type="button" data-delete-expense="${item.id}" aria-label="Xóa khoản chi"><i class="fas fa-xmark"></i></button></article>`; }).join("") : `<div class="expense-empty"><i class="fas fa-wallet"></i><p>Chưa có khoản chi nào trong tháng này.</p></div>`;
}

document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll("[data-module]").forEach(item => item.addEventListener("click", () => openModule(item.dataset.module)));
    document.querySelectorAll("[data-open-module]").forEach(item => item.addEventListener("click", () => openModule(item.dataset.openModule)));
    document.getElementById("budgetForm").addEventListener("submit", event => {
        event.preventDefault(); financeData.income = parseCurrency(document.getElementById("monthlyIncome").value); financeData.target = parseCurrency(document.getElementById("savingTarget").value); saveFinanceData(); renderFinance();
    });
    document.getElementById("expenseForm").addEventListener("submit", event => {
        event.preventDefault(); const amount = parseCurrency(document.getElementById("expenseAmount").value); if (!amount) return; const now = new Date(); financeData.expenses.unshift({ id: Date.now(), name: document.getElementById("expenseName").value.trim(), category: document.getElementById("expenseCategory").value, amount, date: now.toLocaleDateString("vi-VN"), createdAt: now.toISOString(), month: selectedExpenseMonth }); saveFinanceData(); event.target.reset(); renderFinance();
    });
    document.getElementById("expenseList").addEventListener("click", event => { const button = event.target.closest("[data-delete-expense]"); if (!button) return; financeData.expenses = financeData.expenses.filter(item => String(item.id) !== button.dataset.deleteExpense); saveFinanceData(); renderFinance(); });
    document.getElementById("clearExpenses").addEventListener("click", () => { financeData.expenses = financeData.expenses.filter(item => getExpenseMonth(item) !== selectedExpenseMonth); saveFinanceData(); renderFinance(); });
    const expenseMonth = document.getElementById("expenseMonth"); expenseMonth.value = selectedExpenseMonth; expenseMonth.addEventListener("change", () => { selectedExpenseMonth = expenseMonth.value || new Date().toISOString().slice(0, 7); renderFinance(); });
    bindCurrencyInputs(); renderFinance(); updateDashboard(); openModule("home");
    window.addEventListener("ecoimpact:data-updated", updateDashboard);
    document.getElementById("challengeGrid")?.addEventListener("click", event => { const button = event.target.closest("[data-challenge-join]"); if (button) joinChallenge(button.dataset.challengeJoin); });
    document.getElementById("activeChallengeList")?.addEventListener("click", event => { const checkin = event.target.closest("[data-challenge-checkin]"); if (checkin) checkInChallenge(checkin.dataset.challengeCheckin); const stop = event.target.closest("[data-challenge-stop]"); if (stop && challengeData.active[stop.dataset.challengeStop]) { delete challengeData.active[stop.dataset.challengeStop]; saveChallengeData(); showChallengeToast("Đã dừng thử thách."); } });
    document.querySelectorAll("[data-challenge-filter]").forEach(button => button.addEventListener("click", () => { selectedChallengeFilter = button.dataset.challengeFilter; document.querySelectorAll("[data-challenge-filter]").forEach(item => item.classList.toggle("active", item === button)); renderChallenges(); }));
    window.addEventListener("ecoimpact:data-updated", renderChallenges);
    document.getElementById("impactProjectGrid")?.addEventListener("click", event => { const button = event.target.closest("[data-impact-interest]"); if (button) toggleImpactInterest(button.dataset.impactInterest); });
});
