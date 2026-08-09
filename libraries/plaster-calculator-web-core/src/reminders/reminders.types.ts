import type { ReminderStatus } from "@libraries/plaster-calculator-common";

export type { Reminder } from "@libraries/plaster-calculator-common";

export type ReminderPayload = {
    projectId: string;
    companyId?: string | null;
    name: string;
    dueAt: string;
};

export type UpdateReminderPayload = {
    reminderId: string;
    companyId?: string | null;
    name?: string;
    dueAt?: string;
    status?: ReminderStatus;
};
