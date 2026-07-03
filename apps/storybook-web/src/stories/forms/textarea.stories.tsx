import { Box, Label, Text, Textarea } from "@libraries/uikit-web";

import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof Textarea> = {
    title: "UIKit/Forms/Textarea",
    component: Textarea,
    tags: ["autodocs"],
    parameters: {
        docs: {
            description: {
                component:
                    "Multi-line text input with consistent focus, disabled, and dark-mode styling. Supports all native textarea attributes and configurable resizing.",
            },
        },
    },
    decorators: [
        (Story) => (
            <Box direction="column" padding="lg">
                <Story />
            </Box>
        ),
    ],
};

export default meta;

type Story = StoryObj<typeof Textarea>;

export const Default: Story = {
    render: (args) => (
        <Box direction="column" gap="xs">
            <Label htmlFor="textarea-default">Comment</Label>
            <Textarea
                id="textarea-default"
                placeholder="Add your comment..."
                {...args}
            />
        </Box>
    ),
};

export const WithDescription: Story = {
    render: (args) => (
        <Box direction="column" gap="xs">
            <Label htmlFor="textarea-description">Project notes</Label>
            <Textarea
                id="textarea-description"
                aria-describedby="textarea-description-help"
                placeholder="Share any details the team should know..."
                {...args}
            />
            <Text id="textarea-description-help" size="sm" variant="muted">
                Include measurements, materials, or access requirements.
            </Text>
        </Box>
    ),
};

export const FixedSize: Story = {
    args: {
        "aria-label": "Message",
        "placeholder": "This textarea cannot be resized.",
        "resize": "none",
        "rows": 6,
    },
};

export const Disabled: Story = {
    render: (args) => (
        <Box direction="column" gap="xs">
            <Label htmlFor="textarea-disabled">Comment</Label>
            <Textarea
                id="textarea-disabled"
                defaultValue="Comments are closed for this project."
                disabled
                {...args}
            />
        </Box>
    ),
};
