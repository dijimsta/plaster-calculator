"use client";

import type { Reminder } from "@libraries/plaster-calculator-common";
import { Badge, Box, Text } from "@libraries/uikit-web";
import type { ReactElement } from "react";

import { useAppTranslation } from "../../../../i18n/index.ts";

import { ProjectFollowUpActions } from "./project-follow-up-actions.js";
import {
    autoCreatedWording,
    followUpDueWording,
    getDueInDays,
} from "./project-follow-up-copy.js";

export type ProjectFollowUpOpenStateProps = Readonly<{
    reminder: Reminder;
    windowDays: number | null;
    isSaving: boolean;
    onComplete: () => void;
    onCancel: () => void;
    onReschedule: (dueAt: string) => void;
}>;

/** The Quote submitted follow-up panel's open state: due wording, the reminder's name, and its actions. */
export function ProjectFollowUpOpenState({
    reminder,
    windowDays,
    isSaving,
    onComplete,
    onCancel,
    onReschedule,
}: ProjectFollowUpOpenStateProps): ReactElement {
    const { t } = useAppTranslation();
    const dueInDays = getDueInDays(reminder.dueAt);
    const overdue = dueInDays < 0;
    const dueWordingText = followUpDueWording(t, dueInDays);
    const dueDateText = new Date(reminder.dueAt).toLocaleDateString();

    return (
        <Box direction="column" gap="md">
            <Box direction="column" gap="xs">
                {overdue ? (
                    <Badge color="yellow" dot size="sm">
                        {dueWordingText}
                    </Badge>
                ) : (
                    <Text size="base">{dueWordingText}</Text>
                )}
                <Text size="sm" variant="muted">
                    {dueDateText}
                </Text>
                <strong>{reminder.name}</strong>
                <Text size="sm" variant="muted">
                    {autoCreatedWording(t, windowDays)}
                </Text>
            </Box>
            <ProjectFollowUpActions
                isSaving={isSaving}
                onComplete={onComplete}
                onCancel={onCancel}
                onReschedule={onReschedule}
            />
        </Box>
    );
}
