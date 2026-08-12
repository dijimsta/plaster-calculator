import assert from "node:assert/strict";
import test from "node:test";

import { QuoteItemKeywordMatcherUtils } from "../../src/index.ts";
import type { QuoteItemKeywordMatchable } from "../../src/index.ts";

function template(
    overrides: Partial<QuoteItemKeywordMatchable>,
): QuoteItemKeywordMatchable {
    return {
        hasKeywords: true,
        keywords: [],
        ...overrides,
    };
}

test("an unconditional template (hasKeywords: false) always matches without searching", () => {
    const result = QuoteItemKeywordMatcherUtils.match(
        template({ hasKeywords: false, keywords: ["raised ceiling"] }),
        "this text is completely irrelevant",
    );
    assert.deepEqual(result, { matches: true, matchedKeywords: [] });
});

test("a keyword-conditional template with no keywords never matches", () => {
    const result = QuoteItemKeywordMatcherUtils.match(
        template({ hasKeywords: true, keywords: [] }),
        "raised ceiling throughout",
    );
    assert.deepEqual(result, { matches: false, matchedKeywords: [] });
});

test("matches a single-word keyword present in the text", () => {
    const result = QuoteItemKeywordMatcherUtils.match(
        template({ keywords: ["insulation"] }),
        "Supply and install R2.5 insulation batts to all external walls.",
    );
    assert.deepEqual(result, {
        matches: true,
        matchedKeywords: ["insulation"],
    });
});

test("matching is case-insensitive", () => {
    const result = QuoteItemKeywordMatcherUtils.match(
        template({ keywords: ["Raised Ceiling"] }),
        "Client has requested a RAISED CEILING in the living room.",
    );
    assert.deepEqual(result, {
        matches: true,
        matchedKeywords: ["Raised Ceiling"],
    });
});

test("matching tolerates multiple spaces, tabs, and newlines between a phrase's words", () => {
    const result = QuoteItemKeywordMatcherUtils.match(
        template({ keywords: ["raised ceiling"] }),
        "the client wants a raised  \t\n  ceiling in the lounge",
    );
    assert.deepEqual(result, {
        matches: true,
        matchedKeywords: ["raised ceiling"],
    });
});

test("a multi-word keyword matches as an adjacent, in-order phrase", () => {
    const result = QuoteItemKeywordMatcherUtils.match(
        template({ keywords: ["raised ceiling"] }),
        "specification calls for a raised ceiling over the kitchen island",
    );
    assert.deepEqual(result, {
        matches: true,
        matchedKeywords: ["raised ceiling"],
    });
});

test("near-miss: the phrase's words present but in separate sentences do not match", () => {
    // "ceiling" and "raised" both appear, but never adjacent/in order, so
    // this must not match "raised ceiling" as a phrase.
    const result = QuoteItemKeywordMatcherUtils.match(
        template({ keywords: ["raised ceiling"] }),
        "The ceiling in the hallway is standard height. Budget should be raised for the extension.",
    );
    assert.deepEqual(result, { matches: false, matchedKeywords: [] });
});

test("near-miss: a keyword's word embedded inside a longer word does not match (word-boundary matching)", () => {
    // "unraised" contains the letters "raised" but is not the whole word
    // "raised", so this must not match "raised ceiling".
    const result = QuoteItemKeywordMatcherUtils.match(
        template({ keywords: ["raised ceiling"] }),
        "the plan shows an unraised ceiling throughout",
    );
    assert.deepEqual(result, { matches: false, matchedKeywords: [] });
});

test("returns every keyword that hit, not just the first, in template order", () => {
    const result = QuoteItemKeywordMatcherUtils.match(
        template({ keywords: ["scaffold", "raised ceiling", "skylight"] }),
        "Scaffold required. Client also wants a raised ceiling.",
    );
    assert.deepEqual(result, {
        matches: true,
        matchedKeywords: ["scaffold", "raised ceiling"],
    });
});

test("does not match when none of the keywords are present", () => {
    const result = QuoteItemKeywordMatcherUtils.match(
        template({ keywords: ["skylight", "raised ceiling"] }),
        "standard flat ceiling, no special requirements",
    );
    assert.deepEqual(result, { matches: false, matchedKeywords: [] });
});
