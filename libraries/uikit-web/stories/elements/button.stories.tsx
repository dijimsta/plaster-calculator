import { Button } from "../../src/elements/button/button.component.tsx";

import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof Button> = {
    title: "Elements/Button",
    component: Button,
    tags: ["autodocs"],
    parameters: {
        docs: {
            description: {
                component:
                    "Clickable action element. Supports four visual variants and an optional icon on either side.",
            },
        },
    },
    argTypes: {
        variant: {
            control: "select",
            options: ["primary", "secondary", "soft", "ghost", "link"],
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

export const Ghost: Story = {
    args: {
        variant: "ghost",
        children: "Button",
    },
};

export const Link: Story = {
    args: {
        variant: "link",
        children: "Page 3, north wall",
    },
};

export const Disabled: Story = {
    args: {
        variant: "primary",
        children: "Button",
        disabled: true,
    },
};
