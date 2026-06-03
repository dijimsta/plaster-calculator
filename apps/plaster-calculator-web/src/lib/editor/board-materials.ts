import { activeTheme } from "../styles.js";

export const WALL_BOARD_PROFILES = ["RE", "SE"] as const;
export type WallBoardProfile = (typeof WALL_BOARD_PROFILES)[number];

export const WALL_BOARD_TYPES = [
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
export type WallBoardType = (typeof WALL_BOARD_TYPES)[number];

export const CEILING_BOARD_TYPES = [
    "Recessed Edge",
    "Water Resistant",
] as const;
export type CeilingBoardType = (typeof CEILING_BOARD_TYPES)[number];

export const DEFAULT_WALL_BOARD_PROFILE: WallBoardProfile = "RE";
export const DEFAULT_WALL_BOARD_TYPE: WallBoardType = "10mm Plasterboard";
export const DEFAULT_CEILING_BOARD_TYPE: CeilingBoardType = "Recessed Edge";

const DEFAULT_BOARD_COLOR =
    activeTheme.editor.boardColors[DEFAULT_WALL_BOARD_TYPE];
const BOARD_COLORS = activeTheme.editor.boardColors;

export const BOARD_SWATCH_CLASSES: Record<WallBoardType, string> = {
    "10mm Plasterboard": "bg-slate-700 dark:bg-slate-300",
    "13mm Plasterboard": "bg-zinc-500",
    "9mm Villaboard": "bg-sky-600",
    "6mm Villaboard": "bg-cyan-600",
    "10mm Acoustic (Soundchek)": "bg-orange-700",
    "13mm Acoustic (Soundchek)": "bg-amber-700",
    "10mm Water Resistant": "bg-blue-600",
    "13mm Water Resistant": "bg-indigo-600",
    "13mm Fire Resistant - dry area": "bg-red-600",
    "16mm Fire Resistant - dry area": "bg-rose-700",
    "13mm Fire Resistant - wet area": "bg-fuchsia-700",
    "16mm Fire Resistant - wet area": "bg-purple-700",
    "6.5mm Flexible board": "bg-emerald-600",
};

export function colorFor(type: string): { fill: string; edge: string } {
    return (
        BOARD_COLORS[type as keyof typeof BOARD_COLORS] ?? DEFAULT_BOARD_COLOR
    );
}

export function normalizeWallBoardProfile(
    value: string | null | undefined,
): WallBoardProfile {
    return isWallBoardProfile(value) ? value : DEFAULT_WALL_BOARD_PROFILE;
}

export function normalizeWallBoardType(
    value: string | null | undefined,
    legacyValue?: string | null,
): WallBoardType {
    if (isWallBoardType(value)) return value;

    return legacyWallBoardType(legacyValue);
}

export function normalizeCeilingBoardType(
    value: string | null | undefined,
): CeilingBoardType {
    return isCeilingBoardType(value) ? value : DEFAULT_CEILING_BOARD_TYPE;
}

export function wallMaterialLabel({
    wallBoardProfile,
    wallBoardType,
    wallPlasterType,
}: {
    readonly wallBoardProfile?: string | null;
    readonly wallBoardType?: string | null;
    readonly wallPlasterType?: string | null;
}): string {
    const profile = normalizeWallBoardProfile(wallBoardProfile);
    const boardType = normalizeWallBoardType(wallBoardType, wallPlasterType);
    return `${profile} - ${boardType}`;
}

function legacyWallBoardType(value: string | null | undefined): WallBoardType {
    if (value === "Water Resistant") return "9mm Villaboard";
    if (value === "Sound Check") return "10mm Acoustic (Soundchek)";

    return DEFAULT_WALL_BOARD_TYPE;
}

function isWallBoardProfile(
    value: string | null | undefined,
): value is WallBoardProfile {
    return WALL_BOARD_PROFILES.includes(value as WallBoardProfile);
}

function isWallBoardType(
    value: string | null | undefined,
): value is WallBoardType {
    return WALL_BOARD_TYPES.includes(value as WallBoardType);
}

function isCeilingBoardType(
    value: string | null | undefined,
): value is CeilingBoardType {
    return CEILING_BOARD_TYPES.includes(value as CeilingBoardType);
}
