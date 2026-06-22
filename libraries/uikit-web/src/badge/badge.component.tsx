import clsx from "clsx";

import {
    colors,
    removeButtonColors,
    removeButtonIconColors,
    type BadgeColor,
} from "./badge.colors.ts";
import { DEFAULT_COLOR, DEFAULT_VARIANT } from "./badge.constants.ts";
import { removeButtonStyles } from "./badge.styles.ts";
import { variants, type BadgeVariant } from "./badge.variants.ts";

import type { HTMLAttributes, ReactElement } from "react";

export type BadgeProps = HTMLAttributes<HTMLSpanElement> & {
    readonly color?: BadgeColor;
    readonly variant?: BadgeVariant;
    readonly onRemove?: () => void;
};

export function Badge({
    color = DEFAULT_COLOR,
    variant = DEFAULT_VARIANT,
    onRemove,
    className,
    children,
    ...props
}: BadgeProps): ReactElement {
    return (
        <span
            className={clsx(
                variants[variant],
                colors[color],
                onRemove !== undefined && "gap-x-0.5",
                className,
            )}
            {...props}
        >
            {children}
            {onRemove !== undefined && (
                <BadgeRemoveButton color={color} onClick={onRemove} />
            )}
        </span>
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
