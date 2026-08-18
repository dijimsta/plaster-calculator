import { ButtonLink } from "@libraries/uikit-web";
import { createElement } from "react";

import type { ProjectSummary } from "../../../types.js";

export type EnrichedProject = ProjectSummary & { companyName: string | null };

/** Enriches a project with its company's display name, if any. */
export function enrichProject(
    project: ProjectSummary,
    companyNames: ReadonlyMap<string, string>,
): EnrichedProject {
    return {
        ...project,
        companyName: project.companyId
            ? (companyNames.get(project.companyId) ?? null)
            : null,
    };
}

/** Whether a project matches a free-text search query, case-insensitively. */
export function matchesQuery(project: EnrichedProject, query: string): boolean {
    const q = query.trim().toLowerCase();
    if (!q) return true;
    return (
        project.name.toLowerCase().includes(q) ||
        project.originalFileName.toLowerCase().includes(q) ||
        (project.companyName?.toLowerCase().includes(q) ?? false)
    );
}

/** Merges same-project results from parallel per-status `listProjects` calls, deduping by id. */
export function mergeProjects(...lists: ProjectSummary[][]): ProjectSummary[] {
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

export function upsertProject(
    projects: ProjectSummary[],
    project: ProjectSummary,
): ProjectSummary[] {
    return projects.some((item) => item.id === project.id)
        ? projects.map((item) => (item.id === project.id ? project : item))
        : [project, ...projects];
}

export function projectNotificationAction(projectId: string) {
    return createElement(
        ButtonLink,
        { href: `/projects/${projectId}`, variant: "link" },
        "Open project",
    );
}
