import clsx from "clsx";
import { ArrowDownRight, ArrowUpRight, Minus } from "lucide-react";

import {
    DEFAULT_COLUMNS,
    DEFAULT_TREND_DIRECTION,
    DEFAULT_VARIANT,
    DEFAULT_VALUE_TONE,
    columns,
    itemVariants,
    sharedBorderColumns,
    sharedBorderItemStyle,
    styles,
    trendDirections,
    valueTones,
    variants,
    type StatsColumnCount,
    type StatsTrendDirection,
    type StatsValueTone,
    type StatsVariant,
} from "./stats.styles.ts";

import type { HTMLAttributes, ReactElement, ReactNode } from "react";

export type {
    StatsColumnCount,
    StatsTrendDirection,
    StatsValueTone,
    StatsVariant,
};

export type StatsTrend = {
    /** Direction used to color and icon the trend value. */
    readonly direction?: StatsTrendDirection;
    /** Short trend value, for example "+12%" or "-4.5%". */
    readonly value: ReactNode;
    /** Optional visible context shown after the trend value. */
    readonly label?: ReactNode;
};

export type StatsItem = {
    /** Stable identifier used as the React key. */
    readonly id: string;
    /** Stat label rendered as the definition term. */
    readonly label: ReactNode;
    /** Primary stat value rendered as the definition details. */
    readonly value: ReactNode;
    /** Optional icon displayed at the end of the stat item. */
    readonly icon?: ReactNode;
    /** Optional supporting copy displayed below the stat value. */
    readonly description?: ReactNode;
    /** Optional directional trend displayed below the stat value. */
    readonly trend?: StatsTrend;
    /** Optional color tone applied to the stat value. */
    readonly valueTone?: StatsValueTone;
};

export type StatsProps = Omit<HTMLAttributes<HTMLDListElement>, "children"> & {
    /** Stats to display. */
    readonly items: readonly StatsItem[];
    /** Maximum number of columns shown at large viewports. */
    readonly columns?: StatsColumnCount;
    /** Presentation style for the stat collection. */
    readonly variant?: StatsVariant;
};

type StatsItemProps = {
    readonly item: StatsItem;
    readonly variant: StatsVariant;
};

type StatsTrendProps = {
    readonly trend: StatsTrend;
};

/** Displays a responsive collection of summary metrics. */
export function Stats({
    items,
    columns: columnCount = DEFAULT_COLUMNS,
    variant = DEFAULT_VARIANT,
    className,
    ...props
}: StatsProps): ReactElement {
    return (
        <dl
            className={clsx(
                styles.root,
                columns[columnCount],
                variants[variant],
                variant === "shared-borders" &&
                    sharedBorderColumns[columnCount],
                className,
            )}
            {...props}
        >
            {items.map((item) => (
                <StatsItemView key={item.id} item={item} variant={variant} />
            ))}
        </dl>
    );
}

function StatsItemView({ item, variant }: StatsItemProps): ReactElement {
    return (
        <div
            className={clsx(
                itemVariants[variant],
                variant === "shared-borders" && sharedBorderItemStyle,
            )}
        >
            <div className={styles.itemContent}>
                <div className={styles.itemBody}>
                    <dt className={styles.label}>{item.label}</dt>
                    <dd
                        className={clsx(
                            styles.value,
                            valueTones[item.valueTone ?? DEFAULT_VALUE_TONE],
                        )}
                    >
                        {item.value}
                    </dd>
                </div>
                {item.icon && (
                    <span className={styles.icon} aria-hidden="true">
                        {item.icon}
                    </span>
                )}
            </div>
            {item.description && (
                <p className={styles.description}>{item.description}</p>
            )}
            {item.trend && <StatsTrendView trend={item.trend} />}
        </div>
    );
}

function StatsTrendView({ trend }: StatsTrendProps): ReactElement {
    const direction = trend.direction ?? DEFAULT_TREND_DIRECTION;
    const TrendIcon = getTrendIcon(direction);

    return (
        <p className={clsx(styles.trend, trendDirections[direction])}>
            <TrendIcon className={styles.trendIcon} aria-hidden="true" />
            <span>{trend.value}</span>
            {trend.label && <span>{trend.label}</span>}
        </p>
    );
}

function getTrendIcon(direction: StatsTrendDirection): typeof ArrowUpRight {
    if (direction === "up") {
        return ArrowUpRight;
    } else if (direction === "down") {
        return ArrowDownRight;
    } else {
        return Minus;
    }
}
