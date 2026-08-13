import { z } from "zod";

export const InitializeMyTeamRequestSchema = z
    .object({
        invitationToken: z.string().optional(),
    })
    .readonly();

export type InitializeMyTeamRequest = z.infer<
    typeof InitializeMyTeamRequestSchema
>;

export const InitializeMyTeamResponseSchema = z
    .object({
        teamId: z.string().min(1),
    })
    .readonly();

export type InitializeMyTeamResponse = z.infer<
    typeof InitializeMyTeamResponseSchema
>;
