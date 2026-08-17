"use client";

import type { Reminder } from "@libraries/plaster-calculator-common";
import { Box, Button, Input, SelectMenu } from "@libraries/uikit-web";
import { useState } from "react";
import type { ChangeEvent, ReactElement } from "react";

import { useAppTranslation } from "../../i18n/index.ts";

import { addDaysIso } from "./hooks/use-follow-up-reminders.js";

const RESCHEDULE_OPTION_DAYS: Readonly<Record<string, number>> = {
    tomorrow: 1,
    in3Days: 3,
    nextWeek: 7,
};

export type RescheduleControlProps = Readonly<{
    reminder: Reminder;
    disabled: boolean;
    onReschedule: (
        reminder: Reminder,
        dueAt: string,
        action: "snoozed" | "rescheduled",
    ) => void;
}>;

/** Reschedule menu (Tomorrow / In 3 days / Next week / an exact date) for a follow-up row. */
export function RescheduleControl({
    reminder,
    disabled,
    onReschedule,
}: RescheduleControlProps): ReactElement {
    const { t } = useAppTranslation();
    const [showCustomDate, setShowCustomDate] = useState(false);
    const [customDate, setCustomDate] = useState("");

    function handleOptionChange(event: ChangeEvent<HTMLSelectElement>) {
        const value = event.target.value;
        if (value === "custom") {
            setShowCustomDate(true);
            return;
        }
        const days = RESCHEDULE_OPTION_DAYS[value];
        if (days === undefined) return;
        onReschedule(reminder, addDaysIso(days), "rescheduled");
    }

    function handleSetCustomDate() {
        if (!customDate) return;
        onReschedule(
            reminder,
            new Date(`${customDate}T00:00:00Z`).toISOString(),
            "rescheduled",
        );
        setShowCustomDate(false);
        setCustomDate("");
    }

    return (
        <Box direction="row" align="center" gap="sm" wrap>
            <SelectMenu
                label={t("needsFollowUp.actions.rescheduleLabel")}
                value=""
                disabled={disabled}
                onChange={handleOptionChange}
                options={[
                    { value: "", label: t("needsFollowUp.actions.reschedule") },
                    {
                        value: "tomorrow",
                        label: t("needsFollowUp.actions.options.tomorrow"),
                    },
                    {
                        value: "in3Days",
                        label: t("needsFollowUp.actions.options.in3Days"),
                    },
                    {
                        value: "nextWeek",
                        label: t("needsFollowUp.actions.options.nextWeek"),
                    },
                    {
                        value: "custom",
                        label: t("needsFollowUp.actions.options.custom"),
                    },
                ]}
            />
            {showCustomDate && (
                <>
                    <Input
                        type="date"
                        label={t("needsFollowUp.actions.rescheduleLabel")}
                        value={customDate}
                        disabled={disabled}
                        onChange={(event) => setCustomDate(event.target.value)}
                    />
                    <Button
                        variant="secondary"
                        size="small"
                        disabled={disabled || !customDate}
                        onClick={handleSetCustomDate}
                    >
                        {t("needsFollowUp.actions.setDate")}
                    </Button>
                </>
            )}
        </Box>
    );
}
