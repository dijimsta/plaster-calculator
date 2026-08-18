// Split out of `../en.ts` for the same reason as `../en/quote-appearance-panel.ts`
// -- see that file's doc comment. Three top-level exports (rather than one,
// like `quoteAppearancePanel`) because the readiness gate's copy is already
// split across three separate `t()` namespaces -- `ReadinessSummaryHeader`,
// `ReadinessCheckList`, and its fix controls -- so splitting the file this
// way changes no key.
export const readinessSummaryHeader = Object.freeze({
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
});

export const readinessCheckList = Object.freeze({
    metBadge: "Met",
    unmetBadge: "{{count}} unmet",
    showCompletedChecks: "Show completed checks ({{count}})",
    hideCompletedChecks: "Hide completed checks",
    fixInline: "Fix this directly below.",
    fixDeepLink: "Fix this from the linked page, then come back here.",
    hideAffectedItems: "Hide affected items",
    showAffectedItems_one: "Show {{count}} affected item",
    showAffectedItems_other: "Show {{count}} affected items",
    defaultAffectedItemLocation: "This project",
    pageLocation: "Page {{pageNumber}}",
    pageLocationWithArea: "Page {{pageNumber}} — {{areaLabel}}",
    companyLocation: "{{companyName}}",
    checkLabels: Object.freeze({
        SCALE_APPLIED: "Scale applied",
        ROOMS_MEASURED: "Rooms measured",
        WALL_TYPE_SET: "Wall type set",
        CEILING_HEIGHT_SET: "Ceiling height set",
        TEMPLATE_HAS_ENABLED_ITEMS: "Quote template has enabled items",
        TEMPLATE_PRICED: "Template priced",
        TEMPLATE_UNIT_SET: "Template units set",
        INFERRED_ANSWERS_CONFIRMED: "Inferred answers confirmed",
        ASSUMED_WALL_TYPES_CONFIRMED: "Assumed wall types confirmed",
        COMPANY_CONTACT_DETAILS: "Company contact details added",
    }),
});

export const readinessFixControls = Object.freeze({
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
        suggestion:
            "Suggested ceiling height: {{height}} mm. Review and save to apply it.",
        error: "Couldn't update the ceiling height. Try again.",
    }),
    unitPrice: Object.freeze({
        label: "Unit price",
        labelWithTemplate: "Unit price — {{template}}",
        error: "Couldn't update the unit price. Try again.",
        saveAll_one: "Save {{count}} price",
        saveAll_other: "Save {{count}} prices",
    }),
    confirmError: "Couldn't confirm. Try again.",
    setTemplateUnits: "Set template units",
    manageQuoteItems: "Manage quote items",
    confirmAccessibleLabelWithLocation:
        'Confirm {{label}} "{{value}}" for {{location}}',
    confirmAccessibleLabel: 'Confirm {{label}} "{{value}}"',
    floorplanDeepLink: Object.freeze({
        setScale: "Set scale",
        drawRooms: "Draw rooms",
        actionWithPage: "{{action}} on page {{pageNumber}}",
    }),
    companyContactDetails: Object.freeze({
        addContactDetails: "Add contact details",
    }),
});
