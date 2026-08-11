import assert from "node:assert/strict";
import test from "node:test";

import { createTeamMembersService } from "../src/team-members-domain.ts";
import type { TeamMembersDependencies } from "../src/team-members-domain.ts";

function createDependencies(
    overrides: Partial<TeamMembersDependencies> = {},
): TeamMembersDependencies {
    return {
        getMemberships: async () => [
            { teamId: "team-1", userId: "owner-1", role: "OWNER" },
        ],
        listMembers: async () => [],
        getMember: async () => null,
        deleteMember: async () => undefined,
        listAuthUsers: async () => [],
        getAuthUser: async () => null,
        revokeRefreshTokens: async () => undefined,
        setCustomUserClaims: async () => undefined,
        ...overrides,
    };
}

test("lists members for any current team member and sorts the owner first", async () => {
    const service = createTeamMembersService(
        createDependencies({
            getMemberships: async () => [
                { teamId: "team-1", userId: "member-1", role: "MEMBER" },
            ],
            listMembers: async () => [
                { teamId: "team-1", userId: "member-1", role: "MEMBER" },
                { teamId: "team-1", userId: "orphan-1", role: "MEMBER" },
                { teamId: "team-1", userId: "owner-1", role: "OWNER" },
            ],
            listAuthUsers: async () => [
                {
                    uid: "member-1",
                    displayName: "Zoe Member",
                    email: "zoe@example.com",
                },
                {
                    uid: "owner-1",
                    displayName: "Alex Owner",
                    email: "alex@example.com",
                    photoURL: "https://example.com/alex.png",
                },
            ],
        }),
    );

    const result = await service.list("member-1");

    assert.equal(result.currentUserRole, "MEMBER");
    assert.deepEqual(
        result.members.map((member) => member.userId),
        ["owner-1", "orphan-1", "member-1"],
    );
    assert.deepEqual(result.members[1], {
        userId: "orphan-1",
        displayName: null,
        email: null,
        photoUrl: null,
        role: "MEMBER",
    });
});

test("allows the owner to remove a member and clears only the team claim", async () => {
    const deleted: string[] = [];
    const events: string[] = [];
    const claims: Readonly<Record<string, unknown>>[] = [];
    const service = createTeamMembersService(
        createDependencies({
            getMember: async () => ({
                teamId: "team-1",
                userId: "member-1",
                role: "MEMBER",
            }),
            deleteMember: async (_teamId, userId) => {
                deleted.push(userId);
            },
            getAuthUser: async () => ({
                uid: "member-1",
                customClaims: { plan: "trial", teamId: "team-1" },
            }),
            revokeRefreshTokens: async () => {
                events.push("revoke");
            },
            setCustomUserClaims: async (_userId, value) => {
                events.push("claims");
                claims.push(value);
            },
        }),
    );

    const result = await service.remove("owner-1", { userId: "member-1" });

    assert.deepEqual(result, { removedUserId: "member-1" });
    assert.deepEqual(deleted, ["member-1"]);
    assert.deepEqual(events, ["revoke", "claims"]);
    assert.deepEqual(claims, [{ plan: "trial" }]);
});

test("rejects removal attempts from non-owners", async () => {
    const service = createTeamMembersService(
        createDependencies({
            getMemberships: async () => [
                { teamId: "team-1", userId: "member-1", role: "MEMBER" },
            ],
        }),
    );

    await assert.rejects(
        service.remove("member-1", { userId: "member-2" }),
        hasErrorCode("permission-denied"),
    );
});

test("protects the owner from removal", async () => {
    const service = createTeamMembersService(
        createDependencies({
            getMember: async () => ({
                teamId: "team-1",
                userId: "owner-1",
                role: "OWNER",
            }),
        }),
    );

    await assert.rejects(
        service.remove("owner-1", { userId: "owner-1" }),
        hasErrorCode("failed-precondition"),
    );
});

test("retries stale claim cleanup after membership is already absent", async () => {
    const claims: Readonly<Record<string, unknown>>[] = [];
    const service = createTeamMembersService(
        createDependencies({
            getAuthUser: async () => ({
                uid: "former-member",
                customClaims: { teamId: "team-1", theme: "dark" },
            }),
            setCustomUserClaims: async (_userId, value) => {
                claims.push(value);
            },
        }),
    );

    await service.remove("owner-1", { userId: "former-member" });

    assert.deepEqual(claims, [{ theme: "dark" }]);
});

function hasErrorCode(code: string) {
    return (error: unknown) =>
        typeof error === "object" &&
        error !== null &&
        "code" in error &&
        error.code === code;
}
