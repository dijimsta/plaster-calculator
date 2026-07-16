import { z } from "zod";

export const RakedCeilingSchema = z
    .object({
        lowEdgeIndex: z.number(),
        highEdgeIndex: z.number(),
        lowHeightMm: z.number().nullable(),
        highHeightMm: z.number().nullable(),
    })
    .readonly();

export type RakedCeiling = z.infer<typeof RakedCeilingSchema>;
