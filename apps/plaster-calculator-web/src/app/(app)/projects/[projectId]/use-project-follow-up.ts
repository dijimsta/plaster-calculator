"use client";

import {
    OPEN_REMINDER_STATUS,
    type Reminder,
} from "@libraries/plaster-calculator-common";
import { useRemindersService } from "@libraries/plaster-calculator-web-core";
import { useNotificationsManager } from "@libraries/uikit-web";
import { useCallback, useEffect, useState } from "react";

import {
    errorMessage,
    pickReminderToShow,
} from "./use-project-follow-up.utils.js";

export interface UseProjectFollowUpResult {
    readonly reminder: Reminder | null;
    readonly isLoading: boolean;
    readonly error: string | null;
    readonly isSaving: boolean;
    readonly refresh: () => Promise<void>;
    readonly completeReminder: () => Promise<void>;
    readonly cancelReminder: () => Promise<void>;
    readonly rescheduleReminder: (dueAt: string) => Promise<void>;
    readonly reopenReminder: () => Promise<void>;
}

/**
 * The Quote submitted project page's follow-up reminder: the project's open
 * reminder (or its most recently updated one, so an auto-cancelled reminder
 * still surfaces) plus the complete / cancel / reschedule / reopen actions.
 */
export function useProjectFollowUp(
    projectId: string,
): UseProjectFollowUpResult {
    const remindersService = useRemindersService();
    const { notify } = useNotificationsManager();
    const [reminder, setReminder] = useState<Reminder | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isSaving, setIsSaving] = useState(false);

    const refresh = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            const reminders =
                await remindersService.listProjectReminders(projectId);
            setReminder(pickReminderToShow(reminders));
        } catch (loadError) {
            setError(
                errorMessage(
                    loadError,
                    "Unable to load this project's follow-up.",
                ),
            );
        } finally {
            setIsLoading(false);
        }
    }, [remindersService, projectId]);

    useEffect(() => {
        void refresh();
    }, [refresh]);

    const performAction = useCallback(
        async (call: () => Promise<Reminder>, failureTitle: string) => {
            setIsSaving(true);
            try {
                setReminder(await call());
            } catch (actionError) {
                notify({
                    intent: "error",
                    title: failureTitle,
                    description: errorMessage(actionError),
                });
            } finally {
                setIsSaving(false);
            }
        },
        [notify],
    );

    const completeReminder = useCallback(async () => {
        if (!reminder) return;
        await performAction(
            () => remindersService.completeReminder(reminder.id),
            "Unable to mark follow-up as done",
        );
    }, [performAction, reminder, remindersService]);

    const cancelReminder = useCallback(async () => {
        if (!reminder) return;
        await performAction(
            () => remindersService.cancelReminder(reminder.id),
            "Unable to cancel follow-up",
        );
    }, [performAction, reminder, remindersService]);

    const rescheduleReminder = useCallback(
        async (dueAt: string) => {
            if (!reminder) return;
            await performAction(
                () =>
                    remindersService.updateReminder({
                        reminderId: reminder.id,
                        dueAt,
                    }),
                "Unable to reschedule follow-up",
            );
        },
        [performAction, reminder, remindersService],
    );

    const reopenReminder = useCallback(async () => {
        if (!reminder) return;
        await performAction(
            () =>
                remindersService.updateReminder({
                    reminderId: reminder.id,
                    status: OPEN_REMINDER_STATUS,
                }),
            "Unable to reopen follow-up",
        );
    }, [performAction, reminder, remindersService]);

    return {
        reminder,
        isLoading,
        error,
        isSaving,
        refresh,
        completeReminder,
        cancelReminder,
        rescheduleReminder,
        reopenReminder,
    };
}
