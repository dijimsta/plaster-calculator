type JsonRecord = Record<string, unknown>;

const WALL_BOARD_PROFILES = ["RE", "SE"] as const;
type WallBoardProfile = (typeof WALL_BOARD_PROFILES)[number];

const WALL_BOARD_TYPES = [
    "10mm Plasterboard",
    "13mm Plasterboard",
    "9mm Villaboard",
    "6mm Villaboard",
    "10mm Acoustic (Soundchek)",
    "13mm Acoustic (Soundchek)",
    "10mm Water Resistant",
    "13mm Water Resistant",
    "13mm Fire Resistant - dry area",
    "16mm Fire Resistant - dry area",
    "13mm Fire Resistant - wet area",
    "16mm Fire Resistant - wet area",
    "6.5mm Flexible board",
] as const;
type WallBoardType = (typeof WALL_BOARD_TYPES)[number];

const CEILING_BOARD_TYPES = ["Recessed Edge", "Water Resistant"] as const;
type CeilingBoardType = (typeof CEILING_BOARD_TYPES)[number];

export const DEFAULT_WALL_BOARD_PROFILE: WallBoardProfile = "RE";
export const DEFAULT_WALL_BOARD_TYPE: WallBoardType = "10mm Plasterboard";
export const DEFAULT_CEILING_BOARD_TYPE: CeilingBoardType = "Recessed Edge";

export function normalizeWallBoardProfile(value: unknown): WallBoardProfile {
    return isWallBoardProfile(value) ? value : DEFAULT_WALL_BOARD_PROFILE;
}

export function normalizeWallBoardType(
    value: unknown,
    legacyValue?: unknown,
): WallBoardType {
    if (isWallBoardType(value)) return value;

    return legacyWallBoardType(legacyValue);
}

export function normalizeCeilingBoardType(value: unknown): CeilingBoardType {
    return isCeilingBoardType(value) ? value : DEFAULT_CEILING_BOARD_TYPE;
}

export function wallMaterialLabel(area: JsonRecord, override?: JsonRecord) {
    const profile = normalizeWallBoardProfile(
        override?.["wallBoardProfile"] ?? area["wallBoardProfile"],
    );
    const boardType = normalizeWallBoardType(
        override?.["wallBoardType"] ?? area["wallBoardType"],
        override?.["wallPlasterType"] ?? area["wallPlasterType"],
    );
    return `${profile} - ${boardType}`;
}

function legacyWallBoardType(value: unknown): WallBoardType {
    if (value === "Water Resistant") return "9mm Villaboard";
    if (value === "Sound Check") return "10mm Acoustic (Soundchek)";

    return DEFAULT_WALL_BOARD_TYPE;
}

function isWallBoardProfile(value: unknown): value is WallBoardProfile {
    return WALL_BOARD_PROFILES.includes(value as WallBoardProfile);
}

function isWallBoardType(value: unknown): value is WallBoardType {
    return WALL_BOARD_TYPES.includes(value as WallBoardType);
}

function isCeilingBoardType(value: unknown): value is CeilingBoardType {
    return CEILING_BOARD_TYPES.includes(value as CeilingBoardType);
}
