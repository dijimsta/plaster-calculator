import type { GetProjectQuoteData } from "@generated/data-connector-web";
import { QuoteTotalsUtils } from "@libraries/plaster-calculator-common";
import type {
    QuoteLineItemsTableRow,
    QuoteTotalsBlockProps,
} from "@libraries/plaster-calculator-ui";

type ProjectQuoteItem = NonNullable<
    NonNullable<GetProjectQuoteData["project"]>["quote"]
>["items"][number];

/**
 * Maps `GetProjectQuote`'s `quote.items` (WORK-145's `CreateQuoteWithItems`
 * read back, WORK-151's Quote tab) onto the presentational shapes
 * `QuoteLineItemsTable`/`QuoteTotalsBlock` (`@libraries/plaster-calculator-ui`)
 * expect. Both components are deliberately decoupled from
 * `@generated/data-connector-web` (see their own doc comments), so this
 * mapping lives here rather than in that library, matching
 * `QuoteDetailUtils`'s identical convention for `GetQuoteById` on the
 * `/quotes/[quoteId]` route.
 */
export class QuoteTabUtils {
    /**
     * One row per `QuoteItem`, carrying its quantity provenance
     * (`quantitySource`) exactly as `QuoteLineItemsTable` renders it — a
     * flat-fee, keyword-matched line has no `quantitySource` row at all, so
     * it maps to `null` rather than a partially-filled object.
     */
    public static toLineItemsTableRows(
        items: readonly ProjectQuoteItem[],
    ): readonly QuoteLineItemsTableRow[] {
        return items.map((item) => ({
            id: item.id,
            name: item.name,
            quantity: item.quantity,
            unitPriceCents: item.unitPriceCents,
            matchedKeywords: item.matchedKeywords,
            quantitySource: item.quantitySource
                ? {
                      measurementSource: item.quantitySource.measurementSource,
                      measurementPlasterType:
                          item.quantitySource.measurementPlasterType ?? null,
                  }
                : null,
        }));
    }

    /**
     * `QuoteTotalsBlock`'s `subtotalCents`/`gstCents`/`totalIncGstCents`,
     * derived from `items` via `QuoteTotalsUtils` rather than duplicating
     * that maths here — the same "callers compute, the component only
     * formats" split `QuoteTotalsBlock`'s own doc comment describes.
     */
    public static toTotals(
        items: readonly ProjectQuoteItem[],
    ): QuoteTotalsBlockProps {
        const subtotalCents = QuoteTotalsUtils.subtotalCents(
            items.map((item) =>
                QuoteTotalsUtils.lineAmountCents(
                    item.quantity,
                    item.unitPriceCents,
                ),
            ),
        );
        const gstCents = QuoteTotalsUtils.gstCents(subtotalCents);

        return {
            subtotalCents,
            gstCents,
            totalIncGstCents: QuoteTotalsUtils.totalIncGstCents(
                subtotalCents,
                gstCents,
            ),
        };
    }
}
