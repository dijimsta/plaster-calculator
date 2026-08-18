import assert from "node:assert/strict";
import test from "node:test";

import type * as DataConnector from "@generated/data-connector-web";

import { updateQuoteItemPrice } from "../../../src/quotes/quote-template-panel/quote-template-panel.utils.ts";

import {
    quoteTemplateItemFixture,
    recordingAsync,
} from "./quote-template-panel-test-fixtures.ts";

test("updateQuoteItemPrice does nothing when there is no original config", async () => {
    const calls: DataConnector.UpdateQuoteItemTemplateConfigVariables[] = [];

    await updateQuoteItemPrice(
        "quote-template-1",
        { itemTemplateId: "item-1", unitPriceCents: 1000 },
        undefined,
        recordingAsync(calls, {}),
    );

    assert.equal(calls.length, 0);
});

test("updateQuoteItemPrice does nothing when the price is unchanged", async () => {
    const calls: DataConnector.UpdateQuoteItemTemplateConfigVariables[] = [];
    const original = quoteTemplateItemFixture({
        itemTemplateId: "item-1",
        unitPriceCents: 1000,
    });

    await updateQuoteItemPrice(
        "quote-template-1",
        { itemTemplateId: "item-1", unitPriceCents: 1000 },
        original,
        recordingAsync(calls, {}),
    );

    assert.equal(calls.length, 0);
});

test("updateQuoteItemPrice updates the price and preserves the original's enabled/material/labour values", async () => {
    const calls: DataConnector.UpdateQuoteItemTemplateConfigVariables[] = [];
    const original = quoteTemplateItemFixture({
        itemTemplateId: "item-1",
        unitPriceCents: 1000,
        enabled: false,
        materialUnitPriceCents: 400,
        labourUnitPriceCents: 600,
    });

    await updateQuoteItemPrice(
        "quote-template-1",
        { itemTemplateId: "item-1", unitPriceCents: 1750 },
        original,
        recordingAsync(calls, {}),
    );

    assert.equal(calls.length, 1);
    const call = calls[0];
    assert.equal(call?.quoteTemplateId, "quote-template-1");
    assert.equal(call?.itemTemplateId, "item-1");
    assert.equal(call?.unitPriceCents, 1750);
    assert.equal(call?.enabled, false);
    assert.equal(call?.materialUnitPriceCents, 400);
    assert.equal(call?.labourUnitPriceCents, 600);
});
