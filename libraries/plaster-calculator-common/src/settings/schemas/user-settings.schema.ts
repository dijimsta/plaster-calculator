import { z } from "zod";

export const UserSettingsSchema = z
    .object({
        ownerId: z.string(),
        quoteFollowUpEnabled: z.boolean(),
        quoteFollowUpDays: z.number(),
        createdAt: z.string().nullable(),
        updatedAt: z.string().nullable(),
    })
    .readonly();

export type UserSettings = z.infer<typeof UserSettingsSchema>;
