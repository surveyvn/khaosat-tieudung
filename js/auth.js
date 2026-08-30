const AUTH_USERS_KEY = "ecoimpact-users-v1";
const AUTH_SESSION_KEY = "ecoimpact-session-v1";

function authUsers() {
    try { return JSON.parse(localStorage.getItem(AUTH_USERS_KEY)) || []; } catch (_) { return []; }
}

function authSession() {
    try { return JSON.parse(localStorage.getItem(AUTH_SESSION_KEY)); } catch (_) { return null; }
}

async function hashDemoPassword(value) {
    const bytes = new TextEncoder().encode(value);
    const digest = await crypto.subtle.digest("SHA-256", bytes);
    return Array.from(new Uint8Array(digest), byte => byte.toString(16).padStart(2, "0")).join("");
}

function setAuthMessage(message, type = "info") {
    const target = document.getElementById("authMessage");
    target.textContent = message;
    target.className = `auth-message ${message ? "show" : ""} ${type}`;
}

function switchAuthTab(tab) {
    document.querySelectorAll("[data-auth-tab]").forEach(button => button.classList.toggle("active", button.dataset.authTab === tab));
    document.querySelectorAll("[data-auth-panel]").forEach(panel => panel.classList.toggle("active", panel.dataset.authPanel === tab));
    setAuthMessage("");
}

function updateAuthUI() {
    const user = authSession();
    document.getElementById("authGuestView").hidden = Boolean(user);
    document.getElementById("authUserView").classList.toggle("active", Boolean(user));
    document.getElementById("accountLabel").textContent = user ? user.name.split(" ").slice(-1)[0] : "Đăng nhập";
    const planBadge = document.getElementById("accountPlanBadge");
    planBadge.hidden = !user;
    planBadge.textContent = user?.plan === "plus" ? "Plus" : "Free";
    planBadge.classList.toggle("plus", user?.plan === "plus");
    if (user) {
        document.getElementById("profileName").textContent = user.name;
        document.getElementById("profileEmail").textContent = user.email;
        document.getElementById("profileAvatar").textContent = user.name.trim().charAt(0).toUpperCase();
    }
}

function showAuth(open) {
    const modal = document.getElementById("authModal");
    modal.classList.toggle("open", open);
    modal.setAttribute("aria-hidden", String(!open));
    document.body.classList.toggle("modal-open", open);
    if (open) updateAuthUI();
}

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("accountTrigger").addEventListener("click", () => showAuth(true));
    document.querySelectorAll("[data-close-auth]").forEach(button => button.addEventListener("click", () => showAuth(false)));
    document.querySelectorAll("[data-auth-tab]").forEach(button => button.addEventListener("click", () => switchAuthTab(button.dataset.authTab)));
    document.querySelectorAll("[data-toggle-password]").forEach(button => button.addEventListener("click", () => { const input = document.getElementById(button.dataset.togglePassword); input.type = input.type === "password" ? "text" : "password"; button.querySelector("i").classList.toggle("fa-eye-slash", input.type === "text"); }));
    document.getElementById("registerForm").addEventListener("submit", async event => {
        event.preventDefault();
        const name = document.getElementById("registerName").value.trim();
        const email = document.getElementById("registerEmail").value.trim().toLowerCase();
        const age = document.getElementById("registerAge").value;
        const gender = document.getElementById("registerGender").value;
        const password = document.getElementById("registerPassword").value;
        const users = authUsers();
        if (users.some(user => user.email === email)) { setAuthMessage("Email này đã được đăng ký.", "error"); return; }
        users.push({ id: `user-${Date.now()}`, name, email, age, gender, passwordHash: await hashDemoPassword(password), provider: "email", plan: "free" });
        localStorage.setItem(AUTH_USERS_KEY, JSON.stringify(users));
        localStorage.setItem(AUTH_SESSION_KEY, JSON.stringify({ name, email, age, gender, provider: "email", plan: "free" }));
        fillProfileForm({});
        updateAuthUI();
        showAuth(false);
    });
    document.getElementById("loginForm").addEventListener("submit", async event => {
        event.preventDefault();
        const email = document.getElementById("loginEmail").value.trim().toLowerCase();
        const password = document.getElementById("loginPassword").value;
        const passwordHash = await hashDemoPassword(password);
        const user = authUsers().find(item => item.email === email && item.passwordHash === passwordHash);
        if (!user) { setAuthMessage("Email hoặc mật khẩu chưa đúng.", "error"); return; }
        localStorage.setItem(AUTH_SESSION_KEY, JSON.stringify({ name: user.name, email: user.email, age: user.age || "", gender: user.gender || "", provider: user.provider, plan: user.plan })); state.profile = getStoredProfile(); fillProfileForm(state.profile || {}); updateAuthUI(); showAuth(false);
    });
    document.getElementById("forgotPassword").addEventListener("click", () => setAuthMessage("Bản demo chưa gửi email. Khi có backend, đây sẽ là luồng đặt lại mật khẩu.", "info"));
    document.querySelectorAll("[data-provider]").forEach(button => button.addEventListener("click", () => setAuthMessage(`Đăng nhập ${button.dataset.provider} cần cấu hình OAuth Client ID và backend.`, "info")));
    document.getElementById("planUpgradeButton").addEventListener("click", () => {
        const panel = document.getElementById("planUpgradePanel");
        panel.hidden = !panel.hidden;
    });
    document.getElementById("logoutButton").addEventListener("click", () => { localStorage.removeItem(AUTH_SESSION_KEY); state.profile = getStoredProfile(); fillProfileForm(state.profile || {}); updateAuthUI(); switchAuthTab("login"); });
    document.addEventListener("keydown", event => { if (event.key === "Escape") showAuth(false); });
    updateAuthUI();
});
