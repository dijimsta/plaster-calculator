export type QuoteItemSystemKey =
    | "PLASTERBOARD_10MM"
    | "PLASTERBOARD_13MM"
    | "VILLABOARD_9MM"
    | "VILLABOARD_6MM"
    | "ACOUSTIC_SOUNDCHEK_10MM"
    | "ACOUSTIC_SOUNDCHEK_13MM"
    | "WATER_RESISTANT_10MM"
    | "WATER_RESISTANT_13MM"
    | "FIRE_RESISTANT_DRY_13MM"
    | "FIRE_RESISTANT_DRY_16MM"
    | "FIRE_RESISTANT_WET_13MM"
    | "FIRE_RESISTANT_WET_16MM"
    | "FLEXIBLE_BOARD_6_5MM";

export type QuoteTemplateFormValues = {
    readonly defaultItems: readonly {
        readonly itemTemplateId: string;
        readonly systemKey: QuoteItemSystemKey;
        readonly name: string;
        readonly unit: string;
        readonly unitPriceCents: number;
    }[];
    readonly customItems: readonly {
        readonly itemTemplateId?: string;
        readonly name: string;
        readonly unit: string;
        readonly hasKeywords: boolean;
        readonly enabled: boolean;
        readonly keywords: readonly string[];
        readonly unitPriceCents: number;
    }[];
};
