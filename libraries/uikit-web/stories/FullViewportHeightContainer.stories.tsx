import { Card } from "../src/Card/Card";
import { FullViewportHeightContainer } from "../src/FullViewportHeightContainer/FullViewportHeightContainer";

import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof FullViewportHeightContainer> = {
    title: "Components/FullViewportHeightContainer",
    component: FullViewportHeightContainer,
    tags: ["autodocs"],
    parameters: {
        layout: "fullscreen",
    },
};

export default meta;

type Story = StoryObj<typeof FullViewportHeightContainer>;

export const Default: Story = {
    render: () => (
        <FullViewportHeightContainer>
            <Card>
                <Card.Title>Centered content</Card.Title>
            </Card>
        </FullViewportHeightContainer>
    ),
};
