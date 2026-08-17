"use client";

import type { TeamMember } from "@libraries/plaster-calculator-common";
import {
    Alert,
    Badge,
    Box,
    Button,
    ButtonGroup,
    EmptyState,
    Text,
} from "@libraries/uikit-web";
import { BellRing, LoaderCircle } from "lucide-react";
import type { ReactElement } from "react";

import { useAppTranslation } from "../../i18n/index.ts";
import { cx, ui } from "../../lib/styles.js";

import { FollowUpRow } from "./follow-up-reminder-row.js";
import type {
    FollowUpScope,
    UseFollowUpRemindersResult,
} from "./hooks/use-follow-up-reminders.js";
import { useTeamMembers } from "./user/team/use-team-members.js";

export type NeedsFollowUpPanelProps = UseFollowUpRemindersResult;

/** Overview's "Needs follow-up" panel: the signed-in user's (or the team's) open quote follow-up reminders. */
export function NeedsFollowUpPanel(
    props: NeedsFollowUpPanelProps,
): ReactElement {
    const team = useTeamMembers();
    const membersById = new Map(
        (team.data?.members ?? []).map((member) => [member.userId, member]),
    );

    return (
        <section className={cx(ui.panel, ui.stack)}>
            <FollowUpPanelHeader
                openCount={props.openCount}
                overdueCount={props.overdueCount}
                scope={props.scope}
                setScope={props.setScope}
            />
            <FollowUpPanelBody {...props} membersById={membersById} />
        </section>
    );
}

type FollowUpPanelHeaderProps = Readonly<{
    openCount: number;
    overdueCount: number;
    scope: FollowUpScope;
    setScope: (scope: FollowUpScope) => void;
}>;

function FollowUpPanelHeader({
    openCount,
    overdueCount,
    scope,
    setScope,
}: FollowUpPanelHeaderProps): ReactElement {
    const { t } = useAppTranslation();

    return (
        <div className={ui.editorToolbar}>
            <Box direction="column" gap="xs">
                <h2>{t("needsFollowUp.title")}</h2>
                <Box direction="row" align="center" gap="sm" wrap>
                    <Text size="sm" variant="muted">
                        {t("needsFollowUp.openCount", { count: openCount })}
                    </Text>
                    {overdueCount > 0 && (
                        <Badge color="yellow" dot size="xs">
                            {t("needsFollowUp.overdueBadge", {
                                count: overdueCount,
                            })}
                        </Badge>
                    )}
                </Box>
            </Box>
            <ButtonGroup label={t("needsFollowUp.scopeLabel")}>
                <Button
                    variant={scope === "mine" ? "primary" : "secondary"}
                    size="small"
                    onClick={() => setScope("mine")}
                >
                    {t("needsFollowUp.scope.mine")}
                </Button>
                <Button
                    variant={scope === "team" ? "primary" : "secondary"}
                    size="small"
                    onClick={() => setScope("team")}
                >
                    {t("needsFollowUp.scope.team")}
                </Button>
            </ButtonGroup>
        </div>
    );
}

type FollowUpPanelBodyProps = UseFollowUpRemindersResult & {
    readonly membersById: ReadonlyMap<string, TeamMember>;
};

function FollowUpPanelBody({
    rows,
    isLoading,
    error,
    scope,
    confirmations,
    pendingReminderIds,
    refresh,
    completeReminder,
    cancelReminder,
    updateReminderDueDate,
    undoReminder,
    membersById,
}: FollowUpPanelBodyProps): ReactElement {
    const { t } = useAppTranslation();

    if (error) {
        return (
            <Box direction="column" gap="md">
                <Alert
                    intent="error"
                    title={t("needsFollowUp.errors.unableToLoad")}
                >
                    {error}
                </Alert>
                <Box>
                    <Button variant="secondary" onClick={() => void refresh()}>
                        {t("needsFollowUp.errors.tryAgain")}
                    </Button>
                </Box>
            </Box>
        );
    }

    if (isLoading) {
        return (
            <div
                className={ui.projectListState}
                role="status"
                aria-live="polite"
            >
                <LoaderCircle className="animate-spin" size={24} />
                <Text size="sm" variant="muted">
                    {t("needsFollowUp.loading")}
                </Text>
            </div>
        );
    }

    return (
        <div className={ui.projectList}>
            {rows.map((row) => (
                <FollowUpRow
                    key={row.reminder.id}
                    row={row}
                    scope={scope}
                    member={membersById.get(row.reminder.assignee ?? "")}
                    confirmation={confirmations.get(row.reminder.id)}
                    isPending={pendingReminderIds.has(row.reminder.id)}
                    onComplete={completeReminder}
                    onCancel={cancelReminder}
                    onReschedule={updateReminderDueDate}
                    onUndo={undoReminder}
                />
            ))}
            {rows.length === 0 && <FollowUpEmptyState scope={scope} />}
        </div>
    );
}

function FollowUpEmptyState({
    scope,
}: {
    readonly scope: FollowUpScope;
}): ReactElement {
    const { t } = useAppTranslation();

    return (
        <EmptyState
            icon={<BellRing />}
            title={t(
                scope === "mine"
                    ? "needsFollowUp.emptyMine.title"
                    : "needsFollowUp.emptyTeam.title",
            )}
            description={t(
                scope === "mine"
                    ? "needsFollowUp.emptyMine.description"
                    : "needsFollowUp.emptyTeam.description",
            )}
        />
    );
}
