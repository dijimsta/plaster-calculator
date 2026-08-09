import { z } from "zod";

export const CompanySummarySchema = z.object({
    id: z.string(),
    teamId: z.string().nullable().optional(),
    companyName: z.string(),
    businessNumber: z.string().nullable(),
    phoneNumber: z.string().nullable(),
    primaryContactId: z.string().nullable(),
    createdAt: z.string(),
    updatedAt: z.string(),
});

export type CompanySummary = z.infer<typeof CompanySummarySchema>;
