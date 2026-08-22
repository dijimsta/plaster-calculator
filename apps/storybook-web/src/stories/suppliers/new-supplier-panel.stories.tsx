import { NewSupplierPanel } from "@libraries/plaster-calculator-ui";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";

const meta: Meta<typeof NewSupplierPanel> = {
    title: "Plaster Calculator/Suppliers/NewSupplierPanel",
    component: NewSupplierPanel,
    tags: ["autodocs"],
    parameters: {
        docs: {
            description: {
                component:
                    "A new supplier's minimal starting fields -- name, phone, account number -- with only name required; the rest of a supplier's contact details fill in later on SupplierDetailCard.",
            },
        },
    },
    args: {
        disabled: false,
        onChange: fn(),
        onCreate: fn(),
        onCancel: fn(),
    },
};

export default meta;

type Story = StoryObj<typeof NewSupplierPanel>;

export const Blank: Story = {
    args: {
        values: {
            name: "",
            phoneNumber: "",
            accountNumber: "",
        },
    },
};

export const Filled: Story = {
    args: {
        values: {
            name: "Bristile Roofing",
            phoneNumber: "1300 274 784",
            accountNumber: "AC-91055",
        },
    },
};

export const Creating: Story = {
    name: "Submitting the new supplier",
    args: {
        values: {
            name: "Bristile Roofing",
            phoneNumber: "1300 274 784",
            accountNumber: "AC-91055",
        },
        disabled: true,
    },
};
