import { ProjectKanbanBoard } from "@libraries/plaster-calculator-ui";
import type { ProjectKanbanBoardCard } from "@libraries/plaster-calculator-ui";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { fn } from "storybook/test";

const meta: Meta<typeof ProjectKanbanBoard> = {
    title: "Plaster Calculator/Projects/ProjectKanbanBoard",
    component: ProjectKanbanBoard,
    tags: ["autodocs"],
    parameters: {
        docs: {
            description: {
                component:
                    "A drag-and-drop board grouping projects into columns by sales status. Drag a card to a different column to move it, or click a card to open it.",
            },
        },
    },
    args: {
        columns: [
            { salesStatus: "QUOTING", label: "Quoting" },
            { salesStatus: "QUOTE_SUBMITTED", label: "Quote Submitted" },
            { salesStatus: "WON", label: "Won" },
            { salesStatus: "LOST", label: "Lost" },
        ],
        onOpen: fn(),
        onMove: fn(),
    },
};

export default meta;

type Story = StoryObj<typeof ProjectKanbanBoard>;

const CARDS: readonly ProjectKanbanBoardCard[] = [
    {
        id: "1",
        name: "Riverside Extension",
        address: "12 Riverside Dr, Northcote",
        companyName: "Northside Builders",
        originalFileName: "riverside-floorplan.pdf",
        updatedAt: "2026-08-10T09:00:00.000Z",
        salesStatus: "QUOTING",
    },
    {
        id: "2",
        name: "Hillcrest Reno",
        address: null,
        companyName: "Hillcrest Construction",
        originalFileName: "hillcrest-reno.pdf",
        updatedAt: "2026-08-11T14:30:00.000Z",
        salesStatus: "QUOTING",
    },
    {
        id: "3",
        name: "Oakwood Duplex",
        address: "4 Oakwood Ct, Preston",
        companyName: null,
        originalFileName: "oakwood-duplex-plan.pdf",
        updatedAt: "2026-08-09T11:15:00.000Z",
        salesStatus: "QUOTE_SUBMITTED",
    },
    {
        id: "4",
        name: "Maple Street Units",
        address: "8 Maple St, Coburg",
        companyName: "Maple Developments",
        originalFileName: "maple-street-units.pdf",
        updatedAt: "2026-08-05T08:45:00.000Z",
        salesStatus: "WON",
    },
];

export const Default: Story = {
    args: {
        cards: CARDS,
    },
};

export const EmptyColumns: Story = {
    args: {
        cards: [],
    },
};

export const Draggable: Story = {
    args: {
        cards: CARDS,
    },
    render: (args) => {
        const [cards, setCards] = useState<readonly ProjectKanbanBoardCard[]>(
            args.cards,
        );

        return (
            <ProjectKanbanBoard
                {...args}
                cards={cards}
                onMove={(projectId, salesStatus) => {
                    setCards((current) =>
                        current.map((card) =>
                            card.id === projectId
                                ? { ...card, salesStatus }
                                : card,
                        ),
                    );
                }}
            />
        );
    },
};
