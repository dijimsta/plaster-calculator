import type { ProjectWithPages } from "./types.js";

export function buildProjectCsv(project: ProjectWithPages) {
    const rows = collectExportRows(project);
    const { wallColumns, ceilingColumns } = collectExportColumns(rows);
    const csvRows = buildCsvRows(rows, wallColumns, ceilingColumns);
    return csvRows.map((row) => row.map(csvCell).join(",")).join("\n") + "\n";
}

function collectExportRows(project: ProjectWithPages) {
    const rows: ExportRow[] = [];

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

            const row: ExportRow = {
                label:
                    typeof area["label"] === "string" ? area["label"] : "Area",
                pageNumber: page.pageNumber,
                wallValues: wallBreakdown(
                    area,
                    page.scaleMmPerPx,
                    page.ceilingHeightMm ?? null,
                ),
                ceilingValues: new Map([
                    [
                        ceilingColumn(area),
                        ceilingAreaM2(area, page.scaleMmPerPx),
                    ],
                ]),
            };

            rows.push(row);
        }
    }

    return rows;
}

function collectExportColumns(rows: ExportRow[]) {
    const wallColumnSet = new Set<string>();
    const ceilingColumnSet = new Set<string>();

    for (const row of rows) {
        row.wallValues.forEach((_, key) => wallColumnSet.add(key));
        row.ceilingValues.forEach((_, key) => ceilingColumnSet.add(key));
    }

    return {
        wallColumns: Array.from(wallColumnSet).sort(),
        ceilingColumns: Array.from(ceilingColumnSet).sort(),
    };
}

function buildCsvRows(
    rows: ExportRow[],
    wallColumns: string[],
    ceilingColumns: string[],
) {
    const totals = new Map<string, number>();
    const csvRows = [
        ["Area Label", "Page Number", ...wallColumns, ...ceilingColumns],
    ];

    for (const row of rows) {
        const cells = [row.label, String(row.pageNumber)];
        for (const column of wallColumns) {
            const value = row.wallValues.get(column) ?? 0;
            addTotal(totals, column, value);
            cells.push(formatNumber(value));
        }
        for (const column of ceilingColumns) {
            const value = row.ceilingValues.get(column) ?? 0;
            addTotal(totals, column, value);
            cells.push(formatNumber(value));
        }
        csvRows.push(cells);
    }

    csvRows.push([
        "Total",
        "",
        ...wallColumns.map((column) => formatNumber(totals.get(column) ?? 0)),
        ...ceilingColumns.map((column) =>
            formatNumber(totals.get(column) ?? 0),
        ),
    ]);

    return csvRows;
}

interface ExportRow {
    label: string;
    pageNumber: number;
    wallValues: Map<string, number>;
    ceilingValues: Map<string, number>;
}

type JsonRecord = Record<string, unknown>;
type Point = [number, number];

export function addTotal(
    totals: Map<string, number>,
    column: string,
    value: number,
) {
    totals.set(column, (totals.get(column) ?? 0) + value);
}

export function ceilingColumn(area: JsonRecord) {
    const ceilingType = readString(area["ceilingPlasterType"], "Recessed Edge");
    return `Ceiling (${ceilingType}) in m2`;
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

export function wallBreakdown(
    area: JsonRecord,
    scaleMmPerPx: number,
    pageHeightMm: number | null,
) {
    const totals = new Map<string, number>();
    if (area["isOutdoor"]) {
        return totals;
    }

    const points = readPoints(area["points"]);
    if (points.length < 2) {
        return totals;
    }

    const overrides: JsonRecord = isRecord(area["edgeOverrides"])
        ? area["edgeOverrides"]
        : {};

    for (let index = 0; index < points.length; index += 1) {
        const rawOverride = overrides[String(index)];
        const override: JsonRecord | null = isRecord(rawOverride)
            ? rawOverride
            : null;
        if (override && Boolean(override["noPlaster"])) {
            continue;
        }

        const wallType =
            override && typeof override["wallPlasterType"] === "string"
                ? override["wallPlasterType"]
                : readString(area["wallPlasterType"], "Recessed Edge");
        const height = wallHeightForEdge(area, pageHeightMm, index);
        const column = `${wallType} @ ${heightLabel(height)} in m`;
        const a = points[index];
        const b = points[(index + 1) % points.length];
        if (!a || !b) {
            continue;
        }

        const lengthM =
            (Math.hypot(b[0] - a[0], b[1] - a[1]) * scaleMmPerPx) / 1000;
        totals.set(column, (totals.get(column) ?? 0) + lengthM);
    }

    return totals;
}

export function wallHeightForEdge(
    area: JsonRecord,
    pageHeightMm: number | null,
    edgeIndex: number,
) {
    if (
        readString(area["ceilingMode"], "flat") === "raked" &&
        isRecord(area["rakedCeiling"])
    ) {
        const raked = area["rakedCeiling"];
        const low = readNumberOrNull(raked["lowHeightMm"]);
        const high = readNumberOrNull(raked["highHeightMm"]);
        if (low != null && high != null) {
            return edgeIndex === readInteger(raked["lowEdgeIndex"], -1)
                ? low
                : high;
        }
    }

    const areaHeight = readNumberOrNull(area["ceilingHeightMm"]);
    if (areaHeight != null) {
        return areaHeight;
    }

    return pageHeightMm ?? 0;
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
