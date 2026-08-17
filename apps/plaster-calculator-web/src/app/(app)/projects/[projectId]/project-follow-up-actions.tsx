"use client";

import { Box, Button, Input } from "@libraries/uikit-web";
import { useState } from "react";
import type { ReactElement } from "react";

import { useAppTranslation } from "../../../../i18n/index.ts";

import { addDaysIso } from "./use-project-follow-up.utils.js";

const SNOOZE_DAYS = 3;

export type ProjectFollowUpActionsProps = Readonly<{
    isSaving: boolean;
    onComplete: () => void;
    onCancel: () => void;
    onReschedule: (dueAt: string) => void;
}>;

/** The open state's action row: mark done, snooze 3 days, pick a date, cancel. */
export function ProjectFollowUpActions({
    isSaving,
    onComplete,
    onCancel,
    onReschedule,
}: ProjectFollowUpActionsProps): ReactElement {
    const { t } = useAppTranslation();
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [pickedDate, setPickedDate] = useState("");

    function handleSetDate(): void {
        if (!pickedDate) return;
        onReschedule(new Date(`${pickedDate}T00:00:00Z`).toISOString());
        setShowDatePicker(false);
        setPickedDate("");
    }

    return (
        <Box direction="row" align="center" gap="sm" wrap>
            <Button
                variant="secondary"
                size="small"
                disabled={isSaving}
                onClick={onComplete}
            >
                {t("projectStatusContent.followUp.actions.done")}
            </Button>
            <Button
                variant="secondary"
                size="small"
                disabled={isSaving}
                onClick={() => onReschedule(addDaysIso(SNOOZE_DAYS))}
            >
                {t("projectStatusContent.followUp.actions.snooze")}
            </Button>
            {showDatePicker ? (
                <>
                    <Input
                        type="date"
                        label={t(
                            "projectStatusContent.followUp.actions.pickDateLabel",
                        )}
                        value={pickedDate}
                        disabled={isSaving}
                        onChange={(event) => setPickedDate(event.target.value)}
                    />
                    <Button
                        variant="secondary"
                        size="small"
                        disabled={isSaving || !pickedDate}
                        onClick={handleSetDate}
                    >
                        {t("projectStatusContent.followUp.actions.setDate")}
                    </Button>
                </>
            ) : (
                <Button
                    variant="secondary"
                    size="small"
                    disabled={isSaving}
                    onClick={() => setShowDatePicker(true)}
                >
                    {t("projectStatusContent.followUp.actions.pickDate")}
                </Button>
            )}
            <Button
                variant="dangerSoft"
                size="small"
                disabled={isSaving}
                onClick={onCancel}
            >
                {t("projectStatusContent.followUp.actions.cancel")}
            </Button>
        </Box>
    );
}
