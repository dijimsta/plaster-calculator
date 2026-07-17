import { Button, Text } from "@libraries/uikit-web";

import { cx, ui } from "../../lib/styles.js";

import type { ReactNode } from "react";

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
    return (
        <div className={ui.stack}>
            <Text size="sm" variant="muted">
                {status || "Ready"}{" "}
                {dirty ? "- autosaves every 15 seconds" : ""}
            </Text>
            <div className={ui.field}>
                <label>Ceiling height mm</label>
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
                    fieldError("Ceiling height is required")}
            </div>
            <Button variant="secondary" onClick={applyHeightToAllPages}>
                Apply height to all pages
            </Button>
        </div>
    );
}
