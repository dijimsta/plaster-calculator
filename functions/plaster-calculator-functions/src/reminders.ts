import "./bootstrap.js";

import { randomUUID } from "node:crypto";

import * as DataConnector from "@generated/data-connector-admin";
import { onCall } from "firebase-functions/https";

import { requireAuth } from "./auth.js";
import { toReminder } from "./mappers.js";
import {
    requireOwnedCompany,
    requireOwnedProject,
    requireOwnedReminder,
    requireTeamId,
    requireTeamMember,
} from "./ownership.js";
import type {
    CreateReminderRequest,
    ProjectIdRequest,
    Reminder,
    ReminderIdRequest,
    UpdateReminderRequest,
} from "./types.js";
import {
    hasField,
    readDueAt,
    readOptionalNullableString,
    readReminderStatus,
    readRequiredString,
    toReminderStatus,
} from "./validation.js";

export const listDueReminders = onCall<
    unknown,
    Promise<{ reminders: Reminder[] }>
>(async (request) => {
    const auth = requireAuth(request);
    const response = await DataConnector.listDueReminders({
        teamId: await requireTeamId(auth.uid),
    });
    return { reminders: response.data.reminders.map(toReminder) };
});

export const listProjectReminders = onCall<
    ProjectIdRequest,
    Promise<{ reminders: Reminder[] }>
>(async (request) => {
    const auth = requireAuth(request);
    const projectId = readRequiredString(request.data.projectId, "Project ID");
    await requireOwnedProject(projectId, auth.uid);
    const response = await DataConnector.listProjectReminders({
        projectId,
    });
    return {
        reminders: response.data.reminders.map(toReminder),
    };
});

export const createReminder = onCall<CreateReminderRequest, Promise<Reminder>>(
    async (request) => {
        const auth = requireAuth(request);
        const project = await requireOwnedProject(
            readRequiredString(request.data.projectId, "Project ID"),
            auth.uid,
        );
        const companyId = hasField(request.data, "companyId")
            ? readOptionalNullableString(request.data.companyId, "Company ID")
            : (project.companyId ?? null);
        if (companyId) {
            await requireOwnedCompany(companyId, auth.uid);
        }
        const assignee = await resolveReminderAssignee(
            request.data,
            project.assignee ?? null,
            auth.uid,
        );

        const reminderId = randomUUID();
        await DataConnector.createReminder({
            id: reminderId,
            teamId: await requireTeamId(auth.uid),
            projectId: project.id,
            companyId,
            assignee,
            name: readRequiredString(request.data.name, "Reminder name"),
            status: "OPEN",
            dueAt: readDueAt(request.data.dueAt, "Due date"),
        });

        return toReminder(await requireOwnedReminder(reminderId, auth.uid));
    },
);

export const updateReminder = onCall<UpdateReminderRequest, Promise<Reminder>>(
    async (request) => {
        const auth = requireAuth(request);
        const reminder = await requireOwnedReminder(
            readRequiredString(request.data.reminderId, "Reminder ID"),
            auth.uid,
        );
        const data = request.data;
        const companyId = await resolveReminderCompany(
            data,
            reminder.companyId ?? null,
            auth.uid,
        );
        const assignee = await resolveReminderAssignee(
            data,
            reminder.assignee ?? null,
            auth.uid,
        );

        await DataConnector.updateReminder({
            id: reminder.id,
            companyId,
            assignee,
            name: hasField(data, "name")
                ? readRequiredString(data.name, "Reminder name")
                : reminder.name,
            status: hasField(data, "status")
                ? readReminderStatus(data.status)
                : toReminderStatus(reminder.status),
            dueAt: hasField(data, "dueAt")
                ? readDueAt(data.dueAt, "Due date")
                : reminder.dueAt,
            completedAt:
                hasField(data, "status") && data.status === "DONE"
                    ? new Date().toISOString()
                    : (reminder.completedAt ?? null),
        });

        return toReminder(await requireOwnedReminder(reminder.id, auth.uid));
    },
);

export const completeReminder = onCall<ReminderIdRequest, Promise<Reminder>>(
    async (request) => {
        const auth = requireAuth(request);
        const reminder = await requireOwnedReminder(
            readRequiredString(request.data.reminderId, "Reminder ID"),
            auth.uid,
        );
        await DataConnector.updateReminder({
            id: reminder.id,
            companyId: reminder.companyId ?? null,
            assignee: reminder.assignee ?? null,
            name: reminder.name,
            status: "DONE",
            dueAt: reminder.dueAt,
            completedAt: new Date().toISOString(),
        });
        return toReminder(await requireOwnedReminder(reminder.id, auth.uid));
    },
);

export const cancelReminder = onCall<ReminderIdRequest, Promise<Reminder>>(
    async (request) => {
        const auth = requireAuth(request);
        const reminder = await requireOwnedReminder(
            readRequiredString(request.data.reminderId, "Reminder ID"),
            auth.uid,
        );
        await DataConnector.updateReminder({
            id: reminder.id,
            companyId: reminder.companyId ?? null,
            assignee: reminder.assignee ?? null,
            name: reminder.name,
            status: "CANCELLED",
            dueAt: reminder.dueAt,
            completedAt: reminder.completedAt ?? null,
        });
        return toReminder(await requireOwnedReminder(reminder.id, auth.uid));
    },
);

async function resolveReminderAssignee(
    data: { assignee?: unknown },
    fallback: string | null,
    userId: string,
) {
    const assignee = hasField(data, "assignee")
        ? readOptionalNullableString(data.assignee, "Assignee")
        : fallback;
    if (assignee) {
        await requireTeamMember(await requireTeamId(userId), assignee);
    }
    return assignee;
}

async function resolveReminderCompany(
    data: { companyId?: unknown },
    fallback: string | null,
    userId: string,
) {
    const companyId = hasField(data, "companyId")
        ? readOptionalNullableString(data.companyId, "Company ID")
        : fallback;
    if (companyId) {
        await requireOwnedCompany(companyId, userId);
    }
    return companyId;
}
