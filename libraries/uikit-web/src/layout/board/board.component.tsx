"use client";

import clsx from "clsx";
import { Children, useState } from "react";
import type { DragEvent, ReactElement, ReactNode } from "react";

import { Badge, type BadgeColor } from "../../elements/badge/index.ts";

import { styles } from "./board.styles.ts";

const CARD_ID_DATA_FORMAT = "application/x-uikit-board-card-id";

export type BoardProps = {
    readonly children?: ReactNode;
};

/** A horizontally scrolling row of drag-and-drop columns. See {@link Board.Column} and {@link Board.Card}. */
export function Board({ children }: BoardProps): ReactElement {
    return (
        <div role="list" className={styles.root}>
            {children}
        </div>
    );
}

export namespace Board {
    export type ColumnProps = {
        readonly title: string;
        readonly count: number;
        /** Color of the stage dot shown before the title. */
        readonly accent?: BadgeColor;
        /** Shown in the column body when it has no cards. */
        readonly emptyLabel: string;
        /** Called with the dragged card's id when a card is dropped on this column. */
        readonly onCardDropped: (cardId: string) => void;
        readonly children?: ReactNode;
    };

    export function Column({
        title,
        count,
        accent = "gray",
        emptyLabel,
        onCardDropped,
        children,
    }: ColumnProps): ReactElement {
        const [dropActive, setDropActive] = useState(false);
        const isEmpty = Children.count(children) === 0;

        return (
            <div
                role="listitem"
                className={clsx(
                    styles.column.root,
                    dropActive && styles.column.dropActive,
                )}
                onDragOver={(event) => {
                    if (!event.dataTransfer.types.includes(CARD_ID_DATA_FORMAT))
                        return;
                    event.preventDefault();
                    setDropActive(true);
                }}
                onDragLeave={() => setDropActive(false)}
                onDrop={(event) => {
                    const cardId =
                        event.dataTransfer.getData(CARD_ID_DATA_FORMAT);
                    setDropActive(false);
                    if (cardId) onCardDropped(cardId);
                }}
            >
                <div className={styles.column.header}>
                    <Badge dot color={accent}>
                        {title}
                    </Badge>
                    <Badge size="xs" color="gray">
                        {count}
                    </Badge>
                </div>
                <div role="list" className={styles.column.body}>
                    {isEmpty ? (
                        <p className={styles.column.empty}>{emptyLabel}</p>
                    ) : (
                        children
                    )}
                </div>
            </div>
        );
    }

    export type CardProps = {
        readonly id: string;
        /** Called when the card is activated by click or keyboard. */
        readonly onOpen?: () => void;
        readonly children?: ReactNode;
    };

    export function Card({ id, onOpen, children }: CardProps): ReactElement {
        const [dragging, setDragging] = useState(false);

        return (
            <div
                role="listitem"
                draggable
                tabIndex={onOpen ? 0 : undefined}
                onClick={onOpen}
                onKeyDown={(event) => {
                    if (!onOpen) return;
                    if (event.key !== "Enter" && event.key !== " ") return;
                    event.preventDefault();
                    onOpen();
                }}
                onDragStart={(event: DragEvent<HTMLDivElement>) => {
                    event.dataTransfer.setData(CARD_ID_DATA_FORMAT, id);
                    event.dataTransfer.effectAllowed = "move";
                    setDragging(true);
                }}
                onDragEnd={() => setDragging(false)}
                className={clsx(
                    styles.card.root,
                    dragging && styles.card.dragging,
                )}
            >
                {children}
            </div>
        );
    }
}
