import assert from "node:assert/strict";
import test from "node:test";

import { resolveCeilingHeightSet } from "../../src/index.ts";

import { area, overlayJson, page, project } from "./readiness-test-fixtures.ts";

test("resolveCeilingHeightSet is met when the area's own ceiling height is set", () => {
    const result = resolveCeilingHeightSet({ project: project([page()]) });
    assert.equal(result.isMet, true);
    assert.equal(result.affectedItemCount, 0);
});

test("resolveCeilingHeightSet is met when only the page's ceiling height is set", () => {
    const roomHeightUnset = area({ ceilingHeightMm: null });
    const withPageHeight = page({
        overlay: overlayJson([roomHeightUnset]),
        ceilingHeightMm: 2700,
    });
    const result = resolveCeilingHeightSet({
        project: project([withPageHeight]),
    });
    assert.equal(result.isMet, true);
    assert.equal(result.affectedItemCount, 0);
});

test("resolveCeilingHeightSet is unmet when neither the area nor the page has a ceiling height", () => {
    const roomHeightUnset = area({ ceilingHeightMm: null });
    const noHeightAnywhere = page({
        overlay: overlayJson([roomHeightUnset]),
        ceilingHeightMm: null,
    });
    const result = resolveCeilingHeightSet({
        project: project([noHeightAnywhere]),
    });
    assert.equal(result.isMet, false);
    assert.equal(result.affectedItemCount, 1);
    assert.equal(result.pageId, noHeightAnywhere.id);
    assert.equal(result.areaId, roomHeightUnset.id);
});
