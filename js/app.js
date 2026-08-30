function bindEvents() {
    const toSurveySelector = document.getElementById("toSurveySelector");
    const backToProfile = document.getElementById("backToProfile");
    const backToSelector = document.getElementById("backToSelector");
    const anotherSurvey = document.getElementById("anotherSurvey");
    const againSameSurvey = document.getElementById("againSameSurvey");
    const surveyForm = document.getElementById("surveyForm");
    const profileForm = document.getElementById("profileForm");
    const clearHistoryBtn = document.getElementById("clearHistoryBtn");
    const stepNavItems = document.querySelectorAll(".step-nav-item");

    const openSurveySelector = () => {
        if (!validateForm(profileForm)) return;
        state.profile = collectProfileData();
        persistProfile(state.profile);
        setActiveStep("step-selector");
    };

    toSurveySelector.addEventListener("click", openSurveySelector);

    backToProfile.addEventListener("click", () => setActiveStep("step-profile"));
    backToSelector.addEventListener("click", () => setActiveStep("step-selector"));
    anotherSurvey.addEventListener("click", () => setActiveStep("step-selector"));
    clearHistoryBtn.addEventListener("click", clearHistory);

    stepNavItems.forEach((item) => {
        item.addEventListener("click", () => {
            const target = item.dataset.stepTarget;
            if (!target) return;
            if (target === "step-profile") {
                setActiveStep(target);
                return;
            }
            if (target === "step-selector") {
                openSurveySelector();
                return;
            }
            if (target === "step-questionnaire" && state.selectedSurveyId) {
                setActiveStep(target);
                return;
            }
            if (target === "step-result" && state.history.length > 0) {
                setActiveStep(target);
            }
        });
    });

    againSameSurvey.addEventListener("click", () => {
        if (state.selectedSurveyId) {
            startSurvey(state.selectedSurveyId);
        }
    });

    surveyForm.addEventListener("submit", handleSurveySubmit);
    bindSmartNumberInputs(document);
    bindUserInputTracking(document);
}

document.addEventListener("DOMContentLoaded", () => {
    state.history = getStoredHistory();
    state.profile = getStoredProfile();
    fillProfileForm(state.profile || {});
    renderSurveyCards();
    renderHistory();
    bindEvents();
    if (state.selectedSurveyId) {
        const survey = getSurveyById(state.selectedSurveyId);
        if (isSurveyEnabledForUsers(survey)) {
            renderSurveyQuestions(survey);
        }
    }
    setActiveStep(state.profile ? "step-selector" : "step-profile");
});
