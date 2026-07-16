import {
    DEFAULT_WALL_BOARD_PROFILE,
    DEFAULT_WALL_BOARD_TYPE,
    WALL_BOARD_PROFILES,
    WALL_BOARD_TYPES,
    type WallBoardProfile,
    type WallBoardType,
} from "./geometry.constants.ts";

export class BoardMaterialsHelper {
    public static normalizeWallBoardProfile(
        value: string | null | undefined,
    ): WallBoardProfile {
        return BoardMaterialsHelper.isWallBoardProfile(value)
            ? value
            : DEFAULT_WALL_BOARD_PROFILE;
    }

    public static normalizeWallBoardType(
        value: string | null | undefined,
        legacyValue?: string | null,
    ): WallBoardType {
        if (BoardMaterialsHelper.isWallBoardType(value)) return value;

        return BoardMaterialsHelper.legacyWallBoardType(legacyValue);
    }

    public static wallMaterialLabel({
        wallBoardProfile,
        wallBoardType,
        wallPlasterType,
    }: {
        readonly wallBoardProfile?: string | null;
        readonly wallBoardType?: string | null;
        readonly wallPlasterType?: string | null;
    }): string {
        const profile =
            BoardMaterialsHelper.normalizeWallBoardProfile(wallBoardProfile);
        const boardType = BoardMaterialsHelper.normalizeWallBoardType(
            wallBoardType,
            wallPlasterType,
        );
        return `${profile} - ${boardType}`;
    }

    private static legacyWallBoardType(
        value: string | null | undefined,
    ): WallBoardType {
        if (value === "Water Resistant") return "9mm Villaboard";
        if (value === "Sound Check") return "10mm Acoustic (Soundchek)";

        return DEFAULT_WALL_BOARD_TYPE;
    }

    private static isWallBoardProfile(
        value: string | null | undefined,
    ): value is WallBoardProfile {
        return WALL_BOARD_PROFILES.includes(value as WallBoardProfile);
    }

    private static isWallBoardType(
        value: string | null | undefined,
    ): value is WallBoardType {
        return WALL_BOARD_TYPES.includes(value as WallBoardType);
    }
}
