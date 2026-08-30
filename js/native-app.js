const isNative = Boolean(window.Capacitor?.isNativePlatform?.());

async function setupNativeApp() {
    if (!isNative) return;
    document.body.classList.add("native-app");
}

function updateConnectionState() {
    let banner = document.getElementById("offlineBanner");
    if (!banner) {
        banner = document.createElement("div");
        banner.id = "offlineBanner";
        banner.className = "offline-banner";
        banner.innerHTML = '<i class="fas fa-cloud-arrow-down"></i> Bạn đang ngoại tuyến. Dữ liệu sẽ được giữ trên thiết bị.';
        document.body.appendChild(banner);
    }
    banner.classList.toggle("show", !navigator.onLine);
}

window.addEventListener("online", updateConnectionState);
window.addEventListener("offline", updateConnectionState);
document.addEventListener("DOMContentLoaded", () => {
    setupNativeApp();
    updateConnectionState();
});
