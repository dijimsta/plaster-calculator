import { Card } from "../../src/layout/card/card.component.tsx";
import { GridList } from "../../src/layout/grid-list/grid-list.component.tsx";

import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof GridList> = {
    title: "Lists/GridList",
    component: GridList,
    tags: ["autodocs"],
    parameters: {
        docs: {
            description: {
                component:
                    "Responsive list layout for displaying repeated content in a grid.",
            },
        },
    },
    argTypes: {
        columns: {
            control: "select",
            options: [1, 2, 3, 4],
        },
        gap: {
            control: "select",
            options: ["sm", "md", "lg"],
        },
    },
};

export default meta;

type Story = StoryObj<typeof GridList>;

const items = [
    {
        title: "Base coat",
        description: "Two-pass skim coat for level five walls.",
    },
    {
        title: "Ceiling patch",
        description: "Feathered repair around recessed lighting.",
    },
    {
        title: "Wet area",
        description: "Moisture-ready surface preparation and finish.",
    },
    {
        title: "Corner bead",
        description: "External corner repair with reinforced edging.",
    },
    {
        title: "Texture match",
        description: "Blended finish across existing plaster surfaces.",
    },
    {
        title: "Final sand",
        description: "Ready-to-paint surface refinement and inspection.",
    },
];

export const Default: Story = {
    args: {
        columns: 3,
        gap: "md",
    },
    render: (args) => (
        <div className="mx-auto max-w-7xl">
            <GridList {...args}>
                {items.map((item) => (
                    <GridList.Item key={item.title}>
                        <Card>
                            <Card.Title>{item.title}</Card.Title>
                            <p className="text-center text-sm leading-6 text-gray-500">
                                {item.description}
                            </p>
                        </Card>
                    </GridList.Item>
                ))}
            </GridList>
        </div>
    ),
};

export const FourColumns: Story = {
    render: () => (
        <div className="mx-auto max-w-7xl">
            <GridList columns={4} gap="sm">
                {items.slice(0, 4).map((item) => (
                    <GridList.Item key={item.title}>
                        <Card>
                            <Card.Title>{item.title}</Card.Title>
                            <p className="text-center text-sm leading-6 text-gray-500">
                                {item.description}
                            </p>
                        </Card>
                    </GridList.Item>
                ))}
            </GridList>
        </div>
    ),
};
