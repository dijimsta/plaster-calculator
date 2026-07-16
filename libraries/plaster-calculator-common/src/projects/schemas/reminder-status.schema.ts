import { z } from "zod";

export const OPEN_REMINDER_STATUS = "OPEN";
export const DONE_REMINDER_STATUS = "DONE";
export const CANCELLED_REMINDER_STATUS = "CANCELLED";

export const ReminderStatusSchema = z.union([
    z.literal(OPEN_REMINDER_STATUS),
    z.literal(DONE_REMINDER_STATUS),
    z.literal(CANCELLED_REMINDER_STATUS),
]);

export type ReminderStatus = z.infer<typeof ReminderStatusSchema>;
