import { SupplierDetailCard } from "@libraries/plaster-calculator-ui";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";

const meta: Meta<typeof SupplierDetailCard> = {
    title: "Plaster Calculator/Suppliers/SupplierDetailCard",
    component: SupplierDetailCard,
    tags: ["autodocs"],
    parameters: {
        docs: {
            description: {
                component:
                    "The supplier detail page's 'Details' card: editable contact fields plus save, set-as-default, and delete-with-confirmation actions. Delete is disabled while the supplier is the default.",
            },
        },
    },
    args: {
        supplierName: "Boral Plasterboard",
        isDefault: false,
        values: {
            contactName: "Aiden Wu",
            phoneNumber: "1300 134 002",
            email: "trade@boral.com.au",
            address: "40 Mount St, North Sydney NSW 2060",
            accountNumber: "AC-88213",
        },
        hasChanges: false,
        isDeleting: false,
        onChange: fn(),
        onSave: fn(),
        onSetAsDefault: fn(),
        onDelete: fn(),
    },
};

export default meta;

type Story = StoryObj<typeof SupplierDetailCard>;

export const Saved: Story = {
    name: "Nothing unsaved",
};

export const UnsavedChanges: Story = {
    name: "Unsaved edits",
    args: {
        hasChanges: true,
    },
};

export const DefaultSupplier: Story = {
    name: "Default supplier (delete disabled)",
    args: {
        supplierName: "CSR Building Products",
        isDefault: true,
        values: {
            contactName: "Priya Nathan",
            phoneNumber: "1300 361 601",
            email: "orders@csr.com.au",
            address: "680 Elizabeth St, Melbourne VIC 3000",
            accountNumber: "AC-44210",
        },
    },
};

export const EmptyContactFields: Story = {
    name: "No contact details on file",
    args: {
        supplierName: "Trade Timber Co",
        values: {
            contactName: "",
            phoneNumber: "",
            email: "",
            address: "",
            accountNumber: "",
        },
    },
};
