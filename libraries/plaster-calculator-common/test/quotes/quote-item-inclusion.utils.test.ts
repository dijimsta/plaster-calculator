import assert from "node:assert/strict";
import test from "node:test";

import { resolveInclusion } from "../../src/index.ts";

test("resolveInclusion takes enabled from the default template config", () => {
    const resolved = resolveInclusion(
        { unitPriceCents: 1500 },
        { enabled: true },
    );
    assert.equal(resolved.enabled, true);
});

test("resolveInclusion overrides a variation's own enabled value with the default's", () => {
    // The variation config below claims enabled: false for itself - this
    // must never win. Only the default template's enabled value decides
    // whether the item goes on a quote.
    const variationConfig = { unitPriceCents: 1500, enabled: false };
    const resolved = resolveInclusion(variationConfig, {
        enabled: true,
    });
    assert.equal(resolved.enabled, true);
});

test("resolveInclusion is false when the default template disables the item, even if the variation enables it", () => {
    const variationConfig = { unitPriceCents: 1500, enabled: true };
    const resolved = resolveInclusion(variationConfig, {
        enabled: false,
    });
    assert.equal(resolved.enabled, false);
});

test("resolveInclusion carries every other field on the variation config through unchanged", () => {
    const variationConfig = {
        quoteItemTemplateId: "template-1",
        label: "Skim coat",
        unitPriceCents: 1500,
        unit: "m²",
        quantitySourceId: "WALL_AREA",
    };
    const resolved = resolveInclusion(variationConfig, {
        enabled: true,
    });
    assert.equal(resolved.quoteItemTemplateId, "template-1");
    assert.equal(resolved.label, "Skim coat");
    assert.equal(resolved.unitPriceCents, 1500);
    assert.equal(resolved.unit, "m²");
    assert.equal(resolved.quantitySourceId, "WALL_AREA");
    assert.equal(resolved.enabled, true);
});
