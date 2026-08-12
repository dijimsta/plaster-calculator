import { z } from "zod";

import { TEAM_MEMBER_ROLE } from "./team-role.schema.ts";

export const TeamInvitationRoleSchema = z.literal(TEAM_MEMBER_ROLE);

export type TeamInvitationRole = z.infer<typeof TeamInvitationRoleSchema>;

export const CreateTeamInvitationRequestSchema = z
    .object({
        email: z.email(),
        role: TeamInvitationRoleSchema,
    })
    .readonly();

export type CreateTeamInvitationRequest = z.infer<
    typeof CreateTeamInvitationRequestSchema
>;

export const PendingTeamInvitationSchema = z
    .object({
        teamId: z.string().min(1),
        email: z.email(),
        role: TeamInvitationRoleSchema,
        invitedByUserId: z.string().min(1),
        expiresAt: z.string().min(1),
        createdAt: z.string().min(1),
        updatedAt: z.string().min(1),
    })
    .readonly();

export type PendingTeamInvitation = z.infer<typeof PendingTeamInvitationSchema>;

export const ListPendingTeamInvitationsResponseSchema = z
    .object({
        invitations: z.array(PendingTeamInvitationSchema).readonly(),
    })
    .readonly();

export type ListPendingTeamInvitationsResponse = z.infer<
    typeof ListPendingTeamInvitationsResponseSchema
>;

export const CreateTeamInvitationResponseSchema = z
    .object({
        invitation: z
            .object({
                teamId: z.string().min(1),
                email: z.email(),
                role: TeamInvitationRoleSchema,
                expiresAt: z.string().min(1),
            })
            .readonly(),
        token: z.string().min(1),
        path: z.string().min(1),
    })
    .readonly();

export type CreateTeamInvitationResponse = z.infer<
    typeof CreateTeamInvitationResponseSchema
>;

export const RevokeTeamInvitationRequestSchema = z
    .object({ email: z.email() })
    .readonly();

export const RevokeTeamInvitationResponseSchema = z
    .object({ revokedEmail: z.email() })
    .readonly();

export type RevokeTeamInvitationResponse = z.infer<
    typeof RevokeTeamInvitationResponseSchema
>;
