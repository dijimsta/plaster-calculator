import assert from "node:assert/strict";
import test from "node:test";

import { resolveScaleApplied } from "../../src/index.ts";

import { page, project } from "./readiness-test-fixtures.ts";

test("resolveScaleApplied is met when every page has a scale", () => {
    const result = resolveScaleApplied({
        project: project([page(), page()]),
    });
    assert.equal(result.isMet, true);
    assert.equal(result.affectedItemCount, 0);
    assert.equal(result.pageId, undefined);
});

test("resolveScaleApplied is unmet for a page with no scale", () => {
    const unscaled = page({ scaleMmPerPx: null });
    const result = resolveScaleApplied({ project: project([unscaled]) });
    assert.equal(result.isMet, false);
    assert.equal(result.affectedItemCount, 1);
    assert.equal(result.pageId, unscaled.id);
});

test("resolveScaleApplied rolls up per page: page 1 complete, page 2 unscaled", () => {
    const completePage = page();
    const unscaledPage = page({ scaleMmPerPx: null });
    const result = resolveScaleApplied({
        project: project([completePage, unscaledPage]),
    });
    assert.equal(result.isMet, false);
    assert.equal(result.affectedItemCount, 1);
    assert.equal(result.pageId, unscaledPage.id);
});
