"use client";

import {
    DONE_REMINDER_STATUS,
    type Reminder,
} from "@libraries/plaster-calculator-common";
import { Badge, Box, Button, Text } from "@libraries/uikit-web";
import type { ReactElement } from "react";

import { useAppTranslation } from "../../../../i18n/index.ts";

import { outcomeDateText } from "./project-follow-up-copy.js";

export type ProjectFollowUpOutcomeStateProps = Readonly<{
    reminder: Reminder;
    isSaving: boolean;
    onReopen: () => void;
}>;

/** The Quote submitted follow-up panel's done/cancelled state, with a reopen action. */
export function ProjectFollowUpOutcomeState({
    reminder,
    isSaving,
    onReopen,
}: ProjectFollowUpOutcomeStateProps): ReactElement {
    const { t } = useAppTranslation();
    const isDone = reminder.status === DONE_REMINDER_STATUS;
    const dateText = outcomeDateText(reminder);

    return (
        <Box direction="column" gap="md">
            <Box direction="column" gap="xs">
                <Badge color={isDone ? "green" : "gray"} size="sm">
                    {t(
                        isDone
                            ? "projectStatusContent.followUp.outcome.doneTitle"
                            : "projectStatusContent.followUp.outcome.cancelledTitle",
                    )}
                </Badge>
                <strong>{reminder.name}</strong>
                <Text size="sm" variant="muted">
                    {t(
                        isDone
                            ? "projectStatusContent.followUp.outcome.doneDescription"
                            : "projectStatusContent.followUp.outcome.cancelledDescription",
                        { date: dateText },
                    )}
                </Text>
            </Box>
            <Box>
                <Button
                    variant="secondary"
                    size="small"
                    disabled={isSaving}
                    onClick={onReopen}
                >
                    {t("projectStatusContent.followUp.actions.reopen")}
                </Button>
            </Box>
        </Box>
    );
}
