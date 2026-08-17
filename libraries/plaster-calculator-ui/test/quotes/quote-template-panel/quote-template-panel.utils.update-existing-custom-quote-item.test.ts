import assert from "node:assert/strict";
import test from "node:test";

import type * as DataConnector from "@generated/data-connector-web";

import { updateExistingCustomQuoteItem } from "../../../src/quotes/quote-template-panel/quote-template-panel.utils.ts";

import {
    customItemFixture,
    quoteTemplateItemFixture,
    recordingAsync,
} from "./quote-template-panel-test-fixtures.ts";

test("updateExistingCustomQuoteItem updates the item template when the name changed", async () => {
    const updateItemTemplateCalls: DataConnector.UpdateQuoteItemTemplateWithUnitVariables[] =
        [];
    const updateItemTemplateConfigCalls: DataConnector.UpdateQuoteItemTemplateConfigVariables[] =
        [];
    const original = quoteTemplateItemFixture({ name: "Skim coat" });
    const item = customItemFixture({ name: "Skim coat plus" });

    await updateExistingCustomQuoteItem(
        "quote-template-1",
        "item-1",
        item,
        original,
        recordingAsync(updateItemTemplateCalls, {}),
        recordingAsync(updateItemTemplateConfigCalls, {}),
    );

    assert.equal(updateItemTemplateCalls.length, 1);
    assert.equal(updateItemTemplateCalls[0]?.name, "Skim coat plus");
    assert.equal(updateItemTemplateConfigCalls.length, 0);
});

test("updateExistingCustomQuoteItem treats a unit that only differs by whitespace as unchanged", async () => {
    const updateItemTemplateCalls: DataConnector.UpdateQuoteItemTemplateWithUnitVariables[] =
        [];
    const updateItemTemplateConfigCalls: DataConnector.UpdateQuoteItemTemplateConfigVariables[] =
        [];
    const original = quoteTemplateItemFixture({ unit: "m²" });
    const item = customItemFixture({ unit: " m² " });

    await updateExistingCustomQuoteItem(
        "quote-template-1",
        "item-1",
        item,
        original,
        recordingAsync(updateItemTemplateCalls, {}),
        recordingAsync(updateItemTemplateConfigCalls, {}),
    );

    assert.equal(updateItemTemplateCalls.length, 0);
});

test("updateExistingCustomQuoteItem updates the item template when the unit changed", async () => {
    const updateItemTemplateCalls: DataConnector.UpdateQuoteItemTemplateWithUnitVariables[] =
        [];
    const updateItemTemplateConfigCalls: DataConnector.UpdateQuoteItemTemplateConfigVariables[] =
        [];
    const original = quoteTemplateItemFixture({ unit: "m²" });
    const item = customItemFixture({ unit: "kg" });

    await updateExistingCustomQuoteItem(
        "quote-template-1",
        "item-1",
        item,
        original,
        recordingAsync(updateItemTemplateCalls, {}),
        recordingAsync(updateItemTemplateConfigCalls, {}),
    );

    assert.equal(updateItemTemplateCalls.length, 1);
    assert.equal(updateItemTemplateCalls[0]?.unit, "kg");
});

test("updateExistingCustomQuoteItem updates the item template when hasKeywords changed", async () => {
    const updateItemTemplateCalls: DataConnector.UpdateQuoteItemTemplateWithUnitVariables[] =
        [];
    const updateItemTemplateConfigCalls: DataConnector.UpdateQuoteItemTemplateConfigVariables[] =
        [];
    const original = quoteTemplateItemFixture({
        hasKeywords: false,
        keywords: [],
    });
    const item = customItemFixture({ hasKeywords: true, keywords: [] });

    await updateExistingCustomQuoteItem(
        "quote-template-1",
        "item-1",
        item,
        original,
        recordingAsync(updateItemTemplateCalls, {}),
        recordingAsync(updateItemTemplateConfigCalls, {}),
    );

    assert.equal(updateItemTemplateCalls.length, 1);
    assert.equal(updateItemTemplateCalls[0]?.hasKeywords, true);
});

test("updateExistingCustomQuoteItem updates the item template when the keywords changed", async () => {
    const updateItemTemplateCalls: DataConnector.UpdateQuoteItemTemplateWithUnitVariables[] =
        [];
    const updateItemTemplateConfigCalls: DataConnector.UpdateQuoteItemTemplateConfigVariables[] =
        [];
    const original = quoteTemplateItemFixture({
        hasKeywords: true,
        keywords: ["cornice"],
    });
    const item = customItemFixture({
        hasKeywords: true,
        keywords: ["cornice", "cement"],
    });

    await updateExistingCustomQuoteItem(
        "quote-template-1",
        "item-1",
        item,
        original,
        recordingAsync(updateItemTemplateCalls, {}),
        recordingAsync(updateItemTemplateConfigCalls, {}),
    );

    assert.equal(updateItemTemplateCalls.length, 1);
    assert.deepEqual(updateItemTemplateCalls[0]?.keywords, [
        "cornice",
        "cement",
    ]);
});

test("updateExistingCustomQuoteItem does not call updateItemTemplate when name, unit, hasKeywords, and keywords are all unchanged", async () => {
    const updateItemTemplateCalls: DataConnector.UpdateQuoteItemTemplateWithUnitVariables[] =
        [];
    const updateItemTemplateConfigCalls: DataConnector.UpdateQuoteItemTemplateConfigVariables[] =
        [];
    const original = quoteTemplateItemFixture({
        name: "Skim coat",
        unit: "m²",
        hasKeywords: true,
        keywords: ["cornice"],
    });
    const item = customItemFixture({
        name: "Skim coat",
        unit: "m²",
        hasKeywords: true,
        keywords: ["cornice"],
    });

    await updateExistingCustomQuoteItem(
        "quote-template-1",
        "item-1",
        item,
        original,
        recordingAsync(updateItemTemplateCalls, {}),
        recordingAsync(updateItemTemplateConfigCalls, {}),
    );

    assert.equal(updateItemTemplateCalls.length, 0);
});

test("updateExistingCustomQuoteItem updates the item template config when enabled changed, preserving the original material/labour prices", async () => {
    const updateItemTemplateCalls: DataConnector.UpdateQuoteItemTemplateWithUnitVariables[] =
        [];
    const updateItemTemplateConfigCalls: DataConnector.UpdateQuoteItemTemplateConfigVariables[] =
        [];
    const original = quoteTemplateItemFixture({
        enabled: true,
        unitPriceCents: 1000,
        materialUnitPriceCents: 400,
        labourUnitPriceCents: 600,
    });
    const item = customItemFixture({ enabled: false, unitPriceCents: 1000 });

    await updateExistingCustomQuoteItem(
        "quote-template-1",
        "item-1",
        item,
        original,
        recordingAsync(updateItemTemplateCalls, {}),
        recordingAsync(updateItemTemplateConfigCalls, {}),
    );

    assert.equal(updateItemTemplateConfigCalls.length, 1);
    const configCall = updateItemTemplateConfigCalls[0];
    assert.equal(configCall?.enabled, false);
    assert.equal(configCall?.unitPriceCents, 1000);
    assert.equal(configCall?.materialUnitPriceCents, 400);
    assert.equal(configCall?.labourUnitPriceCents, 600);
});

test("updateExistingCustomQuoteItem updates the item template config when the price changed", async () => {
    const updateItemTemplateCalls: DataConnector.UpdateQuoteItemTemplateWithUnitVariables[] =
        [];
    const updateItemTemplateConfigCalls: DataConnector.UpdateQuoteItemTemplateConfigVariables[] =
        [];
    const original = quoteTemplateItemFixture({ unitPriceCents: 1000 });
    const item = customItemFixture({ unitPriceCents: 1500 });

    await updateExistingCustomQuoteItem(
        "quote-template-1",
        "item-1",
        item,
        original,
        recordingAsync(updateItemTemplateCalls, {}),
        recordingAsync(updateItemTemplateConfigCalls, {}),
    );

    assert.equal(updateItemTemplateConfigCalls.length, 1);
    assert.equal(updateItemTemplateConfigCalls[0]?.unitPriceCents, 1500);
});

test("updateExistingCustomQuoteItem does not call updateItemTemplateConfig when enabled and price are unchanged", async () => {
    const updateItemTemplateCalls: DataConnector.UpdateQuoteItemTemplateWithUnitVariables[] =
        [];
    const updateItemTemplateConfigCalls: DataConnector.UpdateQuoteItemTemplateConfigVariables[] =
        [];
    const original = quoteTemplateItemFixture({
        enabled: true,
        unitPriceCents: 1000,
    });
    const item = customItemFixture({ enabled: true, unitPriceCents: 1000 });

    await updateExistingCustomQuoteItem(
        "quote-template-1",
        "item-1",
        item,
        original,
        recordingAsync(updateItemTemplateCalls, {}),
        recordingAsync(updateItemTemplateConfigCalls, {}),
    );

    assert.equal(updateItemTemplateConfigCalls.length, 0);
});
