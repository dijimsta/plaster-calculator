import { quoteAppearancePanel } from "./en/quote-appearance-panel.ts";
import {
    readinessCheckList,
    readinessFixControls,
    readinessSummaryHeader,
} from "./en/readiness.ts";

export const en = Object.freeze({
    common: Object.freeze({
        cancel: "Cancel",
    }),
    quoteUnitInput: Object.freeze({
        label: "Unit",
        selectUnit: "Select unit",
        unrecognizedUnit: "{{unit}} (not a standard unit)",
    }),
    quotesPage: Object.freeze({
        description:
            "All quotes generated from your projects, once pricing is set up.",
        emptyStateTitle: "No quotes yet",
        emptyStateDescription:
            "Quotes are generated from a project once pricing is set up.",
        loading: "Loading quotes…",
        unableToLoad: "Unable to load quotes. Try refreshing.",
    }),
    quoteDetailPage: Object.freeze({
        breadcrumb: "Quote",
        downloadPdf: "Download PDF",
        markAsSent: "Mark as sent",
        markAccepted: "Mark accepted",
        loading: "Loading quote…",
        notFoundTitle: "Quote not found",
        notFoundDescription:
            "This quote doesn't exist or you don't have access to it.",
    }),
    editableQuoteForm: Object.freeze({
        quoteDetailsTitle: "Quote details",
        quoteDetailsDescription:
            "This quote is an independent copy. Changes here won't alter the template.",
        referenceLabel: "Quote reference",
        lineItemsTitle: "Line items",
        lineItemsDescription:
            "Edit descriptions, quantities and prices, or add and remove items.",
        addItem: "Add item",
        removeItem: "Remove item {{number}}",
        save: "Save quote",
        saving: "Saving…",
        edit: "Edit quote",
        saveSuccessTitle: "Quote saved",
        saveSuccessDescription: "Your quote changes are now up to date.",
        saveErrorTitle: "Couldn't save quote",
        saveErrorDescription:
            "Some changes may not have been saved. Review the refreshed quote and try again.",
    }),
    quoteStatusBadge: Object.freeze({
        draft: "Draft",
        sent: "Sent",
        accepted: "Accepted",
    }),
    quoteDetailDocument: Object.freeze({
        title: "QUOTE",
        noReference: "No reference",
        noCompany: "No company",
        manualLineItem: "Manually entered",
        lineItemsLabel: "Line items",
        columnItem: "Item",
        columnQuantity: "Qty",
        columnUnitPrice: "Unit price",
        columnAmount: "Amount",
        logoAlt: "Company logo",
        abnLabel: "ABN {{abn}}",
        licenceLabel: "Licence {{licenceNumber}}",
        validUntil: "Valid until {{date}}",
        scopeOfWorkTitle: "Scope of work",
        takeoffSummaryTitle: "Take-off summary",
        termsTitle: "Terms",
        lumpSumDescription: "Plastering works — as quoted",
        signatureBlockTitle: "Acceptance",
        signatureBlockDescription:
            "By signing below, you accept this quote and its terms.",
        signatureLabel: "Signature",
        printedNameLabel: "Printed name",
        dateLabel: "Date",
    }),
    quoteLineItemsTable: Object.freeze({
        tableLabel: "Line items",
        columnItem: "Item",
        columnQuantity: "Quantity",
        columnUnitPrice: "Unit price",
        columnAmount: "Amount",
        provenanceFromSource: "From {{source}}",
        provenanceFromSourceWithPlasterType:
            "From {{source}} — {{plasterType}}",
        provenanceMatchedKeywords: "Matched {{keywords}}",
        includedByDefault: "Included by default",
        unknownProvenance: "Provenance unknown",
    }),
    quoteTotalsBlock: Object.freeze({
        subtotal: "Subtotal",
        gst: "GST (10%)",
        totalIncGst: "Total inc. GST",
    }),
    generateQuote: Object.freeze({
        pending: "Generating quote…",
        errorMessages: Object.freeze({
            NOT_READY:
                "This plan isn't ready to quote. Resolve the checks below and try again.",
            NO_ITEMS:
                "No billable items were found. Check the plan measurements and quote template, then try again.",
            TOO_MANY_ITEMS:
                "This quote has too many items to generate. Reduce the number of priced items and try again.",
        }),
        genericError: "Couldn't generate the quote. Try again.",
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
        loading: "Loading quote template...",
        saveSuccessTitle: "Quote template saved",
        saveSuccessDescription: "Your changes have been saved.",
        saveErrorTitle: "Couldn't save quote template",
        saveErrorDescription:
            "Something went wrong while saving. Please try again.",
    }),
    quoteAppearancePanel,
    quoteTemplateForm: Object.freeze({
        defaultItemsTitle: "Default items",
        defaultItemsDescription:
            "Built-in items included on every quote. Adjust the price for your team.",
        customItemsTitle: "Custom items",
        customItemsDescription:
            "Add your own items and choose when they're included on a quote.",
        priceLabel: "Price",
        unitLabel: "Unit",
        unitNotSet: "Not set",
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
    }),
    quoteTemplateList: Object.freeze({
        defaultBadge: "Default",
        deleteAction: "Delete {{name}}",
        addVariation: "New variation",
        nameLabel: "Template name",
        createDialogTitle: "New quote template variation",
        createSubmit: "Create",
        savingAction: "Saving...",
        deleteDialogTitle: 'Delete "{{name}}"?',
        deleteDialogDescription:
            'This can\'t be undone. Any company assigned to "{{name}}" will fall back to the default template.',
        deleteSubmit: "Delete",
        deletingAction: "Deleting...",
        createErrorTitle: "Couldn't create variation",
        createErrorDescription:
            "Something went wrong while creating the variation. Try again.",
        renameErrorTitle: "Couldn't rename template",
        renameErrorDescription:
            "Something went wrong while renaming. Try again.",
        deleteErrorTitle: "Couldn't delete template",
        deleteErrorDescription:
            "Something went wrong while deleting. Try again.",
        addedItemNoticeTitle: "{{items}} added to the default template",
        addedItemNoticeDescription:
            "Every variation will pick this up at the default price the next time it's opened. Open a variation below to re-price it there if it needs something different.",
        openVariationToReprice: "Open {{name}} to re-price",
    }),
    quoteTemplateVariationEditor: Object.freeze({
        itemsTableLabel: "Variation items",
        rateDeltaSame: "Same as default",
        rateDeltaIncrease: "+{{amount}} vs default",
        rateDeltaDecrease: "−{{amount}} vs default",
        saveSuccessTitle: "Variation saved",
        saveSuccessDescription: "Your price changes have been saved.",
        saveErrorTitle: "Couldn't save variation",
        saveErrorDescription:
            "Something went wrong while saving. Please try again.",
        appliesToTitle: "Applies to",
        appliesToDescription:
            "Companies priced with this variation instead of the default.",
        loadingCompanies: "Loading companies...",
        noCompaniesAssigned: "No companies assigned yet.",
        addCompany: "Add company",
        companyColumn: "Company",
        addCompanyAction: "Add",
        addCompanyDialogTitle: "Add a company to {{name}}",
        noCompaniesToAdd: "There are no other companies on your team.",
        currentlyOnTemplate: "Currently on {{template}}",
        unnamedTemplateFallback: "another template",
        moveCompanyDialogTitle: "Move {{name}}?",
        moveCompanyDialogDescription:
            '{{company}} is currently priced with "{{fromTemplate}}". Adding it here will move it to "{{toTemplate}}" instead.',
        moveCompanyConfirm: "Move company",
        movingCompanyAction: "Moving...",
    }),
    quoteTemplateCard: Object.freeze({
        wallsRate: "Walls {{price}}/{{unit}}",
        percentDeltaIncrease: "+{{amount}} vs default",
        percentDeltaDecrease: "−{{amount}} vs default",
        defaultAppliesTo_one:
            "Fallback for {{count}} company with no variation of their own",
        defaultAppliesTo_other:
            "Fallback for {{count}} companies with no variation of their own",
        defaultAppliesToDescription:
            "Every company without a variation of their own is quoted on these rates.",
        noFallbackCompanies: "No companies are on this template yet.",
        newVariationDescription: "Starts as a copy of the default",
        teamDefaultTemplate: "Team default template",
        setAsTeamDefault: "Set as team default",
        setAsDefaultErrorTitle: "Couldn't set as default",
        setAsDefaultErrorDescription:
            "Something went wrong while updating the team default. Try again.",
    }),
    systemItemDescriptions: Object.freeze({
        PLASTERBOARD_10MM: "Wall run — standard board",
        PLASTERBOARD_13MM: "Wall run — heavy-duty board",
        VILLABOARD_9MM: "Wall run — wet areas",
        VILLABOARD_6MM: "Wall run — wet areas, light duty",
        ACOUSTIC_SOUNDCHEK_10MM: "Wall run — acoustic rated",
        ACOUSTIC_SOUNDCHEK_13MM: "Wall run — acoustic rated, heavy-duty",
        WATER_RESISTANT_10MM: "Wall run — water resistant",
        WATER_RESISTANT_13MM: "Wall run — water resistant, heavy-duty",
        FIRE_RESISTANT_DRY_13MM: "Wall run — fire rated, dry areas",
        FIRE_RESISTANT_DRY_16MM: "Wall run — fire rated, dry areas, heavy-duty",
        FIRE_RESISTANT_WET_13MM: "Wall run — fire rated, wet areas",
        FIRE_RESISTANT_WET_16MM: "Wall run — fire rated, wet areas, heavy-duty",
        FLEXIBLE_BOARD_6_5MM: "Wall run — curved surfaces",
    }),
    projectQuoteReadinessPage: Object.freeze({
        unableToLoadProject: "Unable to load project",
        loadingReadiness: "Checking quote readiness…",
        unableToLoadReadiness:
            "Unable to load quote readiness. Try refreshing.",
        unableToLoadQuote: "Unable to load the quote. Try refreshing.",
    }),
    readinessSummaryHeader,
    readinessCheckList,
    readinessFixControls,
});
