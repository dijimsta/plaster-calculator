type JsonRecord = Record<string, unknown>;
type Point = [number, number];

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
        const line = wallBreakdownLine(
            area,
            points,
            overrides,
            scaleMmPerPx,
            index,
        );
        if (!line) {
            continue;
        }

        const height = wallHeightForEdge(area, pageHeightMm, index);
        const column = `${line.wallType} @ ${heightLabel(height)} in m`;
        totals.set(column, (totals.get(column) ?? 0) + line.lengthM);
    }

    return totals;
}

function wallBreakdownLine(
    area: JsonRecord,
    points: Point[],
    overrides: JsonRecord,
    scaleMmPerPx: number,
    index: number,
) {
    const override = edgeOverride(overrides, index);
    if (override && Boolean(override["noPlaster"])) {
        return null;
    }

    const a = points[index];
    const b = points[(index + 1) % points.length];
    if (!a || !b) {
        return null;
    }

    return {
        lengthM: edgeLengthM(a, b, scaleMmPerPx),
        wallType: edgeWallType(area, override),
    };
}

function edgeOverride(overrides: JsonRecord, index: number) {
    const rawOverride = overrides[String(index)];
    return isRecord(rawOverride) ? rawOverride : null;
}

function edgeWallType(area: JsonRecord, override: JsonRecord | null) {
    if (typeof override?.["wallPlasterType"] === "string") {
        return override["wallPlasterType"];
    }

    return readString(area["wallPlasterType"], "Recessed Edge");
}

function edgeLengthM(a: Point, b: Point, scaleMmPerPx: number) {
    return (Math.hypot(b[0] - a[0], b[1] - a[1]) * scaleMmPerPx) / 1000;
}

function wallHeightForEdge(
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
    return areaHeight ?? pageHeightMm ?? 0;
}

function readPoints(value: unknown): Point[] {
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

function isRecord(value: unknown): value is JsonRecord {
    return typeof value === "object" && value !== null && !Array.isArray(value);
}

function readString(value: unknown, fallback: string) {
    return typeof value === "string" ? value : fallback;
}

function readInteger(value: unknown, fallback: number) {
    return typeof value === "number" && Number.isInteger(value)
        ? value
        : fallback;
}

function readNumberOrNull(value: unknown) {
    return typeof value === "number" && Number.isFinite(value) ? value : null;
}

function heightLabel(heightMm: number) {
    return `${heightMm.toFixed(0)}mm`;
}
