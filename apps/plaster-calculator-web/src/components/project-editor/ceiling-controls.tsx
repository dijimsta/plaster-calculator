import type { AreaPolygon } from "../../types.js";
import type { ValidationIssue } from "../../lib/validation.js";
import { cx, ui } from "../../lib/styles.js";
import type { SelectedEdge } from "../../hooks/use-editor-selection.js";
import { ValidationMessage } from "./validation-message.js";

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
                <div className={ui.field}>
                    <label>Room height override mm</label>
                    <input
                        className={cx(
                            ui.input,
                            roomHeightError && ui.inputInvalid,
                        )}
                        type="number"
                        placeholder={
                            ceilingHeightMm == null
                                ? "Page height not set"
                                : String(ceilingHeightMm)
                        }
                        value={area.ceilingHeightMm ?? ""}
                        onChange={(event) =>
                            setSelectedAreaHeight(event.target.value)
                        }
                    />
                    <ValidationMessage message={roomHeightError} />
                </div>
            )}
            {mode === "raked" && (
                <>
                    <div className={ui.buttonRow}>
                        <button
                            className={cx(
                                ui.button,
                                ui.buttonDefault,
                                lowEdgeError && ui.buttonInvalid,
                            )}
                            onClick={() => setRakedEdge("low")}
                            disabled={
                                !selectedEdge || selectedEdge.areaId !== area.id
                            }
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
                            disabled={
                                !selectedEdge || selectedEdge.areaId !== area.id
                            }
                        >
                            Set selected high edge
                        </button>
                    </div>
                    {(lowEdgeError || highEdgeError) && (
                        <span className={ui.fieldError}>
                            {lowEdgeError || highEdgeError}
                        </span>
                    )}
                    <div className={ui.metric}>
                        Low edge:{" "}
                        {raked && raked.lowEdgeIndex >= 0
                            ? raked.lowEdgeIndex + 1
                            : "-"}{" "}
                        | High edge:{" "}
                        {raked && raked.highEdgeIndex >= 0
                            ? raked.highEdgeIndex + 1
                            : "-"}
                    </div>
                    <div className={ui.field}>
                        <label>Low height mm</label>
                        <input
                            className={cx(
                                ui.input,
                                lowHeightError && ui.inputInvalid,
                            )}
                            type="number"
                            value={raked?.lowHeightMm ?? ""}
                            onChange={(event) =>
                                setRakedHeight(
                                    "lowHeightMm",
                                    event.target.value,
                                )
                            }
                        />
                        <ValidationMessage message={lowHeightError} />
                    </div>
                    <div className={ui.field}>
                        <label>High height mm</label>
                        <input
                            className={cx(
                                ui.input,
                                highHeightError && ui.inputInvalid,
                            )}
                            type="number"
                            value={raked?.highHeightMm ?? ""}
                            onChange={(event) =>
                                setRakedHeight(
                                    "highHeightMm",
                                    event.target.value,
                                )
                            }
                        />
                        <ValidationMessage message={highHeightError} />
                    </div>
                </>
            )}
        </>
    );
}
