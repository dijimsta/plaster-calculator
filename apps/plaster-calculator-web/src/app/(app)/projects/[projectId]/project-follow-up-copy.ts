import {
    DONE_REMINDER_STATUS,
    type Reminder,
} from "@libraries/plaster-calculator-common";

import type { useAppTranslation } from "../../../../i18n/index.ts";

type TFunction = ReturnType<typeof useAppTranslation>["t"];

const MS_PER_DAY = 24 * 60 * 60 * 1000;

/**
 * Calendar-day difference between `dueAt` and `now`, in the browser's local
 * time zone. Negative means overdue, 0 means due today.
 */
export function getDueInDays(dueAt: string, now: Date = new Date()): number {
    const due = new Date(dueAt);
    const dueMidnight = Date.UTC(
        due.getFullYear(),
        due.getMonth(),
        due.getDate(),
    );
    const todayMidnight = Date.UTC(
        now.getFullYear(),
        now.getMonth(),
        now.getDate(),
    );
    return Math.round((dueMidnight - todayMidnight) / MS_PER_DAY);
}

/** "Follow up today" / "Follow up in 3 days" / "Overdue by 4 days", from a calendar-day offset. */
export function followUpDueWording(t: TFunction, dueInDays: number): string {
    if (dueInDays === 0) return t("projectStatusContent.followUp.dueToday");
    if (dueInDays < 0) {
        const days = Math.abs(dueInDays);
        return t(
            days === 1
                ? "projectStatusContent.followUp.overdueByDay"
                : "projectStatusContent.followUp.overdueByDays",
            { count: days },
        );
    }
    return t(
        dueInDays === 1
            ? "projectStatusContent.followUp.dueInDay"
            : "projectStatusContent.followUp.dueInDays",
        { count: dueInDays },
    );
}

/**
 * The explanation line under an open reminder: it was created automatically
 * on submission, naming the user's follow-up window when it's known yet.
 */
export function autoCreatedWording(
    t: TFunction,
    windowDays: number | null,
): string {
    if (windowDays === null) {
        return t("projectStatusContent.followUp.autoCreatedUnknownWindow");
    }
    return t(
        windowDays === 1
            ? "projectStatusContent.followUp.autoCreatedDay"
            : "projectStatusContent.followUp.autoCreatedDays",
        { count: windowDays },
    );
}

/** The date to show alongside a done/cancelled reminder's outcome. */
export function outcomeDateText(reminder: Reminder): string {
    const iso =
        reminder.status === DONE_REMINDER_STATUS && reminder.completedAt
            ? reminder.completedAt
            : reminder.updatedAt;
    return new Date(iso).toLocaleDateString();
}
