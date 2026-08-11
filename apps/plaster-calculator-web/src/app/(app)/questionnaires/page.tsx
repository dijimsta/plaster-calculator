"use client";

import { formatRelativeTime } from "@libraries/plaster-calculator-common";
import type { QuestionnaireCompletionState } from "@libraries/plaster-calculator-common";
import { useQuestionnairesTranslation } from "@libraries/plaster-calculator-ui";
import {
    Badge,
    Box,
    Breadcrumb,
    EmptyState,
    PageHeading,
    ProgressBar,
    Stats,
    Table,
    Tabs,
    Text,
} from "@libraries/uikit-web";
import type { BadgeColor } from "@libraries/uikit-web";
import { ClipboardList, Home, LoaderCircle } from "lucide-react";
import { default as LinkModule } from "next/link.js";

import { RoutedBreadcrumbItem } from "../../../components/routed-breadcrumb-item.js";
import { useAppTranslation } from "../../../i18n/index.ts";

import { useQuestionnaireStats } from "./page.hooks.js";
import type { QuestionnaireListItem } from "./page.hooks.js";

const Link = LinkModule.default;

const completionStateBadgeColors: Record<
    QuestionnaireCompletionState,
    BadgeColor
> = {
    NOT_STARTED: "gray",
    IN_PROGRESS: "blue",
    COMPLETED: "green",
};

export default function QuestionnairesPage() {
    const { t } = useQuestionnairesTranslation();
    const { t: tApp } = useAppTranslation();
    const stats = useQuestionnaireStats();

    function answeredSummary(
        questionnaire: Pick<
            QuestionnaireListItem,
            "answeredCount" | "totalQuestions"
        >,
    ): string {
        const { answeredCount, totalQuestions } = questionnaire;
        const openCount = totalQuestions - answeredCount;
        const values = { answeredCount, totalQuestions, openCount };
        return openCount > 0
            ? t("questionnairesPage.answeredSummaryWithOpen", values)
            : t("questionnairesPage.answeredSummary", values);
    }

    return (
        <>
            <PageHeading>
                <PageHeading.Breadcrumbs>
                    <Breadcrumb>
                        <RoutedBreadcrumbItem href="/">
                            <Home
                                size={16}
                                aria-label={tApp("sidebar.navLabels.home")}
                            />
                        </RoutedBreadcrumbItem>
                        <Breadcrumb.Item current>
                            {tApp("questionnaires.title")}
                        </Breadcrumb.Item>
                    </Breadcrumb>
                </PageHeading.Breadcrumbs>
                <PageHeading.Content>
                    <PageHeading.Title>
                        {tApp("questionnaires.title")}
                    </PageHeading.Title>
                    <PageHeading.Description>
                        {t("questionnairesPage.description")}
                    </PageHeading.Description>
                </PageHeading.Content>
                <PageHeading.Navigation>
                    <Tabs>
                        <Tabs.Item current>
                            <Link href="/questionnaires">
                                {tApp("questionnaires.projectsTab")}
                            </Link>
                        </Tabs.Item>
                        <Tabs.Item>
                            <Link href="/questionnaires/templates">
                                {tApp("questionnaires.templatesTab")}
                            </Link>
                        </Tabs.Item>
                    </Tabs>
                </PageHeading.Navigation>
            </PageHeading>
            <Box direction="column" gap="lg" padding="md">
                <Stats
                    columns={3}
                    items={[
                        {
                            id: "total",
                            label: t("questionnairesPage.stats.total"),
                            value: stats.isLoading ? "—" : stats.total,
                        },
                        {
                            id: "in-progress",
                            label: t("questionnairesPage.stats.inProgress"),
                            value: stats.isLoading
                                ? "—"
                                : stats.inProgressCount,
                            valueTone: "info",
                        },
                        {
                            id: "completed",
                            label: t("questionnairesPage.stats.completed"),
                            value: stats.isLoading ? "—" : stats.completedCount,
                            valueTone: "success",
                        },
                    ]}
                />
                {stats.isLoading ? (
                    <Box align="center" justify="center" gap="sm" status>
                        <LoaderCircle className="animate-spin" size={24} />
                        <Text variant="muted">
                            {t("questionnairesPage.loading")}
                        </Text>
                    </Box>
                ) : stats.questionnaires.length === 0 ? (
                    <EmptyState
                        icon={<ClipboardList />}
                        title={t("questionnairesPage.emptyStateTitle")}
                    />
                ) : (
                    <Table bordered>
                        <Table.Head>
                            <Table.Row>
                                <Table.Header>
                                    {t(
                                        "questionnairesPage.tableHeaders.project",
                                    )}
                                </Table.Header>
                                <Table.Header>
                                    {t(
                                        "questionnairesPage.tableHeaders.progress",
                                    )}
                                </Table.Header>
                                <Table.Header fit>
                                    {t(
                                        "questionnairesPage.tableHeaders.status",
                                    )}
                                </Table.Header>
                                <Table.Header fit>
                                    {t(
                                        "questionnairesPage.tableHeaders.updated",
                                    )}
                                </Table.Header>
                            </Table.Row>
                        </Table.Head>
                        <Table.Body>
                            {stats.questionnaires.map((questionnaire) => {
                                const badgeColor =
                                    completionStateBadgeColors[
                                        questionnaire.completionState
                                    ];
                                return (
                                    <Table.Row key={questionnaire.projectId}>
                                        <Table.Cell>
                                            <Link
                                                href={`/projects/${questionnaire.projectId}/questionnaires`}
                                            >
                                                <strong>
                                                    {questionnaire.projectName}
                                                </strong>
                                            </Link>
                                        </Table.Cell>
                                        <Table.Cell>
                                            <Box direction="column" gap="xs">
                                                <ProgressBar
                                                    value={
                                                        questionnaire.answeredCount
                                                    }
                                                    max={
                                                        questionnaire.totalQuestions
                                                    }
                                                    tone={
                                                        questionnaire.completionState ===
                                                        "COMPLETED"
                                                            ? "success"
                                                            : "info"
                                                    }
                                                    name={t(
                                                        "questionnairesPage.answeredProgress",
                                                        {
                                                            projectName:
                                                                questionnaire.projectName,
                                                        },
                                                    )}
                                                />
                                                <Text size="xs" variant="muted">
                                                    {answeredSummary(
                                                        questionnaire,
                                                    )}
                                                </Text>
                                            </Box>
                                        </Table.Cell>
                                        <Table.Cell fit>
                                            <Badge
                                                dot
                                                color={badgeColor}
                                                size="xs"
                                            >
                                                {t(
                                                    `questionnairesPage.statusLabels.${questionnaire.completionState}`,
                                                )}
                                            </Badge>
                                        </Table.Cell>
                                        <Table.Cell fit>
                                            {formatRelativeTime(
                                                new Date(
                                                    questionnaire.updatedAt,
                                                ),
                                            )}
                                        </Table.Cell>
                                    </Table.Row>
                                );
                            })}
                        </Table.Body>
                    </Table>
                )}
            </Box>
        </>
    );
}
