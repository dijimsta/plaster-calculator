export type EditableQuoteLineItem = {
    readonly id?: string;
    readonly name: string;
    readonly quantity: number;
    readonly unit: string | null;
    readonly unitPriceCents: number;
};

export type EditableQuoteFormValues = {
    readonly reference: string;
    readonly lineItems: readonly EditableQuoteLineItem[];
};
