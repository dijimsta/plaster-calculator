import { Button } from "../src/Button/Button";
import { Card } from "../src/Card/Card";

import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof Card> = {
    title: "Components/Card",
    component: Card,
    tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof Card>;

export const Default: Story = {
    render: () => (
        <Card>
            <Card.Title>Log in to Famsimile</Card.Title>
            <Card.ButtonGroup>
                <Button variant="secondary">Continue with Google</Button>
                <Button variant="secondary">Continue with GitHub</Button>
            </Card.ButtonGroup>
            <Card.Footer>
                By continuing, you agree to our <a href="#">Terms of Service</a>{" "}
                and <a href="#">Privacy Policy</a>.
            </Card.Footer>
        </Card>
    ),
};

export const TitleOnly: Story = {
    render: () => (
        <Card>
            <Card.Title>Card Title</Card.Title>
        </Card>
    ),
};

export const WithFooterOnly: Story = {
    render: () => (
        <Card>
            <Card.Footer>
                Footer text with an <a href="#">inline link</a>.
            </Card.Footer>
        </Card>
    ),
};
