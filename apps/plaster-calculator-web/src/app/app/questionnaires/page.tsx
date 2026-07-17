"use client";

import { formatRelativeTime } from "@libraries/plaster-calculator-common";
import {
    Badge,
    Box,
    Breadcrumb,
    PageHeading,
    ProgressBar,
    Stats,
    Table,
    Tabs,
    Text,
} from "@libraries/uikit-web";
import { Home, LoaderCircle } from "lucide-react";
import { default as LinkModule } from "next/link.js";

import { useQuestionnaireStats } from "./page.hooks.js";
import { RoutedBreadcrumbItem } from "../../../components/routed-breadcrumb-item.js";

import type { QuestionnaireListItem } from "./page.hooks.js";
import type { QuestionnaireCompletionState } from "@libraries/plaster-calculator-common";
import type { BadgeColor } from "@libraries/uikit-web";

const Link = LinkModule.default;

const completionStateBadges: Record<
    QuestionnaireCompletionState,
    { readonly label: string; readonly color: BadgeColor }
> = {
    NOT_STARTED: { label: "Not started", color: "gray" },
    IN_PROGRESS: { label: "In progress", color: "blue" },
    COMPLETED: { label: "Completed", color: "green" },
};

function answeredSummary(
    questionnaire: Pick<
        QuestionnaireListItem,
        "answeredCount" | "totalQuestions"
    >,
): string {
    const { answeredCount, totalQuestions } = questionnaire;
    const openCount = totalQuestions - answeredCount;
    const confirmed = `${answeredCount} of ${totalQuestions} confirmed`;
    return openCount > 0 ? `${confirmed} – ${openCount} open` : confirmed;
}

export default function QuestionnairesPage() {
    const stats = useQuestionnaireStats();

    return (
        <>
            <PageHeading>
                <PageHeading.Breadcrumbs>
                    <Breadcrumb>
                        <RoutedBreadcrumbItem href="/app">
                            <Home size={16} aria-label="Home" />
                        </RoutedBreadcrumbItem>
                        <Breadcrumb.Item current>
                            Questionnaires
                        </Breadcrumb.Item>
                    </Breadcrumb>
                </PageHeading.Breadcrumbs>
                <PageHeading.Content>
                    <PageHeading.Title>Questionnaires</PageHeading.Title>
                    <PageHeading.Description>
                        Every project&apos;s scope questionnaire in one place.
                        Open one to auto-fill, confirm answers and chase the
                        builder for what&apos;s missing.
                    </PageHeading.Description>
                </PageHeading.Content>
                <PageHeading.Navigation>
                    <Tabs>
                        <Tabs.Item current>
                            <Link href="/app/questionnaires">Projects</Link>
                        </Tabs.Item>
                        <Tabs.Item>
                            <Link href="/app/questionnaires/templates">
                                Templates
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
                            label: "Total questionnaires",
                            value: stats.isLoading ? "—" : stats.total,
                        },
                        {
                            id: "in-progress",
                            label: "In progress",
                            value: stats.isLoading
                                ? "—"
                                : stats.inProgressCount,
                            valueTone: "info",
                        },
                        {
                            id: "completed",
                            label: "Completed",
                            value: stats.isLoading ? "—" : stats.completedCount,
                            valueTone: "success",
                        },
                    ]}
                />
                {stats.isLoading ? (
                    <Box
                        align="center"
                        justify="center"
                        gap="sm"
                        role="status"
                        aria-live="polite"
                    >
                        <LoaderCircle className="animate-spin" size={24} />
                        <Text variant="muted">Loading questionnaires...</Text>
                    </Box>
                ) : stats.questionnaires.length === 0 ? (
                    <Text variant="muted">No questionnaires yet.</Text>
                ) : (
                    <Table bordered>
                        <Table.Head>
                            <Table.Row>
                                <Table.Header>Project</Table.Header>
                                <Table.Header>Progress</Table.Header>
                                <Table.Header fit>Status</Table.Header>
                                <Table.Header fit>Updated</Table.Header>
                            </Table.Row>
                        </Table.Head>
                        <Table.Body>
                            {stats.questionnaires.map((questionnaire) => {
                                const badge =
                                    completionStateBadges[
                                        questionnaire.completionState
                                    ];
                                return (
                                    <Table.Row key={questionnaire.projectId}>
                                        <Table.Cell>
                                            <Link
                                                href={`/app/projects/${questionnaire.projectId}/questionnaires`}
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
                                                    aria-label={`${questionnaire.projectName} answered`}
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
                                                color={badge.color}
                                                size="xs"
                                            >
                                                {badge.label}
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
