import { randomUUID } from "node:crypto";

import {
    createReminder as dcCreateReminder,
    listProjectReminders as dcListProjectReminders,
    updateReminder as dcUpdateReminder,
} from "@generated/example-data-connector";

import { getUserSettingsOrDefault } from "./settings.js";
import { toReminderStatus } from "./validation.js";

import type { ProjectWithPages } from "./types.js";

const quoteFollowUpReminderPrefix = "Follow up quote for ";

export async function upsertAutoQuoteReminder(
    project: ProjectWithPages,
    ownerId: string,
) {
    const settings = await getUserSettingsOrDefault(ownerId);
    if (!settings.quoteFollowUpEnabled) {
        return;
    }

    const dueAt = addDays(new Date(), settings.quoteFollowUpDays).toISOString();
    const name = `${quoteFollowUpReminderPrefix}${project.name}`;
    const existing = await findOpenProjectReminder(project.id, ownerId);

    if (existing && existing.ownerId === ownerId) {
        await dcUpdateReminder({
            id: existing.id,
            accountId: project.accountId ?? null,
            name,
            status: "OPEN",
            dueAt,
            completedAt: existing.completedAt ?? null,
        });
        return;
    }

    await dcCreateReminder({
        id: randomUUID(),
        ownerId,
        projectId: project.id,
        accountId: project.accountId ?? null,
        name,
        status: "OPEN",
        dueAt,
    });
}

export async function cancelOpenProjectReminder(
    projectId: string,
    ownerId: string,
) {
    const reminder = await findOpenProjectReminder(projectId, ownerId);
    if (!reminder) {
        return;
    }

    await dcUpdateReminder({
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
    ownerId: string,
) {
    const response = await dcListProjectReminders({ projectId });
    return (
        response.data.reminders.find(
            (reminder) =>
                reminder.ownerId === ownerId &&
                toReminderStatus(reminder.status) === "OPEN",
        ) ?? null
    );
}

function addDays(date: Date, days: number) {
    const result = new Date(date);
    result.setUTCDate(result.getUTCDate() + days);
    return result;
}
