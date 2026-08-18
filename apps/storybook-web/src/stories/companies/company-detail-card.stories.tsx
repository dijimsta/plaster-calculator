import type { CompanyContact } from "@libraries/plaster-calculator-common";
import { CompanyDetailCard } from "@libraries/plaster-calculator-ui";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";

function contact(id: string, name: string): CompanyContact {
    return {
        id,
        companyId: "sterling-homes",
        name,
        email: `${name.toLowerCase().replace(/\s+/g, ".")}@sterlinghomes.com.au`,
        phoneNumber: "0412 334 556",
        role: "Estimating Manager",
        createdAt: "2026-01-01T00:00:00Z",
        updatedAt: "2026-01-01T00:00:00Z",
    };
}

const meta: Meta<typeof CompanyDetailCard> = {
    title: "Plaster Calculator/Companies/CompanyDetailCard",
    component: CompanyDetailCard,
    tags: ["autodocs"],
    parameters: {
        docs: {
            description: {
                component:
                    "The company detail page's 'Details' card: a 2-up field grid for the company's identity, plus delete/save actions in its footer.",
            },
        },
    },
    args: {
        values: {
            companyName: "Sterling Homes",
            businessNumber: "54 112 233 445",
            phoneNumber: "(03) 9555 0102",
            primaryContactId: "dana",
        },
        contacts: [
            contact("dana", "Dana Whitfield"),
            contact("marcus", "Marcus Reyes"),
        ],
        hasChanges: false,
        onChange: fn(),
        onSave: fn(),
        onDelete: fn(),
    },
};

export default meta;

type Story = StoryObj<typeof CompanyDetailCard>;

export const Saved: Story = {
    name: "Nothing unsaved",
};

export const UnsavedChanges: Story = {
    name: "Unsaved edits",
    args: {
        hasChanges: true,
    },
};

export const NoPrimaryContact: Story = {
    args: {
        values: {
            companyName: "Sterling Homes",
            businessNumber: "54 112 233 445",
            phoneNumber: "(03) 9555 0102",
            primaryContactId: "",
        },
        contacts: [],
    },
};
