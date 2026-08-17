import assert from "node:assert/strict";
import test from "node:test";

import { toDocumentProps } from "../../src/app/(app)/projects/[projectId]/quote/quote-tab.utils.ts";

import {
    createAppearance,
    createDocumentPropsOptions,
    createQuote,
    createQuoteItem,
} from "./quote-tab-test-fixtures.ts";

// Top-level field mapping.

test("toDocumentProps passes projectName, companyName, appearance, and logoUrl through unchanged", () => {
    const appearance = createAppearance({ businessName: "Acme Plastering" });
    const options = createDocumentPropsOptions({
        projectName: "123 Example St",
        companyName: "Acme Homes",
        appearance,
        logoUrl: "https://example.test/logo.png",
    });

    const result = toDocumentProps(options);

    assert.equal(result.projectName, "123 Example St");
    assert.equal(result.companyName, "Acme Homes");
    assert.equal(result.appearance, appearance);
    assert.equal(result.logoUrl, "https://example.test/logo.png");
});

test("toDocumentProps defaults a missing quote reference to null", () => {
    const options = createDocumentPropsOptions({
        quote: createQuote({ reference: undefined }),
    });

    const result = toDocumentProps(options);

    assert.equal(result.reference, null);
});

test("toDocumentProps prefers a quote's issuedAt over its createdAt", () => {
    const options = createDocumentPropsOptions({
        quote: createQuote({
            issuedAt: "2026-02-01T00:00:00.000Z",
            createdAt: "2026-01-01T00:00:00.000Z",
        }),
    });

    const result = toDocumentProps(options);

    assert.equal(result.issuedAt, "2026-02-01T00:00:00.000Z");
});

test("toDocumentProps falls back to createdAt when issuedAt is missing", () => {
    const options = createDocumentPropsOptions({
        quote: createQuote({
            issuedAt: undefined,
            createdAt: "2026-01-01T00:00:00.000Z",
        }),
    });

    const result = toDocumentProps(options);

    assert.equal(result.issuedAt, "2026-01-01T00:00:00.000Z");
});

test("toDocumentProps trims scopeOfWorkText", () => {
    const options = createDocumentPropsOptions({
        scopeOfWorkText: "  Skim coat throughout.  ",
    });

    const result = toDocumentProps(options);

    assert.equal(result.scopeOfWorkText, "Skim coat throughout.");
});

test("toDocumentProps collapses a whitespace-only scopeOfWorkText to undefined", () => {
    const options = createDocumentPropsOptions({ scopeOfWorkText: "   " });

    const result = toDocumentProps(options);

    assert.equal(result.scopeOfWorkText, undefined);
});

test("toDocumentProps leaves a missing scopeOfWorkText as undefined", () => {
    const optionsWithUndefined = createDocumentPropsOptions({
        scopeOfWorkText: undefined,
    });
    const optionsWithNull = createDocumentPropsOptions({
        scopeOfWorkText: null,
    });

    assert.equal(
        toDocumentProps(optionsWithUndefined).scopeOfWorkText,
        undefined,
    );
    assert.equal(toDocumentProps(optionsWithNull).scopeOfWorkText, undefined);
});

// Line item mapping.

test("toDocumentProps maps a measured item's quantitySource, defaulting a missing plaster type to null", () => {
    const options = createDocumentPropsOptions({
        quote: createQuote({
            items: [
                createQuoteItem({
                    id: "item-1",
                    quantitySource: {
                        id: "source-1",
                        measurementSource: "WALL_AREA",
                    },
                }),
            ],
        }),
    });

    const result = toDocumentProps(options);

    assert.deepEqual(result.lineItems[0]?.quantitySource, {
        measurementSource: "WALL_AREA",
        measurementPlasterType: null,
    });
});

test("toDocumentProps maps a manually-entered item's quantitySource to null", () => {
    const options = createDocumentPropsOptions({
        quote: createQuote({
            items: [
                createQuoteItem({ id: "item-1", quantitySource: undefined }),
            ],
        }),
    });

    const result = toDocumentProps(options);

    assert.equal(result.lineItems[0]?.quantitySource, null);
});
