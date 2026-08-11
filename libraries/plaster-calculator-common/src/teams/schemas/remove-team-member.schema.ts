import { z } from "zod";

export const RemoveTeamMemberRequestSchema = z
    .object({
        userId: z.string().min(1),
    })
    .readonly();

export type RemoveTeamMemberRequest = z.infer<
    typeof RemoveTeamMemberRequestSchema
>;

export const RemoveTeamMemberResponseSchema = z
    .object({
        removedUserId: z.string().min(1),
    })
    .readonly();

export type RemoveTeamMemberResponse = z.infer<
    typeof RemoveTeamMemberResponseSchema
>;
