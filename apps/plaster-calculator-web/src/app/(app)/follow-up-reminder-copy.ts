import type { TeamMember } from "@libraries/plaster-calculator-common";

import type { useAppTranslation } from "../../i18n/index.ts";

import type { FollowUpReminderConfirmation } from "./hooks/use-follow-up-reminders.js";

type TFunction = ReturnType<typeof useAppTranslation>["t"];

/** "Overdue by 4 days" / "Due today" / "Due in 2 days", from a calendar-day offset. */
export function dueWording(t: TFunction, dueInDays: number): string {
    if (dueInDays === 0) return t("needsFollowUp.dueToday");
    if (dueInDays < 0) {
        const days = Math.abs(dueInDays);
        return t(
            days === 1
                ? "needsFollowUp.overdueByDay"
                : "needsFollowUp.overdueByDays",
            { count: days },
        );
    }
    return t(
        dueInDays === 1 ? "needsFollowUp.dueInDay" : "needsFollowUp.dueInDays",
        { count: dueInDays },
    );
}

/** Inline confirmation-strip copy for the action a row just took. */
export function confirmationText(
    t: TFunction,
    confirmation: FollowUpReminderConfirmation,
    dueDateText: string,
): string {
    switch (confirmation.action) {
        case "done":
            return t("needsFollowUp.confirmations.done");
        case "cancelled":
            return t("needsFollowUp.confirmations.cancelled");
        case "snoozed":
            return t("needsFollowUp.confirmations.snoozed", {
                date: dueDateText,
            });
        case "rescheduled":
            return t("needsFollowUp.confirmations.rescheduled", {
                date: dueDateText,
            });
    }
}

export function memberDisplayName(
    member: TeamMember | undefined,
    unassignedFallback: string,
): string {
    if (!member) return unassignedFallback;
    return member.displayName ?? member.email ?? member.userId;
}

export function memberInitials(member: TeamMember): string {
    const source = member.displayName ?? member.email ?? member.userId;
    const parts = source.trim().split(/\s+/).filter(Boolean);
    return parts
        .slice(0, 2)
        .map((part) => part.charAt(0).toUpperCase())
        .join("");
}
