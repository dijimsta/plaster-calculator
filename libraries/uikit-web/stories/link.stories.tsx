import { ButtonLink } from "../src/link/link.component.tsx";

import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof ButtonLink> = {
    title: "Components/ButtonLink",
    component: ButtonLink,
    tags: ["autodocs"],
    argTypes: {
        variant: {
            control: "select",
            options: ["primary", "secondary", "soft", "ghost"],
        },
    },
};

export default meta;

type Story = StoryObj<typeof ButtonLink>;

export const Primary: Story = {
    args: {
        variant: "primary",
        href: "#",
        children: "Go to App",
    },
};

export const Secondary: Story = {
    args: {
        variant: "secondary",
        href: "#",
        children: "Go to App",
    },
};

export const Soft: Story = {
    args: {
        variant: "soft",
        href: "#",
        children: "Go to App",
    },
};
