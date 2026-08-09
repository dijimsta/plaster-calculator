import { z } from "zod";

export const PDF_UPLOAD_TYPE = "PDF";
export const IMAGE_UPLOAD_TYPE = "IMAGE";

export const UploadTypeSchema = z.union([
    z.literal(PDF_UPLOAD_TYPE),
    z.literal(IMAGE_UPLOAD_TYPE),
]);

export type UploadType = z.infer<typeof UploadTypeSchema>;
