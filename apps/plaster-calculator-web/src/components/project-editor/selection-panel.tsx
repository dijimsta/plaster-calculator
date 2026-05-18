import type { ReactNode } from "react";
import type { AreaPolygon, EdgeOverride } from "../../types.js";
import type { ValidationIssue } from "../../lib/validation.js";
import { BOARD_TYPES } from "../../lib/editor/board-materials.js";
import { cx, ui } from "../../lib/styles.js";
import type { SelectedEdge } from "../../hooks/use-editor-selection.js";
import type { SelectionMetrics } from "./editor-sidebar.types.js";

interface SelectionPanelProps {
    readonly areaIssue: (areaId: string, field: ValidationIssue["field"]) => string;
    readonly clearSelectedEdgeOverride: () => void;
    readonly commonMaterialValue: (field: "wallPlasterType" | "ceilingPlasterType") => string;
    readonly fieldError: (message: string) => ReactNode;
    readonly metrics: SelectionMetrics | null;
    readonly renderCeilingControls: (area: AreaPolygon) => ReactNode;
    readonly selectedArea: AreaPolygon | null;
    readonly selectedAreaIds: string[];
    readonly selectedEdge: SelectedEdge | null;
    readonly selectedEdgeArea: AreaPolygon | null;
    readonly selectedEdgeOverride: EdgeOverride | undefined | null;
    readonly selectedPointIndexes: number[];
    readonly setMaterial: (field: "wallPlasterType" | "ceilingPlasterType", value: string) => void;
    readonly setSelectedEdgeMaterial: (value: string) => void;
    readonly setSelectedEdgeNoPlaster: (noPlaster: boolean) => void;
    readonly toggleOutdoor: () => void;
    readonly updateArea: (areaId: string, updater: (area: AreaPolygon) => AreaPolygon) => void;
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
        <section className={cx(ui.panel, ui.stack)}>
            <h3>Selection</h3>
            {!selectedArea && !selectedEdgeArea && (
                <p className={ui.muted}>
                    Select an area to edit labels and board types.
                </p>
            )}
            {selectedEdgeArea && selectedEdge && (
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
            )}
            {!selectedEdge && selectedArea && selectedAreaIds.length > 1 && (
                <MultiAreaControls
                    commonMaterialValue={commonMaterialValue}
                    selectedAreaIds={selectedAreaIds}
                    setMaterial={setMaterial}
                />
            )}
            {!selectedEdge && selectedArea && selectedAreaIds.length <= 1 && (
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
            )}
        </section>
    );
}

function SelectedEdgeControls({
    clearSelectedEdgeOverride,
    renderCeilingControls,
    selectedArea,
    selectedAreaIds,
    selectedEdge,
    selectedEdgeArea,
    selectedEdgeOverride,
    setSelectedEdgeMaterial,
    setSelectedEdgeNoPlaster,
}: Pick<
    SelectionPanelProps,
    | "clearSelectedEdgeOverride"
    | "renderCeilingControls"
    | "selectedArea"
    | "selectedAreaIds"
    | "selectedEdge"
    | "selectedEdgeArea"
    | "selectedEdgeOverride"
    | "setSelectedEdgeMaterial"
    | "setSelectedEdgeNoPlaster"
>) {
    if (!selectedEdgeArea || !selectedEdge) return null;
    return (
        <>
            <div className={ui.metric}>
                Edge {selectedEdge.edgeIndex + 1} selected in{" "}
                {selectedEdgeArea.label}
            </div>
            {selectedAreaIds.length === 1 &&
                selectedArea?.id === selectedEdgeArea.id &&
                renderCeilingControls(selectedArea)}
            <label className={cx(ui.button, "justify-start")}>
                <input
                    type="checkbox"
                    checked={!!selectedEdgeOverride?.noPlaster}
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
                    value={
                        selectedEdgeOverride?.wallPlasterType ??
                        selectedEdgeArea.wallPlasterType
                    }
                    onChange={(event) =>
                        setSelectedEdgeMaterial(event.target.value)
                    }
                    disabled={
                        !!selectedEdgeOverride?.noPlaster ||
                        !!selectedEdgeArea.isOutdoor
                    }
                >
                    {BOARD_TYPES.map((type) => (
                        <option key={type}>{type}</option>
                    ))}
                </select>
            </div>
            <button
                className={ui.button}
                onClick={clearSelectedEdgeOverride}
                disabled={!selectedEdgeOverride}
            >
                Clear override
            </button>
        </>
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
            <BoardSelect
                label="Wall board"
                showMixedOption
                value={commonMaterialValue("wallPlasterType")}
                onChange={(value) => setMaterial("wallPlasterType", value)}
            />
            <BoardSelect
                label="Ceiling board"
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
            <label className={cx(ui.button, "justify-start")}>
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
                {metrics ? `${metrics.ceilingAreaM2.toFixed(2)} m2` : "set scale"}
            </div>
        </>
    );
}

function BoardControls({
    areaIssue,
    fieldError,
    selectedArea,
    setMaterial,
}: Pick<
    SelectionPanelProps,
    "areaIssue" | "fieldError" | "selectedArea" | "setMaterial"
>) {
    if (!selectedArea) return null;
    return (
        <>
            {!selectedArea.isOutdoor && (
                <BoardSelect
                    error={areaIssue(selectedArea.id, "wallPlasterType")}
                    label="Wall board"
                    value={selectedArea.wallPlasterType}
                    onChange={(value) => setMaterial("wallPlasterType", value)}
                    fieldError={fieldError}
                />
            )}
            <BoardSelect
                error={areaIssue(selectedArea.id, "ceilingPlasterType")}
                label="Ceiling board"
                value={selectedArea.ceilingPlasterType}
                onChange={(value) => setMaterial("ceilingPlasterType", value)}
                fieldError={fieldError}
            />
        </>
    );
}

function BoardSelect({
    error = "",
    fieldError,
    label,
    showMixedOption = false,
    value,
    onChange,
}: {
    readonly error?: string;
    readonly fieldError?: (message: string) => ReactNode;
    readonly label: string;
    readonly showMixedOption?: boolean;
    readonly value: string;
    readonly onChange: (value: string) => void;
}) {
    return (
        <div className={ui.field}>
            <label>{label}</label>
            <select
                className={cx(ui.input, error && ui.inputInvalid)}
                value={value}
                onChange={(event) => onChange(event.target.value)}
            >
                {showMixedOption && (
                    <option value="" disabled>
                        Mixed
                    </option>
                )}
                {BOARD_TYPES.map((type) => (
                    <option key={type}>{type}</option>
                ))}
            </select>
            {fieldError?.(error)}
        </div>
    );
}
