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
    fetchOpenRemindersPage,
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
    readonly projects: readonly ProjectSummary[];
};

export type UseFollowUpRemindersResult = {
    readonly rows: FollowUpReminderRow[];
    readonly openCount: number;
    readonly overdueCount: number;
    readonly isLoading: boolean;
    readonly isLoadingMore: boolean;
    readonly hasMore: boolean;
    readonly error: string | null;
    readonly scope: FollowUpScope;
    readonly confirmations: ReadonlyMap<string, FollowUpReminderConfirmation>;
    readonly pendingReminderIds: ReadonlySet<string>;
    readonly setScope: (scope: FollowUpScope) => void;
    readonly refresh: () => Promise<void>;
    readonly loadMore: () => void;
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
    const [scopeState, setScopeState] = useState<FollowUpScope>("mine");
    const [isLoading, setIsLoading] = useState(true);
    const [isLoadingMore, setIsLoadingMore] = useState(false);
    const [hasMore, setHasMore] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [confirmations, setConfirmations] = useState<
        ReadonlyMap<string, FollowUpReminderConfirmation>
    >(new Map());
    const [pendingReminderIds, setPendingReminderIds] = useState<
        ReadonlySet<string>
    >(new Set());

    const currentUserId = user?.uid ?? null;

    // Resets to a fresh first page: used on mount and by explicit reloads
    // (the error state's "Try again" and a scope switch, below). Mutations
    // (complete/cancel/reschedule/undo) update the accumulated list in place
    // via `upsertReminder` instead of calling this, so they don't discard
    // pages the user has already loaded.
    const refresh = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            const page = await fetchOpenRemindersPage(remindersService, 0);
            setReminders(page.reminders);
            setHasMore(page.hasMore);
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

    // `ListOpenReminders` has no server-side assignee filter, so switching
    // scope can't just re-query for "my" reminders -- it re-runs the same
    // team-wide query from a clean offset 0, discarding whatever was loaded
    // for the previous scope, so each scope starts from an unbiased first
    // page rather than data the other scope happened to load first.
    const setScope = useCallback(
        (nextScope: FollowUpScope) => {
            setScopeState(nextScope);
            void refresh();
        },
        [refresh],
    );

    const loadMore = useCallback(async () => {
        setIsLoadingMore(true);
        try {
            const page = await fetchOpenRemindersPage(
                remindersService,
                reminders.length,
            );
            setReminders((current) => [...current, ...page.reminders]);
            setHasMore(page.hasMore);
        } catch (loadMoreError) {
            notify({
                intent: "error",
                title: "Unable to load more follow-ups",
                description: errorMessage(loadMoreError),
            });
        } finally {
            setIsLoadingMore(false);
        }
    }, [notify, remindersService, reminders.length]);

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
                (scopeState === "team" ||
                    reminder.assignee === currentUserId) &&
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
    }, [reminders, scopeState, currentUserId, confirmations, projectsById]);

    // Counts reflect what's been loaded so far for the current scope, not a
    // true team-wide total -- `ListOpenReminders` has no total-count query,
    // and this reads as normal progressive loading under "Load more" (counts
    // grow as more pages load) rather than a bug.
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
        isLoadingMore,
        hasMore,
        error,
        scope: scopeState,
        confirmations,
        pendingReminderIds,
        setScope,
        refresh,
        loadMore: () => void loadMore(),
        completeReminder,
        cancelReminder,
        updateReminderDueDate,
        undoReminder,
    };
}
