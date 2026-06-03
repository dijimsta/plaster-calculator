import { Line } from "react-konva";

import {
    colorFor,
    normalizeWallBoardType,
} from "../../lib/editor/board-materials.js";
import { pointAt } from "../../lib/editor/overlay-geometry.js";
import { activeTheme } from "../../lib/styles.js";

import type { OverlayMode } from "./project-editor.types.js";
import type { SelectedEdge } from "../../hooks/use-editor-selection.js";
import type { AreaPolygon, EdgeOverride } from "../../types.js";

const SELECTED_COLOR = activeTheme.editor.selected;
const LOW_EDGE_COLOR = activeTheme.editor.lowEdge;
const HIGH_EDGE_COLOR = activeTheme.editor.highEdge;

type RakedEdgeRole = "low" | "high" | null;

interface CanvasWallEdgesProps {
    readonly overlayMode: OverlayMode;
    readonly selectedAreaIds: string[];
    readonly selectedEdge: SelectedEdge | null;
    readonly selectedPoint: number | null;
    readonly selectedPointIndexes: number[];
    readonly visibleAreas: AreaPolygon[];
    readonly zoom: number;
}

export function CanvasWallEdges({
    overlayMode,
    selectedAreaIds,
    selectedEdge,
    selectedPoint,
    selectedPointIndexes,
    visibleAreas,
    zoom,
}: CanvasWallEdgesProps) {
    const areaSelectionEnabled =
        selectedPoint == null && selectedPointIndexes.length === 0;

    return (
        <>
            {visibleAreas.map((area) =>
                area.points.map((point, index) => {
                    const nextIndex = (index + 1) % area.points.length;
                    const next = pointAt(area.points, nextIndex);
                    const override = area.edgeOverrides?.[String(index)];
                    const selectedStroke = isSelectedStroke({
                        area,
                        areaSelectionEnabled,
                        edgeIndex: index,
                        selectedAreaIds,
                        selectedEdge,
                    });
                    const noPlaster = override?.noPlaster === true;
                    const rakedEdgeRole = getRakedEdgeRole(area, index);
                    const edgeColor = getEdgeColor(
                        rakedEdgeRole,
                        noPlaster,
                        normalizeWallBoardType(
                            override?.wallBoardType ?? area.wallBoardType,
                            override?.wallPlasterType ?? area.wallPlasterType,
                        ),
                    );
                    return (
                        <Line
                            key={`edge-visible-${area.id}-${index}`}
                            points={[point[0], point[1], next[0], next[1]]}
                            stroke={getStroke(
                                overlayMode,
                                area,
                                selectedStroke,
                                edgeColor,
                            )}
                            strokeWidth={getStrokeWidth(
                                selectedStroke,
                                rakedEdgeRole,
                                override,
                                zoom,
                            )}
                            dash={noPlaster ? [10 / zoom, 7 / zoom] : undefined}
                            opacity={noPlaster ? 0.7 : 1}
                            listening={false}
                        />
                    );
                }),
            )}
        </>
    );
}

function isSelectedStroke({
    area,
    areaSelectionEnabled,
    edgeIndex,
    selectedAreaIds,
    selectedEdge,
}: {
    readonly area: AreaPolygon;
    readonly areaSelectionEnabled: boolean;
    readonly edgeIndex: number;
    readonly selectedAreaIds: string[];
    readonly selectedEdge: SelectedEdge | null;
}): boolean {
    if (selectedEdge) {
        return (
            selectedEdge.areaId === area.id &&
            selectedEdge.edgeIndex === edgeIndex
        );
    }

    return areaSelectionEnabled && selectedAreaIds.includes(area.id);
}

function getRakedEdgeRole(area: AreaPolygon, edgeIndex: number): RakedEdgeRole {
    if (area.ceilingMode !== "raked") return null;
    if (area.rakedCeiling?.lowEdgeIndex === edgeIndex) return "low";
    if (area.rakedCeiling?.highEdgeIndex === edgeIndex) return "high";

    return null;
}

function getEdgeColor(
    rakedEdgeRole: RakedEdgeRole,
    noPlaster: boolean,
    wallType: string,
): string {
    if (rakedEdgeRole === "low") return LOW_EDGE_COLOR;
    if (rakedEdgeRole === "high") return HIGH_EDGE_COLOR;
    if (noPlaster) return activeTheme.editor.noPlaster;

    return colorFor(wallType).edge;
}

function getStroke(
    overlayMode: OverlayMode,
    area: AreaPolygon,
    selectedStroke: boolean,
    edgeColor: string,
): string {
    if (overlayMode === "ceilings" || area.isOutdoor) return "transparent";
    if (selectedStroke) return SELECTED_COLOR;

    return edgeColor;
}

function getStrokeWidth(
    selectedStroke: boolean,
    rakedEdgeRole: RakedEdgeRole,
    override: EdgeOverride | undefined,
    zoom: number,
): number {
    if (selectedStroke || rakedEdgeRole) return 6 / zoom;
    if (override) return 4 / zoom;

    return 3 / zoom;
}
