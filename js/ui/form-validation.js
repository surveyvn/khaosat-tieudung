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
