import { z } from "zod";

import { UploadTypeSchema } from "./upload-type.schema.ts";

export const UploadResponseSchema = z
    .object({
        projectId: z.string(),
        uploadType: UploadTypeSchema,
        pageCount: z.number(),
        status: z.string(),
    })
    .readonly();

export type UploadResponse = z.infer<typeof UploadResponseSchema>;
