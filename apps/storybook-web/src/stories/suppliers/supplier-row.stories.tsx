import { SupplierRow } from "@libraries/plaster-calculator-ui";
import type { Supplier } from "@libraries/plaster-calculator-web-core";
import type { Meta, StoryObj } from "@storybook/react-vite";

function supplier(overrides: Partial<Supplier>): Supplier {
    return {
        id: "csr-building-products",
        teamId: "sterling-homes",
        name: "CSR Building Products",
        isDefault: false,
        contactName: "Priya Nathan",
        phoneNumber: "1300 361 601",
        email: "orders@csr.com.au",
        address: "680 Elizabeth St, Melbourne VIC 3000",
        accountNumber: "AC-44210",
        pricedItemCount: 0,
        createdAt: "2026-01-01T00:00:00Z",
        updatedAt: "2026-01-01T00:00:00Z",
        ...overrides,
    };
}

const meta: Meta<typeof SupplierRow> = {
    title: "Plaster Calculator/Suppliers/SupplierRow",
    component: SupplierRow,
    tags: ["autodocs"],
    parameters: {
        docs: {
            description: {
                component:
                    "One row in the suppliers list: an initials tile, name, default badge, contact person/phone, and a coverage bar of how many priceable items this supplier has a cost estimate for.",
            },
        },
    },
    args: {
        totalItemCount: 9,
    },
};

export default meta;

type Story = StoryObj<typeof SupplierRow>;

export const DefaultSupplierFullyEstimated: Story = {
    name: "Default supplier, fully estimated",
    args: {
        supplier: supplier({ isDefault: true, pricedItemCount: 9 }),
    },
};

export const PartlyEstimated: Story = {
    args: {
        supplier: supplier({
            id: "boral-plasterboard",
            name: "Boral Plasterboard",
            pricedItemCount: 6,
        }),
    },
};

export const NotEstimatedYet: Story = {
    args: {
        supplier: supplier({
            id: "bristile-roofing",
            name: "Bristile Roofing",
            pricedItemCount: 0,
        }),
    },
};

export const MissingContactInfo: Story = {
    name: "No contact person or phone on file",
    args: {
        supplier: supplier({
            id: "trade-timber-co",
            name: "Trade Timber Co",
            contactName: null,
            phoneNumber: null,
            pricedItemCount: 3,
        }),
    },
};
