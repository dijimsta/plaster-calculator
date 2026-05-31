import { Card } from "../src/card/card.component.tsx";
import { FullViewportHeightContainer } from "../src/full-viewport-height-container/full-viewport-height-container.component.tsx";

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
