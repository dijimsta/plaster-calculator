import { Box, Checkbox, Label } from "@libraries/uikit-web";

import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof Checkbox> = {
    title: "Forms/Checkbox",
    component: Checkbox,
    tags: ["autodocs"],
    parameters: {
        docs: {
            description: {
                component:
                    "Accessible checkbox for selecting one or more options in forms, lists, and settings.",
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

type Story = StoryObj<typeof Checkbox>;

export const Default: Story = {
    args: {
        "aria-label": "Receive product updates",
    },
};

export const Checked: Story = {
    args: {
        "aria-label": "Receive product updates",
        "defaultChecked": true,
    },
};

export const WithLabel: Story = {
    render: () => (
        <Box align="center" gap="sm">
            <Checkbox id="checkbox-with-label" defaultChecked />
            <Label htmlFor="checkbox-with-label">Receive product updates</Label>
        </Box>
    ),
};

export const Sizes: Story = {
    render: () => (
        <Box align="center" gap="md">
            <Checkbox size="sm" aria-label="Small checkbox" defaultChecked />
            <Checkbox size="md" aria-label="Default checkbox" defaultChecked />
        </Box>
    ),
};

export const Disabled: Story = {
    render: () => (
        <Box align="center" gap="md">
            <Checkbox aria-label="Disabled checkbox" disabled />
            <Checkbox
                aria-label="Disabled checked checkbox"
                defaultChecked
                disabled
            />
        </Box>
    ),
};
