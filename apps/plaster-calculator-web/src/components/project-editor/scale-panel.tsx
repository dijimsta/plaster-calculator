import { Button } from "@libraries/uikit-web";
import { MousePointer2 } from "lucide-react";

import { cx, ui } from "../../lib/styles.js";

import type { ValidationIssue } from "../../lib/validation.js";
import type { Point } from "../../types.js";
import type { ReactNode } from "react";

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
        <div className={ui.stack}>
            <div className={ui.buttonRow}>
                <Button
                    variant={isSettingReference ? "primary" : "secondary"}
                    onClick={
                        isSettingReference
                            ? () => setIsSettingReference(false)
                            : startReferenceMode
                    }
                >
                    <MousePointer2 size={18} />{" "}
                    {isSettingReference ? "Cancel reference" : "Set reference"}
                </Button>
                <Button
                    variant="secondary"
                    onClick={() => {
                        setReferencePoints([]);
                        setIsSettingReference(false);
                    }}
                >
                    Reset
                </Button>
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
            <Button
                variant="primary"
                onClick={applyScale}
                disabled={referencePoints.length !== 2}
            >
                Apply scale
            </Button>
            <Button
                variant="secondary"
                onClick={applyScaleToAllPages}
                disabled={!scaleMmPerPx}
            >
                Apply scale to all pages
            </Button>
            <div className={ui.metric}>
                Scale:{" "}
                {scaleMmPerPx ? `${scaleMmPerPx.toFixed(3)} mm/px` : "not set"}
            </div>
        </div>
    );
}
