import type { SalesStatus } from "@libraries/plaster-calculator-common";

/**
 * One card on the projects Kanban board. Deliberately decoupled from the
 * `ProjectSummary` service shape — a connected container in
 * `plaster-calculator-web` maps its data into this shape.
 */
export type ProjectKanbanBoardCard = {
    readonly id: string;
    readonly name: string;
    readonly address: string | null;
    readonly companyName: string | null;
    readonly originalFileName: string;
    /** ISO 8601 timestamp the project was last updated. */
    readonly updatedAt: string;
    readonly salesStatus: SalesStatus;
};

/** One column of the board, in display order. */
export type ProjectKanbanBoardColumn = {
    readonly salesStatus: SalesStatus;
    readonly label: string;
};
