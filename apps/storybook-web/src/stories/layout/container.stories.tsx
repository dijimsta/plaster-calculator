import { Card, Container } from "@libraries/uikit-web";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta: Meta<typeof Container> = {
    title: "UIKit/Layout/Container",
    component: Container,
    tags: ["autodocs"],
    parameters: {
        layout: "fullscreen",
        docs: {
            description: {
                component:
                    "A responsive content container with configurable width constraints and equal padding on all sides.",
            },
        },
    },
};

export default meta;

type Story = StoryObj<typeof Container>;

export const Wide: Story = {
    render: () => (
        <Container>
            <Card>
                <Card.Title>Project summary</Card.Title>
                <Card.Footer>Container content</Card.Footer>
            </Card>
        </Container>
    ),
};

export const Narrow: Story = {
    render: () => (
        <Container size="narrow">
            <Card>
                <Card.Title>Project summary</Card.Title>
                <Card.Footer>Container content</Card.Footer>
            </Card>
        </Container>
    ),
};

export const ResponsiveBreakpoint: Story = {
    render: () => (
        <Container size="responsive" padding="responsive">
            <Card>
                <Card.Title>Project summary</Card.Title>
                <Card.Footer>Container content</Card.Footer>
            </Card>
        </Container>
    ),
};
