import { QuoteTemplateAddedItemNotice } from "@libraries/plaster-calculator-ui";
import type { QuoteTemplate } from "@libraries/plaster-calculator-ui";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";

const SAMPLE_VARIATIONS: readonly QuoteTemplate[] = [
    {
        id: "f2a1b8c4-9d3e-4f5a-8b6c-1d2e3f4a5b6c",
        name: "Acme Builders",
        isDefault: false,
        createdAt: "2026-01-15T09:00:00.000Z",
        updatedAt: "2026-06-02T11:30:00.000Z",
    },
    {
        id: "3c4d5e6f-7a8b-4c9d-8e1f-2a3b4c5d6e7f",
        name: "Northside Plastering",
        isDefault: false,
        createdAt: "2026-02-20T09:00:00.000Z",
        updatedAt: "2026-05-11T14:12:00.000Z",
    },
];

const meta: Meta<typeof QuoteTemplateAddedItemNotice> = {
    title: "Plaster Calculator/Quotes/QuoteTemplateAddedItemNotice",
    component: QuoteTemplateAddedItemNotice,
    tags: ["autodocs"],
    parameters: {
        docs: {
            description: {
                component:
                    "Shown once, right after saving the default template adds one or more new custom items. Every variation picks the new item(s) up at the default's current price the next time it's opened, so a team still needs telling in case that price isn't right for every variation -- each variation appears as its own action to jump straight to re-pricing it.",
            },
        },
    },
    args: {
        onOpenVariation: fn(),
        onDismiss: fn(),
    },
};

export default meta;

type Story = StoryObj<typeof QuoteTemplateAddedItemNotice>;

export const WithVariationsToReprice: Story = {
    name: "With variations to re-price",
    args: {
        itemNames: ["Insulation batts"],
        variations: SAMPLE_VARIATIONS,
    },
};

export const MultipleItemsNoVariations: Story = {
    name: "Multiple items, no variations yet",
    args: {
        itemNames: ["Insulation batts", "Access scaffolding"],
        variations: [],
    },
};
