"use client";

import {
    OPEN_REMINDER_STATUS,
    type Reminder,
    type ReminderStatus,
} from "@libraries/plaster-calculator-common";
import {
    useRemindersService,
    useUser,
} from "@libraries/plaster-calculator-web-core";
import { useNotificationsManager } from "@libraries/uikit-web";
import { useCallback, useEffect, useMemo, useState } from "react";

import type { ProjectSummary } from "../../../types.js";

import {
    errorMessage,
    getDueInDays,
    toFollowUpRow,
    upsertReminder,
    withConfirmation,
    withoutConfirmation,
    withoutPending,
    withPending,
} from "./use-follow-up-reminders.utils.js";

export { addDaysIso, getDueInDays } from "./use-follow-up-reminders.utils.js";

/** Which reminders are visible: the signed-in user's own, or the whole team's. */
export type FollowUpScope = "mine" | "team";

export type FollowUpReminderActionKind =
    "done" | "cancelled" | "snoozed" | "rescheduled";

/** Snapshot needed to undo a mutation -- the reminder's state immediately before it ran. */
export type FollowUpReminderConfirmation = Readonly<{
    action: FollowUpReminderActionKind;
    previousStatus: ReminderStatus;
    previousDueAt: string;
}>;

export type FollowUpReminderRow = Readonly<{
    reminder: Reminder;
    projectName: string;
    companyName: string | null;
}>;

export type UseFollowUpRemindersOptions = {
    /** Projects the dashboard already loaded, used to resolve each reminder's project/company name. */
    readonly projects: ProjectSummary[];
};

export type UseFollowUpRemindersResult = {
    readonly rows: FollowUpReminderRow[];
    readonly openCount: number;
    readonly overdueCount: number;
    readonly isLoading: boolean;
    readonly error: string | null;
    readonly scope: FollowUpScope;
    readonly confirmations: ReadonlyMap<string, FollowUpReminderConfirmation>;
    readonly pendingReminderIds: ReadonlySet<string>;
    readonly setScope: (scope: FollowUpScope) => void;
    readonly refresh: () => Promise<void>;
    readonly completeReminder: (reminder: Reminder) => Promise<void>;
    readonly cancelReminder: (reminder: Reminder) => Promise<void>;
    readonly updateReminderDueDate: (
        reminder: Reminder,
        dueAt: string,
        action: "snoozed" | "rescheduled",
    ) => Promise<void>;
    readonly undoReminder: (reminderId: string) => Promise<void>;
};

export function useFollowUpReminders({
    projects,
}: UseFollowUpRemindersOptions): UseFollowUpRemindersResult {
    const remindersService = useRemindersService();
    const user = useUser();
    const { notify } = useNotificationsManager();
    const [reminders, setReminders] = useState<Reminder[]>([]);
    const [scope, setScope] = useState<FollowUpScope>("mine");
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [confirmations, setConfirmations] = useState<
        ReadonlyMap<string, FollowUpReminderConfirmation>
    >(new Map());
    const [pendingReminderIds, setPendingReminderIds] = useState<
        ReadonlySet<string>
    >(new Set());

    const currentUserId = user?.uid ?? null;

    const refresh = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            setReminders(await remindersService.listOpenReminders());
            setConfirmations(new Map());
        } catch (loadError) {
            setError(errorMessage(loadError, "Unable to load follow-ups."));
        } finally {
            setIsLoading(false);
        }
    }, [remindersService]);

    useEffect(() => {
        void refresh();
    }, [refresh]);

    const performAction = useCallback(
        async (
            reminder: Reminder,
            action: FollowUpReminderActionKind,
            call: () => Promise<Reminder>,
            failureTitle: string,
        ) => {
            setPendingReminderIds((current) =>
                withPending(current, reminder.id),
            );
            try {
                const updated = await call();
                setReminders((current) => upsertReminder(current, updated));
                setConfirmations((current) =>
                    withConfirmation(current, reminder.id, {
                        action,
                        previousStatus: reminder.status,
                        previousDueAt: reminder.dueAt,
                    }),
                );
            } catch (actionError) {
                notify({
                    intent: "error",
                    title: failureTitle,
                    description: errorMessage(actionError),
                });
            } finally {
                setPendingReminderIds((current) =>
                    withoutPending(current, reminder.id),
                );
            }
        },
        [notify],
    );

    const completeReminder = useCallback(
        (reminder: Reminder) =>
            performAction(
                reminder,
                "done",
                () => remindersService.completeReminder(reminder.id),
                "Unable to mark follow-up as done",
            ),
        [performAction, remindersService],
    );

    const cancelReminder = useCallback(
        (reminder: Reminder) =>
            performAction(
                reminder,
                "cancelled",
                () => remindersService.cancelReminder(reminder.id),
                "Unable to cancel follow-up",
            ),
        [performAction, remindersService],
    );

    const updateReminderDueDate = useCallback(
        (
            reminder: Reminder,
            dueAt: string,
            action: "snoozed" | "rescheduled",
        ) =>
            performAction(
                reminder,
                action,
                () =>
                    remindersService.updateReminder({
                        reminderId: reminder.id,
                        dueAt,
                    }),
                "Unable to reschedule follow-up",
            ),
        [performAction, remindersService],
    );

    const undoReminder = useCallback(
        async (reminderId: string) => {
            const confirmation = confirmations.get(reminderId);
            if (!confirmation) return;
            setPendingReminderIds((current) =>
                withPending(current, reminderId),
            );
            try {
                const updated = await remindersService.updateReminder({
                    reminderId,
                    status: confirmation.previousStatus,
                    dueAt: confirmation.previousDueAt,
                });
                setReminders((current) => upsertReminder(current, updated));
                setConfirmations((current) =>
                    withoutConfirmation(current, reminderId),
                );
            } catch (undoError) {
                notify({
                    intent: "error",
                    title: "Unable to undo",
                    description: errorMessage(undoError),
                });
            } finally {
                setPendingReminderIds((current) =>
                    withoutPending(current, reminderId),
                );
            }
        },
        [confirmations, notify, remindersService],
    );

    const projectsById = useMemo(
        () => new Map(projects.map((project) => [project.id, project])),
        [projects],
    );

    const rows = useMemo(() => {
        const visible = reminders.filter(
            (reminder) =>
                (scope === "team" || reminder.assignee === currentUserId) &&
                (reminder.status === OPEN_REMINDER_STATUS ||
                    confirmations.has(reminder.id)),
        );
        return visible
            .slice()
            .sort(
                (a, b) =>
                    new Date(a.dueAt).getTime() - new Date(b.dueAt).getTime(),
            )
            .map((reminder) => toFollowUpRow(reminder, projectsById));
    }, [reminders, scope, currentUserId, confirmations, projectsById]);

    const openRows = rows.filter(
        (row) => row.reminder.status === OPEN_REMINDER_STATUS,
    );
    const openCount = openRows.length;
    const overdueCount = openRows.filter(
        (row) => getDueInDays(row.reminder.dueAt) < 0,
    ).length;

    return {
        rows,
        openCount,
        overdueCount,
        isLoading,
        error,
        scope,
        confirmations,
        pendingReminderIds,
        setScope,
        refresh,
        completeReminder,
        cancelReminder,
        updateReminderDueDate,
        undoReminder,
    };
}
