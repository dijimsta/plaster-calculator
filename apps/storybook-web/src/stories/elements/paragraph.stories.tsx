import { Box, Paragraph } from "@libraries/uikit-web";

import type { Meta, StoryObj } from "@storybook/react-vite";

const meta: Meta<typeof Paragraph> = {
    title: "UIKit/Elements/Paragraph",
    component: Paragraph,
    tags: ["autodocs"],
    parameters: {
        docs: {
            description: {
                component:
                    "Block-level text primitive with constrained size and color variant props.",
            },
        },
    },
    argTypes: {
        textSize: {
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

type Story = StoryObj<typeof Paragraph>;

export const Default: Story = {
    args: {
        textSize: "base",
        variant: "default",
        children: "The quick brown fox jumps over the lazy dog.",
    },
};

export const Sizes: Story = {
    render: () => (
        <Box direction="column" gap="sm">
            <Paragraph textSize="xs">Extra small (xs)</Paragraph>
            <Paragraph textSize="sm">Small (sm)</Paragraph>
            <Paragraph textSize="base">Base (base)</Paragraph>
            <Paragraph textSize="lg">Large (lg)</Paragraph>
            <Paragraph textSize="xl">Extra large (xl)</Paragraph>
        </Box>
    ),
};

export const Muted: Story = {
    render: () => (
        <Box direction="column" gap="sm">
            <Paragraph textSize="xs" variant="muted">
                Extra small muted
            </Paragraph>
            <Paragraph textSize="sm" variant="muted">
                Small muted
            </Paragraph>
            <Paragraph textSize="base" variant="muted">
                Base muted
            </Paragraph>
            <Paragraph textSize="lg" variant="muted">
                Large muted
            </Paragraph>
            <Paragraph textSize="xl" variant="muted">
                Extra large muted
            </Paragraph>
        </Box>
    ),
};
