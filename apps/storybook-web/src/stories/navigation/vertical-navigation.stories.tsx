import { Badge, VerticalNavigation } from "@libraries/uikit-web";
import { FolderKanban, House, Settings, Users } from "lucide-react";

import type { Meta, StoryObj } from "@storybook/react-vite";

const meta: Meta<typeof VerticalNavigation> = {
    title: "UIKit/Navigation/Vertical Navigation",
    component: VerticalNavigation,
    tags: ["autodocs"],
    parameters: {
        docs: {
            description: {
                component:
                    "A composable vertical navigation list with optional sections and current-page styling.",
            },
        },
    },
};

export default meta;

type Story = StoryObj<typeof VerticalNavigation>;

export const Simple: Story = {
    render: () => (
        <VerticalNavigation aria-label="Primary navigation">
            <VerticalNavigation.Section>
                <VerticalNavigation.Item isCurrent>
                    <a href="#home">Home</a>
                </VerticalNavigation.Item>
                <VerticalNavigation.Item>
                    <a href="#accounts">Accounts</a>
                </VerticalNavigation.Item>
            </VerticalNavigation.Section>
        </VerticalNavigation>
    ),
};

export const WithIcons: Story = {
    render: () => (
        <VerticalNavigation aria-label="Primary navigation">
            <VerticalNavigation.Section>
                <VerticalNavigation.Item isCurrent>
                    <a href="#home">
                        <House />
                        Home
                    </a>
                </VerticalNavigation.Item>
                <VerticalNavigation.Item>
                    <a href="#accounts">
                        <Users />
                        Accounts
                    </a>
                </VerticalNavigation.Item>
            </VerticalNavigation.Section>
        </VerticalNavigation>
    ),
};

export const WithBadges: Story = {
    render: () => (
        <VerticalNavigation aria-label="Primary navigation">
            <VerticalNavigation.Section>
                <VerticalNavigation.Item isCurrent>
                    <a href="#home">
                        <House />
                        Home
                    </a>
                </VerticalNavigation.Item>
                <VerticalNavigation.Item
                    accessory={
                        <>
                            <Badge>4</Badge>
                            <Badge color="red">2</Badge>
                        </>
                    }
                >
                    <a href="#accounts">
                        <Users />
                        Accounts
                    </a>
                </VerticalNavigation.Item>
            </VerticalNavigation.Section>
        </VerticalNavigation>
    ),
};

export const WithSecondaryNavigation: Story = {
    render: () => (
        <VerticalNavigation aria-label="Application navigation">
            <VerticalNavigation.Section>
                <VerticalNavigation.Item isCurrent>
                    <a href="#home">
                        <House />
                        Home
                    </a>
                </VerticalNavigation.Item>
                <VerticalNavigation.Item>
                    <a href="#accounts">
                        <Users />
                        Accounts
                    </a>
                </VerticalNavigation.Item>
            </VerticalNavigation.Section>
            <VerticalNavigation.Section title="Workspace">
                <VerticalNavigation.Item>
                    <a href="#projects">
                        <FolderKanban />
                        Projects
                    </a>
                </VerticalNavigation.Item>
                <VerticalNavigation.Item>
                    <a href="#settings">
                        <Settings />
                        Settings
                    </a>
                </VerticalNavigation.Item>
            </VerticalNavigation.Section>
        </VerticalNavigation>
    ),
};
