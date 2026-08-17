import type { GetProjectQuoteData } from "@generated/data-connector-web";
import { resolveQuoteAppearance } from "@libraries/plaster-calculator-common";
import type {
    EditableQuoteFormValues,
    QuoteDetailDocumentProps,
} from "@libraries/plaster-calculator-ui";

type ProjectQuote = NonNullable<
    NonNullable<GetProjectQuoteData["project"]>["quote"]
>;

/**
 * Maps the project's generated quote onto the complete printable document.
 * Project display fields come from the project page's existing detail read,
 * while pricing and status come from `GetProjectQuote`.
 */
export class QuoteTabUtils {
    public static toEditableValues(
        quote: ProjectQuote,
    ): EditableQuoteFormValues {
        return {
            reference: quote.reference ?? "",
            lineItems: quote.items.map((item) => ({
                id: item.id,
                name: item.name,
                quantity: item.quantity,
                unit: item.unit ?? null,
                unitPriceCents: item.unitPriceCents,
            })),
        };
    }

    public static toDocumentProps(
        quote: ProjectQuote,
        projectName: string,
        companyName: string | null,
    ): QuoteDetailDocumentProps {
        return {
            reference: quote.reference ?? null,
            projectName,
            companyName,
            issuedAt: quote.issuedAt ?? quote.createdAt,
            // Placeholder: `QuoteAppearance` isn't threaded through this
            // call site yet (that's WORK-205/206's job) -- defaulting keeps
            // this branch compiling standalone with the team's real
            // letterhead settings applied once those tickets wire it up.
            appearance: resolveQuoteAppearance(undefined),
            lineItems: quote.items.map((item) => ({
                id: item.id,
                name: item.name,
                quantity: item.quantity,
                unit: item.unit ?? null,
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
