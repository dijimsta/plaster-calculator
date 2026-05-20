"use client";

import { default as LinkModule } from "next/link.js";

import { cx, ui } from "../../../lib/styles.js";

import type { ProjectSummary } from "../../../types.js";

const Link = LinkModule.default;

interface AccountProjectsPanelProps {
    readonly projects: readonly ProjectSummary[];
}

export function AccountProjectsPanel({ projects }: AccountProjectsPanelProps) {
    return (
        <section className={cx(ui.panel, ui.stack)}>
            <h2>Projects</h2>
            {projects.map((project) => (
                <Link
                    key={project.id}
                    className={ui.projectItem}
                    href={`/app/projects/${project.id}`}
                >
                    <strong>{project.name}</strong>
                    <span className={cx(ui.muted, ui.projectMetaLine)}>
                        {project.originalFileName} / {project.status} /{" "}
                        {new Date(project.updatedAt).toLocaleString()}
                    </span>
                </Link>
            ))}
            {projects.length === 0 && (
                <p className={ui.muted}>
                    No projects are linked to this account.
                </p>
            )}
        </section>
    );
}
