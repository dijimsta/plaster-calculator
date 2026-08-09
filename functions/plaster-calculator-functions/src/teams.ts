import "./bootstrap.js";

import * as DataConnector from "@generated/data-connector-admin";
import { getAuth } from "firebase-admin/auth";
import { onCall } from "firebase-functions/https";
import { auth as firebaseAuth } from "firebase-functions/v1";

import { requireAuth } from "./auth.js";
import { shouldCreatePersonalTeamForNewUser } from "./team-invitations.js";

export async function ensureTeamForUser(userId: string): Promise<string> {
    const response = await DataConnector.getTeamMembershipForUser({ userId });
    const existing = response.data.teamMembers[0];
    if (existing) return existing.teamId;

    const user = await getAuth().getUser(userId);
    const teamId = personalTeamId(userId);
    await DataConnector.upsertTeam({
        id: teamId,
        name: personalTeamName(user.displayName, user.email),
        createdByUserId: userId,
    });
    await DataConnector.upsertTeamMember({ teamId, userId, role: "OWNER" });
    await getAuth().setCustomUserClaims(userId, {
        ...(user.customClaims ?? {}),
        teamId,
    });
    return teamId;
}

export const ensureMyTeam = onCall(async (request) => {
    const auth = requireAuth(request);
    return { teamId: await ensureTeamForUser(auth.uid) };
});

export const createPersonalTeamForNewUser = firebaseAuth
    .user()
    .onCreate(async (user) => {
        if (!(await shouldCreatePersonalTeamForNewUser(user.email))) {
            return;
        }
        await ensureTeamForUser(user.uid);
    });

function personalTeamName(displayName?: string, email?: string): string {
    const name = displayName?.trim() || email?.split("@")[0] || "Personal";
    return `${name}'s team`;
}

function personalTeamId(userId: string): string {
    return `T${userId}`;
}
