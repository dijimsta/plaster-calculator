"use client";

import { formatRelativeTime } from "@libraries/plaster-calculator-common";
import {
    Box,
    ButtonLink,
    Card,
    EmptyState,
    IconTile,
    StackedList,
    Text,
} from "@libraries/uikit-web";
import {
    ArrowRight,
    Building2,
    FolderKanban,
    LoaderCircle,
} from "lucide-react";
import { default as LinkModule } from "next/link.js";
import type { ReactElement } from "react";

import { useAppTranslation } from "../../i18n/index.ts";

import type { RecentProjectsPanelProps } from "./dashboard.types.js";

const Link = LinkModule.default;

/** Overview's "Recent projects" panel: the most recently updated projects, with a link out to the full list. */
export function RecentProjectsPanel({
    projects,
    loading,
}: RecentProjectsPanelProps): ReactElement {
    const { t } = useAppTranslation();

    return (
        <Card>
            <Card.Header>
                <Card.Title>{t("home.recentProjects.title")}</Card.Title>
                <ButtonLink href="/projects" variant="link" size="small">
                    {t("home.recentProjects.viewAll")}
                    <ArrowRight size={14} aria-hidden="true" />
                </ButtonLink>
            </Card.Header>
            <Card.Body>
                {loading ? (
                    <Box align="center" justify="center" gap="sm" status>
                        <LoaderCircle className="animate-spin" size={24} />
                        <Text size="sm" variant="muted">
                            {t("home.recentProjects.loading")}
                        </Text>
                    </Box>
                ) : projects.length === 0 ? (
                    <EmptyState
                        icon={<FolderKanban />}
                        title={t("home.recentProjects.emptyTitle")}
                    />
                ) : (
                    <StackedList variant="cards">
                        {projects.map((project) => (
                            <StackedList.Item key={project.id} variant="cards">
                                <Link href={`/projects/${project.id}`}>
                                    <Box
                                        direction="row"
                                        align="center"
                                        justify="between"
                                        gap="md"
                                    >
                                        <Box
                                            direction="row"
                                            align="center"
                                            gap="sm"
                                        >
                                            <IconTile size="sm" tone="neutral">
                                                <Building2 />
                                            </IconTile>
                                            <Box direction="column" gap="xs">
                                                <strong>{project.name}</strong>
                                                {project.companyName && (
                                                    <Text
                                                        size="sm"
                                                        variant="muted"
                                                    >
                                                        {project.companyName}
                                                    </Text>
                                                )}
                                            </Box>
                                        </Box>
                                        <Text size="sm" variant="muted">
                                            {formatRelativeTime(
                                                new Date(project.updatedAt),
                                            )}
                                        </Text>
                                    </Box>
                                </Link>
                            </StackedList.Item>
                        ))}
                    </StackedList>
                )}
            </Card.Body>
        </Card>
    );
}
