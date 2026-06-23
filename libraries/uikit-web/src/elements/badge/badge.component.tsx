import clsx from "clsx";

import {
    DEFAULT_COLOR,
    DEFAULT_SIZE,
    DEFAULT_VARIANT,
    borderColors,
    colors,
    dotColors,
    dotStyles,
    removeButtonColors,
    removeButtonIconColors,
    removeButtonStyles,
    sizes,
    variants,
    type BadgeColor,
    type BadgeSize,
    type BadgeVariant,
} from "./badge.styles.ts";

import type { HTMLAttributes, ReactElement } from "react";

export type BadgeProps = HTMLAttributes<HTMLSpanElement> & {
    /** Color scheme applied to the badge. */
    readonly color?: BadgeColor;
    /** Shape and border style of the badge. */
    readonly variant?: BadgeVariant;
    /** Controls padding and font size. */
    readonly size?: BadgeSize;
    /** When true, renders a colored dot before the label. */
    readonly dot?: boolean;
    /** When provided, renders a remove button and calls this handler on click. */
    readonly onRemove?: () => void;
};

export function Badge({
    color = DEFAULT_COLOR,
    variant = DEFAULT_VARIANT,
    size = DEFAULT_SIZE,
    dot,
    onRemove,
    className,
    children,
    ...props
}: BadgeProps): ReactElement {
    return (
        <span
            className={clsx(
                variants[variant],
                sizes[size],
                colors[color],
                (variant === "flat-with-border" ||
                    variant === "pill-with-border") &&
                    borderColors[color],
                className,
            )}
            {...props}
        >
            {dot && <BadgeDot color={color} />}
            {children}
            {onRemove && <BadgeRemoveButton color={color} onClick={onRemove} />}
        </span>
    );
}

type BadgeDotProps = {
    readonly color: BadgeColor;
};

function BadgeDot({ color }: BadgeDotProps): ReactElement {
    return (
        <svg
            viewBox="0 0 6 6"
            aria-hidden="true"
            className={clsx(dotStyles, dotColors[color])}
        >
            <circle r="3" cx="3" cy="3" />
        </svg>
    );
}

type BadgeRemoveButtonProps = {
    readonly color: BadgeColor;
    readonly onClick: () => void;
};

function BadgeRemoveButton({
    color,
    onClick,
}: BadgeRemoveButtonProps): ReactElement {
    return (
        <button
            type="button"
            aria-label="Remove"
            className={clsx(
                removeButtonStyles.button,
                removeButtonColors[color],
            )}
            onClick={onClick}
        >
            <BadgeRemoveIcon color={color} />
            <span className={removeButtonStyles.hitArea} />
        </button>
    );
}

type BadgeRemoveIconProps = {
    readonly color: BadgeColor;
};

function BadgeRemoveIcon({ color }: BadgeRemoveIconProps): ReactElement {
    return (
        <svg
            viewBox="0 0 14 14"
            className={clsx(
                removeButtonStyles.icon,
                removeButtonIconColors[color],
            )}
        >
            <path d="M4 4l6 6m0-6l-6 6" />
        </svg>
    );
}
