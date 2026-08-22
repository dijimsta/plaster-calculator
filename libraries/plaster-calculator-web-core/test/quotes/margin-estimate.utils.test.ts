import assert from "node:assert/strict";
import test from "node:test";

import type { MarginEstimateQuoteItem } from "../../src/quotes/margin-estimate.types.ts";
import {
    computeSupplierCoverage,
    estimateQuoteMargin,
} from "../../src/quotes/margin-estimate.utils.ts";
import type { SupplierItemEstimate } from "../../src/suppliers/suppliers.types.ts";

function createQuoteItem(
    overrides: Partial<MarginEstimateQuoteItem> = {},
): MarginEstimateQuoteItem {
    return {
        sourceTemplateId: "template-1",
        quantity: 10,
        unitPriceCents: 1000,
        ...overrides,
    };
}

function createSupplierEstimate(
    overrides: Partial<SupplierItemEstimate> = {},
): SupplierItemEstimate {
    return {
        supplierId: "supplier-1",
        templateId: "template-1",
        templateName: "Skim coat",
        unit: "m²",
        materialUnitPriceCents: 400,
        createdAt: "2026-01-01T00:00:00.000Z",
        updatedAt: "2026-01-01T00:00:00.000Z",
        ...overrides,
    };
}

test("estimateQuoteMargin returns a zero summary with every line uncovered when the supplier has no estimates at all", () => {
    const items = [
        createQuoteItem({
            sourceTemplateId: "template-1",
            quantity: 5,
            unitPriceCents: 1000,
        }),
        createQuoteItem({
            sourceTemplateId: "template-2",
            quantity: 2,
            unitPriceCents: 2000,
        }),
    ];

    const summary = estimateQuoteMargin(items, []);

    // Zero, not a naive "100% margin" from treating every uncosted line as
    // free — see margin-estimate.types.ts for why this must stay null.
    assert.equal(summary.sellCents, 0);
    assert.equal(summary.costCents, 0);
    assert.equal(summary.marginCents, 0);
    assert.equal(summary.marginRatio, null);
    assert.equal(summary.uncoveredLines.length, 2);
    assert.deepEqual(summary.uncoveredLines[0], {
        quantity: 5,
        unitPriceCents: 1000,
        estimatedMaterialUnitPriceCents: null,
        lineCostCents: null,
        marginRatio: null,
    });
    assert.deepEqual(summary.uncoveredLines[1], {
        quantity: 2,
        unitPriceCents: 2000,
        estimatedMaterialUnitPriceCents: null,
        lineCostCents: null,
        marginRatio: null,
    });
});

test("estimateQuoteMargin computes margin over covered lines only and names the uncovered rest", () => {
    const items = [
        createQuoteItem({
            sourceTemplateId: "template-1",
            quantity: 4,
            unitPriceCents: 1000,
        }), // sell 4000, cost 2400
        createQuoteItem({
            sourceTemplateId: "template-2",
            quantity: 3,
            unitPriceCents: 1500,
        }), // uncovered, sell 4500 excluded
        createQuoteItem({
            sourceTemplateId: "template-3",
            quantity: 2,
            unitPriceCents: 2500,
        }), // sell 5000, cost 4000
    ];
    const estimates = [
        createSupplierEstimate({
            templateId: "template-1",
            materialUnitPriceCents: 600,
        }),
        createSupplierEstimate({
            templateId: "template-3",
            materialUnitPriceCents: 2000,
        }),
    ];

    const summary = estimateQuoteMargin(items, estimates);

    // Covered lines only: (4000 + 5000) sell, (2400 + 4000) cost. The
    // uncovered line's 4500 sell never enters the total.
    assert.equal(summary.sellCents, 9000);
    assert.equal(summary.costCents, 6400);
    assert.equal(summary.marginCents, 2600);
    assert.equal(summary.marginRatio, 2600 / 9000);
    assert.equal(summary.uncoveredLines.length, 1);
    assert.deepEqual(summary.uncoveredLines[0], {
        quantity: 3,
        unitPriceCents: 1500,
        estimatedMaterialUnitPriceCents: null,
        lineCostCents: null,
        marginRatio: null,
    });
});

test("estimateQuoteMargin always treats a null sourceTemplateId (a hand-added line) as uncovered, even against a coincidentally matching estimate id", () => {
    const handAddedItem = createQuoteItem({
        sourceTemplateId: null,
        quantity: 1,
        unitPriceCents: 5000,
    });
    const normalItem = createQuoteItem({
        sourceTemplateId: "template-1",
        quantity: 2,
        unitPriceCents: 1000,
    });
    const estimates = [
        createSupplierEstimate({
            templateId: "template-1",
            materialUnitPriceCents: 300,
        }),
        // A defensive decoy: if null were ever coerced to a string before
        // the lookup, this would wrongly "cover" the hand-added line.
        createSupplierEstimate({
            templateId: "null",
            materialUnitPriceCents: 999_999,
        }),
    ];

    const summary = estimateQuoteMargin([handAddedItem, normalItem], estimates);

    // Only normalItem's 2000 sell / 600 cost feeds the summary.
    assert.equal(summary.sellCents, 2000);
    assert.equal(summary.costCents, 600);
    assert.equal(summary.marginCents, 1400);
    assert.equal(summary.marginRatio, 1400 / 2000);
    assert.equal(summary.uncoveredLines.length, 1);
    assert.deepEqual(summary.uncoveredLines[0], {
        quantity: 1,
        unitPriceCents: 5000,
        estimatedMaterialUnitPriceCents: null,
        lineCostCents: null,
        marginRatio: null,
    });
});

test("estimateQuoteMargin treats a zero-quantity line with a matching estimate as covered, not uncovered, without producing NaN", () => {
    const zeroQuantityItem = createQuoteItem({
        sourceTemplateId: "template-1",
        quantity: 0,
        unitPriceCents: 1000,
    });
    const estimates = [
        createSupplierEstimate({
            templateId: "template-1",
            materialUnitPriceCents: 500,
        }),
    ];

    const summary = estimateQuoteMargin([zeroQuantityItem], estimates);

    // Covered (a price exists), just zero sell/cost — divide-by-zero at the
    // ratio must land on null, not NaN/Infinity, and must not be reported
    // as an uncovered line (it has a price, it's just for zero units).
    assert.equal(summary.sellCents, 0);
    assert.equal(summary.costCents, 0);
    assert.equal(summary.marginCents, 0);
    assert.equal(summary.marginRatio, null);
    assert.equal(summary.uncoveredLines.length, 0);
});

test("estimateQuoteMargin's zero-quantity covered line contributes nothing to an otherwise-normal quote's margin", () => {
    const items = [
        createQuoteItem({
            sourceTemplateId: "template-1",
            quantity: 0,
            unitPriceCents: 1000,
        }),
        createQuoteItem({
            sourceTemplateId: "template-2",
            quantity: 3,
            unitPriceCents: 800,
        }), // sell 2400, cost 600
    ];
    const estimates = [
        createSupplierEstimate({
            templateId: "template-1",
            materialUnitPriceCents: 500,
        }),
        createSupplierEstimate({
            templateId: "template-2",
            materialUnitPriceCents: 200,
        }),
    ];

    const summary = estimateQuoteMargin(items, estimates);

    assert.equal(summary.sellCents, 2400);
    assert.equal(summary.costCents, 600);
    assert.equal(summary.marginCents, 1800);
    assert.equal(summary.marginRatio, 1800 / 2400);
    assert.equal(summary.uncoveredLines.length, 0);
});

test("estimateQuoteMargin returns a negative marginCents/marginRatio, not clamped to zero, when estimated cost exceeds sell", () => {
    const items = [
        createQuoteItem({
            sourceTemplateId: "template-1",
            quantity: 10,
            unitPriceCents: 100,
        }), // sell 1000
    ];
    const estimates = [
        createSupplierEstimate({
            templateId: "template-1",
            materialUnitPriceCents: 150,
        }), // cost 1500
    ];

    const summary = estimateQuoteMargin(items, estimates);

    assert.equal(summary.sellCents, 1000);
    assert.equal(summary.costCents, 1500);
    assert.equal(summary.marginCents, -500);
    assert.equal(summary.marginRatio, -0.5);
    assert.equal(summary.uncoveredLines.length, 0);
});

test("computeSupplierCoverage counts only enabled templates with a matching estimate", () => {
    const enabledTemplateIds = ["template-1", "template-2", "template-3"];
    const estimates = [
        createSupplierEstimate({ templateId: "template-1" }),
        createSupplierEstimate({ templateId: "template-3" }),
        // Priced, but not one of the team's enabled templates -- must not
        // inflate the count.
        createSupplierEstimate({ templateId: "template-legacy" }),
    ];

    const coverage = computeSupplierCoverage(enabledTemplateIds, estimates);

    assert.equal(coverage.pricedTemplateCount, 2);
    assert.equal(coverage.totalTemplateCount, 3);
});

test("computeSupplierCoverage returns a zero priced count for a supplier with no estimates", () => {
    const coverage = computeSupplierCoverage(["template-1", "template-2"], []);

    assert.equal(coverage.pricedTemplateCount, 0);
    assert.equal(coverage.totalTemplateCount, 2);
});
