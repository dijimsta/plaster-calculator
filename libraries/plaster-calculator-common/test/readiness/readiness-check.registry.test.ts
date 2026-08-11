import assert from "node:assert/strict";
import test from "node:test";

import {
    ASSUMED_WALL_TYPES_CONFIRMED_CHECK_ID,
    CEILING_HEIGHT_SET_CHECK_ID,
    INFERRED_ANSWERS_CONFIRMED_CHECK_ID,
    READINESS_CHECKS,
    ROOMS_MEASURED_CHECK_ID,
    SCALE_APPLIED_CHECK_ID,
    TEMPLATE_PRICED_CHECK_ID,
    WALL_TYPE_SET_CHECK_ID,
} from "../../src/index.ts";

test("READINESS_CHECKS registers all seven v1 checks as BLOCK severity", () => {
    assert.equal(READINESS_CHECKS.length, 7);
    assert.ok(READINESS_CHECKS.every((check) => check.severity === "BLOCK"));
    assert.deepEqual(
        READINESS_CHECKS.map((check) => check.id),
        [
            SCALE_APPLIED_CHECK_ID,
            ROOMS_MEASURED_CHECK_ID,
            WALL_TYPE_SET_CHECK_ID,
            CEILING_HEIGHT_SET_CHECK_ID,
            TEMPLATE_PRICED_CHECK_ID,
            INFERRED_ANSWERS_CONFIRMED_CHECK_ID,
            ASSUMED_WALL_TYPES_CONFIRMED_CHECK_ID,
        ],
    );
});
