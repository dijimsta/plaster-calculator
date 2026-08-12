import { QuantityTakeoffCalculatorUtils } from "./quantity-takeoff-calculator.utils.ts";
import type { QuantitySourceDefinition } from "./quantity-takeoff.types.ts";
import type {
    PageTakeoffInput,
    TakeoffRollupResult,
} from "./takeoff-rollup.types.ts";

/**
 * Combines every floorplan page's `QuantityTakeoffCalculatorUtils.
 * computeQuantities()` result into one quantity per `QuantitySource` for the
 * whole project. A project can have several pages, each with its own scale
 * and overlay, but one quote covers the whole project — `Quote.project` is
 * `@unique` (`data/schemas/quotes.gql`) and `QuoteItem` has no per-page
 * field, so the schema only supports a single set of summed line items, not
 * one take-off per page. Summing (rather than, say, keeping per-page totals
 * alongside the sum) is the resolved design for WORK-142.
 *
 * A page is skipped — contributes nothing to any total, and is left out of
 * `contributingPageIds` — when it has no `scaleMmPerPx` (nothing to convert
 * its overlay's px measurements into real units) or no non-deleted areas
 * (nothing to measure). This is a defensive skip, not an error path: the
 * quote readiness gate (WORK-124/PCPD-18) is what stops a page like that
 * from reaching this rollup in the first place.
 */
export class TakeoffRollupUtils {
    public static rollup(
        pages: readonly PageTakeoffInput[],
        quantitySources: readonly QuantitySourceDefinition[],
    ): TakeoffRollupResult[] {
        const contributingPages = pages.filter(
            TakeoffRollupUtils.pageContributes,
        );
        const contributingPageIds = contributingPages.map(
            (page) => page.pageId,
        );
        const perPageResults = contributingPages.map((page) =>
            QuantityTakeoffCalculatorUtils.computeQuantities(
                page.overlay,
                page.scaleMmPerPx,
                page.pageHeightMm,
                quantitySources,
            ),
        );

        return quantitySources.map((source) => ({
            quantitySourceId: source.id,
            measurementSource: source.measurementSource,
            measurementPlasterType: source.measurementPlasterType,
            quantity: perPageResults.reduce(
                (total, pageResults) =>
                    total +
                    TakeoffRollupUtils.quantityFor(pageResults, source.id),
                0,
            ),
            contributingPageIds,
        }));
    }

    /**
     * A page contributes when it has a `scaleMmPerPx` to convert its
     * overlay's px measurements into real units, and at least one
     * non-deleted area to measure. Narrows `scaleMmPerPx` to `number` so
     * `rollup()` can pass it straight to `computeQuantities()`, which
     * requires it.
     */
    private static pageContributes(
        page: PageTakeoffInput,
    ): page is PageTakeoffInput & { scaleMmPerPx: number } {
        return (
            page.scaleMmPerPx != null &&
            page.overlay.areas.some((area) => !area.deleted)
        );
    }

    private static quantityFor(
        pageResults: ReturnType<
            typeof QuantityTakeoffCalculatorUtils.computeQuantities
        >,
        quantitySourceId: string,
    ): number {
        return (
            pageResults.find(
                (result) => result.quantitySourceId === quantitySourceId,
            )?.quantity ?? 0
        );
    }
}
