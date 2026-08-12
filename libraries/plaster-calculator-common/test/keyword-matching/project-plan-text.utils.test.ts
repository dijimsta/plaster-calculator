import assert from "node:assert/strict";
import test from "node:test";

import {
    ProjectPlanTextCorpusUtils,
    QuoteItemKeywordMatcherUtils,
} from "../../src/index.ts";

test("builds a corpus from extractedTextJson pages and OCR pages", () => {
    const corpus = ProjectPlanTextCorpusUtils.buildSearchableCorpus({
        extractedTextJson: JSON.stringify([
            { pageNumber: 1, text: "Raised ceiling to living room" },
            { pageNumber: 2, text: "Scaffold hire required" },
        ]),
        pages: [
            { ocrTextContent: "Kitchen: wet area" },
            { ocrTextContent: null },
        ],
    });

    assert.equal(
        corpus,
        "Raised ceiling to living room\nScaffold hire required\nKitchen: wet area",
    );
});

test("returns an empty corpus when extractedTextJson is null and no pages have OCR text", () => {
    const corpus = ProjectPlanTextCorpusUtils.buildSearchableCorpus({
        extractedTextJson: null,
        pages: [{ ocrTextContent: null }],
    });
    assert.equal(corpus, "");
});

test("ignores malformed extractedTextJson rather than throwing", () => {
    const corpus = ProjectPlanTextCorpusUtils.buildSearchableCorpus({
        extractedTextJson: "not valid json",
        pages: [{ ocrTextContent: "Bathroom: raised ceiling" }],
    });
    assert.equal(corpus, "Bathroom: raised ceiling");
});

test("skips extractedTextJson pages with empty or missing text", () => {
    const corpus = ProjectPlanTextCorpusUtils.buildSearchableCorpus({
        extractedTextJson: JSON.stringify([
            { pageNumber: 1, text: "" },
            { pageNumber: 2 },
            { pageNumber: 3, text: "Skylight to hallway" },
        ]),
        pages: [],
    });
    assert.equal(corpus, "Skylight to hallway");
});

test("feeds directly into QuoteItemKeywordMatcherUtils.match()", () => {
    const corpus = ProjectPlanTextCorpusUtils.buildSearchableCorpus({
        extractedTextJson: JSON.stringify([
            { pageNumber: 1, text: "Client requires a raised   ceiling" },
        ]),
        pages: [{ ocrTextContent: "Scaffold hire noted" }],
    });

    const result = QuoteItemKeywordMatcherUtils.match(
        { hasKeywords: true, keywords: ["raised ceiling", "scaffold"] },
        corpus,
    );
    assert.deepEqual(result, {
        matches: true,
        matchedKeywords: ["raised ceiling", "scaffold"],
    });
});
