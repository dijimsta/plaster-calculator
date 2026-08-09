import { z } from "zod";

import { SalesStatusSchema } from "./sales-status.schema.ts";
import { UploadTypeSchema } from "./upload-type.schema.ts";

export const ProjectSummarySchema = z.object({
    id: z.string(),
    companyId: z.string().nullable(),
    companyName: z.string().nullable().optional(),
    name: z.string(),
    address: z.string().nullable(),
    originalFileName: z.string(),
    uploadType: UploadTypeSchema,
    status: z.string(),
    salesStatus: SalesStatusSchema,
    processingError: z.string().nullable().optional(),
    createdAt: z.string(),
    updatedAt: z.string(),
    pageCount: z.number(),
    teamId: z.string().nullable().optional(),
    assignee: z.string().nullable().optional(),
});

export type ProjectSummary = z.infer<typeof ProjectSummarySchema>;
