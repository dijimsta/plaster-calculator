import { z } from "zod";

import { AreaPolygonSchema } from "./area-polygon.schema.ts";

export const OverlaySchema = z
    .object({
        sourceFile: z.string().optional(),
        imageSizePx: z
            .object({ width: z.number(), height: z.number() })
            .optional(),
        areas: z.array(AreaPolygonSchema),
    })
    .readonly();

export type Overlay = z.infer<typeof OverlaySchema>;
