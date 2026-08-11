import {
    OverlayGeometryHelper,
    type AreaPolygon,
} from "@libraries/plaster-calculator-common";

import type { UpdateArea } from "./use-editor-actions.types.js";
import type { SelectedEdge } from "./use-editor-selection.js";

interface CeilingActionsOptions {
    readonly ceilingHeightMm: number | null;
    readonly selectedArea: AreaPolygon | null;
    readonly selectedEdge: SelectedEdge | null;
    readonly updateArea: UpdateArea;
}

export function useEditorCeilingActions({
    ceilingHeightMm,
    selectedArea,
    selectedEdge,
    updateArea,
}: CeilingActionsOptions) {
    function setCeilingMode(mode: "flat" | "raked") {
        updateSelectedArea((area) => {
            if (mode === "flat")
                return {
                    ...area,
                    ceilingMode: "flat",
                    rakedCeiling: undefined,
                };
            const defaultHeight = OverlayGeometryHelper.effectiveFlatHeight(
                area,
                ceilingHeightMm,
            );
            return {
                ...area,
                ceilingMode: "raked",
                rakedCeiling: area.rakedCeiling ?? {
                    lowEdgeIndex: -1,
                    highEdgeIndex: -1,
                    lowHeightMm: defaultHeight,
                    highHeightMm: defaultHeight,
                },
            };
        });
    }

    function setSelectedAreaHeight(value: string) {
        updateSelectedArea((area) => ({
            ...area,
            ceilingHeightMm: value ? Number(value) : null,
        }));
    }

    function setRakedEdge(role: "low" | "high") {
        if (
            !selectedArea ||
            !selectedEdge ||
            selectedEdge.areaId !== selectedArea.id
        )
            return;
        updateSelectedArea((area) => {
            const defaultHeight = OverlayGeometryHelper.effectiveFlatHeight(
                area,
                ceilingHeightMm,
            );
            const current = area.rakedCeiling ?? {
                lowEdgeIndex: -1,
                highEdgeIndex: -1,
                lowHeightMm: defaultHeight,
                highHeightMm: defaultHeight,
            };
            return {
                ...area,
                ceilingMode: "raked",
                rakedCeiling:
                    role === "low"
                        ? { ...current, lowEdgeIndex: selectedEdge.edgeIndex }
                        : { ...current, highEdgeIndex: selectedEdge.edgeIndex },
            };
        });
    }

    function setRakedHeight(
        field: "lowHeightMm" | "highHeightMm",
        value: string,
    ) {
        updateSelectedArea((area) => {
            const defaultHeight = OverlayGeometryHelper.effectiveFlatHeight(
                area,
                ceilingHeightMm,
            );
            const current = area.rakedCeiling ?? {
                lowEdgeIndex: -1,
                highEdgeIndex: -1,
                lowHeightMm: defaultHeight,
                highHeightMm: defaultHeight,
            };
            return {
                ...area,
                ceilingMode: "raked",
                rakedCeiling: {
                    ...current,
                    [field]: value ? Number(value) : null,
                },
            };
        });
    }

    return {
        setCeilingMode,
        setRakedEdge,
        setRakedHeight,
        setSelectedAreaHeight,
    };

    function updateSelectedArea(updater: (area: AreaPolygon) => AreaPolygon) {
        if (!selectedArea) return;
        updateArea(selectedArea.id, updater);
    }
}
