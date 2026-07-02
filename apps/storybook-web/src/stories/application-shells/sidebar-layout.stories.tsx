import {
    Button,
    Container,
    SidebarLayout,
    SidebarNavigation,
    VerticalNavigation,
} from "@libraries/uikit-web";
import { House, User, Users } from "lucide-react";

import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof SidebarLayout> = {
    title: "Application Shells/Sidebar Layout",
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
                </VerticalNavigation>
            </SidebarNavigation.Body>
            <SidebarNavigation.Footer>
                <VerticalNavigation aria-label="Account navigation">
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
