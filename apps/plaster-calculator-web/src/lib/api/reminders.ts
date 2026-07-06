import { FirebaseService } from "@libraries/plaster-calculator-web-core";
import { httpsCallable } from "firebase/functions";

import type { Reminder } from "../../types.js";

const functions = FirebaseService.getFunctions();

type ReminderPayload = {
    projectId: string;
    accountId?: string | null;
    name: string;
    dueAt: string;
};

type UpdateReminderPayload = {
    reminderId: string;
    accountId?: string | null;
    name?: string;
    dueAt?: string;
    status?: "OPEN" | "DONE" | "CANCELLED";
};

const listDueRemindersCallable = httpsCallable<
    unknown,
    { reminders: Reminder[] }
>(functions, "listDueReminders");
const listProjectRemindersCallable = httpsCallable<
    { projectId: string },
    { reminders: Reminder[] }
>(functions, "listProjectReminders");
const createReminderCallable = httpsCallable<ReminderPayload, Reminder>(
    functions,
    "createReminder",
);
const updateReminderCallable = httpsCallable<UpdateReminderPayload, Reminder>(
    functions,
    "updateReminder",
);
const completeReminderCallable = httpsCallable<
    { reminderId: string },
    Reminder
>(functions, "completeReminder");
const cancelReminderCallable = httpsCallable<{ reminderId: string }, Reminder>(
    functions,
    "cancelReminder",
);

export async function listDueReminders() {
    const result = await listDueRemindersCallable();
    return result.data.reminders;
}

export async function listProjectReminders(projectId: string) {
    const result = await listProjectRemindersCallable({ projectId });
    return result.data.reminders;
}

export async function createReminder(payload: ReminderPayload) {
    const result = await createReminderCallable(payload);
    return result.data;
}

export async function updateReminder(payload: UpdateReminderPayload) {
    const result = await updateReminderCallable(payload);
    return result.data;
}

export async function completeReminder(reminderId: string) {
    const result = await completeReminderCallable({ reminderId });
    return result.data;
}

export async function cancelReminder(reminderId: string) {
    const result = await cancelReminderCallable({ reminderId });
    return result.data;
}
