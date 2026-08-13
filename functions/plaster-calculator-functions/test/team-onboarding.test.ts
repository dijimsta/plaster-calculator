import assert from "node:assert/strict";
import test from "node:test";

import { createTeamOnboardingService } from "../src/team-onboarding-domain.ts";
import type { TeamOnboardingDependencies } from "../src/team-onboarding-domain.ts";

function createDependencies(
    overrides: Partial<TeamOnboardingDependencies> = {},
): TeamOnboardingDependencies {
    return {
        getMemberships: async () => [],
        getAuthUser: async () => ({
            displayName: "Test User",
            email: "test@example.com",
            customClaims: { plan: "trial" },
        }),
        upsertTeam: async () => undefined,
        upsertTeamMember: async () => undefined,
        setCustomUserClaims: async () => undefined,
        acceptInvitation: async () => ({ teamId: "invited-team" }),
        ...overrides,
    };
}

test("accepts an invitation before considering a personal team", async () => {
    const accepted: unknown[] = [];
    const service = createTeamOnboardingService(
        createDependencies({
            getMemberships: async () => {
                throw new Error("membership lookup must not run");
            },
            acceptInvitation: async (userId, token) => {
                accepted.push({ userId, token });
                return { teamId: "invited-team" };
            },
        }),
    );

    const result = await service.initialize("user-1", "invitation-token");

    assert.deepEqual(result, { teamId: "invited-team" });
    assert.deepEqual(accepted, [
        { userId: "user-1", token: "invitation-token" },
    ]);
});

test("creates a deterministic personal team without an invitation", async () => {
    const teams: unknown[] = [];
    const members: unknown[] = [];
    const claims: unknown[] = [];
    const service = createTeamOnboardingService(
        createDependencies({
            upsertTeam: async (input) => {
                teams.push(input);
            },
            upsertTeamMember: async (input) => {
                members.push(input);
            },
            setCustomUserClaims: async (userId, value) => {
                claims.push({ userId, value });
            },
        }),
    );

    const result = await service.initialize("user-1");

    assert.deepEqual(result, { teamId: "Tuser-1" });
    assert.deepEqual(teams, [
        {
            id: "Tuser-1",
            name: "Test User's team",
            createdByUserId: "user-1",
        },
    ]);
    assert.deepEqual(members, [
        { teamId: "Tuser-1", userId: "user-1", role: "OWNER" },
    ]);
    assert.deepEqual(claims, [
        { userId: "user-1", value: { plan: "trial", teamId: "Tuser-1" } },
    ]);
});

test("reuses an existing membership and repairs its team claim", async () => {
    const claims: unknown[] = [];
    const service = createTeamOnboardingService(
        createDependencies({
            getMemberships: async () => [{ teamId: "existing-team" }],
            upsertTeam: async () => {
                throw new Error("team must not be recreated");
            },
            upsertTeamMember: async () => {
                throw new Error("membership must not be recreated");
            },
            setCustomUserClaims: async (userId, value) => {
                claims.push({ userId, value });
            },
        }),
    );

    const result = await service.initialize("user-1");

    assert.deepEqual(result, { teamId: "existing-team" });
    assert.deepEqual(claims, [
        {
            userId: "user-1",
            value: { plan: "trial", teamId: "existing-team" },
        },
    ]);
});

test("rejects users with multiple team memberships", async () => {
    const service = createTeamOnboardingService(
        createDependencies({
            getMemberships: async () => [
                { teamId: "team-1" },
                { teamId: "team-2" },
            ],
        }),
    );

    await assert.rejects(
        service.initialize("user-1"),
        (error: unknown) =>
            typeof error === "object" &&
            error !== null &&
            "code" in error &&
            error.code === "failed-precondition",
    );
});
