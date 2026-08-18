"use client";

import { EmptyState, Text } from "@libraries/uikit-web";
import { FolderKanban } from "lucide-react";
import { default as LinkModule } from "next/link.js";

import { useAppTranslation } from "../../../i18n/index.ts";
import { cx, ui } from "../../../lib/styles.js";
import type { ProjectSummary } from "../../../types.js";

const Link = LinkModule.default;

type CompanyProjectsPanelProps = {
    readonly projects: readonly ProjectSummary[];
};

export function CompanyProjectsPanel({ projects }: CompanyProjectsPanelProps) {
    const { t } = useAppTranslation();

    return (
        <section className={cx(ui.panel, ui.stack)}>
            <h2>{t("companies.projectsPanel.title")}</h2>
            {projects.map((project) => (
                <Link
                    key={project.id}
                    className={ui.projectItem}
                    href={`/projects/${project.id}`}
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
                    title={t("companies.projectsPanel.emptyStateTitle")}
                />
            )}
        </section>
    );
}
