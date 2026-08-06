import { ButtonLink, useNotificationsManager } from "@libraries/uikit-web";
import { createElement, useEffect, useMemo, useState } from "react";

import {
    deleteProject,
    getProjectStatus,
    listAccounts,
    listProjects,
    renameProject,
} from "../../../lib/api.js";

import type { ProjectSummary } from "../../../types.js";

export type StatusFilter = "ALL" | "QUOTING" | "QUOTE_SUBMITTED";

type EnrichedProject = ProjectSummary & { accountCompanyName: string | null };

export interface ProjectsListingState {
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
    readonly setStatusFilter: (filter: StatusFilter) => void;
    readonly setQuery: (query: string) => void;
    readonly clearFilters: () => void;
    readonly setProcessingProjectId: (projectId: string | null) => void;
    readonly setRenameValue: (value: string) => void;
    readonly setRenamingId: (projectId: string | null) => void;
}

export function useProjectsListing(): ProjectsListingState {
    const { notify } = useNotificationsManager();
    const [projects, setProjects] = useState<ProjectSummary[]>([]);
    const [accountCompanyNames, setAccountCompanyNames] = useState<
        ReadonlyMap<string, string>
    >(new Map());
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
        void loadAccountCompanyNames();
    }, []);

    useEffect(() => {
        if (!processingProjectId) return;
        const timer = window.setInterval(async () => {
            try {
                const project = await getProjectStatus(processingProjectId);
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
    }, [notify, processingProjectId]);

    async function refresh() {
        setProjectsLoading(true);
        try {
            const [quoting, submitted] = await Promise.all([
                listProjects({ salesStatus: "QUOTING" }),
                listProjects({ salesStatus: "QUOTE_SUBMITTED" }),
            ]);
            const merged = mergeProjects(quoting, submitted);
            setProjects(merged);
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

    async function loadAccountCompanyNames() {
        try {
            const accounts = await listAccounts();
            setAccountCompanyNames(
                new Map(
                    accounts.map((account) => [
                        account.id,
                        account.companyName,
                    ]),
                ),
            );
        } catch (error) {
            notify({
                intent: "error",
                title: "Unable to load account names",
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
            await deleteProject(project.id);
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
            await renameProject(projectId, trimmed);
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
                accountCompanyName: project.accountId
                    ? (accountCompanyNames.get(project.accountId) ?? null)
                    : null,
            })),
        [accountCompanyNames, projects],
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
                (p.accountCompanyName?.toLowerCase().includes(q) ?? false),
        );
    }, [enriched, statusFilter, query]);

    const resultCount = filtered.length;

    return {
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
        setStatusFilter,
        setQuery,
        clearFilters,
        setProcessingProjectId,
        setRenameValue,
        setRenamingId,
    };
}

function projectNotificationAction(projectId: string) {
    return createElement(
        ButtonLink,
        { href: `/app/projects/${projectId}`, variant: "link" },
        "Open project",
    );
}

function mergeProjects(...lists: ProjectSummary[][]): ProjectSummary[] {
    const seen = new Set<string>();
    const result: ProjectSummary[] = [];
    for (const list of lists) {
        for (const project of list) {
            if (!seen.has(project.id)) {
                seen.add(project.id);
                result.push(project);
            }
        }
    }
    return result;
}

function upsertProject(
    projects: ProjectSummary[],
    project: ProjectSummary,
): ProjectSummary[] {
    return projects.some((item) => item.id === project.id)
        ? projects.map((item) => (item.id === project.id ? project : item))
        : [project, ...projects];
}
