import { Button, Text } from "@libraries/uikit-web";
import type { ReactNode } from "react";

import { useEditorTranslation } from "../i18n/index.js";

import { cx, ui } from "./project-editor.styles.js";

interface PageSettingsPanelProps {
    readonly ceilingHeightMm: number | null;
    readonly dirty: boolean;
    readonly status: string;
    readonly applyHeightToAllPages: () => void;
    readonly fieldError: (message: string) => ReactNode;
    readonly hasPageHeightIssue: () => boolean;
    readonly setCeilingHeightMm: (value: number | null) => void;
    readonly setDirty: (dirty: boolean) => void;
}

export function PageSettingsPanel({
    ceilingHeightMm,
    dirty,
    status,
    applyHeightToAllPages,
    fieldError,
    hasPageHeightIssue,
    setCeilingHeightMm,
    setDirty,
}: PageSettingsPanelProps) {
    const { t } = useEditorTranslation();
    return (
        <div className={ui.stack}>
            <Text size="sm" variant="muted">
                {status || t("pageSettingsPanel.readyStatus")}{" "}
                {dirty ? "- autosaves every 15 seconds" : ""}
            </Text>
            <div className={ui.field}>
                <label>{t("pageSettingsPanel.ceilingHeightLabel")}</label>
                <input
                    className={cx(
                        ui.input,
                        hasPageHeightIssue() && ui.inputInvalid,
                    )}
                    type="number"
                    value={ceilingHeightMm ?? ""}
                    onChange={(event) => {
                        setCeilingHeightMm(
                            event.target.value
                                ? Number(event.target.value)
                                : null,
                        );
                        setDirty(true);
                    }}
                />
                {hasPageHeightIssue() &&
                    fieldError(t("pageSettingsPanel.ceilingHeightRequired"))}
            </div>
            <Button variant="secondary" onClick={applyHeightToAllPages}>
                Apply height to all pages
            </Button>
        </div>
    );
}
