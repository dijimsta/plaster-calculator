import { Badge, Tabs } from "@libraries/uikit-web";
import { Clock, Folder, Users } from "lucide-react";

import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof Tabs> = {
    title: "UIKit/Navigation/Tabs",
    component: Tabs,
    tags: ["autodocs"],
    parameters: {
        docs: {
            description: {
                component:
                    "Navigation tabs for switching between related pages or views. Supports underline and pill treatments.",
            },
        },
    },
    argTypes: {
        variant: {
            control: "select",
            options: ["underline", "pills", "pills-on-gray"],
        },
        fullWidth: {
            control: "boolean",
        },
    },
};

export default meta;

type Story = StoryObj<typeof Tabs>;

export const Default: Story = {
    args: {
        variant: "underline",
    },
    render: (args) => (
        <Tabs {...args}>
            <Tabs.Item current>
                <a href="#">My account</a>
            </Tabs.Item>
            <Tabs.Item>
                <a href="#">Company</a>
            </Tabs.Item>
            <Tabs.Item>
                <a href="#">Team members</a>
            </Tabs.Item>
            <Tabs.Item>
                <a href="#">Billing</a>
            </Tabs.Item>
        </Tabs>
    ),
};

export const WithIconsAndBadges: Story = {
    render: () => (
        <Tabs>
            <Tabs.Item current>
                <a href="#">
                    <Folder aria-hidden="true" className="size-5" />
                    Projects
                    <Badge size="xs">12</Badge>
                </a>
            </Tabs.Item>
            <Tabs.Item>
                <a href="#">
                    <Users aria-hidden="true" className="size-5" />
                    Team
                    <Badge size="xs">4</Badge>
                </a>
            </Tabs.Item>
            <Tabs.Item>
                <a href="#">
                    <Clock aria-hidden="true" className="size-5" />
                    Recent
                </a>
            </Tabs.Item>
        </Tabs>
    ),
};

export const Pills: Story = {
    render: () => (
        <Tabs variant="pills">
            <Tabs.Item current>
                <a href="#">Applied</a>
            </Tabs.Item>
            <Tabs.Item>
                <a href="#">Phone screening</a>
            </Tabs.Item>
            <Tabs.Item>
                <a href="#">Interview</a>
            </Tabs.Item>
            <Tabs.Item>
                <a href="#">Offer</a>
            </Tabs.Item>
        </Tabs>
    ),
};

export const PillsOnGray: Story = {
    render: () => (
        <Tabs variant="pills-on-gray">
            <Tabs.Item current>
                <a href="#">Monthly</a>
            </Tabs.Item>
            <Tabs.Item>
                <a href="#">Yearly</a>
            </Tabs.Item>
        </Tabs>
    ),
};

export const FullWidth: Story = {
    render: () => (
        <Tabs fullWidth>
            <Tabs.Item current>
                <a href="#">Overview</a>
            </Tabs.Item>
            <Tabs.Item>
                <a href="#">Activity</a>
            </Tabs.Item>
            <Tabs.Item>
                <a href="#">Settings</a>
            </Tabs.Item>
        </Tabs>
    ),
};
