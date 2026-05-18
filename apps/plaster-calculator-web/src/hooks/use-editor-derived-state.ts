import { useMemo } from "react";

import {
    ceilingAreaM2ForArea,
    wallLengthByType,
} from "../lib/editor/overlay-geometry.js";

import type { SelectedEdge } from "./use-editor-selection.js";
import type {
    EditorSummary,
    SelectionMetrics,
} from "../components/project-editor/editor-sidebar.types.js";
import type { AreaPolygon, EdgeOverride, Overlay } from "../types.js";

interface EditorDerivedStateOptions {
    readonly image: HTMLImageElement | null;
    readonly overlay: Overlay;
    readonly scaleMmPerPx: number | null;
    readonly selectedAreaId: string | null;
    readonly selectedAreaIds: string[];
    readonly selectedEdge: SelectedEdge | null;
    readonly zoom: number;
}

interface EditorDerivedState {
    readonly selectedArea: AreaPolygon | null;
    readonly visibleAreas: AreaPolygon[];
    readonly selectedAreas: AreaPolygon[];
    readonly selectedEdgeArea: AreaPolygon | null;
    readonly selectedEdgeOverride: EdgeOverride | null;
    readonly imageWidth: number;
    readonly imageHeight: number;
    readonly stageWidth: number;
    readonly stageHeight: number;
    readonly metrics: SelectionMetrics | null;
    readonly summary: EditorSummary | null;
}

export function useEditorDerivedState({
    image,
    overlay,
    scaleMmPerPx,
    selectedAreaId,
    selectedAreaIds,
    selectedEdge,
    zoom,
}: EditorDerivedStateOptions): EditorDerivedState {
    const visibleAreas = useMemo(
        () => overlay.areas.filter((area) => !area.deleted),
        [overlay.areas],
    );
    const selectedArea =
        visibleAreas.find((area) => area.id === selectedAreaId) ?? null;
    const selectedAreas = useMemo(
        () => visibleAreas.filter((area) => selectedAreaIds.includes(area.id)),
        [selectedAreaIds, visibleAreas],
    );
    const selectedEdgeArea =
        visibleAreas.find((area) => area.id === selectedEdge?.areaId) ?? null;
    const selectedEdgeOverride =
        selectedEdgeArea && selectedEdge
            ? (selectedEdgeArea.edgeOverrides?.[
                  String(selectedEdge.edgeIndex)
              ] ?? null)
            : null;
    const imageWidth =
        image?.naturalWidth ?? overlay.imageSizePx?.width ?? 1200;
    const imageHeight =
        image?.naturalHeight ?? overlay.imageSizePx?.height ?? 900;
    const stageWidth = imageWidth * zoom;
    const stageHeight = imageHeight * zoom;

    const metrics = useMemo(() => {
        if (!selectedArea || !scaleMmPerPx) return null;
        const wallLengthM =
            (wallLengthByType(selectedArea).reduce(
                (total, item) => total + item.lengthPx,
                0,
            ) *
                scaleMmPerPx) /
            1000;
        const ceilingAreaM2 = ceilingAreaM2ForArea(selectedArea, scaleMmPerPx);
        return { wallLengthM, ceilingAreaM2 };
    }, [selectedArea, scaleMmPerPx]);

    const summary = useMemo(() => {
        if (!scaleMmPerPx) return null;
        const wallTotals = new Map<string, number>();
        const ceilingTotals = new Map<string, number>();
        visibleAreas.forEach((area) => {
            wallLengthByType(area).forEach((item) => {
                wallTotals.set(
                    item.type,
                    (wallTotals.get(item.type) ?? 0) +
                        (item.lengthPx * scaleMmPerPx) / 1000,
                );
            });
            const ceilingAreaM2 = ceilingAreaM2ForArea(area, scaleMmPerPx);
            ceilingTotals.set(
                area.ceilingPlasterType,
                (ceilingTotals.get(area.ceilingPlasterType) ?? 0) +
                    ceilingAreaM2,
            );
        });
        return {
            wallTotals: Array.from(wallTotals.entries()).filter(
                ([, total]) => total > 0,
            ),
            ceilingTotals: Array.from(ceilingTotals.entries()).filter(
                ([, total]) => total > 0,
            ),
        };
    }, [scaleMmPerPx, visibleAreas]);

    return {
        selectedArea,
        visibleAreas,
        selectedAreas,
        selectedEdgeArea,
        selectedEdgeOverride,
        imageWidth,
        imageHeight,
        stageWidth,
        stageHeight,
        metrics,
        summary,
    };
}
