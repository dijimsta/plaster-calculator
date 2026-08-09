import { Box, Checkbox, Label } from "@libraries/uikit-web";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";

const meta: Meta<typeof Checkbox> = {
    title: "UIKit/Forms/Checkbox",
    component: Checkbox,
    tags: ["autodocs"],
    args: {
        onChange: fn(),
    },
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
        label: "Receive product updates",
    },
};

export const Checked: Story = {
    args: {
        label: "Receive product updates",
        defaultChecked: true,
    },
};

export const WithLabel: Story = {
    render: (args) => (
        <Box align="center" gap="sm">
            <Checkbox {...args} id="checkbox-with-label" defaultChecked />
            <Label htmlFor="checkbox-with-label">Receive product updates</Label>
        </Box>
    ),
};

export const Sizes: Story = {
    render: (args) => (
        <Box align="center" gap="md">
            <Checkbox
                {...args}
                size="sm"
                label="Small checkbox"
                defaultChecked
            />
            <Checkbox
                {...args}
                size="md"
                label="Default checkbox"
                defaultChecked
            />
        </Box>
    ),
};

export const Disabled: Story = {
    render: (args) => (
        <Box align="center" gap="md">
            <Checkbox {...args} label="Disabled checkbox" disabled />
            <Checkbox
                {...args}
                label="Disabled checked checkbox"
                defaultChecked
                disabled
            />
        </Box>
    ),
};
