import {
    Box,
    Button,
    Container,
    SidebarLayout,
    SidebarNavigation,
    VerticalNavigation,
} from "@libraries/uikit-web";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { House, User, Users } from "lucide-react";
import { useState } from "react";

const meta: Meta<typeof SidebarLayout> = {
    title: "UIKit/Application Shells/Sidebar Layout",
    component: SidebarLayout,
    tags: ["autodocs"],
    parameters: {
        layout: "fullscreen",
        docs: {
            description: {
                component:
                    "A responsive application shell with a persistent desktop sidebar and accessible mobile navigation drawer.",
            },
        },
    },
};

export default meta;

type Story = StoryObj<typeof SidebarLayout>;

function ExampleSidebar(): React.ReactElement {
    return (
        <SidebarNavigation>
            <SidebarNavigation.Header>
                <strong>Plaster Calculator</strong>
            </SidebarNavigation.Header>
            <SidebarNavigation.Body>
                <VerticalNavigation label="Application navigation">
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
            </SidebarNavigation.Body>
            <SidebarNavigation.Footer>
                <VerticalNavigation label="Account navigation">
                    <VerticalNavigation.Section>
                        <VerticalNavigation.Item>
                            <a href="#profile">
                                <User />
                                Profile
                            </a>
                        </VerticalNavigation.Item>
                    </VerticalNavigation.Section>
                </VerticalNavigation>
                <Button variant="secondary">Logout</Button>
            </SidebarNavigation.Footer>
        </SidebarNavigation>
    );
}

export const Default: Story = {
    render: () => (
        <SidebarLayout>
            <SidebarLayout.Sidebar>
                <ExampleSidebar />
            </SidebarLayout.Sidebar>
            <SidebarLayout.Main>
                <Container>
                    <h1>Dashboard</h1>
                    <p>Your application content lives here.</p>
                </Container>
            </SidebarLayout.Main>
        </SidebarLayout>
    ),
};

export const Mobile: Story = {
    ...Default,
    parameters: {
        viewport: {
            defaultViewport: "mobile1",
        },
    },
};

export const CollapsibleSidebar: Story = {
    render: () => {
        function CollapsibleExampleSidebar() {
            const [isCollapsed, setIsCollapsed] = useState(false);

            return (
                <SidebarNavigation
                    collapsed={isCollapsed}
                    onCollapsedChange={setIsCollapsed}
                >
                    <SidebarNavigation.Header>
                        <Box
                            direction="row"
                            align="center"
                            justify={isCollapsed ? "center" : "between"}
                        >
                            {!isCollapsed && (
                                <strong>Plaster Calculator</strong>
                            )}
                            <SidebarNavigation.CollapseButton />
                        </Box>
                    </SidebarNavigation.Header>
                    <SidebarNavigation.Body>
                        <VerticalNavigation label="Application navigation">
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
                    </SidebarNavigation.Body>
                    <SidebarNavigation.Footer>
                        <VerticalNavigation label="Account navigation">
                            <VerticalNavigation.Section>
                                <VerticalNavigation.Item>
                                    <a href="#profile">
                                        <User />
                                        Profile
                                    </a>
                                </VerticalNavigation.Item>
                            </VerticalNavigation.Section>
                        </VerticalNavigation>
                        {!isCollapsed && (
                            <Button variant="secondary">Logout</Button>
                        )}
                    </SidebarNavigation.Footer>
                </SidebarNavigation>
            );
        }

        return (
            <SidebarLayout>
                <SidebarLayout.Sidebar>
                    <CollapsibleExampleSidebar />
                </SidebarLayout.Sidebar>
                <SidebarLayout.Main>
                    <Container>
                        <h1>Dashboard</h1>
                        <p>Your application content lives here.</p>
                    </Container>
                </SidebarLayout.Main>
            </SidebarLayout>
        );
    },
};
