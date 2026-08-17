import {
    AMOUNTS_ONLY_PRICING_DETAIL,
    DEFAULT_QUOTE_APPEARANCE,
    LUMP_SUM_PRICING_DETAIL,
    type QuoteAppearance,
} from "@libraries/plaster-calculator-common";
import type { QuoteDetailDocumentLineItem } from "@libraries/plaster-calculator-ui";

/**
 * A normal-length set of line items — a mix of measured items (with
 * quantity provenance) and manually-entered custom items (provenance
 * `null`) — reused across the pricing-detail and optional-block stories.
 */
export const QUOTE_DETAIL_DOCUMENT_LINE_ITEMS: readonly QuoteDetailDocumentLineItem[] =
    [
        {
            id: "line-1",
            name: "10mm Plasterboard — walls",
            quantity: 142,
            unit: "m²",
            unitPriceCents: 1250,
            quantitySource: {
                measurementSource: "PLASTERBOARD_AREA",
                measurementPlasterType: "10mm Plasterboard",
            },
        },
        {
            id: "line-2",
            name: "10mm Plasterboard — ceilings",
            quantity: 96,
            unit: "m²",
            unitPriceCents: 1350,
            quantitySource: {
                measurementSource: "PLASTERBOARD_AREA",
                measurementPlasterType: "10mm Plasterboard",
            },
        },
        {
            id: "line-3",
            name: "6mm Villaboard — wet-area walls",
            quantity: 18,
            unit: "m²",
            unitPriceCents: 1890,
            quantitySource: {
                measurementSource: "PLASTERBOARD_AREA",
                measurementPlasterType: "6mm Villaboard",
            },
        },
        {
            id: "line-4",
            name: "90mm cove cornice",
            quantity: 64,
            unit: "m",
            unitPriceCents: 450,
            quantitySource: {
                measurementSource: "CORNICE_LENGTH",
                measurementPlasterType: null,
            },
        },
        {
            id: "line-5",
            name: "Insulation batts — R2.5",
            quantity: 12,
            unit: "m²",
            unitPriceCents: 620,
            quantitySource: null,
        },
        {
            id: "line-6",
            name: "Access scaffolding",
            quantity: 1,
            unit: "ea",
            unitPriceCents: 45000,
            quantitySource: null,
        },
    ];

/**
 * Enough line items to spill onto a second printed page. WORK-118's print
 * stylesheet applies `avoidBreakInside` per row rather than blocking the
 * whole document from breaking, so this needs a genuinely long list — a
 * handful of extra rows wouldn't demonstrate a page break existing.
 */
export const QUOTE_DETAIL_DOCUMENT_LONG_LINE_ITEMS: readonly QuoteDetailDocumentLineItem[] =
    Array.from({ length: 40 }, (_, index) => {
        const roomNumber = index + 1;
        return {
            id: `long-line-${roomNumber}`,
            name: `10mm Plasterboard — Room ${roomNumber} walls`,
            quantity: 12 + (index % 5),
            unit: "m²",
            unitPriceCents: 1250,
            quantitySource: {
                measurementSource: "PLASTERBOARD_AREA",
                measurementPlasterType: "10mm Plasterboard",
            },
        };
    });

/**
 * A fully filled-in letterhead (WORK-200's every nullable field set) with
 * an accent colour, used as the baseline for most stories so the letterhead
 * always has something to show. `DEFAULT_QUOTE_APPEARANCE` alone would
 * leave every letterhead field `null` (WORK-202's "not filled in yet"
 * default), which is exercised separately by the `NoAppearanceSettings`
 * story instead.
 */
export const QUOTE_DETAIL_DOCUMENT_APPEARANCE: QuoteAppearance = {
    ...DEFAULT_QUOTE_APPEARANCE,
    businessName: "Coastal Plastering Co.",
    abn: "12 345 678 901",
    licenceNumber: "PL-778812",
    address: "14 Shorefront Road, Coolangatta QLD 4225",
    phoneNumber: "(07) 5555 0199",
    email: "quotes@coastalplastering.example",
    accentColor: "#2563eb",
    terms: "Payment due within 14 days of acceptance. Prices exclude variations not described above.",
};

export const QUOTE_DETAIL_DOCUMENT_APPEARANCE_AMOUNTS_ONLY: QuoteAppearance = {
    ...QUOTE_DETAIL_DOCUMENT_APPEARANCE,
    pricingDetail: AMOUNTS_ONLY_PRICING_DETAIL,
};

export const QUOTE_DETAIL_DOCUMENT_APPEARANCE_LUMP_SUM: QuoteAppearance = {
    ...QUOTE_DETAIL_DOCUMENT_APPEARANCE,
    pricingDetail: LUMP_SUM_PRICING_DETAIL,
};

export const QUOTE_DETAIL_DOCUMENT_APPEARANCE_ALL_BLOCKS: QuoteAppearance = {
    ...QUOTE_DETAIL_DOCUMENT_APPEARANCE,
    showScopeOfWork: true,
    showTakeoffSummary: true,
    showSignatureBlock: true,
};

export const QUOTE_DETAIL_DOCUMENT_SCOPE_OF_WORK_TEXT =
    "Supply and install 10mm plasterboard to all internal walls and ceilings as per plan, including 90mm cove cornice throughout. Wet-area walls to receive 6mm villaboard. Excludes painting.";

export const QUOTE_DETAIL_DOCUMENT_TAKEOFF_SUMMARY_TEXT =
    "Wall area: 160 m² · Ceiling area: 96 m² · Wet-area walls: 18 m² · Cornice: 64 m linear.";
