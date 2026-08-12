import type { Overlay } from "../geometry/schemas/index.ts";

/**
 * One floorplan page's inputs to `TakeoffRollupUtils.rollup()` — the same
 * three per-page values `QuantityTakeoffCalculatorUtils.computeQuantities()`
 * already takes (`overlay`, `scaleMmPerPx`, `pageHeightMm`), plus `pageId`
 * for provenance. Mirrors `FloorplanPage` (`data/schemas/projects.gql`:
 * `id`, `scaleMmPerPx`, `ceilingHeightMm`) rather than reusing that type
 * directly, for two reasons: `overlay` here is the already-parsed `Overlay`
 * that `computeQuantities()` expects, not `FloorplanPage.overlay`'s raw JSON
 * string (parsing it is the caller's job, the same boundary
 * `ReadinessCheckUtils.parseOverlayAreas()` draws for the readiness gate);
 * and `pageHeightMm` is named for what it means to the calculator rather
 * than mirroring the schema's `ceilingHeightMm` column name.
 */
export type PageTakeoffInput = {
    readonly pageId: string;
    readonly overlay: Overlay;
    readonly scaleMmPerPx: number | null;
    readonly pageHeightMm: number | null;
};

/**
 * One quantity summed across every contributing page, paired back to the
 * `QuantitySourceDefinition` it was computed for (by `id`) the same way
 * `QuantityTakeoffResult` is. `contributingPageIds` lists every page that
 * fed into `quantity` — i.e. every `PageTakeoffInput` `TakeoffRollupUtils.
 * rollup()` did not skip (see its class doc for the skip conditions) — so a
 * `QuoteItem` built from this result can later say where its quantity came
 * from. The list is the same for every `TakeoffRollupResult` in one
 * `rollup()` call, because every quantity source is computed from the same
 * set of contributing pages.
 */
export type TakeoffRollupResult = {
    readonly quantitySourceId: string;
    readonly measurementSource: string;
    readonly measurementPlasterType: string | null;
    readonly quantity: number;
    readonly contributingPageIds: readonly string[];
};
