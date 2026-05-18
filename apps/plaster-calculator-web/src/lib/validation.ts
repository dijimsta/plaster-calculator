import type { AreaPolygon, FloorplanPage } from "../types.js";
export {
    parseOverlay,
    parseReferencePoints,
} from "./editor/overlay-serialization.js";
import { parseOverlay } from "./editor/overlay-serialization.js";

export type PageValidationInput = Pick<
    FloorplanPage,
    | "id"
    | "pageNumber"
    | "overlay"
    | "scaleMmPerPx"
    | "ceilingHeightMm"
    | "referencePoints"
    | "referenceLengthMm"
>;

export type ValidationIssue = {
    pageId: string;
    pageNumber: number;
    areaId?: string;
    field:
        | "reference"
        | "areas"
        | "areaLabel"
        | "polygon"
        | "wallPlasterType"
        | "ceilingPlasterType"
        | "ceilingHeightMm"
        | "rakedLowEdge"
        | "rakedHighEdge"
        | "rakedLowHeight"
        | "rakedHighHeight";
    message: string;
};

export function validatePageForExport(
    page: PageValidationInput,
): ValidationIssue[] {
    const issues: ValidationIssue[] = [];
    if (!page.scaleMmPerPx || page.scaleMmPerPx <= 0) {
        issues.push({
            pageId: page.id,
            pageNumber: page.pageNumber,
            field: "reference",
            message: "Reference is required",
        });
    }

    const overlay = parseOverlay(page.overlay);
    const areas = overlay.areas.filter((area) => !area.deleted);
    if (areas.length === 0) {
        issues.push({
            pageId: page.id,
            pageNumber: page.pageNumber,
            field: "areas",
            message: "At least one area is required",
        });
        return issues;
    }

    areas.forEach((area) => {
        if (!area.label?.trim())
            addAreaIssue(
                issues,
                page,
                area,
                "areaLabel",
                "Area label is required",
            );
        if (!area.points || area.points.length < 3)
            addAreaIssue(
                issues,
                page,
                area,
                "polygon",
                "Polygon needs at least 3 points",
            );
        if (!area.ceilingPlasterType?.trim())
            addAreaIssue(
                issues,
                page,
                area,
                "ceilingPlasterType",
                "Ceiling board is required",
            );
        if (!area.isOutdoor && !area.wallPlasterType?.trim())
            addAreaIssue(
                issues,
                page,
                area,
                "wallPlasterType",
                "Wall board is required",
            );

        if ((area.ceilingMode ?? "flat") === "raked") {
            validateRakedCeiling(issues, page, area);
        } else if (
            !positiveNumber(area.ceilingHeightMm) &&
            !positiveNumber(page.ceilingHeightMm)
        ) {
            addAreaIssue(
                issues,
                page,
                area,
                "ceilingHeightMm",
                "Ceiling height is required",
            );
        }
    });

    return issues;
}

function validateRakedCeiling(
    issues: ValidationIssue[],
    page: PageValidationInput,
    area: AreaPolygon,
) {
    const raked = area.rakedCeiling;
    const pointCount = area.points?.length ?? 0;
    if (!raked || !validEdgeIndex(raked.lowEdgeIndex, pointCount)) {
        addAreaIssue(
            issues,
            page,
            area,
            "rakedLowEdge",
            "Lower edge is required",
        );
    }
    if (!raked || !validEdgeIndex(raked.highEdgeIndex, pointCount)) {
        addAreaIssue(
            issues,
            page,
            area,
            "rakedHighEdge",
            "Higher edge is required",
        );
    }
    if (
        raked &&
        validEdgeIndex(raked.lowEdgeIndex, pointCount) &&
        raked.lowEdgeIndex === raked.highEdgeIndex
    ) {
        addAreaIssue(
            issues,
            page,
            area,
            "rakedHighEdge",
            "Higher edge must be different",
        );
    }
    if (!positiveNumber(raked?.lowHeightMm)) {
        addAreaIssue(
            issues,
            page,
            area,
            "rakedLowHeight",
            "Lower height is required",
        );
    }
    if (!positiveNumber(raked?.highHeightMm)) {
        addAreaIssue(
            issues,
            page,
            area,
            "rakedHighHeight",
            "Higher height is required",
        );
    }
}

function addAreaIssue(
    issues: ValidationIssue[],
    page: PageValidationInput,
    area: AreaPolygon,
    field: ValidationIssue["field"],
    message: string,
) {
    issues.push({
        pageId: page.id,
        pageNumber: page.pageNumber,
        areaId: area.id,
        field,
        message,
    });
}

function validEdgeIndex(index: number | null | undefined, pointCount: number) {
    return (
        Number.isInteger(index) &&
        index != null &&
        index >= 0 &&
        index < pointCount
    );
}

function positiveNumber(value: number | null | undefined) {
    return typeof value === "number" && Number.isFinite(value) && value > 0;
}
