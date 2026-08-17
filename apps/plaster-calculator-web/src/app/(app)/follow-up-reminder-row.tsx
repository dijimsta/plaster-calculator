"use client";

import type {
    Reminder,
    TeamMember,
} from "@libraries/plaster-calculator-common";
import { Avatar, Badge, Box, Button, Text } from "@libraries/uikit-web";
import { default as LinkModule } from "next/link.js";
import type { ReactElement } from "react";

import { useAppTranslation } from "../../i18n/index.ts";
import { ui } from "../../lib/styles.js";

import {
    confirmationText,
    dueWording,
    memberDisplayName,
    memberInitials,
} from "./follow-up-reminder-copy.js";
import { RescheduleControl } from "./follow-up-reschedule-control.js";
import {
    addDaysIso,
    getDueInDays,
    type FollowUpReminderConfirmation,
    type FollowUpReminderRow,
    type FollowUpScope,
} from "./hooks/use-follow-up-reminders.js";

const Link = LinkModule.default;

const SNOOZE_DAYS = 3;

type FollowUpRowProps = Readonly<{
    row: FollowUpReminderRow;
    scope: FollowUpScope;
    member: TeamMember | undefined;
    confirmation: FollowUpReminderConfirmation | undefined;
    isPending: boolean;
    onComplete: (reminder: Reminder) => void;
    onCancel: (reminder: Reminder) => void;
    onReschedule: (
        reminder: Reminder,
        dueAt: string,
        action: "snoozed" | "rescheduled",
    ) => void;
    onUndo: (reminderId: string) => void;
}>;

/** A single row in the "Needs follow-up" panel -- one open reminder, its actions, and its confirmation strip. */
export function FollowUpRow({
    row,
    scope,
    member,
    confirmation,
    isPending,
    onComplete,
    onCancel,
    onReschedule,
    onUndo,
}: FollowUpRowProps): ReactElement {
    const { t } = useAppTranslation();
    const { reminder, projectName, companyName } = row;
    const dueInDays = getDueInDays(reminder.dueAt);
    const overdue = dueInDays < 0;
    const dueWordingText = dueWording(t, dueInDays);
    const dueDateText = new Date(reminder.dueAt).toLocaleDateString();

    return (
        <div className={ui.projectItem}>
            <Link href={`/projects/${reminder.projectId}`}>
                <FollowUpRowDetails
                    projectName={projectName}
                    companyName={companyName}
                    scope={scope}
                    member={member}
                    dueWordingText={dueWordingText}
                    dueDateText={dueDateText}
                    overdue={overdue}
                />
            </Link>
            <div className={ui.projectActions}>
                {confirmation ? (
                    <Box direction="row" align="center" gap="sm" wrap>
                        <Text size="sm" variant="muted">
                            {confirmationText(t, confirmation, dueDateText)}
                        </Text>
                        <Button
                            variant="secondary"
                            size="small"
                            disabled={isPending}
                            onClick={() => onUndo(reminder.id)}
                        >
                            {t("needsFollowUp.confirmations.undo")}
                        </Button>
                    </Box>
                ) : (
                    <Box direction="row" align="center" gap="sm" wrap>
                        <Button
                            variant="secondary"
                            size="small"
                            disabled={isPending}
                            onClick={() => onComplete(reminder)}
                        >
                            {t("needsFollowUp.actions.done")}
                        </Button>
                        <Button
                            variant="secondary"
                            size="small"
                            disabled={isPending}
                            onClick={() =>
                                onReschedule(
                                    reminder,
                                    addDaysIso(SNOOZE_DAYS),
                                    "snoozed",
                                )
                            }
                        >
                            {t("needsFollowUp.actions.snooze")}
                        </Button>
                        <RescheduleControl
                            reminder={reminder}
                            disabled={isPending}
                            onReschedule={onReschedule}
                        />
                        <Button
                            variant="dangerSoft"
                            size="small"
                            disabled={isPending}
                            onClick={() => onCancel(reminder)}
                        >
                            {t("needsFollowUp.actions.cancel")}
                        </Button>
                    </Box>
                )}
            </div>
        </div>
    );
}

type FollowUpRowDetailsProps = Readonly<{
    projectName: string;
    companyName: string | null;
    scope: FollowUpScope;
    member: TeamMember | undefined;
    dueWordingText: string;
    dueDateText: string;
    overdue: boolean;
}>;

function FollowUpRowDetails({
    projectName,
    companyName,
    scope,
    member,
    dueWordingText,
    dueDateText,
    overdue,
}: FollowUpRowDetailsProps): ReactElement {
    const { t } = useAppTranslation();

    return (
        <Box direction="column" gap="xs">
            <Box direction="row" align="center" gap="sm" wrap>
                <strong>{projectName}</strong>
                {scope === "team" && (
                    <Box direction="row" align="center" gap="xs">
                        <Avatar
                            size="xs"
                            src={member?.photoUrl ?? undefined}
                            initials={
                                member && member.photoUrl === null
                                    ? memberInitials(member)
                                    : undefined
                            }
                        />
                        <Text size="sm" variant="muted">
                            {memberDisplayName(
                                member,
                                t("needsFollowUp.unassigned"),
                            )}
                        </Text>
                    </Box>
                )}
            </Box>
            {companyName && (
                <Text size="sm" variant="muted">
                    {companyName}
                </Text>
            )}
            {overdue ? (
                <Badge color="yellow" dot size="xs">
                    {dueWordingText}
                </Badge>
            ) : (
                <Text size="sm" variant="muted">
                    {dueWordingText}
                </Text>
            )}
            <Text size="xs" variant="muted">
                {dueDateText}
            </Text>
        </Box>
    );
}
