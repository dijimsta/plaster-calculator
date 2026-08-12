import { QuoteDetailDocument } from "@libraries/plaster-calculator-ui";
import type { Meta, StoryObj } from "@storybook/react-vite";

import {
    QUOTE_DETAIL_DOCUMENT_LINE_ITEMS,
    QUOTE_DETAIL_DOCUMENT_LONG_LINE_ITEMS,
} from "./quote-detail-document.stubs.ts";

const meta: Meta<typeof QuoteDetailDocument> = {
    title: "Plaster Calculator/Quotes/QuoteDetailDocument",
    component: QuoteDetailDocument,
    tags: ["autodocs"],
    parameters: {
        docs: {
            description: {
                component:
                    "The printable quote document: header, priced line items with their quantity provenance, and a subtotal/GST/total block.",
            },
        },
    },
    args: {
        reference: "Q-1042",
        projectName: "Riverside Extension",
        companyName: "Coastal Builders Pty Ltd",
        issuedAt: "2026-07-28T09:15:00.000Z",
        lineItems: QUOTE_DETAIL_DOCUMENT_LINE_ITEMS,
    },
};

export default meta;

type Story = StoryObj<typeof QuoteDetailDocument>;

export const Draft: Story = {
    args: {
        status: "draft",
    },
};

export const Sent: Story = {
    args: {
        status: "sent",
    },
};

export const Accepted: Story = {
    args: {
        status: "accepted",
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
        status: "sent",
        lineItems: QUOTE_DETAIL_DOCUMENT_LONG_LINE_ITEMS,
    },
};
