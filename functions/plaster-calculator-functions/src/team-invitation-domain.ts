import { createHash } from "node:crypto";

import { HttpsError } from "firebase-functions/https";

const INVITATION_LIFETIME_MS = 7 * 24 * 60 * 60 * 1000;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/u;
const TOKEN_PATTERN = /^[A-Za-z0-9_-]{43}$/u;

interface Membership {
    teamId: string;
    role: string;
}

interface Invitation {
    teamId: string;
    email: string;
    tokenHash: string;
    invitedByUserId: string;
    expiresAt: string;
    acceptedAt?: string | null;
    acceptedByUserId?: string | null;
    createdAt: string;
    updatedAt: string;
}

export interface PendingInvitation {
    teamId: string;
    email: string;
    invitedByUserId: string;
    expiresAt: string;
    createdAt: string;
    updatedAt: string;
}

interface InvitationMatch {
    teamId: string;
    email: string;
    expiresAt: string;
}

interface AuthUser {
    email?: string;
    customClaims?: Record<string, unknown>;
}

export interface TeamInvitationDependencies {
    now(): Date;
    generateToken(): string;
    getMemberships(userId: string): Promise<Membership[]>;
    authUserExists(email: string): Promise<boolean>;
    getAuthUser(userId: string): Promise<AuthUser>;
    setCustomUserClaims(
        userId: string,
        claims: Record<string, unknown>,
    ): Promise<void>;
    rotateInvitation(input: {
        teamId: string;
        email: string;
        tokenHash: string;
        invitedByUserId: string;
        expiresAt: string;
    }): Promise<void>;
    listPendingInvitations(
        teamId: string,
        now: string,
    ): Promise<PendingInvitation[]>;
    findPendingInvitations(
        email: string,
        now: string,
    ): Promise<InvitationMatch[]>;
    getInvitationByTokenHash(
        tokenHash: string,
    ): Promise<Invitation | undefined>;
    acceptInvitation(input: {
        teamId: string;
        email: string;
        tokenHash: string;
        userId: string;
    }): Promise<void>;
}

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
        create: async (userId: string, emailValue: unknown) => {
            const email = normalizeInvitationEmail(emailValue);
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
                invitation: { teamId, email, expiresAt },
                token,
                path: buildInvitationPath(token),
            };
        },
        listPending: async (userId: string) => {
            const teamId = selectOwnerTeamId(
                await dependencies.getMemberships(userId),
            );
            const invitations = await dependencies.listPendingInvitations(
                teamId,
                dependencies.now().toISOString(),
            );
            return { invitations };
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
                return { teamId: invitation.teamId, role: "MEMBER" as const };
            }

            if (
                Date.parse(invitation.expiresAt) <= dependencies.now().getTime()
            ) {
                throw new HttpsError(
                    "deadline-exceeded",
                    "Invitation has expired.",
                );
            }

            if ((await dependencies.getMemberships(userId)).length > 0) {
                throw new HttpsError(
                    "failed-precondition",
                    "User already belongs to a team.",
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
                throw new HttpsError(
                    "failed-precondition",
                    "Invitation could not be accepted.",
                );
            }

            await setTeamClaim(
                dependencies,
                userId,
                authUser,
                invitation.teamId,
            );
            return { teamId: invitation.teamId, role: "MEMBER" as const };
        },
        hasPendingForEmail: async (emailValue: unknown) => {
            const email = normalizeInvitationEmail(emailValue);
            const invitations = await dependencies.findPendingInvitations(
                email,
                dependencies.now().toISOString(),
            );
            return invitations.length > 0;
        },
    };
}

export async function shouldCreatePersonalTeamForNewUser(
    email: string | undefined,
    hasPendingInvitation: (value: string) => Promise<boolean>,
) {
    return !email || !(await hasPendingInvitation(email));
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
