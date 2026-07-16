import { z } from "zod";

export const EdgeOverrideSchema = z
    .object({
        wallBoardProfile: z.string().optional(),
        wallBoardType: z.string().optional(),
        wallPlasterType: z.string().optional(),
        noPlaster: z.boolean().optional(),
    })
    .readonly();

export type EdgeOverride = z.infer<typeof EdgeOverrideSchema>;
