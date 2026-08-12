import { QuoteTotalsUtils } from "@libraries/plaster-calculator-common";
import {
    QuoteLineItemsTable,
    QuoteTotalsBlock,
    type QuoteLineItemsTableRow,
} from "@libraries/plaster-calculator-ui";
import { Box } from "@libraries/uikit-web";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta: Meta<typeof QuoteLineItemsTable> = {
    title: "Plaster Calculator/Quotes/GeneratedQuote",
    component: QuoteLineItemsTable,
    tags: ["autodocs"],
    parameters: {
        docs: {
            description: {
                component:
                    "QuoteLineItemsTable and QuoteTotalsBlock composed together, as they'll appear on the generated-quote surface (the project's Quote tab, WORK-151) and on QuoteDetailDocument: priced line items with their quantity provenance, followed by the subtotal/GST/total block.",
            },
        },
    },
};

export default meta;

type Story = StoryObj<typeof QuoteLineItemsTable>;

export const TypicalQuote: Story = {
    name: "A typical quote",
    render: () => {
        const rows: readonly QuoteLineItemsTableRow[] = [
            {
                id: "line-1",
                name: "10mm Plasterboard — walls",
                quantity: 142,
                unitPriceCents: 1250,
                matchedKeywords: [],
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
                matchedKeywords: [],
                quantitySource: {
                    measurementSource: "CEILING_AREA",
                    measurementPlasterType: "PLASTERBOARD_10MM_CEILINGS",
                },
            },
            {
                id: "line-3",
                name: "90mm cove cornice",
                quantity: 64,
                unitPriceCents: 450,
                matchedKeywords: [],
                quantitySource: {
                    measurementSource: "CORNICE_LENGTH",
                    measurementPlasterType: null,
                },
            },
            {
                id: "line-4",
                name: "Scaffold hire",
                quantity: 1,
                unitPriceCents: 45000,
                matchedKeywords: ["scaffold"],
                quantitySource: null,
            },
        ];
        const lineAmountsCents = rows.map((row) =>
            QuoteTotalsUtils.lineAmountCents(row.quantity, row.unitPriceCents),
        );
        const subtotalCents = QuoteTotalsUtils.subtotalCents(lineAmountsCents);
        const gstCents = QuoteTotalsUtils.gstCents(subtotalCents);
        const totalIncGstCents = QuoteTotalsUtils.totalIncGstCents(
            subtotalCents,
            gstCents,
        );

        return (
            <Box direction="column" gap="lg">
                <QuoteLineItemsTable rows={rows} />
                <QuoteTotalsBlock
                    subtotalCents={subtotalCents}
                    gstCents={gstCents}
                    totalIncGstCents={totalIncGstCents}
                />
            </Box>
        );
    },
};

export const KeywordMatchedExtras: Story = {
    name: "A quote with keyword-matched extras",
    parameters: {
        docs: {
            description: {
                story: "Every row here has no quantitySource — each was placed on the quote purely because its template's keywords matched the plan's text, not because a measured quantity drove it. QuoteLineItemsTableUtils.provenanceLabel() falls back to matchedKeywords whenever quantitySource is null.",
            },
        },
    },
    render: () => {
        const rows: readonly QuoteLineItemsTableRow[] = [
            {
                id: "line-1",
                name: "Raised ceiling allowance",
                quantity: 1,
                unitPriceCents: 32000,
                matchedKeywords: ["raised ceiling"],
                quantitySource: null,
            },
            {
                id: "line-2",
                name: "Feature bulkhead framing",
                quantity: 1,
                unitPriceCents: 28500,
                matchedKeywords: ["bulkhead", "feature ceiling"],
                quantitySource: null,
            },
            {
                id: "line-3",
                name: "Extra coats — feature wall",
                quantity: 1,
                unitPriceCents: 15000,
                matchedKeywords: ["feature wall"],
                quantitySource: null,
            },
        ];
        const lineAmountsCents = rows.map((row) =>
            QuoteTotalsUtils.lineAmountCents(row.quantity, row.unitPriceCents),
        );
        const subtotalCents = QuoteTotalsUtils.subtotalCents(lineAmountsCents);
        const gstCents = QuoteTotalsUtils.gstCents(subtotalCents);
        const totalIncGstCents = QuoteTotalsUtils.totalIncGstCents(
            subtotalCents,
            gstCents,
        );

        return (
            <Box direction="column" gap="lg">
                <QuoteLineItemsTable rows={rows} />
                <QuoteTotalsBlock
                    subtotalCents={subtotalCents}
                    gstCents={gstCents}
                    totalIncGstCents={totalIncGstCents}
                />
            </Box>
        );
    },
};

export const SingleLineQuote: Story = {
    name: "A single-line quote",
    render: () => {
        const rows: readonly QuoteLineItemsTableRow[] = [
            {
                id: "line-1",
                name: "10mm Plasterboard — walls",
                quantity: 24,
                unitPriceCents: 1250,
                matchedKeywords: [],
                quantitySource: {
                    measurementSource: "WALL_AREA",
                    measurementPlasterType: "PLASTERBOARD_10MM_WALLS",
                },
            },
        ];
        const lineAmountsCents = rows.map((row) =>
            QuoteTotalsUtils.lineAmountCents(row.quantity, row.unitPriceCents),
        );
        const subtotalCents = QuoteTotalsUtils.subtotalCents(lineAmountsCents);
        const gstCents = QuoteTotalsUtils.gstCents(subtotalCents);
        const totalIncGstCents = QuoteTotalsUtils.totalIncGstCents(
            subtotalCents,
            gstCents,
        );

        return (
            <Box direction="column" gap="lg">
                <QuoteLineItemsTable rows={rows} />
                <QuoteTotalsBlock
                    subtotalCents={subtotalCents}
                    gstCents={gstCents}
                    totalIncGstCents={totalIncGstCents}
                />
            </Box>
        );
    },
};

export const LongItemName: Story = {
    name: "A long item name",
    parameters: {
        docs: {
            description: {
                story: "The first row's name is long enough to force a wrap onto a second line inside its Table.Cell (WORK-148's wrap prop) instead of forcing the row onto a horizontal scrollbar.",
            },
        },
    },
    render: () => {
        const rows: readonly QuoteLineItemsTableRow[] = [
            {
                id: "line-1",
                name: "10mm Standard Plasterboard — walls, ceilings and feature bulkhead sections throughout the ground floor living areas",
                quantity: 210,
                unitPriceCents: 1250,
                matchedKeywords: [],
                quantitySource: {
                    measurementSource: "WALL_AREA",
                    measurementPlasterType: "PLASTERBOARD_10MM_WALLS",
                },
            },
            {
                id: "line-2",
                name: "Ezy jamb door sets",
                quantity: 6,
                unitPriceCents: 8900,
                matchedKeywords: [],
                quantitySource: {
                    measurementSource: "DOOR_COUNT",
                    measurementPlasterType: null,
                },
            },
        ];
        const lineAmountsCents = rows.map((row) =>
            QuoteTotalsUtils.lineAmountCents(row.quantity, row.unitPriceCents),
        );
        const subtotalCents = QuoteTotalsUtils.subtotalCents(lineAmountsCents);
        const gstCents = QuoteTotalsUtils.gstCents(subtotalCents);
        const totalIncGstCents = QuoteTotalsUtils.totalIncGstCents(
            subtotalCents,
            gstCents,
        );

        return (
            <Box direction="column" gap="lg">
                <QuoteLineItemsTable rows={rows} />
                <QuoteTotalsBlock
                    subtotalCents={subtotalCents}
                    gstCents={gstCents}
                    totalIncGstCents={totalIncGstCents}
                />
            </Box>
        );
    },
};
