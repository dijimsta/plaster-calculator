import { Ruler, SlidersHorizontal } from "lucide-react";

import {
    DescriptionList,
    InspectorPanel,
    InspectorSection,
} from "../../src/index.ts";

import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof InspectorPanel> = {
    title: "Layout/Inspector Panel",
    component: InspectorPanel,
    tags: ["autodocs"],
    parameters: {
        docs: {
            description: {
                component:
                    "A compact, independently collapsible panel for inspecting properties and settings.",
            },
        },
    },
};

export default meta;

type Story = StoryObj<typeof InspectorPanel>;

const properties = [
    { term: "Width", details: "1920 px" },
    { term: "Height", details: "1080 px" },
    { term: "Rotation", details: "0°" },
] as const;

export const Default: Story = {
    render: () => (
        <InspectorPanel>
            <InspectorSection
                title="Properties"
                icon={<SlidersHorizontal />}
                defaultOpen
            >
                <DescriptionList items={properties} />
            </InspectorSection>
            <InspectorSection
                title="Scale"
                icon={<Ruler />}
                status={{ label: "Calibrated", tone: "ok" }}
                defaultOpen
            >
                <DescriptionList
                    items={[{ term: "Drawing scale", details: "1:100" }]}
                />
            </InspectorSection>
        </InspectorPanel>
    ),
};
