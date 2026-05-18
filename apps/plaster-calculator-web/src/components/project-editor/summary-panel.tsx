import { MousePointer2 } from "lucide-react";
import type { ValidationIssue } from "../../lib/validation.js";
import { cx, ui } from "../../lib/styles.js";
import type { EditorSummary } from "./editor-sidebar.types.js";

interface SummaryPanelProps {
    readonly summary: EditorSummary | null;
    readonly pageIssue: (field: ValidationIssue["field"]) => string;
    readonly startReferenceMode: () => void;
}

export function SummaryPanel({
    summary,
    pageIssue,
    startReferenceMode,
}: SummaryPanelProps) {
    return (
        <section className={cx(ui.panel, ui.stack)}>
            <h3>Summary</h3>
            {!summary && (
                <div className={ui.validationCta}>
                    <p className={pageIssue("reference") ? ui.error : ui.muted}>
                        {pageIssue("reference") ||
                            "Summary is not available because reference is not yet set."}
                    </p>
                    <button
                        className={cx(ui.button, ui.buttonPrimary)}
                        onClick={startReferenceMode}
                    >
                        <MousePointer2 size={18} /> Set reference
                    </button>
                </div>
            )}
            {summary && (
                <>
                    <div className={ui.field}>
                        <span className={ui.label}>Wall length</span>
                        {summary.wallTotals.length === 0 && (
                            <p className={ui.muted}>No counted wall lengths.</p>
                        )}
                        {summary.wallTotals.map(([type, total]) => (
                            <div className={ui.metric} key={`wall-${type}`}>
                                {type}: {total.toFixed(2)} m
                            </div>
                        ))}
                    </div>
                    <div className={ui.field}>
                        <span className={ui.label}>Ceiling area</span>
                        {summary.ceilingTotals.map(([type, total]) => (
                            <div className={ui.metric} key={`ceiling-${type}`}>
                                {type}: {total.toFixed(2)} m2
                            </div>
                        ))}
                    </div>
                </>
            )}
        </section>
    );
}
