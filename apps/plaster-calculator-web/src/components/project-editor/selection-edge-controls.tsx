import {
    BoardMaterialsHelper,
    WALL_BOARD_PROFILES,
    WALL_BOARD_TYPES,
} from "@libraries/plaster-calculator-common";
import { Button } from "@libraries/uikit-web";

import { MaterialSelect } from "./selection-board-controls.js";
import { cx, ui } from "../../lib/styles.js";

import type { SelectedEdge } from "../../hooks/use-editor-selection.js";
import type {
    AreaPolygon,
    EdgeOverride,
} from "@libraries/plaster-calculator-common";
import type { ReactNode } from "react";

interface SelectedEdgeControlsProps {
    readonly clearSelectedEdgeOverride: () => void;
    readonly renderCeilingControls: (area: AreaPolygon) => ReactNode;
    readonly selectedArea: AreaPolygon | null;
    readonly selectedAreaIds: string[];
    readonly selectedEdge: SelectedEdge;
    readonly selectedEdgeArea: AreaPolygon;
    readonly selectedEdgeOverride: EdgeOverride | undefined | null;
    readonly setSelectedEdgeMaterial: (
        field: "wallBoardProfile" | "wallBoardType",
        value: string,
    ) => void;
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
            <fieldset
                className={cx(
                    "contents",
                    isEdgeWallTypeDisabled(
                        selectedEdgeOverride,
                        selectedEdgeArea,
                    ) && "opacity-60",
                )}
                disabled={isEdgeWallTypeDisabled(
                    selectedEdgeOverride,
                    selectedEdgeArea,
                )}
            >
                <MaterialSelect
                    label="Wall profile"
                    options={WALL_BOARD_PROFILES}
                    value={selectedEdgeWallProfile(
                        selectedEdgeOverride,
                        selectedEdgeArea,
                    )}
                    onChange={(value) =>
                        setSelectedEdgeMaterial("wallBoardProfile", value)
                    }
                />
                <MaterialSelect
                    label="Wall board"
                    options={WALL_BOARD_TYPES}
                    value={selectedEdgeWallType(
                        selectedEdgeOverride,
                        selectedEdgeArea,
                    )}
                    onChange={(value) =>
                        setSelectedEdgeMaterial("wallBoardType", value)
                    }
                />
            </fieldset>
            <Button
                variant="secondary"
                onClick={clearSelectedEdgeOverride}
                disabled={!selectedEdgeOverride}
            >
                Clear override
            </Button>
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
    return BoardMaterialsHelper.normalizeWallBoardType(
        edgeOverride?.wallBoardType ?? selectedEdgeArea.wallBoardType,
        edgeOverride?.wallPlasterType ?? selectedEdgeArea.wallPlasterType,
    );
}

function selectedEdgeWallProfile(
    edgeOverride: EdgeOverride | undefined | null,
    selectedEdgeArea: AreaPolygon,
) {
    return BoardMaterialsHelper.normalizeWallBoardProfile(
        edgeOverride?.wallBoardProfile ?? selectedEdgeArea.wallBoardProfile,
    );
}

function isEdgeWallTypeDisabled(
    edgeOverride: EdgeOverride | undefined | null,
    selectedEdgeArea: AreaPolygon,
) {
    return isNoPlaster(edgeOverride) || Boolean(selectedEdgeArea.isOutdoor);
}
