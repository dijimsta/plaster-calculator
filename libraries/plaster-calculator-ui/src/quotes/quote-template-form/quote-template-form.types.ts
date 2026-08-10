export type QuoteItemSystemKey =
    | "PLASTERBOARD_10MM_WALLS"
    | "VILLABOARD_6MM_WET_WALLS"
    | "PLASTERBOARD_10MM_CEILINGS"
    | "COVE_CORNICE_90MM"
    | "FC_SHEET_15MM_WET_FLOORS"
    | "EZY_JAMB_DOOR_SETS";

export type QuoteTemplateFormValues = {
    readonly defaultItems: readonly {
        readonly itemTemplateId: string;
        readonly systemKey: QuoteItemSystemKey;
        readonly name: string;
        readonly unitPriceCents: number;
    }[];
    readonly customItems: readonly {
        readonly itemTemplateId?: string;
        readonly name: string;
        readonly hasKeywords: boolean;
        readonly enabled: boolean;
        readonly keywords: readonly string[];
        readonly unitPriceCents: number;
    }[];
};
