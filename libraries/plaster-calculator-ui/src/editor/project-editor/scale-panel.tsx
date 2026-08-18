import type { Point } from "@libraries/plaster-calculator-common";
import { Box, Button, Input, Label, Paragraph } from "@libraries/uikit-web";
import { MousePointer2 } from "lucide-react";
import type { ReactNode } from "react";

import { useEditorTranslation } from "../i18n/index.js";

import { ui } from "./project-editor.styles.js";
import type { ValidationIssue } from "./validation.js";

type ScalePanelProps = {
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
};

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
    const { t } = useEditorTranslation();
    return (
        <Box direction="column" gap="md">
            <Box direction="row" wrap gap="sm">
                <Button
                    variant={isSettingReference ? "primary" : "secondary"}
                    onClick={
                        isSettingReference
                            ? () => setIsSettingReference(false)
                            : startReferenceMode
                    }
                >
                    <MousePointer2 size={18} />{" "}
                    {isSettingReference
                        ? t("scalePanel.cancelReference")
                        : t("scalePanel.setReference")}
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
            </Box>
            <Paragraph textSize="sm" variant="muted">
                {isSettingReference
                    ? t("scalePanel.clickTwoPoints")
                    : t("scalePanel.referencePointsSet", {
                          points: referencePoints.length,
                      })}
            </Paragraph>
            <Box direction="column" gap="xs">
                <Label>{t("scalePanel.referenceLengthLabel")}</Label>
                <Input
                    invalid={Boolean(pageIssue("reference"))}
                    value={referenceLengthMm}
                    onChange={(event) => {
                        setReferenceLengthMm(event.target.value);
                        setDirty(true);
                    }}
                    type="number"
                />
                {fieldError(pageIssue("reference"))}
            </Box>
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
            {/* `ui.metric` is a deliberately-kept gap -- see
                `project-editor.styles.ts`. */}
            <div className={ui.metric}>
                Scale:{" "}
                {scaleMmPerPx ? `${scaleMmPerPx.toFixed(3)} mm/px` : "not set"}
            </div>
        </Box>
    );
}
