import type {
    MouseEventHandler,
    MouseEvent as ReactMouseEvent,
    ReactElement,
    ReactNode,
} from "react";

import {
    buttonClassName,
    hoverRevealIcon,
    type ButtonSize,
    type ButtonContentAlignment,
    type ButtonVariant,
} from "./button.styles.ts";

export type { ButtonSize };
export type ButtonIconPosition = "left" | "right";

export type ButtonProps = {
    readonly variant?: ButtonVariant;
    readonly size?: ButtonSize;
    readonly icon?: ReactElement;
    readonly iconPosition?: ButtonIconPosition;
    /** Reveals the icon when the button is hovered or keyboard-focused. */
    readonly revealIconOnHover?: boolean;
    /** Allows the button to grow to fill available space in a flex row. */
    readonly grow?: boolean;
    readonly fullWidth?: boolean;
    readonly align?: ButtonContentAlignment;
    /** Names icon-only actions and is announced when no visible text is present. */
    readonly label?: string;
    readonly type?: "button" | "reset" | "submit";
    readonly disabled?: boolean;
    readonly form?: string;
    readonly title?: string;
    readonly onClick?: MouseEventHandler<HTMLButtonElement>;
    readonly onMouseDown?: (event: ReactMouseEvent<HTMLButtonElement>) => void;
    readonly children?: ReactNode;
};

export function Button({
    variant = "primary",
    size = "medium",
    icon,
    iconPosition = "left",
    revealIconOnHover = false,
    grow = false,
    fullWidth = false,
    align = "center",
    label,
    type,
    disabled,
    form,
    title,
    onClick,
    onMouseDown,
    children,
}: ButtonProps): ReactElement {
    const renderedIcon = renderIcon(icon, revealIconOnHover);

    return (
        <button
            type={type}
            disabled={disabled}
            form={form}
            title={title}
            aria-label={label}
            onClick={onClick}
            onMouseDown={onMouseDown}
            className={buttonClassName({
                align,
                fullWidth,
                grow,
                size,
                variant,
            })}
        >
            {iconPosition === "left" && renderedIcon}
            {children}
            {iconPosition === "right" && renderedIcon}
        </button>
    );
}

function renderIcon(
    icon: ReactElement | undefined,
    revealOnHover: boolean,
): ReactNode {
    if (icon === undefined) return undefined;
    return revealOnHover ? (
        <span className={hoverRevealIcon}>{icon}</span>
    ) : (
        icon
    );
}
