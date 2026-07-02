import clsx from "clsx";

import {
    base,
    sizes,
    tones,
    type IconTileSize,
    type IconTileTone,
} from "./icon-tile.styles.ts";

import type { HTMLAttributes, ReactNode, ReactElement } from "react";

export type { IconTileSize, IconTileTone };

export type IconTileProps = HTMLAttributes<HTMLSpanElement> & {
    readonly size?: IconTileSize;
    readonly tone?: IconTileTone;
    readonly children: ReactNode;
};

export function IconTile({
    size = "md",
    tone = "neutral",
    className,
    children,
    ...props
}: IconTileProps): ReactElement {
    return (
        <span
            className={clsx(base, sizes[size], tones[tone], className)}
            {...props}
        >
            {children}
        </span>
    );
}
