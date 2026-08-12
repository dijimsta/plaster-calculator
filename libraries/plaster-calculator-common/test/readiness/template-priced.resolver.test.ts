import assert from "node:assert/strict";
import test from "node:test";

import { resolveTemplatePriced } from "../../src/index.ts";

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
