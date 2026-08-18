import type { QuoteItemTemplateScope } from "@libraries/plaster-calculator-common";

/**
 * A variation's own prices-only item row: `name`/`unit`/`hasKeywords`/
 * `keywords` render read-only (the same values the default already fixed
 * for this item -- see `quote-template-variation-editor.component.tsx`'s
 * doc comment for why a variation can't diverge on anything but price), and
 * `unitPriceCents` is the only editable field. `defaultUnitPriceCents` is
 * the default template's *current* price for this same item, carried
 * alongside so the row can render a rate delta ("+$12.00" / "same as
 * default") without a second lookup at render time. `scope` splits the flat
 * `items` list into "Default items" / "Custom items" sections the same way
 * `QuoteTemplateForm` does, so both screens present the same shape.
 */
export type QuoteTemplateVariationItemFormValue = {
    readonly itemTemplateId: string;
    readonly scope: QuoteItemTemplateScope;
    readonly name: string;
    readonly unit: string;
    readonly hasKeywords: boolean;
    readonly keywords: readonly string[];
    readonly defaultUnitPriceCents: number;
    readonly unitPriceCents: number;
};

export type QuoteTemplateVariationFormValues = {
    readonly items: readonly QuoteTemplateVariationItemFormValue[];
};
