import {
    normalizeCeilingBoardType,
    normalizeWallBoardProfile,
    normalizeWallBoardType,
} from "../lib/editor/board-materials.js";

import type { AreaPolygon, EdgeOverride, Overlay } from "../types.js";
import type { UpdateArea } from "./use-editor-actions.types.js";
import type { SelectedEdge } from "./use-editor-selection.js";

export type MaterialField =
    "wallBoardProfile" | "wallBoardType" | "ceilingPlasterType";

interface MaterialActionsOptions {
    readonly commit: (next: Overlay) => void;
    readonly overlay: Overlay;
    readonly selectedArea: AreaPolygon | null;
    readonly selectedAreaIds: string[];
    readonly selectedAreas: AreaPolygon[];
    readonly selectedEdge: SelectedEdge | null;
    readonly updateArea: UpdateArea;
}

export function useEditorMaterialActions({
    commit,
    overlay,
    selectedArea,
    selectedAreaIds,
    selectedAreas,
    selectedEdge,
    updateArea,
}: MaterialActionsOptions) {
    function setMaterial(field: MaterialField, value: string) {
        const targetIds =
            selectedAreaIds.length > 0
                ? selectedAreaIds
                : selectedArea
                  ? [selectedArea.id]
                  : [];
        if (targetIds.length === 0) return;
        commit({
            ...overlay,
            areas: overlay.areas.map((area) => {
                if (!targetIds.includes(area.id)) return area;
                if (field !== "ceilingPlasterType" && area.isOutdoor)
                    return area;
                return { ...area, [field]: value };
            }),
        });
    }

    function toggleOutdoor() {
        if (!selectedArea) return;
        updateArea(selectedArea.id, (area) => {
            const isOutdoor = !area.isOutdoor;
            return {
                ...area,
                isOutdoor,
                ceilingPlasterType: isOutdoor
                    ? "Water Resistant"
                    : area.ceilingPlasterType,
            };
        });
    }

    function commonMaterialValue(field: MaterialField) {
        const values = selectedAreas.map((area) => materialValue(area, field));
        if (values.length === 0) return "";
        return values.every((value) => value === values[0])
            ? (values[0] ?? "")
            : "";
    }

    function setSelectedEdgeMaterial(
        field: "wallBoardProfile" | "wallBoardType",
        value: string,
    ) {
        updateSelectedEdgeOverride((override) => ({
            ...override,
            [field]: value,
            noPlaster: false,
        }));
    }

    function setSelectedEdgeNoPlaster(noPlaster: boolean) {
        updateSelectedEdgeOverride((override) => ({ ...override, noPlaster }));
    }

    function clearSelectedEdgeOverride() {
        updateSelectedEdgeOverride((override) =>
            override.noPlaster ? { noPlaster: true } : null,
        );
    }

    return {
        clearSelectedEdgeOverride,
        commonMaterialValue,
        setMaterial,
        setSelectedEdgeMaterial,
        setSelectedEdgeNoPlaster,
        toggleOutdoor,
    };

    function updateSelectedEdgeOverride(
        updater: (override: EdgeOverride) => EdgeOverride | null,
    ) {
        if (!selectedEdge) return;
        updateArea(selectedEdge.areaId, (area) => {
            const key = String(selectedEdge.edgeIndex);
            const nextOverrides = { ...(area.edgeOverrides ?? {}) };
            const nextOverride = updater(nextOverrides[key] ?? {});
            if (
                nextOverride &&
                (nextOverride.wallBoardProfile ||
                    nextOverride.wallBoardType ||
                    nextOverride.wallPlasterType ||
                    nextOverride.noPlaster)
            ) {
                nextOverrides[key] = nextOverride;
            } else {
                delete nextOverrides[key];
            }
            return {
                ...area,
                edgeOverrides: Object.keys(nextOverrides).length
                    ? nextOverrides
                    : undefined,
            };
        });
    }
}

function materialValue(area: AreaPolygon, field: MaterialField) {
    if (field === "ceilingPlasterType") {
        return normalizeCeilingBoardType(area.ceilingPlasterType);
    }
    if (field === "wallBoardProfile") {
        return normalizeWallBoardProfile(area.wallBoardProfile);
    }

    return normalizeWallBoardType(area.wallBoardType, area.wallPlasterType);
}
