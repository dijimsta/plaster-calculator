import { z } from "zod";

export const CSV_MIME_TYPE = "text/csv";

export const ExportCsvResponseSchema = z
    .object({
        fileName: z.string(),
        mimeType: z.literal(CSV_MIME_TYPE),
        csv: z.string(),
    })
    .readonly();

export type ExportCsvResponse = z.infer<typeof ExportCsvResponseSchema>;
