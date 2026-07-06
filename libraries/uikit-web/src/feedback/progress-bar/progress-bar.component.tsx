import clsx from "clsx";

import { styles, type ProgressBarSize } from "./progress-bar.styles.ts";

import type { HTMLAttributes, ReactElement, ReactNode } from "react";

export type { ProgressBarSize };

export type ProgressBarProps = Omit<
    HTMLAttributes<HTMLDivElement>,
    "children"
> & {
    /** Current progress value. Values outside the range are clamped. */
    readonly value: number;
    /** Highest possible progress value. Must be greater than zero. */
    readonly max?: number;
    /** Optional label displayed above the progress track. */
    readonly label?: ReactNode;
    /** Displays the normalized progress as a percentage. */
    readonly showValue?: boolean;
    /** Height of the progress track. */
    readonly size?: ProgressBarSize;
};

type ProgressBarHeaderProps = {
    readonly label?: ReactNode;
    readonly percentage: number;
    readonly showValue: boolean;
};

function ProgressBarHeader({
    label,
    percentage,
    showValue,
}: ProgressBarHeaderProps): ReactElement | undefined {
    if (label === undefined && !showValue) return undefined;

    return (
        <div className={styles.header}>
            <span>{label}</span>
            {showValue && <span className={styles.value}>{percentage}%</span>}
        </div>
    );
}

function normalizeMax(max: number): number {
    return Number.isFinite(max) && max > 0 ? max : 100;
}

function normalizeValue(value: number, max: number): number {
    if (!Number.isFinite(value)) return 0;
    return Math.min(Math.max(value, 0), max);
}

/** Displays determinate progress toward completion. */
export function ProgressBar({
    value,
    max = 100,
    label,
    showValue = false,
    size = "sm",
    className,
    "aria-label": ariaLabel,
    ...props
}: ProgressBarProps): ReactElement {
    const normalizedMax = normalizeMax(max);
    const normalizedValue = normalizeValue(value, normalizedMax);
    const percentage = Math.round((normalizedValue / normalizedMax) * 100);

    return (
        <div className={clsx(styles.root, className)} {...props}>
            <ProgressBarHeader
                label={label}
                percentage={percentage}
                showValue={showValue}
            />
            <div
                role="progressbar"
                aria-label={
                    ariaLabel ??
                    (typeof label === "string" ? label : "Progress")
                }
                aria-valuemax={normalizedMax}
                aria-valuemin={0}
                aria-valuenow={normalizedValue}
                className={clsx(styles.track, styles.sizes[size])}
            >
                <div
                    aria-hidden="true"
                    className={styles.indicator}
                    style={{ width: `${percentage}%` }}
                />
            </div>
        </div>
    );
}
