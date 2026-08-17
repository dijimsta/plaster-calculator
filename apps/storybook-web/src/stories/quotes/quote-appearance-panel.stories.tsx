import { DEFAULT_QUOTE_APPEARANCE } from "@libraries/plaster-calculator-common";
import { QuoteAppearancePanel } from "@libraries/plaster-calculator-ui";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { QueryClientProvider } from "@tanstack/react-query";

import {
    createQuoteAppearanceStoryQueryClient,
    QUOTE_APPEARANCE_PANEL_SAMPLE_APPEARANCE,
} from "../../stubs/quote-appearance-panel.stub.ts";

const meta: Meta<typeof QuoteAppearancePanel> = {
    title: "Plaster Calculator/Quotes/QuoteAppearancePanel",
    component: QuoteAppearancePanel,
    tags: ["autodocs"],
    parameters: {
        layout: "padded",
        docs: {
            description: {
                component:
                    "The team's quote appearance settings: letterhead, logo, accent colour, what a builder sees on a generated quote, and terms/footer, with a live preview built from the real QuoteDetailDocument. Binds straight to useQuoteAppearance() (@libraries/plaster-calculator-web-core) rather than accepting props, so these stories seed a dedicated QueryClient with sample data instead of passing args -- see ../../stubs/quote-appearance-panel.stub.ts. Saving, uploading, or removing a logo still calls the real service and is not exercised by these stories.",
            },
        },
    },
};

export default meta;

type Story = StoryObj<typeof QuoteAppearancePanel>;

export const EmptyState: Story = {
    name: "Nothing saved yet",
    parameters: {
        docs: {
            description: {
                story: "DEFAULT_QUOTE_APPEARANCE (WORK-202) -- a team that has never opened this panel. Every letterhead field is empty, no logo, and the preview on the right falls back to its own no-letterhead rendering.",
            },
        },
    },
    render: () => (
        <QueryClientProvider
            client={createQuoteAppearanceStoryQueryClient(
                DEFAULT_QUOTE_APPEARANCE,
            )}
        >
            <QuoteAppearancePanel />
        </QueryClientProvider>
    ),
};

export const FullyConfigured: Story = {
    name: "Every field populated",
    parameters: {
        docs: {
            description: {
                story: "Every letterhead field filled in, a non-default accent colour, all three optional document blocks on, and terms text. The logo is a previously-saved one (logoStoragePath set, not a fresh upload), so it renders as the saved-logo placeholder rather than a loaded image -- the same real state QuoteAppearanceLogoField renders for any team that saved its logo in an earlier session; see that component's own doc comment.",
            },
        },
    },
    render: () => (
        <QueryClientProvider
            client={createQuoteAppearanceStoryQueryClient(
                QUOTE_APPEARANCE_PANEL_SAMPLE_APPEARANCE,
            )}
        >
            <QuoteAppearancePanel />
        </QueryClientProvider>
    ),
};
