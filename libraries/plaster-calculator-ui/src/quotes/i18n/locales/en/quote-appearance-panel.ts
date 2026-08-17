// Split out of `../en.ts` (rather than inlined there) purely to stay under
// this workspace's `max-lines` ESLint limit -- `QuoteAppearancePanel`
// (`../../../quote-appearance-panel/`) is this domain's largest settings
// panel, and its copy pushed the combined locale object over budget.
export const quoteAppearancePanel = Object.freeze({
    title: "Quote appearance",
    description:
        "These settings apply to every quote your team sends -- they can't be changed for an individual quote before sending. Changes here don't affect quotes already sent.",
    loading: "Loading quote appearance...",
    saveButton: "Save changes",
    saving: "Saving...",
    saveSuccessTitle: "Quote appearance saved",
    saveSuccessDescription: "Every new quote will use these settings.",
    saveErrorTitle: "Couldn't save quote appearance",
    saveErrorDescription:
        "Something went wrong while saving. Please try again.",
    previewTitle: "Preview",
    previewDescription:
        "A live preview using sample line items, updating as you change the settings on the left.",
    letterheadSectionTitle: "Letterhead",
    letterheadSectionDescription:
        "Shown at the top of every quote your team sends.",
    logoLabel: "Logo",
    logoDescriptionEmpty: "No logo uploaded. PNG or SVG, up to 5 MB.",
    logoDescriptionSaved: "Logo saved. Upload a new file to preview it here.",
    logoDescriptionUploaded: "Logo uploaded.",
    uploadingLogo: "Uploading...",
    uploadLogo: "Upload logo",
    replaceLogo: "Replace logo",
    removeLogo: "Remove logo",
    logoUploadErrorTitle: "Couldn't upload logo",
    logoUploadErrorDescription:
        "Check the file is a PNG or SVG under 5 MB, and try again.",
    logoRemoveErrorTitle: "Couldn't remove logo",
    logoRemoveErrorDescription:
        "Something went wrong while removing the logo. Try again.",
    businessNameLabel: "Business name",
    abnLabel: "ABN",
    licenceNumberLabel: "Licence number",
    addressLabel: "Address",
    phoneNumberLabel: "Phone number",
    emailLabel: "Email",
    accentColorLabel: "Accent colour",
    accentColorDescription:
        "Used for the divider under your letterhead on every quote.",
    accentColorSwatches: Object.freeze({
        gray: "Slate",
        blue: "Ocean blue",
        green: "Forest green",
        indigo: "Indigo",
        amber: "Amber",
        orange: "Burnt orange",
        red: "Brick red",
    }),
    builderSectionTitle: "What the builder sees",
    builderSectionDescription: "Applies to every quote your team sends.",
    pricingDetailLegend: "Pricing detail",
    pricingDetailDescription:
        "Choose how much pricing detail appears on every quote.",
    pricingDetailFullLineItemsLabel: "Full line items",
    pricingDetailFullLineItemsConsequence:
        "The builder sees every item, quantity, and rate.",
    pricingDetailAmountsOnlyLabel: "Amounts only",
    pricingDetailAmountsOnlyConsequence:
        "The builder sees each item's amount, but not its quantity or rate.",
    pricingDetailLumpSumLabel: "Lump sum",
    pricingDetailLumpSumConsequence:
        "The builder sees a single total, with no item breakdown.",
    showScopeOfWorkLabel: "Scope of work",
    showScopeOfWorkDescription:
        "Show a scope-of-work summary above the pricing table.",
    showTakeoffSummaryLabel: "Take-off summary",
    showTakeoffSummaryDescription: "Show a take-off summary below the totals.",
    showSignatureBlockLabel: "Acceptance signature block",
    showSignatureBlockDescription:
        "Add a signature, printed name, and date line for the builder to accept.",
    termsSectionTitle: "Terms & footer",
    termsSectionDescription: "Printed at the bottom of every quote.",
    validForDaysLabel: "Valid for (days)",
    termsLabel: "Terms",
    termsPlaceholder: "e.g. Payment due within 14 days of acceptance.",
});
