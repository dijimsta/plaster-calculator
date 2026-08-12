export const en = Object.freeze({
    common: Object.freeze({
        cancel: "Cancel",
    }),
    quotesPage: Object.freeze({
        description:
            "All quotes generated from your projects, once pricing is set up.",
        emptyStateTitle: "No quotes yet",
        emptyStateDescription:
            "Quotes are generated from a project once pricing is set up.",
    }),
    quoteStatusBadge: Object.freeze({
        draft: "Draft",
        sent: "Sent",
        accepted: "Accepted",
    }),
    quotesTable: Object.freeze({
        tableLabel: "Quotes",
        quoteCount_one: "{{count}} quote",
        quoteCount_other: "{{count}} quotes",
        columnQuote: "Quote",
        columnProject: "Project",
        columnCompany: "Company",
        columnStatus: "Status",
        columnTotal: "Total inc. GST",
        columnDate: "Date",
        downloadAction: "Download {{reference}}",
    }),
    quoteTemplatePage: Object.freeze({
        description:
            "The default items and pricing used when quotes are generated from a project.",
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
    projectQuoteReadinessPage: Object.freeze({
        unableToLoadProject: "Unable to load project",
        loadingReadiness: "Checking quote readiness…",
        unableToLoadReadiness:
            "Unable to load quote readiness. Try refreshing.",
    }),
    readinessSummaryHeader: Object.freeze({
        readyTitle: "Ready to quote",
        notReadyTitle: "Not ready to quote",
        readyDescription: "This plan is ready to quote.",
        notReadyDescription_one:
            "{{count}} check needs attention before this plan can be quoted.",
        notReadyDescription_other:
            "{{count}} checks need attention before this plan can be quoted.",
        readyBadge: "Ready",
        unmetBadge: "{{count}} unmet",
        generateQuote: "Generate quote",
        disabledReason: "Resolve the checks below to enable this.",
    }),
    readinessCheckList: Object.freeze({
        metBadge: "Met",
        unmetBadge: "{{count}} unmet",
        fixInline: "Fix this directly below.",
        fixDeepLink: "Fix this from the linked page, then come back here.",
        hideAffectedItems: "Hide affected items",
        showAffectedItems_one: "Show {{count}} affected item",
        showAffectedItems_other: "Show {{count}} affected items",
        defaultAffectedItemLocation: "This project",
        pageLocation: "Page {{pageNumber}}",
        pageLocationWithArea: "Page {{pageNumber}} — {{areaLabel}}",
        checkLabels: Object.freeze({
            SCALE_APPLIED: "Scale applied",
            ROOMS_MEASURED: "Rooms measured",
            WALL_TYPE_SET: "Wall type set",
            CEILING_HEIGHT_SET: "Ceiling height set",
            TEMPLATE_PRICED: "Template priced",
            INFERRED_ANSWERS_CONFIRMED: "Inferred answers confirmed",
            ASSUMED_WALL_TYPES_CONFIRMED: "Assumed wall types confirmed",
        }),
    }),
    readinessFixControls: Object.freeze({
        save: "Save",
        saving: "Saving…",
        confirm: "Confirm",
        confirming: "Confirming…",
        wallBoardType: Object.freeze({
            label: "Wall board type",
            labelWithArea: "Wall board type — {{area}}",
            error: "Couldn't update the wall board type. Try again.",
        }),
        ceilingHeight: Object.freeze({
            label: "Ceiling height",
            labelWithArea: "Ceiling height — {{area}}",
            error: "Couldn't update the ceiling height. Try again.",
        }),
        unitPrice: Object.freeze({
            label: "Unit price",
            labelWithTemplate: "Unit price — {{template}}",
            error: "Couldn't update the unit price. Try again.",
        }),
        confirmError: "Couldn't confirm. Try again.",
        confirmAccessibleLabelWithLocation:
            'Confirm {{label}} "{{value}}" for {{location}}',
        confirmAccessibleLabel: 'Confirm {{label}} "{{value}}"',
        floorplanDeepLink: Object.freeze({
            setScale: "Set scale",
            drawRooms: "Draw rooms",
            actionWithPage: "{{action}} on page {{pageNumber}}",
        }),
    }),
});
