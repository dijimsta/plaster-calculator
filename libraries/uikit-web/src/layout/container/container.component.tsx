import clsx from "clsx";
import type { ReactElement, ReactNode } from "react";

import { base, paddings, sizes } from "./container.styles.ts";
import type { ContainerPadding, ContainerSize } from "./container.styles.ts";

export type ContainerProps = {
    readonly padding?: ContainerPadding;
    readonly size?: ContainerSize;
    readonly children?: ReactNode;
};

export function Container({
    padding = "always",
    size = "wide",
    children,
}: ContainerProps): ReactElement {
    return (
        <div className={clsx(base, sizes[size], paddings[padding])}>
            {children}
        </div>
    );
}
