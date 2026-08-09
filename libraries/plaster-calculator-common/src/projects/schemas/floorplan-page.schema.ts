import { z } from "zod";

export const FloorplanPageSchema = z
    .object({
        id: z.string(),
        pageNumber: z.number(),
        status: z.string(),
        processingError: z.string().nullable(),
        imageUrl: z.string(),
        previewUrl: z.string(),
        overlay: z.string().nullable(),
        scaleMmPerPx: z.number().nullable(),
        ceilingHeightMm: z.number().nullable(),
        referencePoints: z.string().nullable(),
        referenceLengthMm: z.number().nullable(),
        processingStrategy: z.string().nullable().optional(),
        processingMetadata: z.string().nullable().optional(),
        updatedAt: z.string(),
    })
    .readonly();

export type FloorplanPage = z.infer<typeof FloorplanPageSchema>;
