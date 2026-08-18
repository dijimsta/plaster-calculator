import assert from "node:assert/strict";
import test from "node:test";

import { computeQuantities, rollup } from "../../src/index.ts";
import type {
    AreaPolygon,
    Overlay,
    PageTakeoffInput,
    Point,
    QuantitySourceDefinition,
    TakeoffRollupResult,
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

// Legacy quantity-source fixtures retained to cover historical templates.
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
];

function quantityFor(
    results: readonly TakeoffRollupResult[],
    quantitySourceId: string,
): number {
    const result = results.find(
        (item) => item.quantitySourceId === quantitySourceId,
    );
    assert.ok(result, `No result for ${quantitySourceId}`);
    return result.quantity;
}

function contributingPageIdsFor(
    results: readonly TakeoffRollupResult[],
    quantitySourceId: string,
): readonly string[] {
    const result = results.find(
        (item) => item.quantitySourceId === quantitySourceId,
    );
    assert.ok(result, `No result for ${quantitySourceId}`);
    return result.contributingPageIds;
}

// Page 1: 10mm/px. Living room 400x300px = 4m x 3m, STANDARD wall board.
// Perimeter = 14m. Ceiling area = 12m2. Wall area = 14m * 2.4m = 33.6m2.
const PAGE_1_SCALE_MM_PER_PX = 10;
const PAGE_1_HEIGHT_MM = 2400;
const page1Overlay: Overlay = {
    areas: [
        areaFixture({
            id: "living",
            label: "Living",
            points: rectangle(400, 300),
        }),
    ],
};

// Page 2: 20mm/px (a different scale from page 1). Bedroom 100x100px =
// 2m x 2m, STANDARD wall board. Perimeter = 8m. Ceiling area = 4m2.
// Wall area = 8m * 2.4m = 19.2m2.
const PAGE_2_SCALE_MM_PER_PX = 20;
const PAGE_2_HEIGHT_MM = 2400;
const page2Overlay: Overlay = {
    areas: [
        areaFixture({
            id: "bedroom",
            label: "Bedroom",
            points: rectangle(100, 100),
        }),
    ],
};

// Page 3: no scale set at all — must be skipped, not failed.
const page3Overlay: Overlay = {
    areas: [
        areaFixture({
            id: "garage",
            label: "Garage",
            points: rectangle(300, 300),
        }),
    ],
};

// Page 4: has a scale, but every area is deleted — must be skipped too.
const PAGE_4_SCALE_MM_PER_PX = 10;
const page4Overlay: Overlay = {
    areas: [
        areaFixture({
            id: "deleted-room",
            label: "Deleted",
            points: rectangle(400, 400),
            deleted: true,
        }),
    ],
};

test("rollup of a single page produces identical numbers to calling computeQuantities directly for that page", () => {
    const page: PageTakeoffInput = {
        pageId: "page-1",
        overlay: page1Overlay,
        scaleMmPerPx: PAGE_1_SCALE_MM_PER_PX,
        pageHeightMm: PAGE_1_HEIGHT_MM,
    };

    const rolledUp = rollup([page], QUANTITY_SOURCES);
    const direct = computeQuantities(
        page1Overlay,
        PAGE_1_SCALE_MM_PER_PX,
        PAGE_1_HEIGHT_MM,
        QUANTITY_SOURCES,
    );

    assert.deepEqual(
        rolledUp.map((result) => result.quantity),
        direct.map((result) => result.quantity),
    );
    QUANTITY_SOURCES.forEach((source) => {
        assert.deepEqual(contributingPageIdsFor(rolledUp, source.id), [
            "page-1",
        ]);
    });
});

test("rollup sums correctly across pages with different scales", () => {
    const pages: PageTakeoffInput[] = [
        {
            pageId: "page-1",
            overlay: page1Overlay,
            scaleMmPerPx: PAGE_1_SCALE_MM_PER_PX,
            pageHeightMm: PAGE_1_HEIGHT_MM,
        },
        {
            pageId: "page-2",
            overlay: page2Overlay,
            scaleMmPerPx: PAGE_2_SCALE_MM_PER_PX,
            pageHeightMm: PAGE_2_HEIGHT_MM,
        },
    ];

    const results = rollup(pages, QUANTITY_SOURCES);

    // WALL_AREA/STANDARD: page 1's 33.6m2 + page 2's 19.2m2 = 52.8m2.
    assert.equal(quantityFor(results, "qs-wall-standard"), 52.8);
    // WALL_AREA/WET_AREA: neither room is wet-area walled.
    assert.equal(quantityFor(results, "qs-wall-wet"), 0);
    // CEILING_AREA/STANDARD: page 1's 12m2 + page 2's 4m2 = 16m2.
    assert.equal(quantityFor(results, "qs-ceiling-standard"), 16);
    // CORNICE_LENGTH: page 1's 14m + page 2's 8m = 22m.
    assert.equal(quantityFor(results, "qs-cornice"), 22);
});

test("rollup retains contributing page ids across every quantity source", () => {
    const pages: PageTakeoffInput[] = [
        {
            pageId: "page-1",
            overlay: page1Overlay,
            scaleMmPerPx: PAGE_1_SCALE_MM_PER_PX,
            pageHeightMm: PAGE_1_HEIGHT_MM,
        },
        {
            pageId: "page-2",
            overlay: page2Overlay,
            scaleMmPerPx: PAGE_2_SCALE_MM_PER_PX,
            pageHeightMm: PAGE_2_HEIGHT_MM,
        },
    ];

    const results = rollup(pages, QUANTITY_SOURCES);

    QUANTITY_SOURCES.forEach((source) => {
        assert.deepEqual(contributingPageIdsFor(results, source.id), [
            "page-1",
            "page-2",
        ]);
    });
});

test("rollup skips a page with no scaleMmPerPx rather than failing the whole rollup", () => {
    const pages: PageTakeoffInput[] = [
        {
            pageId: "page-1",
            overlay: page1Overlay,
            scaleMmPerPx: PAGE_1_SCALE_MM_PER_PX,
            pageHeightMm: PAGE_1_HEIGHT_MM,
        },
        {
            pageId: "page-3-no-scale",
            overlay: page3Overlay,
            scaleMmPerPx: null,
            pageHeightMm: null,
        },
    ];

    const results = rollup(pages, QUANTITY_SOURCES);

    // Only page 1 contributes: page 3's large garage is entirely excluded.
    assert.equal(quantityFor(results, "qs-wall-standard"), 33.6);
    assert.equal(quantityFor(results, "qs-ceiling-standard"), 12);
    QUANTITY_SOURCES.forEach((source) => {
        assert.deepEqual(contributingPageIdsFor(results, source.id), [
            "page-1",
        ]);
    });
});

test("rollup skips a page whose only areas are deleted rather than failing the whole rollup", () => {
    const pages: PageTakeoffInput[] = [
        {
            pageId: "page-1",
            overlay: page1Overlay,
            scaleMmPerPx: PAGE_1_SCALE_MM_PER_PX,
            pageHeightMm: PAGE_1_HEIGHT_MM,
        },
        {
            pageId: "page-4-all-deleted",
            overlay: page4Overlay,
            scaleMmPerPx: PAGE_4_SCALE_MM_PER_PX,
            pageHeightMm: PAGE_1_HEIGHT_MM,
        },
    ];

    const results = rollup(pages, QUANTITY_SOURCES);

    assert.equal(quantityFor(results, "qs-wall-standard"), 33.6);
    assert.equal(quantityFor(results, "qs-ceiling-standard"), 12);
    QUANTITY_SOURCES.forEach((source) => {
        assert.deepEqual(contributingPageIdsFor(results, source.id), [
            "page-1",
        ]);
    });
});

test("rollup with no contributing pages returns zero for every source and no contributing page ids", () => {
    const pages: PageTakeoffInput[] = [
        {
            pageId: "page-3-no-scale",
            overlay: page3Overlay,
            scaleMmPerPx: null,
            pageHeightMm: null,
        },
        {
            pageId: "page-4-all-deleted",
            overlay: page4Overlay,
            scaleMmPerPx: PAGE_4_SCALE_MM_PER_PX,
            pageHeightMm: PAGE_1_HEIGHT_MM,
        },
    ];

    const results = rollup(pages, QUANTITY_SOURCES);

    results.forEach((result) => {
        assert.equal(result.quantity, 0);
        assert.deepEqual(result.contributingPageIds, []);
    });
});
