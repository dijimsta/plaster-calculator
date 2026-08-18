import {
    ListRemindersResponseSchema,
    ReminderSchema,
} from "@libraries/plaster-calculator-common";
import { httpsCallable, type Functions } from "firebase/functions";

import { FirebaseService } from "../firebase/firebase.service.ts";

import type {
    Reminder,
    ReminderPayload,
    UpdateReminderPayload,
} from "./reminders.types.ts";

export class RemindersService {
    public constructor(
        private readonly functions: Functions = FirebaseService.getFunctions(),
    ) {}

    public async listDueReminders(): Promise<Reminder[]> {
        const listDueRemindersCallable = httpsCallable(
            this.functions,
            "listDueReminders",
        );
        const { data } = await listDueRemindersCallable();
        return ListRemindersResponseSchema.parse(data).reminders;
    }

    public async listOpenReminders(options?: {
        limit?: number;
        offset?: number;
    }): Promise<Reminder[]> {
        const listOpenRemindersCallable = httpsCallable(
            this.functions,
            "listOpenReminders",
        );
        const { data } = await listOpenRemindersCallable(options);
        return ListRemindersResponseSchema.parse(data).reminders;
    }

    public async listProjectReminders(projectId: string): Promise<Reminder[]> {
        const listProjectRemindersCallable = httpsCallable(
            this.functions,
            "listProjectReminders",
        );
        const { data } = await listProjectRemindersCallable({ projectId });
        return ListRemindersResponseSchema.parse(data).reminders;
    }

    public async createReminder(payload: ReminderPayload): Promise<Reminder> {
        const createReminderCallable = httpsCallable(
            this.functions,
            "createReminder",
        );
        const { data } = await createReminderCallable(payload);
        return ReminderSchema.parse(data);
    }

    public async updateReminder(
        payload: UpdateReminderPayload,
    ): Promise<Reminder> {
        const updateReminderCallable = httpsCallable(
            this.functions,
            "updateReminder",
        );
        const { data } = await updateReminderCallable(payload);
        return ReminderSchema.parse(data);
    }

    public async completeReminder(reminderId: string): Promise<Reminder> {
        const completeReminderCallable = httpsCallable(
            this.functions,
            "completeReminder",
        );
        const { data } = await completeReminderCallable({ reminderId });
        return ReminderSchema.parse(data);
    }

    public async cancelReminder(reminderId: string): Promise<Reminder> {
        const cancelReminderCallable = httpsCallable(
            this.functions,
            "cancelReminder",
        );
        const { data } = await cancelReminderCallable({ reminderId });
        return ReminderSchema.parse(data);
    }
}
