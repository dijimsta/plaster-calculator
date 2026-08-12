import type { QuoteDetailDocumentLineItem } from "@libraries/plaster-calculator-ui";

/**
 * A normal-length set of line items — a mix of measured items (with
 * quantity provenance) and manually-entered custom items (provenance
 * `null`) — reused across the draft/sent/accepted status stories, which
 * only differ by the `status` arg.
 */
export const QUOTE_DETAIL_DOCUMENT_LINE_ITEMS: readonly QuoteDetailDocumentLineItem[] =
    [
        {
            id: "line-1",
            name: "10mm Plasterboard — walls",
            quantity: 142,
            unitPriceCents: 1250,
            quantitySource: {
                measurementSource: "WALL_AREA",
                measurementPlasterType: "PLASTERBOARD_10MM_WALLS",
            },
        },
        {
            id: "line-2",
            name: "10mm Plasterboard — ceilings",
            quantity: 96,
            unitPriceCents: 1350,
            quantitySource: {
                measurementSource: "CEILING_AREA",
                measurementPlasterType: "PLASTERBOARD_10MM_CEILINGS",
            },
        },
        {
            id: "line-3",
            name: "6mm Villaboard — wet-area walls",
            quantity: 18,
            unitPriceCents: 1890,
            quantitySource: {
                measurementSource: "WALL_AREA",
                measurementPlasterType: "VILLABOARD_6MM_WET_WALLS",
            },
        },
        {
            id: "line-4",
            name: "90mm cove cornice",
            quantity: 64,
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
            unitPriceCents: 620,
            quantitySource: null,
        },
        {
            id: "line-6",
            name: "Access scaffolding",
            quantity: 1,
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
            unitPriceCents: 1250,
            quantitySource: {
                measurementSource: "WALL_AREA",
                measurementPlasterType: "PLASTERBOARD_10MM_WALLS",
            },
        };
    });
