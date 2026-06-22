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
        variant: {
            control: "select",
            options: ["default", "with-dot"],
        },
    },
};

export default meta;

type Story = StoryObj<typeof Badge>;

export const Default: Story = {
    args: {
        color: "gray",
        variant: "default",
        children: "Badge",
    },
};

export const WithDot: Story = {
    render: () => (
        <div className="flex flex-wrap gap-x-6 gap-y-4">
            <Badge color="gray" variant="with-dot">Badge</Badge>
            <Badge color="red" variant="with-dot">Badge</Badge>
            <Badge color="yellow" variant="with-dot">Badge</Badge>
            <Badge color="green" variant="with-dot">Badge</Badge>
            <Badge color="blue" variant="with-dot">Badge</Badge>
            <Badge color="indigo" variant="with-dot">Badge</Badge>
            <Badge color="purple" variant="with-dot">Badge</Badge>
            <Badge color="pink" variant="with-dot">Badge</Badge>
        </div>
    ),
};

export const WithRemove: Story = {
    render: () => (
        <div className="flex flex-wrap gap-x-6 gap-y-4">
            <Badge color="gray" onRemove={() => {}}>Badge</Badge>
            <Badge color="red" onRemove={() => {}}>Badge</Badge>
            <Badge color="yellow" onRemove={() => {}}>Badge</Badge>
            <Badge color="green" onRemove={() => {}}>Badge</Badge>
            <Badge color="blue" onRemove={() => {}}>Badge</Badge>
            <Badge color="indigo" onRemove={() => {}}>Badge</Badge>
            <Badge color="purple" onRemove={() => {}}>Badge</Badge>
            <Badge color="pink" onRemove={() => {}}>Badge</Badge>
        </div>
    ),
};
