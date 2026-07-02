import { BoardControls, MaterialSelect } from "./selection-board-controls.js";
import { SelectedEdgeControls } from "./selection-edge-controls.js";
import {
    CEILING_BOARD_TYPES,
    WALL_BOARD_PROFILES,
    WALL_BOARD_TYPES,
} from "../../lib/editor/board-materials.js";
import { cx, ui } from "../../lib/styles.js";

import type { SelectionMetrics } from "./editor-sidebar.types.js";
import type { MaterialField } from "../../hooks/use-editor-material-actions.js";
import type { SelectedEdge } from "../../hooks/use-editor-selection.js";
import type { ValidationIssue } from "../../lib/validation.js";
import type { AreaPolygon, EdgeOverride } from "../../types.js";
import type { ReactNode } from "react";

interface SelectionPanelProps {
    readonly areaIssue: (
        areaId: string,
        field: ValidationIssue["field"],
    ) => string;
    readonly clearSelectedEdgeOverride: () => void;
    readonly commonMaterialValue: (field: MaterialField) => string;
    readonly fieldError: (message: string) => ReactNode;
    readonly metrics: SelectionMetrics | null;
    readonly renderCeilingControls: (area: AreaPolygon) => ReactNode;
    readonly selectedArea: AreaPolygon | null;
    readonly selectedAreaIds: string[];
    readonly selectedEdge: SelectedEdge | null;
    readonly selectedEdgeArea: AreaPolygon | null;
    readonly selectedEdgeOverride: EdgeOverride | undefined | null;
    readonly selectedPointIndexes: number[];
    readonly setMaterial: (field: MaterialField, value: string) => void;
    readonly setSelectedEdgeMaterial: (
        field: "wallBoardProfile" | "wallBoardType",
        value: string,
    ) => void;
    readonly setSelectedEdgeNoPlaster: (noPlaster: boolean) => void;
    readonly toggleOutdoor: () => void;
    readonly updateArea: (
        areaId: string,
        updater: (area: AreaPolygon) => AreaPolygon,
    ) => void;
}

export function SelectionPanel({
    areaIssue,
    clearSelectedEdgeOverride,
    commonMaterialValue,
    fieldError,
    metrics,
    renderCeilingControls,
    selectedArea,
    selectedAreaIds,
    selectedEdge,
    selectedEdgeArea,
    selectedEdgeOverride,
    selectedPointIndexes,
    setMaterial,
    setSelectedEdgeMaterial,
    setSelectedEdgeNoPlaster,
    toggleOutdoor,
    updateArea,
}: SelectionPanelProps) {
    return (
        <div className={ui.stack}>
            <SelectionPanelContent
                areaIssue={areaIssue}
                clearSelectedEdgeOverride={clearSelectedEdgeOverride}
                commonMaterialValue={commonMaterialValue}
                fieldError={fieldError}
                metrics={metrics}
                renderCeilingControls={renderCeilingControls}
                selectedArea={selectedArea}
                selectedAreaIds={selectedAreaIds}
                selectedEdge={selectedEdge}
                selectedEdgeArea={selectedEdgeArea}
                selectedEdgeOverride={selectedEdgeOverride}
                selectedPointIndexes={selectedPointIndexes}
                setMaterial={setMaterial}
                setSelectedEdgeMaterial={setSelectedEdgeMaterial}
                setSelectedEdgeNoPlaster={setSelectedEdgeNoPlaster}
                toggleOutdoor={toggleOutdoor}
                updateArea={updateArea}
            />
        </div>
    );
}

function SelectionPanelContent({
    areaIssue,
    clearSelectedEdgeOverride,
    commonMaterialValue,
    fieldError,
    metrics,
    renderCeilingControls,
    selectedArea,
    selectedAreaIds,
    selectedEdge,
    selectedEdgeArea,
    selectedEdgeOverride,
    selectedPointIndexes,
    setMaterial,
    setSelectedEdgeMaterial,
    setSelectedEdgeNoPlaster,
    toggleOutdoor,
    updateArea,
}: SelectionPanelProps) {
    if (!selectedArea && !selectedEdgeArea) {
        return (
            <p className={ui.muted}>
                Select an area to edit labels and board types.
            </p>
        );
    }

    if (selectedEdgeArea && selectedEdge) {
        return (
            <SelectedEdgeControls
                clearSelectedEdgeOverride={clearSelectedEdgeOverride}
                renderCeilingControls={renderCeilingControls}
                selectedArea={selectedArea}
                selectedAreaIds={selectedAreaIds}
                selectedEdge={selectedEdge}
                selectedEdgeArea={selectedEdgeArea}
                selectedEdgeOverride={selectedEdgeOverride}
                setSelectedEdgeMaterial={setSelectedEdgeMaterial}
                setSelectedEdgeNoPlaster={setSelectedEdgeNoPlaster}
            />
        );
    }

    if (selectedArea && selectedAreaIds.length > 1) {
        return (
            <MultiAreaControls
                commonMaterialValue={commonMaterialValue}
                selectedAreaIds={selectedAreaIds}
                setMaterial={setMaterial}
            />
        );
    }

    if (!selectedArea) return null;
    return (
        <SingleAreaControls
            areaIssue={areaIssue}
            fieldError={fieldError}
            metrics={metrics}
            renderCeilingControls={renderCeilingControls}
            selectedArea={selectedArea}
            selectedPointIndexes={selectedPointIndexes}
            setMaterial={setMaterial}
            toggleOutdoor={toggleOutdoor}
            updateArea={updateArea}
        />
    );
}

function MultiAreaControls({
    commonMaterialValue,
    selectedAreaIds,
    setMaterial,
}: Pick<
    SelectionPanelProps,
    "commonMaterialValue" | "selectedAreaIds" | "setMaterial"
>) {
    return (
        <>
            <div className={ui.metric}>
                {selectedAreaIds.length} areas selected. Material changes apply
                to all selected areas.
            </div>
            <MaterialSelect
                label="Wall profile"
                options={WALL_BOARD_PROFILES}
                showMixedOption
                value={commonMaterialValue("wallBoardProfile")}
                onChange={(value) => setMaterial("wallBoardProfile", value)}
            />
            <MaterialSelect
                label="Wall board"
                options={WALL_BOARD_TYPES}
                showMixedOption
                value={commonMaterialValue("wallBoardType")}
                onChange={(value) => setMaterial("wallBoardType", value)}
            />
            <MaterialSelect
                label="Ceiling board"
                options={CEILING_BOARD_TYPES}
                showMixedOption
                value={commonMaterialValue("ceilingPlasterType")}
                onChange={(value) => setMaterial("ceilingPlasterType", value)}
            />
        </>
    );
}

function SingleAreaControls({
    areaIssue,
    fieldError,
    metrics,
    renderCeilingControls,
    selectedArea,
    selectedPointIndexes,
    setMaterial,
    toggleOutdoor,
    updateArea,
}: Pick<
    SelectionPanelProps,
    | "areaIssue"
    | "fieldError"
    | "metrics"
    | "renderCeilingControls"
    | "selectedArea"
    | "selectedPointIndexes"
    | "setMaterial"
    | "toggleOutdoor"
    | "updateArea"
>) {
    if (!selectedArea) return null;
    return (
        <>
            <div className={ui.field}>
                <label>Area label</label>
                <input
                    className={cx(
                        ui.input,
                        areaIssue(selectedArea.id, "areaLabel") &&
                            ui.inputInvalid,
                    )}
                    value={selectedArea.label}
                    onChange={(event) =>
                        updateArea(selectedArea.id, (area) => ({
                            ...area,
                            label: event.target.value,
                        }))
                    }
                />
                {fieldError(areaIssue(selectedArea.id, "areaLabel"))}
            </div>
            <label className={cx(ui.button, ui.buttonDefault, "justify-start")}>
                <input
                    type="checkbox"
                    checked={!!selectedArea.isOutdoor}
                    onChange={toggleOutdoor}
                />
                Outdoor area
            </label>
            {renderCeilingControls(selectedArea)}
            <BoardControls
                areaIssue={areaIssue}
                fieldError={fieldError}
                selectedArea={selectedArea}
                setMaterial={setMaterial}
            />
            {fieldError(areaIssue(selectedArea.id, "polygon"))}
            <div className={ui.metric}>
                Selected points: {selectedPointIndexes.length}
            </div>
            <div className={ui.metric}>
                Wall length:{" "}
                {selectedArea.isOutdoor
                    ? "not counted"
                    : metrics
                      ? `${metrics.wallLengthM.toFixed(2)} m`
                      : "set scale"}
            </div>
            <div className={ui.metric}>
                Ceiling area:{" "}
                {metrics
                    ? `${metrics.ceilingAreaM2.toFixed(2)} m2`
                    : "set scale"}
            </div>
        </>
    );
}
