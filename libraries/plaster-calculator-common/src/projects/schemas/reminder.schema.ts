import { z } from "zod";

import { ReminderStatusSchema } from "./reminder-status.schema.ts";

export const ReminderSchema = z
    .object({
        id: z.string(),
        teamId: z.string().nullable().optional(),
        projectId: z.string(),
        companyId: z.string().nullable(),
        assignee: z.string().nullable(),
        name: z.string(),
        status: ReminderStatusSchema,
        dueAt: z.string(),
        completedAt: z.string().nullable(),
        createdAt: z.string(),
        updatedAt: z.string(),
    })
    .readonly();

export type Reminder = z.infer<typeof ReminderSchema>;
