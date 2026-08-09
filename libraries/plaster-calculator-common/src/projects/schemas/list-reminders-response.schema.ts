import { z } from "zod";

import { ReminderSchema } from "./reminder.schema.ts";

export const ListRemindersResponseSchema = z
    .object({
        reminders: z.array(ReminderSchema),
    })
    .readonly();

export type ListRemindersResponse = z.infer<typeof ListRemindersResponseSchema>;
