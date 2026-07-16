import {
    OverlayGeometryHelper,
    OverlaySchema,
    type AreaPolygon,
} from "@libraries/plaster-calculator-common";

import type { ProjectWithPages } from "../types.js";

type ProjectPage = ProjectWithPages["pages"][number];

const WET_AREA_ROOM_TYPES = new Set(["Bath", "Toilet", "Laundry"]);

export interface RoomSummary {
    readonly label: string;
    readonly roomType: string | null;
    readonly isWetArea: boolean;
    readonly ceilingAreaM2: number | null;
    readonly wallAreaM2ByType: Record<string, number>;
    readonly ceilingHeightMm: number | null;
    readonly ceilingMode: "flat" | "raked";
}

export function buildRoomSummary(page: ProjectPage): RoomSummary[] {
    if (!page.overlayJson || page.scaleMmPerPx == null) {
        return [];
    }

    const parsed = OverlaySchema.safeParse(JSON.parse(page.overlayJson));
    if (!parsed.success) {
        return [];
    }

    const scaleMmPerPx = page.scaleMmPerPx;
    const pageCeilingHeightMm = page.ceilingHeightMm ?? null;
    return parsed.data.areas
        .filter((area) => !area.deleted)
        .map((area) => summarizeArea(area, scaleMmPerPx, pageCeilingHeightMm));
}

function summarizeArea(
    area: AreaPolygon,
    scaleMmPerPx: number,
    pageCeilingHeightMm: number | null,
): RoomSummary {
    const roomType = area.sourceRoomType ?? null;
    const ceilingHeightMm = OverlayGeometryHelper.effectiveFlatHeight(
        area,
        pageCeilingHeightMm,
    );
    const heightM = ceilingHeightMm != null ? ceilingHeightMm / 1000 : null;

    const wallAreaM2ByType: Record<string, number> = {};
    if (heightM != null) {
        OverlayGeometryHelper.wallLengthByType(area).forEach(
            ({ type, lengthPx }) => {
                const lengthM = (lengthPx * scaleMmPerPx) / 1000;
                wallAreaM2ByType[type] =
                    (wallAreaM2ByType[type] ?? 0) + lengthM * heightM;
            },
        );
    }

    return {
        label: area.label,
        roomType,
        isWetArea: roomType != null && WET_AREA_ROOM_TYPES.has(roomType),
        ceilingAreaM2: OverlayGeometryHelper.ceilingAreaM2ForArea(
            area,
            scaleMmPerPx,
        ),
        wallAreaM2ByType,
        ceilingHeightMm,
        ceilingMode: area.ceilingMode ?? "flat",
    };
}
