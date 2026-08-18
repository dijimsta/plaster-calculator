import type { ProjectsService } from "@libraries/plaster-calculator-web-core";
import type { NotifyOptions } from "@libraries/uikit-web";
import { useEffect, useMemo, useState } from "react";

import type { ProjectSummary } from "../../../types.js";

import {
    enrichProject,
    matchesQuery,
    type EnrichedProject,
} from "./use-projects-listing.utils.js";

/** Projects shown per page when a specific status tab is paginated. */
const PAGE_SIZE = 20;

export type PaginatedStatusFilter = "QUOTING" | "QUOTE_SUBMITTED";

export type PaginatedStatusProjectsState = {
    readonly page: number;
    readonly pageCount: number;
    readonly paginatedProjects: EnrichedProject[];
    readonly paginatedLoading: boolean;
    readonly setPage: (page: number) => void;
};

/**
 * Bounded/paginated project fetch for a single specific status tab in list
 * view. The board view and the "ALL" status tab need projects across every
 * sales status at once (for the board's columns and the tab badge counts),
 * which only an unbounded fetch can provide without a dedicated count query —
 * this hook exists to bound the one case that doesn't need that: a single
 * status tab shown as a table.
 */
export function usePaginatedStatusProjects(
    projectsService: ProjectsService,
    statusFilter: "ALL" | PaginatedStatusFilter,
    query: string,
    companyNames: ReadonlyMap<string, string>,
    notify: (options: NotifyOptions) => string,
): PaginatedStatusProjectsState {
    const [page, setPage] = useState(1);
    const [pageCount, setPageCount] = useState(1);
    const [pagedProjects, setPagedProjects] = useState<ProjectSummary[]>([]);
    const [paginatedLoading, setPaginatedLoading] = useState(false);

    // Resets to the first page whenever the active status tab or search text
    // changes, so a stale page number from a previous tab/search never lingers.
    useEffect(() => {
        setPage(1);
    }, [statusFilter, query]);

    useEffect(() => {
        if (statusFilter === "ALL") return;
        void fetchPage(statusFilter, page);
    }, [statusFilter, page, projectsService, notify]);

    async function fetchPage(
        salesStatus: PaginatedStatusFilter,
        requestedPage: number,
    ) {
        setPaginatedLoading(true);
        try {
            const results = await projectsService.listProjects({
                salesStatus,
                limit: PAGE_SIZE + 1,
                offset: (requestedPage - 1) * PAGE_SIZE,
            });
            const hasNextPage = results.length > PAGE_SIZE;
            setPagedProjects(results.slice(0, PAGE_SIZE));
            setPageCount(hasNextPage ? requestedPage + 1 : requestedPage);
        } catch (error) {
            notify({
                intent: "error",
                title: "Unable to load projects",
                description: error instanceof Error ? error.message : undefined,
            });
        } finally {
            setPaginatedLoading(false);
        }
    }

    const paginatedProjects = useMemo<EnrichedProject[]>(
        () =>
            pagedProjects
                .map((project) => enrichProject(project, companyNames))
                .filter((p) => matchesQuery(p, query)),
        [pagedProjects, companyNames, query],
    );

    return { page, pageCount, paginatedProjects, paginatedLoading, setPage };
}
