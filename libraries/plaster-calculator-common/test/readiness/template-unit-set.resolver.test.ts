import assert from "node:assert/strict";
import test from "node:test";

import { resolveTemplateUnitSet } from "../../src/index.ts";

import { project, quoteItemTemplateConfig } from "./readiness-test-fixtures.ts";

test("resolveTemplateUnitSet is met when enabled templates have units", () => {
    const result = resolveTemplateUnitSet({
        project: project([]),
        quoteItemTemplateConfigs: [quoteItemTemplateConfig({ unit: "m²" })],
    });
    assert.equal(result.isMet, true);
    assert.deepEqual(result.affectedItems, []);
});

test("resolveTemplateUnitSet reports enabled templates with blank units", () => {
    const config = quoteItemTemplateConfig({ unit: "  " });
    const result = resolveTemplateUnitSet({
        project: project([]),
        quoteItemTemplateConfigs: [config],
    });
    assert.equal(result.isMet, false);
    assert.deepEqual(result.affectedItems, [
        {
            quoteItemTemplateId: config.quoteItemTemplateId,
            quoteItemTemplateLabel: config.label,
        },
    ]);
});

test("resolveTemplateUnitSet ignores disabled templates", () => {
    const result = resolveTemplateUnitSet({
        project: project([]),
        quoteItemTemplateConfigs: [
            quoteItemTemplateConfig({ enabled: false, unit: null }),
        ],
    });
    assert.equal(result.isMet, true);
});
