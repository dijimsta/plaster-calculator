import { QuoteTemplateForm } from "@libraries/plaster-calculator-ui";
import type { QuoteTemplateFormValues } from "@libraries/plaster-calculator-ui";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";

const SAMPLE_VALUES: QuoteTemplateFormValues = {
    defaultItems: [
        {
            itemTemplateId: "f47826e8-6f88-451c-9377-8635b4c7ac04",
            systemKey: "PLASTERBOARD_10MM_WALLS",
            name: "10mm Plasterboard — walls",
            unitPriceCents: 1250,
        },
        {
            itemTemplateId: "1f28456f-d936-4adb-afc9-43d9767a44b2",
            systemKey: "VILLABOARD_6MM_WET_WALLS",
            name: "6mm Villaboard — wet-area walls",
            unitPriceCents: 1890,
        },
        {
            itemTemplateId: "a4642ab3-300a-483b-96f4-0b00da347714",
            systemKey: "PLASTERBOARD_10MM_CEILINGS",
            name: "10mm Plasterboard — ceilings",
            unitPriceCents: 1350,
        },
        {
            itemTemplateId: "fcaf405c-352c-49ce-81bc-638f2331ef82",
            systemKey: "COVE_CORNICE_90MM",
            name: "90mm cove cornice",
            unitPriceCents: 450,
        },
        {
            itemTemplateId: "bab0f6de-f4a0-4b38-ab1c-81694a0ea6a7",
            systemKey: "FC_SHEET_15MM_WET_FLOORS",
            name: "15mm compressed FC sheet — wet floors",
            unitPriceCents: 2150,
        },
        {
            itemTemplateId: "003e5926-102f-4dbe-ba56-f1cf7930888c",
            systemKey: "EZY_JAMB_DOOR_SETS",
            name: "Ezy jamb door sets",
            unitPriceCents: 8500,
        },
    ],
    customItems: [
        {
            itemTemplateId: "6d1c9e2b-3f7a-4b8e-9f1a-2c5d6e7f8a9b",
            name: "Insulation batts",
            hasKeywords: true,
            enabled: true,
            keywords: ["insulation", "batts", "R2.5"],
            unitPriceCents: 620,
        },
        {
            itemTemplateId: "8b2e4f6a-1d3c-4a5e-8f9b-3d6e7a8b9c0d",
            name: "Access scaffolding",
            hasKeywords: false,
            enabled: true,
            keywords: [],
            unitPriceCents: 45000,
        },
        {
            itemTemplateId: "2f5a7b9c-4e6d-4f8a-9b1c-5d7e8f9a0b1c",
            name: "Rubbish removal",
            hasKeywords: false,
            enabled: false,
            keywords: [],
            unitPriceCents: 15000,
        },
    ],
};

const meta: Meta<typeof QuoteTemplateForm> = {
    title: "Plaster Calculator/Quotes/QuoteTemplateForm",
    component: QuoteTemplateForm,
    tags: ["autodocs"],
    parameters: {
        docs: {
            description: {
                component:
                    "A form for adjusting a quote template's default and custom items.",
            },
        },
    },
    args: {
        formId: "quote-template-form",
        onCancel: fn(),
        onSubmit: fn(),
    },
};

export default meta;

type Story = StoryObj<typeof QuoteTemplateForm>;

export const Default: Story = {
    args: {
        initialValues: SAMPLE_VALUES,
    },
};

export const Empty: Story = {
    args: {
        initialValues: {
            defaultItems: [],
            customItems: [],
        },
    },
};
