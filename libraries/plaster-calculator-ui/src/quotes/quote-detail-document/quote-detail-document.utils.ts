import { QuoteTotalsUtils } from "@libraries/plaster-calculator-common";

import type { useQuotesTranslation } from "../i18n/index.ts";

import type {
    QuoteDetailDocumentLineItem,
    QuoteDetailDocumentQuantitySource,
} from "./quote-detail-document.types.ts";

type QuotesTFunction = ReturnType<typeof useQuotesTranslation>["t"];

export type QuoteDetailDocumentTotals = {
    readonly subtotalCents: number;
    readonly gstCents: number;
    readonly totalIncGstCents: number;
};

/**
 * Pure presentation helpers for `QuoteDetailDocument`. Kept as static
 * methods rather than module-level functions so the component file only
 * imports one name.
 */
export class QuoteDetailDocumentUtils {
    /** Rolls `lineItems` up into subtotal/GST/total using `QuoteTotalsUtils`. */
    public static totals(
        lineItems: readonly QuoteDetailDocumentLineItem[],
    ): QuoteDetailDocumentTotals {
        const lineAmountsCents = lineItems.map((item) =>
            QuoteTotalsUtils.lineAmountCents(
                item.quantity,
                item.unitPriceCents,
            ),
        );
        const subtotalCents = QuoteTotalsUtils.subtotalCents(lineAmountsCents);
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

    /**
     * Describes how a line's quantity was derived, e.g.
     * "Wall area — 10mm plasterboard". `measurementSource` and
     * `measurementPlasterType` are free-text columns on the `QuantitySource`
     * table rather than a closed union this library can see, so this
     * humanizes the raw value instead of translating it through a fixed key
     * map.
     * Falls back to a translated label for a manually-entered line with no
     * recorded provenance.
     */
    public static provenanceLabel(
        quantitySource: QuoteDetailDocumentQuantitySource | null,
        t: QuotesTFunction,
    ): string {
        if (quantitySource === null) {
            return t("quoteDetailDocument.manualLineItem");
        }
        const source = QuoteDetailDocumentUtils.humanize(
            quantitySource.measurementSource,
        );
        return quantitySource.measurementPlasterType
            ? `${source} — ${QuoteDetailDocumentUtils.humanize(quantitySource.measurementPlasterType)}`
            : source;
    }

    private static humanize(value: string): string {
        return value
            .toLowerCase()
            .split("_")
            .filter(Boolean)
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ");
    }
}
