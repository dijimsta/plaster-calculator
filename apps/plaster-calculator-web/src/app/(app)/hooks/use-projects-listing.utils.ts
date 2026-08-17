import { ButtonLink } from "@libraries/uikit-web";
import { createElement } from "react";

import type { ProjectSummary } from "../../../types.js";

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
