/**
 * One row of `QuantitySource` (`data/schemas/quotes.gql`), as needed by
 * `computeQuantities()` (`quantity-takeoff-calculator.utils.ts`). This
 * package has no dependency on the generated Data Connect SDK — see
 * `ReadinessQuoteItemTemplateConfig`'s note in `readiness-check.types.ts`
 * for why — so this is a minimal local shape rather than the generated
 * `QuantitySource` type; callers map their Data Connect query results onto
 * it. `measurementSource`/`measurementPlasterType` are plain `string`s,
 * matching the schema's `String!`/`String` columns, rather than a literal
 * union of the seeded values — an unrecognised or newly seeded
 * `measurementSource` should quote as zero (see `quantityFor()`'s `default`
 * case in `quantity-takeoff-calculator.utils.ts`), not fail to type at the
 * boundary.
 */
export type QuantitySourceDefinition = {
    readonly id: string;
    readonly measurementSource: string;
    readonly measurementPlasterType: string | null;
};

/**
 * One computed quantity, paired back to the `QuantitySourceDefinition` it
 * was computed for (by `id`). `computeQuantities()`
 * (`quantity-takeoff-calculator.utils.ts`) returns one of these per input
 * `QuantitySourceDefinition`, in the same order, for a rollup (WORK-142) to
 * multiply against `QuoteItemTemplateConfig` pricing.
 */
export type QuantityTakeoffResult = {
    readonly quantitySourceId: string;
    readonly measurementSource: string;
    readonly measurementPlasterType: string | null;
    readonly quantity: number;
};
