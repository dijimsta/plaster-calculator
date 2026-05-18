import type { ReactNode } from "react";
import { MousePointer2 } from "lucide-react";
import type { Point } from "../../types.js";
import type { ValidationIssue } from "../../lib/validation.js";
import { cx, ui } from "../../lib/styles.js";

interface ScalePanelProps {
    readonly isSettingReference: boolean;
    readonly referenceLengthMm: string;
    readonly referencePoints: Point[];
    readonly scaleMmPerPx: number | null;
    readonly applyScale: () => void;
    readonly applyScaleToAllPages: () => void;
    readonly fieldError: (message: string) => ReactNode;
    readonly pageIssue: (field: ValidationIssue["field"]) => string;
    readonly setDirty: (dirty: boolean) => void;
    readonly setIsSettingReference: (value: boolean) => void;
    readonly setReferenceLengthMm: (value: string) => void;
    readonly setReferencePoints: (points: Point[]) => void;
    readonly startReferenceMode: () => void;
}

export function ScalePanel({
    isSettingReference,
    referenceLengthMm,
    referencePoints,
    scaleMmPerPx,
    applyScale,
    applyScaleToAllPages,
    fieldError,
    pageIssue,
    setDirty,
    setIsSettingReference,
    setReferenceLengthMm,
    setReferencePoints,
    startReferenceMode,
}: ScalePanelProps) {
    return (
        <section className={cx(ui.panel, ui.stack)}>
            <h3>Scale</h3>
            <div className={ui.buttonRow}>
                <button
                    className={cx(
                        ui.button,
                        isSettingReference
                            ? ui.buttonPrimary
                            : ui.buttonDefault,
                    )}
                    onClick={
                        isSettingReference
                            ? () => setIsSettingReference(false)
                            : startReferenceMode
                    }
                >
                    <MousePointer2 size={18} />{" "}
                    {isSettingReference ? "Cancel reference" : "Set reference"}
                </button>
                <button
                    className={cx(ui.button, ui.buttonDefault)}
                    onClick={() => {
                        setReferencePoints([]);
                        setIsSettingReference(false);
                    }}
                >
                    Reset
                </button>
            </div>
            <p className={ui.muted}>
                {isSettingReference
                    ? "Click two points on the image."
                    : `${referencePoints.length}/2 reference points set.`}
            </p>
            <div className={ui.field}>
                <label>Reference length mm</label>
                <input
                    className={cx(
                        ui.input,
                        pageIssue("reference") && ui.inputInvalid,
                    )}
                    value={referenceLengthMm}
                    onChange={(event) => {
                        setReferenceLengthMm(event.target.value);
                        setDirty(true);
                    }}
                    type="number"
                />
                {fieldError(pageIssue("reference"))}
            </div>
            <button
                className={cx(ui.button, ui.buttonPrimary)}
                onClick={applyScale}
                disabled={referencePoints.length !== 2}
            >
                Apply scale
            </button>
            <button
                className={cx(ui.button, ui.buttonDefault)}
                onClick={applyScaleToAllPages}
                disabled={!scaleMmPerPx}
            >
                Apply scale to all pages
            </button>
            <div className={ui.metric}>
                Scale:{" "}
                {scaleMmPerPx
                    ? `${scaleMmPerPx.toFixed(3)} mm/px`
                    : "not set"}
            </div>
        </section>
    );
}
