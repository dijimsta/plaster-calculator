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

/**
 * A small inline SVG letterhead logo -- a self-contained data URI rather
 * than a hosted image, so this story never depends on network access (see
 * `Avatar`'s own story, `apps/storybook-web/src/stories/elements/avatar.stories.tsx`,
 * for the alternative of a hosted sample image; a letterhead logo has no
 * equivalent stable, license-free hosted source to reuse). Matches
 * `QUOTE_DETAIL_DOCUMENT_APPEARANCE`'s accent colour and stands in for
 * "Coastal Plastering Co."'s monogram.
 */
export const QUOTE_DETAIL_DOCUMENT_SAMPLE_LOGO_URL =
    "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA2NCA2NCI+PHJlY3Qgd2lkdGg9IjY0IiBoZWlnaHQ9IjY0IiByeD0iOCIgZmlsbD0iIzI1NjNlYiIvPjx0ZXh0IHg9IjMyIiB5PSI0MiIgZm9udC1mYW1pbHk9IkFyaWFsLCBIZWx2ZXRpY2EsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMjYiIGZvbnQtd2VpZ2h0PSI3MDAiIGZpbGw9IiNmZmZmZmYiIHRleHQtYW5jaG9yPSJtaWRkbGUiPkNQPC90ZXh0Pjwvc3ZnPg==";

export const QUOTE_DETAIL_DOCUMENT_SCOPE_OF_WORK_TEXT =
    "Supply and install 10mm plasterboard to all internal walls and ceilings as per plan, including 90mm cove cornice throughout. Wet-area walls to receive 6mm villaboard. Excludes painting.";

export const QUOTE_DETAIL_DOCUMENT_TAKEOFF_SUMMARY_TEXT =
    "Wall area: 160 m² · Ceiling area: 96 m² · Wet-area walls: 18 m² · Cornice: 64 m linear.";
