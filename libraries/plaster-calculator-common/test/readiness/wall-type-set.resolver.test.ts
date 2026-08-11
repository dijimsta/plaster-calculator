import assert from "node:assert/strict";
import test from "node:test";

import { resolveWallTypeSet } from "../../src/index.ts";

import { area, overlayJson, page, project } from "./readiness-test-fixtures.ts";

test("resolveWallTypeSet is met when every room has an explicit wall board type", () => {
    const result = resolveWallTypeSet({ project: project([page()]) });
    assert.equal(result.isMet, true);
    assert.equal(result.affectedItemCount, 0);
});

test("resolveWallTypeSet is unmet when a room's wall board type is unset", () => {
    const unsetArea = area({ wallBoardType: undefined });
    const withUnsetType = page({ overlay: overlayJson([unsetArea]) });
    const result = resolveWallTypeSet({
        project: project([withUnsetType]),
    });
    assert.equal(result.isMet, false);
    assert.equal(result.affectedItemCount, 1);
    assert.equal(result.pageId, withUnsetType.id);
    assert.equal(result.areaId, unsetArea.id);
});

test("resolveWallTypeSet exempts outdoor areas with no wall board type", () => {
    const outdoorArea = area({ wallBoardType: undefined, isOutdoor: true });
    const withOutdoor = page({ overlay: overlayJson([outdoorArea]) });
    const result = resolveWallTypeSet({ project: project([withOutdoor]) });
    assert.equal(result.isMet, true);
    assert.equal(result.affectedItemCount, 0);
});
