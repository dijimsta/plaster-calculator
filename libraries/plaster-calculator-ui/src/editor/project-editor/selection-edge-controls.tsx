import {
    normalizeWallBoardProfile,
    normalizeWallBoardType,
    WALL_BOARD_PROFILES,
    WALL_BOARD_TYPES,
} from "@libraries/plaster-calculator-common";
import type {
    AreaPolygon,
    EdgeOverride,
} from "@libraries/plaster-calculator-common";
import { Box, Button, Checkbox, Label } from "@libraries/uikit-web";
import { useId } from "react";
import type { ReactNode } from "react";

import { useEditorTranslation } from "../i18n/index.js";

import { cx, ui } from "./project-editor.styles.js";
import { MaterialSelect } from "./selection-board-controls.js";
import type { SelectedEdge } from "./use-editor-selection.js";

type SelectedEdgeControlsProps = {
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
};

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
    const { t } = useEditorTranslation();
    const noPlasterCheckboxId = useId();
    const wallTypeDisabled = isEdgeWallTypeDisabled(
        selectedEdgeOverride,
        selectedEdgeArea,
    );

    return (
        <>
            {/* `ui.metric` is a deliberately-kept gap -- see
                `project-editor.styles.ts`. */}
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
            <Box align="center" gap="sm">
                <Checkbox
                    id={noPlasterCheckboxId}
                    checked={isNoPlaster(selectedEdgeOverride)}
                    onChange={(event) =>
                        setSelectedEdgeNoPlaster(event.target.checked)
                    }
                />
                <Label htmlFor={noPlasterCheckboxId}>No plaster</Label>
            </Box>
            {/* `className="contents"` + `"opacity-60"` are a
                deliberately-kept gap, same as the toolbar's fieldset (see
                `editor-toolbar.tsx`): the native `<fieldset disabled>`
                cascade-disables both selects below when the edge's wall
                type doesn't apply, and `contents` neutralizes its default
                block box; `opacity-60` dims the pair to match. UIKit has no
                "disable a group of children" primitive. */}
            <fieldset
                className={cx("contents", wallTypeDisabled && "opacity-60")}
                disabled={wallTypeDisabled}
            >
                <MaterialSelect
                    label={t("selectionBoardControls.wallProfileLabel")}
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
                    label={t("selectionBoardControls.wallBoardLabel")}
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
    return normalizeWallBoardType(
        edgeOverride?.wallBoardType ?? selectedEdgeArea.wallBoardType,
        edgeOverride?.wallPlasterType ?? selectedEdgeArea.wallPlasterType,
    );
}

function selectedEdgeWallProfile(
    edgeOverride: EdgeOverride | undefined | null,
    selectedEdgeArea: AreaPolygon,
) {
    return normalizeWallBoardProfile(
        edgeOverride?.wallBoardProfile ?? selectedEdgeArea.wallBoardProfile,
    );
}

function isEdgeWallTypeDisabled(
    edgeOverride: EdgeOverride | undefined | null,
    selectedEdgeArea: AreaPolygon,
) {
    return isNoPlaster(edgeOverride) || Boolean(selectedEdgeArea.isOutdoor);
}
