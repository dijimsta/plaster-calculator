import assert from "node:assert/strict";
import test from "node:test";

import { OverlayGeometryHelper } from "../src/index.ts";

import type { AreaPolygon, Point } from "../src/index.ts";

const SQUARE_100PX: Point[] = [
    [0, 0],
    [100, 0],
    [100, 100],
    [0, 100],
];

function area(overrides: Partial<AreaPolygon> = {}): AreaPolygon {
    return {
        id: "1",
        label: "Room",
        points: SQUARE_100PX,
        ceilingPlasterType: "Standard",
        source: "detected",
        deleted: false,
        ...overrides,
    };
}

test("polygonArea computes the shoelace area of a simple polygon", () => {
    assert.equal(OverlayGeometryHelper.polygonArea(SQUARE_100PX), 10000);
});

test("polygonArea returns 0 for fewer than 3 points", () => {
    assert.equal(OverlayGeometryHelper.polygonArea([[0, 0]]), 0);
    assert.equal(
        OverlayGeometryHelper.polygonArea([
            [0, 0],
            [1, 1],
        ]),
        0,
    );
});

test("ceilingAreaM2ForArea converts px area to m2 using the page scale", () => {
    // 100x100px room at 10mm/px = 1000x1000mm = 1m x 1m = 1m2.
    assert.equal(OverlayGeometryHelper.ceilingAreaM2ForArea(area(), 10), 1);
});

test("ceilingAreaM2ForArea increases the flat area for a raked ceiling", () => {
    const flat = OverlayGeometryHelper.ceilingAreaM2ForArea(area(), 10);
    const raked = OverlayGeometryHelper.ceilingAreaM2ForArea(
        area({
            ceilingMode: "raked",
            rakedCeiling: {
                lowEdgeIndex: 0,
                highEdgeIndex: 2,
                lowHeightMm: 2400,
                highHeightMm: 3000,
            },
        }),
        10,
    );
    assert.ok(raked > flat);
});

test("wallLengthByType sums edge lengths by material, grouping under the default wall material", () => {
    const result = OverlayGeometryHelper.wallLengthByType(area());
    assert.deepEqual(result, [
        { type: "RE - 10mm Plasterboard", lengthPx: 400 },
    ]);
});

test("wallLengthByType excludes edges flagged noPlaster", () => {
    const result = OverlayGeometryHelper.wallLengthByType(
        area({ edgeOverrides: { 0: { noPlaster: true } } }),
    );
    assert.deepEqual(result, [
        { type: "RE - 10mm Plasterboard", lengthPx: 300 },
    ]);
});

test("wallLengthByType returns nothing for outdoor areas", () => {
    assert.deepEqual(
        OverlayGeometryHelper.wallLengthByType(area({ isOutdoor: true })),
        [],
    );
});
