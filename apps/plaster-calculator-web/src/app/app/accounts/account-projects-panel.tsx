"use client";

import { EmptyState, Text } from "@libraries/uikit-web";
import { FolderKanban } from "lucide-react";
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
                    <Text size="sm" variant="muted" truncate>
                        {project.originalFileName} / {project.status} /{" "}
                        {new Date(project.updatedAt).toLocaleString()}
                    </Text>
                </Link>
            ))}
            {projects.length === 0 && (
                <EmptyState
                    icon={<FolderKanban />}
                    title="No projects are linked to this account"
                />
            )}
        </section>
    );
}
