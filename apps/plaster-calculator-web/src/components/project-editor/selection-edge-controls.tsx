import { BOARD_TYPES } from "../../lib/editor/board-materials.js";
import { cx, ui } from "../../lib/styles.js";

import type { SelectedEdge } from "../../hooks/use-editor-selection.js";
import type { AreaPolygon, EdgeOverride } from "../../types.js";
import type { ReactNode } from "react";

interface SelectedEdgeControlsProps {
    readonly clearSelectedEdgeOverride: () => void;
    readonly renderCeilingControls: (area: AreaPolygon) => ReactNode;
    readonly selectedArea: AreaPolygon | null;
    readonly selectedAreaIds: string[];
    readonly selectedEdge: SelectedEdge;
    readonly selectedEdgeArea: AreaPolygon;
    readonly selectedEdgeOverride: EdgeOverride | undefined | null;
    readonly setSelectedEdgeMaterial: (value: string) => void;
    readonly setSelectedEdgeNoPlaster: (noPlaster: boolean) => void;
}

export function SelectedEdgeControls({
    clearSelectedEdgeOverride,
    renderCeilingControls,
    selectedArea,
    selectedAreaIds,
    selectedEdge,
    selectedEdgeArea,
    selectedEdgeOverride,
    setSelectedEdgeMaterial,
    setSelectedEdgeNoPlaster,
}: SelectedEdgeControlsProps) {
    return (
        <>
            <div className={ui.metric}>
                Edge {selectedEdge.edgeIndex + 1} selected in{" "}
                {selectedEdgeArea.label}
            </div>
            <SelectedEdgeCeilingControls
                renderCeilingControls={renderCeilingControls}
                selectedArea={selectedArea}
                selectedAreaIds={selectedAreaIds}
                selectedEdgeArea={selectedEdgeArea}
            />
            <label className={cx(ui.button, ui.buttonDefault, "justify-start")}>
                <input
                    type="checkbox"
                    checked={isNoPlaster(selectedEdgeOverride)}
                    onChange={(event) =>
                        setSelectedEdgeNoPlaster(event.target.checked)
                    }
                />
                No plaster
            </label>
            <div className={ui.field}>
                <label>Wall board</label>
                <select
                    className={ui.input}
                    value={selectedEdgeWallType(
                        selectedEdgeOverride,
                        selectedEdgeArea,
                    )}
                    onChange={(event) =>
                        setSelectedEdgeMaterial(event.target.value)
                    }
                    disabled={isEdgeWallTypeDisabled(
                        selectedEdgeOverride,
                        selectedEdgeArea,
                    )}
                >
                    {BOARD_TYPES.map((type) => (
                        <option key={type}>{type}</option>
                    ))}
                </select>
            </div>
            <button
                className={cx(ui.button, ui.buttonDefault)}
                onClick={clearSelectedEdgeOverride}
                disabled={!selectedEdgeOverride}
            >
                Clear override
            </button>
        </>
    );
}

function SelectedEdgeCeilingControls({
    renderCeilingControls,
    selectedArea,
    selectedAreaIds,
    selectedEdgeArea,
}: Pick<
    SelectedEdgeControlsProps,
    "renderCeilingControls" | "selectedArea" | "selectedAreaIds"
> & {
    selectedEdgeArea: AreaPolygon;
}) {
    if (!selectedArea || selectedAreaIds.length !== 1) {
        return null;
    }

    if (selectedArea.id !== selectedEdgeArea.id) {
        return null;
    }

    return renderCeilingControls(selectedArea);
}

function isNoPlaster(edgeOverride: EdgeOverride | undefined | null) {
    return Boolean(edgeOverride?.noPlaster);
}

function selectedEdgeWallType(
    edgeOverride: EdgeOverride | undefined | null,
    selectedEdgeArea: AreaPolygon,
) {
    return edgeOverride?.wallPlasterType ?? selectedEdgeArea.wallPlasterType;
}

function isEdgeWallTypeDisabled(
    edgeOverride: EdgeOverride | undefined | null,
    selectedEdgeArea: AreaPolygon,
) {
    return isNoPlaster(edgeOverride) || Boolean(selectedEdgeArea.isOutdoor);
}
