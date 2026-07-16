"use client";

import { SelectMenu } from "@libraries/uikit-web";

import { salesStatusLabels } from "../../../../lib/sales-status.js";

import type { SalesStatus } from "@libraries/plaster-calculator-common";
import type { SelectMenuOption } from "@libraries/uikit-web";

const STATUS_OPTIONS: SelectMenuOption[] = [
    { value: "QUOTING", label: salesStatusLabels.QUOTING },
    { value: "QUOTE_SUBMITTED", label: salesStatusLabels.QUOTE_SUBMITTED },
    { value: "WON", label: salesStatusLabels.WON },
    { value: "LOST", label: salesStatusLabels.LOST },
];

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
    return (
        <SelectMenu
            aria-label="Sales status"
            disabled={disabled}
            options={STATUS_OPTIONS}
            value={currentStatus}
            onChange={(event) => {
                void onStatusChange(event.target.value as SalesStatus);
            }}
        />
    );
}
