import { z } from "zod";

import { TeamRoleSchema } from "./team-role.schema.ts";

export const TeamMemberSchema = z
    .object({
        userId: z.string().min(1),
        displayName: z.string().nullable(),
        email: z.string().nullable(),
        photoUrl: z.string().nullable(),
        role: TeamRoleSchema,
    })
    .readonly();

export type TeamMember = z.infer<typeof TeamMemberSchema>;
