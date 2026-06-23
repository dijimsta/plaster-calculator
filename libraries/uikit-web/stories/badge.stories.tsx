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
            options: ["flat", "flat-with-border", "pill", "pill-with-border"],
        },
        size: {
            control: "select",
            options: ["sm", "xs"],
        },
        dot: {
            control: "boolean",
        },
    },
};

export default meta;

type Story = StoryObj<typeof Badge>;

export const Default: Story = {
    args: {
        color: "gray",
        variant: "flat-with-border",
        children: "Badge",
    },
};

export const WithDot: Story = {
    render: () => (
        <div className="flex flex-wrap gap-x-6 gap-y-4">
            <Badge color="gray" dot>
                Badge
            </Badge>
            <Badge color="red" dot>
                Badge
            </Badge>
            <Badge color="yellow" dot>
                Badge
            </Badge>
            <Badge color="green" dot>
                Badge
            </Badge>
            <Badge color="blue" dot>
                Badge
            </Badge>
            <Badge color="indigo" dot>
                Badge
            </Badge>
            <Badge color="purple" dot>
                Badge
            </Badge>
            <Badge color="pink" dot>
                Badge
            </Badge>
        </div>
    ),
};

export const Flat: Story = {
    render: () => (
        <div className="flex flex-wrap gap-x-6 gap-y-4">
            <Badge color="gray" variant="flat">
                Badge
            </Badge>
            <Badge color="red" variant="flat">
                Badge
            </Badge>
            <Badge color="yellow" variant="flat">
                Badge
            </Badge>
            <Badge color="green" variant="flat">
                Badge
            </Badge>
            <Badge color="blue" variant="flat">
                Badge
            </Badge>
            <Badge color="indigo" variant="flat">
                Badge
            </Badge>
            <Badge color="purple" variant="flat">
                Badge
            </Badge>
            <Badge color="pink" variant="flat">
                Badge
            </Badge>
        </div>
    ),
};

export const FlatWithBorder: Story = {
    render: () => (
        <div className="flex flex-wrap gap-x-6 gap-y-4">
            <Badge color="gray" variant="flat-with-border">
                Badge
            </Badge>
            <Badge color="red" variant="flat-with-border">
                Badge
            </Badge>
            <Badge color="yellow" variant="flat-with-border">
                Badge
            </Badge>
            <Badge color="green" variant="flat-with-border">
                Badge
            </Badge>
            <Badge color="blue" variant="flat-with-border">
                Badge
            </Badge>
            <Badge color="indigo" variant="flat-with-border">
                Badge
            </Badge>
            <Badge color="purple" variant="flat-with-border">
                Badge
            </Badge>
            <Badge color="pink" variant="flat-with-border">
                Badge
            </Badge>
        </div>
    ),
};

export const Pill: Story = {
    render: () => (
        <div className="flex flex-wrap gap-x-6 gap-y-4">
            <Badge color="gray" variant="pill">
                Badge
            </Badge>
            <Badge color="red" variant="pill">
                Badge
            </Badge>
            <Badge color="yellow" variant="pill">
                Badge
            </Badge>
            <Badge color="green" variant="pill">
                Badge
            </Badge>
            <Badge color="blue" variant="pill">
                Badge
            </Badge>
            <Badge color="indigo" variant="pill">
                Badge
            </Badge>
            <Badge color="purple" variant="pill">
                Badge
            </Badge>
            <Badge color="pink" variant="pill">
                Badge
            </Badge>
        </div>
    ),
};

export const PillWithBorder: Story = {
    render: () => (
        <div className="flex flex-wrap gap-x-6 gap-y-4">
            <Badge color="gray" variant="pill-with-border">
                Badge
            </Badge>
            <Badge color="red" variant="pill-with-border">
                Badge
            </Badge>
            <Badge color="yellow" variant="pill-with-border">
                Badge
            </Badge>
            <Badge color="green" variant="pill-with-border">
                Badge
            </Badge>
            <Badge color="blue" variant="pill-with-border">
                Badge
            </Badge>
            <Badge color="indigo" variant="pill-with-border">
                Badge
            </Badge>
            <Badge color="purple" variant="pill-with-border">
                Badge
            </Badge>
            <Badge color="pink" variant="pill-with-border">
                Badge
            </Badge>
        </div>
    ),
};

export const WithRemove: Story = {
    render: () => (
        <div className="flex flex-wrap gap-x-6 gap-y-4">
            <Badge color="gray" onRemove={() => {}}>
                Badge
            </Badge>
            <Badge color="red" onRemove={() => {}}>
                Badge
            </Badge>
            <Badge color="yellow" onRemove={() => {}}>
                Badge
            </Badge>
            <Badge color="green" onRemove={() => {}}>
                Badge
            </Badge>
            <Badge color="blue" onRemove={() => {}}>
                Badge
            </Badge>
            <Badge color="indigo" onRemove={() => {}}>
                Badge
            </Badge>
            <Badge color="purple" onRemove={() => {}}>
                Badge
            </Badge>
            <Badge color="pink" onRemove={() => {}}>
                Badge
            </Badge>
        </div>
    ),
};
