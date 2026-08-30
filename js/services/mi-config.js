function normalizeExternalConfig(data) {
    if (!data || typeof data !== "object") return {};
    if (data.surveys && typeof data.surveys === "object") return data.surveys;
    if (!Array.isArray(data.rows)) return {};

    return rowsToMiConfig(data.rows);
}

function normalizeConfigHeader(value) {
    return String(value || "")
        .trim()
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/đ/g, "d")
        .replace(/[^a-z0-9_]/g, "");
}

function findConfigIndex(headers, aliases) {
    return aliases.reduce((foundIndex, alias) => {
        if (foundIndex >= 0) return foundIndex;
        return headers.indexOf(normalizeConfigHeader(alias));
    }, -1);
}

function readConfigValue(row, aliases) {
    for (const alias of aliases) {
        if (Object.prototype.hasOwnProperty.call(row, alias)) {
            return row[alias];
        }

        const normalizedAlias = normalizeConfigHeader(alias);
        const matchedKey = Object.keys(row).find((key) => normalizeConfigHeader(key) === normalizedAlias);
        if (matchedKey) {
            return row[matchedKey];
        }
    }

    return "";
}

function parseConfigNumber(value) {
    if (typeof value === "number") return value;

    let normalized = String(value || "")
        .trim()
        .replace(/\s/g, "");

    const commaCount = (normalized.match(/,/g) || []).length;
    const dotCount = (normalized.match(/\./g) || []).length;

    if (commaCount > 0 && dotCount > 0) {
        normalized = normalized.replace(/\./g, "").replace(",", ".");
    } else if (commaCount === 1 && /^\d+,\d{3}$/.test(normalized)) {
        normalized = normalized.replace(",", "");
    } else if (commaCount === 1) {
        normalized = normalized.replace(",", ".");
    } else if (dotCount === 1 && /^\d+\.\d{3}$/.test(normalized)) {
        normalized = normalized.replace(".", "");
    }

    return Number(normalized);
}

function buildConfigValueFromRow(row, value, componentName) {
    const factorValue = {};

    materialComponents.forEach((component) => {
        const componentValue = parseOptionalNumber(readConfigValue(row, getMaterialComponentAliases(component)));
        if (componentValue !== null) {
            factorValue[component] = componentValue;
        }
    });

    if (componentName && value !== null) {
        factorValue[componentName] = value;
    }

    if (Object.keys(factorValue).length > 0) {
        return factorValue;
    }

    return value;
}

function mergeConfigValue(existingValue, nextValue) {
    if (existingValue === undefined) return nextValue;
    if (typeof existingValue === "object" || typeof nextValue === "object") {
        return {
            ...(typeof existingValue === "object" ? existingValue : { value: existingValue }),
            ...(typeof nextValue === "object" ? nextValue : { value: nextValue })
        };
    }

    return nextValue;
}

function rowsToMiConfig(rows) {
    return rows.reduce((acc, row) => {
        const survey = String(readConfigValue(row, ["survey", "survey_id", "surveyId", "khao_sat", "khảo sát", "nhom", "nhóm"])).trim();
        const code = String(readConfigValue(row, ["code", "ma", "mã", "ma_he_so", "mã hệ số", "item"])).trim();
        const value = parseOptionalNumber(readConfigValue(row, ["value", "gia_tri", "giá trị", "he_so", "hệ số", "factor", "mi", "mit", "tmr"]));
        const type = String(readConfigValue(row, ["type", "loai", "loại", "kind"]) || "factor").trim().toLowerCase();
        const componentName = normalizeMaterialComponentName(readConfigValue(row, ["component", "thanh_phan", "thành phần", "mi_component", "mit_component"]));
        const configValue = buildConfigValueFromRow(row, value, componentName);

        if (!survey || !code || configValue === null) return acc;
        if (!acc[survey]) {
            acc[survey] = { factors: {}, scalars: {} };
        }

        const bucket = type === "scalar" ? acc[survey].scalars : acc[survey].factors;
        bucket[code] = mergeConfigValue(bucket[code], configValue);
        return acc;
    }, {});
}

function parseCsvLine(line) {
    const cells = [];
    let current = "";
    let inQuotes = false;

    for (let index = 0; index < line.length; index += 1) {
        const char = line[index];
        const next = line[index + 1];
        if (char === '"' && inQuotes && next === '"') {
            current += '"';
            index += 1;
        } else if (char === '"') {
            inQuotes = !inQuotes;
        } else if (char === "," && !inQuotes) {
            cells.push(current.trim());
            current = "";
        } else {
            current += char;
        }
    }

    cells.push(current.trim());
    return cells;
}

function parseCsvConfig(csvText) {
    const lines = csvText.split(/\r?\n/).filter(Boolean);
    if (lines.length < 2) return {};

    const headers = parseCsvLine(lines[0]);
    const normalizedHeaders = headers.map(normalizeConfigHeader);
    const surveyIndex = findConfigIndex(normalizedHeaders, ["survey", "survey_id", "khao_sat", "khảo sát", "nhom", "nhóm"]);
    const codeIndex = findConfigIndex(normalizedHeaders, ["code", "ma", "mã", "ma_he_so", "mã hệ số", "item"]);

    if (surveyIndex === -1 || codeIndex === -1) return {};

    const rows = lines.slice(1).map((line) => {
        const cells = parseCsvLine(line);
        return headers.reduce((row, header, index) => {
            row[header] = cells[index] ?? "";
            return row;
        }, {});
    });

    return rowsToMiConfig(rows);
}

async function loadExternalMiConfig() {
    const attempts = [
        async () => {
            const response = await fetch(MI_CONFIG_ENDPOINT);
            if (!response.ok) throw new Error(`HTTP ${response.status}`);
            const data = await response.json();
            const config = normalizeExternalConfig(data);
            if (!Object.keys(config).length) throw new Error("Empty JSON config");
            return {
                config,
                source: {
                    mode: "external",
                    label: "App Script / JSON",
                    detail: "Đã lấy hệ số MIT/TMR từ endpoint JSON bên ngoài."
                }
            };
        },
        async () => {
            const response = await fetch(SHEET_CSV_URL);
            if (!response.ok) throw new Error(`HTTP ${response.status}`);
            const csvText = await response.text();
            const config = parseCsvConfig(csvText);
            if (!Object.keys(config).length) throw new Error("Empty CSV config");
            return {
                config,
                source: {
                    mode: "external",
                    label: "Google Sheet / CSV",
                    detail: "Đã lấy hệ số MIT/TMR từ Google Sheet public."
                }
            };
        }
    ];

    for (const attempt of attempts) {
        try {
            const result = await attempt();
            state.miConfig = result.config;
            state.miSource = result.source;
            return;
        } catch (error) {
            continue;
        }
    }
}

function getExternalFactor(surveyId, code) {
    return state.miConfig?.[surveyId]?.factors?.[code];
}

function getExternalScalar(surveyId, code) {
    return state.miConfig?.[surveyId]?.scalars?.[code];
}

function pickFactor(surveyId, code, fallbackValue) {
    const externalValue = getExternalFactor(surveyId, code);
    if (typeof externalValue === "number" && !Number.isNaN(externalValue)) {
        return { value: externalValue, source: "external" };
    }
    return { value: fallbackValue, source: "fallback" };
}

function pickScalar(surveyId, code, fallbackValue) {
    const externalValue = getExternalScalar(surveyId, code);
    if (typeof externalValue === "number" && !Number.isNaN(externalValue)) {
        return { value: externalValue, source: "external" };
    }
    return { value: fallbackValue, source: "fallback" };
}
