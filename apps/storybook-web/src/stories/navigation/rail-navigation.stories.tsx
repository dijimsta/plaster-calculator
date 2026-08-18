import { Badge, RailNavigation } from "@libraries/uikit-web";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { FolderKanban, House, Settings, Users } from "lucide-react";

const meta: Meta<typeof RailNavigation> = {
    title: "UIKit/Navigation/Rail Navigation",
    component: RailNavigation,
    tags: ["autodocs"],
    parameters: {
        docs: {
            description: {
                component:
                    "An icon-only vertical navigation rail with optional sections and current-page styling. Fills whatever width its container provides — wrap it in a narrow container to render it as an icon rail.",
            },
        },
    },
};

export default meta;

type Story = StoryObj<typeof RailNavigation>;

export const Simple: Story = {
    render: () => (
        <div style={{ width: "4rem" }}>
            <RailNavigation label="Primary navigation">
                <RailNavigation.Section>
                    <RailNavigation.Item isCurrent>
                        <a href="#home">
                            <House aria-hidden="true" />
                            Home
                        </a>
                    </RailNavigation.Item>
                    <RailNavigation.Item>
                        <a href="#accounts">
                            <Users aria-hidden="true" />
                            Accounts
                        </a>
                    </RailNavigation.Item>
                </RailNavigation.Section>
            </RailNavigation>
        </div>
    ),
};

export const WithSections: Story = {
    render: () => (
        <div style={{ width: "4rem" }}>
            <RailNavigation label="Application navigation">
                <RailNavigation.Section title="Main">
                    <RailNavigation.Item isCurrent>
                        <a href="#home">
                            <House aria-hidden="true" />
                            Home
                        </a>
                    </RailNavigation.Item>
                    <RailNavigation.Item>
                        <a href="#accounts">
                            <Users aria-hidden="true" />
                            Accounts
                        </a>
                    </RailNavigation.Item>
                </RailNavigation.Section>
                <RailNavigation.Section title="Workspace">
                    <RailNavigation.Item>
                        <a href="#projects">
                            <FolderKanban aria-hidden="true" />
                            Projects
                        </a>
                    </RailNavigation.Item>
                    <RailNavigation.Item>
                        <a href="#settings">
                            <Settings aria-hidden="true" />
                            Settings
                        </a>
                    </RailNavigation.Item>
                </RailNavigation.Section>
            </RailNavigation>
        </div>
    ),
};

export const WithAccessory: Story = {
    render: () => (
        <div style={{ width: "4rem" }}>
            <RailNavigation label="Primary navigation">
                <RailNavigation.Section>
                    <RailNavigation.Item isCurrent>
                        <a href="#home">
                            <House aria-hidden="true" />
                            Home
                        </a>
                    </RailNavigation.Item>
                    <RailNavigation.Item
                        accessory={
                            <>
                                <Badge>4</Badge>
                                <Badge color="red">2</Badge>
                            </>
                        }
                    >
                        <a href="#accounts">
                            <Users aria-hidden="true" />
                            Accounts
                        </a>
                    </RailNavigation.Item>
                </RailNavigation.Section>
            </RailNavigation>
        </div>
    ),
};
