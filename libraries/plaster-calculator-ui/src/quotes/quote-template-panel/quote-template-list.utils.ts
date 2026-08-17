import type * as DataConnector from "@generated/data-connector-web";

import type { QuoteTemplateItem } from "./quote-template-panel.types.ts";

/** `CreateQuoteTemplateVariation`'s (`data/connector-web/quotes.mutations.gql`) fixed slot count. */
const MAX_VARIATION_ITEMS = 20;

export class QuoteTemplateListUtils {
    /**
     * Maps up to `MAX_VARIATION_ITEMS` of the default template's items onto
     * `CreateQuoteTemplateVariation`'s fixed `includeItemN`/`itemN*` slots --
     * the same dynamic-key-building shape `buildMutationVariables()`
     * (`generate-quote.utils.ts`, `plaster-calculator-web-core`) uses for `CreateQuoteWithItems`'s
     * identically-shaped slots, for the same reason: a GraphQL mutation
     * document can't accept a variable-length list of table rows, so a
     * fixed number of aliased slots switched on by `@include` is the only
     * way to fill a variable number of them in one atomic document.
     *
     * Throws rather than truncating when `items.length` exceeds
     * `MAX_VARIATION_ITEMS`: silently dropping some of the default's items
     * from a new variation would leave that variation pricing a different
     * catalog than the default without telling anyone. In practice this
     * comfortably covers the 13 system plasterboard templates plus a team's
     * own custom items, matching `CreateQuoteTemplateVariation`'s own doc
     * comment.
     */
    public static buildVariationVariables(
        quoteTemplateId: string,
        name: string,
        items: readonly QuoteTemplateItem[],
    ): DataConnector.CreateQuoteTemplateVariationVariables {
        if (items.length > MAX_VARIATION_ITEMS) {
            throw new Error(
                `Cannot create a quote template variation with ${String(items.length)} items; CreateQuoteTemplateVariation only supports ${String(MAX_VARIATION_ITEMS)}.`,
            );
        }

        const variables: Record<string, unknown> = { quoteTemplateId, name };
        items.forEach((item, index) => {
            QuoteTemplateListUtils.assignSlot(variables, index + 1, item);
        });

        return variables as unknown as DataConnector.CreateQuoteTemplateVariationVariables;
    }

    private static assignSlot(
        variables: Record<string, unknown>,
        slot: number,
        item: QuoteTemplateItem,
    ): void {
        variables[`includeItem${String(slot)}`] = true;
        variables[`item${String(slot)}ItemTemplateId`] = item.itemTemplateId;
        variables[`item${String(slot)}Enabled`] = item.enabled;
        variables[`item${String(slot)}UnitPriceCents`] = item.unitPriceCents;
        variables[`item${String(slot)}MaterialUnitPriceCents`] =
            item.materialUnitPriceCents;
        variables[`item${String(slot)}LabourUnitPriceCents`] =
            item.labourUnitPriceCents;
    }
}
