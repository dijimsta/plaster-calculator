import assert from "node:assert/strict";
import test from "node:test";

import {
    QuoteItemInclusionUtils,
    resolveTemplatePriced,
} from "../../src/index.ts";

import {
    page,
    project,
    quoteItemTemplateConfig,
} from "./readiness-test-fixtures.ts";

test("resolveTemplatePriced is met when every enabled item has a price", () => {
    const result = resolveTemplatePriced({
        project: project([page()]),
        quoteItemTemplateConfigs: [quoteItemTemplateConfig()],
    });
    assert.equal(result.isMet, true);
    assert.equal(result.affectedItemCount, 0);
});

test("resolveTemplatePriced is unmet for an enabled item with no price", () => {
    const unpriced = quoteItemTemplateConfig({
        unitPriceCents: 0,
        label: "Cornice",
    });
    const result = resolveTemplatePriced({
        project: project([page()]),
        quoteItemTemplateConfigs: [unpriced],
    });
    assert.equal(result.isMet, false);
    assert.equal(result.affectedItemCount, 1);
    assert.deepEqual(result.affectedItems, [
        {
            quoteItemTemplateId: unpriced.quoteItemTemplateId,
            quoteItemTemplateLabel: "Cornice",
        },
    ]);
});

test("resolveTemplatePriced checks flat-fee items with no quantity source", () => {
    const disabledUnpriced = quoteItemTemplateConfig({
        enabled: false,
        unitPriceCents: 0,
    });
    const manualUnpriced = quoteItemTemplateConfig({
        quantitySourceId: null,
        unitPriceCents: 0,
    });
    const result = resolveTemplatePriced({
        project: project([page()]),
        quoteItemTemplateConfigs: [disabledUnpriced, manualUnpriced],
    });
    assert.equal(result.isMet, false);
    assert.equal(result.affectedItemCount, 1);
    assert.deepEqual(result.affectedItems, [
        {
            quoteItemTemplateId: manualUnpriced.quoteItemTemplateId,
            quoteItemTemplateLabel: manualUnpriced.label,
        },
    ]);
});

test("resolveTemplatePriced fails for a variation with an unpriced included line, even when the default template is fully priced", () => {
    // The default template is fully priced and enables both items - on its
    // own it would pass TEMPLATE_PRICED. The variation actually pricing
    // this quote reuses the default's `enabled` (via
    // QuoteItemInclusionUtils.resolveInclusion, per the single include-rule
    // contract) but has its own, unpriced, unitPriceCents for "Cornice".
    // Readiness must be evaluated against the variation's prices, not the
    // default's, so it still fails.
    const defaultSkimCoat = quoteItemTemplateConfig({
        quoteItemTemplateId: "skim-coat",
        label: "Skim coat",
        enabled: true,
        unitPriceCents: 1000,
    });
    const defaultCornice = quoteItemTemplateConfig({
        quoteItemTemplateId: "cornice",
        label: "Cornice",
        enabled: true,
        unitPriceCents: 500,
    });

    const variationSkimCoat = quoteItemTemplateConfig({
        quoteItemTemplateId: "skim-coat",
        label: "Skim coat",
        unitPriceCents: 1200,
    });
    const variationCornice = quoteItemTemplateConfig({
        quoteItemTemplateId: "cornice",
        label: "Cornice",
        unitPriceCents: 0,
    });

    const variationConfigsForReadiness = [
        QuoteItemInclusionUtils.resolveInclusion(
            variationSkimCoat,
            defaultSkimCoat,
        ),
        QuoteItemInclusionUtils.resolveInclusion(
            variationCornice,
            defaultCornice,
        ),
    ];

    const result = resolveTemplatePriced({
        project: project([page()]),
        quoteItemTemplateConfigs: variationConfigsForReadiness,
    });

    assert.equal(result.isMet, false);
    assert.equal(result.affectedItemCount, 1);
    assert.deepEqual(result.affectedItems, [
        {
            quoteItemTemplateId: "cornice",
            quoteItemTemplateLabel: "Cornice",
        },
    ]);
});
