import {
    DEFAULT_WALL_BOARD_PROFILE,
    DEFAULT_WALL_BOARD_TYPE,
    CEILING_BOARD_TYPES,
    DEFAULT_CEILING_BOARD_TYPE,
    WALL_BOARD_PROFILES,
    WALL_BOARD_TYPES,
    type WallBoardProfile,
    type WallBoardType,
    type CeilingBoardType,
} from "./geometry.constants.ts";

/**
 * How a `WallBoardType` was resolved by `normalizeWallBoardType()`:
 * - `explicit`: the primary value was itself a recognised wall board type.
 * - `legacy`: the primary value was missing/unrecognised, but the legacy
 *   field held a recognised legacy value that maps to a board type.
 * - `defaulted`: neither value was usable, so `DEFAULT_WALL_BOARD_TYPE` was
 *   used as a fallback.
 */
export type WallBoardTypeSource = "explicit" | "legacy" | "defaulted";

/**
 * The legacy `WALL_AREA` quantity-source categories: `STANDARD` plasterboard
 * vs a `WET_AREA` board (villaboard, water-resistant, or wet-area
 * fire-resistant sheeting).
 */
export type WallPlasterCategory = "STANDARD" | "WET_AREA";

const WET_AREA_WALL_BOARD_TYPES: ReadonlySet<WallBoardType> =
    new Set<WallBoardType>([
        "9mm Villaboard",
        "6mm Villaboard",
        "10mm Water Resistant",
        "13mm Water Resistant",
        "13mm Fire Resistant - wet area",
        "16mm Fire Resistant - wet area",
    ]);

const LEGACY_WALL_BOARD_TYPE_MAP: Record<
    "Water Resistant" | "Sound Check",
    WallBoardType
> = {
    "Water Resistant": "9mm Villaboard",
    "Sound Check": "10mm Acoustic (Soundchek)",
};

export function normalizeCeilingBoardType(
    value: string | null | undefined,
): CeilingBoardType {
    return isCeilingBoardType(value) ? value : DEFAULT_CEILING_BOARD_TYPE;
}

/** Maps the editor's ceiling products onto the wall-board quote catalog. */
export function wallBoardTypeForCeiling(
    value: string | null | undefined,
): WallBoardType {
    return normalizeCeilingBoardType(value) === "Water Resistant"
        ? "10mm Water Resistant"
        : "10mm Plasterboard";
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

/**
 * Reports how `normalizeWallBoardType()` would resolve the given inputs,
 * without duplicating its normalization logic.
 */
export function wallBoardTypeSource(
    value: string | null | undefined,
    legacyValue?: string | null,
): WallBoardTypeSource {
    if (isWallBoardType(value)) return "explicit";
    if (isLegacyWallBoardType(legacyValue)) return "legacy";

    return "defaulted";
}

/**
 * Classifies a resolved `WallBoardType` (from `normalizeWallBoardType()`)
 * as `STANDARD` or `WET_AREA` for pre-migration
 * `QuantitySource.WALL_AREA` calculations.
 */
export function wallPlasterCategory(
    wallBoardType: WallBoardType,
): WallPlasterCategory {
    return WET_AREA_WALL_BOARD_TYPES.has(wallBoardType)
        ? "WET_AREA"
        : "STANDARD";
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
    if (!isLegacyWallBoardType(value)) return DEFAULT_WALL_BOARD_TYPE;

    return LEGACY_WALL_BOARD_TYPE_MAP[value];
}

function isLegacyWallBoardType(
    value: string | null | undefined,
): value is "Water Resistant" | "Sound Check" {
    return value === "Water Resistant" || value === "Sound Check";
}

function isWallBoardProfile(
    value: string | null | undefined,
): value is WallBoardProfile {
    return WALL_BOARD_PROFILES.includes(value as WallBoardProfile);
}

function isCeilingBoardType(
    value: string | null | undefined,
): value is CeilingBoardType {
    return CEILING_BOARD_TYPES.includes(value as CeilingBoardType);
}

function isWallBoardType(
    value: string | null | undefined,
): value is WallBoardType {
    return WALL_BOARD_TYPES.includes(value as WallBoardType);
}
