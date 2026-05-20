import { ValidationMessage } from "./validation-message.js";
import { cx, ui } from "../../lib/styles.js";

import type { SelectedEdge } from "../../hooks/use-editor-selection.js";
import type { ValidationIssue } from "../../lib/validation.js";
import type { AreaPolygon } from "../../types.js";

interface CeilingControlsProps {
    readonly area: AreaPolygon;
    readonly ceilingHeightMm: number | null;
    readonly selectedEdge: SelectedEdge | null;
    readonly areaIssue: (
        areaId: string,
        field: ValidationIssue["field"],
    ) => string;
    readonly setCeilingMode: (mode: "flat" | "raked") => void;
    readonly setRakedEdge: (role: "low" | "high") => void;
    readonly setRakedHeight: (
        field: "lowHeightMm" | "highHeightMm",
        value: string,
    ) => void;
    readonly setSelectedAreaHeight: (value: string) => void;
}

export function CeilingControls({
    area,
    ceilingHeightMm,
    selectedEdge,
    areaIssue,
    setCeilingMode,
    setRakedEdge,
    setRakedHeight,
    setSelectedAreaHeight,
}: CeilingControlsProps) {
    const mode = area.ceilingMode ?? "flat";
    const raked = area.rakedCeiling;
    const roomHeightError = areaIssue(area.id, "ceilingHeightMm");
    const lowEdgeError = areaIssue(area.id, "rakedLowEdge");
    const highEdgeError = areaIssue(area.id, "rakedHighEdge");
    const lowHeightError = areaIssue(area.id, "rakedLowHeight");
    const highHeightError = areaIssue(area.id, "rakedHighHeight");

    return (
        <>
            <div className={ui.field}>
                <label>Room ceiling</label>
                <select
                    className={ui.input}
                    value={mode}
                    onChange={(event) =>
                        setCeilingMode(event.target.value as "flat" | "raked")
                    }
                >
                    <option value="flat">Flat</option>
                    <option value="raked">Raked</option>
                </select>
            </div>
            {mode === "flat" && (
                <FlatCeilingHeightField
                    ceilingHeightMm={ceilingHeightMm}
                    error={roomHeightError}
                    value={area.ceilingHeightMm}
                    setSelectedAreaHeight={setSelectedAreaHeight}
                />
            )}
            {mode === "raked" && (
                <RakedCeilingFields
                    areaId={area.id}
                    raked={raked}
                    selectedEdge={selectedEdge}
                    lowEdgeError={lowEdgeError}
                    highEdgeError={highEdgeError}
                    lowHeightError={lowHeightError}
                    highHeightError={highHeightError}
                    setRakedEdge={setRakedEdge}
                    setRakedHeight={setRakedHeight}
                />
            )}
        </>
    );
}

interface FlatCeilingHeightFieldProps {
    readonly ceilingHeightMm: number | null;
    readonly error: string;
    readonly value: number | null | undefined;
    readonly setSelectedAreaHeight: (value: string) => void;
}

function FlatCeilingHeightField({
    ceilingHeightMm,
    error,
    value,
    setSelectedAreaHeight,
}: FlatCeilingHeightFieldProps) {
    const placeholder =
        ceilingHeightMm == null
            ? "Page height not set"
            : String(ceilingHeightMm);

    return (
        <div className={ui.field}>
            <label>Room height override mm</label>
            <input
                className={cx(ui.input, error && ui.inputInvalid)}
                type="number"
                placeholder={placeholder}
                value={value ?? ""}
                onChange={(event) => setSelectedAreaHeight(event.target.value)}
            />
            <ValidationMessage message={error} />
        </div>
    );
}

interface RakedCeilingFieldsProps {
    readonly areaId: string;
    readonly raked: AreaPolygon["rakedCeiling"];
    readonly selectedEdge: SelectedEdge | null;
    readonly lowEdgeError: string;
    readonly highEdgeError: string;
    readonly lowHeightError: string;
    readonly highHeightError: string;
    readonly setRakedEdge: (role: "low" | "high") => void;
    readonly setRakedHeight: (
        field: "lowHeightMm" | "highHeightMm",
        value: string,
    ) => void;
}

function RakedCeilingFields({
    areaId,
    raked,
    selectedEdge,
    lowEdgeError,
    highEdgeError,
    lowHeightError,
    highHeightError,
    setRakedEdge,
    setRakedHeight,
}: RakedCeilingFieldsProps) {
    const edgeError = lowEdgeError || highEdgeError;
    const edgeSelectionDisabled =
        !selectedEdge || selectedEdge.areaId !== areaId;

    return (
        <>
            <div className={ui.buttonRow}>
                <button
                    className={cx(
                        ui.button,
                        ui.buttonDefault,
                        lowEdgeError && ui.buttonInvalid,
                    )}
                    onClick={() => setRakedEdge("low")}
                    disabled={edgeSelectionDisabled}
                >
                    Set selected low edge
                </button>
                <button
                    className={cx(
                        ui.button,
                        ui.buttonDefault,
                        highEdgeError && ui.buttonInvalid,
                    )}
                    onClick={() => setRakedEdge("high")}
                    disabled={edgeSelectionDisabled}
                >
                    Set selected high edge
                </button>
            </div>
            {edgeError && <span className={ui.fieldError}>{edgeError}</span>}
            <div className={ui.metric}>
                Low edge: {edgeLabel(raked?.lowEdgeIndex)} | High edge:{" "}
                {edgeLabel(raked?.highEdgeIndex)}
            </div>
            <RakedHeightField
                label="Low height mm"
                field="lowHeightMm"
                error={lowHeightError}
                value={raked?.lowHeightMm}
                setRakedHeight={setRakedHeight}
            />
            <RakedHeightField
                label="High height mm"
                field="highHeightMm"
                error={highHeightError}
                value={raked?.highHeightMm}
                setRakedHeight={setRakedHeight}
            />
        </>
    );
}

interface RakedHeightFieldProps {
    readonly label: string;
    readonly field: "lowHeightMm" | "highHeightMm";
    readonly error: string;
    readonly value: number | null | undefined;
    readonly setRakedHeight: (
        field: "lowHeightMm" | "highHeightMm",
        value: string,
    ) => void;
}

function RakedHeightField({
    label,
    field,
    error,
    value,
    setRakedHeight,
}: RakedHeightFieldProps) {
    return (
        <div className={ui.field}>
            <label>{label}</label>
            <input
                className={cx(ui.input, error && ui.inputInvalid)}
                type="number"
                value={value ?? ""}
                onChange={(event) => setRakedHeight(field, event.target.value)}
            />
            <ValidationMessage message={error} />
        </div>
    );
}

function edgeLabel(edgeIndex: number | undefined) {
    return edgeIndex != null && edgeIndex >= 0 ? edgeIndex + 1 : "-";
}
