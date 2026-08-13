import type * as DataConnector from "@generated/data-connector-web";
import {
    QuoteStatusSchema,
    QuoteTotalsUtils,
} from "@libraries/plaster-calculator-common";
import type { QuotesTableRow } from "@libraries/plaster-calculator-ui";

export class QuotesListUtils {
    /**
     * Maps `ListQuotesForTeam` rows to `QuotesTableRow`. `totalIncGstCents`
     * isn't a stored column — each row only carries its `QuoteItem`
     * quantity/unitPriceCents pairs — so it's derived here via
     * `QuoteTotalsUtils`, the same helper `quote-detail-document` uses for
     * its own totals block.
     */
    public static toRows(
        quotes: DataConnector.ListQuotesForTeamData["quotes"] | undefined,
    ): readonly QuotesTableRow[] {
        return (quotes ?? []).map((quote) => {
            const lineAmountsCents = quote.items.map((item) =>
                QuoteTotalsUtils.lineAmountCents(
                    item.quantity,
                    item.unitPriceCents,
                ),
            );
            const subtotalCents =
                QuoteTotalsUtils.subtotalCents(lineAmountsCents);
            const gstCents = QuoteTotalsUtils.gstCents(subtotalCents);

            return {
                quoteId: quote.id,
                projectId: quote.project.id,
                reference: quote.reference ?? null,
                projectName: quote.project.name,
                companyName: quote.project.company?.companyName ?? null,
                status: QuoteStatusSchema.parse(quote.status),
                totalIncGstCents: QuoteTotalsUtils.totalIncGstCents(
                    subtotalCents,
                    gstCents,
                ),
                createdAt: quote.createdAt,
            };
        });
    }
}
