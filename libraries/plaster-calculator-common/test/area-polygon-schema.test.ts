import assert from "node:assert/strict";
import test from "node:test";

import { AreaPolygonSchema, OverlaySchema } from "../src/index.ts";
import type { Point } from "../src/index.ts";

const SQUARE_100PX: Point[] = [
    [0, 0],
    [100, 0],
    [100, 100],
    [0, 100],
];

function rawArea(overrides: Record<string, unknown> = {}) {
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

test("AreaPolygonSchema parses a pre-existing payload without wallBoardTypeConfirmedAt", () => {
    const parsed = AreaPolygonSchema.parse(rawArea());
    assert.equal(parsed.wallBoardTypeConfirmedAt, undefined);
});

test("AreaPolygonSchema parses wallBoardTypeConfirmedAt as an ISO string", () => {
    const parsed = AreaPolygonSchema.parse(
        rawArea({ wallBoardTypeConfirmedAt: "2026-08-11T00:00:00.000Z" }),
    );
    assert.equal(parsed.wallBoardTypeConfirmedAt, "2026-08-11T00:00:00.000Z");
});

test("AreaPolygonSchema parses wallBoardTypeConfirmedAt as null", () => {
    const parsed = AreaPolygonSchema.parse(
        rawArea({ wallBoardTypeConfirmedAt: null }),
    );
    assert.equal(parsed.wallBoardTypeConfirmedAt, null);
});

test("OverlaySchema parses an existing overlay payload unchanged", () => {
    const parsed = OverlaySchema.parse({
        sourceFile: "plan.pdf",
        imageSizePx: { width: 1000, height: 800 },
        areas: [rawArea()],
    });
    assert.equal(parsed.areas.length, 1);
    assert.equal(parsed.areas[0]?.wallBoardTypeConfirmedAt, undefined);
});
