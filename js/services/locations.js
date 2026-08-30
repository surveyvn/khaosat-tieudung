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
