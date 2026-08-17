import assert from "node:assert/strict";
import test from "node:test";

import {
    AMOUNTS_ONLY_PRICING_DETAIL,
    DEFAULT_QUOTE_APPEARANCE,
    FULL_LINE_ITEMS_PRICING_DETAIL,
    LUMP_SUM_PRICING_DETAIL,
} from "@libraries/plaster-calculator-common";

import { toAppearance } from "../../src/app/(app)/projects/[projectId]/quote/quote-tab.utils.ts";

import { createAppearanceRow } from "./quote-tab-test-fixtures.ts";

test("toAppearance resolves an undefined row to the default appearance", () => {
    const result = toAppearance(undefined);

    assert.deepEqual(result, DEFAULT_QUOTE_APPEARANCE);
});

test("toAppearance maps every field of a fully-populated row", () => {
    const row = createAppearanceRow({
        logoStoragePath: "teams/team-1/logo.png",
        businessName: "Acme Plastering",
        abn: "12 345 678 901",
        licenceNumber: "LIC-1",
        address: "1 Example St",
        phoneNumber: "0400 000 000",
        email: "team@example.test",
        accentColor: "#336699",
        pricingDetail: AMOUNTS_ONLY_PRICING_DETAIL,
        showScopeOfWork: false,
        showTakeoffSummary: true,
        showSignatureBlock: true,
        validForDays: 14,
        terms: "Payment due within 14 days.",
    });

    const result = toAppearance(row);

    assert.deepEqual(result, {
        logoStoragePath: "teams/team-1/logo.png",
        businessName: "Acme Plastering",
        abn: "12 345 678 901",
        licenceNumber: "LIC-1",
        address: "1 Example St",
        phoneNumber: "0400 000 000",
        email: "team@example.test",
        accentColor: "#336699",
        pricingDetail: AMOUNTS_ONLY_PRICING_DETAIL,
        showScopeOfWork: false,
        showTakeoffSummary: true,
        showSignatureBlock: true,
        validForDays: 14,
        terms: "Payment due within 14 days.",
    });
});

test("toAppearance normalises explicit null optional fields to null", () => {
    const row = createAppearanceRow({
        logoStoragePath: null,
        businessName: null,
        terms: null,
    });

    const result = toAppearance(row);

    assert.equal(result.logoStoragePath, null);
    assert.equal(result.businessName, null);
    assert.equal(result.terms, null);
});

test("toAppearance normalises omitted (undefined) optional fields to null", () => {
    const row = createAppearanceRow({
        logoStoragePath: undefined,
        businessName: undefined,
        terms: undefined,
    });

    const result = toAppearance(row);

    assert.equal(result.logoStoragePath, null);
    assert.equal(result.businessName, null);
    assert.equal(result.terms, null);
});

test("toAppearance parses every closed pricingDetail literal", () => {
    for (const pricingDetail of [
        FULL_LINE_ITEMS_PRICING_DETAIL,
        AMOUNTS_ONLY_PRICING_DETAIL,
        LUMP_SUM_PRICING_DETAIL,
    ] as const) {
        const row = createAppearanceRow({ pricingDetail });

        const result = toAppearance(row);

        assert.equal(result.pricingDetail, pricingDetail);
    }
});
