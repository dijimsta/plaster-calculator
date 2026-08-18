import type { SalesStatus } from "@libraries/plaster-calculator-common";
import {
    useCompaniesService,
    useProjectsService,
} from "@libraries/plaster-calculator-web-core";
import { ButtonLink, useNotificationsManager } from "@libraries/uikit-web";
import { createElement, useEffect, useMemo, useState } from "react";

import type { ProjectSummary } from "../../../types.js";

type ActiveProjectSalesStatus = Extract<
    SalesStatus,
    "QUOTING" | "QUOTE_SUBMITTED"
>;

type DashboardProjectsState = {
    readonly activeSalesStatus: ActiveProjectSalesStatus;
    readonly filtered: ProjectSummary[];
    readonly processingProjectId: string | null;
    readonly projectsLoading: boolean;
    readonly message: string;
    readonly busyMessage: string;
    readonly query: string;
    readonly renameValue: string;
    readonly renamingId: string | null;
    readonly refresh: () => Promise<void>;
    readonly removeProject: (project: ProjectSummary) => Promise<void>;
    readonly saveRename: (projectId: string) => Promise<void>;
    readonly setMessage: (message: string) => void;
    readonly setProcessingProjectId: (projectId: string | null) => void;
    readonly setQuery: (query: string) => void;
    readonly setActiveSalesStatus: (status: ActiveProjectSalesStatus) => void;
    readonly setRenameValue: (value: string) => void;
    readonly setRenamingId: (projectId: string | null) => void;
};

export function useDashboardProjects(): DashboardProjectsState {
    const projectsService = useProjectsService();
    const companiesService = useCompaniesService();
    const { notify } = useNotificationsManager();
    const [projects, setProjects] = useState<ProjectSummary[]>([]);
    const [companyNames, setCompanyNames] = useState<
        ReadonlyMap<string, string>
    >(new Map());
    const [activeSalesStatus, setActiveSalesStatus] =
        useState<ActiveProjectSalesStatus>("QUOTING");
    const [query, setQuery] = useState("");
    const [projectsLoading, setProjectsLoading] = useState(true);
    const [message, setMessage] = useState("");
    const [busyMessage, setBusyMessage] = useState("");
    const [processingProjectId, setProcessingProjectId] = useState<
        string | null
    >(null);
    const [renamingId, setRenamingId] = useState<string | null>(null);
    const [renameValue, setRenameValue] = useState("");

    useEffect(() => {
        void refresh();
    }, [activeSalesStatus]);

    useEffect(() => {
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
            setProjects(
                await projectsService.listProjects({
                    salesStatus: activeSalesStatus,
                }),
            );
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
            setMessage(
                error instanceof Error
                    ? error.message
                    : "Unable to load company names",
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
            await projectsService.deleteProject(project.id);
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

    const filtered = useMemo(() => {
        const q = query.trim().toLowerCase();
        const projectsWithCompanyNames = projects.map((project) => ({
            ...project,
            companyName: project.companyId
                ? (companyNames.get(project.companyId) ?? null)
                : null,
        }));
        if (!q) return projectsWithCompanyNames;
        return projectsWithCompanyNames.filter(
            (project) =>
                project.name.toLowerCase().includes(q) ||
                project.originalFileName.toLowerCase().includes(q),
        );
    }, [companyNames, projects, query]);

    return {
        activeSalesStatus,
        filtered,
        busyMessage,
        message,
        processingProjectId,
        projectsLoading,
        query,
        renameValue,
        renamingId,
        refresh,
        removeProject,
        saveRename,
        setMessage,
        setProcessingProjectId,
        setActiveSalesStatus,
        setQuery,
        setRenameValue,
        setRenamingId,
    };
}

function projectNotificationAction(projectId: string) {
    return createElement(
        ButtonLink,
        { href: `/projects/${projectId}`, variant: "link" },
        "Open project",
    );
}

function upsertProject(
    projects: ProjectSummary[],
    project: ProjectSummary,
): ProjectSummary[] {
    return projects.some((item) => item.id === project.id)
        ? projects.map((item) => (item.id === project.id ? project : item))
        : [project, ...projects];
}
