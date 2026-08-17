import {
    OPEN_REMINDER_STATUS,
    type Reminder,
} from "@libraries/plaster-calculator-common";

/**
 * The reminder to show for this project: the open one if any exists,
 * otherwise the most recently updated one (so an auto-cancelled reminder
 * still surfaces instead of an empty panel). `null` when the project has no
 * reminders at all.
 */
export function pickReminderToShow(
    reminders: readonly Reminder[],
): Reminder | null {
    const open = reminders.find(
        (reminder) => reminder.status === OPEN_REMINDER_STATUS,
    );
    if (open) return open;

    const mostRecentlyUpdated = reminders
        .slice()
        .sort(
            (a, b) =>
                new Date(b.updatedAt).getTime() -
                new Date(a.updatedAt).getTime(),
        )[0];
    return mostRecentlyUpdated ?? null;
}

/** ISO due date `days` from today, normalized to UTC midnight. */
export function addDaysIso(days: number, now: Date = new Date()): string {
    return new Date(
        Date.UTC(now.getFullYear(), now.getMonth(), now.getDate() + days),
    ).toISOString();
}

export function errorMessage(
    error: unknown,
    fallback = "Please try again.",
): string {
    return error instanceof Error && error.message ? error.message : fallback;
}
