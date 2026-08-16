import { Badge, Box, Button, Card, Input, Text } from "@libraries/uikit-web";
import { Trash2 } from "lucide-react";
import { useId, useState } from "react";
import type { ReactElement } from "react";

import { useQuestionnairesTranslation } from "../i18n/index.ts";

import { clarificationRowStatusBadgeColors } from "./clarifications-step.styles.ts";
import type {
    ClarificationRowStatus,
    ClarificationsStepProps,
    ClarificationsStepRow,
} from "./clarifications-step.types.ts";

export type ClarificationRowListProps = {
    readonly rows: readonly ClarificationsStepRow[];
    readonly onEditLabel: ClarificationsStepProps["onEditRowLabel"];
    readonly onRemove: ClarificationsStepProps["onRemoveRow"];
};

/** The editable list of clarification rows: inline label editing, a status chip, and remove, for each row. */
export function ClarificationRowList({
    rows,
    onEditLabel,
    onRemove,
}: ClarificationRowListProps): ReactElement {
    return (
        <Box direction="column" gap="sm">
            {rows.map((row, index) => (
                <ClarificationRowCard
                    key={row.id}
                    row={row}
                    index={index}
                    onEditLabel={onEditLabel}
                    onRemove={onRemove}
                />
            ))}
        </Box>
    );
}

type ClarificationRowCardProps = {
    readonly row: ClarificationsStepRow;
    readonly index: number;
    readonly onEditLabel: ClarificationsStepProps["onEditRowLabel"];
    readonly onRemove: ClarificationsStepProps["onRemoveRow"];
};

function ClarificationRowCard({
    row,
    index,
    onEditLabel,
    onRemove,
}: ClarificationRowCardProps): ReactElement {
    const { t } = useQuestionnairesTranslation();
    const [label, setLabel] = useState(row.label);
    const [syncedLabel, setSyncedLabel] = useState(row.label);
    if (row.label !== syncedLabel) {
        setSyncedLabel(row.label);
        setLabel(row.label);
    }
    const labelId = useId();

    function commitLabel(): void {
        const trimmed = label.trim();
        if (!trimmed) {
            setLabel(row.label);
            return;
        }
        if (trimmed !== row.label) {
            onEditLabel(row, trimmed);
        }
    }

    return (
        <Card>
            <Box direction="column" gap="sm">
                <Box direction="row" justify="between" align="end" gap="sm">
                    <Box grow>
                        <Input
                            id={labelId}
                            value={label}
                            label={t(
                                "clarificationsStep.rows.labelFieldLabel",
                                {
                                    number: index + 1,
                                },
                            )}
                            onChange={(event) => setLabel(event.target.value)}
                            onBlur={commitLabel}
                        />
                    </Box>
                    <Box direction="row" gap="sm" align="center">
                        <ClarificationRowStatusChip status={row.status} />
                        <Button
                            type="button"
                            variant="ghost"
                            icon={<Trash2 size={16} aria-hidden="true" />}
                            label={t("common.removeQuestion", {
                                number: index + 1,
                            })}
                            onClick={() => onRemove(row)}
                        />
                    </Box>
                </Box>
                {row.status === "ON_PLAN" && (
                    <ClarificationRowPlanDetails row={row} />
                )}
            </Box>
        </Card>
    );
}

function ClarificationRowPlanDetails({
    row,
}: {
    readonly row: ClarificationsStepRow;
}): ReactElement | undefined {
    const { t } = useQuestionnairesTranslation();
    if (!row.answer && !row.sheetReference) return undefined;

    return (
        <Box direction="column" gap="xs">
            {row.answer && <Text size="sm">{row.answer}</Text>}
            {row.sheetReference && (
                <Text size="sm" variant="muted">
                    {t("clarificationsStep.rows.sheetReference", {
                        sheet: row.sheetReference,
                    })}
                </Text>
            )}
        </Box>
    );
}

function ClarificationRowStatusChip({
    status,
}: {
    readonly status: ClarificationRowStatus;
}): ReactElement {
    const { t } = useQuestionnairesTranslation();

    return (
        <Badge
            color={clarificationRowStatusBadgeColors[status]}
            variant="pill-with-border"
        >
            {t(`clarificationsStep.rows.statusLabels.${status}`)}
        </Badge>
    );
}
