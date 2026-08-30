async function handleSurveySubmit(event) {
    event.preventDefault();
    const submitButton = document.getElementById("submitSurveyBtn");
    const submitStatus = document.getElementById("surveySubmitStatus");
    const form = event.currentTarget;

    if (!validateForm(form)) return;

    const survey = getSurveyById(state.selectedSurveyId);
    if (!survey) return;

    const formData = new FormData(form);
    const resetSubmitButton = () => {
        submitButton.disabled = false;
        submitButton.innerHTML = 'Hoàn thành khảo sát <i class="fa fa-paper-plane"></i>';
    };

    submitButton.disabled = true;
    submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Đang gửi...';
    if (submitStatus) {
        submitStatus.className = "submit-status";
        submitStatus.textContent = "";
    }

    let result;
    try {
        result = survey.calculate(formData);
        if (!result || !Number.isFinite(Number(result.totalTMRPersonYear))) {
            throw new Error("Invalid TMR result");
        }
        renderResult(result, survey);
    } catch (error) {
        console.error("TMR calculation failed:", error);
        resetSubmitButton();
        if (submitStatus) {
            submitStatus.className = "submit-status error";
            submitStatus.textContent = "Không thể tính dấu chân vật chất. Vui lòng tải lại trang và thử lại.";
        }
        return;
    }

    state.history.unshift({
        surveyId: survey.id,
        surveyName: survey.name,
        fullname: state.profile?.hoTen || "Người dùng",
        location: [state.profile?.xa, state.profile?.thanhPho].filter(Boolean).join(", "),
        total: result.totalTMRPersonYear.toFixed(1),
        totalTMRHouseholdYear: result.totalTMRHouseholdYear,
        totalTMRPersonYear: result.totalTMRPersonYear,
        totalTMRPersonYearTon: result.totalTMRPersonYearTon,
        result,
        sourceLabel: result.sourceMode === "external" ? state.miSource.label : "Bảng hệ số MIT/TMR",
        completedAt: new Date().toISOString(),
        completedAtLabel: new Date().toLocaleString("vi-VN")
    });
    state.history = state.history.slice(0, 12);
    persistHistory();
    renderHistory();

    const surveyCode = getSurveyCodeForSurvey(survey);
    const databaseData = buildDatabaseData(form, survey);
    const databaseResult = buildDatabaseResult(result, surveyCode);

    setActiveStep("step-result");
    setResultSubmissionStatus("pending", "Đang gửi khảo sát...");

    submitSurveyToDatabase(surveyCode, databaseData, databaseResult)
        .then((submitResult) => {
            if (submitResult.success) {
                setResultSubmissionStatus("success", "Đã lưu khảo sát vào hệ thống.");
                return;
            }
            if (submitResult.queued) {
                setResultSubmissionStatus("pending", "Đã lưu trên thiết bị. Khảo sát sẽ tự gửi khi có mạng.");
                return;
            }
            setResultSubmissionStatus("error", submitResult.configured === false ? "Database chưa được cấu hình. Dữ liệu đang được giữ an toàn trên thiết bị." : "Chưa thể lưu khảo sát. Vui lòng kiểm tra kết nối.");
        })
        .catch((error) => {
            console.error("Background sheet submit failed:", error);
            setResultSubmissionStatus("error", "Chưa thể gửi khảo sát. Vui lòng kiểm tra kết nối và thử lại.");
        })
        .finally(resetSubmitButton);
}
