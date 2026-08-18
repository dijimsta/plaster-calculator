import { QuoteTemplateCardGrid } from "@libraries/plaster-calculator-ui";
import type { QuoteTemplate } from "@libraries/plaster-calculator-ui";
import type { CompanySummary } from "@libraries/plaster-calculator-web-core";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";

const DEFAULT_TEMPLATE: QuoteTemplate = {
    id: "standard",
    name: "Standard rates",
    isDefault: true,
    createdAt: "2026-01-01T00:00:00Z",
    updatedAt: "2026-01-01T00:00:00Z",
};

const TEMPLATES: readonly QuoteTemplate[] = [
    DEFAULT_TEMPLATE,
    {
        id: "sterling",
        name: "Sterling Homes rates",
        isDefault: false,
        createdAt: "2026-01-01T00:00:00Z",
        updatedAt: "2026-01-01T00:00:00Z",
    },
    {
        id: "volume",
        name: "Volume builder rates",
        isDefault: false,
        createdAt: "2026-01-01T00:00:00Z",
        updatedAt: "2026-01-01T00:00:00Z",
    },
];

function company(
    id: string,
    companyName: string,
    quoteTemplateId: string | null,
    quoteTemplateName: string | null,
): CompanySummary {
    return {
        id,
        companyName,
        businessNumber: null,
        phoneNumber: null,
        primaryContactId: null,
        quoteTemplateId,
        quoteTemplateName,
        createdAt: "2026-01-01T00:00:00Z",
        updatedAt: "2026-01-01T00:00:00Z",
    };
}

const COMPANIES_BY_TEMPLATE_ID = new Map<string, readonly CompanySummary[]>([
    [
        "sterling",
        [company("c1", "Sterling Homes", "sterling", "Sterling Homes rates")],
    ],
    [
        "volume",
        [
            company("c2", "Aspen Living", "volume", "Volume builder rates"),
            company("c3", "Meridian Group", "volume", "Volume builder rates"),
        ],
    ],
]);

const RATE_BY_TEMPLATE_ID = new Map([
    ["standard", { unit: "LM", unitPriceCents: 7400 }],
    ["sterling", { unit: "LM", unitPriceCents: 6800 }],
    ["volume", { unit: "LM", unitPriceCents: 6400 }],
]);

const meta: Meta<typeof QuoteTemplateCardGrid> = {
    title: "Plaster Calculator/Quotes/QuoteTemplateCardGrid",
    component: QuoteTemplateCardGrid,
    tags: ["autodocs"],
    parameters: {
        docs: {
            description: {
                component:
                    "The team's templates as a row of selectable cards -- the default plus its variations, each showing who it applies to and its walls rate vs the default -- with a trailing dashed card to start a new variation.",
            },
        },
    },
    args: {
        templates: TEMPLATES,
        isMutating: false,
        companiesByTemplateId: COMPANIES_BY_TEMPLATE_ID,
        unassignedCompanyCount: 2,
        rateByTemplateId: RATE_BY_TEMPLATE_ID,
        onOpenTemplate: fn(),
        onCreateVariation: fn(),
    },
};

export default meta;

type Story = StoryObj<typeof QuoteTemplateCardGrid>;

/** The default template's card is selected -- the state shown when the panel first loads. */
export const DefaultSelected: Story = {
    args: {
        openTemplateId: "standard",
    },
};

/** A variation's card is selected instead. */
export const VariationSelected: Story = {
    args: {
        openTemplateId: "sterling",
    },
};

/** Only the default exists yet -- just its card plus the "+ New variation" card. */
export const DefaultOnly: Story = {
    args: {
        templates: [DEFAULT_TEMPLATE],
        openTemplateId: "standard",
        companiesByTemplateId: new Map(),
        rateByTemplateId: new Map([
            ["standard", { unit: "LM", unitPriceCents: 7400 }],
        ]),
    },
};
