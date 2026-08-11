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
    const unsetArea = area({ wallBoardType: undefined, label: "Kitchen" });
    const withUnsetType = page({
        overlay: overlayJson([unsetArea]),
        pageNumber: 4,
    });
    const result = resolveWallTypeSet({
        project: project([withUnsetType]),
    });
    assert.equal(result.isMet, false);
    assert.equal(result.affectedItemCount, 1);
    assert.deepEqual(result.affectedItems, [
        {
            pageId: withUnsetType.id,
            pageNumber: 4,
            areaId: unsetArea.id,
            areaLabel: "Kitchen",
        },
    ]);
});

test("resolveWallTypeSet reports every unset room, not just the first", () => {
    const firstUnset = area({ wallBoardType: undefined, label: "Kitchen" });
    const secondUnset = area({ wallBoardType: undefined, label: "Bathroom" });
    const withUnsetTypes = page({
        overlay: overlayJson([firstUnset, secondUnset]),
    });
    const result = resolveWallTypeSet({
        project: project([withUnsetTypes]),
    });
    assert.equal(result.affectedItemCount, 2);
    assert.deepEqual(
        result.affectedItems.map((item) => item.areaLabel),
        ["Kitchen", "Bathroom"],
    );
});

test("resolveWallTypeSet exempts outdoor areas with no wall board type", () => {
    const outdoorArea = area({ wallBoardType: undefined, isOutdoor: true });
    const withOutdoor = page({ overlay: overlayJson([outdoorArea]) });
    const result = resolveWallTypeSet({ project: project([withOutdoor]) });
    assert.equal(result.isMet, true);
    assert.equal(result.affectedItemCount, 0);
});
