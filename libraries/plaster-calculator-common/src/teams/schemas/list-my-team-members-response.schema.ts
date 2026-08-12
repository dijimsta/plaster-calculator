import { z } from "zod";

import { TeamMemberSchema } from "./team-member.schema.ts";
import { TeamRoleSchema } from "./team-role.schema.ts";

export const ListMyTeamMembersResponseSchema = z
    .object({
        currentUserRole: TeamRoleSchema,
        teamName: z.string().min(1),
        members: z.array(TeamMemberSchema).readonly(),
    })
    .readonly();

export type ListMyTeamMembersResponse = z.infer<
    typeof ListMyTeamMembersResponseSchema
>;
