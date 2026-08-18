/**
 * The `QuoteItemTemplate` fields `match()` (`quote-item-keyword-matcher.
 * utils.ts`) needs. This package has no dependency on the generated Data
 * Connect SDK
 * (see `ReadinessQuoteItemTemplateConfig` in `../readiness/readiness-check.
 * types.ts` for the same rationale elsewhere in this package), so this is a
 * minimal local shape rather than `QuoteItemTemplate` (`data/schemas/quotes.
 * gql`) itself — callers map their Data Connect query results onto it.
 */
export type QuoteItemKeywordMatchable = {
    readonly hasKeywords: boolean;
    readonly keywords: readonly string[];
};

/**
 * The outcome of matching one `QuoteItemTemplate` against a project's plan
 * text. `matches` says whether the template belongs on the generated quote
 * (always `true` for an unconditional, `hasKeywords: false` template);
 * `matchedKeywords` is the subset of `QuoteItemKeywordMatchable.keywords`
 * that actually hit, in the order they appear in `keywords` — this is what
 * `QuoteItem.matchedKeywords` (`data/schemas/quotes.gql`) is filled from,
 * and what lets a generated quote explain itself later (e.g. "scaffold
 * hire — matched 'raised ceiling'"). Empty for an unconditional template,
 * since there is nothing to match.
 */
export type QuoteItemKeywordMatchResult = {
    readonly matches: boolean;
    readonly matchedKeywords: readonly string[];
};

/**
 * One `FloorplanPage`'s contribution to a project's searchable plan text.
 * Mirrors `FloorplanPage.ocrTextContent` (`data/schemas/projects.gql`)
 * rather than reusing `FloorplanPage` from `../projects/schemas/index.ts`
 * directly, since that schema (mirroring the UI's needs) has no
 * `ocrTextContent` field of its own and callers otherwise only need this
 * one field to build the corpus.
 */
export type ProjectPlanTextPage = {
    readonly ocrTextContent: string | null;
};

/**
 * The `Project`/`FloorplanPage` fields `buildSearchableCorpus()`
 * (`project-plan-text.utils.ts`) needs. `extractedTextJson` mirrors `Project.
 * extractedTextJson` (`data/schemas/projects.gql`): a JSON-encoded array of
 * per-page `{ text: string }` objects (see `flattenExtractedText()` in
 * `functions/plaster-calculator-functions/src/questionnaire-ai.ts` for the
 * existing reader of this same shape), not plain text — hence parsing it is
 * this utility's job rather than the caller's.
 */
export type ProjectPlanTextSource = {
    readonly extractedTextJson: string | null;
    readonly pages: readonly ProjectPlanTextPage[];
};
