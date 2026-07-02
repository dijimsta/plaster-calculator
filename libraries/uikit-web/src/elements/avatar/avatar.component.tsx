import clsx from "clsx";

import {
    DEFAULT_COLOR,
    DEFAULT_SHAPE,
    DEFAULT_SIZE,
    imageBase,
    initialsBase,
    initialsColors,
    placeholderBase,
    shapes,
    sizes,
    statusBase,
    statusColors,
    statusDotSizes,
    statusPositionCircular,
    statusPositionSquare,
    textSizes,
    wrapperBase,
    type AvatarColor,
    type AvatarShape,
    type AvatarSize,
    type AvatarStatus,
} from "./avatar.styles.ts";

import type { HTMLAttributes, ReactElement } from "react";

export type { AvatarColor, AvatarShape, AvatarSize, AvatarStatus };

export type AvatarProps = HTMLAttributes<HTMLSpanElement> & {
    /** URL of the image to display. When provided, initials and placeholder are ignored. */
    readonly src?: string;
    /** Alt text for the image. Ignored when no src is provided. */
    readonly alt?: string;
    /** Initials to show when no image is available. One or two characters recommended. */
    readonly initials?: string;
    /** Background color applied to the initials variant. */
    readonly color?: AvatarColor;
    /** Controls the width and height of the avatar. */
    readonly size?: AvatarSize;
    /** Border radius style — circular (round) or square (rounded corners). */
    readonly shape?: AvatarShape;
    /** Presence status shown as a colored dot. */
    readonly status?: AvatarStatus;
};

export function Avatar({
    src,
    alt = "",
    initials,
    color = DEFAULT_COLOR,
    size = DEFAULT_SIZE,
    shape = DEFAULT_SHAPE,
    status,
    className,
    ...props
}: AvatarProps): ReactElement {
    const shapeClass = shapes[shape];
    const sizeClass = sizes[size];

    return (
        <span className={clsx(wrapperBase, className)} {...props}>
            {src !== undefined ? (
                <img
                    src={src}
                    alt={alt}
                    className={clsx(sizeClass, shapeClass, imageBase)}
                />
            ) : initials !== undefined ? (
                <span
                    className={clsx(
                        sizeClass,
                        shapeClass,
                        textSizes[size],
                        initialsColors[color],
                        initialsBase,
                    )}
                    aria-hidden="true"
                >
                    {initials}
                </span>
            ) : (
                <span className={clsx(sizeClass, shapeClass, placeholderBase)}>
                    <Avatar.PlaceholderIcon />
                </span>
            )}
            {status !== undefined && (
                <Avatar.StatusDot status={status} size={size} shape={shape} />
            )}
        </span>
    );
}

export namespace Avatar {
    export function PlaceholderIcon(): ReactElement {
        return (
            <svg
                className="size-full text-gray-400"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
            >
                <path d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0zM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695z" />
            </svg>
        );
    }

    export type StatusDotProps = {
        readonly status: AvatarStatus;
        readonly size: AvatarSize;
        readonly shape: AvatarShape;
    };

    export function StatusDot({
        status,
        size,
        shape,
    }: StatusDotProps): ReactElement {
        const position =
            shape === "circular"
                ? statusPositionCircular[size]
                : statusPositionSquare[size];

        return (
            <span
                className={clsx(
                    statusBase,
                    statusColors[status],
                    statusDotSizes[size],
                    position,
                )}
            />
        );
    }
}
