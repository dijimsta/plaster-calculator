import { ButtonLink } from "@libraries/uikit-web";
import { createElement } from "react";

import type { ProjectSummary } from "../../../types.js";

export class ProjectsListingUtils {
    /** Merges same-project results from parallel per-status `listProjects` calls, deduping by id. */
    public static mergeProjects(
        ...lists: ProjectSummary[][]
    ): ProjectSummary[] {
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

    public static upsertProject(
        projects: ProjectSummary[],
        project: ProjectSummary,
    ): ProjectSummary[] {
        return projects.some((item) => item.id === project.id)
            ? projects.map((item) => (item.id === project.id ? project : item))
            : [project, ...projects];
    }

    public static projectNotificationAction(projectId: string) {
        return createElement(
            ButtonLink,
            { href: `/projects/${projectId}`, variant: "link" },
            "Open project",
        );
    }
}
