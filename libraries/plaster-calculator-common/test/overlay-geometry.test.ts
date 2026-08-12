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

test("wallLengthPxByCategory groups the default wall material under STANDARD", () => {
    assert.deepEqual(OverlayGeometryHelper.wallLengthPxByCategory(area()), [
        { category: "STANDARD", lengthPx: 400 },
    ]);
});

test("wallLengthPxByCategory groups a wet-area board type under WET_AREA", () => {
    assert.deepEqual(
        OverlayGeometryHelper.wallLengthPxByCategory(
            area({ wallBoardType: "9mm Villaboard" }),
        ),
        [{ category: "WET_AREA", lengthPx: 400 }],
    );
});

test("wallLengthPxByCategory returns nothing for outdoor areas", () => {
    assert.deepEqual(
        OverlayGeometryHelper.wallLengthPxByCategory(area({ isOutdoor: true })),
        [],
    );
});

test("wallAreaM2ForArea multiplies wall length by height, per category", () => {
    // 100x100px square at 10mm/px = 4 x 1m walls = 4m perimeter, 2.4m high.
    // 4m x 2.4m = 9.6m2, all STANDARD (the default wall material).
    const result = OverlayGeometryHelper.wallAreaM2ForArea(
        area({ ceilingHeightMm: 2400 }),
        10,
        null,
    );
    assert.deepEqual(result, [{ category: "STANDARD", areaM2: 9.6 }]);
});

test("wallAreaM2ForArea falls back to the page height when the area has none set", () => {
    const result = OverlayGeometryHelper.wallAreaM2ForArea(area(), 10, 2400);
    assert.deepEqual(result, [{ category: "STANDARD", areaM2: 9.6 }]);
});

test("wallAreaM2ForArea returns nothing when no height is known from either the area or the page", () => {
    assert.deepEqual(
        OverlayGeometryHelper.wallAreaM2ForArea(area(), 10, null),
        [],
    );
});

test("floorAreaM2ForArea matches ceilingAreaM2ForArea's flat area", () => {
    assert.equal(
        OverlayGeometryHelper.floorAreaM2ForArea(area(), 10),
        OverlayGeometryHelper.ceilingAreaM2ForArea(area(), 10),
    );
});

test("floorAreaM2ForArea does not increase for a raked ceiling, unlike ceilingAreaM2ForArea", () => {
    const rakedArea = area({
        ceilingMode: "raked",
        rakedCeiling: {
            lowEdgeIndex: 0,
            highEdgeIndex: 2,
            lowHeightMm: 2400,
            highHeightMm: 3000,
        },
    });
    const floor = OverlayGeometryHelper.floorAreaM2ForArea(rakedArea, 10);
    const ceiling = OverlayGeometryHelper.ceilingAreaM2ForArea(rakedArea, 10);
    assert.equal(floor, 1);
    assert.ok(ceiling > floor);
});

test("perimeterLengthPx sums every edge including the closing edge", () => {
    assert.equal(OverlayGeometryHelper.perimeterLengthPx(SQUARE_100PX), 400);
});

test("perimeterLengthMForArea converts the perimeter to metres using the page scale", () => {
    // 100x100px square at 10mm/px = 400px perimeter = 4000mm = 4m.
    assert.equal(OverlayGeometryHelper.perimeterLengthMForArea(area(), 10), 4);
});
