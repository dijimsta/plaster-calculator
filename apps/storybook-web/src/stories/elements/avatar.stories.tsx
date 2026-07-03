import { Avatar } from "@libraries/uikit-web";

import type { Meta, StoryObj } from "@storybook/react";

const SAMPLE_IMAGE =
    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80";

const meta: Meta<typeof Avatar> = {
    title: "UIKit/Elements/Avatar",
    component: Avatar,
    tags: ["autodocs"],
    parameters: {
        docs: {
            description: {
                component:
                    "User representation shown as an image, initials, or placeholder icon. Supports five sizes, two shapes, and four presence statuses.",
            },
        },
    },
    argTypes: {
        size: {
            control: "select",
            options: ["xs", "sm", "md", "lg", "xl"],
        },
        shape: {
            control: "select",
            options: ["circular", "square"],
        },
        color: {
            control: "select",
            options: [
                "gray",
                "red",
                "orange",
                "amber",
                "green",
                "blue",
                "indigo",
                "purple",
                "pink",
            ],
        },
        status: {
            control: "select",
            options: ["online", "offline", "away", "busy"],
        },
    },
};

export default meta;

type Story = StoryObj<typeof Avatar>;

export const Default: Story = {
    args: {
        src: SAMPLE_IMAGE,
        alt: "Tom Cook",
    },
};

export const WithInitials: Story = {
    args: {
        initials: "TC",
        color: "indigo",
    },
};

export const WithPlaceholder: Story = {};

export const Sizes: Story = {
    render: () => (
        <div className="flex items-end gap-4">
            <Avatar src={SAMPLE_IMAGE} alt="Avatar" size="xs" />
            <Avatar src={SAMPLE_IMAGE} alt="Avatar" size="sm" />
            <Avatar src={SAMPLE_IMAGE} alt="Avatar" size="md" />
            <Avatar src={SAMPLE_IMAGE} alt="Avatar" size="lg" />
            <Avatar src={SAMPLE_IMAGE} alt="Avatar" size="xl" />
        </div>
    ),
};

export const Shapes: Story = {
    render: () => (
        <div className="flex items-center gap-6">
            <Avatar src={SAMPLE_IMAGE} alt="Circular" shape="circular" />
            <Avatar src={SAMPLE_IMAGE} alt="Square" shape="square" />
        </div>
    ),
};

export const InitialsColors: Story = {
    render: () => (
        <div className="flex flex-wrap gap-4">
            <Avatar initials="GR" color="gray" />
            <Avatar initials="RE" color="red" />
            <Avatar initials="OR" color="orange" />
            <Avatar initials="AM" color="amber" />
            <Avatar initials="GR" color="green" />
            <Avatar initials="BL" color="blue" />
            <Avatar initials="IN" color="indigo" />
            <Avatar initials="PU" color="purple" />
            <Avatar initials="PI" color="pink" />
        </div>
    ),
};

export const WithStatus: Story = {
    render: () => (
        <div className="flex items-center gap-6">
            <Avatar src={SAMPLE_IMAGE} alt="Online" status="online" />
            <Avatar src={SAMPLE_IMAGE} alt="Away" status="away" />
            <Avatar src={SAMPLE_IMAGE} alt="Busy" status="busy" />
            <Avatar src={SAMPLE_IMAGE} alt="Offline" status="offline" />
        </div>
    ),
};

export const SquareWithStatus: Story = {
    render: () => (
        <div className="flex items-center gap-6">
            <Avatar
                src={SAMPLE_IMAGE}
                alt="Online"
                shape="square"
                status="online"
            />
            <Avatar
                src={SAMPLE_IMAGE}
                alt="Away"
                shape="square"
                status="away"
            />
            <Avatar
                src={SAMPLE_IMAGE}
                alt="Busy"
                shape="square"
                status="busy"
            />
            <Avatar
                src={SAMPLE_IMAGE}
                alt="Offline"
                shape="square"
                status="offline"
            />
        </div>
    ),
};

export const AllVariants: Story = {
    render: () => (
        <div className="flex flex-col gap-8">
            <div className="flex items-center gap-4">
                <Avatar src={SAMPLE_IMAGE} alt="Image" size="md" />
                <Avatar initials="TC" color="indigo" size="md" />
                <Avatar size="md" />
            </div>
            <div className="flex items-center gap-4">
                <Avatar
                    src={SAMPLE_IMAGE}
                    alt="Image square"
                    size="md"
                    shape="square"
                />
                <Avatar initials="TC" color="indigo" size="md" shape="square" />
                <Avatar size="md" shape="square" />
            </div>
        </div>
    ),
};
