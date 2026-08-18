"use client";

import { salesStatusAccentColors } from "@libraries/plaster-calculator-ui";
import {
    Badge,
    Box,
    Button,
    Card,
    EmptyState,
    IconTile,
    Paragraph,
    StackedList,
    Text,
} from "@libraries/uikit-web";
import { Building2, FolderKanban, LoaderCircle } from "lucide-react";
import { default as LinkModule } from "next/link.js";

import { useAppTranslation } from "../../../i18n/index.ts";
import { useSalesStatusLabel } from "../../../lib/sales-status.ts";
import type { ProjectSummary } from "../../../types.js";

import { useCompanyProjects } from "./use-company-projects.hook.ts";

const Link = LinkModule.default;

type CompanyProjectsPanelProps = {
    readonly companyId: string;
};

export function CompanyProjectsPanel({ companyId }: CompanyProjectsPanelProps) {
    const { t } = useAppTranslation();
    const state = useCompanyProjects(companyId);

    return (
        <Card>
            <Card.Title>{t("companies.projectsPanel.title")}</Card.Title>
            {state.message && (
                <Paragraph textSize="sm" variant="muted">
                    {state.message}
                </Paragraph>
            )}
            {state.isLoading ? (
                <Box direction="row" align="center" justify="center" gap="sm">
                    <LoaderCircle className="animate-spin" size={20} />
                    <Text size="sm" variant="muted">
                        {t("companies.projectsPanel.loading")}
                    </Text>
                </Box>
            ) : (
                <CompanyProjectsPanelBody
                    projects={state.projects}
                    hasMore={state.hasMore}
                    isLoadingMore={state.isLoadingMore}
                    onLoadMore={state.loadMore}
                />
            )}
        </Card>
    );
}

type CompanyProjectsPanelBodyProps = {
    readonly projects: readonly ProjectSummary[];
    readonly hasMore: boolean;
    readonly isLoadingMore: boolean;
    readonly onLoadMore: () => void;
};

/** Split out of `CompanyProjectsPanel` so its loaded/empty/load-more
 * branching stays within this workspace's complexity limit. */
function CompanyProjectsPanelBody({
    projects,
    hasMore,
    isLoadingMore,
    onLoadMore,
}: CompanyProjectsPanelBodyProps) {
    const { t } = useAppTranslation();

    if (projects.length === 0) {
        return (
            <EmptyState
                icon={<FolderKanban />}
                title={t("companies.projectsPanel.emptyStateTitle")}
            />
        );
    }

    return (
        <>
            <CompanyProjectsList projects={projects} />
            {hasMore && (
                <Box direction="row" justify="center">
                    <Button
                        variant="secondary"
                        type="button"
                        disabled={isLoadingMore}
                        onClick={onLoadMore}
                    >
                        {isLoadingMore
                            ? t("companies.projectsPanel.loadingMore")
                            : t("companies.projectsPanel.loadMore")}
                    </Button>
                </Box>
            )}
        </>
    );
}

type CompanyProjectsListProps = {
    readonly projects: readonly ProjectSummary[];
};

function CompanyProjectsList({ projects }: CompanyProjectsListProps) {
    const salesStatusLabel = useSalesStatusLabel();

    return (
        <StackedList>
            {projects.map((project) => (
                <StackedList.Item key={project.id}>
                    <Link href={`/projects/${project.id}`}>
                        <Box direction="row" align="center" gap="md">
                            <IconTile size="sm" tone="neutral">
                                <Building2 size={18} aria-hidden="true" />
                            </IconTile>
                            <Box grow>
                                <Text weight="semibold" truncate>
                                    {project.name}
                                </Text>
                            </Box>
                            <Badge
                                dot
                                color={
                                    salesStatusAccentColors[project.salesStatus]
                                }
                                size="xs"
                            >
                                {salesStatusLabel(project.salesStatus)}
                            </Badge>
                        </Box>
                    </Link>
                </StackedList.Item>
            ))}
        </StackedList>
    );
}
