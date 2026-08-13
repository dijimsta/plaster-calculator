import assert from "node:assert/strict";
import test from "node:test";

import {
    TEAM_NAME_MAX_LENGTH,
    UpdateTeamNameRequestSchema,
} from "../../src/teams/index.ts";

test("trims a valid team name", () => {
    assert.deepEqual(UpdateTeamNameRequestSchema.parse({ name: "  Acme  " }), {
        name: "Acme",
    });
});

test("rejects a blank team name", () => {
    assert.equal(
        UpdateTeamNameRequestSchema.safeParse({ name: "   " }).success,
        false,
    );
});

test("rejects a team name longer than the maximum", () => {
    assert.equal(
        UpdateTeamNameRequestSchema.safeParse({
            name: "a".repeat(TEAM_NAME_MAX_LENGTH + 1),
        }).success,
        false,
    );
});
