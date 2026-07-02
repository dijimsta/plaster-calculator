import { useEffect, useMemo, useState } from "react";

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
    readonly message: string;
    readonly totalCount: number;
    readonly quotingCount: number;
    readonly quoteSubmittedCount: number;
    readonly filtered: EnrichedProject[];
    readonly resultCount: number;
    readonly renameValue: string;
    readonly renamingId: string | null;
    readonly processingProjectId: string | null;
    readonly toast: string;
    readonly toastProject: { id: string; name: string } | null;
    readonly refresh: () => Promise<void>;
    readonly removeProject: (project: ProjectSummary) => Promise<void>;
    readonly saveRename: (projectId: string) => Promise<void>;
    readonly setStatusFilter: (filter: StatusFilter) => void;
    readonly setQuery: (query: string) => void;
    readonly clearFilters: () => void;
    readonly setMessage: (message: string) => void;
    readonly setProcessingProjectId: (projectId: string | null) => void;
    readonly setRenameValue: (value: string) => void;
    readonly setRenamingId: (projectId: string | null) => void;
    readonly setToast: (toast: string) => void;
    readonly setToastProject: (
        project: { id: string; name: string } | null,
    ) => void;
}

export function useProjectsListing(): ProjectsListingState {
    const [projects, setProjects] = useState<ProjectSummary[]>([]);
    const [accountCompanyNames, setAccountCompanyNames] = useState<
        ReadonlyMap<string, string>
    >(new Map());
    const [statusFilter, setStatusFilter] = useState<StatusFilter>("ALL");
    const [query, setQuery] = useState("");
    const [projectsLoading, setProjectsLoading] = useState(true);
    const [message, setMessage] = useState("");
    const [busyMessage, setBusyMessage] = useState("");
    const [toast, setToast] = useState("");
    const [toastProject, setToastProject] = useState<{
        id: string;
        name: string;
    } | null>(null);
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
                    setToast("finished processing.");
                    setToastProject({ id: project.id, name: project.name });
                    setProcessingProjectId(null);
                    window.clearInterval(timer);
                    await refresh();
                }
                if (project.status === "FAILED") {
                    setToast(
                        `${project.name} failed to process${project.processingError ? `: ${project.processingError}` : "."}`,
                    );
                    setToastProject(null);
                    setProcessingProjectId(null);
                    window.clearInterval(timer);
                    await refresh();
                }
            } catch (error) {
                setToast(
                    error instanceof Error
                        ? error.message
                        : "Unable to poll processing status",
                );
            }
        }, 10_000);
        return () => window.clearInterval(timer);
    }, [processingProjectId]);

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
            setMessage(
                error instanceof Error
                    ? error.message
                    : "Unable to load projects",
            );
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
            setMessage(
                error instanceof Error
                    ? error.message
                    : "Unable to load account names",
            );
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
            setMessage("Project deleted.");
        } catch (error) {
            setMessage(
                error instanceof Error ? error.message : "Delete failed",
            );
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
            setToast("Project renamed.");
            await refresh();
        } catch (error) {
            setToast(error instanceof Error ? error.message : "Rename failed");
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
        message,
        totalCount,
        quotingCount,
        quoteSubmittedCount,
        filtered,
        resultCount,
        renameValue,
        renamingId,
        processingProjectId,
        toast,
        toastProject,
        refresh,
        removeProject,
        saveRename,
        setStatusFilter,
        setQuery,
        clearFilters,
        setMessage,
        setProcessingProjectId,
        setRenameValue,
        setRenamingId,
        setToast,
        setToastProject,
    };
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
