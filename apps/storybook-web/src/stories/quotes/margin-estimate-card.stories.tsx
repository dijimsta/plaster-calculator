import { MarginEstimateCard } from "@libraries/plaster-calculator-ui";
import type {
    MarginEstimateCardLine,
    MarginEstimateCardSummary,
} from "@libraries/plaster-calculator-ui";
import type { Supplier } from "@libraries/plaster-calculator-web-core";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";

const SAMPLE_SUPPLIERS: readonly Supplier[] = [
    {
        id: "supplier-1",
        teamId: "team-1",
        name: "Boral Trade",
        isDefault: true,
        contactName: "Dana Kim",
        phoneNumber: "(07) 5555 0123",
        email: "dana@boraltrade.example",
        address: "22 Industrial Ave, Molendinar QLD 4214",
        accountNumber: "BT-4471",
        pricedItemCount: 8,
        createdAt: "2026-03-01T00:00:00.000Z",
        updatedAt: "2026-06-01T00:00:00.000Z",
    },
    {
        id: "supplier-2",
        teamId: "team-1",
        name: "CSR Building Supplies",
        isDefault: false,
        contactName: null,
        phoneNumber: null,
        email: null,
        address: null,
        accountNumber: null,
        pricedItemCount: 3,
        createdAt: "2026-03-05T00:00:00.000Z",
        updatedAt: "2026-06-05T00:00:00.000Z",
    },
];

/** Three lines, every one priced by the selected supplier. */
const COVERED_LINES: readonly MarginEstimateCardLine[] = [
    {
        id: "line-1",
        name: "10mm Plasterboard — walls",
        quantity: 100,
        unitPriceCents: 1200,
        estimatedMaterialUnitPriceCents: 700,
        lineCostCents: 70000,
        marginRatio: (120000 - 70000) / 120000,
    },
    {
        id: "line-2",
        name: "90mm cove cornice",
        quantity: 50,
        unitPriceCents: 1000,
        estimatedMaterialUnitPriceCents: 600,
        lineCostCents: 30000,
        marginRatio: (50000 - 30000) / 50000,
    },
    {
        id: "line-3",
        name: "Access scaffolding",
        quantity: 1,
        unitPriceCents: 45000,
        estimatedMaterialUnitPriceCents: 27000,
        lineCostCents: 27000,
        marginRatio: (45000 - 27000) / 45000,
    },
];

/** `COVERED_LINES`' first two rows' totals -- see `estimateQuoteMargin()`, WORK-381. */
const FULL_COVERAGE_SUMMARY: MarginEstimateCardSummary = {
    sellCents: 120000 + 50000 + 45000,
    costCents: 70000 + 30000 + 27000,
    marginCents: 215000 - 127000,
    marginRatio: (215000 - 127000) / 215000,
};

/** Two lines this supplier hasn't priced -- no `sourceTemplateId` match, so all three cost fields stay `null`. */
const UNCOVERED_LINES: readonly MarginEstimateCardLine[] = [
    {
        id: "line-4",
        name: "Insulation batts — R2.5",
        quantity: 12,
        unitPriceCents: 620,
        estimatedMaterialUnitPriceCents: null,
        lineCostCents: null,
        marginRatio: null,
    },
    {
        id: "line-5",
        name: "6mm Villaboard — wet-area walls",
        quantity: 18,
        unitPriceCents: 1890,
        estimatedMaterialUnitPriceCents: null,
        lineCostCents: null,
        marginRatio: null,
    },
];

const PARTIAL_COVERAGE_LINES: readonly MarginEstimateCardLine[] = [
    ...COVERED_LINES.slice(0, 2),
    ...UNCOVERED_LINES,
];

/** Only the two covered lines above count toward sell/cost/margin -- uncovered lines are excluded, not zeroed. */
const PARTIAL_COVERAGE_SUMMARY: MarginEstimateCardSummary = {
    sellCents: 120000 + 50000,
    costCents: 70000 + 30000,
    marginCents: 170000 - 100000,
    marginRatio: (170000 - 100000) / 170000,
};

/** One line priced below its material cost, dragging the whole quote's margin negative. */
const NEGATIVE_MARGIN_LINES: readonly MarginEstimateCardLine[] = [
    {
        id: "line-1",
        name: "10mm Plasterboard — walls",
        quantity: 100,
        unitPriceCents: 1200,
        estimatedMaterialUnitPriceCents: 1500,
        lineCostCents: 150000,
        marginRatio: (120000 - 150000) / 120000,
    },
    {
        id: "line-2",
        name: "90mm cove cornice",
        quantity: 50,
        unitPriceCents: 1000,
        estimatedMaterialUnitPriceCents: 800,
        lineCostCents: 40000,
        marginRatio: (50000 - 40000) / 50000,
    },
];

const NEGATIVE_MARGIN_SUMMARY: MarginEstimateCardSummary = {
    sellCents: 120000 + 50000,
    costCents: 150000 + 40000,
    marginCents: 170000 - 190000,
    marginRatio: (170000 - 190000) / 170000,
};

const meta: Meta<typeof MarginEstimateCard> = {
    title: "Plaster Calculator/Quotes/MarginEstimateCard",
    component: MarginEstimateCard,
    tags: ["autodocs"],
    parameters: {
        docs: {
            description: {
                component:
                    "The project quote's internal-only margin readout, measured against a selected supplier's pricing: sell/estimated cost/estimated margin, a per-line breakdown, and a notice for lines that supplier hasn't priced. Never rendered inside QuoteDetailDocument or any printed/downloaded quote -- see the component's own doc comment for how print exclusion holds structurally. Renders nothing when the team has no suppliers.",
            },
        },
    },
    args: {
        selectedSupplierId: SAMPLE_SUPPLIERS[0]?.id ?? null,
        onSupplierChange: fn(),
        onPriceUncoveredLines: fn(),
    },
};

export default meta;

type Story = StoryObj<typeof MarginEstimateCard>;

export const FullCoverage: Story = {
    name: "Full coverage",
    args: {
        suppliers: SAMPLE_SUPPLIERS,
        summary: FULL_COVERAGE_SUMMARY,
        lines: COVERED_LINES,
    },
};

export const PartialCoverageWithNamedGap: Story = {
    name: "Partial coverage, named gap",
    args: {
        suppliers: SAMPLE_SUPPLIERS,
        summary: PARTIAL_COVERAGE_SUMMARY,
        lines: PARTIAL_COVERAGE_LINES,
    },
};

export const NoSuppliers: Story = {
    name: "No suppliers (renders nothing)",
    parameters: {
        docs: {
            description: {
                story: "The team has no suppliers yet, so there's nothing to measure margin against -- MarginEstimateCard returns null and renders no DOM at all, not even the 'Internal only' header.",
            },
        },
    },
    args: {
        suppliers: [],
        summary: FULL_COVERAGE_SUMMARY,
        lines: COVERED_LINES,
    },
};

export const NegativeMargin: Story = {
    name: "Negative margin",
    args: {
        suppliers: SAMPLE_SUPPLIERS,
        summary: NEGATIVE_MARGIN_SUMMARY,
        lines: NEGATIVE_MARGIN_LINES,
    },
};
