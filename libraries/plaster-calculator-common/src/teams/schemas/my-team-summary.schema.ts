import { z } from "zod";

import { TeamRoleSchema } from "./team-role.schema.ts";

export const MyTeamSummarySchema = z
    .object({
        teamId: z.string().min(1),
        name: z.string().min(1),
        role: TeamRoleSchema,
    })
    .readonly();

export type MyTeamSummary = z.infer<typeof MyTeamSummarySchema>;
