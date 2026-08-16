import { EditableQuoteForm } from "@libraries/plaster-calculator-ui";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";

const meta: Meta<typeof EditableQuoteForm> = {
    title: "Plaster Calculator/Quotes/EditableQuoteForm",
    component: EditableQuoteForm,
    tags: ["autodocs"],
    args: {
        formId: "editable-quote-story",
        initialValues: {
            reference: "Q-1042",
            lineItems: [
                {
                    id: "line-walls",
                    name: "10mm Plasterboard — walls",
                    quantity: 142.5,
                    unit: "m²",
                    unitPriceCents: 1850,
                },
                {
                    id: "line-cornice",
                    name: "90mm cove cornice",
                    quantity: 68,
                    unit: "m",
                    unitPriceCents: 1295,
                },
            ],
        },
        onCancel: fn(),
        onSubmit: fn(),
    },
};

export default meta;

type Story = StoryObj<typeof EditableQuoteForm>;

export const Default: Story = {};

export const Saving: Story = {
    args: {
        disabled: true,
    },
};
