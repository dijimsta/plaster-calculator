import clsx from "clsx";
import { ChevronLeft, ChevronRight, Ellipsis } from "lucide-react";

import { styles } from "./pagination.styles.ts";

import type { HTMLAttributes, ReactElement } from "react";

const EDGE_PAGE_COUNT = 2;
const SURROUNDING_PAGE_COUNT = 1;

type PaginationItem = number | "ellipsis";

export type PaginationProps = Omit<HTMLAttributes<HTMLElement>, "onChange"> & {
    /** The currently selected page, using one-based numbering. */
    readonly page: number;
    /** The total number of pages available. Values below one are treated as one. */
    readonly pageCount: number;
    /** Called with the selected one-based page number. */
    readonly onPageChange: (page: number) => void;
};

function createRange(start: number, end: number): readonly number[] {
    return Array.from({ length: end - start + 1 }, (_, index) => start + index);
}

function getPaginationItems(
    page: number,
    pageCount: number,
): readonly PaginationItem[] {
    const visiblePageCount =
        EDGE_PAGE_COUNT * 2 + SURROUNDING_PAGE_COUNT * 2 + 1;

    if (pageCount <= visiblePageCount) {
        return createRange(1, pageCount);
    }

    const middleStart = Math.max(
        EDGE_PAGE_COUNT + 1,
        page - SURROUNDING_PAGE_COUNT,
    );
    const middleEnd = Math.min(
        pageCount - EDGE_PAGE_COUNT,
        page + SURROUNDING_PAGE_COUNT,
    );
    const leadingItems: readonly PaginationItem[] = [
        ...createRange(1, EDGE_PAGE_COUNT),
        ...(middleStart > EDGE_PAGE_COUNT + 1 ? ["ellipsis" as const] : []),
    ];
    const trailingItems: readonly PaginationItem[] = [
        ...(middleEnd < pageCount - EDGE_PAGE_COUNT
            ? ["ellipsis" as const]
            : []),
        ...createRange(pageCount - EDGE_PAGE_COUNT + 1, pageCount),
    ];

    return [
        ...leadingItems,
        ...createRange(middleStart, middleEnd),
        ...trailingItems,
    ];
}

export function Pagination({
    page,
    pageCount,
    onPageChange,
    className,
    "aria-label": ariaLabel = "Pagination",
    ...props
}: PaginationProps): ReactElement {
    const normalizedPageCount = Math.max(1, Math.floor(pageCount));
    const currentPage = Math.min(
        Math.max(1, Math.floor(page)),
        normalizedPageCount,
    );
    const items = getPaginationItems(currentPage, normalizedPageCount);
    const isFirstPage = currentPage === 1;
    const isLastPage = currentPage === normalizedPageCount;

    return (
        <nav
            aria-label={ariaLabel}
            className={clsx(styles.root, className)}
            {...props}
        >
            <div className={clsx(styles.mobileActions)}>
                <button
                    type="button"
                    className={clsx(styles.mobileButton)}
                    disabled={isFirstPage}
                    onClick={() => onPageChange(currentPage - 1)}
                >
                    <ChevronLeft
                        aria-hidden="true"
                        className={clsx(styles.icon)}
                    />
                    Previous
                </button>
                <button
                    type="button"
                    className={clsx(styles.mobileButton)}
                    disabled={isLastPage}
                    onClick={() => onPageChange(currentPage + 1)}
                >
                    Next
                    <ChevronRight
                        aria-hidden="true"
                        className={clsx(styles.icon)}
                    />
                </button>
            </div>
            <div className={clsx(styles.desktopPagination)}>
                <ol role="list" className={clsx(styles.list)}>
                    <li>
                        <button
                            type="button"
                            aria-label="Go to previous page"
                            className={clsx(
                                styles.button,
                                styles.pageButton,
                                styles.previousButton,
                            )}
                            disabled={isFirstPage}
                            onClick={() => onPageChange(currentPage - 1)}
                        >
                            <ChevronLeft
                                aria-hidden="true"
                                className={clsx(styles.icon)}
                            />
                        </button>
                    </li>
                    {items.map((item, index) =>
                        item === "ellipsis" ? (
                            <li key={`ellipsis-${index}`}>
                                <span className={clsx(styles.ellipsis)}>
                                    <span className="sr-only">More pages</span>
                                    <Ellipsis
                                        aria-hidden="true"
                                        className={clsx(styles.icon)}
                                    />
                                </span>
                            </li>
                        ) : (
                            <li key={item}>
                                <button
                                    type="button"
                                    aria-current={
                                        item === currentPage
                                            ? "page"
                                            : undefined
                                    }
                                    aria-label={`Go to page ${item}`}
                                    className={clsx(
                                        styles.button,
                                        item === currentPage
                                            ? styles.currentPage
                                            : styles.pageButton,
                                    )}
                                    onClick={() => onPageChange(item)}
                                >
                                    {item}
                                </button>
                            </li>
                        ),
                    )}
                    <li>
                        <button
                            type="button"
                            aria-label="Go to next page"
                            className={clsx(
                                styles.button,
                                styles.pageButton,
                                styles.nextButton,
                            )}
                            disabled={isLastPage}
                            onClick={() => onPageChange(currentPage + 1)}
                        >
                            <ChevronRight
                                aria-hidden="true"
                                className={clsx(styles.icon)}
                            />
                        </button>
                    </li>
                </ol>
            </div>
        </nav>
    );
}
