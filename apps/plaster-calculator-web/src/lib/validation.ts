import {
    normalizeCeilingBoardType,
    normalizeWallBoardProfile,
    normalizeWallBoardType,
} from "./editor/board-materials.js";
import { parseOverlay } from "./editor/overlay-serialization.js";

import type { AreaPolygon, FloorplanPage } from "../types.js";

export {
    parseOverlay,
    parseReferencePoints,
} from "./editor/overlay-serialization.js";

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
        | "wallBoardProfile"
        | "wallBoardType"
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

    areas.forEach((area) => validateAreaForExport(issues, page, area));

    return issues;
}

function validateAreaForExport(
    issues: ValidationIssue[],
    page: PageValidationInput,
    area: AreaPolygon,
) {
    validateAreaBasics(issues, page, area);
    validateAreaCeiling(issues, page, area);
}

function validateAreaBasics(
    issues: ValidationIssue[],
    page: PageValidationInput,
    area: AreaPolygon,
) {
    if (!area.label?.trim()) {
        addAreaIssue(issues, page, area, "areaLabel", "Area label is required");
    }
    if (!area.points || area.points.length < 3) {
        addAreaIssue(
            issues,
            page,
            area,
            "polygon",
            "Polygon needs at least 3 points",
        );
    }
    if (!normalizeCeilingBoardType(area.ceilingPlasterType).trim()) {
        addAreaIssue(
            issues,
            page,
            area,
            "ceilingPlasterType",
            "Ceiling board is required",
        );
    }
    if (
        !area.isOutdoor &&
        !normalizeWallBoardProfile(area.wallBoardProfile).trim()
    ) {
        addAreaIssue(
            issues,
            page,
            area,
            "wallBoardProfile",
            "Wall profile is required",
        );
    }
    if (
        !area.isOutdoor &&
        !normalizeWallBoardType(area.wallBoardType, area.wallPlasterType).trim()
    ) {
        addAreaIssue(
            issues,
            page,
            area,
            "wallBoardType",
            "Wall board is required",
        );
    }
}

function validateAreaCeiling(
    issues: ValidationIssue[],
    page: PageValidationInput,
    area: AreaPolygon,
) {
    if ((area.ceilingMode ?? "flat") === "raked") {
        validateRakedCeiling(issues, page, area);
        return;
    }

    if (positiveNumber(area.ceilingHeightMm)) return;
    if (positiveNumber(page.ceilingHeightMm)) return;
    addAreaIssue(
        issues,
        page,
        area,
        "ceilingHeightMm",
        "Ceiling height is required",
    );
}

function validateRakedCeiling(
    issues: ValidationIssue[],
    page: PageValidationInput,
    area: AreaPolygon,
) {
    const raked = area.rakedCeiling;
    const pointCount = area.points?.length ?? 0;
    const edgeValidation = rakedEdgeValidation(raked, pointCount);
    if (!edgeValidation.lowEdgeValid) {
        addAreaIssue(
            issues,
            page,
            area,
            "rakedLowEdge",
            "Lower edge is required",
        );
    }
    if (!edgeValidation.highEdgeValid) {
        addAreaIssue(
            issues,
            page,
            area,
            "rakedHighEdge",
            "Higher edge is required",
        );
    }
    if (edgeValidation.sameEdge) {
        addAreaIssue(
            issues,
            page,
            area,
            "rakedHighEdge",
            "Higher edge must be different",
        );
    }
    if (!positiveNumber(rakedLowHeight(raked))) {
        addAreaIssue(
            issues,
            page,
            area,
            "rakedLowHeight",
            "Lower height is required",
        );
    }
    if (!positiveNumber(rakedHighHeight(raked))) {
        addAreaIssue(
            issues,
            page,
            area,
            "rakedHighHeight",
            "Higher height is required",
        );
    }
}

function rakedEdgeValidation(
    raked: AreaPolygon["rakedCeiling"],
    pointCount: number,
) {
    const lowEdgeValid = validEdgeIndex(raked?.lowEdgeIndex, pointCount);
    const highEdgeValid = validEdgeIndex(raked?.highEdgeIndex, pointCount);
    return {
        highEdgeValid,
        lowEdgeValid,
        sameEdge:
            lowEdgeValid &&
            highEdgeValid &&
            raked?.lowEdgeIndex === raked?.highEdgeIndex,
    };
}

function rakedLowHeight(raked: AreaPolygon["rakedCeiling"]) {
    return raked?.lowHeightMm;
}

function rakedHighHeight(raked: AreaPolygon["rakedCeiling"]) {
    return raked?.highHeightMm;
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
