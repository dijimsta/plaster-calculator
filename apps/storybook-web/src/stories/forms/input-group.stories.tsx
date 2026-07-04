import { Box, Input, InputGroup, Label } from "@libraries/uikit-web";

import type { Meta, StoryObj } from "@storybook/react-vite";

const meta: Meta<typeof InputGroup> = {
    title: "UIKit/Forms/Input Group",
    component: InputGroup,
    tags: ["autodocs"],
    parameters: {
        docs: {
            description: {
                component:
                    "Groups related input components with shared borders and coordinated focus states.",
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

type Story = StoryObj<typeof InputGroup>;

export const Vertical: Story = {
    render: (args) => (
        <Box direction="column" gap="xs">
            <Label>Contact details</Label>
            <InputGroup {...args}>
                <Input aria-label="Email address" placeholder="Email address" />
                <Input aria-label="Phone number" placeholder="Phone number" />
            </InputGroup>
        </Box>
    ),
};

export const Horizontal: Story = {
    args: {
        orientation: "horizontal",
    },
    render: (args) => (
        <Box direction="column" gap="xs">
            <Label>Card details</Label>
            <InputGroup {...args}>
                <Input aria-label="Card number" placeholder="Card number" />
                <Input aria-label="Expiry date" placeholder="MM / YY" />
                <Input aria-label="Security code" placeholder="CVC" />
            </InputGroup>
        </Box>
    ),
};

export const MixedStates: Story = {
    render: (args) => (
        <Box direction="column" gap="xs">
            <Label>Account</Label>
            <InputGroup {...args}>
                <Input defaultValue="jimmy@example.com" aria-label="Email" />
                <Input
                    aria-label="Username"
                    aria-invalid="true"
                    defaultValue="unavailable"
                />
                <Input
                    aria-label="Organisation"
                    disabled
                    value="Example Inc."
                />
            </InputGroup>
        </Box>
    ),
};
