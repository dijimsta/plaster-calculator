import { TEAM_OWNER_ROLE } from "@libraries/plaster-calculator-common";
import { HttpsError } from "firebase-functions/https";

type Membership = {
    teamId: string;
};

type AuthUser = {
    displayName?: string;
    email?: string;
    customClaims?: Record<string, unknown>;
};

export type TeamResult = {
    teamId: string;
};

export type TeamOnboardingDependencies = {
    getMemberships(userId: string): Promise<Membership[]>;
    getAuthUser(userId: string): Promise<AuthUser>;
    upsertTeam(input: {
        id: string;
        name: string;
        createdByUserId: string;
    }): Promise<void>;
    upsertTeamMember(input: {
        teamId: string;
        userId: string;
        role: string;
    }): Promise<void>;
    setCustomUserClaims(
        userId: string,
        claims: Record<string, unknown>,
    ): Promise<void>;
    acceptInvitation(userId: string, token: unknown): Promise<TeamResult>;
};

export function createTeamOnboardingService(
    dependencies: TeamOnboardingDependencies,
) {
    return {
        initialize: async (
            userId: string,
            invitationToken?: unknown,
        ): Promise<TeamResult> => {
            if (invitationToken !== undefined) {
                return dependencies.acceptInvitation(userId, invitationToken);
            }

            const memberships = await dependencies.getMemberships(userId);
            if (memberships.length > 1) {
                throw new HttpsError(
                    "failed-precondition",
                    "User must belong to exactly one team.",
                );
            }

            const user = await dependencies.getAuthUser(userId);
            const existingMembership = memberships[0];
            const teamId = existingMembership?.teamId ?? personalTeamId(userId);

            if (!existingMembership) {
                await dependencies.upsertTeam({
                    id: teamId,
                    name: personalTeamName(user.displayName, user.email),
                    createdByUserId: userId,
                });
                await dependencies.upsertTeamMember({
                    teamId,
                    userId,
                    role: TEAM_OWNER_ROLE,
                });
            }

            await dependencies.setCustomUserClaims(userId, {
                ...(user.customClaims ?? {}),
                teamId,
            });
            return { teamId };
        },
    };
}

function personalTeamName(displayName?: string, email?: string): string {
    const name = displayName?.trim() || email?.split("@")[0] || "Personal";
    return `${name}'s team`;
}

function personalTeamId(userId: string): string {
    return `T${userId}`;
}
