import type { SalesStatus } from "@libraries/plaster-calculator-common";
import type { ProjectsService } from "@libraries/plaster-calculator-web-core";
import type { NotifyOptions } from "@libraries/uikit-web";
import { useEffect, useMemo, useState } from "react";

import type { ProjectSummary } from "../../../types.js";

import {
    enrichProject,
    mergeProjects,
    type EnrichedProject,
} from "./use-projects-listing.utils.js";

const ALL_SALES_STATUSES: readonly SalesStatus[] = [
    "QUOTING",
    "QUOTE_SUBMITTED",
    "WON",
    "LOST",
];

/** Projects shown in the "Recent projects" panel. */
const RECENT_PROJECTS_LIMIT = 4;
/** Projects shown in the "Needs your attention" panel. */
const NEEDS_ATTENTION_LIMIT = 4;

export type DashboardPanelsState = {
    readonly recentProjects: EnrichedProject[];
    readonly needsAttentionProjects: EnrichedProject[];
    readonly panelsLoading: boolean;
};

/**
 * Bounded fetch dedicated to the dashboard's "Recent projects" and "Needs
 * your attention" panels, kept separate from useDashboardOverview's
 * unbounded refresh(). That unbounded fetch stays exactly as-is because it's
 * the only source of the true full-team stat counts (activeProjectsCount,
 * awaitingBuilderCount, readyToQuoteCount) -- those need every matching
 * project, not just the most recent handful.
 *
 * Neither panel needs the full history, though:
 * - needsAttentionProjects only needs one status (QUOTE_SUBMITTED), so it's a
 *   single bounded listProjects call, already sorted updatedAt DESC by the
 *   underlying Data Connect query (orderBy: [{ updatedAt: DESC }]) -- no
 *   client-side re-sort needed.
 * - recentProjects spans all 4 statuses merged by recency, and there's no
 *   "all statuses, top N by recency" query to call instead. Fetching each
 *   status bounded to RECENT_PROJECTS_LIMIT (instead of unbounded), then
 *   merging the at-most 4 x RECENT_PROJECTS_LIMIT results and re-sorting
 *   client-side, is still a real payload reduction -- bounded per status
 *   rather than the team's entire project history -- even though it costs 4
 *   round-trips instead of 1.
 */
export function useDashboardPanels(
    projectsService: ProjectsService,
    companyNames: ReadonlyMap<string, string>,
    notify: (options: NotifyOptions) => string,
): DashboardPanelsState {
    const [recentRaw, setRecentRaw] = useState<ProjectSummary[]>([]);
    const [needsAttentionRaw, setNeedsAttentionRaw] = useState<
        ProjectSummary[]
    >([]);
    const [panelsLoading, setPanelsLoading] = useState(true);

    useEffect(() => {
        void loadPanels();
    }, [projectsService, notify]);

    async function loadPanels() {
        setPanelsLoading(true);
        try {
            const [byStatus, needsAttention] = await Promise.all([
                Promise.all(
                    ALL_SALES_STATUSES.map((salesStatus) =>
                        projectsService.listProjects({
                            salesStatus,
                            limit: RECENT_PROJECTS_LIMIT,
                        }),
                    ),
                ),
                projectsService.listProjects({
                    salesStatus: "QUOTE_SUBMITTED",
                    limit: NEEDS_ATTENTION_LIMIT,
                }),
            ]);
            setRecentRaw(
                mergeProjects(...byStatus)
                    .sort(byUpdatedAtDesc)
                    .slice(0, RECENT_PROJECTS_LIMIT),
            );
            setNeedsAttentionRaw(needsAttention);
        } catch (error) {
            notify({
                intent: "error",
                title: "Unable to load projects",
                description: error instanceof Error ? error.message : undefined,
            });
        } finally {
            setPanelsLoading(false);
        }
    }

    const recentProjects = useMemo(
        () => recentRaw.map((project) => enrichProject(project, companyNames)),
        [recentRaw, companyNames],
    );
    const needsAttentionProjects = useMemo(
        () =>
            needsAttentionRaw.map((project) =>
                enrichProject(project, companyNames),
            ),
        [needsAttentionRaw, companyNames],
    );

    return { recentProjects, needsAttentionProjects, panelsLoading };
}

function byUpdatedAtDesc(a: ProjectSummary, b: ProjectSummary): number {
    return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
}
