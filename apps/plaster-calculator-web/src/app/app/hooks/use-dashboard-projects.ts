import { useEffect, useMemo, useState } from "react";

import {
    deleteProject,
    getProjectStatus,
    listProjects,
    renameProject,
} from "../../../lib/api.js";

import type { ProjectSummary } from "../../../types.js";

interface DashboardProjectsState {
    readonly filtered: ProjectSummary[];
    readonly processingProjectId: string | null;
    readonly projectsLoading: boolean;
    readonly message: string;
    readonly busyMessage: string;
    readonly query: string;
    readonly renameValue: string;
    readonly renamingId: string | null;
    readonly toast: string;
    readonly toastProject: { id: string; name: string } | null;
    readonly refresh: () => Promise<void>;
    readonly removeProject: (project: ProjectSummary) => Promise<void>;
    readonly saveRename: (projectId: string) => Promise<void>;
    readonly setMessage: (message: string) => void;
    readonly setProcessingProjectId: (projectId: string | null) => void;
    readonly setQuery: (query: string) => void;
    readonly setRenameValue: (value: string) => void;
    readonly setRenamingId: (projectId: string | null) => void;
    readonly setToast: (toast: string) => void;
    readonly setToastProject: (
        project: { id: string; name: string } | null,
    ) => void;
}

export function useDashboardProjects(): DashboardProjectsState {
    const [projects, setProjects] = useState<ProjectSummary[]>([]);
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
        refresh();
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
        }, 3000);
        return () => window.clearInterval(timer);
    }, [processingProjectId]);

    async function refresh() {
        setProjectsLoading(true);
        try {
            setProjects(await listProjects());
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

    const filtered = useMemo(() => {
        const q = query.trim().toLowerCase();
        return q
            ? projects.filter(
                  (project) =>
                      project.name.toLowerCase().includes(q) ||
                      project.originalFileName.toLowerCase().includes(q),
              )
            : projects;
    }, [projects, query]);

    return {
        filtered,
        busyMessage,
        message,
        processingProjectId,
        projectsLoading,
        query,
        renameValue,
        renamingId,
        toast,
        toastProject,
        refresh,
        removeProject,
        saveRename,
        setMessage,
        setProcessingProjectId,
        setQuery,
        setRenameValue,
        setRenamingId,
        setToast,
        setToastProject,
    };
}

function upsertProject(
    projects: ProjectSummary[],
    project: ProjectSummary,
): ProjectSummary[] {
    return projects.some((item) => item.id === project.id)
        ? projects.map((item) => (item.id === project.id ? project : item))
        : [project, ...projects];
}
