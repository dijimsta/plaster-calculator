import { Box, Label, Toggle } from "@libraries/uikit-web";

import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof Toggle> = {
    title: "Forms/Toggle",
    component: Toggle,
    tags: ["autodocs"],
    parameters: {
        docs: {
            description: {
                component:
                    "Accessible on/off switch for settings, notifications, and feature flags.",
            },
        },
    },
    argTypes: {
        size: {
            control: "select",
            options: ["sm", "md"],
        },
    },
};

export default meta;

type Story = StoryObj<typeof Toggle>;

export const Default: Story = {
    args: {
        "aria-label": "Enable notifications",
    },
};

export const Checked: Story = {
    args: {
        "aria-label": "Enable notifications",
        "defaultChecked": true,
    },
};

export const WithLabel: Story = {
    render: () => (
        <Box align="center" gap="sm">
            <Toggle id="toggle-with-label" defaultChecked />
            <Label htmlFor="toggle-with-label">Enable notifications</Label>
        </Box>
    ),
};

export const Sizes: Story = {
    render: () => (
        <Box align="center" gap="md">
            <Toggle size="sm" aria-label="Small toggle" defaultChecked />
            <Toggle size="md" aria-label="Default toggle" defaultChecked />
        </Box>
    ),
};

export const Disabled: Story = {
    render: () => (
        <Box align="center" gap="md">
            <Toggle aria-label="Disabled toggle" disabled />
            <Toggle
                aria-label="Disabled checked toggle"
                defaultChecked
                disabled
            />
        </Box>
    ),
};
