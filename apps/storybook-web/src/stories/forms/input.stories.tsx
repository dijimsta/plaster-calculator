import { Input, Label } from "@libraries/uikit-web";
import { Search } from "lucide-react";

import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof Input> = {
    title: "Forms/Input",
    component: Input,
    tags: ["autodocs"],
    parameters: {
        docs: {
            description: {
                component:
                    "Text input field. Supports an optional leading icon and pairs with the Label component for accessible form layouts.",
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
