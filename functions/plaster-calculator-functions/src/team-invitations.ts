import "./bootstrap.js";

import { randomBytes } from "node:crypto";

import * as DataConnector from "@generated/data-connector-admin";
import { getAuth } from "firebase-admin/auth";
import { onCall } from "firebase-functions/https";

import { requireAuth } from "./auth.js";
import {
    createTeamInvitationService,
    shouldCreatePersonalTeamForNewUser as shouldCreatePersonalTeam,
} from "./team-invitation-domain.js";
import { isRecord } from "./validation.js";

import type { TeamInvitationDependencies } from "./team-invitation-domain.js";

const defaultDependencies: TeamInvitationDependencies = {
    now: () => new Date(),
    generateToken: () => randomBytes(32).toString("base64url"),
    getMemberships: async (userId) => {
        const response = await DataConnector.getTeamMembershipForUser({
            userId,
        });
        return response.data.teamMembers;
    },
    authUserExists: async (email) => {
        try {
            await getAuth().getUserByEmail(email);
            return true;
        } catch (error) {
            if (isFirebaseUserNotFound(error)) return false;
            throw error;
        }
    },
    getAuthUser: async (userId) => getAuth().getUser(userId),
    setCustomUserClaims: async (userId, claims) => {
        await getAuth().setCustomUserClaims(userId, claims);
    },
    rotateInvitation: async (input) => {
        await DataConnector.rotateTeamInvitation(input);
    },
    listPendingInvitations: async (teamId, now) => {
        const response = await DataConnector.listPendingTeamInvitations({
            teamId,
            now,
        });
        return response.data.teamInvitations;
    },
    findPendingInvitations: async (email, now) => {
        const response = await DataConnector.findPendingTeamInvitationsForEmail(
            {
                email,
                now,
            },
        );
        return response.data.teamInvitations;
    },
    getInvitationByTokenHash: async (tokenHash) => {
        const response = await DataConnector.getTeamInvitationByTokenHash({
            tokenHash,
        });
        return response.data.teamInvitation;
    },
    acceptInvitation: async (input) => {
        await DataConnector.acceptTeamInvitation(input);
    },
};

const teamInvitationService = createTeamInvitationService(defaultDependencies);

export const createTeamInvitation = onCall(async (request) => {
    const auth = requireAuth(request);
    const data = isRecord(request.data) ? request.data : {};
    return teamInvitationService.create(auth.uid, data["email"]);
});

export const listPendingTeamInvitations = onCall(async (request) => {
    const auth = requireAuth(request);
    return teamInvitationService.listPending(auth.uid);
});

export const acceptTeamInvitation = onCall(async (request) => {
    const auth = requireAuth(request);
    const data = isRecord(request.data) ? request.data : {};
    return teamInvitationService.accept(auth.uid, data["token"]);
});

export async function hasPendingTeamInvitationForEmail(email: string) {
    return teamInvitationService.hasPendingForEmail(email);
}

export async function shouldCreatePersonalTeamForNewUser(
    email: string | undefined,
) {
    return shouldCreatePersonalTeam(email, hasPendingTeamInvitationForEmail);
}

function isFirebaseUserNotFound(error: unknown) {
    return (
        isRecord(error) &&
        typeof error["code"] === "string" &&
        error["code"] === "auth/user-not-found"
    );
}
