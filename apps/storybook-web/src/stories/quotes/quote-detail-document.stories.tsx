import { DEFAULT_QUOTE_APPEARANCE } from "@libraries/plaster-calculator-common";
import { QuoteDetailDocument } from "@libraries/plaster-calculator-ui";
import type { Meta, StoryObj } from "@storybook/react-vite";

import {
    QUOTE_DETAIL_DOCUMENT_APPEARANCE,
    QUOTE_DETAIL_DOCUMENT_APPEARANCE_ALL_BLOCKS,
    QUOTE_DETAIL_DOCUMENT_APPEARANCE_AMOUNTS_ONLY,
    QUOTE_DETAIL_DOCUMENT_APPEARANCE_LUMP_SUM,
    QUOTE_DETAIL_DOCUMENT_LINE_ITEMS,
    QUOTE_DETAIL_DOCUMENT_LONG_LINE_ITEMS,
    QUOTE_DETAIL_DOCUMENT_SCOPE_OF_WORK_TEXT,
    QUOTE_DETAIL_DOCUMENT_TAKEOFF_SUMMARY_TEXT,
} from "./quote-detail-document.stubs.ts";

const meta: Meta<typeof QuoteDetailDocument> = {
    title: "Plaster Calculator/Quotes/QuoteDetailDocument",
    component: QuoteDetailDocument,
    tags: ["autodocs"],
    parameters: {
        docs: {
            description: {
                component:
                    "The printable quote document: letterhead, an optional scope-of-work block, priced line items at the team's chosen pricing detail level, a subtotal/GST/total block, an optional take-off summary, terms, and an optional acceptance signature block.",
            },
        },
    },
    args: {
        reference: "Q-1042",
        projectName: "Riverside Extension",
        companyName: "Coastal Builders Pty Ltd",
        issuedAt: "2026-07-28T09:15:00.000Z",
        lineItems: QUOTE_DETAIL_DOCUMENT_LINE_ITEMS,
        appearance: QUOTE_DETAIL_DOCUMENT_APPEARANCE,
    },
};

export default meta;

type Story = StoryObj<typeof QuoteDetailDocument>;

export const FullLineItems: Story = {
    name: "Full line items",
};

export const AmountsOnly: Story = {
    name: "Amounts only — no rate/quantity breakdown",
    args: {
        appearance: QUOTE_DETAIL_DOCUMENT_APPEARANCE_AMOUNTS_ONLY,
    },
};

export const LumpSum: Story = {
    name: "Lump sum — single description and total",
    args: {
        appearance: QUOTE_DETAIL_DOCUMENT_APPEARANCE_LUMP_SUM,
    },
};

export const WithOptionalBlocks: Story = {
    name: "Scope of work, take-off summary, and signature block enabled",
    args: {
        appearance: QUOTE_DETAIL_DOCUMENT_APPEARANCE_ALL_BLOCKS,
        scopeOfWorkText: QUOTE_DETAIL_DOCUMENT_SCOPE_OF_WORK_TEXT,
        takeoffSummaryText: QUOTE_DETAIL_DOCUMENT_TAKEOFF_SUMMARY_TEXT,
    },
};

export const NoAppearanceSettings: Story = {
    name: "A team that has never opened the appearance settings tab",
    parameters: {
        docs: {
            description: {
                story: "`DEFAULT_QUOTE_APPEARANCE` (WORK-202) — every letterhead field is `null`, so the letterhead renders only the logo-less, address-less right-hand column. No terms text either, so that block is omitted entirely.",
            },
        },
    },
    args: {
        appearance: DEFAULT_QUOTE_APPEARANCE,
    },
};

export const LongQuoteSpillsToSecondPage: Story = {
    name: "Long quote, spills to second printed page",
    parameters: {
        docs: {
            description: {
                story: "40 line items — enough that, per WORK-118's print stylesheet (which avoids breaking inside a single row rather than blocking the whole document from breaking), printing this story spills onto a second page. Use the browser's print preview to see the page break.",
            },
        },
    },
    args: {
        lineItems: QUOTE_DETAIL_DOCUMENT_LONG_LINE_ITEMS,
    },
};
