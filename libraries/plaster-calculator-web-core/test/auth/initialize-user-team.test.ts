import assert from "node:assert/strict";
import test from "node:test";

import type { User } from "firebase/auth";

import { initializeUserTeam } from "../../src/auth/initialize-user-team.ts";
import type { TeamsService } from "../../src/teams/teams.service.ts";

test("initializes from an invitation before refreshing the id token", async () => {
    const calls: unknown[] = [];
    const teamsService = {
        initializeMyTeam: async (invitationToken?: string) => {
            calls.push({ initializeMyTeam: invitationToken });
            return "team-1";
        },
    } as TeamsService;
    const user = {
        getIdToken: async (forceRefresh?: boolean) => {
            calls.push({ getIdToken: forceRefresh });
            return "id-token";
        },
    } as User;

    const result = await initializeUserTeam(
        user,
        teamsService,
        "invitation-token",
    );

    assert.equal(result, "team-1");
    assert.deepEqual(calls, [
        { initializeMyTeam: "invitation-token" },
        { getIdToken: true },
    ]);
});
