import type { Reminder } from "@libraries/plaster-calculator-common";
import type { RemindersService } from "@libraries/plaster-calculator-web-core";

import type { ProjectSummary } from "../../../types.js";

import type {
    FollowUpReminderConfirmation,
    FollowUpReminderRow,
} from "./use-follow-up-reminders.ts";

const MS_PER_DAY = 24 * 60 * 60 * 1000;

/**
 * Reminders fetched per "Load more" page. A bit more generous than a typical
 * list page: the panel filters client-side by assignee (see
 * `use-follow-up-reminders.ts`), so a larger team-wide page improves the
 * odds the "Mine" scope finds something without excessive clicking.
 */
export const FOLLOW_UP_REMINDERS_PAGE_SIZE = 20;

export type ReminderPage = Readonly<{
    reminders: Reminder[];
    hasMore: boolean;
}>;

/**
 * Fetches one page of open reminders, requesting one row past the page size
 * so the response length reveals whether more reminders remain without a
 * separate total-count query.
 */
export async function fetchOpenRemindersPage(
    remindersService: RemindersService,
    offset: number,
): Promise<ReminderPage> {
    const results = await remindersService.listOpenReminders({
        limit: FOLLOW_UP_REMINDERS_PAGE_SIZE + 1,
        offset,
    });
    return {
        reminders: results.slice(0, FOLLOW_UP_REMINDERS_PAGE_SIZE),
        hasMore: results.length > FOLLOW_UP_REMINDERS_PAGE_SIZE,
    };
}

export function upsertReminder(
    reminders: readonly Reminder[],
    updated: Reminder,
): Reminder[] {
    return reminders.some((reminder) => reminder.id === updated.id)
        ? reminders.map((reminder) =>
              reminder.id === updated.id ? updated : reminder,
          )
        : [...reminders, updated];
}

export function withPending(
    current: ReadonlySet<string>,
    id: string,
): ReadonlySet<string> {
    return new Set(current).add(id);
}

export function withoutPending(
    current: ReadonlySet<string>,
    id: string,
): ReadonlySet<string> {
    const next = new Set(current);
    next.delete(id);
    return next;
}

export function withConfirmation(
    current: ReadonlyMap<string, FollowUpReminderConfirmation>,
    id: string,
    confirmation: FollowUpReminderConfirmation,
): ReadonlyMap<string, FollowUpReminderConfirmation> {
    const next = new Map(current);
    next.set(id, confirmation);
    return next;
}

export function withoutConfirmation(
    current: ReadonlyMap<string, FollowUpReminderConfirmation>,
    id: string,
): ReadonlyMap<string, FollowUpReminderConfirmation> {
    const next = new Map(current);
    next.delete(id);
    return next;
}

export function toFollowUpRow(
    reminder: Reminder,
    projectsById: ReadonlyMap<string, ProjectSummary>,
): FollowUpReminderRow {
    const project = projectsById.get(reminder.projectId);
    return {
        reminder,
        projectName: project?.name ?? reminder.name,
        companyName: project ? (project.companyName ?? null) : null,
    };
}

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
