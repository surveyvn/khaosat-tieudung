function setActiveStep(stepId) {
    document.body.classList.toggle("profile-step", stepId === "step-profile");

    document.querySelectorAll(".wizard-step").forEach((step) => {
        step.classList.toggle("active", step.id === stepId);
    });

    const navItems = Array.from(document.querySelectorAll(".step-nav-item"));
    const currentIndex = navItems.findIndex((item) => item.dataset.stepTarget === stepId);
    navItems.forEach((item, index) => {
        item.classList.toggle("active", item.dataset.stepTarget === stepId);
        item.classList.toggle("completed", currentIndex > -1 && index < currentIndex);
    });

    const progressBar = document.getElementById("progress");
    if (progressBar) {
        progressBar.style.width = stepProgress[stepId] || "25%";
    }

    const currentStepLabel = document.getElementById("currentStepLabel");
    if (currentStepLabel) {
        currentStepLabel.textContent = stepLabels[stepId] || "Khảo sát tiêu dùng bền vững";
    }

    window.scrollTo({ top: 0, behavior: "smooth" });
}

function escapeHtml(value) {
    return String(value)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#39;");
}
