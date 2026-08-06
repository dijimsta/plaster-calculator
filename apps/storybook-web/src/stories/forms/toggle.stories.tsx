import { Box, Label, Toggle } from "@libraries/uikit-web";
import { fn } from "storybook/test";

import type { Meta, StoryObj } from "@storybook/react-vite";

const meta: Meta<typeof Toggle> = {
    title: "UIKit/Forms/Toggle",
    component: Toggle,
    tags: ["autodocs"],
    args: {
        onChange: fn(),
    },
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
        label: "Enable notifications",
    },
};

export const Checked: Story = {
    args: {
        label: "Enable notifications",
        defaultChecked: true,
    },
};

export const WithLabel: Story = {
    render: (args) => (
        <Box align="center" gap="sm">
            <Toggle {...args} id="toggle-with-label" defaultChecked />
            <Label htmlFor="toggle-with-label">Enable notifications</Label>
        </Box>
    ),
};

export const Sizes: Story = {
    render: (args) => (
        <Box align="center" gap="md">
            <Toggle {...args} size="sm" label="Small toggle" defaultChecked />
            <Toggle {...args} size="md" label="Default toggle" defaultChecked />
        </Box>
    ),
};

export const Disabled: Story = {
    render: (args) => (
        <Box align="center" gap="md">
            <Toggle {...args} label="Disabled toggle" disabled />
            <Toggle
                {...args}
                label="Disabled checked toggle"
                defaultChecked
                disabled
            />
        </Box>
    ),
};
