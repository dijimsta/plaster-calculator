import type { SalesStatus } from "@libraries/plaster-calculator-common";
import { Board, Box, Button, Text } from "@libraries/uikit-web";
import type { ReactElement } from "react";

import { useProjectsTranslation } from "../i18n/index.ts";

import { salesStatusAccentColors } from "./project-kanban-board.styles.ts";
import type {
    ProjectKanbanBoardCard,
    ProjectKanbanBoardColumn,
} from "./project-kanban-board.types.ts";

/**
 * Presentational cap on how many cards a column renders before showing the
 * "N more" affordance. Board columns render every card handed to them by an
 * unbounded query, unlike the paginated table view, so this bounds render
 * cost regardless of how many cards a caller passes in — it is not a data
 * pagination boundary.
 */
const MAX_CARDS_PER_COLUMN = 20;

export type ProjectKanbanBoardProps = {
    readonly columns: readonly ProjectKanbanBoardColumn[];
    readonly cards: readonly ProjectKanbanBoardCard[];
    readonly onOpen: (projectId: string) => void;
    readonly onMove: (projectId: string, salesStatus: SalesStatus) => void;
    /**
     * Called with a column's sales status when its "N more" affordance is
     * activated. Omit to render the affordance as a non-interactive count.
     */
    readonly onViewAllInTable?: (salesStatus: SalesStatus) => void;
};

/** The projects board: one draggable card per project, grouped into columns by sales status. */
export function ProjectKanbanBoard({
    columns,
    cards,
    onOpen,
    onMove,
    onViewAllInTable,
}: ProjectKanbanBoardProps): ReactElement {
    const { t } = useProjectsTranslation();

    return (
        <Board>
            {columns.map((column) => {
                const columnCards = cards.filter(
                    (card) => card.salesStatus === column.salesStatus,
                );
                const visibleCards = columnCards.slice(0, MAX_CARDS_PER_COLUMN);
                const hiddenCount = columnCards.length - visibleCards.length;
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
                        {visibleCards.map((card) => (
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
                        {hiddenCount > 0 &&
                            (onViewAllInTable ? (
                                <Button
                                    variant="link"
                                    size="small"
                                    flush
                                    onClick={() =>
                                        onViewAllInTable(column.salesStatus)
                                    }
                                >
                                    {t("projectKanbanBoard.moreCardsCount", {
                                        count: hiddenCount,
                                    })}{" "}
                                    — {t("projectKanbanBoard.viewAllInTable")}
                                </Button>
                            ) : (
                                <Text size="sm" variant="muted">
                                    {t("projectKanbanBoard.moreCardsCount", {
                                        count: hiddenCount,
                                    })}
                                </Text>
                            ))}
                    </Board.Column>
                );
            })}
        </Board>
    );
}
