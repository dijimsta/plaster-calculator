import { QuoteTemplateList } from "@libraries/plaster-calculator-ui";
import type { QuoteTemplate } from "@libraries/plaster-calculator-ui";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";

const SAMPLE_DEFAULT_TEMPLATE: QuoteTemplate = {
    id: "d4e5f6a7-8b9c-4d1e-9f2a-3b4c5d6e7f8a",
    name: "Default",
    isDefault: true,
    createdAt: "2025-11-01T09:00:00.000Z",
    updatedAt: "2026-06-02T11:30:00.000Z",
};

const SAMPLE_TEMPLATES: readonly QuoteTemplate[] = [
    SAMPLE_DEFAULT_TEMPLATE,
    {
        id: "f2a1b8c4-9d3e-4f5a-8b6c-1d2e3f4a5b6c",
        name: "Acme Builders",
        isDefault: false,
        createdAt: "2026-01-15T09:00:00.000Z",
        updatedAt: "2026-05-11T14:12:00.000Z",
    },
    {
        id: "3c4d5e6f-7a8b-4c9d-8e1f-2a3b4c5d6e7f",
        name: "Northside Plastering",
        isDefault: false,
        createdAt: "2026-02-20T09:00:00.000Z",
        updatedAt: "2026-04-03T08:45:00.000Z",
    },
];

const meta: Meta<typeof QuoteTemplateList> = {
    title: "Plaster Calculator/Quotes/QuoteTemplateList",
    component: QuoteTemplateList,
    tags: ["autodocs"],
    parameters: {
        docs: {
            description: {
                component:
                    'The default template plus its variations: a management table with create/rename/delete actions. The default is always pinned first and clearly badged -- there is no "make default" control anywhere on this list.',
            },
        },
    },
    args: {
        isMutating: false,
        onCreateVariation: fn(),
        onRenameTemplate: fn(),
        onDeleteTemplate: fn(),
        onOpenVariation: fn(),
    },
};

export default meta;

type Story = StoryObj<typeof QuoteTemplateList>;

export const Default: Story = {
    args: {
        templates: SAMPLE_TEMPLATES,
        isLoading: false,
    },
};

export const DefaultOnly: Story = {
    name: "Default only, no variations",
    args: {
        templates: [SAMPLE_DEFAULT_TEMPLATE],
        isLoading: false,
    },
};

export const Loading: Story = {
    args: {
        templates: [],
        isLoading: true,
    },
};
