"use client";

import type { TeamMember } from "@libraries/plaster-calculator-common";
import {
    Alert,
    Badge,
    Box,
    Button,
    ButtonGroup,
    EmptyState,
    Heading6,
    Text,
} from "@libraries/uikit-web";
import { BellRing, ChevronDown, ChevronUp, LoaderCircle } from "lucide-react";
import { useState, type ReactElement } from "react";

import { useAppTranslation } from "../../i18n/index.ts";
import { cx, ui } from "../../lib/styles.js";

import { FollowUpRow } from "./follow-up-reminder-row.js";
import type {
    FollowUpScope,
    UseFollowUpRemindersResult,
} from "./hooks/use-follow-up-reminders.js";
import { useFollowUpWindowDays } from "./hooks/use-follow-up-window-days.js";
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
    // `null` means the user hasn't chosen yet -- follow the data (collapsed
    // until there's something open to show). Once they toggle it explicitly,
    // that choice sticks regardless of scope or count changes.
    const [expandedOverride, setExpandedOverride] = useState<boolean | null>(
        null,
    );
    const expanded =
        expandedOverride ?? (!props.isLoading && props.openCount > 0);

    return (
        <section className={cx(ui.panel, ui.stack)}>
            <FollowUpPanelHeader
                openCount={props.openCount}
                overdueCount={props.overdueCount}
                scope={props.scope}
                setScope={props.setScope}
                expanded={expanded}
                onToggleExpanded={() => setExpandedOverride(!expanded)}
            />
            {expanded && (
                <FollowUpPanelBody {...props} membersById={membersById} />
            )}
        </section>
    );
}

type FollowUpPanelHeaderProps = Readonly<{
    openCount: number;
    overdueCount: number;
    scope: FollowUpScope;
    setScope: (scope: FollowUpScope) => void;
    expanded: boolean;
    onToggleExpanded: () => void;
}>;

function FollowUpPanelHeader({
    openCount,
    overdueCount,
    scope,
    setScope,
    expanded,
    onToggleExpanded,
}: FollowUpPanelHeaderProps): ReactElement {
    const { t } = useAppTranslation();
    const windowDays = useFollowUpWindowDays();

    return (
        <Box direction="row" align="center" justify="between" gap="sm" wrap>
            <Box direction="row" align="center" gap="sm" wrap>
                <Heading6>{t("needsFollowUp.title")}</Heading6>
                <Badge color="gray" size="xs">
                    {t("needsFollowUp.openCount", { count: openCount })}
                </Badge>
                {overdueCount > 0 && (
                    <Badge color="yellow" dot size="xs">
                        {t("needsFollowUp.overdueBadge", {
                            count: overdueCount,
                        })}
                    </Badge>
                )}
            </Box>
            <Box direction="row" align="center" gap="md" wrap>
                {windowDays !== null && (
                    <Text size="sm" variant="muted">
                        {t("needsFollowUp.description", {
                            count: windowDays,
                        })}
                    </Text>
                )}
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
                <Button
                    variant="secondary"
                    size="small"
                    icon={
                        expanded ? (
                            <ChevronUp size={16} aria-hidden="true" />
                        ) : (
                            <ChevronDown size={16} aria-hidden="true" />
                        )
                    }
                    label={t(
                        expanded
                            ? "needsFollowUp.collapse"
                            : "needsFollowUp.expand",
                    )}
                    onClick={onToggleExpanded}
                />
            </Box>
        </Box>
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
