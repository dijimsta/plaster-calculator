import type {
    QuoteItemKeywordMatchable,
    QuoteItemKeywordMatchResult,
} from "./keyword-match.types.ts";

/**
 * Decides whether a keyword-conditional `QuoteItemTemplate` belongs on a
 * generated quote, by matching its `keywords` against a project's plan
 * text (see `buildSearchableCorpus()` in `project-plan-text.utils.ts` for
 * how a caller builds that text out of `Project.extractedTextJson` and the
 * project's pages' `ocrTextContent`).
 *
 * Matching rules, chosen to make "matched 'raised ceiling'" a trustworthy
 * provenance string on a generated quote rather than a loose guess:
 * - Case-insensitive.
 * - Whitespace-tolerant: a multi-word keyword's words may be separated by
 *   any run of whitespace in the source text (multiple spaces, tabs,
 *   newlines), not just a single space.
 * - Multi-word keywords match as a *phrase* — their words must appear
 *   adjacent and in order in the source text, not merely all present
 *   somewhere in it. "raised ceiling" does not match text where "ceiling"
 *   and "raised" appear in unrelated sentences.
 * - Word-boundary matching: a keyword only matches whole words, not
 *   substrings of a longer word. "raised ceiling" does not match "unraised
 *   ceiling" — "raised" is not a whole word there. This trades off missing
 *   a hypothetical desired match inside a compound word (rare in plan/OCR
 *   text) for not falsely matching "raised" inside "unraised", which would
 *   otherwise misrepresent what was actually found in the plan.
 */

/**
 * `template.hasKeywords === false` means the template is unconditional
 * — it always belongs on the quote, and there is nothing to match — so
 * this short-circuits without searching `searchText` at all, returning
 * `matches: true` and an empty `matchedKeywords`.
 *
 * Otherwise, matches every one of `template.keywords` against
 * `searchText` independently; `matches` is `true` when at least one
 * keyword hit, and `matchedKeywords` lists every keyword that did (in
 * `template.keywords` order), for `QuoteItem.matchedKeywords`
 * provenance.
 */
export function match(
    template: QuoteItemKeywordMatchable,
    searchText: string,
): QuoteItemKeywordMatchResult {
    if (!template.hasKeywords) {
        return { matches: true, matchedKeywords: [] };
    }

    const matchedKeywords = template.keywords.filter((keyword) =>
        phraseMatches(keyword, searchText),
    );

    return { matches: matchedKeywords.length > 0, matchedKeywords };
}

/** Whether `keyword` appears as a whole-word, in-order phrase in `text`. */
function phraseMatches(keyword: string, text: string): boolean {
    const pattern = buildPhrasePattern(keyword);
    return pattern !== null && pattern.test(text);
}

/**
 * Builds a case-insensitive regex matching `keyword`'s words, in order,
 * separated by one or more whitespace characters in the source text,
 * bounded by `\b` at the phrase's start and end so it only matches
 * whole words. Returns `null` for a keyword with no words (empty or
 * all-whitespace) — treated as never matching rather than matching
 * everything.
 */
function buildPhrasePattern(keyword: string): RegExp | null {
    const words = keyword
        .trim()
        .split(/\s+/)
        .filter((word) => word.length > 0);
    if (words.length === 0) return null;

    const escapedWords = words.map((word) => escapeRegExp(word));
    return new RegExp(`\\b${escapedWords.join("\\s+")}\\b`, "i");
}

/** Escapes regex metacharacters so `value` matches only itself literally. */
function escapeRegExp(value: string): string {
    return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
