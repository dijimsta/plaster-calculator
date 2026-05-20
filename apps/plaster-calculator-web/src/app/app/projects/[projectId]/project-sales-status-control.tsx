"use client";

import { ChevronRight } from "lucide-react";

import { salesStatusLabel } from "../../../../lib/sales-status.js";
import { cx, ui } from "../../../../lib/styles.js";

import type { SalesStatus } from "../../../../types.js";

interface ProjectSalesStatusControlProps {
    readonly currentStatus: SalesStatus;
    readonly disabled: boolean;
    readonly onRequestOutcome: () => void;
    readonly onStatusChange: (status: SalesStatus) => Promise<void>;
}

export function ProjectSalesStatusControl({
    currentStatus,
    disabled,
    onRequestOutcome,
    onStatusChange,
}: ProjectSalesStatusControlProps) {
    const outcomeLabel =
        currentStatus === "WON" || currentStatus === "LOST"
            ? salesStatusLabel(currentStatus)
            : "Won/Lost";

    return (
        <section className={cx(ui.topbar, "justify-start")}>
            <div className={cx(ui.segmented, "items-center")}>
                <StatusButton
                    currentStatus={currentStatus}
                    disabled={disabled}
                    label={salesStatusLabel("QUOTING")}
                    onClick={() => onStatusChange("QUOTING")}
                    status="QUOTING"
                />
                <ChevronRight size={16} className={ui.muted} />
                <StatusButton
                    currentStatus={currentStatus}
                    disabled={disabled}
                    label={salesStatusLabel("QUOTE_SUBMITTED")}
                    onClick={() => onStatusChange("QUOTE_SUBMITTED")}
                    status="QUOTE_SUBMITTED"
                />
                <ChevronRight size={16} className={ui.muted} />
                <button
                    className={cx(
                        ui.segmentedButton,
                        (currentStatus === "WON" || currentStatus === "LOST") &&
                            ui.segmentedButtonActive,
                    )}
                    disabled={disabled}
                    onClick={onRequestOutcome}
                    type="button"
                >
                    {outcomeLabel}
                </button>
            </div>
        </section>
    );
}

function StatusButton({
    currentStatus,
    disabled,
    label,
    onClick,
    status,
}: {
    readonly currentStatus: SalesStatus;
    readonly disabled: boolean;
    readonly label: string;
    readonly onClick: () => Promise<void>;
    readonly status: SalesStatus;
}) {
    return (
        <button
            className={cx(
                ui.segmentedButton,
                currentStatus === status && ui.segmentedButtonActive,
            )}
            disabled={disabled}
            onClick={() => void onClick()}
            type="button"
        >
            {label}
        </button>
    );
}

interface ProjectOutcomeModalProps {
    readonly disabled: boolean;
    readonly onClose: () => void;
    readonly onSelect: (status: Extract<SalesStatus, "WON" | "LOST">) => void;
}

export function ProjectOutcomeModal({
    disabled,
    onClose,
    onSelect,
}: ProjectOutcomeModalProps) {
    return (
        <div className={ui.modalBackdrop} role="presentation">
            <section
                aria-labelledby="project-outcome-title"
                className={ui.modal}
                role="dialog"
            >
                <div className={ui.editorToolbar}>
                    <h2 id="project-outcome-title">Project outcome</h2>
                </div>
                <p className={ui.muted}>
                    Choose the final sales outcome for this project.
                </p>
                <div className={ui.buttonRow}>
                    <button
                        className={cx(ui.button, ui.buttonPrimary)}
                        disabled={disabled}
                        onClick={() => onSelect("WON")}
                        type="button"
                    >
                        Won
                    </button>
                    <button
                        className={cx(ui.button, ui.buttonDefault)}
                        disabled={disabled}
                        onClick={() => onSelect("LOST")}
                        type="button"
                    >
                        Lost
                    </button>
                    <button
                        className={cx(ui.button, ui.buttonDefault)}
                        disabled={disabled}
                        onClick={onClose}
                        type="button"
                    >
                        Cancel
                    </button>
                </div>
            </section>
        </div>
    );
}
