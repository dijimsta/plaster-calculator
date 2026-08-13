import type { SalesStatus } from "@libraries/plaster-calculator-common";
import { Board, Box, Text } from "@libraries/uikit-web";
import type { ReactElement } from "react";

import { useProjectsTranslation } from "../i18n/index.ts";

import { salesStatusAccentColors } from "./project-kanban-board.styles.ts";
import type {
    ProjectKanbanBoardCard,
    ProjectKanbanBoardColumn,
} from "./project-kanban-board.types.ts";

export type ProjectKanbanBoardProps = {
    readonly columns: readonly ProjectKanbanBoardColumn[];
    readonly cards: readonly ProjectKanbanBoardCard[];
    readonly onOpen: (projectId: string) => void;
    readonly onMove: (projectId: string, salesStatus: SalesStatus) => void;
};

/** The projects board: one draggable card per project, grouped into columns by sales status. */
export function ProjectKanbanBoard({
    columns,
    cards,
    onOpen,
    onMove,
}: ProjectKanbanBoardProps): ReactElement {
    const { t } = useProjectsTranslation();

    return (
        <Board>
            {columns.map((column) => {
                const columnCards = cards.filter(
                    (card) => card.salesStatus === column.salesStatus,
                );
                return (
                    <Board.Column
                        key={column.salesStatus}
                        title={column.label}
                        count={columnCards.length}
                        accent={salesStatusAccentColors[column.salesStatus]}
                        emptyLabel={t("projectKanbanBoard.emptyColumn")}
                        onCardDropped={(cardId) =>
                            onMove(cardId, column.salesStatus)
                        }
                    >
                        {columnCards.map((card) => (
                            <Board.Card
                                key={card.id}
                                id={card.id}
                                onOpen={() => onOpen(card.id)}
                            >
                                <Box direction="column" gap="xs">
                                    <Text weight="semibold" truncate>
                                        {card.name}
                                    </Text>
                                    {card.address && (
                                        <Text
                                            size="sm"
                                            variant="muted"
                                            truncate
                                        >
                                            {card.address}
                                        </Text>
                                    )}
                                    <Text size="sm" variant="muted" truncate>
                                        {card.companyName ??
                                            t("projectKanbanBoard.noCompany")}
                                    </Text>
                                    <Text size="sm" variant="muted" truncate>
                                        {card.originalFileName}
                                    </Text>
                                    <Text size="xs" variant="muted">
                                        {t("projectKanbanBoard.updatedAt", {
                                            date: new Date(
                                                card.updatedAt,
                                            ).toLocaleDateString(),
                                        })}
                                    </Text>
                                </Box>
                            </Board.Card>
                        ))}
                    </Board.Column>
                );
            })}
        </Board>
    );
}
