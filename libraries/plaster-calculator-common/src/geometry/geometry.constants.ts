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

export const DEFAULT_WALL_BOARD_PROFILE: WallBoardProfile = "RE";
export const DEFAULT_WALL_BOARD_TYPE: WallBoardType = "10mm Plasterboard";
