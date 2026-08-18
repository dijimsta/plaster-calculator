"use client";

import { salesStatusAccentColors } from "@libraries/plaster-calculator-ui";
import {
    Badge,
    Box,
    Card,
    EmptyState,
    IconTile,
    StackedList,
    Text,
} from "@libraries/uikit-web";
import { Building2, FolderKanban } from "lucide-react";
import { default as LinkModule } from "next/link.js";

import { useAppTranslation } from "../../../i18n/index.ts";
import { useSalesStatusLabel } from "../../../lib/sales-status.ts";
import type { ProjectSummary } from "../../../types.js";

const Link = LinkModule.default;

type CompanyProjectsPanelProps = {
    readonly projects: readonly ProjectSummary[];
};

export function CompanyProjectsPanel({ projects }: CompanyProjectsPanelProps) {
    const { t } = useAppTranslation();
    const salesStatusLabel = useSalesStatusLabel();

    return (
        <Card>
            <Card.Title>{t("companies.projectsPanel.title")}</Card.Title>
            {projects.length > 0 ? (
                <StackedList>
                    {projects.map((project) => (
                        <StackedList.Item key={project.id}>
                            <Link href={`/projects/${project.id}`}>
                                <Box direction="row" align="center" gap="md">
                                    <IconTile size="sm" tone="neutral">
                                        <Building2
                                            size={18}
                                            aria-hidden="true"
                                        />
                                    </IconTile>
                                    <Box grow>
                                        <Text weight="semibold" truncate>
                                            {project.name}
                                        </Text>
                                    </Box>
                                    <Badge
                                        dot
                                        color={
                                            salesStatusAccentColors[
                                                project.salesStatus
                                            ]
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
            ) : (
                <EmptyState
                    icon={<FolderKanban />}
                    title={t("companies.projectsPanel.emptyStateTitle")}
                />
            )}
        </Card>
    );
}
