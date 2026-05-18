import type { ReactNode } from "react";
import type { FloorplanPage } from "../../types.js";
import { cx, ui } from "../../lib/styles.js";

interface PageSettingsPanelProps {
    readonly ceilingHeightMm: number | null;
    readonly dirty: boolean;
    readonly page: FloorplanPage;
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
    page,
    status,
    applyHeightToAllPages,
    fieldError,
    hasPageHeightIssue,
    setCeilingHeightMm,
    setDirty,
}: PageSettingsPanelProps) {
    return (
        <section className={cx(ui.panel, ui.stack)}>
            <h3>Page {page.pageNumber}</h3>
            <span className={ui.muted}>
                {status || "Ready"} {dirty ? "- autosaves every 15 seconds" : ""}
            </span>
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
                            event.target.value ? Number(event.target.value) : null,
                        );
                        setDirty(true);
                    }}
                />
                {hasPageHeightIssue() &&
                    fieldError("Ceiling height is required")}
            </div>
            <button
                className={cx(ui.button, ui.buttonDefault)}
                onClick={applyHeightToAllPages}
            >
                Apply height to all pages
            </button>
        </section>
    );
}
