import { Divider } from "@libraries/uikit-web";

import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof Divider> = {
    title: "UIKit/Layout/Divider",
    component: Divider,
    tags: ["autodocs"],
    parameters: {
        docs: {
            description: {
                component:
                    "Horizontal rule with an optional centred text label. Commonly used to separate primary and alternative sign-in options.",
            },
        },
    },
};

export default meta;

type Story = StoryObj<typeof Divider>;

export const WithLabel: Story = {
    args: {
        children: "or",
    },
};

export const WithLongLabel: Story = {
    args: {
        children: "continue with",
    },
};

export const WithoutLabel: Story = {
    args: {},
};
