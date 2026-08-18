import {
    SYSTEM_QUOTE_ITEM_TEMPLATE_SCOPE,
    TEAM_QUOTE_ITEM_TEMPLATE_SCOPE,
} from "@libraries/plaster-calculator-common";
import { QuoteTemplateVariationForm } from "@libraries/plaster-calculator-ui";
import type { QuoteTemplateVariationFormValues } from "@libraries/plaster-calculator-ui";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";

const SAMPLE_VALUES: QuoteTemplateVariationFormValues = {
    items: [
        {
            itemTemplateId: "f47826e8-6f88-451c-9377-8635b4c7ac04",
            scope: SYSTEM_QUOTE_ITEM_TEMPLATE_SCOPE,
            name: "10mm Plasterboard",
            unit: "m²",
            hasKeywords: false,
            keywords: [],
            defaultUnitPriceCents: 1250,
            unitPriceCents: 1250,
        },
        {
            itemTemplateId: "1f28456f-d936-4adb-afc9-43d9767a44b2",
            scope: SYSTEM_QUOTE_ITEM_TEMPLATE_SCOPE,
            name: "13mm Plasterboard",
            unit: "m²",
            hasKeywords: false,
            keywords: [],
            defaultUnitPriceCents: 1890,
            unitPriceCents: 2100,
        },
        {
            itemTemplateId: "a4642ab3-300a-483b-96f4-0b00da347714",
            scope: SYSTEM_QUOTE_ITEM_TEMPLATE_SCOPE,
            name: "9mm Villaboard",
            unit: "m²",
            hasKeywords: false,
            keywords: [],
            defaultUnitPriceCents: 1350,
            unitPriceCents: 1150,
        },
        {
            itemTemplateId: "6d1c9e2b-3f7a-4b8e-9f1a-2c5d6e7f8a9b",
            scope: TEAM_QUOTE_ITEM_TEMPLATE_SCOPE,
            name: "Insulation batts",
            unit: "m²",
            hasKeywords: true,
            keywords: ["insulation", "batts", "R2.5"],
            defaultUnitPriceCents: 620,
            unitPriceCents: 620,
        },
    ],
};

const meta: Meta<typeof QuoteTemplateVariationForm> = {
    title: "Plaster Calculator/Quotes/QuoteTemplateVariationForm",
    component: QuoteTemplateVariationForm,
    tags: ["autodocs"],
    parameters: {
        docs: {
            description: {
                component:
                    "A variation's item table, reduced to item / unit / price: name, unit and keywords render read-only (fixed by the default template), only price is editable, and each row shows its rate delta against the default's current price.",
            },
        },
    },
    args: {
        formId: "quote-template-variation-form",
        onCancel: fn(),
        onSubmit: fn(),
    },
};

export default meta;

type Story = StoryObj<typeof QuoteTemplateVariationForm>;

/** Every rate-delta state at once: same as default, an increase, and a decrease. */
export const Default: Story = {
    args: {
        initialValues: SAMPLE_VALUES,
    },
};
