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

const respondentId = getOrCreateRespondentId();

const PROFILE_STORAGE_PREFIX = "ecoimpact-profile-v1";

function getProfileStorageKey() {
    try {
        const session = JSON.parse(localStorage.getItem("ecoimpact-session-v1"));
        return `${PROFILE_STORAGE_PREFIX}:${session?.email || "guest"}`;
    } catch (_) {
        return `${PROFILE_STORAGE_PREFIX}:guest`;
    }
}

function getStoredProfile() {
    try {
        const profile = JSON.parse(localStorage.getItem(getProfileStorageKey()));
        return profile?.soThanhVienHoGiaDinh ? profile : null;
    } catch (_) {
        return null;
    }
}

function persistProfile(profile) {
    localStorage.setItem(getProfileStorageKey(), JSON.stringify(profile));
}

function getAccountName() {
    try { return JSON.parse(localStorage.getItem("ecoimpact-session-v1"))?.name || ""; } catch (_) { return ""; }
}

function fillProfileForm(profile = {}) {
    const values = {
        household: profile.soThanhVienHoGiaDinh || ""
    };
    Object.entries(values).forEach(([id, value]) => {
        const input = document.getElementById(id);
        if (input) input.value = value;
    });
}

function getStoredHistory() {
    try {
        const scopedKey = `${HISTORY_STORAGE_KEY}:${getProfileStorageKey()}`;
        const raw = localStorage.getItem(scopedKey) || sessionStorage.getItem(HISTORY_STORAGE_KEY);
        const parsed = raw ? JSON.parse(raw) : [];
        return Array.isArray(parsed) ? parsed : [];
    } catch (error) {
        return [];
    }
}

function persistHistory() {
    const scopedKey = `${HISTORY_STORAGE_KEY}:${getProfileStorageKey()}`;
    localStorage.setItem(scopedKey, JSON.stringify(state.history));
    sessionStorage.removeItem(HISTORY_STORAGE_KEY);
    window.dispatchEvent(new CustomEvent("ecoimpact:data-updated"));
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
                    <p>${escapeHtml(entry.fullname)}${entry.location ? ` • ${escapeHtml(entry.location)}` : ""}</p>
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
