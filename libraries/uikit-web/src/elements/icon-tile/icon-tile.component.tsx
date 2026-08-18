import clsx from "clsx";
import type { ReactNode, ReactElement } from "react";

import {
    base,
    shapes,
    sizes,
    tones,
    type IconTileShape,
    type IconTileSize,
    type IconTileTone,
} from "./icon-tile.styles.ts";

export type { IconTileShape, IconTileSize, IconTileTone };

export type IconTileProps = {
    readonly size?: IconTileSize;
    readonly tone?: IconTileTone;
    readonly shape?: IconTileShape;
    readonly children: ReactNode;
};

export function IconTile({
    size = "md",
    tone = "neutral",
    shape = "square",
    children,
}: IconTileProps): ReactElement {
    return (
        <span className={clsx(base, sizes[size], shapes[shape], tones[tone])}>
            {children}
        </span>
    );
}
