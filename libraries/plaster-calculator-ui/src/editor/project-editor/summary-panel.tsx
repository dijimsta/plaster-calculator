import { Box, Button, Paragraph, Text } from "@libraries/uikit-web";
import { MousePointer2 } from "lucide-react";

import { useEditorTranslation } from "../i18n/index.js";

import type { EditorSummary } from "./editor-sidebar.types.js";
import { ui } from "./project-editor.styles.js";
import type { ValidationIssue } from "./validation.js";

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
    const { t } = useEditorTranslation();
    return (
        <Box direction="column" gap="md">
            {!summary && (
                <Box direction="column" align="start" gap="sm">
                    <Paragraph
                        textSize="sm"
                        variant={pageIssue("reference") ? "danger" : "muted"}
                    >
                        {pageIssue("reference") ||
                            t("summaryPanel.unavailable")}
                    </Paragraph>
                    <Button variant="primary" onClick={startReferenceMode}>
                        <MousePointer2 size={18} /> Set reference
                    </Button>
                </Box>
            )}
            {summary && (
                <>
                    <Box direction="column" gap="xs">
                        <Text size="sm" weight="semibold" variant="muted">
                            {t("summaryPanel.wallLength")}
                        </Text>
                        {summary.wallTotals.length === 0 && (
                            <Paragraph textSize="sm" variant="muted">
                                No counted wall lengths.
                            </Paragraph>
                        )}
                        {summary.wallTotals.map(([type, total]) => (
                            // `ui.metric` is a deliberately-kept gap -- see
                            // `project-editor.styles.ts`.
                            <div className={ui.metric} key={`wall-${type}`}>
                                {type}: {total.toFixed(2)} m
                            </div>
                        ))}
                    </Box>
                    <Box direction="column" gap="xs">
                        <Text size="sm" weight="semibold" variant="muted">
                            {t("summaryPanel.ceilingArea")}
                        </Text>
                        {summary.ceilingTotals.map(([type, total]) => (
                            <div className={ui.metric} key={`ceiling-${type}`}>
                                {type}: {total.toFixed(2)} m2
                            </div>
                        ))}
                    </Box>
                </>
            )}
        </Box>
    );
}
