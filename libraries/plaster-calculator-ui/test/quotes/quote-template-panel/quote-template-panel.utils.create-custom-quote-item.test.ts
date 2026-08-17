import assert from "node:assert/strict";
import test from "node:test";

import type * as DataConnector from "@generated/data-connector-web";

import { createCustomQuoteItem } from "../../../src/quotes/quote-template-panel/quote-template-panel.utils.ts";

import {
    customItemFixture,
    recordingAsync,
} from "./quote-template-panel-test-fixtures.ts";

test("createCustomQuoteItem creates the item template with a trimmed unit and the item's keywords", async () => {
    const createItemTemplateCalls: DataConnector.CreateQuoteItemTemplateWithUnitVariables[] =
        [];
    const createItemTemplateConfigCalls: DataConnector.CreateQuoteItemTemplateConfigVariables[] =
        [];
    const updateItemTemplateConfigCalls: DataConnector.UpdateQuoteItemTemplateConfigVariables[] =
        [];
    const item = customItemFixture({
        name: "Cornice cement",
        unit: " kg ",
        hasKeywords: true,
        keywords: ["cornice", "cement"],
    });

    await createCustomQuoteItem(
        "quote-template-1",
        item,
        recordingAsync(createItemTemplateCalls, {
            quoteItemTemplate_insert: { id: "generated-id" },
        }),
        recordingAsync(createItemTemplateConfigCalls, {
            quoteItemTemplateConfig_insert: {
                quoteTemplateId: "quote-template-1",
                itemTemplateId: "generated-id",
            },
        }),
        recordingAsync(updateItemTemplateConfigCalls, {}),
    );

    assert.equal(createItemTemplateCalls.length, 1);
    assert.equal(createItemTemplateCalls[0]?.name, "Cornice cement");
    assert.equal(createItemTemplateCalls[0]?.unit, "kg");
    assert.equal(createItemTemplateCalls[0]?.hasKeywords, true);
    assert.deepEqual(createItemTemplateCalls[0]?.keywords, [
        "cornice",
        "cement",
    ]);
});

test("createCustomQuoteItem creates the item template config using the generated item template id, the item's price, and zero material/labour defaults", async () => {
    const createItemTemplateCalls: DataConnector.CreateQuoteItemTemplateWithUnitVariables[] =
        [];
    const createItemTemplateConfigCalls: DataConnector.CreateQuoteItemTemplateConfigVariables[] =
        [];
    const updateItemTemplateConfigCalls: DataConnector.UpdateQuoteItemTemplateConfigVariables[] =
        [];
    const item = customItemFixture({ unitPriceCents: 2500 });

    await createCustomQuoteItem(
        "quote-template-1",
        item,
        recordingAsync(createItemTemplateCalls, {
            quoteItemTemplate_insert: { id: "generated-id" },
        }),
        recordingAsync(createItemTemplateConfigCalls, {
            quoteItemTemplateConfig_insert: {
                quoteTemplateId: "quote-template-1",
                itemTemplateId: "generated-id",
            },
        }),
        recordingAsync(updateItemTemplateConfigCalls, {}),
    );

    assert.equal(createItemTemplateConfigCalls.length, 1);
    const configCall = createItemTemplateConfigCalls[0];
    assert.equal(configCall?.quoteTemplateId, "quote-template-1");
    assert.equal(configCall?.itemTemplateId, createItemTemplateCalls[0]?.id);
    assert.equal(configCall?.unitPriceCents, 2500);
    assert.equal(configCall?.materialUnitPriceCents, 0);
    assert.equal(configCall?.labourUnitPriceCents, 0);
    assert.equal(updateItemTemplateConfigCalls.length, 0);
});

test("createCustomQuoteItem does not send a follow-up update when the item starts enabled", async () => {
    const createItemTemplateCalls: DataConnector.CreateQuoteItemTemplateWithUnitVariables[] =
        [];
    const createItemTemplateConfigCalls: DataConnector.CreateQuoteItemTemplateConfigVariables[] =
        [];
    const updateItemTemplateConfigCalls: DataConnector.UpdateQuoteItemTemplateConfigVariables[] =
        [];
    const item = customItemFixture({ enabled: true });

    await createCustomQuoteItem(
        "quote-template-1",
        item,
        recordingAsync(createItemTemplateCalls, {
            quoteItemTemplate_insert: { id: "generated-id" },
        }),
        recordingAsync(createItemTemplateConfigCalls, {
            quoteItemTemplateConfig_insert: {
                quoteTemplateId: "quote-template-1",
                itemTemplateId: "generated-id",
            },
        }),
        recordingAsync(updateItemTemplateConfigCalls, {}),
    );

    assert.equal(updateItemTemplateConfigCalls.length, 0);
});

test("createCustomQuoteItem disables the newly created config with a follow-up update when the item starts disabled", async () => {
    const createItemTemplateCalls: DataConnector.CreateQuoteItemTemplateWithUnitVariables[] =
        [];
    const createItemTemplateConfigCalls: DataConnector.CreateQuoteItemTemplateConfigVariables[] =
        [];
    const updateItemTemplateConfigCalls: DataConnector.UpdateQuoteItemTemplateConfigVariables[] =
        [];
    const item = customItemFixture({ enabled: false, unitPriceCents: 1800 });

    await createCustomQuoteItem(
        "quote-template-1",
        item,
        recordingAsync(createItemTemplateCalls, {
            quoteItemTemplate_insert: { id: "generated-id" },
        }),
        recordingAsync(createItemTemplateConfigCalls, {
            quoteItemTemplateConfig_insert: {
                quoteTemplateId: "quote-template-1",
                itemTemplateId: "generated-id",
            },
        }),
        recordingAsync(updateItemTemplateConfigCalls, {}),
    );

    assert.equal(updateItemTemplateConfigCalls.length, 1);
    const updateCall = updateItemTemplateConfigCalls[0];
    assert.equal(updateCall?.itemTemplateId, createItemTemplateCalls[0]?.id);
    assert.equal(updateCall?.enabled, false);
    assert.equal(updateCall?.unitPriceCents, 1800);
    assert.equal(updateCall?.materialUnitPriceCents, 0);
    assert.equal(updateCall?.labourUnitPriceCents, 0);
});
