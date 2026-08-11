import "./bootstrap.js";

import * as DataConnector from "@generated/data-connector-admin";
import { getAuth } from "firebase-admin/auth";
import type { UserIdentifier, UserRecord } from "firebase-admin/auth";
import { onCall } from "firebase-functions/https";

import { requireAuth } from "./auth.js";
import { createTeamMembersService } from "./team-members-domain.js";
import type {
    TeamAuthUser,
    TeamMembersDependencies,
} from "./team-members-domain.js";
import { isRecord } from "./validation.js";

const AUTH_BATCH_SIZE = 100;

const defaultDependencies: TeamMembersDependencies = {
    getMemberships: async (userId) => {
        const response = await DataConnector.getTeamMembershipForUser({
            userId,
        });
        return response.data.teamMembers;
    },
    listMembers: async (teamId) => {
        const response = await DataConnector.listTeamMembers({ teamId });
        return response.data.teamMembers;
    },
    getMember: async (teamId, userId) => {
        const response = await DataConnector.getTeamMember({ teamId, userId });
        return response.data.teamMember ?? null;
    },
    deleteMember: async (teamId, userId) => {
        await DataConnector.deleteTeamMember({ teamId, userId });
    },
    listAuthUsers,
    getAuthUser: getAuthUserOrNull,
    revokeRefreshTokens: async (userId) => {
        await getAuth().revokeRefreshTokens(userId);
    },
    setCustomUserClaims: async (userId, claims) => {
        await getAuth().setCustomUserClaims(userId, claims);
    },
};

const teamMembersService = createTeamMembersService(defaultDependencies);

export const listMyTeamMembers = onCall(async (request) => {
    const auth = requireAuth(request);
    return teamMembersService.list(auth.uid);
});

export const removeTeamMember = onCall(async (request) => {
    const auth = requireAuth(request);
    return teamMembersService.remove(auth.uid, request.data);
});

async function listAuthUsers(
    userIds: readonly string[],
): Promise<readonly TeamAuthUser[]> {
    const users: UserRecord[] = [];
    for (let start = 0; start < userIds.length; start += AUTH_BATCH_SIZE) {
        const identifiers: UserIdentifier[] = userIds
            .slice(start, start + AUTH_BATCH_SIZE)
            .map((uid) => ({ uid }));
        const result = await getAuth().getUsers(identifiers);
        users.push(...result.users);
    }
    return users;
}

async function getAuthUserOrNull(userId: string): Promise<TeamAuthUser | null> {
    try {
        return await getAuth().getUser(userId);
    } catch (error) {
        if (isFirebaseUserNotFound(error)) return null;
        throw error;
    }
}

function isFirebaseUserNotFound(error: unknown): boolean {
    return (
        isRecord(error) &&
        typeof error["code"] === "string" &&
        error["code"] === "auth/user-not-found"
    );
}
