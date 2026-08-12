import {
    DEFAULT_WALL_BOARD_PROFILE,
    DEFAULT_WALL_BOARD_TYPE,
    WALL_BOARD_PROFILES,
    WALL_BOARD_TYPES,
    type WallBoardProfile,
    type WallBoardType,
} from "./geometry.constants.ts";

/**
 * How a `WallBoardType` was resolved by `BoardMaterialsHelper`:
 * - `explicit`: the primary value was itself a recognised wall board type.
 * - `legacy`: the primary value was missing/unrecognised, but the legacy
 *   field held a recognised legacy value that maps to a board type.
 * - `defaulted`: neither value was usable, so `DEFAULT_WALL_BOARD_TYPE` was
 *   used as a fallback.
 */
export type WallBoardTypeSource = "explicit" | "legacy" | "defaulted";

/**
 * The two `QuantitySource.measurementPlasterType` values seeded for
 * `WALL_AREA` (see `data/connector-web/quotes.mutations.gql`'s
 * `EnsureSystemQuoteItemTemplates`): `STANDARD` plasterboard vs a
 * `WET_AREA` board (villaboard, water-resistant, or wet-area fire-resistant
 * sheeting).
 */
export type WallPlasterCategory = "STANDARD" | "WET_AREA";

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

    /**
     * Reports how `normalizeWallBoardType()` would resolve the given inputs,
     * without duplicating its normalization logic.
     */
    public static wallBoardTypeSource(
        value: string | null | undefined,
        legacyValue?: string | null,
    ): WallBoardTypeSource {
        if (BoardMaterialsHelper.isWallBoardType(value)) return "explicit";
        if (BoardMaterialsHelper.isLegacyWallBoardType(legacyValue))
            return "legacy";

        return "defaulted";
    }

    /**
     * Classifies a resolved `WallBoardType` (from `normalizeWallBoardType()`)
     * as `STANDARD` or `WET_AREA`, for splitting `QuantitySource.WALL_AREA`
     * quantities the same way `EnsureSystemQuoteItemTemplates` splits the
     * wall quote item templates: one for `10mm Plasterboard` walls, one for
     * `6mm Villaboard` wet-area walls. There is no existing field that
     * stores this classification directly, so it is derived here from
     * `WALL_BOARD_TYPES`'s board names rather than invented on a schema that
     * is out of scope for this change.
     */
    public static wallPlasterCategory(
        wallBoardType: WallBoardType,
    ): WallPlasterCategory {
        return BoardMaterialsHelper.WET_AREA_WALL_BOARD_TYPES.has(wallBoardType)
            ? "WET_AREA"
            : "STANDARD";
    }

    private static readonly WET_AREA_WALL_BOARD_TYPES: ReadonlySet<WallBoardType> =
        new Set<WallBoardType>([
            "9mm Villaboard",
            "6mm Villaboard",
            "10mm Water Resistant",
            "13mm Water Resistant",
            "13mm Fire Resistant - wet area",
            "16mm Fire Resistant - wet area",
        ]);

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
        if (!BoardMaterialsHelper.isLegacyWallBoardType(value))
            return DEFAULT_WALL_BOARD_TYPE;

        return BoardMaterialsHelper.LEGACY_WALL_BOARD_TYPE_MAP[value];
    }

    private static readonly LEGACY_WALL_BOARD_TYPE_MAP: Record<
        "Water Resistant" | "Sound Check",
        WallBoardType
    > = {
        "Water Resistant": "9mm Villaboard",
        "Sound Check": "10mm Acoustic (Soundchek)",
    };

    private static isLegacyWallBoardType(
        value: string | null | undefined,
    ): value is "Water Resistant" | "Sound Check" {
        return value === "Water Resistant" || value === "Sound Check";
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
