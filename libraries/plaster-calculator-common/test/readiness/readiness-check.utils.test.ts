import assert from "node:assert/strict";
import test from "node:test";

import {
    activeAreasAcrossPages,
    activeAreasForPage,
    parseOverlayAreas,
} from "../../src/index.ts";

import { area, overlayJson, page, project } from "./readiness-test-fixtures.ts";

test("parseOverlayAreas returns the areas encoded in the overlay JSON", () => {
    const rooms = [area({ label: "Kitchen" }), area({ label: "Bathroom" })];
    assert.deepEqual(parseOverlayAreas(overlayJson(rooms)), rooms);
});

test("parseOverlayAreas returns an empty array for null overlay", () => {
    assert.deepEqual(parseOverlayAreas(null), []);
});

test("parseOverlayAreas returns an empty array for an empty string overlay", () => {
    assert.deepEqual(parseOverlayAreas(""), []);
});

test("parseOverlayAreas returns an empty array for malformed JSON rather than throwing", () => {
    assert.deepEqual(parseOverlayAreas("{not valid json"), []);
});

test("parseOverlayAreas returns an empty array when the parsed JSON has no areas field", () => {
    assert.deepEqual(parseOverlayAreas(JSON.stringify({})), []);
});

test("parseOverlayAreas returns an empty array when `areas` is not an array", () => {
    assert.deepEqual(
        parseOverlayAreas(JSON.stringify({ areas: "not-an-array" })),
        [],
    );
});

test("parseOverlayAreas returns an empty array when the overlay JSON is a bare null literal", () => {
    assert.deepEqual(parseOverlayAreas("null"), []);
});

test("activeAreasForPage filters out deleted areas", () => {
    const kept = area({ label: "Kept" });
    const deleted = area({ label: "Deleted", deleted: true });
    const testPage = page({ overlay: overlayJson([kept, deleted]) });
    assert.deepEqual(activeAreasForPage(testPage), [kept]);
});

test("activeAreasForPage returns an empty array when the page has no overlay", () => {
    const testPage = page({ overlay: null });
    assert.deepEqual(activeAreasForPage(testPage), []);
});

test("activeAreasForPage returns an empty array when every area on the page is deleted", () => {
    const testPage = page({
        overlay: overlayJson([
            area({ deleted: true }),
            area({ deleted: true }),
        ]),
    });
    assert.deepEqual(activeAreasForPage(testPage), []);
});

test("activeAreasAcrossPages pairs each active area with its own page", () => {
    const areaOne = area({ label: "Living room" });
    const areaTwo = area({ label: "Bedroom" });
    const deletedArea = area({ label: "Removed", deleted: true });
    const pageOne = page({ overlay: overlayJson([areaOne]), pageNumber: 1 });
    const pageTwo = page({
        overlay: overlayJson([areaTwo, deletedArea]),
        pageNumber: 2,
    });

    const result = activeAreasAcrossPages(project([pageOne, pageTwo]));

    assert.deepEqual(result, [
        { page: pageOne, area: areaOne },
        { page: pageTwo, area: areaTwo },
    ]);
});

test("activeAreasAcrossPages returns an empty array when the project has no pages", () => {
    assert.deepEqual(activeAreasAcrossPages(project([])), []);
});

test("activeAreasAcrossPages returns an empty array when every page's areas are deleted or missing", () => {
    const pageOne = page({ overlay: overlayJson([area({ deleted: true })]) });
    const pageTwo = page({ overlay: null });
    assert.deepEqual(activeAreasAcrossPages(project([pageOne, pageTwo])), []);
});
