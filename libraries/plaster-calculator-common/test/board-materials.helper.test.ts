import assert from "node:assert/strict";
import test from "node:test";

import { BoardMaterialsHelper } from "../src/index.ts";

test("normalizeWallBoardType returns the value when it is a recognised wall board type", () => {
    assert.equal(
        BoardMaterialsHelper.normalizeWallBoardType("13mm Plasterboard"),
        "13mm Plasterboard",
    );
});

test("normalizeWallBoardType maps the 'Water Resistant' legacy value", () => {
    assert.equal(
        BoardMaterialsHelper.normalizeWallBoardType(
            undefined,
            "Water Resistant",
        ),
        "9mm Villaboard",
    );
});

test("normalizeWallBoardType maps the 'Sound Check' legacy value", () => {
    assert.equal(
        BoardMaterialsHelper.normalizeWallBoardType(undefined, "Sound Check"),
        "10mm Acoustic (Soundchek)",
    );
});

test("normalizeWallBoardType falls back to the default for an unrecognised legacy value", () => {
    assert.equal(
        BoardMaterialsHelper.normalizeWallBoardType(
            undefined,
            "Something Else",
        ),
        "10mm Plasterboard",
    );
});

test("normalizeWallBoardType falls back to the default when both value and legacy value are missing", () => {
    assert.equal(
        BoardMaterialsHelper.normalizeWallBoardType(null, null),
        "10mm Plasterboard",
    );
    assert.equal(
        BoardMaterialsHelper.normalizeWallBoardType(undefined, undefined),
        "10mm Plasterboard",
    );
});

test("normalizeWallBoardType prefers the primary value over a recognised legacy value", () => {
    assert.equal(
        BoardMaterialsHelper.normalizeWallBoardType(
            "6mm Villaboard",
            "Sound Check",
        ),
        "6mm Villaboard",
    );
});

test("wallBoardTypeSource reports 'explicit' when the primary value is a recognised wall board type", () => {
    assert.equal(
        BoardMaterialsHelper.wallBoardTypeSource("13mm Plasterboard"),
        "explicit",
    );
});

test("wallBoardTypeSource reports 'explicit' even when a legacy value is also present", () => {
    assert.equal(
        BoardMaterialsHelper.wallBoardTypeSource(
            "6mm Villaboard",
            "Sound Check",
        ),
        "explicit",
    );
});

test("wallBoardTypeSource reports 'legacy' for the 'Water Resistant' legacy value", () => {
    assert.equal(
        BoardMaterialsHelper.wallBoardTypeSource(undefined, "Water Resistant"),
        "legacy",
    );
});

test("wallBoardTypeSource reports 'legacy' for the 'Sound Check' legacy value", () => {
    assert.equal(
        BoardMaterialsHelper.wallBoardTypeSource(undefined, "Sound Check"),
        "legacy",
    );
});

test("wallBoardTypeSource reports 'defaulted' for an unrecognised value with no legacy value", () => {
    assert.equal(
        BoardMaterialsHelper.wallBoardTypeSource("Not A Real Type"),
        "defaulted",
    );
});

test("wallBoardTypeSource reports 'defaulted' for an unrecognised legacy value", () => {
    assert.equal(
        BoardMaterialsHelper.wallBoardTypeSource(undefined, "Something Else"),
        "defaulted",
    );
});

test("wallBoardTypeSource reports 'defaulted' when the primary value is null and there is no legacy value", () => {
    assert.equal(
        BoardMaterialsHelper.wallBoardTypeSource(null, null),
        "defaulted",
    );
});

test("wallBoardTypeSource reports 'defaulted' when the primary value is undefined and there is no legacy value", () => {
    assert.equal(
        BoardMaterialsHelper.wallBoardTypeSource(undefined, undefined),
        "defaulted",
    );
});

test("wallPlasterCategory reports STANDARD for ordinary plasterboard", () => {
    assert.equal(
        BoardMaterialsHelper.wallPlasterCategory("10mm Plasterboard"),
        "STANDARD",
    );
    assert.equal(
        BoardMaterialsHelper.wallPlasterCategory("13mm Plasterboard"),
        "STANDARD",
    );
});

test("wallPlasterCategory reports STANDARD for acoustic and dry-area fire-resistant boards", () => {
    assert.equal(
        BoardMaterialsHelper.wallPlasterCategory("10mm Acoustic (Soundchek)"),
        "STANDARD",
    );
    assert.equal(
        BoardMaterialsHelper.wallPlasterCategory(
            "13mm Fire Resistant - dry area",
        ),
        "STANDARD",
    );
});

test("wallPlasterCategory reports WET_AREA for villaboard, water-resistant, and wet-area fire-resistant boards", () => {
    assert.equal(
        BoardMaterialsHelper.wallPlasterCategory("9mm Villaboard"),
        "WET_AREA",
    );
    assert.equal(
        BoardMaterialsHelper.wallPlasterCategory("6mm Villaboard"),
        "WET_AREA",
    );
    assert.equal(
        BoardMaterialsHelper.wallPlasterCategory("10mm Water Resistant"),
        "WET_AREA",
    );
    assert.equal(
        BoardMaterialsHelper.wallPlasterCategory(
            "13mm Fire Resistant - wet area",
        ),
        "WET_AREA",
    );
});
