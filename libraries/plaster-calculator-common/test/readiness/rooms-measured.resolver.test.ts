import assert from "node:assert/strict";
import test from "node:test";

import { resolveRoomsMeasured } from "../../src/index.ts";

import { area, overlayJson, page, project } from "./readiness-test-fixtures.ts";

test("resolveRoomsMeasured is met when every page has a non-deleted area", () => {
    const result = resolveRoomsMeasured({
        project: project([page(), page()]),
    });
    assert.equal(result.isMet, true);
    assert.equal(result.affectedItemCount, 0);
});

test("resolveRoomsMeasured is unmet when a page's only area is deleted", () => {
    const emptyPage = page({
        overlay: overlayJson([area({ deleted: true })]),
        pageNumber: 3,
    });
    const result = resolveRoomsMeasured({ project: project([emptyPage]) });
    assert.equal(result.isMet, false);
    assert.equal(result.affectedItemCount, 1);
    assert.deepEqual(result.affectedItems, [
        { pageId: emptyPage.id, pageNumber: 3 },
    ]);
});

test("resolveRoomsMeasured rolls up per page: page 1 complete, page 2 unscaled/unmeasured", () => {
    const completePage = page();
    const unmeasuredPage = page({
        scaleMmPerPx: null,
        overlay: overlayJson([]),
    });
    const result = resolveRoomsMeasured({
        project: project([completePage, unmeasuredPage]),
    });
    assert.equal(result.isMet, false);
    assert.equal(result.affectedItemCount, 1);
    assert.equal(result.affectedItems[0]?.pageId, unmeasuredPage.id);
});
