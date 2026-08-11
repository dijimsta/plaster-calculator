import { z } from "zod";

export const TEAM_OWNER_ROLE = "OWNER";
export const TEAM_MEMBER_ROLE = "MEMBER";

export const TeamRoleSchema = z.union([
    z.literal(TEAM_OWNER_ROLE),
    z.literal(TEAM_MEMBER_ROLE),
]);

export type TeamRole = z.infer<typeof TeamRoleSchema>;
