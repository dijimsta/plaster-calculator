import { QuotesTable } from "@libraries/plaster-calculator-ui";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";

import {
    QUOTES_TABLE_POPULATED_ROWS,
    QUOTES_TABLE_SINGLE_ROW,
} from "./quotes-table.stubs.ts";

const meta: Meta<typeof QuotesTable> = {
    title: "Plaster Calculator/Quotes/QuotesTable",
    component: QuotesTable,
    tags: ["autodocs"],
    parameters: {
        docs: {
            description: {
                component:
                    "The all-quotes table: one row per quote, with a count line and empty state.",
            },
        },
    },
    args: {
        onOpen: fn(),
        onDownload: fn(),
    },
};

export default meta;

type Story = StoryObj<typeof QuotesTable>;

export const Populated: Story = {
    args: {
        rows: QUOTES_TABLE_POPULATED_ROWS,
    },
};

export const SingleRow: Story = {
    name: "Single row",
    args: {
        rows: QUOTES_TABLE_SINGLE_ROW,
    },
};

export const Empty: Story = {
    args: {
        rows: [],
    },
};
