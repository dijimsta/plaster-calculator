import { Badge } from "../src/badge/badge.component.tsx";

import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof Badge> = {
    title: "Elements/Badge",
    component: Badge,
    tags: ["autodocs"],
    parameters: {
        docs: {
            description: {
                component:
                    "Small label for status, category, or metadata. Supports eight color colors.",
            },
        },
    },
    argTypes: {
        color: {
            control: "select",
            options: [
                "gray",
                "red",
                "yellow",
                "green",
                "blue",
                "indigo",
                "purple",
                "pink",
            ],
        },
    },
};

export default meta;

type Story = StoryObj<typeof Badge>;

export const Gray: Story = {
    args: { color: "gray", children: "Badge" },
};

export const Red: Story = {
    args: { color: "red", children: "Badge" },
};

export const Yellow: Story = {
    args: { color: "yellow", children: "Badge" },
};

export const Green: Story = {
    args: { color: "green", children: "Badge" },
};

export const Blue: Story = {
    args: { color: "blue", children: "Badge" },
};

export const Indigo: Story = {
    args: { color: "indigo", children: "Badge" },
};

export const Purple: Story = {
    args: { color: "purple", children: "Badge" },
};

export const Pink: Story = {
    args: { color: "pink", children: "Badge" },
};

export const AllVariants: Story = {
    render: () => (
        <div className="flex flex-wrap gap-x-6 gap-y-4">
            <Badge color="gray">Badge</Badge>
            <Badge color="red">Badge</Badge>
            <Badge color="yellow">Badge</Badge>
            <Badge color="green">Badge</Badge>
            <Badge color="blue">Badge</Badge>
            <Badge color="indigo">Badge</Badge>
            <Badge color="purple">Badge</Badge>
            <Badge color="pink">Badge</Badge>
        </div>
    ),
};
