import { RadioGroup, RadioGroupOption } from "@libraries/uikit-web";

import { useEditorTranslation } from "../i18n/index.js";

import type { OverlayMode } from "./project-editor.types.js";

const OVERLAY_MODES: OverlayMode[] = ["walls", "ceilings", "both"];

export type OverlayModeSelectorProps = {
    readonly overlayMode: OverlayMode;
    readonly onSetOverlayMode: (mode: OverlayMode) => void;
};

export function OverlayModeSelector({
    overlayMode,
    onSetOverlayMode,
}: OverlayModeSelectorProps) {
    const { t } = useEditorTranslation();
    const overlayModeLabels: Record<OverlayMode, string> = {
        both: t("editorToolbar.overlayModeLabels.both"),
        ceilings: t("editorToolbar.overlayModeLabels.ceilings"),
        walls: t("editorToolbar.overlayModeLabels.walls"),
    };

    return (
        <RadioGroup
            name="overlay-mode"
            legend="Overlay mode"
            variant="segmented"
            hideLegend
        >
            {OVERLAY_MODES.map((mode) => (
                <RadioGroupOption
                    key={mode}
                    value={mode}
                    label={overlayModeLabels[mode]}
                    checked={overlayMode === mode}
                    onChange={() => onSetOverlayMode(mode)}
                />
            ))}
        </RadioGroup>
    );
}
