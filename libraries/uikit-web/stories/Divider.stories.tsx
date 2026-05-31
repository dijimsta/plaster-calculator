import { Divider } from "../src/divider/divider.component.tsx";

import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof Divider> = {
    title: "Components/Divider",
    component: Divider,
    tags: ["autodocs"],
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
