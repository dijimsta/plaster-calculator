import { Button } from "../src/Button/Button";

import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof Button> = {
    title: "Components/Button",
    component: Button,
    tags: ["autodocs"],
    argTypes: {
        variant: {
            control: "select",
            options: ["primary", "secondary", "soft"],
        },
        iconPosition: {
            control: "select",
            options: ["left", "right"],
        },
    },
};

export default meta;

type Story = StoryObj<typeof Button>;

export const Primary: Story = {
    args: {
        variant: "primary",
        children: "Button",
    },
};

export const Secondary: Story = {
    args: {
        variant: "secondary",
        children: "Button",
    },
};

export const Soft: Story = {
    args: {
        variant: "soft",
        children: "Button",
    },
};

export const Disabled: Story = {
    args: {
        variant: "primary",
        children: "Button",
        disabled: true,
    },
};
