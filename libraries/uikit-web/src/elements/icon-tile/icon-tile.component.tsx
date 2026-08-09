import clsx from "clsx";
import type { ReactNode, ReactElement } from "react";

import {
    base,
    sizes,
    tones,
    type IconTileSize,
    type IconTileTone,
} from "./icon-tile.styles.ts";

export type { IconTileSize, IconTileTone };

export type IconTileProps = {
    readonly size?: IconTileSize;
    readonly tone?: IconTileTone;
    readonly children: ReactNode;
};

export function IconTile({
    size = "md",
    tone = "neutral",
    children,
}: IconTileProps): ReactElement {
    return (
        <span className={clsx(base, sizes[size], tones[tone])}>{children}</span>
    );
}
