import assert from "node:assert/strict";
import test from "node:test";

import { buildRoomSummary } from "../src/ai/room-summary.ts";

import type { RoomSummary } from "../src/ai/room-summary.ts";
import type {
    AreaPolygon,
    Overlay,
} from "@libraries/plaster-calculator-common";

function area(overrides: Partial<AreaPolygon> = {}): AreaPolygon {
    return {
        id: "area-1",
        label: "Kitchen",
        points: [
            [0, 0],
            [100, 0],
            [100, 100],
            [0, 100],
        ],
        ceilingPlasterType: "SKIM",
        source: "detected",
        deleted: false,
        sourceRoomType: "Kitchen",
        ...overrides,
    } as AreaPolygon;
}

function page(
    areas: AreaPolygon[],
    scaleMmPerPx: number | null = 10,
    ceilingHeightMm: number | null = 2400,
) {
    const overlay: Overlay = { areas };
    return {
        overlayJson: JSON.stringify(overlay),
        scaleMmPerPx,
        ceilingHeightMm,
    } as unknown as Parameters<typeof buildRoomSummary>[0];
}

test("summarizes a room's ceiling area, wall area, and wet-area flag", () => {
    const [summary] = buildRoomSummary(
        page([area({ sourceRoomType: "Bath", wallBoardType: "Villaboard" })]),
    );

    assert.ok(summary);
    assert.equal(summary.label, "Kitchen");
    assert.equal(summary.roomType, "Bath");
    assert.equal(summary.isWetArea, true);
    assert.equal(summary.ceilingHeightMm, 2400);
    assert.equal(summary.ceilingMode, "flat");
    // 100x100px square at 10mm/px = 1m x 1m = 1m^2
    assert.equal(summary.ceilingAreaM2, 1);
    // perimeter 400px * 10mm/px / 1000 = 4m of wall, 2.4m high = 9.6m^2
    const wallArea = Object.values(summary.wallAreaM2ByType).reduce(
        (total, value) => total + value,
        0,
    );
    assert.ok(Math.abs(wallArea - 9.6) < 1e-9);
});

test("a non-wet-area room type is not flagged as a wet area", () => {
    const [summary] = buildRoomSummary(
        page([area({ sourceRoomType: "Bed Room" })]),
    );

    assert.equal(summary?.isWetArea, false);
});

test("deleted areas are excluded", () => {
    const summaries = buildRoomSummary(page([area({ deleted: true })]));

    assert.deepEqual(summaries, []);
});

test("returns no rooms when the page has no scale or overlay", () => {
    assert.deepEqual(buildRoomSummary(page([area()], null)), []);

    const noOverlay = {
        overlayJson: null,
        scaleMmPerPx: 10,
        ceilingHeightMm: 2400,
    } as unknown as Parameters<typeof buildRoomSummary>[0];
    assert.deepEqual(buildRoomSummary(noOverlay), []);
});

test("falls back to the page ceiling height when the area has none", () => {
    const [summary] = buildRoomSummary(
        page([area()], 10, 2700),
    ) as RoomSummary[];

    assert.equal(summary?.ceilingHeightMm, 2700);
});
