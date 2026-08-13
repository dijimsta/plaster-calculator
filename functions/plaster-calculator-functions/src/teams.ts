import "./bootstrap.js";

import * as DataConnector from "@generated/data-connector-admin";
import {
    EnsureMyTeamResponseSchema,
    InitializeMyTeamResponseSchema,
} from "@libraries/plaster-calculator-common";
import { getAuth } from "firebase-admin/auth";
import { onCall } from "firebase-functions/https";

import { requireAuth } from "./auth.js";
import { acceptTeamInvitationForUser } from "./team-invitations.js";
import { createTeamOnboardingService } from "./team-onboarding-domain.js";
import { isRecord } from "./validation.js";

const teamOnboardingService = createTeamOnboardingService({
    getMemberships: async (userId) => {
        const response = await DataConnector.getTeamMembershipForUser({
            userId,
        });
        return response.data.teamMembers;
    },
    getAuthUser: async (userId) => getAuth().getUser(userId),
    upsertTeam: async (input) => {
        await DataConnector.upsertTeam(input);
    },
    upsertTeamMember: async (input) => {
        await DataConnector.upsertTeamMember(input);
    },
    setCustomUserClaims: async (userId, claims) => {
        await getAuth().setCustomUserClaims(userId, claims);
    },
    acceptInvitation: acceptTeamInvitationForUser,
});

export async function initializeTeamForUser(
    userId: string,
    invitationToken?: unknown,
) {
    return teamOnboardingService.initialize(userId, invitationToken);
}

export const initializeMyTeam = onCall(async (request) => {
    const auth = requireAuth(request);
    const data = isRecord(request.data) ? request.data : {};
    const result = await initializeTeamForUser(
        auth.uid,
        data["invitationToken"],
    );
    return InitializeMyTeamResponseSchema.parse(result);
});

// Compatibility wrapper for clients deployed before initializeMyTeam.
export const ensureMyTeam = onCall(async (request) => {
    const auth = requireAuth(request);
    return EnsureMyTeamResponseSchema.parse(
        await initializeTeamForUser(auth.uid),
    );
});
