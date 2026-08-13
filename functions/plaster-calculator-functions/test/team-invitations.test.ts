import assert from "node:assert/strict";
import test from "node:test";

import {
    buildInvitationPath,
    createTeamInvitationService,
    hashInvitationToken,
    normalizeInvitationEmail,
    readInvitationRole,
    selectOwnerTeamId,
} from "../src/team-invitation-domain.ts";
import type { TeamInvitationDependencies } from "../src/team-invitation-domain.ts";

const NOW = new Date("2026-08-09T00:00:00.000Z");
const TOKEN_A = "A".repeat(43);
const TOKEN_B = "B".repeat(43);

function createDependencies(
    overrides: Partial<TeamInvitationDependencies> = {},
): TeamInvitationDependencies {
    return {
        now: () => NOW,
        generateToken: () => TOKEN_A,
        getMemberships: async () => [],
        authUserExists: async () => false,
        getAuthUser: async () => ({ email: "member@example.com" }),
        setCustomUserClaims: async () => undefined,
        rotateInvitation: async () => undefined,
        revokeInvitation: async () => undefined,
        listPendingInvitations: async () => [],
        getInvitationByTokenHash: async () => undefined,
        acceptInvitation: async () => undefined,
        ...overrides,
    };
}

function invitation(overrides: Record<string, unknown> = {}) {
    return {
        teamId: "team-1",
        email: "member@example.com",
        tokenHash: hashInvitationToken(TOKEN_A),
        invitedByUserId: "owner-1",
        expiresAt: "2026-08-16T00:00:00.000Z",
        acceptedAt: null,
        acceptedByUserId: null,
        createdAt: NOW.toISOString(),
        updatedAt: NOW.toISOString(),
        ...overrides,
    };
}

test("normalizes invitation emails and rejects invalid input", () => {
    assert.equal(
        normalizeInvitationEmail("  Person@Example.COM "),
        "person@example.com",
    );
    assert.throws(
        () => normalizeInvitationEmail("not-an-email"),
        hasErrorCode("invalid-argument"),
    );
});

test("defaults invitations to member and rejects unsupported roles", () => {
    assert.equal(readInvitationRole(undefined), "MEMBER");
    assert.equal(readInvitationRole("MEMBER"), "MEMBER");
    assert.throws(
        () => readInvitationRole("OWNER"),
        hasErrorCode("invalid-argument"),
    );
});

test("hashes tokens and builds the login invitation path", () => {
    assert.equal(hashInvitationToken(TOKEN_A).length, 64);
    assert.notEqual(hashInvitationToken(TOKEN_A), TOKEN_A);
    assert.equal(buildInvitationPath(TOKEN_A), `/login?invitation=${TOKEN_A}`);
});

test("allows only the sole team owner to manage invitations", () => {
    assert.equal(
        selectOwnerTeamId([{ teamId: "team-1", role: "OWNER" }]),
        "team-1",
    );
    assert.throws(
        () => selectOwnerTeamId([{ teamId: "team-1", role: "MEMBER" }]),
        hasErrorCode("permission-denied"),
    );
    assert.throws(
        () => selectOwnerTeamId([]),
        hasErrorCode("failed-precondition"),
    );
});

test("creates a seven-day invitation and rotates a repeated invite", async () => {
    const rotations: unknown[] = [];
    const tokens = [TOKEN_A, TOKEN_B];
    const service = createTeamInvitationService(
        createDependencies({
            generateToken: () => tokens.shift() ?? TOKEN_B,
            getMemberships: async () => [{ teamId: "team-1", role: "OWNER" }],
            rotateInvitation: async (input) => {
                rotations.push(input);
            },
        }),
    );

    const first = await service.create("owner-1", "member@example.com");
    const second = await service.create("owner-1", "MEMBER@example.com");

    assert.equal(first.invitation.expiresAt, "2026-08-16T00:00:00.000Z");
    assert.equal(first.path, `/login?invitation=${TOKEN_A}`);
    assert.equal(second.token, TOKEN_B);
    assert.equal(rotations.length, 2);
    assert.notEqual(
        (rotations[0] as { tokenHash: string }).tokenHash,
        (rotations[1] as { tokenHash: string }).tokenHash,
    );
});

test("does not create invitations for existing Auth users", async () => {
    const service = createTeamInvitationService(
        createDependencies({
            getMemberships: async () => [{ teamId: "team-1", role: "OWNER" }],
            authUserExists: async () => true,
        }),
    );

    await assert.rejects(
        service.create("owner-1", "member@example.com"),
        hasErrorCode("already-exists"),
    );
});

test("allows only an owner to revoke a normalized invitation", async () => {
    const revoked: unknown[] = [];
    const service = createTeamInvitationService(
        createDependencies({
            getMemberships: async () => [{ teamId: "team-1", role: "OWNER" }],
            revokeInvitation: async (teamId, email, now) => {
                revoked.push({ teamId, email, now });
            },
        }),
    );

    const result = await service.revoke("owner-1", " MEMBER@example.com ");

    assert.deepEqual(result, { revokedEmail: "member@example.com" });
    assert.deepEqual(revoked, [
        {
            teamId: "team-1",
            email: "member@example.com",
            now: NOW.toISOString(),
        },
    ]);

    await assert.rejects(
        createTeamInvitationService(
            createDependencies({
                getMemberships: async () => [
                    { teamId: "team-1", role: "MEMBER" },
                ],
            }),
        ).revoke("member-1", "member@example.com"),
        hasErrorCode("permission-denied"),
    );
});

test("rejects invitation redemption when authenticated email differs", async () => {
    const service = createTeamInvitationService(
        createDependencies({
            getInvitationByTokenHash: async () => invitation(),
            getAuthUser: async () => ({ email: "other@example.com" }),
        }),
    );

    await assert.rejects(
        service.accept("user-1", TOKEN_A),
        hasErrorCode("permission-denied"),
    );
});

test("rejects expired invitations", async () => {
    const service = createTeamInvitationService(
        createDependencies({
            getInvitationByTokenHash: async () =>
                invitation({ expiresAt: "2026-08-08T00:00:00.000Z" }),
        }),
    );

    await assert.rejects(
        service.accept("user-1", TOKEN_A),
        hasErrorCode("deadline-exceeded"),
    );
});

test("rejects redemption when the user already belongs to a team", async () => {
    const service = createTeamInvitationService(
        createDependencies({
            getInvitationByTokenHash: async () => invitation(),
            getMemberships: async () => [
                { teamId: "personal-team", role: "OWNER" },
            ],
        }),
    );

    await assert.rejects(
        service.accept("user-1", TOKEN_A),
        hasErrorCode("failed-precondition"),
    );
});

test("repairs a stale invitation read after concurrent acceptance", async () => {
    const invitations = [
        invitation(),
        invitation({
            acceptedAt: "2026-08-09T00:01:00.000Z",
            acceptedByUserId: "user-1",
        }),
    ];
    const claims: Record<string, unknown>[] = [];
    const service = createTeamInvitationService(
        createDependencies({
            getInvitationByTokenHash: async () => invitations.shift(),
            getMemberships: async () => [{ teamId: "team-1", role: "MEMBER" }],
            setCustomUserClaims: async (_userId, value) => {
                claims.push(value);
            },
        }),
    );

    const result = await service.accept("user-1", TOKEN_A);

    assert.deepEqual(result, { teamId: "team-1", role: "MEMBER" });
    assert.deepEqual(claims, [{ teamId: "team-1" }]);
});

test("accepts an invitation and repairs claims on an idempotent replay", async () => {
    let acceptCalls = 0;
    const claims: Record<string, unknown>[] = [];
    const pending = invitation();
    const accepted = invitation({
        acceptedAt: "2026-08-09T00:01:00.000Z",
        acceptedByUserId: "user-1",
    });
    const invitations = [pending, accepted];
    const service = createTeamInvitationService(
        createDependencies({
            getInvitationByTokenHash: async () => invitations.shift(),
            acceptInvitation: async () => {
                acceptCalls += 1;
            },
            getAuthUser: async () => ({
                email: "member@example.com",
                customClaims: { plan: "trial" },
            }),
            setCustomUserClaims: async (_userId, value) => {
                claims.push(value);
            },
        }),
    );

    const first = await service.accept("user-1", TOKEN_A);
    const replay = await service.accept("user-1", TOKEN_A);

    assert.deepEqual(first, { teamId: "team-1", role: "MEMBER" });
    assert.deepEqual(replay, first);
    assert.equal(acceptCalls, 1);
    assert.deepEqual(claims, [
        { plan: "trial", teamId: "team-1" },
        { plan: "trial", teamId: "team-1" },
    ]);
});

test("treats a concurrent acceptance conflict as an idempotent success", async () => {
    const pending = invitation();
    const accepted = invitation({
        acceptedAt: "2026-08-09T00:01:00.000Z",
        acceptedByUserId: "user-1",
    });
    const invitations = [pending, accepted];
    const claims: Record<string, unknown>[] = [];
    const service = createTeamInvitationService(
        createDependencies({
            getInvitationByTokenHash: async () => invitations.shift(),
            acceptInvitation: async () => {
                throw new Error("transaction lost the acceptance race");
            },
            setCustomUserClaims: async (_userId, value) => {
                claims.push(value);
            },
        }),
    );

    const result = await service.accept("user-1", TOKEN_A);

    assert.deepEqual(result, { teamId: "team-1", role: "MEMBER" });
    assert.deepEqual(claims, [{ teamId: "team-1" }]);
});

function hasErrorCode(code: string) {
    return (error: unknown) =>
        typeof error === "object" &&
        error !== null &&
        "code" in error &&
        error.code === code;
}
