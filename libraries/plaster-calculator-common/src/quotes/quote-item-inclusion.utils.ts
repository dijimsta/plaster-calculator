/**
 * The one field `resolveInclusion()` needs from the `QuoteTemplate`
 * variation actually pricing a quote's side of the pairing — its
 * `QuoteItemTemplateConfig` row (`data/schemas/quotes.gql`) for one
 * `QuoteItemTemplate`. Generic (rather than the full row shape) so callers
 * can pass whatever richer type they already have — e.g. a `Readiness
 * QuoteItemTemplateConfig` (`../readiness/readiness-check.types.ts`) — and
 * get it back with `enabled` resolved onto it.
 */
export type QuoteItemVariationPricingConfig = {
    readonly unitPriceCents: number;
};

/**
 * The one field `resolveInclusion()` needs from the team's default
 * `QuoteTemplate`'s side of the pairing — its `QuoteItemTemplateConfig` row
 * for the same `QuoteItemTemplate`.
 */
export type QuoteItemDefaultInclusionConfig = {
    readonly enabled: boolean;
};

/**
 * Single home for "does this item go on a quote". `QuoteItemTemplateConfig`
 * (`data/schemas/quotes.gql`) is keyed per `(quoteTemplateId,
 * itemTemplateId)`, so every `QuoteTemplate` — the team's default one and
 * any variation — technically has its own `enabled` column. The design puts
 * that decision in exactly one place, the default template: a variation
 * must not be able to silently drop or add a line by carrying a different
 * `enabled` value than the default. `resolveInclusion()` is the one place
 * that rule is applied — it pairs the config actually pricing the quote
 * (`variationConfig`, which supplies `unitPriceCents` and anything else on
 * `T`) with `defaultTemplateConfig.enabled`, and every other field
 * (`unit`, `quantitySourceId`, `label`, `quoteItemTemplateId`, …) present on
 * `variationConfig` is carried through unchanged — including its own
 * `enabled`, if it has one, which this deliberately overwrites rather than
 * reads. Callers are responsible for joining the two rows by
 * `itemTemplateId` before calling this — e.g. one call per item when
 * building a `ReadinessCheckInput.quoteItemTemplateConfigs` array for the
 * template that will actually price a quote.
 */
export function resolveInclusion<T extends QuoteItemVariationPricingConfig>(
    variationConfig: T,
    defaultTemplateConfig: QuoteItemDefaultInclusionConfig,
): T & QuoteItemDefaultInclusionConfig {
    return {
        ...variationConfig,
        enabled: defaultTemplateConfig.enabled,
    };
}
