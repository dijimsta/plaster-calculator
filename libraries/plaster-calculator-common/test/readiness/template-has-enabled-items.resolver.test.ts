import assert from "node:assert/strict";
import test from "node:test";

import { resolveTemplateHasEnabledItems } from "../../src/index.ts";

import { project, quoteItemTemplateConfig } from "./readiness-test-fixtures.ts";

test("resolveTemplateHasEnabledItems is met when at least one template is enabled", () => {
    const result = resolveTemplateHasEnabledItems({
        project: project([]),
        quoteItemTemplateConfigs: [
            quoteItemTemplateConfig({ enabled: false }),
            quoteItemTemplateConfig({ enabled: true }),
        ],
    });
    assert.equal(result.isMet, true);
    assert.equal(result.affectedItemCount, 0);
    assert.deepEqual(result.affectedItems, []);
});

test("resolveTemplateHasEnabledItems is unmet when the catalog is empty", () => {
    const result = resolveTemplateHasEnabledItems({
        project: project([]),
        quoteItemTemplateConfigs: [],
    });
    assert.equal(result.isMet, false);
    assert.equal(result.affectedItemCount, 1);
    assert.deepEqual(result.affectedItems, [{}]);
});

test("resolveTemplateHasEnabledItems is unmet when every template is disabled", () => {
    const result = resolveTemplateHasEnabledItems({
        project: project([]),
        quoteItemTemplateConfigs: [
            quoteItemTemplateConfig({ enabled: false }),
            quoteItemTemplateConfig({ enabled: false }),
        ],
    });
    assert.equal(result.isMet, false);
    assert.equal(result.affectedItemCount, 1);
});

test("resolveTemplateHasEnabledItems treats an absent quoteItemTemplateConfigs as empty", () => {
    const result = resolveTemplateHasEnabledItems({ project: project([]) });
    assert.equal(result.isMet, false);
});
