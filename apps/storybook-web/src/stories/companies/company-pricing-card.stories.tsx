import { CompanyPricingCard } from "@libraries/plaster-calculator-ui";
import type {
    CompanyPricingCardTemplate,
    CompanyRateItemSummary,
} from "@libraries/plaster-calculator-ui";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";

const TEMPLATES: readonly CompanyPricingCardTemplate[] = [
    { id: "standard", name: "Standard rates", isDefault: true },
    { id: "sterling", name: "Sterling Homes rates", isDefault: false },
];

const RATE_ITEMS: readonly CompanyRateItemSummary[] = [
    {
        id: "plasterboard-10mm",
        name: "10mm Plasterboard",
        unit: "LM",
        unitPriceCents: 6800,
        percentDelta: { kind: "decrease", percentDisplayText: "8.1%" },
    },
    {
        id: "plasterboard-13mm",
        name: "13mm Plasterboard",
        unit: "LM",
        unitPriceCents: 7100,
        percentDelta: { kind: "decrease", percentDisplayText: "8.1%" },
    },
    {
        id: "villaboard-9mm",
        name: "Villaboard 9mm",
        unit: "m²",
        unitPriceCents: 1150,
        percentDelta: { kind: "decrease", percentDisplayText: "8%" },
    },
];

const meta: Meta<typeof CompanyPricingCard> = {
    title: "Plaster Calculator/Companies/CompanyPricingCard",
    component: CompanyPricingCard,
    tags: ["autodocs"],
    parameters: {
        docs: {
            description: {
                component:
                    "The company detail page's 'Pricing' card: which rates variation prices this company's quotes, plus a preview of a few representative item rates and how they compare to the team's default. Purely presentational -- rateItems comes from useCompanyRateItemSummaries, called by the host page.",
            },
        },
    },
    args: {
        templates: TEMPLATES,
        editRatesHref: "/quotes/template/sterling",
        disabled: false,
        onChange: fn(),
    },
};

export default meta;

type Story = StoryObj<typeof CompanyPricingCard>;

export const NamedVariation: Story = {
    name: "Uses a named rates variation",
    args: {
        selectedTemplateId: "sterling",
        rateItems: RATE_ITEMS,
    },
};

export const UsesDefault: Story = {
    name: "Uses the team's default rates",
    args: {
        selectedTemplateId: null,
        rateItems: RATE_ITEMS.map((item) => ({
            ...item,
            percentDelta: undefined,
        })),
    },
};

export const Saving: Story = {
    name: "Saving the new selection",
    args: {
        selectedTemplateId: "sterling",
        rateItems: RATE_ITEMS,
        disabled: true,
    },
};
