import {
    ListMyTeamMembersResponseSchema,
    RemoveTeamMemberRequestSchema,
    RemoveTeamMemberResponseSchema,
    TEAM_OWNER_ROLE,
    UpdateTeamNameRequestSchema,
    UpdateTeamNameResponseSchema,
    type ListMyTeamMembersResponse,
    type RemoveTeamMemberResponse,
    type TeamMember,
    type TeamRole,
    type UpdateTeamNameResponse,
} from "@libraries/plaster-calculator-common";
import { HttpsError } from "firebase-functions/https";

export type TeamMembership = Readonly<{
    teamId: string;
    userId: string;
    role: string;
    team?: Readonly<{
        id: string;
        name: string;
    }>;
}>;

export type TeamAuthUser = Readonly<{
    uid: string;
    displayName?: string;
    email?: string;
    photoURL?: string;
    customClaims?: Readonly<Record<string, unknown>>;
}>;

/** Bounds for a single page of an ordered list. Omit either field for an unbounded call. */
export type ListPageOptions = Readonly<{
    limit?: number;
    offset?: number;
}>;

export type TeamMembersDependencies = {
    getMemberships(userId: string): Promise<readonly TeamMembership[]>;
    listMembers(
        teamId: string,
        options?: ListPageOptions,
    ): Promise<readonly TeamMembership[]>;
    getMember(teamId: string, userId: string): Promise<TeamMembership | null>;
    deleteMember(teamId: string, userId: string): Promise<void>;
    updateTeamName(teamId: string, name: string): Promise<void>;
    listAuthUsers(userIds: readonly string[]): Promise<readonly TeamAuthUser[]>;
    getAuthUser(userId: string): Promise<TeamAuthUser | null>;
    revokeRefreshTokens(userId: string): Promise<void>;
    setCustomUserClaims(
        userId: string,
        claims: Readonly<Record<string, unknown>>,
    ): Promise<void>;
};

export type TeamMembersService = Readonly<{
    list(
        userId: string,
        options?: ListPageOptions,
    ): Promise<ListMyTeamMembersResponse>;
    remove(userId: string, input: unknown): Promise<RemoveTeamMemberResponse>;
    updateName(userId: string, input: unknown): Promise<UpdateTeamNameResponse>;
}>;

export function createTeamMembersService(
    dependencies: TeamMembersDependencies,
): TeamMembersService {
    return {
        async list(userId, options) {
            const currentMembership = selectMembership(
                await dependencies.getMemberships(userId),
            );
            const memberships = await dependencies.listMembers(
                currentMembership.teamId,
                options,
            );
            const authUsers = await dependencies.listAuthUsers(
                memberships.map((member) => member.userId),
            );
            const usersById = new Map(
                authUsers.map((user) => [user.uid, user] as const),
            );
            const mappedMembers = memberships.map((member) =>
                toTeamMember(member, usersById.get(member.userId)),
            );
            const isPaginated =
                options?.limit !== undefined || options?.offset !== undefined;
            // Data Connect orders this query by createdAt ASC, so a paginated
            // page is only a contiguous, correct slice of that same order.
            // Re-sorting by role + alphabetical display name (below) after
            // fetching an unbounded result works today, but applying it to a
            // single page would scatter members across pages, since display
            // name/email live in Firebase Auth, not the TeamMember table, so
            // Data Connect's orderBy can't express that ordering itself. So a
            // paginated call intentionally skips the re-sort and returns
            // members in createdAt-ASC (join) order instead of
            // owner-first-then-alphabetical; only the unbounded call keeps
            // today's exact sorted behavior.
            const members = isPaginated
                ? mappedMembers
                : mappedMembers.toSorted(compareTeamMembers);

            return ListMyTeamMembersResponseSchema.parse({
                currentUserRole: currentMembership.role,
                teamName: requireTeamName(currentMembership),
                members,
            });
        },
        async remove(userId, input) {
            const request = parseRemoveRequest(input);
            const currentMembership = selectMembership(
                await dependencies.getMemberships(userId),
            );
            requireOwner(currentMembership.role);
            const target = await dependencies.getMember(
                currentMembership.teamId,
                request.userId,
            );
            requireRemovableTarget(target);

            if (target !== null) {
                await dependencies.deleteMember(
                    currentMembership.teamId,
                    request.userId,
                );
            }
            await clearTeamAccess(
                dependencies,
                currentMembership.teamId,
                request.userId,
            );

            return RemoveTeamMemberResponseSchema.parse({
                removedUserId: request.userId,
            });
        },
        async updateName(userId, input) {
            const request = parseUpdateNameRequest(input);
            const currentMembership = selectMembership(
                await dependencies.getMemberships(userId),
            );
            requireOwner(currentMembership.role);
            await dependencies.updateTeamName(
                currentMembership.teamId,
                request.name,
            );

            return UpdateTeamNameResponseSchema.parse({
                teamName: request.name,
            });
        },
    };
}

function requireTeamName(membership: TeamMembership): string {
    const teamName = membership.team?.name.trim();
    if (!teamName) {
        throw new HttpsError("internal", "Team name is unavailable.");
    }
    return teamName;
}

function selectMembership(
    memberships: readonly TeamMembership[],
): TeamMembership {
    const membership = memberships[0];
    if (memberships.length !== 1 || membership === undefined) {
        throw new HttpsError(
            "failed-precondition",
            "User must belong to exactly one team.",
        );
    }
    return membership;
}

function parseRemoveRequest(input: unknown): { readonly userId: string } {
    const result = RemoveTeamMemberRequestSchema.safeParse(input);
    if (!result.success) {
        throw new HttpsError("invalid-argument", "User ID is required.");
    }
    return result.data;
}

function parseUpdateNameRequest(input: unknown): { readonly name: string } {
    const result = UpdateTeamNameRequestSchema.safeParse(input);
    if (!result.success) {
        throw new HttpsError(
            "invalid-argument",
            "Team name must be between 1 and 100 characters.",
        );
    }
    return result.data;
}

function requireOwner(role: string): void {
    if (role !== TEAM_OWNER_ROLE) {
        throw new HttpsError(
            "permission-denied",
            "Only the team owner can remove members.",
        );
    }
}

function requireRemovableTarget(target: TeamMembership | null): void {
    if (target?.role === TEAM_OWNER_ROLE) {
        throw new HttpsError(
            "failed-precondition",
            "The owner cannot be removed.",
        );
    }
}

function toTeamMember(
    membership: TeamMembership,
    user: TeamAuthUser | undefined,
): TeamMember {
    return {
        userId: membership.userId,
        displayName: user?.displayName ?? null,
        email: user?.email ?? null,
        photoUrl: user?.photoURL ?? null,
        role: membership.role as TeamRole,
    };
}

function compareTeamMembers(left: TeamMember, right: TeamMember): number {
    const roleOrder = roleRank(left.role) - roleRank(right.role);
    if (roleOrder !== 0) return roleOrder;

    return memberSortLabel(left).localeCompare(memberSortLabel(right));
}

function roleRank(role: TeamRole): number {
    return role === TEAM_OWNER_ROLE ? 0 : 1;
}

function memberSortLabel(member: TeamMember): string {
    return member.displayName ?? member.email ?? member.userId;
}

async function clearTeamAccess(
    dependencies: TeamMembersDependencies,
    teamId: string,
    userId: string,
): Promise<void> {
    const user = await dependencies.getAuthUser(userId);
    if (user?.customClaims?.["teamId"] !== teamId) return;

    await dependencies.revokeRefreshTokens(userId);
    await dependencies.setCustomUserClaims(
        userId,
        withoutTeamClaim(user.customClaims),
    );
}

function withoutTeamClaim(
    claims: Readonly<Record<string, unknown>>,
): Readonly<Record<string, unknown>> {
    return Object.fromEntries(
        Object.entries(claims).filter(([key]) => key !== "teamId"),
    );
}
