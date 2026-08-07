import "./bootstrap.js";

import { randomUUID } from "node:crypto";

import * as DataConnector from "@generated/data-connector-admin";
import { getAuth } from "firebase-admin/auth";
import { onCall } from "firebase-functions/https";
import { auth as firebaseAuth } from "firebase-functions/v1";

import { requireAuth } from "./auth.js";

export async function ensureTeamForUser(userId: string): Promise<string> {
    const response = await DataConnector.getTeamMembershipForUser({ userId });
    const existing = response.data.teamMembers[0];
    if (existing) return existing.teamId;

    const user = await getAuth().getUser(userId);
    const teamId = `T${randomUUID()}`;
    await DataConnector.createTeam({
        id: teamId,
        name: personalTeamName(user.displayName, user.email),
        createdByUserId: userId,
    });
    await DataConnector.createTeamMember({ teamId, userId, role: "OWNER" });
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
        await ensureTeamForUser(user.uid);
    });

function personalTeamName(displayName?: string, email?: string): string {
    const name = displayName?.trim() || email?.split("@")[0] || "Personal";
    return `${name}'s team`;
}
