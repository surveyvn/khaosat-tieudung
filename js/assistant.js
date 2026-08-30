function getAssistantSummary() {
    const expenses = financeData.expenses.filter(item => getExpenseMonth(item) === selectedExpenseMonth);
    const spent = expenses.reduce((sum, item) => sum + Number(item.amount), 0);
    const available = Math.max(financeData.income - financeData.target, 0);
    const remaining = available - spent;
    const categories = expenses.reduce((totals, item) => { totals[item.category] = (totals[item.category] || 0) + Number(item.amount); return totals; }, {});
    const topCategory = Object.entries(categories).sort((a, b) => b[1] - a[1])[0];
    const ecoProfile = typeof calculateEcoProfile === "function" ? calculateEcoProfile() : null;
    const activeChallenges = typeof challengeCatalog !== "undefined" && typeof challengeData !== "undefined"
        ? challengeCatalog.filter(item => challengeData.active[item.id]).map(item => ({ ...item, progress: getChallengeProgress(item) }))
        : [];
    const surveyHistory = typeof getStoredHistory === "function" ? getStoredHistory() : [];
    return { expenses, spent, available, remaining, topCategory, ecoProfile, activeChallenges, surveyHistory };
}

let lastAssistantIntent = "";

function normalizeVietnamese(value) {
    return String(value || "").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/đ/g, "d").replace(/[^a-z0-9\s]/g, " ").replace(/\s+/g, " ").trim();
}

function findRequestedCategory(text) {
    const aliases = {
        "Ăn uống": ["an uong", "do an", "com", "ca phe", "cafe"],
        "Đi lại": ["di lai", "xang", "xe", "grab", "taxi"],
        "Nhà ở": ["nha o", "tien nha", "thue nha", "dien nuoc"],
        "Mua sắm": ["mua sam", "shopping", "quan ao"],
        "Giải trí": ["giai tri", "xem phim", "game"],
        "Khác": ["khac"]
    };
    const paddedText = ` ${text} `;
    return Object.entries(aliases).find(([, words]) => words.some(word => paddedText.includes(` ${word} `)))?.[0] || "";
}

function detectAssistantIntent(text) {
    if (/eco score|ecoscore|diem xanh|ho so xanh|loi song xanh/.test(text)) return "eco_score";
    if (/thu thach|check in|checkin|tien do/.test(text)) return "challenges";
    if (/khao sat|tmr|dau chan vat chat|moi truong/.test(text)) return "survey_result";
    if (/co nen mua|dinh mua|muon mua|mua mon|mua cai|hop ly khong/.test(text)) return "purchase_advice";
    if (/suc khoe tong the|tong the|eco financial|can bang/.test(text)) return "life_overview";
    if (/cai thien dieu gi|uu tien|bat dau tu dau|nen thay doi/.test(text)) return "improvement_priority";
    if (/thu nhap|luong/.test(text)) return "income";
    if (/muc tieu|de danh bao nhieu|tiet kiem duoc/.test(text)) return "saving_target";
    if (/lap lai|thuong xuyen|hay mua/.test(text)) return "recurring";
    if (/bao nhieu lan|may giao dich|so giao dich/.test(text)) return "transaction_count";
    if (/trung binh|moi ngay/.test(text)) return "daily_average";
    if (/nhieu nhat|lon nhat|ton nhat|danh muc nao/.test(text)) return "top_category";
    if (/con bao nhieu|con lai|duoc chi|co the chi|han muc/.test(text)) return "remaining";
    if (/tiet kiem|giam chi|de danh|loi khuyen|nen lam gi|tu van/.test(text)) return "saving_advice";
    if (/tong chi|da chi|tieu bao nhieu|het bao nhieu/.test(text)) return "spent";
    if (/tinh hinh|tong quan|tai chinh the nao|on khong/.test(text)) return "overview";
    return "";
}

function extractPromptAmount(text) {
    const compactMatch = text.match(/(\d+(?:[.,]\d+)?)\s*(trieu|tr|k|nghin|ngan)\b/);
    if (compactMatch) {
        const value = Number(compactMatch[1].replace(",", "."));
        return Math.round(value * (/trieu|tr/.test(compactMatch[2]) ? 1000000 : 1000));
    }
    const candidates = [...text.matchAll(/\b\d[\d.,]{3,}\b/g)].map(match => Number(match[0].replace(/\D/g, ""))).filter(Number.isFinite);
    return candidates[0] || 0;
}

function getLatestSurveyInsight(summary) {
    const entry = summary.surveyHistory[0];
    if (!entry) return null;
    const survey = typeof getSurveyById === "function" ? getSurveyById(entry.surveyId) : null;
    const code = survey && typeof getSurveyCodeForSurvey === "function" ? getSurveyCodeForSurvey(survey) : "";
    const improvement = code && typeof getImprovementSuggestions === "function" ? getImprovementSuggestions(code, entry.result || entry) : null;
    return improvement ? { entry, improvement } : null;
}

function replyEcoScore(summary) {
    const profile = summary.ecoProfile;
    if (!profile || profile.totalScore === null) return "Bạn chưa đủ dữ liệu để có Eco-Score. Hãy nhập ngân sách hoặc hoàn thành ít nhất một khảo sát.";
    const finance = profile.financialScore === null ? "chưa có" : `${profile.financialScore}/100`;
    const lifestyle = profile.lifestyleScore === null ? "chưa có" : `${profile.lifestyleScore}/100`;
    return `Eco-Score của bạn là ${profile.totalScore}/100 – ${profile.totalLabel}. Tài chính: ${finance}; lối sống xanh: ${lifestyle}; độ đầy đủ dữ liệu: ${profile.completeness}%.`;
}

function replyChallenges(summary) {
    if (!summary.activeChallenges.length) return "Bạn chưa tham gia thử thách nào. Hãy mở mục Thử thách và chọn một mục tiêu nhỏ phù hợp.";
    const challenge = [...summary.activeChallenges].sort((a, b) => b.progress / b.goal - a.progress / a.goal)[0];
    return `Bạn đang thực hiện ${summary.activeChallenges.length} thử thách. Gần hoàn thành nhất là “${challenge.title}”: ${challenge.progress}/${challenge.goal} ${challenge.unit}.`;
}

function replyPurchaseAdvice(prompt, summary) {
    const amount = extractPromptAmount(normalizeVietnamese(prompt));
    if (!amount) return "Bạn cho mình biết giá món đồ và dự kiến dùng bao nhiêu lần nhé. Mình sẽ so với ngân sách, mức độ cần thiết và độ bền.";
    if (!financeData.income) return `Món đồ có giá ${money(amount)}. Bạn cần nhập thu nhập và mục tiêu tiết kiệm trước để mình đánh giá khả năng chi trả; đồng thời hãy cho biết chất liệu và số lần dự kiến sử dụng.`;
    const share = summary.remaining > 0 ? amount / summary.remaining : Infinity;
    const verdict = amount > summary.remaining ? "chưa phù hợp vì vượt số tiền còn lại" : share > .3 ? "cần cân nhắc vì chiếm hơn 30% ngân sách còn lại" : "có thể phù hợp về mặt ngân sách";
    return `Với giá ${money(amount)}, món đồ ${verdict}. Trước khi mua, hãy kiểm tra nhu cầu thực, số lần sử dụng, độ bền và khả năng mua cũ hoặc sửa chữa.`;
}

function replyImprovementPriority(summary) {
    const profile = summary.ecoProfile;
    if (!profile || profile.totalScore === null) return "Ưu tiên đầu tiên là bổ sung dữ liệu: nhập ngân sách và hoàn thành một khảo sát để mình xác định đúng vấn đề.";
    if (profile.financialScore !== null && profile.financialScore < 70) return summary.topCategory ? `Ưu tiên tài chính: rà soát nhóm ${summary.topCategory[0]} đang chi ${money(summary.topCategory[1])}, rồi giảm một khoản chưa thiết yếu.` : "Ưu tiên tài chính: ghi lại các giao dịch trong tháng để xác định nhóm chi lớn nhất.";
    if (profile.lifestyleScore !== null && profile.lifestyleScore < 70) {
        const latest = getLatestSurveyInsight(summary);
        return latest?.improvement?.suggestions?.[0] || "Ưu tiên mở kết quả khảo sát gần nhất và giảm nhóm có dấu chân vật chất lớn nhất.";
    }
    if (profile.surveyCoverage < 1) return "Bạn đang kiểm soát khá tốt. Ưu tiên hoàn thành các khảo sát còn thiếu để Eco-Score chính xác hơn.";
    return "Bạn đang ở trạng thái khá cân bằng. Hãy duy trì ngân sách và chọn một thử thách nhỏ thay vì thay đổi quá nhiều cùng lúc.";
}

function assistantReply(prompt) {
    const summary = getAssistantSummary();
    const text = normalizeVietnamese(prompt);
    const category = findRequestedCategory(text);
    let intent = detectAssistantIntent(text);
    const hasFinancialWords = /chi|tieu|ngan sach|tiet kiem|thu nhap|tien|giao dich|danh muc|khoan|tai chinh|luong|mua|thang|tuan|eco|xanh|tmr|khao sat|thu thach|loi song/.test(text);
    if (!intent && text.split(" ").length <= 4 && lastAssistantIntent) intent = lastAssistantIntent;
    if (!hasFinancialWords && !intent && !category) return AI_SYSTEM_RULES.fallback;
    if (category && !["purchase_advice", "eco_score", "life_overview", "improvement_priority", "survey_result", "challenges"].includes(intent)) {
        lastAssistantIntent = "category_total";
        const total = summary.expenses.filter(item => item.category === category).reduce((sum, item) => sum + Number(item.amount), 0);
        return total ? `Tháng này bạn đã chi ${money(total)} cho ${category}.` : `Tháng này chưa có khoản chi thuộc nhóm ${category}.`;
    }
    lastAssistantIntent = intent || lastAssistantIntent;
    if (intent === "eco_score") return replyEcoScore(summary);
    if (intent === "challenges") return replyChallenges(summary);
    if (intent === "purchase_advice") return replyPurchaseAdvice(prompt, summary);
    if (intent === "improvement_priority") return replyImprovementPriority(summary);
    if (intent === "survey_result") {
        const latest = getLatestSurveyInsight(summary);
        return latest ? `Khảo sát gần nhất là ${latest.entry.surveyName}: ${latest.improvement.label}. ${latest.improvement.suggestions[0] || latest.improvement.summary}` : "Bạn chưa hoàn thành khảo sát nào để mình phân tích.";
    }
    if (intent === "life_overview") {
        if (!summary.ecoProfile || summary.ecoProfile.totalScore === null) return "Chưa đủ dữ liệu để đánh giá tổng thể. Hãy nhập ngân sách hoặc hoàn thành một khảo sát trước.";
        return `${replyEcoScore(summary)} ${replyImprovementPriority(summary)}`;
    }
    if (intent === "income") return financeData.income ? `Thu nhập tháng đã đặt là ${money(financeData.income)}.` : "Bạn chưa nhập thu nhập tháng.";
    if (intent === "saving_target") return financeData.target ? `Mục tiêu tiết kiệm tháng là ${money(financeData.target)}.` : "Bạn chưa đặt mục tiêu tiết kiệm.";
    if (intent === "spent") return `Tháng này bạn đã chi ${money(summary.spent)}.`;
    if (intent === "transaction_count") return `Tháng này có ${summary.expenses.length} giao dịch.`;
    if (intent === "daily_average") return `Chi tiêu trung bình hiện tại là ${money(summary.spent / Math.max(new Date().getDate(), 1))} mỗi ngày.`;
    if (intent === "top_category") return summary.topCategory ? `Nhóm chi lớn nhất là ${summary.topCategory[0]}: ${money(summary.topCategory[1])}.` : "Tháng này chưa có giao dịch để phân tích.";
    if (intent === "recurring") {
        const counts = summary.expenses.reduce((items, item) => { const key = normalizeVietnamese(item.name); items[key] = (items[key] || { name: item.name, count: 0 }); items[key].count += 1; return items; }, {});
        const recurring = Object.values(counts).sort((a, b) => b.count - a.count)[0];
        return recurring?.count >= 2 ? `${recurring.name} xuất hiện ${recurring.count} lần trong tháng.` : "Chưa có khoản chi nào lặp lại đủ nhiều.";
    }
    if (intent === "remaining") return financeData.income ? `Bạn còn có thể chi ${money(Math.max(summary.remaining, 0))} trong tháng này.` : "Bạn cần nhập thu nhập trước để tính số tiền còn lại.";
    if (intent === "saving_advice") return !financeData.income ? "Bạn cần nhập thu nhập và mục tiêu tiết kiệm trước." : summary.remaining < 0 ? `Bạn đã vượt ngân sách ${money(Math.abs(summary.remaining))}. Nên tạm dừng các khoản chưa thiết yếu.` : `Bạn có thể dành thêm ${money(Math.max(summary.remaining * .1, 0))}, tương đương 10% số tiền còn lại.`;
    if (intent === "overview") return financeData.income ? `Bạn đã chi ${money(summary.spent)} và còn ${money(summary.remaining)} trong ngân sách tháng.` : `Bạn đã chi ${money(summary.spent)}; chưa thể tính ngân sách còn lại vì thiếu thu nhập.`;
    return "Bạn có thể hỏi mình về chi tiêu, Eco-Score, kết quả khảo sát, thử thách hoặc một món đồ đang cân nhắc mua.";
}

function appendAssistantMessage(text, role) {
    const list = document.getElementById("aiMessages");
    const article = document.createElement("article");
    article.className = `ai-message ${role}`;
    article.innerHTML = role === "assistant" ? `<span><i class="fas fa-leaf"></i></span><p>${escapeHtml(text)}</p>` : `<p>${escapeHtml(text)}</p>`;
    list.appendChild(article);
    list.scrollTop = list.scrollHeight;
}

function updateAssistantInsight() {
    const summary = getAssistantSummary();
    const title = document.getElementById("aiInsightTitle");
    const text = document.getElementById("aiInsightText");
    if (!title || !text) return;
    updateFinancialCoach(summary);
    if (!financeData.income) { title.textContent = "Thiết lập ngân sách"; text.textContent = "Nhập thu nhập và mục tiêu tiết kiệm để Eco AI đưa ra lời khuyên riêng cho bạn."; return; }
    title.textContent = summary.remaining < 0 ? "Cần điều chỉnh chi tiêu" : "Ngân sách đang được theo dõi";
    text.textContent = assistantReply("Tình hình chi tiêu tháng này thế nào?");
}

function updateFinancialCoach(summary) {
    const savingRate = financeData.income ? financeData.target / financeData.income : 0;
    const spendingRate = summary.available ? summary.spent / summary.available : 0;
    const score = financeData.income ? Math.max(0, Math.min(100, Math.round(55 + Math.min(savingRate, .3) * 100 - Math.max(spendingRate - .65, 0) * 90))) : 0;
    const scoreTarget = document.getElementById("financialScore");
    const scoreRing = document.getElementById("financialScoreRing");
    scoreTarget.textContent = financeData.income ? score : "--";
    scoreRing.style.setProperty("--score", `${score * 3.6}deg`);
    document.getElementById("financialScoreLabel").textContent = !financeData.income ? "Chưa đủ dữ liệu" : score >= 80 ? "Rất tốt" : score >= 60 ? "Khá ổn" : score >= 40 ? "Cần chú ý" : "Cần điều chỉnh";
    document.getElementById("financialScoreNote").textContent = !financeData.income ? "Thiết lập thu nhập và mục tiêu để bắt đầu đánh giá." : `Bạn đã dùng ${Math.round(spendingRate * 100)}% ngân sách có thể chi trong tháng.`;
    const daysLeft = Math.max(new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).getDate() - new Date().getDate() + 1, 1);
    const dailyLimit = Math.max(summary.remaining / daysLeft, 0);
    const plans = [
        `Giữ chi tiêu mỗi ngày dưới ${money(dailyLimit)}.`,
        summary.topCategory ? `Kiểm tra lại một khoản trong nhóm ${summary.topCategory[0]}.` : "Ghi lại ít nhất một giao dịch để bắt đầu phân tích.",
        financeData.target ? `Bảo vệ mục tiêu tiết kiệm ${money(financeData.target)}.` : "Đặt một mục tiêu tiết kiệm cụ thể cho tháng."
    ];
    document.getElementById("weeklyPlanList").innerHTML = plans.map((plan, index) => `<article><span>${index + 1}</span><p>${escapeHtml(plan)}</p></article>`).join("");
    const groups = summary.expenses.reduce((items, item) => { const key = item.name.trim().toLowerCase(); if (!items[key]) items[key] = { name: item.name, count: 0, total: 0 }; items[key].count += 1; items[key].total += Number(item.amount); return items; }, {});
    const recurring = Object.values(groups).sort((a, b) => b.count - a.count)[0];
    document.getElementById("recurringExpenseText").textContent = recurring?.count >= 2 ? `${recurring.name} xuất hiện ${recurring.count} lần, tổng cộng ${money(recurring.total)}.` : "Chưa có khoản chi nào xuất hiện đủ nhiều để nhận diện thói quen.";
}

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("aiChatForm");
    form.addEventListener("submit", event => { event.preventDefault(); const input = document.getElementById("aiChatInput"); const prompt = input.value.trim(); if (!prompt) return; appendAssistantMessage(prompt, "user"); input.value = ""; setTimeout(() => appendAssistantMessage(assistantReply(prompt), "assistant"), 250); });
    document.querySelectorAll("[data-ai-prompt]").forEach(button => button.addEventListener("click", () => { appendAssistantMessage(button.dataset.aiPrompt, "user"); setTimeout(() => appendAssistantMessage(assistantReply(button.dataset.aiPrompt), "assistant"), 250); }));
    updateAssistantInsight();
});
const AI_SYSTEM_RULES = {
    scope: ["chi tiêu", "ngân sách", "tiết kiệm", "thu nhập", "giao dịch", "tài chính cá nhân", "Eco-Score", "TMR", "khảo sát", "thử thách", "tiêu dùng xanh"],
    maxSentences: 3,
    fallback: "Mình chỉ hỗ trợ về chi tiêu, tài chính cá nhân, Eco-Score, khảo sát và thử thách trong ứng dụng."
};
