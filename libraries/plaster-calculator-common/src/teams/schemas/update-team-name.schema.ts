import { z } from "zod";

export const TEAM_NAME_MAX_LENGTH = 100;

const TeamNameSchema = z.string().trim().min(1).max(TEAM_NAME_MAX_LENGTH);

export const UpdateTeamNameRequestSchema = z
    .object({ name: TeamNameSchema })
    .readonly();

export type UpdateTeamNameRequest = z.infer<typeof UpdateTeamNameRequestSchema>;

export const UpdateTeamNameResponseSchema = z
    .object({ teamName: TeamNameSchema })
    .readonly();

export type UpdateTeamNameResponse = z.infer<
    typeof UpdateTeamNameResponseSchema
>;
