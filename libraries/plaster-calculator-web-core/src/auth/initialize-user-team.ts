import type { User } from "firebase/auth";

import type { TeamsService } from "../teams/teams.service.ts";

export async function initializeUserTeam(
    user: User,
    teamsService: TeamsService,
    invitationToken?: string,
): Promise<string> {
    const teamId = await teamsService.initializeMyTeam(invitationToken);
    await user.getIdToken(true);
    return teamId;
}
