import { Box, Input, Label } from "@libraries/uikit-web";
import { Search } from "lucide-react";
import { fn } from "storybook/test";

import type { Meta, StoryObj } from "@storybook/react-vite";

const meta: Meta<typeof Input> = {
    title: "UIKit/Forms/Input",
    component: Input,
    tags: ["autodocs"],
    args: {
        onChange: fn(),
        shape: "default",
        variant: "default",
    },
    parameters: {
        docs: {
            description: {
                component:
                    "Text input field with configurable shape and visual treatment. Supports leading icons and add-ons, and pairs with Label for accessible form layouts.",
            },
        },
    },
    decorators: [
        (Story) => (
            <div className="p-8 max-w-xs">
                <Story />
            </div>
        ),
    ],
};

export default meta;

type Story = StoryObj<typeof Input>;

export const Default: Story = {
    render: (args) => (
        <div className="grid gap-1.5">
            <Label htmlFor="input-default">Email</Label>
            <Input
                id="input-default"
                type="email"
                placeholder="you@example.com"
                {...args}
            />
        </div>
    ),
};

export const WithoutLabel: Story = {
    args: {
        type: "text",
        placeholder: "Search...",
    },
};

export const WithLeadingIcon: Story = {
    render: (args) => (
        <div className="grid gap-1.5">
            <Label htmlFor="input-search">Search</Label>
            <Input
                id="input-search"
                type="text"
                placeholder="Search..."
                leadingIcon={
                    <Search
                        size={16}
                        className="text-gray-400 dark:text-gray-500"
                    />
                }
                {...args}
            />
        </div>
    ),
};

export const WithLeadingAddon: Story = {
    render: (args) => (
        <Box direction="column" gap="xs">
            <Label htmlFor="input-url">Website</Label>
            <Input
                id="input-url"
                leadingAddon="https://"
                placeholder="www.example.com"
                {...args}
            />
        </Box>
    ),
};

export const WithLeadingAndTrailingAddons: Story = {
    render: (args) => (
        <Box direction="column" gap="xs">
            <Label htmlFor="input-price">Price</Label>
            <Input
                id="input-price"
                leadingAddon="$"
                trailingAddon="AUD"
                inputMode="decimal"
                placeholder="0.00"
                {...args}
            />
        </Box>
    ),
};

export const Pill: Story = {
    args: {
        "aria-label": "Search",
        "placeholder": "Search...",
        "shape": "pill",
        "type": "search",
    },
};

export const GrayBackgroundWithBottomBorder: Story = {
    args: {
        variant: "subtle",
    },
    render: (args) => (
        <Box direction="column" gap="xs">
            <Label htmlFor="input-subtle">Email</Label>
            <Input
                id="input-subtle"
                type="email"
                placeholder="you@example.com"
                {...args}
            />
        </Box>
    ),
};

export const Disabled: Story = {
    render: (args) => (
        <div className="grid gap-1.5">
            <Label htmlFor="input-disabled">Email</Label>
            <Input
                id="input-disabled"
                type="email"
                value="you@example.com"
                disabled
                {...args}
            />
        </div>
    ),
};
