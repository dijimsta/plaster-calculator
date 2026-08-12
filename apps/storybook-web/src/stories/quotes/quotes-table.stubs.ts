import type { QuotesTableRow } from "@libraries/plaster-calculator-ui";

/** Several realistic rows spanning all three `QuoteStatus` values. */
export const QUOTES_TABLE_POPULATED_ROWS: readonly QuotesTableRow[] = [
    {
        quoteId: "quote-1042",
        projectId: "project-riverside-extension",
        reference: "Q-1042",
        projectName: "Riverside Extension",
        companyName: "Coastal Builders Pty Ltd",
        status: "draft",
        totalIncGstCents: 486_250,
        createdAt: "2026-07-28T09:15:00.000Z",
    },
    {
        quoteId: "quote-1041",
        projectId: "project-hilltop-renovation",
        reference: "Q-1041",
        projectName: "Hilltop Renovation",
        companyName: "Summit Construction",
        status: "sent",
        totalIncGstCents: 1_235_000,
        createdAt: "2026-07-22T14:30:00.000Z",
    },
    {
        quoteId: "quote-1039",
        projectId: "project-lakeside-granny-flat",
        reference: "Q-1039",
        projectName: "Lakeside Granny Flat",
        companyName: null,
        status: "accepted",
        totalIncGstCents: 812_400,
        createdAt: "2026-07-15T11:00:00.000Z",
    },
    {
        quoteId: "quote-1036",
        projectId: "project-warehouse-fitout-stage-2",
        reference: null,
        projectName: "Warehouse Fitout — Stage 2",
        companyName: "Metro Fitouts",
        status: "draft",
        totalIncGstCents: 2_640_750,
        createdAt: "2026-07-05T08:45:00.000Z",
    },
    {
        quoteId: "quote-1035",
        projectId: "project-beachside-duplex",
        reference: "Q-1035",
        projectName: "Beachside Duplex",
        companyName: "Shoreline Homes",
        status: "sent",
        totalIncGstCents: 964_800,
        createdAt: "2026-06-30T16:20:00.000Z",
    },
    {
        quoteId: "quote-1028",
        projectId: "project-heritage-cottage-restoration",
        reference: "Q-1028",
        projectName: "Heritage Cottage Restoration",
        companyName: "Old Town Renovations",
        status: "accepted",
        totalIncGstCents: 375_600,
        createdAt: "2026-06-18T10:10:00.000Z",
    },
];

/** A single row, matching the first populated row, for the single-row story. */
export const QUOTES_TABLE_SINGLE_ROW: readonly QuotesTableRow[] = [
    {
        quoteId: "quote-1042",
        projectId: "project-riverside-extension",
        reference: "Q-1042",
        projectName: "Riverside Extension",
        companyName: "Coastal Builders Pty Ltd",
        status: "draft",
        totalIncGstCents: 486_250,
        createdAt: "2026-07-28T09:15:00.000Z",
    },
];
