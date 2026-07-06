import { ProgressBar } from "@libraries/uikit-web";

import type { Meta, StoryObj } from "@storybook/react-vite";

const meta: Meta<typeof ProgressBar> = {
    title: "UIKit/Feedback/Progress Bar",
    component: ProgressBar,
    tags: ["autodocs"],
    parameters: {
        docs: {
            description: {
                component:
                    "A determinate progress indicator with optional label and percentage display.",
            },
        },
    },
    argTypes: {
        size: {
            control: "select",
            options: ["sm", "md"],
        },
    },
};

export default meta;

type Story = StoryObj<typeof ProgressBar>;

export const Default: Story = {
    args: {
        value: 42,
    },
};

export const WithLabelAndValue: Story = {
    args: {
        label: "Uploading questionnaire",
        value: 68,
        showValue: true,
    },
};

export const CustomRange: Story = {
    args: {
        label: "Questions answered",
        value: 7,
        max: 10,
        showValue: true,
        size: "md",
    },
};
