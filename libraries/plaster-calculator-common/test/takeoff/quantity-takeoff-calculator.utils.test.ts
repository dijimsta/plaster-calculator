import assert from "node:assert/strict";
import test from "node:test";

import { QuantityTakeoffCalculatorUtils } from "../../src/index.ts";
import type {
    AreaPolygon,
    Overlay,
    Point,
    QuantitySourceDefinition,
} from "../../src/index.ts";

/** A closed rectangle's four corners, `width` x `height` px, from `[0, 0]`. */
function rectangle(width: number, height: number): Point[] {
    return [
        [0, 0],
        [width, 0],
        [width, height],
        [0, height],
    ];
}

function areaFixture(overrides: Partial<AreaPolygon>): AreaPolygon {
    return {
        id: "area",
        label: "Room",
        points: rectangle(100, 100),
        ceilingPlasterType: "Standard",
        source: "detected",
        deleted: false,
        ...overrides,
    };
}

// A page at 10mm/px, so `lengthM = lengthPx / 100` and `areaM2 = areaPx /
// 10000`. Every room is 2400mm high, via the page-level `pageHeightMm`
// fallback (no `AreaPolygon.ceilingHeightMm` is set), exercising
// `OverlayGeometryHelper.effectiveFlatHeight()`'s fallback path.
const SCALE_MM_PER_PX = 10;
const PAGE_HEIGHT_MM = 2400;

// Living room: 400x300px = 4m x 3m, default (STANDARD) wall board type.
// Perimeter = 2*(4+3) = 14m. Ceiling/floor area = 4*3 = 12m2.
// Wall area = 14m * 2.4m = 33.6m2, all STANDARD.
const livingRoom = areaFixture({
    id: "living",
    label: "Living",
    points: rectangle(400, 300),
});

// Bathroom: 200x150px = 2m x 1.5m, a wet-area wall board type throughout.
// Perimeter = 2*(2+1.5) = 7m. Ceiling/floor area = 2*1.5 = 3m2.
// Wall area = 7m * 2.4m = 16.8m2, all WET_AREA.
const bathroom = areaFixture({
    id: "bathroom",
    label: "Bathroom",
    points: rectangle(200, 150),
    wallBoardType: "9mm Villaboard",
});

// Deleted room: large (500x500px) and wet-area-walled, so that if
// `deleted` filtering were broken, every total below would visibly change.
const deletedRoom = areaFixture({
    id: "deleted-room",
    label: "Deleted",
    points: rectangle(500, 500),
    wallBoardType: "9mm Villaboard",
    deleted: true,
});

// Patio: 100x100px = 1m x 1m, outdoor. Perimeter = 4m. Ceiling/floor area =
// 1m2. Outdoor areas have no wall board type to measure, so they contribute
// nothing to WALL_AREA (and, since "wet area" is derived from wall board
// type, nothing to FLOOR_AREA/WET_AREA either) — but they still have a
// ceiling and a perimeter, so CEILING_AREA and CORNICE_LENGTH include it.
const patio = areaFixture({
    id: "patio",
    label: "Patio",
    points: rectangle(100, 100),
    isOutdoor: true,
});

const overlay: Overlay = {
    areas: [livingRoom, bathroom, deletedRoom, patio],
};

// The six sources seeded by `EnsureSystemQuoteItemTemplates`
// (`data/connector-web/quotes.mutations.gql`), with test-local ids.
const QUANTITY_SOURCES: QuantitySourceDefinition[] = [
    {
        id: "qs-wall-standard",
        measurementSource: "WALL_AREA",
        measurementPlasterType: "STANDARD",
    },
    {
        id: "qs-wall-wet",
        measurementSource: "WALL_AREA",
        measurementPlasterType: "WET_AREA",
    },
    {
        id: "qs-ceiling-standard",
        measurementSource: "CEILING_AREA",
        measurementPlasterType: "STANDARD",
    },
    {
        id: "qs-cornice",
        measurementSource: "CORNICE_LENGTH",
        measurementPlasterType: null,
    },
    {
        id: "qs-floor-wet",
        measurementSource: "FLOOR_AREA",
        measurementPlasterType: "WET_AREA",
    },
    {
        id: "qs-door",
        measurementSource: "DOOR_COUNT",
        measurementPlasterType: null,
    },
];

function quantityFor(
    results: ReturnType<
        typeof QuantityTakeoffCalculatorUtils.computeQuantities
    >,
    quantitySourceId: string,
): number {
    const result = results.find(
        (item) => item.quantitySourceId === quantitySourceId,
    );
    assert.ok(result, `No result for ${quantitySourceId}`);
    return result.quantity;
}

test("computeQuantities returns one result per input QuantitySourceDefinition, in order", () => {
    const results = QuantityTakeoffCalculatorUtils.computeQuantities(
        overlay,
        SCALE_MM_PER_PX,
        PAGE_HEIGHT_MM,
        QUANTITY_SOURCES,
    );
    assert.equal(results.length, QUANTITY_SOURCES.length);
    assert.deepEqual(
        results.map((result) => result.quantitySourceId),
        QUANTITY_SOURCES.map((source) => source.id),
    );
});

test("WALL_AREA/STANDARD sums only the living room's wall area (33.6m2), excluding the wet-area bathroom, the outdoor patio, and the deleted room", () => {
    const results = QuantityTakeoffCalculatorUtils.computeQuantities(
        overlay,
        SCALE_MM_PER_PX,
        PAGE_HEIGHT_MM,
        QUANTITY_SOURCES,
    );
    assert.equal(quantityFor(results, "qs-wall-standard"), 33.6);
});

test("WALL_AREA/WET_AREA sums only the bathroom's wall area (16.8m2)", () => {
    const results = QuantityTakeoffCalculatorUtils.computeQuantities(
        overlay,
        SCALE_MM_PER_PX,
        PAGE_HEIGHT_MM,
        QUANTITY_SOURCES,
    );
    assert.equal(quantityFor(results, "qs-wall-wet"), 16.8);
});

test("CEILING_AREA/STANDARD sums the living room, bathroom, and outdoor patio (12 + 3 + 1 = 16m2), excluding the deleted room", () => {
    const results = QuantityTakeoffCalculatorUtils.computeQuantities(
        overlay,
        SCALE_MM_PER_PX,
        PAGE_HEIGHT_MM,
        QUANTITY_SOURCES,
    );
    assert.equal(quantityFor(results, "qs-ceiling-standard"), 16);
});

test("CORNICE_LENGTH sums every non-deleted room's perimeter (14 + 7 + 4 = 25m), with no plaster-type split", () => {
    const results = QuantityTakeoffCalculatorUtils.computeQuantities(
        overlay,
        SCALE_MM_PER_PX,
        PAGE_HEIGHT_MM,
        QUANTITY_SOURCES,
    );
    assert.equal(quantityFor(results, "qs-cornice"), 25);
});

test("FLOOR_AREA/WET_AREA sums only the bathroom's floor area (3m2) — the only wet-area room", () => {
    const results = QuantityTakeoffCalculatorUtils.computeQuantities(
        overlay,
        SCALE_MM_PER_PX,
        PAGE_HEIGHT_MM,
        QUANTITY_SOURCES,
    );
    assert.equal(quantityFor(results, "qs-floor-wet"), 3);
});

test("DOOR_COUNT is 0 — AreaPolygon has no field distinguishing a door opening from a room (WORK-141 blocker)", () => {
    const results = QuantityTakeoffCalculatorUtils.computeQuantities(
        overlay,
        SCALE_MM_PER_PX,
        PAGE_HEIGHT_MM,
        QUANTITY_SOURCES,
    );
    assert.equal(quantityFor(results, "qs-door"), 0);
});

test("computeQuantities quotes an unrecognised measurementSource as 0 rather than throwing", () => {
    const results = QuantityTakeoffCalculatorUtils.computeQuantities(
        overlay,
        SCALE_MM_PER_PX,
        PAGE_HEIGHT_MM,
        [
            {
                id: "qs-unknown",
                measurementSource: "SOMETHING_NEW",
                measurementPlasterType: null,
            },
        ],
    );
    assert.equal(quantityFor(results, "qs-unknown"), 0);
});

test("computeQuantities excludes deleted areas from every source, not just the ones asserted above", () => {
    const overlayWithOnlyDeleted: Overlay = { areas: [deletedRoom] };
    const results = QuantityTakeoffCalculatorUtils.computeQuantities(
        overlayWithOnlyDeleted,
        SCALE_MM_PER_PX,
        PAGE_HEIGHT_MM,
        QUANTITY_SOURCES,
    );
    results.forEach((result) => {
        assert.equal(result.quantity, 0);
    });
});
