import { normalizeCeilingBoardType } from "./board-materials.js";
import { wallBreakdown } from "./csv-wall-breakdown.js";

import type { ProjectWithPages } from "./types.js";

export function buildProjectCsv(project: ProjectWithPages) {
    const matrix = collectExportMatrix(project);
    const csvRows = buildCsvRows(matrix);
    return csvRows.map((row) => row.map(csvCell).join(",")).join("\n") + "\n";
}

function collectExportMatrix(project: ProjectWithPages): ExportMatrix {
    const pageNumbers = sortedPageNumbers(project);
    const wallValues = new Map<string, PageValues>();
    const ceilingValues = new Map<string, PageValues>();

    for (const page of project.pages) {
        if (!page.overlayJson || page.scaleMmPerPx == null) {
            continue;
        }

        const overlay = parseJsonObject(page.overlayJson);
        const areas = Array.isArray(overlay["areas"]) ? overlay["areas"] : [];

        for (const area of areas) {
            if (!isRecord(area) || Boolean(area["deleted"])) {
                continue;
            }

            addPageValues(
                wallValues,
                page.pageNumber,
                wallBreakdown(
                    area,
                    page.scaleMmPerPx,
                    page.ceilingHeightMm ?? null,
                ),
            );
            addPageValue(
                ceilingValues,
                ceilingColumn(area),
                page.pageNumber,
                ceilingAreaM2(area, page.scaleMmPerPx),
            );
        }
    }

    return { ceilingValues, pageNumbers, wallValues };
}

function sortedPageNumbers(project: ProjectWithPages) {
    return project.pages
        .map((page) => page.pageNumber)
        .sort((left, right) => left - right);
}

function buildCsvRows(matrix: ExportMatrix) {
    const pageHeaders = matrix.pageNumbers.map(
        (pageNumber) => `Page ${pageNumber}`,
    );
    return [
        ["Plaster Type", ...pageHeaders, "Total"],
        sectionRow("Walls", matrix.pageNumbers.length),
        ...materialRows(matrix.wallValues, matrix.pageNumbers),
        sectionRow("Ceiling", matrix.pageNumbers.length),
        ...materialRows(matrix.ceilingValues, matrix.pageNumbers),
    ];
}

function sectionRow(label: string, pageCount: number) {
    return [label, ...Array.from({ length: pageCount + 1 }, () => "")];
}

function materialRows(valuesByType: MaterialValues, pageNumbers: number[]) {
    return Array.from(valuesByType.entries())
        .sort(([left], [right]) => left.localeCompare(right))
        .map(([type, values]) => materialRow(type, values, pageNumbers));
}

function materialRow(type: string, values: PageValues, pageNumbers: number[]) {
    const pageValues = pageNumbers.map(
        (pageNumber) => values.get(pageNumber) ?? 0,
    );
    const total = pageValues.reduce((sum, value) => sum + value, 0);
    return [
        type,
        ...pageValues.map((value) => formatNumber(value)),
        formatNumber(total),
    ];
}

function addPageValues(
    target: MaterialValues,
    pageNumber: number,
    values: Map<string, number>,
) {
    values.forEach((value, type) =>
        addPageValue(target, type, pageNumber, value),
    );
}

function addPageValue(
    target: MaterialValues,
    type: string,
    pageNumber: number,
    value: number,
) {
    const values = target.get(type) ?? new Map<number, number>();
    values.set(pageNumber, (values.get(pageNumber) ?? 0) + value);
    target.set(type, values);
}

type JsonRecord = Record<string, unknown>;
type Point = [number, number];
type PageValues = Map<number, number>;
type MaterialValues = Map<string, PageValues>;

interface ExportMatrix {
    pageNumbers: number[];
    wallValues: MaterialValues;
    ceilingValues: MaterialValues;
}

export function ceilingColumn(area: JsonRecord) {
    const ceilingType = normalizeCeilingBoardType(area["ceilingPlasterType"]);
    return `Ceiling (${ceilingTypeLabel(ceilingType)})`;
}

function ceilingTypeLabel(ceilingType: string) {
    return ceilingType === "Water Resistant" ? "WR" : "RE";
}

export function ceilingAreaM2(area: JsonRecord, scaleMmPerPx: number) {
    const points = readPoints(area["points"]);
    const flatM2 = polygonAreaPx(points) * Math.pow(scaleMmPerPx / 1000, 2);
    if (readString(area["ceilingMode"], "flat") !== "raked") {
        return flatM2;
    }

    const raked = isRecord(area["rakedCeiling"]) ? area["rakedCeiling"] : null;
    if (!raked) {
        return flatM2;
    }

    const lowEdgeIndex = readInteger(raked["lowEdgeIndex"], -1);
    const highEdgeIndex = readInteger(raked["highEdgeIndex"], -1);
    const lowHeight = readNumberOrNull(raked["lowHeightMm"]);
    const highHeight = readNumberOrNull(raked["highHeightMm"]);
    if (
        lowHeight == null ||
        highHeight == null ||
        lowEdgeIndex === highEdgeIndex
    ) {
        return flatM2;
    }

    const runM =
        (edgeMidpointDistance(points, lowEdgeIndex, highEdgeIndex) *
            scaleMmPerPx) /
        1000;
    if (runM <= 0) {
        return flatM2;
    }

    const riseM = Math.abs(highHeight - lowHeight) / 1000;
    return flatM2 * Math.sqrt(1 + Math.pow(riseM / runM, 2));
}

export function edgeMidpointDistance(
    points: Point[],
    firstEdge: number,
    secondEdge: number,
) {
    if (
        firstEdge < 0 ||
        secondEdge < 0 ||
        firstEdge >= points.length ||
        secondEdge >= points.length
    ) {
        return 0;
    }

    const firstA = points[firstEdge];
    const firstB = points[(firstEdge + 1) % points.length];
    const secondA = points[secondEdge];
    const secondB = points[(secondEdge + 1) % points.length];
    if (!firstA || !firstB || !secondA || !secondB) {
        return 0;
    }

    const firstX = (firstA[0] + firstB[0]) / 2;
    const firstY = (firstA[1] + firstB[1]) / 2;
    const secondX = (secondA[0] + secondB[0]) / 2;
    const secondY = (secondA[1] + secondB[1]) / 2;
    return Math.hypot(secondX - firstX, secondY - firstY);
}

export function parseJsonObject(value: string): JsonRecord {
    try {
        const parsed: unknown = JSON.parse(value);
        return isRecord(parsed) ? parsed : {};
    } catch {
        return {};
    }
}

export function readPoints(value: unknown): Point[] {
    if (!Array.isArray(value)) {
        return [];
    }

    return value.flatMap((item) => {
        if (
            Array.isArray(item) &&
            item.length >= 2 &&
            typeof item[0] === "number" &&
            typeof item[1] === "number"
        ) {
            return [[item[0], item[1]] as Point];
        }

        return [];
    });
}

export function polygonAreaPx(points: Point[]) {
    if (points.length < 3) {
        return 0;
    }

    let sum = 0;
    for (let index = 0; index < points.length; index += 1) {
        const current = points[index];
        const next = points[(index + 1) % points.length];
        if (!current || !next) {
            continue;
        }
        sum += current[0] * next[1] - next[0] * current[1];
    }

    return Math.abs(sum) / 2;
}

export function isRecord(value: unknown): value is JsonRecord {
    return typeof value === "object" && value !== null && !Array.isArray(value);
}

export function readString(value: unknown, fallback: string) {
    return typeof value === "string" ? value : fallback;
}

export function readInteger(value: unknown, fallback: number) {
    return typeof value === "number" && Number.isInteger(value)
        ? value
        : fallback;
}

export function readNumberOrNull(value: unknown) {
    return typeof value === "number" && Number.isFinite(value) ? value : null;
}

export function heightLabel(heightMm: number) {
    return `${heightMm.toFixed(0)}mm`;
}

export function formatNumber(value: number) {
    return value.toFixed(3);
}

export function csvFileNamePart(value: string) {
    const cleaned = value
        .trim()
        .replace(/[^A-Za-z0-9._-]+/g, "-")
        .replace(/^-+|-+$/g, "");
    return cleaned || "project";
}

export function csvCell(value: string) {
    return `"${value.replace(/"/g, '""')}"`;
}
