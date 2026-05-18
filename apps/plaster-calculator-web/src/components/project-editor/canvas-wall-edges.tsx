import { Line } from "react-konva";
import type { AreaPolygon } from "../../types.js";
import { activeTheme } from "../../lib/styles.js";
import { colorFor } from "../../lib/editor/board-materials.js";
import { pointAt } from "../../lib/editor/overlay-geometry.js";
import type { OverlayMode } from "./project-editor.types.js";
import type { SelectedEdge } from "../../hooks/use-editor-selection.js";

const SELECTED_COLOR = activeTheme.editor.selected;
const LOW_EDGE_COLOR = activeTheme.editor.lowEdge;
const HIGH_EDGE_COLOR = activeTheme.editor.highEdge;

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
    return (
        <>
            {visibleAreas.map((area) =>
                area.points.map((point, index) => {
                    const nextIndex = (index + 1) % area.points.length;
                    const next = pointAt(area.points, nextIndex);
                    const override = area.edgeOverrides?.[String(index)];
                    const edgeSelected =
                        selectedEdge?.areaId === area.id &&
                        selectedEdge.edgeIndex === index;
                    const areaSelected =
                        selectedAreaIds.includes(area.id) &&
                        selectedPoint == null &&
                        selectedPointIndexes.length === 0;
                    const selectedStroke =
                        edgeSelected || (!selectedEdge && areaSelected);
                    const noPlaster = !!override?.noPlaster;
                    const wallType =
                        override?.wallPlasterType ?? area.wallPlasterType;
                    const lowRakedEdge =
                        area.ceilingMode === "raked" &&
                        area.rakedCeiling?.lowEdgeIndex === index;
                    const highRakedEdge =
                        area.ceilingMode === "raked" &&
                        area.rakedCeiling?.highEdgeIndex === index;
                    const edgeColor = lowRakedEdge
                        ? LOW_EDGE_COLOR
                        : highRakedEdge
                          ? HIGH_EDGE_COLOR
                          : noPlaster
                            ? activeTheme.editor.noPlaster
                            : colorFor(wallType).edge;
                    return (
                        <Line
                            key={`edge-visible-${area.id}-${index}`}
                            points={[point[0], point[1], next[0], next[1]]}
                            stroke={
                                overlayMode === "ceilings" || area.isOutdoor
                                    ? "transparent"
                                    : selectedStroke
                                      ? SELECTED_COLOR
                                      : edgeColor
                            }
                            strokeWidth={
                                (selectedStroke || lowRakedEdge || highRakedEdge
                                    ? 6
                                    : override
                                      ? 4
                                      : 3) / zoom
                            }
                            dash={
                                noPlaster ? [10 / zoom, 7 / zoom] : undefined
                            }
                            opacity={noPlaster ? 0.7 : 1}
                            listening={false}
                        />
                    );
                }),
            )}
        </>
    );
}
