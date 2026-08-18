import type { SalesStatus } from "@libraries/plaster-calculator-common";
import {
    useCompaniesService,
    useProjectsService,
} from "@libraries/plaster-calculator-web-core";
import { useNotificationsManager } from "@libraries/uikit-web";
import { useEffect, useMemo, useState } from "react";

import type { ProjectSummary } from "../../../types.js";

import type { EnrichedProject } from "./use-projects-listing.js";
import {
    mergeProjects,
    projectNotificationAction,
    upsertProject,
} from "./use-projects-listing.utils.js";

const ALL_SALES_STATUSES: readonly SalesStatus[] = [
    "QUOTING",
    "QUOTE_SUBMITTED",
    "WON",
    "LOST",
];

const RECENT_PROJECTS_LIMIT = 4;
const NEEDS_ATTENTION_LIMIT = 4;

export type DashboardOverviewState = {
    readonly allProjects: readonly EnrichedProject[];
    readonly projectsLoading: boolean;
    readonly processingProjectId: string | null;
    readonly activeProjectsCount: number;
    readonly awaitingBuilderCount: number;
    readonly readyToQuoteCount: number;
    readonly companiesCount: number;
    readonly recentProjects: readonly EnrichedProject[];
    readonly needsAttentionProjects: readonly EnrichedProject[];
    readonly refresh: () => Promise<void>;
    readonly setProcessingProjectId: (projectId: string | null) => void;
};

/** Overview's summary data: stat counts, the "Needs your attention" list (quotes awaiting builder reply), and the "Recent projects" list, all derived from the same project/company fetch. */
export function useDashboardOverview(): DashboardOverviewState {
    const projectsService = useProjectsService();
    const companiesService = useCompaniesService();
    const { notify } = useNotificationsManager();
    const [projects, setProjects] = useState<ProjectSummary[]>([]);
    const [companyNames, setCompanyNames] = useState<
        ReadonlyMap<string, string>
    >(new Map());
    const [projectsLoading, setProjectsLoading] = useState(true);
    const [processingProjectId, setProcessingProjectId] = useState<
        string | null
    >(null);

    useEffect(() => {
        void refresh();
        void loadCompanyNames();
    }, []);

    useEffect(() => {
        if (!processingProjectId) return;
        const timer = window.setInterval(async () => {
            try {
                const project =
                    await projectsService.getProjectStatus(processingProjectId);
                setProjects((current) => upsertProject(current, project));
                if (project.status === "READY") {
                    notify({
                        intent: "success",
                        title: `${project.name} finished processing`,
                        actions: projectNotificationAction(project.id),
                    });
                    setProcessingProjectId(null);
                    window.clearInterval(timer);
                    await refresh();
                }
                if (project.status === "FAILED") {
                    notify({
                        intent: "error",
                        title: `${project.name} failed to process`,
                        description:
                            project.processingError ??
                            "The project could not be processed.",
                    });
                    setProcessingProjectId(null);
                    window.clearInterval(timer);
                    await refresh();
                }
            } catch (error) {
                notify({
                    intent: "error",
                    title: "Unable to check project status",
                    description:
                        error instanceof Error
                            ? error.message
                            : "Unable to poll processing status",
                    duration: 6000,
                });
            }
        }, 10_000);
        return () => window.clearInterval(timer);
    }, [notify, processingProjectId, projectsService]);

    async function refresh() {
        setProjectsLoading(true);
        try {
            const byStatus = await Promise.all(
                ALL_SALES_STATUSES.map((salesStatus) =>
                    projectsService.listProjects({ salesStatus }),
                ),
            );
            setProjects(mergeProjects(...byStatus));
        } catch (error) {
            notify({
                intent: "error",
                title: "Unable to load projects",
                description: error instanceof Error ? error.message : undefined,
            });
        } finally {
            setProjectsLoading(false);
        }
    }

    async function loadCompanyNames() {
        try {
            const companies = await companiesService.listCompanies();
            setCompanyNames(
                new Map(
                    companies.map((company) => [
                        company.id,
                        company.companyName,
                    ]),
                ),
            );
        } catch (error) {
            notify({
                intent: "error",
                title: "Unable to load company names",
                description: error instanceof Error ? error.message : undefined,
            });
        }
    }

    const enriched = useMemo<EnrichedProject[]>(
        () =>
            projects.map((project) => ({
                ...project,
                companyName: project.companyId
                    ? (companyNames.get(project.companyId) ?? null)
                    : null,
            })),
        [companyNames, projects],
    );

    const awaitingBuilderProjects = useMemo(
        () =>
            enriched.filter(
                (project) => project.salesStatus === "QUOTE_SUBMITTED",
            ),
        [enriched],
    );
    // No standalone "ready to quote" concept exists yet (e.g. all readiness
    // checks passing) -- this proxies it with the Quoting count until that's
    // defined.
    const readyToQuoteCount = useMemo(
        () =>
            enriched.filter((project) => project.salesStatus === "QUOTING")
                .length,
        [enriched],
    );
    const activeProjectsCount = useMemo(
        () =>
            enriched.filter(
                (project) =>
                    project.salesStatus === "QUOTING" ||
                    project.salesStatus === "QUOTE_SUBMITTED",
            ).length,
        [enriched],
    );

    const recentProjects = useMemo(
        () =>
            [...enriched].sort(byUpdatedAtDesc).slice(0, RECENT_PROJECTS_LIMIT),
        [enriched],
    );
    const needsAttentionProjects = useMemo(
        () =>
            [...awaitingBuilderProjects]
                .sort(byUpdatedAtDesc)
                .slice(0, NEEDS_ATTENTION_LIMIT),
        [awaitingBuilderProjects],
    );

    return {
        allProjects: enriched,
        projectsLoading,
        processingProjectId,
        activeProjectsCount,
        awaitingBuilderCount: awaitingBuilderProjects.length,
        readyToQuoteCount,
        companiesCount: companyNames.size,
        recentProjects,
        needsAttentionProjects,
        refresh,
        setProcessingProjectId,
    };
}

function byUpdatedAtDesc(a: ProjectSummary, b: ProjectSummary): number {
    return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
}
