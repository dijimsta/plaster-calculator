export type Membership = {
    teamId: string;
    role: string;
};

export type Invitation = {
    teamId: string;
    email: string;
    tokenHash: string;
    invitedByUserId: string;
    expiresAt: string;
    acceptedAt?: string | null;
    acceptedByUserId?: string | null;
    createdAt: string;
    updatedAt: string;
};

export type PendingInvitation = {
    teamId: string;
    email: string;
    invitedByUserId: string;
    expiresAt: string;
    createdAt: string;
    updatedAt: string;
};

/** Bounds for a single page of an ordered list. Omit either field for an unbounded call. */
export type ListPageOptions = Readonly<{
    limit?: number;
    offset?: number;
}>;

export type AuthUser = {
    email?: string;
    customClaims?: Record<string, unknown>;
};

export type TeamInvitationDependencies = {
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
    revokeInvitation(teamId: string, email: string, now: string): Promise<void>;
    listPendingInvitations(
        teamId: string,
        now: string,
        options?: ListPageOptions,
    ): Promise<PendingInvitation[]>;
    getInvitationByTokenHash(
        tokenHash: string,
    ): Promise<Invitation | undefined>;
    acceptInvitation(input: {
        teamId: string;
        email: string;
        tokenHash: string;
        userId: string;
    }): Promise<void>;
};
