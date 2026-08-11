"use client";

import type { SalesStatus } from "@libraries/plaster-calculator-common";
import { SelectMenu } from "@libraries/uikit-web";
import type { SelectMenuOption } from "@libraries/uikit-web";

import { useAppTranslation } from "../../../../i18n/index.ts";
import { useSalesStatusLabel } from "../../../../lib/sales-status.js";

interface ProjectSalesStatusControlProps {
    readonly currentStatus: SalesStatus;
    readonly disabled: boolean;
    readonly onStatusChange: (status: SalesStatus) => Promise<void>;
}

export function ProjectSalesStatusControl({
    currentStatus,
    disabled,
    onStatusChange,
}: ProjectSalesStatusControlProps) {
    const { t } = useAppTranslation();
    const salesStatusLabel = useSalesStatusLabel();

    const statusOptions: SelectMenuOption[] = [
        { value: "QUOTING", label: salesStatusLabel("QUOTING") },
        {
            value: "QUOTE_SUBMITTED",
            label: salesStatusLabel("QUOTE_SUBMITTED"),
        },
        { value: "WON", label: salesStatusLabel("WON") },
        { value: "LOST", label: salesStatusLabel("LOST") },
    ];

    return (
        <SelectMenu
            label={t("salesStatus.label")}
            disabled={disabled}
            options={statusOptions}
            value={currentStatus}
            onChange={(event) => {
                void onStatusChange(event.target.value as SalesStatus);
            }}
        />
    );
}
