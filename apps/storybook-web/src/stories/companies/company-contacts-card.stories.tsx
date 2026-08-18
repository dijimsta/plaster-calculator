import type { CompanyContact } from "@libraries/plaster-calculator-common";
import { CompanyContactsCard } from "@libraries/plaster-calculator-ui";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";

const CONTACTS: readonly CompanyContact[] = [
    {
        id: "dana",
        companyId: "sterling-homes",
        name: "Dana Whitfield",
        email: "dana@sterlinghomes.com.au",
        phoneNumber: "0412 334 556",
        role: "Estimating Manager",
        createdAt: "2026-01-01T00:00:00Z",
        updatedAt: "2026-01-01T00:00:00Z",
    },
    {
        id: "marcus",
        companyId: "sterling-homes",
        name: "Marcus Reyes",
        email: "marcus@sterlinghomes.com.au",
        phoneNumber: "0403 221 890",
        role: "Site Manager",
        createdAt: "2026-01-01T00:00:00Z",
        updatedAt: "2026-01-01T00:00:00Z",
    },
];

const meta: Meta<typeof CompanyContactsCard> = {
    title: "Plaster Calculator/Companies/CompanyContactsCard",
    component: CompanyContactsCard,
    tags: ["autodocs"],
    parameters: {
        docs: {
            description: {
                component:
                    "The company detail page's 'Contacts' card: every contact as an avatar row, editable in place, plus adding a new one.",
            },
        },
    },
    args: {
        contacts: CONTACTS,
        primaryContactId: "dana",
        editingContactId: null,
        editValues: {
            name: "",
            email: "",
            phoneNumber: "",
            role: "",
            makePrimary: false,
        },
        onEditValuesChange: fn(),
        onStartEdit: fn(),
        onCancelEdit: fn(),
        onSaveEdit: fn(),
        onDelete: fn(),
        onAddContact: fn(),
    },
};

export default meta;

type Story = StoryObj<typeof CompanyContactsCard>;

export const Populated: Story = {
    args: { editingContactId: null },
};

export const EditingARow: Story = {
    name: "Editing one contact",
    args: {
        editingContactId: "marcus",
        editValues: {
            name: "Marcus Reyes",
            email: "marcus@sterlinghomes.com.au",
            phoneNumber: "0403 221 890",
            role: "Site Manager",
            makePrimary: false,
        },
    },
};

export const Empty: Story = {
    name: "No contacts yet",
    args: {
        contacts: [],
        primaryContactId: null,
    },
};
