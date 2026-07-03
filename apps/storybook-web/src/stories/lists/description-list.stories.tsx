import { DescriptionList } from "@libraries/uikit-web";

import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof DescriptionList> = {
    title: "UIKit/Lists/Description List",
    component: DescriptionList,
    tags: ["autodocs"],
    parameters: {
        docs: {
            description: {
                component:
                    "A compact semantic list for displaying related terms and details.",
            },
        },
    },
};

export default meta;

type Story = StoryObj<typeof DescriptionList>;

export const Default: Story = {
    args: {
        items: [
            { term: "Width", details: "1920 px" },
            { term: "Height", details: "1080 px" },
            { term: "Rotation", details: "0°" },
        ],
    },
};
