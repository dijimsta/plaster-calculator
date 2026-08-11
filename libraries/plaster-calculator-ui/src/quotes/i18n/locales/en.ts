export const en = Object.freeze({
    common: Object.freeze({
        cancel: "Cancel",
    }),
    quoteTemplatePanel: Object.freeze({
        title: "Quote template",
        description:
            "Adjust the default item prices and add custom items that should appear on every quote.",
        loading: "Loading quote template...",
        saveSuccessTitle: "Quote template saved",
        saveSuccessDescription: "Your changes have been saved.",
        saveErrorTitle: "Couldn't save quote template",
        saveErrorDescription:
            "Something went wrong while saving. Please try again.",
    }),
    quoteTemplateForm: Object.freeze({
        defaultItemsTitle: "Default items",
        defaultItemsDescription:
            "Built-in items included on every quote. Adjust the price for your team.",
        customItemsTitle: "Custom items",
        customItemsDescription:
            "Add your own items and choose when they're included on a quote.",
        priceLabel: "Price",
        itemNameLabel: "Item name",
        includeOnQuotesLabel: "Include on quotes",
        includeWhenKeywordsMatch: "Include when keywords match",
        includeByDefault: "Include by default",
        dontIncludeByDefault: "Don't include by default",
        keywordsLabel: "Keywords",
        keywordsPlaceholder: "Separate keywords with commas",
        addItem: "Add item",
        removeItem: "Remove item {{number}}",
        saveChanges: "Save changes",
        saving: "Saving...",
        quantitySourceDescription: Object.freeze({
            PLASTERBOARD_10MM_WALLS: "Measured from wall area",
            VILLABOARD_6MM_WET_WALLS: "Measured from wet-area wall area",
            PLASTERBOARD_10MM_CEILINGS: "Measured from ceiling area",
            COVE_CORNICE_90MM: "Measured from wall-ceiling junction length",
            FC_SHEET_15MM_WET_FLOORS: "Measured from wet-area floor area",
            EZY_JAMB_DOOR_SETS: "Measured from door count",
        }),
    }),
});
