import { createHash } from "node:crypto";

import {
    TEAM_MEMBER_ROLE,
    type TeamInvitationRole,
} from "@libraries/plaster-calculator-common";
import { HttpsError } from "firebase-functions/https";

import {
    recoverConcurrentAcceptance,
    recoverExistingMembership,
} from "./team-invitation-acceptance.js";
import type {
    AuthUser,
    ListPageOptions,
    Membership,
    TeamInvitationDependencies,
} from "./team-invitation-types.js";

export type {
    AuthUser,
    Invitation,
    ListPageOptions,
    Membership,
    PendingInvitation,
    TeamInvitationDependencies,
} from "./team-invitation-types.js";

const INVITATION_LIFETIME_MS = 7 * 24 * 60 * 60 * 1000;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/u;
const TOKEN_PATTERN = /^[A-Za-z0-9_-]{43}$/u;

export function normalizeInvitationEmail(value: unknown): string {
    if (typeof value !== "string" || value.trim().length === 0) {
        throw new HttpsError("invalid-argument", "Email is required.");
    }

    const email = value.trim().toLowerCase();
    if (email.length > 254 || !EMAIL_PATTERN.test(email)) {
        throw new HttpsError("invalid-argument", "Email must be valid.");
    }

    return email;
}

export function readInvitationRole(value: unknown): TeamInvitationRole {
    if (value === undefined || value === TEAM_MEMBER_ROLE) {
        return TEAM_MEMBER_ROLE;
    }

    throw new HttpsError(
        "invalid-argument",
        "Invitations currently support the member role only.",
    );
}

export function hashInvitationToken(token: string): string {
    return createHash("sha256").update(token).digest("hex");
}

export function buildInvitationPath(token: string): string {
    return `/login?invitation=${encodeURIComponent(token)}`;
}

export function selectOwnerTeamId(memberships: Membership[]): string {
    if (memberships.length !== 1) {
        throw new HttpsError(
            "failed-precondition",
            "User must belong to exactly one team.",
        );
    }

    const membership = memberships[0];
    if (!membership || membership.role !== "OWNER") {
        throw new HttpsError(
            "permission-denied",
            "Only team owners can manage invitations.",
        );
    }

    return membership.teamId;
}

export function createTeamInvitationService(
    dependencies: TeamInvitationDependencies,
) {
    return {
        create: async (
            userId: string,
            emailValue: unknown,
            roleValue?: unknown,
        ) => {
            const email = normalizeInvitationEmail(emailValue);
            const role = readInvitationRole(roleValue);
            const teamId = selectOwnerTeamId(
                await dependencies.getMemberships(userId),
            );
            if (await dependencies.authUserExists(email)) {
                throw new HttpsError(
                    "already-exists",
                    "A user with this email already exists.",
                );
            }

            const now = dependencies.now();
            const expiresAt = new Date(
                now.getTime() + INVITATION_LIFETIME_MS,
            ).toISOString();
            const token = dependencies.generateToken();
            await dependencies.rotateInvitation({
                teamId,
                email,
                tokenHash: hashInvitationToken(token),
                invitedByUserId: userId,
                expiresAt,
            });

            return {
                invitation: { teamId, email, role, expiresAt },
                token,
                path: buildInvitationPath(token),
            };
        },
        listPending: async (userId: string, options?: ListPageOptions) => {
            const teamId = selectOwnerTeamId(
                await dependencies.getMemberships(userId),
            );
            const invitations = await dependencies.listPendingInvitations(
                teamId,
                dependencies.now().toISOString(),
                options,
            );
            return {
                invitations: invitations.map((invitation) => ({
                    ...invitation,
                    role: TEAM_MEMBER_ROLE,
                })),
            };
        },
        revoke: async (userId: string, emailValue: unknown) => {
            const email = normalizeInvitationEmail(emailValue);
            const teamId = selectOwnerTeamId(
                await dependencies.getMemberships(userId),
            );
            await dependencies.revokeInvitation(
                teamId,
                email,
                dependencies.now().toISOString(),
            );
            return { revokedEmail: email };
        },
        accept: async (userId: string, tokenValue: unknown) => {
            const token = readInvitationToken(tokenValue);
            const invitation = await dependencies.getInvitationByTokenHash(
                hashInvitationToken(token),
            );
            if (!invitation) throw invalidInvitationError();

            const authUser = await dependencies.getAuthUser(userId);
            const userEmail = authUser.email
                ? normalizeInvitationEmail(authUser.email)
                : undefined;
            if (!userEmail || userEmail !== invitation.email) {
                throw new HttpsError(
                    "permission-denied",
                    "Invitation email does not match the signed-in user.",
                );
            }

            if (invitation.acceptedAt) {
                if (invitation.acceptedByUserId !== userId) {
                    throw new HttpsError(
                        "failed-precondition",
                        "Invitation has already been accepted.",
                    );
                }
                await setTeamClaim(
                    dependencies,
                    userId,
                    authUser,
                    invitation.teamId,
                );
                return { teamId: invitation.teamId, role: TEAM_MEMBER_ROLE };
            }

            if (
                Date.parse(invitation.expiresAt) <= dependencies.now().getTime()
            ) {
                throw new HttpsError(
                    "deadline-exceeded",
                    "Invitation has expired.",
                );
            }

            const memberships = await dependencies.getMemberships(userId);
            if (memberships.length > 0) {
                return recoverExistingMembership(
                    dependencies,
                    userId,
                    authUser,
                    invitation,
                    memberships,
                );
            }

            try {
                await dependencies.acceptInvitation({
                    teamId: invitation.teamId,
                    email: invitation.email,
                    tokenHash: invitation.tokenHash,
                    userId,
                });
            } catch {
                return recoverConcurrentAcceptance(
                    dependencies,
                    userId,
                    authUser,
                    invitation,
                );
            }

            await setTeamClaim(
                dependencies,
                userId,
                authUser,
                invitation.teamId,
            );
            return { teamId: invitation.teamId, role: TEAM_MEMBER_ROLE };
        },
    };
}

async function setTeamClaim(
    dependencies: TeamInvitationDependencies,
    userId: string,
    authUser: AuthUser,
    teamId: string,
) {
    await dependencies.setCustomUserClaims(userId, {
        ...(authUser.customClaims ?? {}),
        teamId,
    });
}

function readInvitationToken(value: unknown) {
    if (typeof value !== "string" || !TOKEN_PATTERN.test(value.trim())) {
        throw invalidInvitationError();
    }

    return value.trim();
}

function invalidInvitationError() {
    return new HttpsError("not-found", "Invitation is invalid.");
}
