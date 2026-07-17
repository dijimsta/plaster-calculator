import { Stats } from "@libraries/uikit-web";
import { Banknote, Calculator, ClipboardCheck } from "lucide-react";

import type { Meta, StoryObj } from "@storybook/react-vite";

const meta: Meta<typeof Stats> = {
    title: "UIKit/Data Display/Stats",
    component: Stats,
    tags: ["autodocs"],
    parameters: {
        docs: {
            description: {
                component:
                    "A responsive stat summary for analytics, metrics, and financial information.",
            },
        },
    },
    argTypes: {
        columns: {
            control: "select",
            options: [1, 2, 3, 4],
        },
        variant: {
            control: "select",
            options: ["simple", "cards", "shared-borders"],
        },
    },
};

export default meta;

type Story = StoryObj<typeof Stats>;

const projectStats = [
    {
        id: "total-cost",
        label: "Estimated cost",
        value: "$18,240",
        trend: {
            direction: "up",
            value: "12%",
            label: "from previous revision",
        },
    },
    {
        id: "labour-hours",
        label: "Labour hours",
        value: "286",
        trend: {
            direction: "down",
            value: "4.5%",
            label: "after scope review",
        },
    },
    {
        id: "margin",
        label: "Projected margin",
        value: "22.8%",
        trend: {
            value: "No change",
            label: "since yesterday",
        },
    },
] as const;

export const Simple: Story = {
    args: {
        items: projectStats,
    },
};

export const InCards: Story = {
    args: {
        items: [
            {
                id: "completed-quotes",
                label: "Completed quotes",
                value: "48",
                description: "Ready for client review",
                icon: <ClipboardCheck />,
            },
            {
                id: "material-total",
                label: "Material total",
                value: "$9,860",
                description: "Includes plasterboard and compounds",
                icon: <Banknote />,
            },
            {
                id: "calculations",
                label: "Calculations",
                value: "312",
                description: "Across active project templates",
                icon: <Calculator />,
            },
        ],
        variant: "cards",
    },
};

export const SharedBorders: Story = {
    args: {
        items: projectStats,
        variant: "shared-borders",
    },
};

export const WithColorTones: Story = {
    args: {
        items: [
            {
                id: "total",
                label: "Total questionnaires",
                value: "24",
            },
            {
                id: "in-progress",
                label: "In progress",
                value: "9",
                valueTone: "info",
            },
            {
                id: "completed",
                label: "Completed",
                value: "15",
                valueTone: "success",
            },
        ],
    },
};
