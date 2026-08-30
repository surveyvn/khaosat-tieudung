// Điền các giá trị này khi triển khai hệ thống lưu dữ liệu.
const scriptURL = "";
const SHEET_LOGGER_SECRET = "";
const ENABLE_GOOGLE_SHEET_SYNC = false;
const DATABASE_URL = "";
const DATABASE_ANON_KEY = "";
const DATABASE_TABLE = "survey_submissions";
const SHEET_SOURCE_URL = "https://docs.google.com/spreadsheets/d/14Zo1oQT0--dw7L5OJ46OGVivvcxqFViqJzTMhkrrXXg/edit?usp=sharing";
const SHEET_CSV_URL = "https://docs.google.com/spreadsheets/d/14Zo1oQT0--dw7L5OJ46OGVivvcxqFViqJzTMhkrrXXg/export?format=csv";
const MI_CONFIG_ENDPOINT = `${scriptURL}?action=mi-config`;
const HISTORY_STORAGE_KEY = "nttu-survey-history";
const RESPONDENT_ID_KEY = "nttu-respondent-id";
const SUBMISSION_QUEUE_KEY = "ecoimpact-submission-queue-v1";
const SHEET_SUBMISSION_QUEUE_KEY = "ecoimpact-sheet-submission-queue-v1";
const APP_VERSION = "0.1.0";
const ACTIVE_SURVEY_IDS = ["electricity", "food", "fashion"];

const SURVEY_CODE_BY_ID = {
    food: "TP",
    electricity: "DIEN",
    water: "NUOC",
    waste: "RAC",
    transport: "DC",
    fashion: "MS",
    devices: "TBI",
    equipment: "TBI",
    profile: "TTC",
    lifestyle: "TTC",
    entertainment: "TTC"
};

const state = {
    profile: null,
    selectedSurveyId: null,
    selectedSurveyName: "",
    history: [],
    miConfig: {},
    miSource: {
        mode: "dataset",
        label: "Bảng hệ số MIT/TMR người dùng cung cấp",
        detail: "Hệ số MIT chỉ được dùng để nhân với lượng tiêu dùng, sau đó quy đổi thành TMR kg/người/năm."
    }
};

const tmrCategoryKeys = ["device", "food", "transport", "energy", "clothing", "entertainment", "other"];
const materialComponents = ["abiotic", "biotic", "earth", "water", "air"];
const categoryLabels = {
    device: "Thiết bị điện",
    food: "Thực phẩm",
    transport: "Đi lại",
    energy: "Điện, nước, gas",
    clothing: "Quần áo, giày dép",
    entertainment: "Giải trí",
    other: "Khác"
};

const CONFIG = {
    householdSizeDefault: 3,
    includeDeviceUsePhase: false,
    sustainabilityBenchmark: {
        sustainableTargetKgPersonYear: null,
        mediumThresholdKgPersonYear: null,
        highThresholdKgPersonYear: null
    }
};

const calculationConfig = {
    includeDeviceUsePhase: CONFIG.includeDeviceUsePhase,
    foodInputScope: "household",
    transportInputScope: "person",
    clothingInputScope: "household",
    entertainmentInputScope: "person"
};

const sustainabilityBenchmark = CONFIG.sustainabilityBenchmark;
// Ước tính tốc độ trung bình khi đi mua thực phẩm, dùng để quy đổi phút sang km.
const AVERAGE_FOOD_TRIP_SPEED_KMH = 20;
const stepProgress = {
    "step-profile": "25%",
    "step-selector": "50%",
    "step-questionnaire": "75%",
    "step-result": "100%"
};

const stepLabels = {
    "step-profile": "Bước 1 - Thông tin người tham gia",
    "step-selector": "Bước 2 - Chọn khảo sát",
    "step-questionnaire": "Bước 3 - Trả lời câu hỏi",
    "step-result": "Bước 4 - Kết quả và lịch sử của bạn"
};
