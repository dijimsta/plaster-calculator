import assert from "node:assert/strict";
import test from "node:test";

import {
    ASSUMED_WALL_TYPES_CONFIRMED_CHECK_ID,
    CEILING_HEIGHT_SET_CHECK_ID,
    COMPANY_CONTACT_DETAILS_CHECK_ID,
    INFERRED_ANSWERS_CONFIRMED_CHECK_ID,
    READINESS_CHECKS,
    ROOMS_MEASURED_CHECK_ID,
    SCALE_APPLIED_CHECK_ID,
    TEMPLATE_PRICED_CHECK_ID,
    TEMPLATE_UNIT_SET_CHECK_ID,
    WALL_TYPE_SET_CHECK_ID,
} from "../../src/index.ts";

test("READINESS_CHECKS registers every check in order, with COMPANY_CONTACT_DETAILS as the sole WARN", () => {
    assert.equal(READINESS_CHECKS.length, 9);
    assert.deepEqual(
        READINESS_CHECKS.map((check) => check.id),
        [
            SCALE_APPLIED_CHECK_ID,
            ROOMS_MEASURED_CHECK_ID,
            WALL_TYPE_SET_CHECK_ID,
            CEILING_HEIGHT_SET_CHECK_ID,
            TEMPLATE_PRICED_CHECK_ID,
            TEMPLATE_UNIT_SET_CHECK_ID,
            INFERRED_ANSWERS_CONFIRMED_CHECK_ID,
            ASSUMED_WALL_TYPES_CONFIRMED_CHECK_ID,
            COMPANY_CONTACT_DETAILS_CHECK_ID,
        ],
    );
    assert.deepEqual(
        READINESS_CHECKS.filter((check) => check.severity !== "BLOCK").map(
            (check) => check.id,
        ),
        [COMPANY_CONTACT_DETAILS_CHECK_ID],
    );
});
