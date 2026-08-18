import type { EnrichedProject } from "../hooks/use-projects-listing.js";
import type {
    ProjectsView,
    StatusFilter,
} from "../hooks/use-projects-listing.js";

/**
 * The bounded/paginated fetch only covers a single specific status tab in
 * list view (see use-projects-listing.ts) — the "ALL" tab and board view
 * keep using the unbounded `filtered` array they've always used.
 */
export function isSpecificStatusListView(
    view: ProjectsView,
    statusFilter: StatusFilter,
): boolean {
    return view === "list" && statusFilter !== "ALL";
}

/** Picks the bounded/paginated projects, or the unbounded ones, per the rule above. */
export function resolveTableProjects(
    isPaginatedListView: boolean,
    paginatedProjects: EnrichedProject[],
    filtered: EnrichedProject[],
): EnrichedProject[] {
    return isPaginatedListView ? paginatedProjects : filtered;
}

export function resolveIsLoading(
    projectsLoading: boolean,
    isPaginatedListView: boolean,
    paginatedLoading: boolean,
): boolean {
    return projectsLoading || (isPaginatedListView && paginatedLoading);
}

export function shouldShowPagination(
    isPaginatedListView: boolean,
    pageCount: number,
): boolean {
    return isPaginatedListView && pageCount > 1;
}
