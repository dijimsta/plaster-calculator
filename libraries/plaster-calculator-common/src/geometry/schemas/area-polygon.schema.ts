import { z } from "zod";

import { EdgeOverrideSchema } from "./edge-override.schema.ts";
import { PointSchema } from "./point.schema.ts";
import { RakedCeilingSchema } from "./raked-ceiling.schema.ts";

export const AreaPolygonSchema = z
    .object({
        id: z.string(),
        label: z.string(),
        points: z.array(PointSchema),
        wallBoardProfile: z.string().optional(),
        wallBoardType: z.string().optional(),
        wallPlasterType: z.string().optional(),
        ceilingPlasterType: z.string(),
        edgeOverrides: z.record(z.string(), EdgeOverrideSchema).optional(),
        ceilingHeightMm: z.number().nullable().optional(),
        ceilingMode: z
            .union([z.literal("flat"), z.literal("raked")])
            .optional(),
        rakedCeiling: RakedCeilingSchema.optional(),
        isOutdoor: z.boolean().optional(),
        source: z.union([z.literal("detected"), z.literal("manual")]),
        deleted: z.boolean(),
        sourceRoomType: z.string().nullable().optional(),
        sourceAreaPx: z.number().optional(),
        sourceApproxLengthPx: z.number().optional(),
        sourceIsHole: z.boolean().optional(),
    })
    .readonly();

export type AreaPolygon = z.infer<typeof AreaPolygonSchema>;
