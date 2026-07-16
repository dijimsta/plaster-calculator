import {
    OverlayGeometryHelper,
    type AreaPolygon,
    type EdgeOverride,
    type Overlay,
} from "@libraries/plaster-calculator-common";
import { useMemo } from "react";

import { normalizeCeilingBoardType } from "../lib/editor/board-materials.js";

import type { SelectedEdge } from "./use-editor-selection.js";
import type {
    EditorSummary,
    SelectionMetrics,
} from "../components/project-editor/editor-sidebar.types.js";

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
    const selectedArea = areaById(visibleAreas, selectedAreaId);
    const selectedAreas = useMemo(
        () => visibleAreas.filter((area) => selectedAreaIds.includes(area.id)),
        [selectedAreaIds, visibleAreas],
    );
    const selectedEdgeArea = areaById(visibleAreas, selectedEdge?.areaId);
    const selectedEdgeOverride = edgeOverrideFor(
        selectedEdgeArea,
        selectedEdge,
    );
    const imageWidth = imageDimension(image, overlay, "width", 1200);
    const imageHeight = imageDimension(image, overlay, "height", 900);
    const stageWidth = imageWidth * zoom;
    const stageHeight = imageHeight * zoom;

    const metrics = useMemo(() => {
        if (!selectedArea || !scaleMmPerPx) return null;
        const wallLengthM =
            (OverlayGeometryHelper.wallLengthByType(selectedArea).reduce(
                (total, item) => total + item.lengthPx,
                0,
            ) *
                scaleMmPerPx) /
            1000;
        const ceilingAreaM2 = OverlayGeometryHelper.ceilingAreaM2ForArea(
            selectedArea,
            scaleMmPerPx,
        );
        return { wallLengthM, ceilingAreaM2 };
    }, [selectedArea, scaleMmPerPx]);

    const summary = useMemo(() => {
        if (!scaleMmPerPx) return null;
        const wallTotals = new Map<string, number>();
        const ceilingTotals = new Map<string, number>();
        visibleAreas.forEach((area) => {
            OverlayGeometryHelper.wallLengthByType(area).forEach((item) => {
                wallTotals.set(
                    item.type,
                    (wallTotals.get(item.type) ?? 0) +
                        (item.lengthPx * scaleMmPerPx) / 1000,
                );
            });
            const ceilingAreaM2 = OverlayGeometryHelper.ceilingAreaM2ForArea(
                area,
                scaleMmPerPx,
            );
            const ceilingType = normalizeCeilingBoardType(
                area.ceilingPlasterType,
            );
            ceilingTotals.set(
                ceilingType,
                (ceilingTotals.get(ceilingType) ?? 0) + ceilingAreaM2,
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

function areaById(areas: AreaPolygon[], areaId: string | null | undefined) {
    return areas.find((area) => area.id === areaId) ?? null;
}

function edgeOverrideFor(
    area: AreaPolygon | null,
    selectedEdge: SelectedEdge | null,
) {
    if (!area || !selectedEdge) {
        return null;
    }

    return area.edgeOverrides?.[String(selectedEdge.edgeIndex)] ?? null;
}

function imageDimension(
    image: HTMLImageElement | null,
    overlay: Overlay,
    dimension: "height" | "width",
    fallback: number,
) {
    const imageValue =
        dimension === "width" ? image?.naturalWidth : image?.naturalHeight;
    return imageValue ?? overlay.imageSizePx?.[dimension] ?? fallback;
}
