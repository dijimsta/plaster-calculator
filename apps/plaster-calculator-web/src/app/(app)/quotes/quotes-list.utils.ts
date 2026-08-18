import type * as DataConnector from "@generated/data-connector-web";
import {
    gstCents as computeGstCents,
    lineAmountCents,
    QuoteStatusSchema,
    subtotalCents as computeSubtotalCents,
    totalIncGstCents,
} from "@libraries/plaster-calculator-common";
import type { QuotesTableRow } from "@libraries/plaster-calculator-ui";

/**
 * Maps `ListQuotesForTeam` rows to `QuotesTableRow`. `totalIncGstCents`
 * isn't a stored column — each row only carries its `QuoteItem`
 * quantity/unitPriceCents pairs — so it's derived here via the
 * quote-totals helpers (`quote-totals.utils.ts`), the same helpers
 * `quote-detail-document` uses for its own totals block.
 */
export function toRows(
    quotes: DataConnector.ListQuotesForTeamData["quotes"] | undefined,
): readonly QuotesTableRow[] {
    return (quotes ?? []).map((quote) => {
        const lineAmountsCents = quote.items.map((item) =>
            lineAmountCents(item.quantity, item.unitPriceCents),
        );
        const subtotalCents = computeSubtotalCents(lineAmountsCents);
        const gstCents = computeGstCents(subtotalCents);

        return {
            quoteId: quote.id,
            projectId: quote.project.id,
            reference: quote.reference ?? null,
            projectName: quote.project.name,
            companyName: quote.project.company?.companyName ?? null,
            status: QuoteStatusSchema.parse(quote.status),
            totalIncGstCents: totalIncGstCents(subtotalCents, gstCents),
            createdAt: quote.createdAt,
        };
    });
}
