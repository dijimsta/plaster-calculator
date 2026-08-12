import type * as DataConnector from "@generated/data-connector-web";
import { QuoteStatusSchema } from "@libraries/plaster-calculator-common";
import type { QuoteDetailDocumentProps } from "@libraries/plaster-calculator-ui";

export class QuoteDetailUtils {
    /**
     * Maps `GetQuoteById`'s `quote` to `QuoteDetailDocument`'s props.
     * `issuedAt` is only stamped once a quote is actually issued (see
     * `UpdateQuoteStatus`'s notes on per-status timestamps), so a still-draft
     * quote falls back to `createdAt` rather than showing an empty document
     * date.
     */
    public static toDocumentProps(
        quote: NonNullable<DataConnector.GetQuoteByIdData["quote"]>,
    ): QuoteDetailDocumentProps {
        return {
            reference: quote.reference ?? null,
            projectName: quote.project.name,
            companyName: quote.project.company?.companyName ?? null,
            issuedAt: quote.issuedAt ?? quote.createdAt,
            status: QuoteStatusSchema.parse(quote.status),
            lineItems: quote.items.map((item) => ({
                id: item.id,
                name: item.name,
                quantity: item.quantity,
                unitPriceCents: item.unitPriceCents,
                quantitySource: item.quantitySource
                    ? {
                          measurementSource:
                              item.quantitySource.measurementSource,
                          measurementPlasterType:
                              item.quantitySource.measurementPlasterType ??
                              null,
                      }
                    : null,
            })),
        };
    }
}
