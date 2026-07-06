import "./bootstrap.js";

import { randomUUID } from "node:crypto";

import {
    createReminder as dcCreateReminder,
    listDueReminders as dcListDueReminders,
    listProjectReminders as dcListProjectReminders,
    updateReminder as dcUpdateReminder,
} from "@generated/example-data-connector";
import { onCall } from "firebase-functions/https";

import { requireAuth } from "./auth.js";
import { exampleDataConnect } from "./data-connect.js";
import { toReminder } from "./mappers.js";
import {
    requireOwnedAccount,
    requireOwnedProject,
    requireOwnedReminder,
} from "./ownership.js";
import {
    hasField,
    readDueAt,
    readOptionalNullableString,
    readReminderStatus,
    readRequiredString,
    toReminderStatus,
} from "./validation.js";

import type {
    CreateReminderRequest,
    ProjectIdRequest,
    Reminder,
    ReminderIdRequest,
    UpdateReminderRequest,
} from "./types.js";

export const listDueReminders = onCall<
    unknown,
    Promise<{ reminders: Reminder[] }>
>(async (request) => {
    const auth = requireAuth(request);
    const response = await dcListDueReminders(exampleDataConnect, {
        ownerId: auth.uid,
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
    const response = await dcListProjectReminders(exampleDataConnect, {
        projectId,
    });
    return {
        reminders: response.data.reminders
            .filter((reminder) => reminder.ownerId === auth.uid)
            .map(toReminder),
    };
});

export const createReminder = onCall<CreateReminderRequest, Promise<Reminder>>(
    async (request) => {
        const auth = requireAuth(request);
        const project = await requireOwnedProject(
            readRequiredString(request.data.projectId, "Project ID"),
            auth.uid,
        );
        const accountId = hasField(request.data, "accountId")
            ? readOptionalNullableString(request.data.accountId, "Account ID")
            : (project.accountId ?? null);
        if (accountId) {
            await requireOwnedAccount(accountId, auth.uid);
        }

        const reminderId = randomUUID();
        await dcCreateReminder(exampleDataConnect, {
            id: reminderId,
            ownerId: auth.uid,
            projectId: project.id,
            accountId,
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
        const accountId = hasField(data, "accountId")
            ? readOptionalNullableString(data.accountId, "Account ID")
            : (reminder.accountId ?? null);

        if (accountId) {
            await requireOwnedAccount(accountId, auth.uid);
        }

        await dcUpdateReminder(exampleDataConnect, {
            id: reminder.id,
            accountId,
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
        await dcUpdateReminder(exampleDataConnect, {
            id: reminder.id,
            accountId: reminder.accountId ?? null,
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
        await dcUpdateReminder(exampleDataConnect, {
            id: reminder.id,
            accountId: reminder.accountId ?? null,
            name: reminder.name,
            status: "CANCELLED",
            dueAt: reminder.dueAt,
            completedAt: reminder.completedAt ?? null,
        });
        return toReminder(await requireOwnedReminder(reminder.id, auth.uid));
    },
);
