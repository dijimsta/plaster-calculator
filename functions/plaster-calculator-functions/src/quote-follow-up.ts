import "./bootstrap.js";

import { randomUUID } from "node:crypto";

import * as DataConnector from "@generated/data-connector-admin";

import { requireTeamId } from "./ownership.js";
import { getUserSettingsOrDefault } from "./settings.js";
import { hasField, toReminderStatus } from "./validation.js";

import type { ProjectUpdateFields } from "./project-fields.js";
import type { ProjectWithPages } from "./types.js";
import type { SalesStatus } from "@libraries/plaster-calculator-common";

const quoteFollowUpReminderPrefix = "Follow up quote for ";

export async function upsertAutoQuoteReminder(
    project: ProjectWithPages,
    userId: string,
) {
    const settings = await getUserSettingsOrDefault(userId);
    if (!settings.quoteFollowUpEnabled) {
        return;
    }

    const dueAt = addDays(new Date(), settings.quoteFollowUpDays).toISOString();
    const name = `${quoteFollowUpReminderPrefix}${project.name}`;
    const teamId = await requireTeamId(userId);
    const existing = await findOpenProjectReminder(project.id, teamId);

    if (existing) {
        await DataConnector.updateReminder({
            id: existing.id,
            accountId: project.accountId ?? null,
            name,
            status: "OPEN",
            dueAt,
            completedAt: existing.completedAt ?? null,
        });
        return;
    }

    await DataConnector.createReminder({
        id: randomUUID(),
        teamId,
        projectId: project.id,
        accountId: project.accountId ?? null,
        assignee: project.assignee ?? null,
        name,
        status: "OPEN",
        dueAt,
    });
}

export async function cancelOpenProjectReminder(
    projectId: string,
    teamId: string,
) {
    const reminder = await findOpenProjectReminder(projectId, teamId);
    if (!reminder) {
        return;
    }

    await DataConnector.updateReminder({
        id: reminder.id,
        accountId: reminder.accountId ?? null,
        name: reminder.name,
        status: "CANCELLED",
        dueAt: reminder.dueAt,
        completedAt: reminder.completedAt ?? null,
    });
}

export async function findOpenProjectReminder(
    projectId: string,
    teamId: string,
) {
    const response = await DataConnector.listProjectReminders({
        projectId,
    });
    return (
        response.data.reminders.find(
            (reminder) =>
                reminder.teamId === teamId &&
                toReminderStatus(reminder.status) === "OPEN",
        ) ?? null
    );
}

export async function syncQuoteReminderForStatusUpdate(
    updates: ProjectUpdateFields,
    salesStatus: SalesStatus,
    project: ProjectWithPages,
    projectId: string,
    userId: string,
) {
    if (!hasField(updates, "salesStatus")) return;
    if (salesStatus === "QUOTE_SUBMITTED") {
        await upsertAutoQuoteReminder(project, userId);
    } else if (salesStatus === "WON" || salesStatus === "LOST") {
        await cancelOpenProjectReminder(projectId, await requireTeamId(userId));
    }
}

function addDays(date: Date, days: number) {
    const result = new Date(date);
    result.setUTCDate(result.getUTCDate() + days);
    return result;
}
