import { SupplierCostEstimationCard } from "@libraries/plaster-calculator-ui";
import type { SupplierCostEstimationItem } from "@libraries/plaster-calculator-ui";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";

const ITEMS: readonly SupplierCostEstimationItem[] = [
    {
        templateId: "plasterboard-10mm",
        templateName: "10mm Plasterboard",
        unit: "LM",
        estimatedCostCents: 5400,
    },
    {
        templateId: "plasterboard-13mm",
        templateName: "13mm Plasterboard",
        unit: "LM",
        estimatedCostCents: 5900,
    },
    {
        templateId: "villaboard-9mm",
        templateName: "Villaboard 9mm",
        unit: "m²",
        estimatedCostCents: null,
    },
    {
        templateId: "cornice-cement",
        templateName: "Cornice cement",
        unit: "kg",
        estimatedCostCents: null,
    },
    {
        templateId: "screws-set-drive",
        templateName: "Set drive screws",
        unit: null,
        estimatedCostCents: 1200,
    },
];

const meta: Meta<typeof SupplierCostEstimationCard> = {
    title: "Plaster Calculator/Suppliers/SupplierCostEstimationCard",
    component: SupplierCostEstimationCard,
    tags: ["autodocs"],
    parameters: {
        docs: {
            description: {
                component:
                    "The supplier detail page's 'Material cost estimation' table: this supplier's per-unit cost estimate for every enabled catalog item, editable in place. Every price is labelled an estimate throughout so it isn't read as an order total.",
            },
        },
    },
    args: {
        disabled: false,
        onChange: fn(),
    },
};

export default meta;

type Story = StoryObj<typeof SupplierCostEstimationCard>;

export const PartlyEstimated: Story = {
    args: {
        items: ITEMS,
    },
};

export const FullyEstimated: Story = {
    args: {
        items: ITEMS.map((item) => ({
            ...item,
            estimatedCostCents: item.estimatedCostCents ?? 4200,
        })),
    },
};

export const Empty: Story = {
    name: "No priceable items yet",
    args: {
        items: [],
    },
};
