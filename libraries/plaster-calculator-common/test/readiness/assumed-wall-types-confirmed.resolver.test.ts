import assert from "node:assert/strict";
import test from "node:test";

import { resolveAssumedWallTypesConfirmed } from "../../src/index.ts";

import { area, overlayJson, page, project } from "./readiness-test-fixtures.ts";

test("resolveAssumedWallTypesConfirmed is met when the wall type was detected, not defaulted", () => {
    const result = resolveAssumedWallTypesConfirmed({
        project: project([page()]),
    });
    assert.equal(result.isMet, true);
    assert.equal(result.affectedItemCount, 0);
});

test("resolveAssumedWallTypesConfirmed is unmet for a detected room with a defaulted, unconfirmed wall type", () => {
    const assumedArea = area({
        source: "detected",
        wallBoardType: undefined,
        wallBoardTypeConfirmedAt: null,
    });
    const withAssumedType = page({ overlay: overlayJson([assumedArea]) });
    const result = resolveAssumedWallTypesConfirmed({
        project: project([withAssumedType]),
    });
    assert.equal(result.isMet, false);
    assert.equal(result.affectedItemCount, 1);
    assert.equal(result.pageId, withAssumedType.id);
    assert.equal(result.areaId, assumedArea.id);
});

test("resolveAssumedWallTypesConfirmed is met once the defaulted wall type is confirmed", () => {
    const confirmedArea = area({
        source: "detected",
        wallBoardType: undefined,
        wallBoardTypeConfirmedAt: "2026-08-11T00:00:00.000Z",
    });
    const withConfirmedType = page({ overlay: overlayJson([confirmedArea]) });
    const result = resolveAssumedWallTypesConfirmed({
        project: project([withConfirmedType]),
    });
    assert.equal(result.isMet, true);
    assert.equal(result.affectedItemCount, 0);
});

test("resolveAssumedWallTypesConfirmed is met for a manually drawn room with a defaulted wall type", () => {
    const manualArea = area({
        source: "manual",
        wallBoardType: undefined,
        wallBoardTypeConfirmedAt: null,
    });
    const withManualArea = page({ overlay: overlayJson([manualArea]) });
    const result = resolveAssumedWallTypesConfirmed({
        project: project([withManualArea]),
    });
    assert.equal(result.isMet, true);
    assert.equal(result.affectedItemCount, 0);
});

test("resolveAssumedWallTypesConfirmed exempts outdoor areas", () => {
    const outdoorArea = area({
        source: "detected",
        wallBoardType: undefined,
        wallBoardTypeConfirmedAt: null,
        isOutdoor: true,
    });
    const withOutdoor = page({ overlay: overlayJson([outdoorArea]) });
    const result = resolveAssumedWallTypesConfirmed({
        project: project([withOutdoor]),
    });
    assert.equal(result.isMet, true);
    assert.equal(result.affectedItemCount, 0);
});
