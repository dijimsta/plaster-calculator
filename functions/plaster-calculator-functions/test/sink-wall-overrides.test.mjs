import assert from "node:assert/strict";
import test from "node:test";

import { buildOverlayFromAnalyzerResult } from "../out/analyzer.js";

const room = (roomType, id, x = 0) => ({
    id,
    label: roomType,
    room_type: roomType,
    polygon: [
        [x, 0],
        [x + 100, 0],
        [x + 100, 100],
        [x, 100],
    ],
});

const sink = (x, y) => ({
    label: "Sink",
    polygon: [
        [x - 2, y - 2],
        [x + 2, y - 2],
        [x + 2, y + 2],
        [x - 2, y + 2],
    ],
});

function overlay(rooms, icons) {
    return buildOverlayFromAnalyzerResult(
        { polygonsKey: "rooms" },
        "plan.png",
        { rooms, icons },
    );
}

for (const roomType of ["Kitchen", "Laundry", "Toilet", "Living Room", null]) {
    test(`${roomType} sink overrides its nearest wall`, () => {
        const result = overlay([room(roomType, 1)], [sink(98, 50)]);
        assert.deepEqual(result.areas[0].edgeOverrides, {
            1: { wallBoardType: "9mm Villaboard" },
        });
    });
}

test("bath receives no sink edge override", () => {
    const result = overlay([room("Bath", 1)], [sink(98, 50)]);
    assert.equal(result.areas[0].edgeOverrides, undefined);
});

test("multiple and duplicate sinks override the applicable edges idempotently", () => {
    const result = overlay(
        [room("Kitchen", 1)],
        [sink(50, 2), sink(98, 50), sink(99, 50)],
    );
    assert.deepEqual(result.areas[0].edgeOverrides, {
        0: { wallBoardType: "9mm Villaboard" },
        1: { wallBoardType: "9mm Villaboard" },
    });
});

test("sinks outside an eligible room are ignored", () => {
    const result = overlay([room("Kitchen", 1)], [sink(150, 150)]);
    assert.equal(result.areas[0].edgeOverrides, undefined);
});

test("sinks farther than 65 pixels from every wall are ignored", () => {
    const largeRoom = {
        ...room("Living Room", 1),
        polygon: [
            [0, 0],
            [200, 0],
            [200, 200],
            [0, 200],
        ],
    };
    const result = overlay([largeRoom], [sink(100, 100)]);
    assert.equal(result.areas[0].edgeOverrides, undefined);
});
