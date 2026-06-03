import type { AreaPolygon, EdgeOverride } from "../../types.js";

export function cleanOverrides(
    overrides: Record<string, EdgeOverride>,
): Record<string, EdgeOverride> | undefined {
    const cleaned = Object.fromEntries(
        Object.entries(overrides).filter(
            ([, override]) =>
                override.noPlaster ||
                override.wallBoardProfile ||
                override.wallBoardType ||
                override.wallPlasterType,
        ),
    ) as Record<string, EdgeOverride>;
    return Object.keys(cleaned).length ? cleaned : undefined;
}

export function edgeOverridesAfterInsert(
    overrides: Record<string, EdgeOverride> | undefined,
    anchorIndex: number,
): Record<string, EdgeOverride> | undefined {
    if (!overrides) return undefined;
    const next: Record<string, EdgeOverride> = {};
    Object.entries(overrides).forEach(([key, override]) => {
        const index = Number(key);
        if (!Number.isInteger(index)) return;
        if (index < anchorIndex) next[String(index)] = { ...override };
        if (index === anchorIndex) {
            next[String(index)] = { ...override };
            next[String(index + 1)] = { ...override };
        }
        if (index > anchorIndex) next[String(index + 1)] = { ...override };
    });
    return cleanOverrides(next);
}

export function edgeOverridesAfterRemoveMany(
    overrides: Record<string, EdgeOverride> | undefined,
    removed: Set<number>,
    pointCount: number,
): Record<string, EdgeOverride> | undefined {
    if (!overrides) return undefined;
    const next: Record<string, EdgeOverride> = {};
    const indexMap = new Map<number, number>();
    let nextIndex = 0;
    for (let index = 0; index < pointCount; index += 1) {
        if (!removed.has(index)) {
            indexMap.set(index, nextIndex);
            nextIndex += 1;
        }
    }
    Object.entries(overrides).forEach(([key, override]) => {
        const index = Number(key);
        if (!Number.isInteger(index)) return;
        const startRemoved = removed.has(index);
        const endRemoved = removed.has((index + 1) % pointCount);
        if (startRemoved || endRemoved) return;
        const mapped = indexMap.get(index);
        if (mapped == null) return;
        next[String(mapped)] = { ...override };
    });
    return cleanOverrides(next);
}

export function rakedAfterPointRemoval(
    area: AreaPolygon,
    removed: Set<number>,
): AreaPolygon["rakedCeiling"] | undefined {
    if (!area.rakedCeiling) return undefined;
    const mapEdge = (edgeIndex: number): number | null => {
        if (
            removed.has(edgeIndex) ||
            removed.has((edgeIndex + 1) % area.points.length)
        )
            return null;
        let nextIndex = 0;
        for (let index = 0; index < edgeIndex; index += 1) {
            if (!removed.has(index)) nextIndex += 1;
        }
        return nextIndex;
    };
    const lowEdgeIndex = mapEdge(area.rakedCeiling.lowEdgeIndex);
    const highEdgeIndex = mapEdge(area.rakedCeiling.highEdgeIndex);
    if (
        lowEdgeIndex == null ||
        highEdgeIndex == null ||
        lowEdgeIndex === highEdgeIndex
    )
        return undefined;
    return { ...area.rakedCeiling, lowEdgeIndex, highEdgeIndex };
}

export function splitEdgeOverrides(
    area: AreaPolygon,
    start: number,
    end: number,
    part: "first" | "second",
): Record<string, EdgeOverride> | undefined {
    const overrides = area.edgeOverrides;
    if (!overrides) return undefined;
    const next: Record<string, EdgeOverride> = {};
    if (part === "first") {
        for (let oldIndex = start; oldIndex < end; oldIndex += 1) {
            const override = cloneOverride(overrides[String(oldIndex)]);
            if (override) next[String(oldIndex - start)] = override;
        }
        return cleanOverrides(next);
    }
    for (let oldIndex = end; oldIndex < area.points.length; oldIndex += 1) {
        const override = cloneOverride(overrides[String(oldIndex)]);
        if (override) next[String(oldIndex - end)] = override;
    }
    for (let oldIndex = 0; oldIndex < start; oldIndex += 1) {
        const override = cloneOverride(overrides[String(oldIndex)]);
        if (override)
            next[String(area.points.length - end + oldIndex)] = override;
    }
    return cleanOverrides(next);
}

function cloneOverride(
    override: EdgeOverride | undefined,
): EdgeOverride | undefined {
    return override ? { ...override } : undefined;
}
