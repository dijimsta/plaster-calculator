import { z } from "zod";

export const EnsureMyTeamResponseSchema = z
    .object({
        teamId: z.string(),
    })
    .readonly();

export type EnsureMyTeamResponse = z.infer<typeof EnsureMyTeamResponseSchema>;
