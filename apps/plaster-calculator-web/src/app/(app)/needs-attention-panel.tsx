"use client";

import {
    Badge,
    Box,
    ButtonLink,
    Card,
    Divider,
    EmptyState,
    IconTile,
    Text,
} from "@libraries/uikit-web";
import { Check, LoaderCircle } from "lucide-react";
import { default as LinkModule } from "next/link.js";
import type { ReactElement } from "react";

import { useAppTranslation } from "../../i18n/index.ts";

import type { NeedsAttentionPanelProps } from "./dashboard.types.js";

const Link = LinkModule.default;

/** Overview's "Needs your attention" panel: projects with a quote submitted, awaiting the builder's reply. */
export function NeedsAttentionPanel({
    projects,
    loading,
    activeProjectsCount,
}: NeedsAttentionPanelProps): ReactElement {
    const { t } = useAppTranslation();

    return (
        <Card>
            <Card.Title>{t("home.needsAttention.title")}</Card.Title>
            <Card.Body>
                {loading ? (
                    <Box align="center" justify="center" gap="sm" status>
                        <LoaderCircle className="animate-spin" size={24} />
                        <Text size="sm" variant="muted">
                            {t("home.needsAttention.loading")}
                        </Text>
                    </Box>
                ) : projects.length === 0 ? (
                    <NeedsAttentionEmptyState
                        activeProjectsCount={activeProjectsCount}
                    />
                ) : (
                    <Box direction="column" gap="md">
                        {projects.map((project) => (
                            <Link
                                key={project.id}
                                href={`/projects/${project.id}`}
                            >
                                <Box
                                    direction="row"
                                    align="center"
                                    justify="between"
                                    gap="md"
                                >
                                    <Box direction="column" gap="xs">
                                        <strong>{project.name}</strong>
                                        {project.companyName && (
                                            <Text size="sm" variant="muted">
                                                {project.companyName}
                                            </Text>
                                        )}
                                    </Box>
                                    <Badge color="yellow" size="xs">
                                        {t(
                                            "home.needsAttention.awaitingBuilderBadge",
                                        )}
                                    </Badge>
                                </Box>
                            </Link>
                        ))}
                    </Box>
                )}
            </Card.Body>
        </Card>
    );
}

type NeedsAttentionEmptyStateProps = Readonly<{
    activeProjectsCount: number;
}>;

function NeedsAttentionEmptyState({
    activeProjectsCount,
}: NeedsAttentionEmptyStateProps): ReactElement {
    const { t } = useAppTranslation();

    return (
        <Box direction="column" gap="lg">
            <EmptyState
                icon={
                    <IconTile size="lg" tone="successSoft" shape="circle">
                        <Check size={24} />
                    </IconTile>
                }
                title={t("home.needsAttention.caughtUpTitle")}
                description={t("home.needsAttention.caughtUpDescription")}
            />
            <Divider />
            <Box direction="row" align="center" justify="between" gap="md" wrap>
                <Text size="sm" variant="muted">
                    {t(
                        activeProjectsCount === 1
                            ? "home.needsAttention.activeProjectCountOne"
                            : "home.needsAttention.activeProjectCount",
                        { count: activeProjectsCount },
                    )}
                </Text>
                <ButtonLink href="/projects" variant="secondary">
                    {t("home.needsAttention.viewProjects")}
                </ButtonLink>
            </Box>
        </Box>
    );
}
