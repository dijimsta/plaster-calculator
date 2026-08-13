import { TEAM_MEMBER_ROLE } from "@libraries/plaster-calculator-common";
import { HttpsError } from "firebase-functions/https";

import type {
    AuthUser,
    Invitation,
    Membership,
    TeamInvitationDependencies,
} from "./team-invitation-domain.js";

export async function recoverExistingMembership(
    dependencies: TeamInvitationDependencies,
    userId: string,
    authUser: AuthUser,
    invitation: Invitation,
    memberships: Membership[],
) {
    const acceptedInvitation = await dependencies.getInvitationByTokenHash(
        invitation.tokenHash,
    );
    if (
        memberships.length !== 1 ||
        memberships[0]?.teamId !== invitation.teamId ||
        !acceptedInvitation?.acceptedAt ||
        acceptedInvitation.acceptedByUserId !== userId
    ) {
        throw new HttpsError(
            "failed-precondition",
            "User already belongs to a team.",
        );
    }
    return repairAcceptedInvitation(dependencies, userId, authUser, invitation);
}

export async function recoverConcurrentAcceptance(
    dependencies: TeamInvitationDependencies,
    userId: string,
    authUser: AuthUser,
    invitation: Invitation,
) {
    const acceptedInvitation = await dependencies.getInvitationByTokenHash(
        invitation.tokenHash,
    );
    if (
        !acceptedInvitation?.acceptedAt ||
        acceptedInvitation.acceptedByUserId !== userId
    ) {
        throw new HttpsError(
            "failed-precondition",
            "Invitation could not be accepted.",
        );
    }
    return repairAcceptedInvitation(dependencies, userId, authUser, invitation);
}

async function repairAcceptedInvitation(
    dependencies: TeamInvitationDependencies,
    userId: string,
    authUser: AuthUser,
    invitation: Invitation,
) {
    await dependencies.setCustomUserClaims(userId, {
        ...(authUser.customClaims ?? {}),
        teamId: invitation.teamId,
    });
    return { teamId: invitation.teamId, role: TEAM_MEMBER_ROLE };
}
