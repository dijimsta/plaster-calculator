"use client";

import { OPEN_REMINDER_STATUS } from "@libraries/plaster-calculator-common";
import {
    Alert,
    Box,
    Button,
    EmptyState,
    Heading2,
    Text,
} from "@libraries/uikit-web";
import { BellRing, LoaderCircle } from "lucide-react";
import type { ReactElement } from "react";

import { useAppTranslation } from "../../../../i18n/index.ts";
import { cx, ui } from "../../../../lib/styles.js";
import { useFollowUpWindowDays } from "../../hooks/use-follow-up-window-days.js";

import { ProjectFollowUpOpenState } from "./project-follow-up-open-state.js";
import { ProjectFollowUpOutcomeState } from "./project-follow-up-outcome-state.js";
import { useProjectFollowUp } from "./use-project-follow-up.js";

export type ProjectFollowUpPanelProps = Readonly<{
    projectId: string;
}>;

/** Quote submitted view's follow-up panel: the project's open, done, cancelled, or missing reminder. */
export function ProjectFollowUpPanel({
    projectId,
}: ProjectFollowUpPanelProps): ReactElement {
    const { t } = useAppTranslation();

    return (
        <div className={cx(ui.panel, ui.stack)}>
            <Heading2>{t("projectStatusContent.followUp.title")}</Heading2>
            <ProjectFollowUpBody projectId={projectId} />
        </div>
    );
}

function ProjectFollowUpBody({
    projectId,
}: ProjectFollowUpPanelProps): ReactElement {
    const followUp = useProjectFollowUp(projectId);
    const windowDays = useFollowUpWindowDays();
    const { t } = useAppTranslation();

    if (followUp.error) {
        return (
            <Box direction="column" gap="md">
                <Alert
                    intent="error"
                    title={t(
                        "projectStatusContent.followUp.errors.unableToLoad",
                    )}
                >
                    {followUp.error}
                </Alert>
                <Box>
                    <Button
                        variant="secondary"
                        onClick={() => void followUp.refresh()}
                    >
                        {t("projectStatusContent.followUp.errors.tryAgain")}
                    </Button>
                </Box>
            </Box>
        );
    }

    if (followUp.isLoading) {
        return (
            <div
                className={ui.projectListState}
                role="status"
                aria-live="polite"
            >
                <LoaderCircle className="animate-spin" size={24} />
                <Text size="sm" variant="muted">
                    {t("projectStatusContent.followUp.loading")}
                </Text>
            </div>
        );
    }

    if (!followUp.reminder) {
        return (
            <EmptyState
                icon={<BellRing />}
                title={t("projectStatusContent.followUp.empty.title")}
                description={t(
                    "projectStatusContent.followUp.empty.description",
                )}
            />
        );
    }

    if (followUp.reminder.status === OPEN_REMINDER_STATUS) {
        return (
            <ProjectFollowUpOpenState
                reminder={followUp.reminder}
                windowDays={windowDays}
                isSaving={followUp.isSaving}
                onComplete={followUp.completeReminder}
                onCancel={followUp.cancelReminder}
                onReschedule={followUp.rescheduleReminder}
            />
        );
    }

    return (
        <ProjectFollowUpOutcomeState
            reminder={followUp.reminder}
            isSaving={followUp.isSaving}
            onReopen={followUp.reopenReminder}
        />
    );
}
