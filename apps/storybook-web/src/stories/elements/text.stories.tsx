import { Box, Text } from "@libraries/uikit-web";

import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof Text> = {
    title: "UIKit/Elements/Text",
    component: Text,
    tags: ["autodocs"],
    parameters: {
        docs: {
            description: {
                component:
                    "Inline text primitive with constrained size and color variant props.",
            },
        },
    },
    argTypes: {
        size: {
            control: "select",
            options: ["xs", "sm", "base", "lg", "xl"],
        },
        variant: {
            control: "select",
            options: ["default", "muted"],
        },
    },
};

export default meta;

type Story = StoryObj<typeof Text>;

export const Default: Story = {
    args: {
        size: "base",
        variant: "default",
        children: "The quick brown fox",
    },
};

export const Sizes: Story = {
    render: () => (
        <Box direction="column" gap="sm">
            <Text size="xs">Extra small (xs)</Text>
            <Text size="sm">Small (sm)</Text>
            <Text size="base">Base (base)</Text>
            <Text size="lg">Large (lg)</Text>
            <Text size="xl">Extra large (xl)</Text>
        </Box>
    ),
};

export const Muted: Story = {
    render: () => (
        <Box direction="column" gap="sm">
            <Text size="xs" variant="muted">
                Extra small muted
            </Text>
            <Text size="sm" variant="muted">
                Small muted
            </Text>
            <Text size="base" variant="muted">
                Base muted
            </Text>
            <Text size="lg" variant="muted">
                Large muted
            </Text>
            <Text size="xl" variant="muted">
                Extra large muted
            </Text>
        </Box>
    ),
};
