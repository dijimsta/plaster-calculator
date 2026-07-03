import { Box, IconTile } from "@libraries/uikit-web";
import { Calculator, Home, Layers, Ruler } from "lucide-react";

import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof IconTile> = {
    title: "UIKit/Elements/IconTile",
    component: IconTile,
    tags: ["autodocs"],
    parameters: {
        docs: {
            description: {
                component:
                    "Static rounded tile for displaying an icon. Use to represent a brand, category, or feature — distinct from Button, which is interactive.",
            },
        },
    },
    argTypes: {
        size: {
            control: "select",
            options: ["sm", "md"],
        },
        tone: {
            control: "select",
            options: ["dark", "indigo", "neutral"],
        },
    },
};

export default meta;

type Story = StoryObj<typeof IconTile>;

export const Default: Story = {
    render: (args) => (
        <IconTile {...args}>
            <Layers aria-hidden="true" />
        </IconTile>
    ),
    args: {
        size: "md",
        tone: "dark",
    },
};

export const Sizes: Story = {
    render: () => (
        <Box direction="row" align="center" gap="md">
            <IconTile size="sm" tone="dark">
                <Layers size={16} aria-hidden="true" />
            </IconTile>
            <IconTile size="md" tone="dark">
                <Layers aria-hidden="true" />
            </IconTile>
        </Box>
    ),
};

export const Tones: Story = {
    render: () => (
        <Box direction="row" align="center" gap="md">
            <IconTile tone="dark">
                <Layers aria-hidden="true" />
            </IconTile>
            <IconTile tone="indigo">
                <Layers aria-hidden="true" />
            </IconTile>
            <IconTile tone="neutral">
                <Layers aria-hidden="true" />
            </IconTile>
        </Box>
    ),
};

export const Icons: Story = {
    render: () => (
        <Box direction="row" align="center" gap="md">
            <IconTile tone="dark">
                <Layers aria-hidden="true" />
            </IconTile>
            <IconTile tone="dark">
                <Ruler aria-hidden="true" />
            </IconTile>
            <IconTile tone="dark">
                <Calculator aria-hidden="true" />
            </IconTile>
            <IconTile tone="neutral">
                <Home aria-hidden="true" />
            </IconTile>
        </Box>
    ),
};
