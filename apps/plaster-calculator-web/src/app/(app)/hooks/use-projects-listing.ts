import type { SalesStatus } from "@libraries/plaster-calculator-common";
import {
    useCompaniesService,
    useProjectsService,
} from "@libraries/plaster-calculator-web-core";
import { useNotificationsManager } from "@libraries/uikit-web";
import { useEffect, useMemo, useState } from "react";

import type { ProjectSummary } from "../../../types.js";

import {
    mergeProjects,
    projectNotificationAction,
    upsertProject,
} from "./use-projects-listing.utils.js";

export type StatusFilter = "ALL" | "QUOTING" | "QUOTE_SUBMITTED";
export type ProjectsView = "list" | "board";

const ALL_SALES_STATUSES: readonly SalesStatus[] = [
    "QUOTING",
    "QUOTE_SUBMITTED",
    "WON",
    "LOST",
];

export type EnrichedProject = ProjectSummary & { companyName: string | null };

export type ProjectsListingState = {
    readonly view: ProjectsView;
    readonly statusFilter: StatusFilter;
    readonly query: string;
    readonly projectsLoading: boolean;
    readonly busyMessage: string;
    readonly totalCount: number;
    readonly quotingCount: number;
    readonly quoteSubmittedCount: number;
    readonly filtered: EnrichedProject[];
    readonly resultCount: number;
    readonly renameValue: string;
    readonly renamingId: string | null;
    readonly processingProjectId: string | null;
    readonly refresh: () => Promise<void>;
    readonly removeProject: (project: ProjectSummary) => Promise<void>;
    readonly saveRename: (projectId: string) => Promise<void>;
    readonly moveProjectSalesStatus: (
        projectId: string,
        salesStatus: SalesStatus,
    ) => Promise<void>;
    readonly setView: (view: ProjectsView) => void;
    readonly setStatusFilter: (filter: StatusFilter) => void;
    readonly setQuery: (query: string) => void;
    readonly clearFilters: () => void;
    readonly setProcessingProjectId: (projectId: string | null) => void;
    readonly setRenameValue: (value: string) => void;
    readonly setRenamingId: (projectId: string | null) => void;
};

export function useProjectsListing(): ProjectsListingState {
    const projectsService = useProjectsService();
    const companiesService = useCompaniesService();
    const { notify } = useNotificationsManager();
    const [projects, setProjects] = useState<ProjectSummary[]>([]);
    const [companyNames, setCompanyNames] = useState<
        ReadonlyMap<string, string>
    >(new Map());
    const [view, setView] = useState<ProjectsView>("list");
    const [statusFilter, setStatusFilter] = useState<StatusFilter>("ALL");
    const [query, setQuery] = useState("");
    const [projectsLoading, setProjectsLoading] = useState(true);
    const [busyMessage, setBusyMessage] = useState("");
    const [processingProjectId, setProcessingProjectId] = useState<
        string | null
    >(null);
    const [renamingId, setRenamingId] = useState<string | null>(null);
    const [renameValue, setRenameValue] = useState("");

    useEffect(() => {
        void refresh();
        void loadCompanyCompanyNames();
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

    async function moveProjectSalesStatus(
        projectId: string,
        salesStatus: SalesStatus,
    ) {
        const previous = projects;
        setProjects((current) =>
            current.map((project) =>
                project.id === projectId
                    ? { ...project, salesStatus }
                    : project,
            ),
        );
        try {
            await projectsService.updateProject({ projectId, salesStatus });
        } catch (error) {
            setProjects(previous);
            notify({
                intent: "error",
                title: "Unable to move project",
                description: error instanceof Error ? error.message : undefined,
            });
        }
    }

    async function loadCompanyCompanyNames() {
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

    async function removeProject(project: ProjectSummary) {
        const confirmed = window.confirm(
            `Delete "${project.name}" and all stored files for this project?`,
        );
        if (!confirmed) return;
        setBusyMessage("Deleting project...");
        try {
            await projectsService.deleteProject(project.id);
            await refresh();
            notify({ intent: "success", title: "Project deleted" });
        } catch (error) {
            notify({
                intent: "error",
                title: "Delete failed",
                description: error instanceof Error ? error.message : undefined,
            });
        } finally {
            setBusyMessage("");
        }
    }

    async function saveRename(projectId: string) {
        const trimmed = renameValue.trim();
        if (!trimmed) return;
        try {
            await projectsService.renameProject(projectId, trimmed);
            setRenamingId(null);
            notify({ intent: "success", title: "Project renamed" });
            await refresh();
        } catch (error) {
            notify({
                intent: "error",
                title: "Rename failed",
                description: error instanceof Error ? error.message : undefined,
            });
        }
    }

    function clearFilters() {
        setStatusFilter("ALL");
        setQuery("");
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

    const totalCount = enriched.length;
    const quotingCount = useMemo(
        () => enriched.filter((p) => p.salesStatus === "QUOTING").length,
        [enriched],
    );
    const quoteSubmittedCount = useMemo(
        () =>
            enriched.filter((p) => p.salesStatus === "QUOTE_SUBMITTED").length,
        [enriched],
    );

    const filtered = useMemo<EnrichedProject[]>(() => {
        const q = query.trim().toLowerCase();
        const byStatus =
            statusFilter === "ALL"
                ? enriched
                : enriched.filter((p) => p.salesStatus === statusFilter);
        if (!q) return byStatus;
        return byStatus.filter(
            (p) =>
                p.name.toLowerCase().includes(q) ||
                p.originalFileName.toLowerCase().includes(q) ||
                (p.companyName?.toLowerCase().includes(q) ?? false),
        );
    }, [enriched, statusFilter, query]);

    const resultCount = filtered.length;

    return {
        view,
        statusFilter,
        query,
        projectsLoading,
        busyMessage,
        totalCount,
        quotingCount,
        quoteSubmittedCount,
        filtered,
        resultCount,
        renameValue,
        renamingId,
        processingProjectId,
        refresh,
        removeProject,
        saveRename,
        moveProjectSalesStatus,
        setView,
        setStatusFilter,
        setQuery,
        clearFilters,
        setProcessingProjectId,
        setRenameValue,
        setRenamingId,
    };
}
